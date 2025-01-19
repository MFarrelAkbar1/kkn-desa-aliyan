// app/api/berita/route.ts
import { NextResponse } from "next/server";
import dbConnect from "../../utils/db.Connect";
import Berita from "../../models/berita.model";
import BeritaPage from "../../models/beritaPage.model";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secure-secret-key";

// Helper function to check admin authentication
async function checkAuth() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("adminToken");
    if (!token) return false;
    try {
      jwt.verify(token.value, JWT_SECRET);
      return true;
    } catch {
      return false;
    }
  } catch (error) {
    console.error("Auth check error:", error);
    return false;
  }
}

// GET all berita or single berita by ID
export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    let data;
    if (id) {
      // Try to find in BeritaPage first
      data = await BeritaPage.findById(id);
      if (!data) {
        return NextResponse.json(
          { success: false, error: "Berita not found" },
          { status: 404 }
        );
      }
    } else {
      // Get all from BeritaPage for full details
      data = await BeritaPage.find({}).sort({ createdAt: -1 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

// POST new berita
export async function POST(request: Request) {
  try {
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await dbConnect();
    const body = await request.json();

    // Create in BeritaPage first to get the ID
    const beritaDetail = await BeritaPage.create(body);

    // Create in Berita with the same _id
    const beritaSummary = await Berita.create({
      _id: beritaDetail._id, // Use the same ID
      nama: body.nama,
      gambar: body.gambar
    });

    return NextResponse.json({ 
      success: true, 
      data: {
        summary: beritaSummary,
        detail: beritaDetail
      } 
    });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

// PUT update berita
export async function PUT(request: Request) {
  try {
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID is required" },
        { status: 400 }
      );
    }

    await dbConnect();
    const body = await request.json();

    // Update BeritaPage first
    const beritaDetail = await BeritaPage.findByIdAndUpdate(
      id,
      {
        nama: body.nama,
        gambar: body.gambar,
        deskripsi: body.deskripsi
      },
      { new: true }
    );

    if (!beritaDetail) {
      return NextResponse.json(
        { success: false, error: "Berita not found" },
        { status: 404 }
      );
    }

    // Then update Berita
    const beritaSummary = await Berita.findByIdAndUpdate(
      id,
      {
        nama: body.nama,
        gambar: body.gambar
      },
      { new: true, upsert: true } // Add upsert option
    );

    return NextResponse.json({ 
      success: true, 
      data: {
        summary: beritaSummary,
        detail: beritaDetail
      }
    });
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

// DELETE berita
export async function DELETE(request: Request) {
  try {
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID is required" },
        { status: 400 }
      );
    }

    await dbConnect();

    // Delete from both collections
    const [beritaSummary, beritaDetail] = await Promise.all([
      Berita.findByIdAndDelete(id),
      BeritaPage.findByIdAndDelete(id)
    ]);

    if (!beritaDetail) {
      return NextResponse.json(
        { success: false, error: "Berita not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      data: {
        summary: beritaSummary,
        detail: beritaDetail
      }
    });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}