import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import IsoGrid from "@/components/marketing/iso-grid";
import JsonLd from "@/components/marketing/json-ld";
import SiteFooter from "@/components/marketing/site-footer";
import AppStoreLink from "@/components/marketing/app-store-link";
import WebAppLink from "@/components/marketing/web-app-link";
import SiteHeader from "@/components/marketing/site-header";
import Reveal from "@/components/marketing/reveal";
import ScrollShine from "@/components/marketing/scroll-shine";
import StickyAppLink from "@/components/marketing/sticky-app-link";
import { SITE, absoluteUrl } from "@/lib/site";

export const CONTAINER = "mx-auto w-full max-w-[1120px] px-4 min-[25rem]:px-5 sm:px-6";

export function PageShell({ children, grid = true, sticky = true }: { children: ReactNode; grid?: boolean; sticky?: boolean }) {
  return (
    <div className="relative flex min-h-screen flex-col text-ink">
      {/* The app's base surface: its faint sky grid behind every page, fixed to
          the viewport and dissolving toward all four edges the way the app's
          edgeFade does (clear at the edge, solid from 12% in). */}
      {grid ? (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, #000 12%, #000 88%, transparent), linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
            WebkitMaskComposite: "source-in",
            maskImage:
              "linear-gradient(to bottom, transparent, #000 12%, #000 88%, transparent), linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
            maskComposite: "intersect",
          }}
        >
          <div className="px-grid absolute inset-x-0 top-0 h-[calc(100%+208px)]">
            <IsoGrid id="page-grid" />
          </div>
        </div>
      ) : null}
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>
      <SiteFooter />
      <Reveal />
      <ScrollShine />
      <div aria-hidden="true" className="px-progress hidden pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-heat-0 via-heat-3 to-heat-5" />
      {sticky ? <StickyAppLink /> : null}
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

// Headings name Atlas in terra, its color role, wherever the word appears.
// Sets one phrase of a heading in a color class; the heading reads unchanged without it.
export function withAccent(text: string, phrase: string, className = "text-blue-heading"): ReactNode {
  const at = text.indexOf(phrase);
  if (at < 0) return text;
  return (
    <>
      {text.slice(0, at)}
      <span className={className}>{phrase}</span>
      {text.slice(at + phrase.length)}
    </>
  );
}

// Headlines run without a closing period; sentences inside the line keep theirs.
export function noEndPeriod(text: string): string {
  return text.endsWith(".") && !text.endsWith("..") ? text.slice(0, -1) : text;
}

export function withAtlas(text: ReactNode): ReactNode {
  if (typeof text === "string") text = noEndPeriod(text);
  if (typeof text !== "string" || !text.includes("Atlas")) return text;
  return text.split(/(\bAtlas\b)/).map((part, index) => (part === "Atlas" ? <span key={index} className="text-terra">Atlas</span> : part));
}

// Interior page opener. `lede` should be the one-paragraph answer to the
// question the page exists for; assistants tend to quote it verbatim.
export function PageHero({
  trail,
  title,
  accent,
  lede,
  aside,
}: {
  trail: Crumb[];
  title: ReactNode;
  // A phrase inside a string title, set in blue.
  accent?: string;
  lede: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className={`${CONTAINER} pb-10 pt-8 md:pb-14 md:pt-12`}>
      <Breadcrumbs trail={trail} />
      <div className={aside ? "motion-hero mt-6 grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start" : "mt-6"}>
        <div>
          <h1 className="max-w-[22ch] font-display text-[clamp(2.25rem,6vw,4.5rem)] font-extrabold leading-[1.04] tracking-[-0.045em]">
            {typeof title === "string" && accent && title.includes(accent) ? (
              <>
                {title.slice(0, title.indexOf(accent))}
                <span className="text-blue-heading">{accent}</span>
                {noEndPeriod(title.slice(title.indexOf(accent) + accent.length))}
              </>
            ) : (
              withAtlas(title)
            )}
          </h1>
          <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-ink-2 sm:text-xl sm:leading-relaxed">{lede}</p>
          <HeatRibbon className="mt-8 w-full max-w-[14rem]" />
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
  level = 2,
  intro,
  children,
  className = "",
}: {
  id?: string;
  label?: string;
  title: ReactNode;
  level?: 2 | 3;
  intro?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  const headingId = id ? `${id}-heading` : undefined;
  const Heading = level === 3 ? "h3" : "h2";
  return (
    <section id={id} aria-labelledby={headingId} data-reveal="story" className={`${CONTAINER} py-12 md:py-14 ${className}`}>
      {label ? <p className="label">{label}</p> : null}
      <Heading id={headingId} className="mt-2 max-w-[24ch] font-display text-[clamp(1.75rem,3.6vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.035em]">
        {withAtlas(title)}
      </Heading>
      {intro ? <p className="mt-4 max-w-[64ch] text-[1.0625rem] leading-[1.7] text-ink-2">{intro}</p> : null}
      {children ? <div className="mt-8">{children}</div> : null}
    </section>
  );
}

export type Spec = { term: string; value: ReactNode };

// Web addresses and email addresses inside a fact become real links.
function linkify(value: ReactNode): ReactNode {
  if (typeof value !== "string") return value;
  return value.split(/(https?:\/\/[^\s),;]+|[\w.+-]+@[\w-]+\.[\w.]+\w)/).map((part, index) => {
    if (/^https?:\/\//.test(part)) return <a key={index} href={part} className="text-blue underline decoration-blue/40 underline-offset-2 hover:text-blue-dark">{part.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}</a>;
    if (/^[\w.+-]+@/.test(part)) return <a key={index} href={`mailto:${part}`} className="text-blue underline decoration-blue/40 underline-offset-2 hover:text-blue-dark">{part}</a>;
    return part;
  });
}

// A small tag naming the tier a pictured feature belongs to.
// The six heat-map roles as a thin ribbon: the site's recurring, ownable motif.
// Decorative; never recolor the ramp.
export function HeatRibbon({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`px-ribbon flex h-2 origin-left overflow-hidden rounded-full ${className}`}>
      {["bg-heat-0", "bg-heat-1", "bg-heat-2", "bg-heat-3", "bg-heat-4", "bg-heat-5"].map((color) => <i key={color} className={`flex-1 ${color}`} />)}
    </div>
  );
}

export function ProTag({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full bg-sky-soft px-2.5 py-1 font-mono text-[0.6875rem] font-semibold uppercase leading-none tracking-[0.14em] text-blue ${className}`}>
      Pro feature
    </span>
  );
}

// Facts as a definition list: scannable for people, unambiguous for parsers.
export function SpecList({ specs, columns = 1 }: { specs: Spec[]; columns?: 1 | 2 | 3 }) {
  const grid = columns === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : columns === 2 ? "sm:grid-cols-2" : "";
  return (
    <dl className={`grid gap-x-8 border-t border-rule ${grid}`}>
      {specs.map((spec) => (
        <div key={spec.term} className="border-b border-rule py-4">
          <dt className="label">{spec.term}</dt>
          <dd className="mt-1.5 text-[1.0625rem] leading-relaxed text-ink">{linkify(spec.value)}</dd>
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
  children,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  /** Laid over the screenshot, inside the screen's rounded corners. */
  children?: React.ReactNode;
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
        {children}
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

// A letter in someone's own words: plain paragraphs and a signature. Quote
// styling is kept for one pulled sentence, not the whole letter.
export function Statement({ paragraphs, attribution }: { paragraphs: string[]; attribution: string }) {
  return (
    <div className="max-w-[64ch]">
      <div className="prose-iso">
        {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
      <p className="label mt-5">— {attribution}</p>
    </div>
  );
}

// A square portrait of a person. Pass a rounding class with the size; small
// portraits want a tighter radius than the 1.75rem cards.
export function Portrait({ src, alt, className = "rounded-[1.75rem]" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`overflow-hidden border border-rule bg-paper-raised shadow-[0_18px_40px_rgba(42,36,32,0.06)] ${className}`}>
      <Image src={src} alt={alt} width={800} height={800} sizes="(max-width: 1023px) 288px, 384px" className="h-auto w-full" />
    </div>
  );
}

// A white plate that a Device sits on, lifted off the page grid, with a figure
// caption underneath.
// `tone="atlas"` sets it on pale terra, the surface behind Atlas conversations.
export function Plate({ caption, children, tone }: { id?: string; caption?: ReactNode; children: ReactNode; tone?: "atlas" }) {
  return (
    <figure>
      <div className={`rounded-[1.75rem] border px-6 py-8 shadow-[0_18px_40px_rgba(42,36,32,0.06)] ${tone === "atlas" ? "border-terra/20 bg-terra-soft" : "border-rule bg-paper-raised"}`}>
        {children}
      </div>
      {caption ? <figcaption className="caption mt-3">{caption}</figcaption> : null}
    </figure>
  );
}

// Named points as h3 cards: differentiators, steps. Numbered when `ordered`.
export function ItemList({ items, ordered = false }: { items: { heading: string; body: string }[]; ordered?: boolean }) {
  const List = ordered ? "ol" : "ul";
  return (
    <List className="grid gap-5 md:grid-cols-2">
      {items.map((item, index) => (
        <li key={item.heading} className="rounded-[1.75rem] border border-rule bg-paper-raised p-6 sm:p-7">
          {ordered ? <p className="label">Step {index + 1}</p> : null}
          <h3 className={`${ordered ? "mt-2 " : ""}font-display text-lg font-bold leading-snug tracking-[-0.01em]`}>{withAtlas(item.heading)}</h3>
          <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-2">{item.body}</p>
        </li>
      ))}
    </List>
  );
}

export function ColumnCards({ columns }: { columns: { heading: string; tone: "yes" | "no"; items: string[] }[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {columns.map((column) => {
        const yes = column.tone === "yes";
        return (
          <div key={column.heading} className={`rounded-[1.75rem] border p-6 sm:p-7 ${yes ? "border-forest/25 bg-forest-soft/60" : "border-terra/20 bg-terra-soft/60"}`}>
            <h3 className={`font-display text-lg font-bold tracking-[-0.01em] ${yes ? "text-forest-dark" : "text-terra"}`}>{withAtlas(column.heading)}</h3>
            <ul className="mt-4 grid gap-3">
              {column.items.map((item) => (
                <li key={item} className="flex gap-3 text-[1.0625rem] leading-relaxed text-ink-2">
                  <span aria-hidden="true" className={`mt-[0.35rem] font-mono text-sm font-bold ${yes ? "text-forest" : "text-terra"}`}>{yes ? "+" : "−"}</span>
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

export function QuoteBlock({ text, source, tone }: { text: string; source?: string; tone?: "atlas" }) {
  return (
    <blockquote className={`max-w-[46rem] border-l-[3px] pl-5 ${tone === "atlas" ? "border-terra" : "border-sky"}`}>
      <p className="font-display text-[1.125rem] font-medium leading-[1.5] tracking-[-0.01em] text-ink sm:text-xl sm:leading-[1.5]">“{text}”</p>
      {source ? <footer className="label mt-3">{source}</footer> : null}
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

export function GetAppBand({ id = "get-app" }: { id?: string }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={`${CONTAINER} scroll-mt-24 py-10 md:py-16`}>
      {/* Old /#waitlist links still land on this band. */}
      <span id="waitlist" aria-hidden="true" className="block scroll-mt-24" />
      <div className="relative overflow-hidden rounded-[1.75rem] bg-ink px-6 py-10 sm:px-10 md:px-14 md:py-14">
        <IsoGrid id={`${id}-grid`} tone="ink" />
        <div aria-hidden="true" className="absolute inset-0" style={{ background: "radial-gradient(80% 120% at 100% 0%, rgba(106,165,238,0.22), transparent 60%)" }} />
        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] lg:items-center">
          <div>
            <p className="label !text-paper/80">
              {SITE.launchStatus}
            </p>
            {/* A slogan, not a topic: kept out of the heading outline. */}
            <p id={`${id}-heading`} className="mt-3 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.08] tracking-[-0.03em] text-white">
              Your workouts, <span className="text-sky">working for you.</span>
            </p>
            <p className="mt-4 max-w-[46ch] text-[1.0625rem] leading-relaxed text-paper/85">
              Download Isofit from the App Store for iPhone, or use the web app in your browser.
            </p>
            <dl className="mt-8 grid max-w-[34rem] grid-cols-2 gap-x-8 gap-y-5 border-t border-paper/20 pt-6 sm:grid-cols-3">
              {[
                ["For", "Adults, 18 and over"],
                ["Sign-in", "Apple, Google or email"],
                ["Price", "Free to log. Pro is optional"],
              ].map(([term, value]) => (
                <div key={term}>
                  <dt className="label !text-sky">{term}</dt>
                  <dd className="mt-1.5 text-[0.9375rem] font-medium leading-snug text-white">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-start">
            <AppStoreLink />
            <WebAppLink className="!border-paper/30 !bg-transparent !text-white hover:!bg-white/10" />
          </div>
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
