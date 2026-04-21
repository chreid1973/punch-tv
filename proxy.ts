import { NextRequest, NextResponse } from "next/server";
import { decodeSession } from "@/lib/session";

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect all /admin routes except /admin/login
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const sessionCookie = req.cookies.get("admin_session")?.value;
    const session = sessionCookie ? decodeSession(sessionCookie) : null;

    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
