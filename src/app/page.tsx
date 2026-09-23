import type { ReactNode } from "react";

import { DataTable } from "@/components/marketing/doc-sections";
import { RelatedPages, ReviewedNote, webPageJsonLd } from "@/components/marketing/doc-page";
import IsoGrid from "@/components/marketing/iso-grid";
import JsonLd from "@/components/marketing/json-ld";
import { CONTAINER, ColumnCards, Device, FaqList, ItemList, PageShell, Plate, Portrait, Section, SpecList, TextLink, WaitlistBand, faqJsonLd } from "@/components/marketing/primitives";
import QuicklogDemo, { HeatLegend } from "@/components/marketing/quicklog-demo";
import RecoveryRedirect from "@/components/recovery-redirect";
import WaitlistForm from "@/components/waitlist-form";
import { HOME_DOC } from "@/content";
import { PRICING } from "@/content/facts";
import type { DocSection } from "@/content/types";
import { docMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const metadata = docMetadata(HOME_DOC);

const section = (id: string) => HOME_DOC.sections.find((candidate) => candidate.id === id) as DocSection;

const APP_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "@id": `${SITE.url}/#app`,
  name: SITE.name,
  url: SITE.url,
  description: HOME_DOC.metaDescription,
  applicationCategory: "HealthApplication",
  applicationSubCategory: "Workout tracker",
  operatingSystem: "iOS 17.6 or later",
  availableOnDevice: "iPhone",
  inLanguage: "en",
  releaseNotes: `Pre-release. iOS launch planned ${SITE.launchDateLong}.`,
  datePublished: SITE.launchDate,
  image: `${SITE.url}/og/home`,
  screenshot: ["log", "body-graph", "atlas"].map((name) => `${SITE.url}/screenshots/${name}.png`),
  featureList: [
    "Workout logging by tap, typed Quicklog line, or voice",
    "Body graph: front and back muscle heat map by working sets over 7, 30, 90 days or all time",
    "Atlas AI coach that can read your training log",
    "Bonfire members-only community feed",
    "Optional read-only Apple Health import",
    "Routines, session history, offline logging",
    "JSON data export and in-app account deletion",
  ],
  publisher: { "@id": `${SITE.url}/#organization` },
  // No aggregateRating: the app is unreleased and has nothing to rate.
  offers: [
    { "@type": "Offer", name: "Free", price: "0", priceCurrency: "USD", availability: "https://schema.org/PreOrder", availabilityStarts: SITE.launchDate },
    { "@type": "Offer", name: "Pro, monthly", price: PRICING.proMonthly.slice(1), priceCurrency: "USD", availability: "https://schema.org/PreOrder", availabilityStarts: SITE.launchDate },
    { "@type": "Offer", name: "Pro, yearly", price: PRICING.proYearly.slice(1), priceCurrency: "USD", availability: "https://schema.org/PreOrder", availabilityStarts: SITE.launchDate },
  ],
};

const BONFIRE_RULES = [
  ["Who sees it", "Isofit members only"],
  ["What a post is", "A session you actually logged"],
  ["How often", "One post a day"],
  ["What is missing, on purpose", "Follows, groups and direct messages"],
] as const;

function FeatureRow({
  doc,
  href,
  linkLabel,
  figure,
  extra,
  flip = false,
}: {
  doc: DocSection;
  href: string;
  linkLabel: string;
  figure: ReactNode;
  extra?: ReactNode;
  flip?: boolean;
}) {
  return (
    <section id={doc.id} aria-labelledby={`${doc.id}-heading`} className={`${CONTAINER} py-10 md:py-16`}>
      <div className={`grid grid-cols-[minmax(0,1fr)] gap-10 lg:items-center lg:gap-16 ${flip ? "lg:grid-cols-[26rem_minmax(0,1fr)]" : "lg:grid-cols-[minmax(0,1fr)_26rem]"}`}>
        <div className={flip ? "lg:order-2" : ""}>
          <p className="label">{doc.label}</p>
          <h3 id={`${doc.id}-heading`} className="mt-2 max-w-[22ch] font-display text-[clamp(1.5rem,3vw,2.125rem)] font-bold leading-[1.14] tracking-[-0.025em]">
            {doc.heading}
          </h3>
          <div className="prose-iso mt-5 max-w-[60ch]">
            {doc.body?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {doc.bullets ? <ul>{doc.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}
          </div>
          <div className="mt-4">
            <TextLink href={href}>{linkLabel}</TextLink>
          </div>
          {extra ? <div className="mt-6 max-w-[34rem]">{extra}</div> : null}
        </div>
        <div className={flip ? "lg:order-1" : ""}>{figure}</div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const glance = section("at-a-glance");
  const does = section("does");
  const different = section("different");
  const audience = section("who-for");
  const isIsNot = section("is-and-is-not");
  const team = section("team");
  const steps = section("how-it-works");
  const tiers = section("free-and-pro");
  const data = section("your-data");
  const facts = section("key-facts");

  return (
    <PageShell waitlistHref="#waitlist-form">
      <RecoveryRedirect />
      <JsonLd data={[APP_JSON_LD, webPageJsonLd(HOME_DOC), faqJsonLd(HOME_DOC.faqs ?? [])]} />

      <section aria-labelledby="hero-heading" className="border-b border-rule">
        <div className={`${CONTAINER} grid gap-10 pb-12 pt-8 md:pt-12 lg:grid-cols-[minmax(0,1fr)_25rem] lg:items-center lg:gap-14 lg:pb-16`}>
          {/* Reading order is lede then form. On a phone the form is lifted above
              the lede so it stays near the first screen. */}
          <div className="flex flex-col items-start">
            <p className="label flex items-center gap-2">
              <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-forest" />
              <span>Workout logger for iPhone</span>
            </p>
            <h1 id="hero-heading" className="mt-4 font-display text-[clamp(1.875rem,4.4vw,3.125rem)] font-bold leading-[1.1] tracking-[-0.03em]">
              <span className="text-sky">Isofit is a workout logger</span> for iPhone that shows you <span className="text-sky">what your training adds up to.</span>
            </h1>
            <p className="mt-5 inline-block border-y border-ink/25 py-3 font-mono text-[0.8125rem] font-medium leading-6 tracking-[0.02em] text-ink">
              Not yet released. iOS launch planned <time dateTime={SITE.launchDate} className="tabular-nums">{SITE.launchDateLong}</time>.
            </p>
            <p className="order-3 mt-6 max-w-[60ch] text-[1.0625rem] leading-[1.7] text-ink-2 sm:order-none sm:mt-5 sm:text-lg sm:leading-[1.7]">{HOME_DOC.lede}</p>
            <div className="order-2 mt-6 w-full sm:order-none sm:mt-7">
              <WaitlistForm formId="waitlist-form" />
            </div>
          </div>
          <div className="relative">
            <div className="rounded-[2rem] border border-rule bg-paper-raised px-6 pb-6 pt-8 shadow-[0_18px_40px_rgba(42,36,32,0.06)]">
              <div>
                <Device
                  src="/screenshots/body-graph.png"
                  alt="Isofit's body graph: front and back body figures with each muscle shaded from pale to terracotta by working sets logged, above a sets-by-muscle list and 7, 30, 90 day and all-time filters."
                  priority
                />
                <HeatLegend className="mt-5 justify-center" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="glance-heading" className="border-b border-rule bg-paper-raised">
        <div className={CONTAINER}>
          <h2 id="glance-heading" className="sr-only">{glance.heading}</h2>
          <dl className="grid sm:grid-cols-2 lg:grid-cols-3">
            {glance.specs?.map((spec) => (
              <div key={spec.term} className="border-b border-rule py-5 last:border-b-0 sm:pr-8 sm:[&:nth-last-child(-n+2)]:border-b-0 lg:[&:nth-last-child(-n+3)]:border-b-0">
                <dt className="label">{spec.term}</dt>
                <dd className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* The four feature rows below are this section's h3s. */}
      <Section id={does.id} label={does.label} title={does.heading} intro={does.body?.[0]} className="!pb-0" />

      <FeatureRow
        doc={section("log")}
        href="/features/workout-logging"
        linkLabel="How workout logging works"
        extra={<QuicklogDemo />}
        figure={
          <Plate id="log-grid" caption="Today's session in the Log tab, with the Quicklog bar and microphone at the bottom.">
            <Device
              src="/screenshots/log.png"
              alt="Isofit's Log tab showing today's session with back squat, overhead press and incline bench rows, each with sets, reps, pounds and RPE, start and rest timers, a Finish session button, and a Quicklog text bar beside a microphone button."
            />
          </Plate>
        }
      />
      <FeatureRow
        flip
        doc={section("see")}
        href="/features/body-graph"
        linkLabel="How the body graph is calculated"
        figure={
          <Plate id="see-grid" caption="The lower half of the body graph: sets by muscle, time windows, and most and least worked.">
            <Device
              src="/screenshots/sets-by-muscle.png"
              alt="Isofit's Progress tab showing a sets-by-muscle list led by side delts with 11 sets, a 7D, 30D, 90D and ALL filter, and cards for total sets, most worked and least worked muscle."
            />
          </Plate>
        }
      />
      <FeatureRow
        doc={section("ask")}
        href="/features/atlas"
        linkLabel="What Atlas does and what it sees"
        figure={
          <Plate id="ask-grid" caption="Atlas reviewing a logged session and suggesting changes for next time.">
            <Device
              src="/screenshots/atlas.png"
              alt="An Atlas conversation in Isofit. The member asks what to change after a logged pulling session, and Atlas suggests exercise order and volume changes, above a disclaimer that Atlas is AI and gives general fitness guidance, never medical advice."
            />
          </Plate>
        }
      />
      <FeatureRow
        flip
        doc={section("bonfire")}
        href="/features/bonfire"
        linkLabel="How Bonfire works"
        figure={
          <div className="relative overflow-hidden rounded-[1.75rem] bg-ink p-7 sm:p-8">
            <IsoGrid id="bonfire-grid" tone="ink" />
            <dl className="relative grid gap-5">
              {BONFIRE_RULES.map(([term, value]) => (
                <div key={term} className="border-b border-paper/15 pb-5 last:border-b-0 last:pb-0">
                  <dt className="label !text-sky">{term}</dt>
                  <dd className="mt-1.5 font-display text-lg font-semibold leading-snug tracking-[-0.01em] text-white">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        }
      />

      <Section id={different.id} label={different.label} title={different.heading} intro={different.body?.[0]} className="border-t border-rule">
        {different.items ? <ItemList items={different.items} /> : null}
        <div className="mt-4">
          <TextLink href="/compare">Full comparison, with sources, and where the others are the better choice</TextLink>
        </div>
      </Section>

      <Section id={audience.id} label={audience.label} title={audience.heading} intro={audience.body?.[0]}>
        <div className="prose-iso max-w-[66ch]">
          <ul>{audience.bullets?.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
        </div>
      </Section>

      <Section id={isIsNot.id} label={isIsNot.label} title={isIsNot.heading} intro={isIsNot.body?.[0]}>
        {isIsNot.columns ? <ColumnCards columns={isIsNot.columns} /> : null}
      </Section>

      <Section id={team.id} label={team.label} title={team.heading} className="border-t border-rule">
        <div className="grid gap-10 md:grid-cols-[14rem_minmax(0,1fr)] md:items-start lg:grid-cols-[16rem_minmax(0,1fr)]">
          {team.image ? <Portrait {...team.image} className="w-56 md:w-full" /> : null}
          <div>
            <div className="prose-iso max-w-[66ch]">
              {team.body?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <div className="mt-4 flex flex-wrap gap-x-6">
              {team.links?.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1.5 font-medium text-blue underline decoration-blue/40 underline-offset-4 hover:text-blue-dark hover:decoration-current">
                  {link.label}
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
              <TextLink href="/about">About Isofit</TextLink>
            </div>
          </div>
        </div>
      </Section>

      <Section id={steps.id} label={steps.label} title={steps.heading} className="border-t border-rule">
        {steps.items ? <ItemList items={steps.items} ordered /> : null}
      </Section>

      <Section id={tiers.id} label={tiers.label} title={tiers.heading} intro={tiers.body?.[0]}>
        {tiers.table ? <DataTable table={tiers.table} /> : null}
        <div className="mt-4">
          <TextLink href="/pricing">Full pricing and billing details</TextLink>
        </div>
      </Section>

      <Section id={data.id} label={data.label} title={data.heading}>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start">
          <div>
            <div className="prose-iso max-w-[60ch]">
              <ul>{data.bullets?.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
            </div>
            <div className="mt-4 flex flex-wrap gap-x-6">
              <TextLink href="/privacy">Privacy Policy</TextLink>
              <TextLink href="/health-privacy">Consumer Health Data Privacy Policy</TextLink>
            </div>
          </div>
          <Plate id="data-grid" caption="Export, analytics and deletion controls in the You tab.">
            <Device
              src="/screenshots/privacy.png"
              alt="Isofit's Privacy and Terms screen with an Export my data button, a Share usage analytics switch, and Delete account, with a note that deleting an account does not cancel an App Store subscription."
            />
          </Plate>
        </div>
      </Section>

      <Section id={facts.id} label={facts.label} title={facts.heading} className="border-t border-rule">
        {facts.specs ? <SpecList specs={facts.specs} columns={2} /> : null}
      </Section>

      <Section id="faq" label="Questions" title="Frequently asked questions about Isofit" className="border-t border-rule">
        <FaqList faqs={HOME_DOC.faqs ?? []} />
        <div className="mt-4">
          <TextLink href="/faq">All frequently asked questions</TextLink>
        </div>
      </Section>

      {HOME_DOC.related ? <RelatedPages paths={HOME_DOC.related} /> : null}
      <ReviewedNote doc={HOME_DOC} />
      <WaitlistBand source="landing_page_footer" />
    </PageShell>
  );
}
