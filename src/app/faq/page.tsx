import Image from "next/image";

import { ReviewedNote, RelatedPages, webPageJsonLd } from "@/components/marketing/doc-page";
import JsonLd from "@/components/marketing/json-ld";
import { CONTAINER, FaqList, PageHero, PageShell, Section, WaitlistBand, faqJsonLd } from "@/components/marketing/primitives";
import { FAQ_DOC, FAQ_GROUPS } from "@/content/faq";
import { docMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const metadata = docMetadata(FAQ_DOC);

export default function FaqPage() {
  return (
    <PageShell waitlistHref="#waitlist">
      <JsonLd data={[webPageJsonLd(FAQ_DOC), faqJsonLd(FAQ_DOC.faqs ?? [])]} />
      <PageHero
        trail={[{ href: "/faq", label: "FAQ" }]}
        title={FAQ_DOC.h1}
        lede={FAQ_DOC.lede}
        aside={
          <Image
            src="/atlas/coach-kettlebell.png"
            alt="Illustration of Isofit's coach in an ISO polo shirt, balancing a spinning kettlebell on one finger."
            width={1126}
            height={2000}
            sizes="(max-width: 1023px) 208px, 288px"
            priority
            className="mx-auto h-auto w-52 lg:w-72"
          />
        }
      />
      <section aria-labelledby="support-contact" className={`${CONTAINER} pb-6`}>
        <div className="rounded-2xl border border-rule bg-paper-raised px-5 py-4">
          <h2 id="support-contact" className="label">Support and contact</h2>
          <p className="mt-1.5 text-[1.0625rem] leading-relaxed text-ink-2">
            Need a hand? Email <a href={`mailto:${SITE.supportEmail}`} className="font-medium text-blue underline underline-offset-4">{SITE.supportEmail}</a> and expect a reply {SITE.supportResponse}. For privacy requests, contact{" "}
            <a href={`mailto:${SITE.privacyEmail}`} className="font-medium text-blue underline underline-offset-4">{SITE.privacyEmail}</a>.
          </p>
        </div>
      </section>
      <nav aria-label="FAQ sections" className={`${CONTAINER} pb-2`}>
        <ul className="flex flex-wrap gap-2">
          {FAQ_GROUPS.map((group) => (
            <li key={group.id}>
              <a href={`#${group.id}`} className="inline-flex min-h-11 items-center rounded-full border border-rule bg-paper-raised px-4 text-[0.9375rem] font-medium text-ink-2 transition-colors hover:border-blue/50 hover:text-ink">
                {group.heading}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {FAQ_GROUPS.map((group) => (
        <Section key={group.id} id={group.id} title={group.heading}>
          <FaqList faqs={group.faqs} />
        </Section>
      ))}
      {FAQ_DOC.related ? <RelatedPages paths={FAQ_DOC.related} /> : null}
      <ReviewedNote doc={FAQ_DOC} />
      <WaitlistBand source="faq_page" />
    </PageShell>
  );
}
