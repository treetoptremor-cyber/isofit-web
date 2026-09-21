import type { Metadata } from "next";
import { notFound } from "next/navigation";

import DocPage from "@/components/marketing/doc-page";
import { Section } from "@/components/marketing/primitives";
import { DOCS_BY_PATH } from "@/content";
import { COMPETITORS, COMPETITORS_REVIEWED, COMPETITORS_REVIEWED_LONG } from "@/content/competitors";
import { docMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return COMPETITORS.map((competitor) => ({ slug: `isofit-vs-${competitor.slug}` }));
}

function find(slug: string) {
  const competitor = COMPETITORS.find((candidate) => `isofit-vs-${candidate.slug}` === slug);
  const doc = DOCS_BY_PATH[`/compare/${slug}`];
  return competitor && doc ? { competitor, doc } : null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const found = find((await params).slug);
  return found ? docMetadata(found.doc) : {};
}

export default async function ComparePage({ params }: { params: Promise<{ slug: string }> }) {
  const found = find((await params).slug);
  if (!found) notFound();
  const { competitor, doc } = found;

  return (
    <DocPage doc={doc} trail={[{ href: "/compare", label: "Compare" }, { href: doc.path, label: `Isofit vs ${competitor.name}` }]}>
      <Section id="sources" label="Sources" title={`Where the ${competitor.name} facts come from`}>
        <div className="prose-iso max-w-[66ch]">
          <p>
            Everything this page says about {competitor.name} comes from {competitor.maker}&apos;s own website, help center and store listings, read on{" "}
            <time dateTime={COMPETITORS_REVIEWED}>{COMPETITORS_REVIEWED_LONG}</time>. Apps change, and prices vary by region, so check {competitor.name}&apos;s site for current details. If something here is out of date, email support@isofit.app and we will correct it.
          </p>
          <ul>
            {competitor.sources.map((source) => (
              <li key={source.url}>
                <a href={source.url} rel="noopener noreferrer nofollow" target="_blank">{source.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </DocPage>
  );
}
