import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";

import JoinReferral from "@/components/join-referral";
import { CONTAINER, PageShell, WaitlistBand } from "@/components/marketing/primitives";
import { SITE } from "@/lib/site";

// Referral landing. Every link generate_referral_link mints points here
// (isofit.app/join?ref=<code>), so this route existing is what keeps those
// links alive. Codes in query strings should not be indexed.
export const metadata: Metadata = {
  title: "Join Isofit",
  description: "You were invited to Isofit — strength training that adds up.",
  robots: { index: false, follow: true },
};

export default function JoinPage() {
  return (
    <PageShell sticky={false}>
      <section className={`${CONTAINER} py-16 md:py-24`}>
        <p className="label">You were invited</p>
        <h1 className="mt-3 max-w-[22ch] font-display text-[clamp(2rem,4.6vw,3.25rem)] font-bold leading-[1.08] tracking-[-0.03em]">
          A friend wants you training on Isofit.
        </h1>
        <p className="mt-5 max-w-[56ch] text-lg leading-relaxed text-ink-2">
          Isofit is an iOS strength-training app: a fast set-by-set logger, a body
          graph that shows where your training actually lands, and Atlas, a
          coach that reads your real history. The iOS launch is planned for{" "}
          {SITE.launchDateLong} — join the waitlist below and we will email you
          once, when it is in the App Store.
        </p>
        <Suspense fallback={null}>
          <JoinReferral />
        </Suspense>
        <p className="mt-8 text-sm text-ink-2">
          Curious what you are signing up for? Start with{" "}
          <Link href="/features" className="underline underline-offset-4 hover:text-ink">
            the features
          </Link>
          .
        </p>
      </section>
      <WaitlistBand source="join_page" />
    </PageShell>
  );
}
