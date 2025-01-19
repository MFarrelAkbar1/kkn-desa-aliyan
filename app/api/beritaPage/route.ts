// app/api/beritaPage/route.ts
import { NextResponse } from "next/server";
import dbConnect from "../../utils/db.Connect";
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

// GET all berita pages or single berita page by ID
export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    let data;
    if (id) {
      data = await BeritaPage.findById(id);
      if (!data) {
        return NextResponse.json(
          { success: false, error: "Berita page not found" },
          { status: 404 }
        );
      }
    } else {
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

// POST new berita page
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

    // Validate required fields
    if (!body.nama || !body.gambar || !body.deskripsi) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newItem = await BeritaPage.create(body);
    return NextResponse.json({ success: true, data: newItem });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

// PUT update berita page
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

    // Validate required fields
    if (!body.nama || !body.gambar || !body.deskripsi) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const updatedItem = await BeritaPage.findByIdAndUpdate(
      id,
      { 
        nama: body.nama,
        gambar: body.gambar,
        deskripsi: body.deskripsi
      },
      { new: true }
    );

    if (!updatedItem) {
      return NextResponse.json(
        { success: false, error: "Berita page not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedItem });
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

// DELETE berita page
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
    const deletedItem = await BeritaPage.findByIdAndDelete(id);

    if (!deletedItem) {
      return NextResponse.json(
        { success: false, error: "Berita page not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: deletedItem });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}