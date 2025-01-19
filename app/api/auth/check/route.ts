// app/api/auth/check/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secure-secret-key";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("adminToken");

    if (!token) {
      return NextResponse.json(
        { success: false, error: "No token provided" },
        { status: 401 }
      );
    }

    // Verify the token and decode its contents
    try {
      const decoded = jwt.verify(token.value, JWT_SECRET) as { username: string };
      return NextResponse.json({ 
        success: true,
        username: decoded.username 
      });
    } catch (error) {
      return NextResponse.json(
        { success: false, error: "Invalid token" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error checking auth:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}