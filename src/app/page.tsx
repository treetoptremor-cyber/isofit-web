import type { Metadata } from "next";
import Link from "next/link";

import RecoveryRedirect from "@/components/recovery-redirect";
import WaitlistForm from "@/components/waitlist-form";
import { Plate, PhoneScreen } from "@/components/marketing/device-plate";
import IsoGrid from "@/components/marketing/iso-grid";
import ScreenCrop from "@/components/marketing/screen-crop";
import SiteFooter from "@/components/marketing/site-footer";
import SiteHeader, { SHELL } from "@/components/marketing/site-header";
import styles from "@/components/marketing/marketing.module.css";

const DESCRIPTION =
  "Isofit is a workout logger for iPhone with a body-graph heatmap of the muscle regions your sets credited and an AI coach, Atlas, scoped to training questions. Free tier; Pro is $14.99 a month or $124.99 a year. iPhone only, iOS 17.6 or later. Not yet released — iOS launch planned 1 October 2026.";

export const metadata: Metadata = {
  title: "Isofit — a workout logger for iPhone with a body graph and an AI coach",
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Isofit — a workout logger for iPhone with a body graph and an AI coach",
    description: DESCRIPTION,
    url: "/",
    siteName: "Isofit",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Isofit" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@isofit_app",
    title: "Isofit — a workout logger for iPhone with a body graph and an AI coach",
    description: DESCRIPTION,
    images: ["/og.png"],
  },
};

/* ── Content ─────────────────────────────────────────────────────────── */

const NBSP = " ";

/* Values are short enough to sit on one line in a three-column strip, and
   the only non-breaking spaces are inside units, so nothing splits as
   "iOS / 17.6+" when the strip re-flows. */
const SPEC = [
  ["Platform", `iPhone, iOS${NBSP}17.6+`],
  ["Price", `Free · $14.99/mo`],
  ["Library", `485${NBSP}exercises`],
  ["Body graph", `Four${NBSP}windows`],
  ["Apple Health", `Read${NBSP}only`],
  ["Built by", `One${NBSP}developer`],
] as const;

const IS: readonly string[] = [
  "A native iPhone app, built for iOS 17.6 and later.",
  "A logger for any training — barbell work, running, kettlebells, mobility, conditioning, sport practice.",
  "A heatmap of the muscle regions your logged sets actually credited.",
  "A coach, Atlas, scoped to training — and able to read your history once you opt in.",
  "An Apple Health reader: workouts, heart rate, energy, distance, steps.",
  "A quiet feed, Bonfire, and a points balance called $ISO.",
];

const IS_NOT: readonly string[] = [
  "Not an isometric-training app. ISO is the cube mark and the name of the points.",
  "Not on Android, iPad, Apple Watch, macOS or the web. iPhone only.",
  "Not a writer to Apple Health. Isofit reads from it and never writes back.",
  "Not a medical tool. Atlas declines diagnosis and medication dosing.",
  "Not an app that logs for you. Atlas can build a program, but the session board is yours to fill.",
  "Not shipped yet. The waitlist is the only way in right now.",
];

const LOG_STEPS = [
  {
    n: "01",
    h: "Type the line",
    p: "A quick-log bar reads a plain line straight into session rows. No sheet, no picker, no six taps per set.",
  },
  {
    n: "02",
    h: "Or hold the mic",
    p: "Voice logging transcribes on the phone first; the clip only leaves the device when the on-device transcript comes back empty or too noisy. A voice log never writes a workout by itself — the parsed rows land in the builder for you to check. It costs 0.05 $ISO, refunded on any failure.",
  },
  {
    n: "03",
    h: "The row takes what you did",
    p: "Sets, reps, weight, RPE, distance, work and rest seconds, and a note per exercise. A rest timer counts down on the set row. 485 exercises ship in the library, and you can add your own when a name is not in it — a custom exercise counts toward the session, and feeds the body graph once it is matched to a library entry.",
  },
  {
    n: "04",
    h: "Offline is the normal case",
    p: "With no connection the finished session goes to a durable on-device queue, its log date frozen to the day it happened. Each queued session carries a client-generated id, so a retry after a lost response hits a duplicate-key guard instead of logging the workout twice.",
  },
  {
    n: "05",
    h: "History stays editable",
    p: "Hold a logged session to edit or delete it — duration, workout type, note, exercises. Backdated sessions never earn $ISO, and the app says so on the edit screen.",
  },
] as const;

const SYNC_STATES = [
  ["Offline", "The session is queued on the phone, with the log date frozen to the day it happened."],
  ["Synced", "The queue has drained and the server holds the session."],
  ["Needs attention", "Something did not replay. The Log tab says so rather than failing quietly."],
] as const;

const ATLAS_ANSWERS = [
  "Programming and technique",
  "Your training history",
  "Strength, hypertrophy, conditioning",
  "Mobility and sport preparation",
  "Recovery and sleep",
  "Training-related nutrition",
] as const;

const ATLAS_DECLINES = [
  "Medical diagnosis or treatment",
  "Medication dosing, including weight-loss drugs",
  "Homework, code, writing tasks",
  "Politics, news, finance, legal questions",
  "Trivia and everything off-topic",
  "Attempts to override its own rules",
] as const;

const BODY_GRAPH_NOTES = [
  [
    "Four windows",
    "Read the same figure over 7 days, 30 days, 90 days or all time. The picture of a deload week and the picture of a training year are the same control, moved.",
  ],
  [
    "Two kinds of gap",
    "A region you have never trained in the window is not the same as a region you have trained too little, so the graph separates them. The under-target line is set against your own median region frequency, not somebody else’s template.",
  ],
  [
    "Free sees the heat",
    "The heat itself is real on the free tier, under a Pro veil. What Pro unlocks is the per-region detail and the taps — not the existence of the picture.",
  ],
] as const;

const SPEND = [
  ["Deep Atlas answer, bought by a free member", "1.00 $ISO"],
  ["Bonfire kudos", "0.50 $ISO"],
  ["Bonfire comment", "0.25 $ISO"],
  ["Voice log", "0.05 $ISO"],
] as const;

const EARN = [
  ["Free · first log of the day", "0.36 $ISO"],
  ["Pro · daily, however you train", "0.36 $ISO"],
  ["Pro · first log of the day", "0.75 $ISO"],
  ["On a 7-day streak", "×1.5"],
  ["From day 21", "×2.0"],
] as const;

const ALSO = [
  {
    label: "Bonfire",
    title: "A feed with a speed limit",
    body: "One post a day, prefilled from the session you just logged — caption, photo and category tag. Viewing, kudos, comments and reporting are open to every member; posting is Pro. Reactions cost points, and the price is shown before you tap. Blocking, reporting and pre-publication screening are built in.",
  },
  {
    label: "Apple Health",
    title: "Import, one direction only",
    body: "Isofit reads workouts, heart rate, active energy, three kinds of distance, steps, exercise minutes and resting heart rate — and never writes anything back. Import is incremental and bounded, and only fully confirmed pages advance the checkpoint, so a failed page is retried rather than skipped.",
  },
  {
    label: "Your data",
    title: "Toggles that actually do something",
    body: "Usage analytics is a toggle that stops collection the moment you turn it off. A full export is prepared on demand as a JSON file covering training, Atlas, account, health and social records, with no credentials in it. Account deletion is self-service and scheduled seven days out.",
  },
  {
    label: "Notifications",
    title: "Asked for once, after the first log",
    body: "Isofit never asks at launch. The request comes after your first successful log, and it covers three things: streak reminders, program-day reminders and the weekly Atlas SITREP. Nothing else, and you can say no and keep the app.",
  },
] as const;

const FREE = [
  "The workout logger, in full",
  "Apple Health import",
  "Offline logging and sync",
  "Atlas: 10 messages a month",
  "One deep Atlas answer for 1 $ISO",
  "Body Graph heat, under a Pro veil",
  "Bonfire: viewing, kudos, comments",
] as const;

const PRO = [
  "Atlas: 30 messages a day",
  "Deep analysis on the larger model, 100 a month",
  "Programs and week plans, saved as editable routines",
  "The Body Graph in full: per-region detail and taps",
  "A weekly SITREP on your training week, with personalization on",
  "Bonfire posting, one post a day",
  "Everything on the free tier",
] as const;

const FAQ = [
  {
    q: "Is Isofit an isometrics app?",
    a: "No. ISO is the cube mark and the name of the in-app points. Isofit logs resistance training, cardio, mobility, conditioning and sport work alike — the isometric grid is the design language, not the training method.",
  },
  {
    q: "Can I download it today?",
    a: "No. Isofit has not shipped. The iOS launch is planned for 1 October 2026 and the App Store listing is in review. The waitlist is the only way to get the app when it lands.",
  },
  {
    q: "Is there an Android, iPad or web version?",
    a: "No. Isofit is iPhone only, iOS 17.6 or later. There is no iPad, Apple Watch, macOS, Android or browser version, and none is being promised here.",
  },
  {
    q: "Does Atlas read my workouts?",
    a: "Only if you turn personalization on. It is a separate opt-in. Without it Atlas answers as a general coach. With it, Atlas reads your logs, streaks and insights — and what it remembers is listed in the app, where forgetting an item removes it from future coaching.",
  },
  {
    q: "What does it cost?",
    a: "There is a free tier. Pro is $14.99 a month or $124.99 a year, sold as an Apple auto-renewable subscription. Both paywalls read every price from the live App Store offering, so the App Store price is the price you pay.",
  },
  {
    q: "Who builds Isofit?",
    a: "A solo developer. Support is at support@isofit.app.",
  },
] as const;

const RELEASE_DATE = "2026-10-01";

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "Isofit",
      url: "https://isofit.app",
      applicationCategory: "HealthAndFitnessApplication",
      operatingSystem: "iOS 17.6 or later",
      description: DESCRIPTION,
      releaseDate: RELEASE_DATE,
      featureList: [
        "Workout logging for any kind of training",
        "Quick-log bar and hold-to-record voice logging",
        "Offline logging with a durable on-device queue",
        "Body Graph heatmap of weighted hard-set credit per muscle region",
        "Atlas, an AI coach scoped to training questions",
        "Apple Health import, read only",
        "Bonfire, a one-post-a-day community feed",
        "$ISO, an in-app points balance",
      ],
      offers: [
        { "@type": "Offer", name: "Free", price: "0", priceCurrency: "USD" },
        { "@type": "Offer", name: "Pro, monthly", price: "14.99", priceCurrency: "USD" },
        { "@type": "Offer", name: "Pro, yearly", price: "124.99", priceCurrency: "USD" },
      ].map((offer) => ({
        ...offer,
        availability: "https://schema.org/PreOrder",
        availabilityStarts: RELEASE_DATE,
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

/* ── No-JavaScript submission results ────────────────────────────────── */

type Notice = { status: "success" | "duplicate" | "error"; message: string };

const NOTICES: Record<string, Notice> = {
  ok: { status: "success", message: "Successfully joined the waitlist!" },
  dupe: { status: "duplicate", message: "You're already on the list!" },
  missing: { status: "error", message: "Please enter your first name and email address." },
  invalid: { status: "error", message: "Please enter a valid email address." },
  error: { status: "error", message: "Something went wrong. Please try again." },
};

function readNotice(value: string | string[] | undefined): Notice | undefined {
  return typeof value === "string" ? NOTICES[value] : undefined;
}

/* ── Small parts ─────────────────────────────────────────────────────── */

function Eyebrow({ children, tone = "light" }: { children: React.ReactNode; tone?: "light" | "dark" }) {
  return (
    <p
      className={`font-mono text-[0.625rem] uppercase leading-5 tracking-[0.13em] sm:text-xs sm:tracking-[0.18em] ${
        tone === "dark" ? "text-[#c9d7e6]" : "text-[#6c6259]"
      }`}
    >
      {children}
    </p>
  );
}

function SectionHead({
  index,
  id,
  kicker,
  title,
  lede,
  wide = false,
}: {
  index: string;
  id: string;
  kicker: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className={wide ? "max-w-[58rem]" : "max-w-[46rem]"}>
      <p className="flex items-baseline gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[#554d45] sm:text-xs">
        <span className="tabular-nums text-[#2a2420]">{index}</span>
        <span aria-hidden="true" className="h-px w-8 bg-[#2a2420]/25" />
        <span>{kicker}</span>
      </p>
      <h2
        id={id}
        className="mt-4 scroll-mt-24 font-display text-[clamp(1.4rem,2.7vw,1.95rem)] font-bold leading-[1.14] tracking-[-0.03em] text-[#2a2420]"
      >
        {title}
      </h2>
      {lede ? <p className="mt-5 text-[1.0625rem] leading-[1.75] text-[#4a423b] sm:text-[1.125rem]">{lede}</p> : null}
    </div>
  );
}

function Rule() {
  return <hr className="border-0 border-t border-[#2a2420]/15" />;
}

function Check() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="mt-[0.45rem] shrink-0">
      <path d="M2 8.5 6 12.5 14 3.5" stroke="#2a2420" strokeWidth="2.2" strokeLinecap="square" />
    </svg>
  );
}

function Cross() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="mt-[0.45rem] shrink-0">
      <path d="M3 3 13 13M13 3 3 13" stroke="#8b8176" strokeWidth="2.2" strokeLinecap="square" />
    </svg>
  );
}

function DataTable({
  caption,
  head,
  rows,
}: {
  caption: string;
  head: readonly [string, string];
  rows: readonly (readonly [string, string])[];
}) {
  return (
    <table className={styles.table}>
      <caption>{caption}</caption>
      <thead>
        <tr>
          <th scope="col">{head[0]}</th>
          <th scope="col">{head[1]}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(([k, v]) => (
          <tr key={k}>
            <th scope="row">{k}</th>
            <td>{v}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* A hairline grid drawn with a 1px gap over a dark ground. Nothing here
   clips: the strip re-flows and the cells grow as the text does. */
const CELL_GRID = "grid gap-px border border-[#2a2420]/20 bg-[#2a2420]/20";

/* ── Page ────────────────────────────────────────────────────────────── */

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = await searchParams;
  const notice = readNotice(query.waitlist);
  const heroNotice = query.from === "cta" ? undefined : notice;
  const ctaNotice = query.from === "cta" ? notice : undefined;

  return (
    <div className="relative bg-[#f3efe6] text-[#2a2420]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD).replace(/</g, "\\u003c") }}
      />
      <a
        href="#main-content"
        className="sr-only font-semibold focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded focus:bg-white focus:px-4 focus:py-3 focus:text-[#245c9b]"
      >
        Skip to content
      </a>
      <RecoveryRedirect />

      <SiteHeader />

      <main id="main-content" tabIndex={-1} className="scroll-mt-20">
        {/* ── HERO ───────────────────────────────────────────────── */}
        <section aria-labelledby="hero-heading" className={`${SHELL} pb-10 pt-8 sm:pt-10 lg:pb-12`}>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,304px)] lg:gap-12 xl:gap-16">
            <div className="flex min-w-0 flex-col items-start">
              <Eyebrow>
                <span aria-hidden="true" className="mr-2 inline-block size-1.5 translate-y-[-1px] bg-[#2a2420]" />
                Workout logging · Pre-launch
              </Eyebrow>

              <h1 id="hero-heading" className="mt-5">
                <span className="block font-display text-[clamp(2rem,5.2vw,3.25rem)] font-bold leading-[1.04] tracking-[-0.04em] text-[#2a2420]">
                  Isofit is a workout logger for iPhone
                </span>{" "}
                <span className="mt-3 block max-w-[34ch] font-display text-[clamp(1rem,1.9vw,1.375rem)] font-medium leading-[1.35] tracking-[-0.02em] text-[#4a423b]">
                  with a body-graph heatmap and an AI coach for training questions.
                </span>
              </h1>

              <p className="mt-5 font-mono text-[0.8125rem] font-medium leading-6 tracking-[0.02em] text-[#2a2420] sm:mt-6 sm:border-y sm:border-[#2a2420]/25 sm:py-3.5">
                Not yet released. iOS launch planned{" "}
                <time dateTime={RELEASE_DATE} className="tabular-nums">
                  1 October 2026
                </time>
                .
              </p>

              {/* Reading order is lede then form. On a phone the form is lifted
                  above the lede so it stays inside the first viewport. */}
              <p className="order-3 mt-6 max-w-[58ch] text-[1.0625rem] leading-[1.7] text-[#4a423b] sm:order-none sm:text-[1.125rem]">
                Log any training — barbell work, running, kettlebells, mobility, sport practice. Isofit turns the record
                into a heatmap of the muscle regions your sets actually credited. Atlas answers training questions, and
                reads that history only if you switch personalization on.
              </p>

              <div id="waitlist" className={`${styles.waitlist} order-2 mt-6 w-full scroll-mt-28 sm:order-none sm:mt-7`}>
                <WaitlistForm formId="waitlist-form" source="landing_hero" notice={heroNotice} />
              </div>
            </div>

            <div className="mx-auto w-full min-w-0 max-w-[24rem] lg:max-w-none">
              <Plate
                gridId="hero-iso"
                label="Progress · History"
                meter="Sep 2026"
                caption={
                  <>
                    <span className="uppercase tracking-[0.16em] text-[#2a2420]">Real screen</span>
                    <br />
                    Three logged sessions as the history list shows them. The same screen, read closer, is in section
                    02.
                  </>
                }
              >
                <PhoneScreen
                  src="/screenshots/history.png"
                  alt="The Isofit Progress tab on the History view, listing three logged sessions. The 08 September 26 session is tagged Followed plan and shows Lat Pulldown, Seated Cable Row, Barbell Curl, Seated Dumbbell Shoulder Press, Incline Dumbbell Press and Dumbbell shoulder rotation with their sets, reps and weights."
                  priority
                />
              </Plate>
            </div>
          </div>
        </section>

        {/* ── SPEC STRIP ─────────────────────────────────────────── */}
        <section aria-label="Isofit at a glance" className={SHELL}>
          <dl className={`${CELL_GRID} grid-cols-2 sm:grid-cols-3`}>
            {SPEC.map(([k, v]) => (
              <div key={k} className="min-w-0 bg-[#faf8f3] px-4 py-3.5">
                <dt className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-[#554d45]">{k}</dt>
                <dd className="mt-1.5 break-words font-display text-[0.875rem] font-bold leading-snug tracking-[-0.015em] text-[#2a2420]">
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── 01 DEFINITION ──────────────────────────────────────── */}
        <section aria-labelledby="what-it-is" className={`${SHELL} py-16 sm:py-20`}>
          <SectionHead
            index="01"
            id="what-it-is"
            kicker="Definition"
            title="What Isofit is, and what it is not."
            lede="A short page of plain facts is more use than a promise. Both columns are true today, on the build that is in App Store review."
          />

          <div className="mt-11 grid gap-10 md:grid-cols-2 md:gap-12">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-[#2a2420]">It is</h3>
              <ul className="mt-5 grid gap-4 border-t border-[#2a2420]/15 pt-5">
                {IS.map((line) => (
                  <li key={line} className="flex gap-3 text-[1.0625rem] leading-[1.7] text-[#4a423b]">
                    <Check />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-[#6c6259]">It is not</h3>
              <ul className="mt-5 grid gap-4 border-t border-[#2a2420]/15 pt-5">
                {IS_NOT.map((line) => (
                  <li key={line} className="flex gap-3 text-[1.0625rem] leading-[1.7] text-[#4a423b]">
                    <Cross />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-10 max-w-[70ch] border-t border-[#2a2420]/15 pt-5 font-mono text-xs leading-5 text-[#554d45]">
            Stated{" "}
            <time dateTime="2026-09-19" className="tabular-nums">
              19 September 2026
            </time>
            . If any of it changes, this section changes with it.
          </p>
        </section>

        <div className={SHELL}>
          <Rule />
        </div>

        {/* ── 02 THE LOGGER ──────────────────────────────────────── */}
        <section aria-labelledby="logging" className={`${SHELL} py-16 sm:py-20`}>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,368px)] lg:gap-14">
            <div className="min-w-0">
              <SectionHead
                index="02"
                id="logging"
                kicker="The logger"
                title="Five ways the log gets out of your way."
                lede="The session board is the centre of the app. Everything else on this page is built out of what you put into it."
              />

              <ol className="mt-10 grid gap-0">
                {LOG_STEPS.map((step) => (
                  <li
                    key={step.n}
                    className="grid gap-x-6 gap-y-2 border-t border-[#2a2420]/15 py-6 sm:grid-cols-[3rem_minmax(0,1fr)]"
                  >
                    <span className="font-mono text-sm tabular-nums text-[#2a2420]">{step.n}</span>
                    <div>
                      <h3 className="font-display text-[1.0625rem] font-bold tracking-[-0.01em] text-[#2a2420] sm:text-[1.125rem]">
                        {step.h}
                      </h3>
                      <p className="mt-2.5 max-w-[56ch] text-[1.0625rem] leading-[1.75] text-[#4a423b]">{step.p}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="min-w-0 lg:pt-28">
              <Plate
                flat
                gridId="parse-iso"
                label="Quick log"
                meter="One line"
                bodyClassName="px-0 pb-0 pt-0"
                caption="What the quick-log bar makes of a typed line. Weight is recorded in the unit you entered or spoke — “100 kilos” stays 100 kg even if your default is pounds."
              >
                <p className="border-b border-[#2a2420]/15 px-5 py-4 font-mono text-sm text-[#2a2420]">
                  <span aria-hidden="true" className="mr-2 text-[#6c6259]">
                    ›
                  </span>
                  bench 5x5 225lbs
                </p>
                <div className="px-5 py-4">
                  <table className={styles.table}>
                    <caption>Resolves to</caption>
                    <thead>
                      <tr>
                        <th scope="col">Set · Reps</th>
                        <th scope="col">Weight</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 2, 3, 4, 5].map((set) => (
                        <tr key={set}>
                          <th scope="row">{String(set).padStart(2, "0")} · 5 reps</th>
                          <td>225 lb</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Plate>

              {/* The second half of the column: the states step 04 describes. */}
              <div className="mt-12 border-t border-[#2a2420]/25 pt-5">
                <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-[#2a2420]">
                  What the Log tab shows
                </h3>
                <dl className="mt-5 grid gap-4">
                  {SYNC_STATES.map(([state, meaning]) => (
                    <div key={state} className="grid gap-1">
                      <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-[#554d45]">
                        {state}
                      </dt>
                      <dd className="text-[0.9375rem] leading-[1.65] text-[#4a423b]">{meaning}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>

          <ScreenCrop
            className="mt-14 max-w-[46rem]"
            src="/screenshots/history.png"
            alt="A logged session in Isofit history, dated 08 September 26 and marked Followed plan: Lat Pulldown 2×10 at 80 lb, Lat Pulldown 1×10 at 110 lb, Lat Pulldown 3×8 at 120 lb, Seated Cable Row 4×6 at 140 lb, Barbell Curl 3×8 at 50 lb, Seated Dumbbell Shoulder Press 3×10 at 40 lb, Incline Dumbbell Press 5×10 at 40 lb, and Dumbbell shoulder rotation 3×10 at 15 lb."
            caption={
              <>
                <span className="uppercase tracking-[0.16em] text-[#2a2420]">Real screen · Progress · History</span>
                <br />
                One session as the history list shows it. Hold it to edit the duration, the workout type, the note or any
                exercise on it.
              </>
            }
            sizes="(max-width: 767px) 100vw, 736px"
            top={0.25}
            height={0.27}
          />
        </section>

        <div className={SHELL}>
          <Rule />
        </div>

        {/* ── 03 ATLAS ───────────────────────────────────────────── */}
        <section aria-labelledby="atlas" className={`${SHELL} py-16 sm:py-20`}>
          <SectionHead
            index="03"
            id="atlas"
            kicker="The coach"
            wide
            title="Atlas answers training questions and refuses everything else."
            lede="Atlas is a chat coach with a scope boundary written into its system prompt. It is not a general assistant wearing a gym shirt, and it declines out-of-scope questions in a sentence or two, without a lecture."
          />

          <div className="mt-11 grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-14">
            <div className="min-w-0">
              <ScreenCrop
                src="/screenshots/atlas.png"
                alt="An Atlas conversation. The member says they just logged a session of lat pulldowns, seated cable rows, barbell curls and shoulder presses, and asks what to change next time. Atlas replies to put the incline dumbbell press before the pulling work, calls five sets at RPE 6 reasonable, suggests reducing back volume slightly, and says to keep the shoulder press light and strictly pain-free."
                caption={
                  <>
                    <span className="uppercase tracking-[0.16em] text-[#2a2420]">Real screen · Atlas</span>
                    <br />
                    A question about the session you just logged, answered against that session, in the words the app
                    actually used.
                  </>
                }
                sizes="(max-width: 1023px) 100vw, 560px"
                top={0.182}
                height={0.585}
              />

              <blockquote className="mt-9 border-l-2 border-[#2a2420]/30 pl-5 font-display text-[1.0625rem] font-medium leading-[1.55] tracking-[-0.01em] text-[#2a2420] sm:text-[1.1875rem]">
                “Atlas is AI and thus can make mistakes. Its suggestions are general fitness guidance, never medical
                advice.”
                <footer className="mt-3 font-mono text-[0.6875rem] font-normal uppercase tracking-[0.16em] text-[#554d45]">
                  Shown in the app, on every Atlas thread
                </footer>
              </blockquote>
            </div>

            <div className="min-w-0">
              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-[#2a2420]">It answers</h3>
                  <ul className="mt-4 grid gap-2.5 border-t border-[#2a2420]/15 pt-4 text-[1rem] leading-[1.6] text-[#4a423b]">
                    {ATLAS_ANSWERS.map((line) => (
                      <li key={line} className="flex gap-3">
                        <Check />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-[#6c6259]">It declines</h3>
                  <ul className="mt-4 grid gap-2.5 border-t border-[#2a2420]/15 pt-4 text-[1rem] leading-[1.6] text-[#4a423b]">
                    {ATLAS_DECLINES.map((line) => (
                      <li key={line} className="flex gap-3">
                        <Cross />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <dl className={`${CELL_GRID} mt-9 sm:grid-cols-3`}>
                {[
                  ["Free", "10 messages a month"],
                  ["Pro", "30 messages a day"],
                  ["Deep analysis", "Pro, 100 a month"],
                ].map(([k, v]) => (
                  <div key={k} className="min-w-0 bg-[#faf8f3] px-4 py-3.5">
                    <dt className="break-words font-mono text-[0.625rem] uppercase tracking-[0.16em] text-[#554d45]">
                      {k}
                    </dt>
                    <dd className="mt-1.5 break-words font-display text-[0.875rem] font-bold leading-snug tracking-[-0.015em]">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>

              <h3 className="mt-9 font-mono text-xs uppercase tracking-[0.18em] text-[#2a2420]">
                Reading your history is a separate opt-in
              </h3>
              <p className="mt-4 max-w-[60ch] border-t border-[#2a2420]/15 pt-4 text-[1.0625rem] leading-[1.75] text-[#4a423b]">
                Personalization is off until you turn it on. Without it Atlas answers as a general coach. With it, Atlas
                reads your logs, streaks and insights — and what it remembers is listed in the app, where forgetting an
                item removes it from future coaching. Either way it treats your profile, notes and sessions as data,
                never as instructions. Deep analysis runs on a larger model; a free member who wants one without
                upgrading can buy a single deep answer for 1 $ISO.
              </p>
            </div>
          </div>
        </section>

        {/* ── 04 BODY GRAPH ──────────────────────────────────────── */}
        <section aria-labelledby="body-graph" className="border-y border-[#2a2420]/15 bg-[#ece7dc]">
          <div className={`${SHELL} py-16 sm:py-20`}>
            <SectionHead
              index="04"
              id="body-graph"
              kicker="The body graph"
              wide
              title="A picture of what you have trained, and what you have left alone."
              lede="Every logged hard set on a matched exercise is weighted and credited to the muscle regions it worked. The rollup is computed on the server and refreshed when a workout is submitted — nothing is re-derived on the phone."
            />

            {/* The lattice is the ground the figure stands on, and stops at the
                edge of it: no diagonal ever crosses a line of body copy. */}
            <div className="relative mt-12 py-8 pr-0 sm:py-10 sm:pr-12">
              <IsoGrid id="bodygraph-iso" opacity={0.5} />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(62% 72% at 34% 50%, rgba(236,231,220,0) 52%, rgba(236,231,220,0.35) 76%, #ece7dc 100%)",
                }}
              />
              <ScreenCrop
                className="relative max-w-[46rem]"
                captionClassName="bg-[#ece7dc] py-1 pr-2"
                src="/screenshots/body-graph.png"
                alt="A close view of the Body Graph figures, front and back. Orange shading is weighted hard-set credit, deepest on the chest, shoulders, glutes, quadriceps and hamstrings. The olive-green regions — the upper back and rear shoulders on the back figure, the obliques on the front — are the gap split: never trained in the window, or trained below target. The calves and forearms are pale."
                caption={
                  <>
                    <span className="uppercase tracking-[0.16em] text-[#2a2420]">Real screen · Front and back</span>
                    <br />
                    The shipped graph is a traced 2D figure with sculpt regions. Deeper shading is more weighted hard-set
                    credit in the window you have selected; the green regions are the gap.
                  </>
                }
                sizes="(max-width: 767px) 100vw, 736px"
                top={0.272}
                height={0.462}
              />
            </div>

            <dl className="mt-14 grid gap-x-10 gap-y-8 md:grid-cols-3">
              {BODY_GRAPH_NOTES.map(([t, d]) => (
                <div key={t} className="border-t border-[#2a2420]/25 pt-5">
                  <dt className="font-display text-[1.0625rem] font-bold tracking-[-0.01em] text-[#2a2420] sm:text-[1.125rem]">
                    {t}
                  </dt>
                  <dd className="mt-2.5 text-[1rem] leading-[1.7] text-[#4a423b]">{d}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── 05 $ISO ────────────────────────────────────────────── */}
        <section aria-labelledby="points" className={`${SHELL} py-16 sm:py-20`}>
          <SectionHead
            index="05"
            id="points"
            kicker="Points"
            title="$ISO is earned by logging and spent inside the app."
            lede="It is a points balance, not money. It cannot be cashed out and it cannot be transferred. These are the numbers, rather than a number about how many people use it."
          />

          <div className="mt-11 grid gap-10 md:grid-cols-2 md:gap-14">
            <DataTable caption="Spent on" head={["What it buys", "Cost"]} rows={SPEND} />
            <DataTable caption="Earned by logging" head={["How", "Amount"]} rows={EARN} />
          </div>

          <p className="mt-8 max-w-[76ch] font-mono text-xs leading-5 text-[#554d45]">
            Backdated sessions never earn $ISO. Every member, free or Pro, gets one streak freeze a month, spent
            automatically before a streak breaks. Bonfire reaction prices are shown before you tap, not after.
          </p>
        </section>

        <div className={SHELL}>
          <Rule />
        </div>

        {/* ── 06 THE REST OF IT ──────────────────────────────────── */}
        <section aria-labelledby="also" className={`${SHELL} py-16 sm:py-20`}>
          <SectionHead index="06" id="also" kicker="The rest of it" title="Four more things, described exactly." />
          <div className={`${CELL_GRID} mt-11 md:grid-cols-2`}>
            {ALSO.map((item) => (
              <article key={item.label} className="min-w-0 bg-[#faf8f3] p-6 sm:p-8">
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[#554d45]">{item.label}</p>
                <h3 className="mt-3 font-display text-[1.125rem] font-bold leading-snug tracking-[-0.015em] text-[#2a2420] sm:text-[1.1875rem]">
                  {item.title}
                </h3>
                <p className="mt-3.5 text-[1rem] leading-[1.75] text-[#4a423b]">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <div className={SHELL}>
          <Rule />
        </div>

        {/* ── 07 PRICING ─────────────────────────────────────────── */}
        <section aria-labelledby="pricing" className={`${SHELL} py-16 sm:py-20`}>
          <SectionHead
            index="07"
            id="pricing"
            kicker="Pricing"
            title="Two tiers. One of them is free."
            lede="Pro is sold as an Apple auto-renewable subscription. Both paywalls read every price from the live App Store offering, so the App Store price is the price you pay."
          />

          <div className={`${CELL_GRID} mt-11 md:grid-cols-2`}>
            <div className="min-w-0 bg-[#faf8f3] p-7 sm:p-9">
              <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[#554d45]">Free</h3>
              <p className="mt-4 font-display text-[2.25rem] font-bold leading-none tracking-[-0.03em] text-[#2a2420] sm:text-[2.5rem]">
                $0
              </p>
              <p className="mt-3 text-[0.9375rem] leading-6 text-[#554d45]">The logger is not the paywall.</p>
              <ul className="mt-7 grid gap-3 border-t border-[#2a2420]/15 pt-6">
                {FREE.map((line) => (
                  <li key={line} className="flex gap-3 text-[1rem] leading-[1.6] text-[#4a423b]">
                    <Check />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="min-w-0 bg-[#faf8f3] p-7 sm:p-9">
              <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[#2a2420]">Pro</h3>
              <p className="mt-4 font-display text-[2.25rem] font-bold leading-none tracking-[-0.03em] text-[#2a2420] sm:text-[2.5rem]">
                <span className="tabular-nums">$14.99</span>
                <span className="ml-2 align-middle font-mono text-sm font-normal tracking-normal text-[#554d45]">
                  / month
                </span>
              </p>
              <p className="mt-3 text-[0.9375rem] leading-6 text-[#554d45]">
                or <span className="tabular-nums">$124.99</span> a year. US prices.
              </p>
              <ul className="mt-7 grid gap-3 border-t border-[#2a2420]/15 pt-6">
                {PRO.map((line) => (
                  <li key={line} className="flex gap-3 text-[1rem] leading-[1.6] text-[#4a423b]">
                    <Check />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-6 max-w-[76ch] font-mono text-xs leading-5 text-[#554d45]">
            Subscriptions renew through the App Store until cancelled. Restore Purchases is available on the paywall and
            in You › Membership. Deleting your Isofit account does not cancel an App Store subscription — that has to be
            cancelled with Apple.
          </p>
        </section>

        <div className={SHELL}>
          <Rule />
        </div>

        {/* ── 08 FAQ ─────────────────────────────────────────────── */}
        <section aria-labelledby="faq" className={`${SHELL} py-16 sm:py-20`}>
          <SectionHead index="08" id="faq" kicker="Questions" title="Six answers, before you ask." />

          <div className={`${styles.faq} mt-11 max-w-[60rem] border-t border-[#2a2420]/20`}>
            {FAQ.map((item) => (
              <details key={item.q} className="group border-b border-[#2a2420]/20">
                <summary className="flex min-h-[4.25rem] cursor-pointer items-center justify-between gap-6 py-5">
                  <h3 className="font-display text-[1.0625rem] font-bold leading-snug tracking-[-0.015em] text-[#2a2420] sm:text-[1.125rem]">
                    {item.q}
                  </h3>
                  <span
                    aria-hidden="true"
                    className={`${styles.faqMark} inline-flex size-6 shrink-0 items-center justify-center text-xl leading-none text-[#245c9b] transition-transform duration-200`}
                  >
                    +
                  </span>
                </summary>
                <p className="max-w-[62ch] pb-7 pr-8 text-[1.0625rem] leading-[1.75] text-[#4a423b]">{item.a}</p>
              </details>
            ))}
          </div>

          <p className="mt-8 font-mono text-xs uppercase tracking-[0.14em] text-[#554d45]">
            More at{" "}
            <Link href="/faq" className="text-[#245c9b] underline underline-offset-4">
              the full FAQ
            </Link>
          </p>
        </section>

        {/* ── CTA ────────────────────────────────────────────────── */}
        <section
          aria-labelledby="cta-heading"
          className="relative overflow-hidden bg-[#2a2420]"
          style={{ "--focus-ring": "#6aa5ee", "--focus-halo": "#12212f" } as React.CSSProperties}
        >
          <IsoGrid id="cta-iso" opacity={0.3} />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: "radial-gradient(85% 110% at 88% 0%, rgba(106,165,238,0.22), transparent 58%)" }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(100deg, rgba(42,36,32,0.88) 0%, rgba(42,36,32,0.62) 42%, rgba(42,36,32,0) 72%)",
            }}
          />
          <div
            className={`${SHELL} relative grid gap-12 py-16 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,416px)] lg:items-start lg:gap-16`}
          >
            <div className="min-w-0">
              <Eyebrow tone="dark">The waitlist</Eyebrow>
              <h2
                id="cta-heading"
                className="mt-5 max-w-[18ch] font-display text-[clamp(1.5rem,3vw,2.2rem)] font-bold leading-[1.1] tracking-[-0.035em] text-[#f8f6f1]"
              >
                Isofit is not out yet. <span className="text-[#6aa5ee]">This is how you hear first.</span>
              </h2>
              <p className="mt-6 max-w-[48ch] text-[1.0625rem] leading-[1.8] text-[#ded8cd]">
                The App Store listing is in review. Leave a name and an email and you will hear when it goes live. No
                spam.
              </p>
              <dl className="mt-9 grid max-w-[34rem] grid-cols-2 gap-x-8 gap-y-6 border-t border-[#f3efe6]/20 pt-7 sm:grid-cols-3">
                {[
                  ["Age rating", "18 and over"],
                  ["Sign-in", "Apple, Google, email"],
                  ["We ask for", "A name and an email"],
                ].map(([k, v]) => (
                  <div key={k} className="min-w-0">
                    <dt className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-[#cfd9e4]">{k}</dt>
                    <dd className="mt-1.5 break-words font-display text-[0.875rem] font-bold leading-snug tracking-[-0.015em] text-[#f8f6f1]">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div
              id="waitlist-cta"
              className={`${styles.waitlist} ${styles.waitlistDark} min-w-0 scroll-mt-28 rounded border border-[#f3efe6]/18 bg-[#221d19] p-6 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.9)] sm:p-8`}
            >
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[#c9d7e6]">Join the waitlist</p>
              <div className="mt-5">
                <WaitlistForm
                  formId="waitlist-form-footer"
                  dark
                  source="landing_cta"
                  label="Join the Isofit waitlist — launch announcement"
                  notice={ctaNotice}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
