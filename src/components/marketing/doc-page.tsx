import Link from "next/link";
import type { ReactNode } from "react";

import DocSections from "@/components/marketing/doc-sections";
import JsonLd from "@/components/marketing/json-ld";
import { CONTAINER, FaqList, PageHero, PageShell, Section, WaitlistBand, faqJsonLd, type Crumb } from "@/components/marketing/primitives";
import { DOCS_BY_PATH } from "@/content";
import type { PageDoc } from "@/content/types";
import { mirrorPath } from "@/lib/markdown";
import { SITE, absoluteUrl } from "@/lib/site";

export function webPageJsonLd(doc: PageDoc) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(doc.path)}#webpage`,
    url: absoluteUrl(doc.path),
    name: doc.metaTitle,
    description: doc.metaDescription,
    inLanguage: "en-US",
    dateModified: SITE.factsReviewed,
    isPartOf: { "@id": `${SITE.url}/#website` },
    about: { "@id": `${SITE.url}/#app` },
  };
}

export function RelatedPages({ paths }: { paths: string[] }) {
  const docs = paths.map((path) => DOCS_BY_PATH[path]).filter(Boolean);
  if (!docs.length) return null;
  return (
    <Section id="related" label="Keep reading" title="Related pages">
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {docs.map((doc) => (
          <li key={doc.path}>
            <Link href={doc.path} className="group flex h-full flex-col rounded-2xl border border-rule bg-paper-raised p-5 transition-colors hover:border-blue/50 hover:bg-white">
              <span className="font-display text-base font-semibold tracking-[-0.01em] group-hover:text-blue">{doc.name}</span>
              <span className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{doc.metaDescription}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function ReviewedNote({ doc }: { doc: PageDoc }) {
  return (
    <div className={`${CONTAINER} pb-2`}>
      <p className="caption">
        Facts on this page were last reviewed <time dateTime={SITE.factsReviewed}>{SITE.factsReviewedLong}</time>. Isofit is pre-release, so details can change before launch.{" "}
        <a href={mirrorPath(doc.path)} className="underline underline-offset-2 hover:text-ink">Read this page as markdown</a>.
      </p>
    </div>
  );
}

export default function DocPage({
  doc,
  trail,
  aside,
  media,
  wide,
  lead,
  children,
  extraJsonLd = [],
}: {
  doc: PageDoc;
  trail: Crumb[];
  aside?: ReactNode;
  media?: Record<string, ReactNode>;
  wide?: Record<string, ReactNode>;
  // Rendered between the hero and the doc sections.
  lead?: ReactNode;
  // Rendered between the doc sections and the FAQ.
  children?: ReactNode;
  extraJsonLd?: Record<string, unknown>[];
}) {
  return (
    <PageShell waitlistHref="#waitlist">
      <JsonLd data={[webPageJsonLd(doc), ...(doc.faqs?.length ? [faqJsonLd(doc.faqs)] : []), ...extraJsonLd]} />
      <PageHero trail={trail} title={doc.h1} lede={doc.lede} aside={aside} />
      {lead}
      <DocSections sections={doc.sections} media={media} wide={wide} />
      {children}
      {doc.faqs?.length ? (
        <Section id="faq" label="Questions" title={`${doc.name}: common questions`}>
          <FaqList faqs={doc.faqs} />
        </Section>
      ) : null}
      {doc.related ? <RelatedPages paths={doc.related} /> : null}
      <ReviewedNote doc={doc} />
      <WaitlistBand source={`${doc.path.slice(1).replace(/[/-]/g, "_")}_page`} />
    </PageShell>
  );
}
