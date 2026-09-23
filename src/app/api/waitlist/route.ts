import { createHash } from "crypto";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type WaitlistRequestBody = {
  email?: unknown;
  first_name?: unknown;
  last_name?: unknown;
  source?: unknown;
  referrer?: unknown;
};

function toOptionalTrimmedString(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function getSupabaseAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabaseKey = serviceRoleKey ?? anonKey;

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

// With JavaScript off the waitlist form posts itself here as form data. Those
// submissions get a 303 to a static result page instead of JSON. The fetch
// path used by the client component is unchanged.
function isFormPost(request: NextRequest) {
  const contentType = request.headers.get("content-type") ?? "";
  return contentType.startsWith("application/x-www-form-urlencoded") || contentType.startsWith("multipart/form-data");
}

function resultPage(request: NextRequest, result: "ok" | "already" | "missing" | "invalid" | "error") {
  return NextResponse.redirect(new URL(`/waitlist/${result}`, request.nextUrl.origin), 303);
}

export async function POST(request: NextRequest) {
  const formPost = isFormPost(request);

  try {
    const body: WaitlistRequestBody = formPost
      ? Object.fromEntries((await request.formData()).entries())
      : ((await request.json()) as WaitlistRequestBody);
    const email = toOptionalTrimmedString(body.email)?.toLowerCase();
    const firstName = toOptionalTrimmedString(body.first_name);
    const lastName = toOptionalTrimmedString(body.last_name);
    const source = toOptionalTrimmedString(body.source) ?? "landing_page";
    const referrer = toOptionalTrimmedString(body.referrer);

    if (!email) {
      return formPost ? resultPage(request, "missing") : NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (!EMAIL_REGEX.test(email)) {
      return formPost ? resultPage(request, "invalid") : NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    const supabase = getSupabaseAdminClient();
    if (!supabase) {
      console.error("Missing Supabase waitlist environment variables: NEXT_PUBLIC_SUPABASE_URL and key.");
      return formPost ? resultPage(request, "error") : NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const forwardedHeader = request.headers.get("x-forwarded-for");
    const realIpHeader = request.headers.get("x-real-ip");
    const clientIp = forwardedHeader?.split(",")[0]?.trim() || realIpHeader || "unknown";
    const ipHash = createHash("sha256").update(clientIp).digest("hex");

    // The table's migration declares first_name and last_name NOT NULL. The
    // name is optional on the form, so absent values are stored as "".
    const { error } = await supabase.from("waitlist_signups").insert({
      email,
      first_name: firstName ?? "",
      last_name: lastName ?? "",
      source,
      referrer,
      ip_hash: ipHash,
    });

    if (error) {
      if (error.code === "23505") {
        return formPost ? resultPage(request, "already") : NextResponse.json({ message: "You're already on the list!" }, { status: 200 });
      }

      console.error("Waitlist insert error:", error);
      return formPost ? resultPage(request, "error") : NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }

    return formPost ? resultPage(request, "ok") : NextResponse.json({ message: "Successfully joined the waitlist!" }, { status: 201 });
  } catch (error) {
    console.error("Waitlist route error:", error);
    return formPost ? resultPage(request, "error") : NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
