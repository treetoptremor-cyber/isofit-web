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

  if (!supabaseUrl || !serviceRoleKey) {
    return null;
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as WaitlistRequestBody;
    const email = toOptionalTrimmedString(body.email)?.toLowerCase();
    const firstName = toOptionalTrimmedString(body.first_name);
    const lastName = toOptionalTrimmedString(body.last_name);
    const source = toOptionalTrimmedString(body.source) ?? "landing_page";
    const referrer = toOptionalTrimmedString(body.referrer);

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    if (!firstName) {
      return NextResponse.json({ error: "First name is required" }, { status: 400 });
    }

    if (!lastName) {
      return NextResponse.json({ error: "Last name is required" }, { status: 400 });
    }

    const supabase = getSupabaseAdminClient();
    if (!supabase) {
      console.error("Missing Supabase waitlist environment variables.");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const forwardedHeader = request.headers.get("x-forwarded-for");
    const realIpHeader = request.headers.get("x-real-ip");
    const clientIp = forwardedHeader?.split(",")[0]?.trim() || realIpHeader || "unknown";
    const ipHash = createHash("sha256").update(clientIp).digest("hex");

    const { error } = await supabase.from("waitlist_signups").insert({
      email,
      first_name: firstName,
      last_name: lastName,
      source,
      referrer,
      ip_hash: ipHash,
    });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json({ message: "You're already on the list!" }, { status: 200 });
      }

      console.error("Waitlist insert error:", error);
      return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }

    return NextResponse.json({ message: "Successfully joined the waitlist!" }, { status: 201 });
  } catch (error) {
    console.error("Waitlist route error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
