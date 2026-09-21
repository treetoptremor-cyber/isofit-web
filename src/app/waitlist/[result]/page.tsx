import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CONTAINER, PageShell } from "@/components/marketing/primitives";
import { SITE } from "@/lib/site";

// Where a waitlist submission lands when JavaScript is off. With it on, the
// form reports its result in place and nobody sees these pages.
const RESULTS: Record<string, { title: string; body: string; retry: boolean }> = {
  ok: { title: "You are on the list.", body: `We will email you once, when Isofit is in the App Store. The iOS launch is planned for ${SITE.launchDateLong}.`, retry: false },
  already: { title: "You are already on the list.", body: "That email address has already joined. There is nothing more to do.", retry: false },
  missing: { title: "We need a name and an email.", body: "Please go back and enter your first name and email address.", retry: true },
  invalid: { title: "That email address does not look right.", body: "Please go back and check it.", retry: true },
  error: { title: "Something went wrong.", body: `Please try again in a moment, or email ${SITE.supportEmail}.`, retry: true },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(RESULTS).map((result) => ({ result }));
}

export const metadata: Metadata = { title: "Isofit waitlist", robots: { index: false, follow: true } };

export default async function WaitlistResultPage({ params }: { params: Promise<{ result: string }> }) {
  const result = RESULTS[(await params).result];
  if (!result) notFound();

  return (
    <PageShell>
      <section className={`${CONTAINER} py-16 md:py-24`}>
        <p className="label">Isofit waitlist</p>
        <h1 className="mt-3 max-w-[20ch] font-display text-[clamp(2rem,4.6vw,3.25rem)] font-bold leading-[1.08] tracking-[-0.03em]">{result.title}</h1>
        <p role={result.retry ? "alert" : "status"} className="mt-5 max-w-[56ch] text-lg leading-relaxed text-ink-2">{result.body}</p>
        <Link
          href={result.retry ? "/#waitlist-form" : "/"}
          className="mt-8 inline-flex min-h-12 items-center rounded-xl bg-forest px-5 text-base font-semibold text-white transition-colors hover:bg-forest-dark"
        >
          {result.retry ? "Back to the form" : "Back to Isofit"}
        </Link>
      </section>
    </PageShell>
  );
}
