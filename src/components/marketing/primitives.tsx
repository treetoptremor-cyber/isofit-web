import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import IsoGrid from "@/components/marketing/iso-grid";
import JsonLd from "@/components/marketing/json-ld";
import SiteFooter from "@/components/marketing/site-footer";
import SiteHeader from "@/components/marketing/site-header";
import WaitlistForm from "@/components/waitlist-form";
import { SITE, absoluteUrl } from "@/lib/site";

export const CONTAINER = "mx-auto w-full max-w-[1120px] px-4 sm:px-6";

export function PageShell({ children, waitlistHref }: { children: ReactNode; waitlistHref?: string }) {
  return (
    <div className="relative flex min-h-screen flex-col text-ink">
      {/* The app's chalk grid behind every page, faded out toward the edges. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 opacity-60"
        style={{
          WebkitMaskImage: "radial-gradient(ellipse at center, #000 38%, transparent 82%)",
          maskImage: "radial-gradient(ellipse at center, #000 38%, transparent 82%)",
        }}
      >
        <IsoGrid id="page-grid" />
      </div>
      <SiteHeader waitlistHref={waitlistHref} />
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}

export type Crumb = { href: string; label: string };

export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const items = [{ href: "/", label: "Isofit" }, ...trail];
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className="label flex flex-wrap items-center gap-x-2 gap-y-1">
          {items.map((crumb, index) => (
            <li key={crumb.href} className="flex items-center gap-2">
              {index > 0 ? <span aria-hidden="true">/</span> : null}
              {index === items.length - 1 ? (
                <span aria-current="page" className="text-ink">{crumb.label}</span>
              ) : (
                <Link href={crumb.href} className="hover:text-ink">{crumb.label}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map((crumb, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: crumb.label,
            item: absoluteUrl(crumb.href),
          })),
        }}
      />
    </>
  );
}

// Interior page opener. `lede` should be the one-paragraph answer to the
// question the page exists for; assistants tend to quote it verbatim.
export function PageHero({
  trail,
  title,
  lede,
  aside,
}: {
  trail: Crumb[];
  title: ReactNode;
  lede: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className={`${CONTAINER} pb-10 pt-8 md:pb-14 md:pt-12`}>
      <Breadcrumbs trail={trail} />
      <div className={aside ? "mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start" : "mt-6"}>
        <div>
          <h1 className="max-w-[20ch] font-display text-[clamp(2rem,4.6vw,3.25rem)] font-bold leading-[1.08] tracking-[-0.03em]">
            {title}
          </h1>
          <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-ink-2 sm:text-xl sm:leading-relaxed">{lede}</p>
        </div>
        {aside}
      </div>
    </section>
  );
}

export function Section({
  id,
  label,
  title,
  intro,
  children,
  className = "",
}: {
  id?: string;
  label?: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  const headingId = id ? `${id}-heading` : undefined;
  return (
    <section id={id} aria-labelledby={headingId} className={`${CONTAINER} py-10 md:py-14 ${className}`}>
      {label ? <p className="label">{label}</p> : null}
      <h2 id={headingId} className="mt-2 max-w-[24ch] font-display text-[clamp(1.5rem,3vw,2.125rem)] font-bold leading-[1.14] tracking-[-0.025em]">
        {title}
      </h2>
      {intro ? <p className="mt-4 max-w-[64ch] text-[1.0625rem] leading-[1.7] text-ink-2">{intro}</p> : null}
      {children ? <div className="mt-8">{children}</div> : null}
    </section>
  );
}

export type Spec = { term: string; value: ReactNode };

// Facts as a definition list: scannable for people, unambiguous for parsers.
export function SpecList({ specs, columns = 1 }: { specs: Spec[]; columns?: 1 | 2 | 3 }) {
  const grid = columns === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : columns === 2 ? "sm:grid-cols-2" : "";
  return (
    <dl className={`grid gap-x-8 border-t border-rule ${grid}`}>
      {specs.map((spec) => (
        <div key={spec.term} className="border-b border-rule py-4">
          <dt className="label">{spec.term}</dt>
          <dd className="mt-1.5 text-[1.0625rem] leading-relaxed text-ink">{spec.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Device({
  src,
  alt,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`app-device mx-auto ${className}`}>
      <div className="app-device-screen">
        <Image
          src={src}
          alt={alt}
          width={1206}
          height={2622}
          sizes="(max-width: 639px) 250px, 284px"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          className="h-auto w-full"
        />
      </div>
      <Image
        src="/mockups/iphone-frame.png"
        alt=""
        width={836}
        height={1881}
        sizes="(max-width: 639px) 300px, 340px"
        loading={priority ? "eager" : "lazy"}
        className="pointer-events-none absolute inset-0 z-10 h-full w-full"
      />
    </div>
  );
}

// A white plate that a Device sits on, lifted off the page grid, with a figure
// caption underneath.
export function Plate({ caption, children }: { id?: string; caption?: ReactNode; children: ReactNode }) {
  return (
    <figure>
      <div className="rounded-[1.75rem] border border-rule bg-paper-raised px-6 py-8 shadow-[0_18px_40px_rgba(42,36,32,0.06)]">
        {children}
      </div>
      {caption ? <figcaption className="caption mt-3">{caption}</figcaption> : null}
    </figure>
  );
}

export function ColumnCards({ columns }: { columns: { heading: string; tone: "yes" | "no"; items: string[] }[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {columns.map((column) => {
        const yes = column.tone === "yes";
        return (
          <div key={column.heading} className={`rounded-[1.75rem] border p-6 sm:p-7 ${yes ? "border-forest/30 bg-forest/[0.06]" : "border-heat-5/25 bg-heat-5/[0.05]"}`}>
            <h3 className={`font-display text-lg font-bold tracking-[-0.01em] ${yes ? "text-forest-dark" : "text-heat-5"}`}>{column.heading}</h3>
            <ul className="mt-4 grid gap-3">
              {column.items.map((item) => (
                <li key={item} className="flex gap-3 text-[1.0625rem] leading-relaxed text-ink-2">
                  <span aria-hidden="true" className={`mt-[0.35rem] font-mono text-sm font-bold ${yes ? "text-forest" : "text-heat-5"}`}>{yes ? "+" : "−"}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export function QuoteBlock({ text, source }: { text: string; source: string }) {
  return (
    <blockquote className="max-w-[46rem] border-l-[3px] border-sky pl-5">
      <p className="font-display text-[1.125rem] font-medium leading-[1.5] tracking-[-0.01em] text-ink sm:text-xl sm:leading-[1.5]">“{text}”</p>
      <footer className="label mt-3">{source}</footer>
    </blockquote>
  );
}

export type Faq = { question: string; answer: string[]; link?: { href: string; label: string } };

export function faqJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer.join(" ") },
    })),
  };
}

// Answers are always in the DOM and always visible: no accordion, no JS.
export function FaqList({ faqs, headingLevel = "h3" }: { faqs: Faq[]; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <div className="border-t border-rule">
      {faqs.map((faq) => (
        <article key={faq.question} className="grid gap-x-10 gap-y-2 border-b border-rule py-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <Heading className="font-display text-[1.0625rem] font-semibold leading-snug tracking-[-0.01em]">{faq.question}</Heading>
          <div className="space-y-2.5">
            {faq.answer.map((paragraph) => (
              <p key={paragraph} className="text-[1.0625rem] leading-[1.7] text-ink-2">{paragraph}</p>
            ))}
            {faq.link ? (
              <Link href={faq.link.href} className="inline-block py-1 text-sm font-medium text-blue underline underline-offset-4 hover:text-blue-dark">
                {faq.link.label}
              </Link>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}

export function WaitlistBand({ source, id = "waitlist" }: { source: string; id?: string }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={`${CONTAINER} scroll-mt-24 py-10 md:py-16`}>
      <div className="relative overflow-hidden rounded-[1.75rem] bg-ink px-6 py-10 sm:px-10 md:px-14 md:py-14">
        <IsoGrid id={`${id}-grid`} tone="ink" />
        <div aria-hidden="true" className="absolute inset-0" style={{ background: "radial-gradient(80% 120% at 100% 0%, rgba(106,165,238,0.22), transparent 60%)" }} />
        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] lg:items-center">
          <div>
            <p className="label !text-paper/80">
              iOS launch planned <time dateTime={SITE.launchDate}>{SITE.launchDateLong}</time>
            </p>
            <h2 id={`${id}-heading`} className="mt-3 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.08] tracking-[-0.03em] text-white">
              Your workouts, <span className="text-sky">working for you.</span>
            </h2>
            <p className="mt-4 max-w-[46ch] text-[1.0625rem] leading-relaxed text-paper/85">
              Isofit is not in the App Store yet. Join the waitlist and we will email you once, when it is.
            </p>
            <dl className="mt-8 grid max-w-[34rem] grid-cols-2 gap-x-8 gap-y-5 border-t border-paper/20 pt-6 sm:grid-cols-3">
              {[
                ["For", "Adults, 18 and over"],
                ["Sign-in", "Apple, Google or email"],
                ["We ask for", "A name and an email"],
              ].map(([term, value]) => (
                <div key={term}>
                  <dt className="label !text-sky">{term}</dt>
                  <dd className="mt-1.5 text-[0.9375rem] font-medium leading-snug text-white">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <WaitlistForm dark source={source} label="Join the Isofit waitlist, end of page" />
        </div>
      </div>
    </section>
  );
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="inline-flex min-h-11 items-center gap-1.5 font-medium text-blue underline decoration-blue/40 underline-offset-4 hover:text-blue-dark hover:decoration-current">
      {children}
      <span aria-hidden="true">→</span>
    </Link>
  );
}
