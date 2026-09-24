"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

// Shape the edge function accepts (track-referral-click): 1-32 of [A-Za-z0-9-].
// Shared promo codes ride the same ?ref= and are looser than referral_links'
// 8-char format, so validate to the endpoint's bound, not the table's.
const CODE_REGEX = /^[A-Za-z0-9-]{1,32}$/;

// One click count per browser session, not per render or back-navigation
// (waitlist-form's sessionStorage convention).
const TRACKED_KEY = "isofit_join_ref_tracked";

function trackClick(code: string) {
  try {
    if (sessionStorage.getItem(TRACKED_KEY) === code) return;
  } catch {}
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) return;
  // Fire-and-forget from the visitor's browser, deliberately not proxied
  // through a Next route: the endpoint rate-limits per IP, and a proxy would
  // fold every visitor into one server address. An invalid or promo code is a
  // soft {valid:false} there; claiming at sign-up is what settles validity.
  fetch(`${supabaseUrl}/functions/v1/track-referral-click`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  }).then(() => {
    try {
      sessionStorage.setItem(TRACKED_KEY, code);
    } catch {}
  }).catch(() => {});
}

// The referral card: shows the code the link carried and keeps it in the
// member's hands across the App Store round-trip. Attribution is deferred by
// design — the app asks for this code during sign-up (claim_referral_code),
// so the page's job is making sure the visitor still has it after install.
export default function JoinReferral() {
  const searchParams = useSearchParams();
  const raw = (searchParams.get("ref") ?? "").trim();
  const code = CODE_REGEX.test(raw) ? raw : "";
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (code) trackClick(code);
  }, [code]);

  if (!code) return null;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {}
  };

  return (
    <div className="mt-8 max-w-md rounded-2xl border border-rule bg-paper-raised p-6">
      <p className="label">Your invite code</p>
      <div className="mt-3 flex items-center gap-3">
        <code className="rounded-lg bg-ink/5 px-4 py-2 font-mono text-xl tracking-[0.08em]">{code}</code>
        <button
          type="button"
          onClick={copy}
          className="inline-flex min-h-10 items-center rounded-xl bg-forest px-4 text-sm font-semibold text-white transition-colors hover:bg-forest-dark"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-ink-2">
        Enter this code when you create your account in the app, and the friend who sent you gets credit. Codes are claimed once, at sign-up.
      </p>
    </div>
  );
}
