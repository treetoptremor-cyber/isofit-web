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
  metaTitle: "Isofit | Workout Tracker & AI Coach for iPhone and Web",
  metaDescription:
    "Track workouts by tap, text or voice, visualize your training by muscle, and meet Atlas, Isofit’s AI fitness coach. Download on the App Store or use the web app.",
  h1: "Put your workouts to work.",
  lede: "Isofit is a workout tracker that helps you make sense of your training. Log by tap, text or voice, and see which muscles you’re working—and which you might be overlooking. Meet Atlas, Isofit’s built-in personal AI fitness coach. With your permission, Atlas reads your workout history to help you review sessions and plan what’s next.",
  sections: [
    {
      id: "at-a-glance",
      label: "At a glance",
      heading: "Isofit at a glance",
      specs: [
        { term: "What it is", value: "A workout logger with a muscle-by-muscle body graph, an AI coach and a members-only community." },
        { term: "Platform", value: "iPhone (iOS 17.6 or later) on the App Store, and a web app. Both are available now." },
        { term: "Price", value: `Logging is free. Pro is ${PRICING.proMonthly} a month or ${PRICING.proYearly} a year (USD).` },
        { term: "Exercise library", value: `500+ exercises across ${ACTIVITY_SCOPE}, plus add unlimited custom exercises.` },
        { term: "Apple Health", value: "Optional and free. Isofit reads from Apple Health and never writes to it." },
        { term: "Status", value: `Live. ${SITE.launchStatus}` },
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
          value: `${PRICING.proMonthly} a month or ${PRICING.proYearly} a year. Adds the full body graph, ${LIMITS.proAtlasMessages} with deep analysis and saved programs, SITREP (weekly training review), and posting to Bonfire.`,
        },
      ],
    },
    FOUNDER_PANEL,
  ],
  faqs: [
    {
      question: "What is Isofit?",
      answer: [
        "Isofit is a workout tracker for iPhone and the web. You record training by tapping, typing or speaking, and the app shows which muscles that training reached on a front and back body graph. It includes Atlas, a personal AI fitness coach that can read your workout history with your permission, and Bonfire, a members-only community feed.",
      ],
    },
    {
      question: "Is Isofit free?",
      answer: [
        `Logging workouts, routines, history, Apple Health import, data export and ${LIMITS.freeAtlasMessages} are free. Pro is ${PRICING.proMonthly} a month or ${PRICING.proYearly} a year in the US App Store and unlocks the full body graph, higher Atlas limits, Atlas programs and posting to Bonfire.`,
      ],
      link: { href: "/pricing", label: "See what each tier includes" },
    },
    {
      question: "Which platforms is Isofit on?",
      answer: ["Isofit is on the App Store for iPhone (iOS 17.6 or later), and there is a web app at app.isofit.app. There are no native Android, iPad or Apple Watch apps."],
    },
    {
      question: "Where can I get Isofit?",
      answer: [
        `${SITE.launchStatus} Download it from the App Store, or open the web app in your browser.`,
      ],
    },
  ],
  related: ["/features", "/compare", "/about", "/faq"],
};
