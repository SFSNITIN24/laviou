import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPaths = ["/login", "/register", "/forgot-password","/reset-password"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths to pass through
  const isPublicPath = publicPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  // Allow public paths and homepage
  if (isPublicPath || pathname === "/") {
    // If user is already authenticated, redirect to museum instead of dashboard
    const token = request.cookies.get("auth-token")?.value;
    if (token && (pathname === "/login" || pathname === "/register")) {
      const museumUrl = new URL("/museum", request.url);
      return NextResponse.redirect(museumUrl);
    }
    return NextResponse.next();
  }

  // Redirect dashboard to museum
  if (pathname === "/dashboard") {
    const museumUrl = new URL("/museum", request.url);
    return NextResponse.redirect(museumUrl);
  }

  // Check for auth token
  const token = request.cookies.get("auth-token")?.value;

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - api routes
     * - public assets
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|api).*)",
  ],
};
