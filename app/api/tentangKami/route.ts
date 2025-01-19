// app/api/tentangKami/route.ts

import { NextResponse } from "next/server";
import dbConnect from "../../utils/db.Connect";
import TentangKami from "../../models/tentangKami.model";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secure-secret-key";

// Helper function to check admin authentication
async function checkAuth() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("adminToken");

    if (!token) {
      return false;
    }

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

// GET all items
export async function GET() {
  try {
    await dbConnect();
    const data = await TentangKami.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

// POST new item
export async function POST(request: Request) {
  try {
    // Check authentication
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await dbConnect();
    const body = await request.json();
    const newItem = await TentangKami.create(body);
    return NextResponse.json({ success: true, data: newItem });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

// PUT update item
export async function PUT(request: Request) {
  try {
    // Check authentication
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await dbConnect();
    const body = await request.json();
    const { _id, ...updateData } = body;

    const updatedItem = await TentangKami.findByIdAndUpdate(
      _id,
      updateData,
      { new: true }
    );

    if (!updatedItem) {
      return NextResponse.json(
        { success: false, error: "Item not found" },
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

// DELETE item
export async function DELETE(request: Request) {
  try {
    // Check authentication
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
    const deletedItem = await TentangKami.findByIdAndDelete(id);

    if (!deletedItem) {
      return NextResponse.json(
        { success: false, error: "Item not found" },
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