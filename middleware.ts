import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

const PROTECTED_PATHS = ["/billing"];
// Stripe portal return landing — must stay reachable without a web session
// (opened in the iOS app's SFSafariViewController, which has no auth cookies).
const PUBLIC_EXEMPT_PATHS = ["/billing/return"];

function isProtectedPath(pathname: string) {
  if (PUBLIC_EXEMPT_PATHS.includes(pathname)) return false;
  return PROTECTED_PATHS.some(
    (protectedPath) => pathname === protectedPath || pathname.startsWith(`${protectedPath}/`),
  );
}

export async function middleware(request: NextRequest) {
  const { response, user } = await updateSession(request);

  if (isProtectedPath(request.nextUrl.pathname) && !user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectTo", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: ["/billing/:path*"],
};
