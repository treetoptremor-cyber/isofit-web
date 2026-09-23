import { ACTIVITY_SCOPE, LIMITS, PRICING } from "@/content/facts";
import { DIFFERENTIATORS_BRIEF, FOUNDER_PANEL } from "@/content/positioning";
import type { PageDoc } from "@/content/types";
import { SITE } from "@/lib/site";

// The landing page summarizes and links. Each feature's full explanation lives
// on its own page; the founder letter, how-it-works steps and the full fact
// sheet live on /about; the sourced comparison lives on /compare.
export const HOME_DOC: PageDoc = {
  path: "/",
  name: "Isofit",
  metaTitle: "Isofit: workout logger for iPhone with a body graph and AI coach",
  metaDescription:
    "Isofit is a workout logger for iPhone. Log by tapping, typing or talking, see which muscles your training reaches, and ask Atlas, an AI coach that reads your log. iOS launch planned October 1, 2026.",
  h1: "See what your training adds up to.",
  lede: "Isofit logs your workouts by tap, text or voice and shows where your working sets go. Ask Atlas about your training history once you turn on personalization.",
  sections: [
    {
      id: "at-a-glance",
      label: "At a glance",
      heading: "Isofit at a glance",
      specs: [
        { term: "What it is", value: "A workout logger with a muscle-by-muscle body graph, an AI coach and a members-only community." },
        { term: "Platform", value: "iPhone, iOS 17.6 or later. No iPad, Apple Watch, Android or web app." },
        { term: "Price", value: `Logging is free. Pro is planned at ${PRICING.proMonthly} a month or ${PRICING.proYearly} a year (USD).` },
        { term: "Exercise library", value: `485 exercises across ${ACTIVITY_SCOPE}, plus your own custom exercises.` },
        { term: "Apple Health", value: "Optional and free. Isofit reads from Apple Health and never writes to it." },
        { term: "Status", value: `Pre-release. iOS launch planned ${SITE.launchDateLong}.` },
      ],
    },
    {
      id: "does",
      label: "The app",
      heading: "What Isofit does",
      body: [
        "Isofit has four parts, one per tab in the app: a logger that takes taps, typed lines or your voice; a body graph of the muscles your sets reached; Atlas, an AI coach; and Bonfire, a members-only community feed.",
      ],
    },
    {
      id: "log",
      level: 3,
      label: "01 · Log it",
      heading: "Log a workout by tapping, typing or talking",
      body: [
        "Every exercise is a row with the numbers that fit it: sets, reps and weight, distance and time, or a hold, plus RPE. Type one Quicklog line such as \"bench 5x5 225lbs\" and get finished rows, parsed on your phone with no signal needed. Or say the session and review the draft before it saves.",
      ],
    },
    {
      id: "see",
      level: 3,
      label: "02 · See it",
      heading: "See which muscles your training actually reaches",
      body: [
        "Every working set you log counts toward the muscles it trains, and the body graph shades a front and back figure by that count over 7, 30 or 90 days or all time. The muscles with the most credited work read warmest; those with relatively little stay pale. It counts logged work, not recovery. The full graph is part of Pro.",
      ],
    },
    {
      id: "ask",
      level: 3,
      label: "03 · Ask Atlas",
      heading: "Ask Atlas, an AI coach that can read your log",
      body: [
        "Atlas is a chat coach inside Isofit. Ask it to review a session, explain a stalled lift or plan next week. Turn on personalization and it answers from your own training history; leave it off and it gives general guidance. It does not give medical advice.",
      ],
    },
    {
      id: "bonfire",
      level: 3,
      label: "04 · Bonfire",
      heading: "Share a session at the Bonfire, or never post at all",
      body: [
        "Bonfire is a members-only feed where every post is a session you logged, one a day, with no follows, groups or direct messages. Your log stays private unless you choose to post it.",
      ],
    },
    DIFFERENTIATORS_BRIEF,
    {
      id: "free-and-pro",
      label: "Pricing",
      heading: "What is free and what is Pro",
      specs: [
        {
          term: "Free",
          value: `Unlimited logging by tap and Quicklog, routines, full history, Apple Health import, data export and ${LIMITS.freeAtlasMessages}. Voice logging uses earned $ISO.`,
        },
        {
          term: "Pro",
          value: `Planned at ${PRICING.proMonthly} a month or ${PRICING.proYearly} a year. Adds the full body graph, ${LIMITS.proAtlasMessages} with deep analysis and saved programs, SITREP (weekly training review), and posting to Bonfire.`,
        },
      ],
    },
    FOUNDER_PANEL,
  ],
  faqs: [
    {
      question: "What is Isofit?",
      answer: [
        "Isofit is a workout logging app for iPhone. You record training by tapping, typing or speaking, and the app shows which muscles that training reached on a front and back body graph. It includes Atlas, an AI coach that can read your log, and Bonfire, a members-only community feed.",
      ],
    },
    {
      question: "Is Isofit free?",
      answer: [
        `Logging workouts, routines, history, Apple Health import, data export and ${LIMITS.freeAtlasMessages} are free. Pro is planned at ${PRICING.proMonthly} a month or ${PRICING.proYearly} a year in the US App Store and unlocks the full body graph, higher Atlas limits, Atlas programs and posting to Bonfire.`,
      ],
      link: { href: "/pricing", label: "See what each tier includes" },
    },
    {
      question: "Is Isofit available on Android or Apple Watch?",
      answer: ["No. Isofit is built for iPhone running iOS 17.6 or later. There is no Android, iPad, Apple Watch or web version."],
    },
    {
      question: "When does Isofit launch?",
      answer: [
        `The iOS launch is planned for ${SITE.launchDateLong}. Isofit is not in the App Store yet. Joining the waitlist gets you one email when it is available.`,
      ],
    },
  ],
  related: ["/features", "/compare", "/about", "/faq"],
};
