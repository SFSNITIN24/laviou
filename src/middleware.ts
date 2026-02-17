import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type RouteFlags = {
  isPublic: boolean;
  redirectIfAuthed?: boolean;
  requiresPwResetFlow?: boolean;
  requiresPwResetVerified?: boolean;
};

const AUTH_ROUTES = ["/login", "/register", "/concierge", "/marketplace/confirmation"] as const;
const PUBLIC_ROUTES = ["/", "/forgot-password"] as const;

function flagsFor(pathname: string): RouteFlags {
  if (AUTH_ROUTES.some((p) => pathname === p)) {
    return { isPublic: true, redirectIfAuthed: true };
  }
  if (PUBLIC_ROUTES.some((p) => pathname === p)) {
    return { isPublic: true };
  }
  if (pathname === "/otp-verification") {
    return { isPublic: true, requiresPwResetFlow: true };
  }
  if (pathname === "/reset-password") {
    return { isPublic: true, requiresPwResetVerified: true };
  }
  return { isPublic: false };
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("auth-token")?.value;
  const pwResetFlow = request.cookies.get("pw-reset-flow")?.value;
  const pwResetVerified = request.cookies.get("pw-reset-verified")?.value;
  const flags = flagsFor(pathname);

  // Redirect dashboard to museum
  if (pathname === "/dashboard") {
    const museumUrl = new URL("/museum", request.url);
    return NextResponse.redirect(museumUrl);
  }

  // Stop opening OTP directly
  if (flags.requiresPwResetFlow && !pwResetFlow) {
    return NextResponse.redirect(new URL("/forgot-password", request.url));
  }

  // Stop opening reset-password directly
  if (flags.requiresPwResetVerified && !pwResetVerified) {
    return NextResponse.redirect(new URL("/forgot-password", request.url));
  }

  // If user is authenticated, keep them out of auth pages
  if (token && flags.redirectIfAuthed) {
    const callbackUrl = request.nextUrl.searchParams.get("callbackUrl");
    return NextResponse.redirect(new URL(callbackUrl || "/museum", request.url));
  }

  // Allow public pages
  if (flags.isPublic) return NextResponse.next();

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
    // "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|api).*)",
  ],
};
