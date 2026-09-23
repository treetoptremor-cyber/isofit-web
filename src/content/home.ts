import { ACTIVITY_SCOPE, LIMITS, PRICING } from "@/content/facts";
import { AUDIENCE, DIFFERENTIATORS, HOW_IT_WORKS, KEY_FACTS, TEAM } from "@/content/positioning";
import type { PageDoc } from "@/content/types";
import { SITE } from "@/lib/site";

export const HOME_DOC: PageDoc = {
  path: "/",
  name: "Isofit",
  metaTitle: "Isofit: workout logger for iPhone with a body graph and AI coach",
  metaDescription:
    "Isofit is a workout logger for iPhone. Log by tapping, typing or talking, see which muscles your training reaches, and ask Atlas, an AI coach that reads your log. iOS launch planned October 1, 2026.",
  h1: "Isofit is a workout logger for iPhone that shows you what your training adds up to.",
  lede:
    "Isofit is a workout logger for iPhone that turns the sessions you tap, type or say into a muscle-by-muscle picture of your training, for adults who lift, run, climb, practice yoga or martial arts, or mix them. Log a set by tapping it in, typing a line like \"bench 5x5 225lbs\", or saying it out loud. A front and back body graph shows which muscles that work reached, and Atlas, a built-in AI coach, answers questions using your actual training history. Logging is free. Isofit is not released yet: the iOS launch is planned for October 1, 2026.",
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
        "The Log tab is the logger. Every exercise is a row with the numbers that fit it: sets, reps and weight for a lift, distance and time for a run, a duration for a hold, and an RPE for how hard it felt.",
        "If tapping is too slow, type one line into Quicklog. \"bench 5x5 225lbs, run 5k 25:00 rpe 7\" becomes two finished rows. Quicklog is parsed on your phone, so it works with no signal. Or hold the microphone and describe the session; Isofit turns the transcript into a draft that you review before anything is saved.",
      ],
      bullets: [
        "Pounds or kilograms, miles or kilometers, switchable per row.",
        "A set timer and a rest timer on every exercise.",
        "Save any finished session as a routine and start from it next time.",
        "Sessions you finish offline are queued on the phone and sync when you reconnect.",
      ],
    },
    {
      id: "see",
      level: 3,
      label: "02 · See it",
      heading: "See which muscles your training actually reaches",
      body: [
        "Every working set you log is credited to the muscles it trains: full credit for the main movers, partial credit for the muscles that assist. The body graph shades a front and back figure by that count, so the muscles you train most read warmest and the ones you have been skipping stay pale.",
        "Switch between the last 7, 30 or 90 days or your whole history. Beside the figure, Isofit lists sets by muscle, your total sets, and your most and least worked muscle. It counts logged work. It is not a recovery score and does not guess how sore you are.",
      ],
    },
    {
      id: "ask",
      level: 3,
      label: "03 · Ask Atlas",
      heading: "Ask Atlas, an AI coach that can read your log",
      body: [
        "Atlas is a chat-based AI coach inside Isofit. Ask it to review the session you just finished, explain why a lift has stalled, or plan next week around the equipment you have.",
        "Personalization is off until you turn it on. When it is on, Atlas reads your training history so its answers are about your training and not a generic template. On Pro, Atlas can write a program and save it straight into your routines.",
        "Atlas gives general fitness guidance. It does not diagnose injuries, give medical advice or replace a clinician.",
      ],
    },
    {
      id: "bonfire",
      level: 3,
      label: "04 · Bonfire",
      heading: "Share a session at the Bonfire, or never post at all",
      body: [
        "Bonfire is Isofit's community feed, open only to members. A post is a caption, an optional photo and the logged session behind it, limited to one post a day. There are no follows, groups or direct messages.",
        "Your workout log is private. Nothing reaches Bonfire unless you choose to post that session, and you can use Isofit without ever opening the tab.",
      ],
    },
    DIFFERENTIATORS,
    AUDIENCE,
    {
      id: "is-and-is-not",
      label: "Plainly stated",
      heading: "What Isofit is, and what it is not",
      body: [
        "Most wrong answers about a new app come from guessing. These are the boundaries as of the review date on this page.",
      ],
      columns: [
        {
          heading: "Isofit is",
          tone: "yes",
          items: [
            `A logger for any training: ${ACTIVITY_SCOPE}.`,
            "An iPhone app for iOS 17.6 or later.",
            "Free to log with, with a paid Pro tier.",
            "A reader of Apple Health, if you connect it.",
            "A record of the work you logged, counted in working sets.",
            "Home to an AI coach scoped to training questions.",
            "For adults aged 18 and over.",
          ],
        },
        {
          heading: "Isofit is not",
          tone: "no",
          items: [
            "Tied to one training style, and it does not require you to follow an Isofit program.",
            "Available on Android, iPad, Apple Watch or the web.",
            `Released yet. The iOS launch is planned for ${SITE.launchDateLong}.`,
            "A writer to Apple Health. It never adds or changes Health data.",
            "A recovery, readiness or soreness score.",
            "A medical device, a diagnostic tool or a substitute for a clinician or in-person coach.",
            "A meal, calorie or macro tracker.",
          ],
        },
      ],
    },
    TEAM,
    HOW_IT_WORKS,
    {
      id: "free-and-pro",
      label: "Pricing",
      heading: "What is free and what is Pro",
      body: [
        `Isofit has two tiers. Free covers the logger itself. Pro, planned at ${PRICING.proMonthly} a month or ${PRICING.proYearly} a year, unlocks the full body graph, more of Atlas, and posting to Bonfire.`,
      ],
      table: {
        head: ["", "Free", "Pro"],
        rows: [
          ["Workout logging, Quicklog, routines, history", "Included", "Included"],
          ["Apple Health import", "Included", "Included"],
          ["Body graph", "Preview only, locked", "Full graph, muscle detail and stats"],
          ["Atlas AI coach", LIMITS.freeAtlasMessages, `${LIMITS.proAtlasMessages}, plus ${LIMITS.proAtlasDeep}`],
          ["Atlas programs saved to your routines", "No", "Yes"],
          ["Bonfire community", "Read, give kudos, comment", "All of that, plus posting"],
          ["Data export and account deletion", "Included", "Included"],
        ],
      },
    },
    {
      id: "your-data",
      label: "Your data",
      heading: "Your training data stays yours",
      bullets: [
        "Isofit does not sell personal information and does not use your data for advertising.",
        "Your fitness and health data is not used to train AI models.",
        "Export everything as a JSON file, or delete your account, from inside the app.",
        "Usage analytics are first-party only, with a switch to turn them off.",
        "Atlas personalization and Apple Health access are both opt-in and both revocable.",
      ],
    },
    KEY_FACTS,
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
      question: "What kinds of training can I log in Isofit?",
      answer: [
        `Any kind. The library covers ${ACTIVITY_SCOPE}, rows adapt to the activity, and you can create a custom exercise for anything that is missing.`,
      ],
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
    {
      question: "How is Isofit different from other workout trackers?",
      answer: [
        "You can log in plain language, typed or spoken, as well as by tapping in sets. The body graph turns your log into a muscle-by-muscle picture of where your working sets went. And Atlas is a conversational coach that reads your own history, where most trackers offer either no coaching or an automatic workout generator.",
      ],
      link: { href: "/compare", label: "Compare Isofit with Hevy, Strong, Fitbod and JEFIT" },
    },
  ],
  related: ["/features/workout-logging", "/features/body-graph", "/features/atlas", "/pricing", "/compare", "/faq"],
};
