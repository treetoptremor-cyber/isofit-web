import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

// PKCE redirect target for Supabase auth emails (password recovery uses
// /forgot-password's redirectTo = /auth/callback?next=/update-password).
// Exchanges the one-time code for a cookie session, then forwards to `next`.
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const nextParam = requestUrl.searchParams.get("next");
  const next = nextParam && nextParam.startsWith("/") ? nextParam : "/log";

  if (code) {
    try {
      const supabase = await createClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) {
        return NextResponse.redirect(new URL(next, request.url));
      }
    } catch {
      // fall through to the error redirect below
    }
  }

  return NextResponse.redirect(new URL("/login?error=auth_callback_failed", request.url));
}
