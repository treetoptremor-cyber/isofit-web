import type { ReactNode } from "react";

import { ReviewedNote, webPageJsonLd } from "@/components/marketing/doc-page";
import JsonLd from "@/components/marketing/json-ld";
import { CONTAINER, Device, FaqList, PageShell, Plate, Portrait, ProTag, Section, TextLink, WaitlistBand, faqJsonLd, withAtlas } from "@/components/marketing/primitives";
import { HeatLegend } from "@/components/marketing/quicklog-demo";
import RecoveryRedirect from "@/components/recovery-redirect";
import WaitlistForm from "@/components/waitlist-form";
import { HOME_DOC } from "@/content";
import { PRICING } from "@/content/facts";
import type { DocSection } from "@/content/types";
import { docMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const metadata = docMetadata(HOME_DOC);

const section = (id: string) => HOME_DOC.sections.find((candidate) => candidate.id === id) as DocSection;

// The one phrase in the headline that takes the brand's heading blue.
const HERO_ACCENT = "adds up to";

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

function FeatureRow({
  doc,
  href,
  linkLabel,
  figure,
  flip = false,
}: {
  doc: DocSection;
  href: string;
  linkLabel: string;
  figure: ReactNode;
  flip?: boolean;
}) {
  return (
    <section id={doc.id} aria-labelledby={`${doc.id}-heading`} className={`${CONTAINER} py-10 md:py-16`}>
      <div className={`grid grid-cols-[minmax(0,1fr)] gap-10 lg:items-center lg:gap-16 ${flip ? "lg:grid-cols-[26rem_minmax(0,1fr)]" : "lg:grid-cols-[minmax(0,1fr)_26rem]"}`}>
        <div className={flip ? "lg:order-2" : ""}>
          <p className="label">{doc.label}</p>
          <h3 id={`${doc.id}-heading`} className="mt-2 max-w-[22ch] font-display text-[clamp(1.5rem,3vw,2.125rem)] font-bold leading-[1.14] tracking-[-0.025em]">
            {withAtlas(doc.heading)}
          </h3>
          <div className="prose-iso mt-5 max-w-[60ch]">
            {doc.body?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {doc.bullets ? <ul>{doc.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}
          </div>
          <div className="mt-4">
            <TextLink href={href}>{linkLabel}</TextLink>
          </div>
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
  const tiers = section("free-and-pro");
  const data = section("your-data");
  const team = section("team");
  const [before, after] = HOME_DOC.h1.split(HERO_ACCENT);

  return (
    <PageShell waitlistHref="#waitlist-form">
      <RecoveryRedirect />
      <JsonLd data={[APP_JSON_LD, webPageJsonLd(HOME_DOC), faqJsonLd(HOME_DOC.faqs ?? [])]} />

      <section aria-labelledby="hero-heading" className="border-b border-rule">
        <div className={`${CONTAINER} grid gap-10 pb-12 pt-8 md:pt-12 lg:grid-cols-[minmax(0,1fr)_25rem] lg:items-center lg:gap-14 lg:pb-16`}>
          <div className="flex flex-col items-start">
            <p className="label flex items-center gap-2">
              <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-forest" />
              <span>Workout logger for iPhone</span>
            </p>
            <h1 id="hero-heading" className="mt-4 max-w-[16ch] font-display text-[clamp(2.125rem,5vw,3.25rem)] font-bold leading-[1.08] tracking-[-0.03em]">
              {before}
              <span className="text-blue-heading">{HERO_ACCENT}</span>
              {after}
            </h1>
            <p className="mt-5 max-w-[52ch] text-lg leading-[1.65] text-ink-2">{HOME_DOC.lede}</p>
            <p className="mt-5 inline-block border-y border-ink/25 py-3 font-mono text-[0.8125rem] font-medium leading-6 tracking-[0.02em] text-ink">
              Free workout logging. iOS launch planned <time dateTime={SITE.launchDate} className="tabular-nums">{SITE.launchDateLong}</time>.
            </p>
            <div className="mt-6 w-full sm:mt-7">
              <WaitlistForm formId="waitlist-form" />
            </div>
          </div>
          <figure className="rounded-[2rem] border border-rule bg-paper-raised px-6 pb-6 pt-5 shadow-[0_18px_40px_rgba(42,36,32,0.06)]">
            <div className="mb-4 flex items-center justify-between gap-3">
              <figcaption className="label">The body graph</figcaption>
              <ProTag />
            </div>
            <Device
              src="/screenshots/body-graph.png"
              alt="Isofit's body graph: front and back body figures with each muscle shaded from pale to terracotta by working sets logged, above a sets-by-muscle list and 7, 30, 90 day and all-time filters."
              priority
            />
            <HeatLegend className="mt-5 justify-center" />
          </figure>
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
          <Plate id="see-grid" caption="Your logged sets, grouped by muscle, with the most and least worked.">
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
          <Plate id="ask-grid" tone="atlas" caption="Atlas reviewing a logged session and suggesting changes for next time.">
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
          <Plate id="bonfire-grid" caption="A Bonfire post: a logged squat session with a photo.">
            <Device
              src="/screenshots/bonfire.png"
              alt="Isofit's Bonfire tab showing the Home and Embers feed toggle, a search bar for members and categories, a New post button, and a post by @treetoptremor with a barbell squat photo captioned Barbell squat 3x5 225lbs, tagged strength."
            />
          </Plate>
        }
      />

      <Section id={different.id} label={different.label} title={different.heading} intro={different.body?.[0]} className="border-t border-rule">
        <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {different.items?.map((item) => (
            <li key={item.heading} className="border-t-2 border-blue/70 pt-4">
              <h3 className="font-display text-[1.0625rem] font-bold leading-snug tracking-[-0.01em]">{withAtlas(item.heading)}</h3>
              <p className="mt-2 text-[1.0625rem] leading-relaxed text-ink-2">{item.body}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <TextLink href="/compare">The sourced comparison, and where the others are the better choice</TextLink>
        </div>
      </Section>

      <Section id={tiers.id} label={tiers.label} title={tiers.heading}>
        <dl className="grid gap-5 md:grid-cols-2">
          {tiers.specs?.map((spec, index) => {
            const pro = index === 1;
            return (
              <div key={spec.term} className={`rounded-[1.75rem] border p-6 sm:p-7 ${pro ? "border-ink bg-ink" : "border-rule bg-paper-raised"}`}>
                <dt className={`font-display text-lg font-bold leading-snug tracking-[-0.01em] ${pro ? "text-white" : "text-ink"}`}>{spec.term}</dt>
                <dd className={`mt-3 text-[1.0625rem] leading-relaxed ${pro ? "text-paper/85" : "text-ink-2"}`}>{spec.value}</dd>
              </div>
            );
          })}
        </dl>
        <div className="mt-4">
          <TextLink href="/pricing">Full pricing and billing details</TextLink>
        </div>
      </Section>

      <Section id={data.id} label={data.label} title={data.heading}>
        <div className="rounded-[1.75rem] border border-forest/20 bg-forest-soft px-6 py-7 sm:px-8">
          <ul className="grid gap-6 md:grid-cols-3">
            {data.bullets?.map((bullet) => (
              <li key={bullet} className="flex gap-3 text-[1.0625rem] leading-relaxed text-ink">
                <span aria-hidden="true" className="mt-[0.2rem] font-mono text-sm font-bold text-forest">✓</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap gap-x-6 border-t border-forest/20 pt-2">
            <TextLink href="/privacy">Privacy Policy</TextLink>
            <TextLink href="/health-privacy">Consumer Health Data Privacy Policy</TextLink>
          </div>
        </div>
      </Section>

      <Section id={team.id} label={team.label} title={team.heading} className="border-t border-rule">
        <div className="grid gap-8 sm:grid-cols-[10rem_minmax(0,1fr)] sm:items-start md:grid-cols-[13rem_minmax(0,1fr)] md:gap-12">
          {team.image ? <Portrait {...team.image} className="w-36 rounded-[1.5rem] sm:w-full" /> : null}
          <div className="max-w-[62ch]">
            <div className="prose-iso">
              {team.body?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <div className="mt-4">
              <TextLink href="/about#founder">Why I built Isofit</TextLink>
            </div>
          </div>
        </div>
      </Section>

      <Section id="faq" label="Questions" title="Frequently asked questions about Isofit" className="border-t border-rule">
        <FaqList faqs={HOME_DOC.faqs ?? []} />
        <div className="mt-4">
          <TextLink href="/faq">All frequently asked questions</TextLink>
        </div>
      </Section>

      <ReviewedNote doc={HOME_DOC} />
      <WaitlistBand source="landing_page_footer" />
    </PageShell>
  );
}
