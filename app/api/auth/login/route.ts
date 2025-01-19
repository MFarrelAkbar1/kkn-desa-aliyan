import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnect from "../../../utils/db.Connect";
import Admin from "../../../models/admin.model";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secure-secret-key";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { username, password } = await request.json();

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: "Username and password are required" },
        { status: 400 }
      );
    }

    // Find admin
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Verify password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate JWT
    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day
    });

    // Return success with username
    return NextResponse.json({ 
      success: true,
      username: admin.username 
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}