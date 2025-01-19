// app/middleware.ts
import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import { NextRequest } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function middleware(request: NextRequest) {
  const adminToken = request.cookies.get("adminToken");

  // Check if the path starts with /admin
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!adminToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      verify(adminToken.value, JWT_SECRET);
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"]
};