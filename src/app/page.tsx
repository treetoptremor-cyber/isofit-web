import type { ReactNode } from "react";

import Link from "next/link";

import { ReviewedNote, webPageJsonLd } from "@/components/marketing/doc-page";
import IsoGrid from "@/components/marketing/iso-grid";
import JsonLd from "@/components/marketing/json-ld";
import { CONTAINER, Device, FaqList, PageShell, Plate, Portrait, ProTag, Section, TextLink, WaitlistBand, faqJsonLd, withAtlas } from "@/components/marketing/primitives";
import { HeatLegend } from "@/components/marketing/quicklog-demo";
import ScreenCrop from "@/components/marketing/screen-crop";
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
  // No datePublished until the app is published; nothing can be pre-ordered,
  // only a waitlist joined, so the offers carry a start date but no availability.
  releaseNotes: `Pre-release. iOS launch planned ${SITE.launchDateLong}.`,
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
    { "@type": "Offer", name: "Free", price: "0", priceCurrency: "USD", availabilityStarts: SITE.launchDate },
    { "@type": "Offer", name: "Pro, monthly", price: PRICING.proMonthly.slice(1), priceCurrency: "USD", availabilityStarts: SITE.launchDate },
    { "@type": "Offer", name: "Pro, yearly", price: PRICING.proYearly.slice(1), priceCurrency: "USD", availabilityStarts: SITE.launchDate },
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
    <section id={doc.id} aria-labelledby={`${doc.id}-heading`} className={`${CONTAINER} py-12 md:py-16`}>
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
  const team = section("team");
  const [before, after] = HOME_DOC.h1.split(HERO_ACCENT);

  return (
    <PageShell waitlistHref="#waitlist-form">
      <RecoveryRedirect />
      <JsonLd data={[APP_JSON_LD, webPageJsonLd(HOME_DOC), faqJsonLd(HOME_DOC.faqs ?? [])]} />

      <section aria-labelledby="hero-heading" className="border-b border-rule">
        <div className={`${CONTAINER} grid gap-6 pb-10 pt-6 md:pt-12 lg:grid-cols-[minmax(0,1fr)_25rem] lg:items-center lg:gap-14 lg:pb-16`}>
          <div className="flex flex-col items-start">
            <p className="label flex items-center gap-2">
              <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-forest" />
              <span>Workout logger for iPhone</span>
            </p>
            <h1 id="hero-heading" className="mt-3 max-w-[16ch] font-display text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.08] tracking-[-0.03em]">
              {before}
              <span className="text-blue-heading">{HERO_ACCENT}</span>
              {after}
            </h1>
            <p className="mt-4 max-w-[52ch] text-lg leading-[1.6] text-ink-2">{HOME_DOC.lede}</p>
            <div className="mt-5 w-full">
              <WaitlistForm formId="waitlist-form" />
            </div>
            <p className="mt-4 inline-block border-y border-ink/25 py-2.5 font-mono text-[0.8125rem] font-medium leading-6 tracking-[0.02em] text-ink">
              Free workout logging. iOS launch planned <time dateTime={SITE.launchDate} className="tabular-nums">{SITE.launchDateLong}</time>.
            </p>
          </div>
          <figure className="rounded-[2rem] border border-rule bg-paper-raised px-5 pb-5 pt-4 shadow-[0_18px_40px_rgba(42,36,32,0.06)] sm:px-6 sm:pb-6">
            <div className="mb-3 flex items-center justify-between gap-3">
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
          <dl className="grid grid-cols-2 gap-x-5 lg:grid-cols-3">
            {glance.specs?.map((spec) => (
              <div key={spec.term} className="border-b border-rule py-4 [&:nth-last-child(-n+2)]:border-b-0 sm:py-5 sm:pr-8 lg:[&:nth-last-child(-n+3)]:border-b-0">
                <dt className="label">{spec.term}</dt>
                <dd className="mt-1.5 text-[0.875rem] leading-relaxed text-ink sm:text-[0.9375rem]">{spec.value}</dd>
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
          <ScreenCrop
            context={false}
            src="/screenshots/sets-by-muscle.png"
            top={0.555}
            height={0.29}
            alt="The lower half of Isofit's body graph. A Sets by muscle list reads Side Delts 11, Triceps 10, Glutes 9, Biceps 8, Front Delts 8. Beside it a 7D, 30D, 90D and ALL filter sits above cards for Total sets 45, Most worked Side Delts and Least worked Upper Back."
            caption="Your logged sets, grouped by muscle, with the most and least worked."
          />
        }
      />
      <FeatureRow
        doc={section("ask")}
        href="/features/atlas"
        linkLabel="What Atlas does and what it sees"
        figure={
          <ScreenCrop
            context={false}
            tone="atlas"
            src="/screenshots/atlas.png"
            top={0.182}
            height={0.585}
            alt="An Atlas conversation. The member says they just logged a session of lat pulldowns, seated cable rows, barbell curls and shoulder presses, and asks what to change next time. Atlas replies to put the incline dumbbell press before the pulling work, calls five sets at RPE 6 reasonable, suggests reducing back volume slightly, and says to keep the shoulder press light and strictly pain-free."
            caption="A question about the session just logged, answered against that session."
          />
        }
      />
      <FeatureRow
        flip
        doc={section("bonfire")}
        href="/features/bonfire"
        linkLabel="How Bonfire works"
        figure={
          <ScreenCrop
            context={false}
            src="/screenshots/bonfire.png"
            top={0.2}
            height={0.5}
            alt="A Bonfire post by @treetoptremor: a barbell squat photo captioned Barbell squat 3x5 225lbs, tagged strength, with kudos and comment buttons."
            caption="A post is a session someone logged, with a photo. One a day, members only."
          />
        }
      />

      <Section id={different.id} label={different.label} title={different.heading} intro={different.body?.[0]} className="border-t border-rule">
        <ul className="grid gap-x-10 gap-y-5 sm:grid-cols-2 sm:gap-y-8 lg:grid-cols-3">
          {different.items?.map((item) => (
            <li key={item.heading} className="border-t-2 border-blue/70 pt-4">
              <h3 className="font-display text-[1.0625rem] font-bold leading-snug tracking-[-0.01em]">{withAtlas(item.heading)}</h3>
              <p className="mt-1.5 text-base leading-relaxed text-ink-2 sm:mt-2 sm:text-[1.0625rem]">{item.body}</p>
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

      {/* The founder panel: An's words on ink, with the Atlas and data cards.
          "built Isofit." takes sky, which reads at 6:1 on ink. */}
      <section id={team.id} aria-labelledby={`${team.id}-heading`} className={`${CONTAINER} py-12 md:py-14`}>
        <div className="relative overflow-hidden rounded-[1.75rem] bg-ink px-6 py-8 text-paper sm:px-8 md:px-12 md:py-12">
          <IsoGrid id="team-grid" tone="ink" />
          <div className="relative">
            <p className="label !text-paper/70">{team.label}</p>
            <h2 id={`${team.id}-heading`} className="mt-3 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.08] tracking-[-0.03em] text-white">
              {team.heading.split(" ").slice(0, 2).join(" ")} <span className="text-sky">{team.heading.split(" ").slice(2).join(" ")}</span>
            </h2>
            <div className="mt-8 grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,5fr)] md:gap-12">
              <div className="flex items-center gap-5 md:block">
                {team.image ? <Portrait {...team.image} className="w-24 shrink-0 rounded-2xl sm:w-28 md:w-full md:rounded-[1.5rem]" /> : null}
                <div className="md:mt-4">
                  <p className="font-display text-lg font-bold tracking-[-0.01em] text-white">{SITE.founder.name}</p>
                  <p className="mt-1 text-[0.9375rem] text-paper/70">{team.byline}</p>
                </div>
              </div>
              <div className="max-w-[60ch]">
                <div className="prose-iso [&_p]:text-paper/85">
                  {team.statement ? <p>{team.statement.paragraphs[0]}</p> : null}
                  {team.quote ? (
                    <blockquote className="border-l-[3px] border-sky pl-5">
                      <p className="!text-lg !font-medium !leading-[1.5] !text-white sm:!text-xl">{team.quote.text}</p>
                    </blockquote>
                  ) : null}
                  {team.statement?.paragraphs.slice(1).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
                <div className="mt-5">
                  <Link href="/about#founder" className="inline-flex min-h-11 items-center gap-1.5 font-medium text-sky underline decoration-sky/40 underline-offset-4 hover:text-white">
                    The full story
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
            <ul className="mt-10 grid gap-5 border-t border-paper/15 pt-8 md:grid-cols-2">
              {team.items?.map((item, index) => {
                const atlas = index === 0;
                return (
                  <li key={item.heading} className={`rounded-[1.5rem] p-6 sm:p-7 ${atlas ? "bg-terra-ink" : "bg-forest-ink"}`}>
                    <p className={`label ${atlas ? "!text-terra-light" : "!text-sage-light"}`}>{item.label}</p>
                    <h3 className={`mt-3 font-display text-xl font-bold leading-snug tracking-[-0.02em] ${atlas ? "text-terra-light" : "text-sage-light"}`}>{item.heading}</h3>
                    <p className="mt-3 text-[1.0625rem] leading-relaxed text-paper/85">{item.body}</p>
                    <Link href={atlas ? "/features/atlas" : "/privacy"} className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-[0.9375rem] font-medium text-paper/80 underline decoration-paper/30 underline-offset-4 hover:text-white">
                      {atlas ? "What Atlas does and what it sees" : "Privacy Policy"}
                      <span aria-hidden="true">→</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

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
