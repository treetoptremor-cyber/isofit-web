import { LIMITS, PRICING } from "@/content/facts";
import type { PageDoc } from "@/content/types";
import { SITE } from "@/lib/site";

// The two cards at the top of /pricing. The table in PRICING_DOC says the same
// thing row by row; keep them in step.
export const TIER_CARDS = [
  {
    name: "Free",
    price: "$0",
    per: "",
    note: "The logger is not the paywall.",
    items: [
      "Unlimited logging by tap, Quicklog and voice",
      "Unlimited routines and full history",
      "485-exercise library and custom exercises",
      "Apple Health import",
      "Atlas: 10 messages a month",
      "Body graph preview, locked",
      "Bonfire: read, kudos, comment",
      "Data export and account deletion",
    ],
  },
  {
    name: "Pro",
    price: PRICING.proMonthly,
    per: "/ month",
    note: `or ${PRICING.proYearly} a year. Planned US prices.`,
    items: [
      "Everything in Free",
      "The full body graph: muscle detail and stats",
      "Atlas: 30 messages a day",
      "Atlas deep analysis, 100 a month",
      "Atlas programs saved to your routines",
      "A weekly SITREP on your training week",
      "Bonfire posting, one post a day",
      "Higher $ISO earning with streak multipliers",
    ],
  },
] as const;

export const PRICING_DOC: PageDoc = {
  path: "/pricing",
  name: "Pricing",
  metaTitle: "Isofit pricing: free workout logging, Pro at $14.99 a month",
  metaDescription:
    "Isofit is free for workout logging, routines, history and Apple Health import. Pro is planned at $14.99 a month or $124.99 a year and adds the full body graph, more Atlas and Bonfire posting.",
  h1: "Logging is free. Pro is $14.99 a month.",
  lede: `Isofit has two tiers. Free includes unlimited workout logging, Quicklog, routines, full history, Apple Health import, data export and ${LIMITS.freeAtlasMessages}. Pro is planned at ${PRICING.proMonthly} a month or ${PRICING.proYearly} a year in the US App Store, and adds the full body graph, higher Atlas limits with deep analysis and saved programs, the weekly SITREP, and posting to Bonfire. Isofit is not released yet, so these prices are planned and the App Store listing will be final.`,
  sections: [
    {
      id: "tiers",
      label: "Tiers",
      heading: "Free and Pro, side by side",
      table: {
        head: ["", "Free", "Pro"],
        rows: [
          ["Price", "$0", `${PRICING.proMonthly} a month or ${PRICING.proYearly} a year`],
          ["Workout logging by tap, Quicklog and voice", "Unlimited", "Unlimited"],
          ["Routines and session history", "Unlimited", "Unlimited"],
          ["Exercise library and custom exercises", "Included", "Included"],
          ["Apple Health import", "Included", "Included"],
          ["Body graph", "Locked preview", "Full graph, muscle detail, stats"],
          ["Atlas messages", "10 a month", "30 a day"],
          ["Atlas deep analysis", "One answer at a time, for 1 $ISO", "100 requests a month"],
          ["Atlas programs saved to routines", "No", "Yes"],
          ["Weekly SITREP from Atlas", "No", "Yes"],
          ["Bonfire", "Read, kudos, comment", "Read, kudos, comment and post"],
          ["$ISO earning", "On your first log of the day", "Daily amount plus a higher per-log rate with streak multipliers"],
          ["Data export and account deletion", "Included", "Included"],
        ],
      },
    },
    {
      id: "billing",
      label: "Billing",
      heading: "How billing works",
      specs: [
        { term: "Where you pay", value: "Pro is an in-app subscription bought through the Apple App Store. Apple handles payment; Isofit never sees your card." },
        { term: "Plans", value: `Monthly at ${PRICING.proMonthly} or yearly at ${PRICING.proYearly}. The yearly plan works out to about $10.42 a month.` },
        { term: "Currency", value: PRICING.currencyNote },
        { term: "Cancelling", value: "Cancel any time in your Apple account settings. Cancelling does not delete your account or your training data." },
        { term: "Deleting your account", value: "Deleting your Isofit account does not cancel an App Store subscription. Cancel the subscription with Apple as well, or Apple keeps billing you." },
        { term: "$ISO and cancelling", value: "Cancelling Pro forfeits your $ISO balance and resets your streak. $ISO has no cash value." },
      ],
    },
    {
      id: "iso",
      label: "$ISO",
      heading: "What $ISO is",
      body: [
        "$ISO is Isofit's in-app points. You earn it by logging workouts and spend it on small actions inside the app. It is not money: it has no cash value and exists only inside Isofit.",
        "These are the rates at launch. They are set on Isofit's servers and can change. Backdated sessions never earn $ISO, and every member gets one streak freeze a month, applied automatically before a streak breaks.",
      ],
      table: {
        caption: "$ISO earned and spent, at launch",
        head: ["Action", "$ISO"],
        rows: [
          ["Earn: Free, first log of the day", "+0.36"],
          ["Earn: Pro, every day", "+0.36"],
          ["Earn: Pro, first log of the day", "+0.75"],
          ["Earn: Pro log earnings on a 7-day streak", "x1.5"],
          ["Earn: Pro log earnings on a 21-day streak", "x2.0"],
          ["Spend: Bonfire kudos", "0.50"],
          ["Spend: Bonfire comment", "0.25"],
          ["Spend: voice log", "0.05"],
          ["Spend: one deep Atlas answer, for a Free member", "1.00"],
        ],
      },
    },
  ],
  faqs: [
    {
      question: "How much does Isofit cost?",
      answer: [
        `Isofit is free to log with. Pro is planned at ${PRICING.proMonthly} a month or ${PRICING.proYearly} a year in the US App Store. Prices vary by region and the App Store listing is final.`,
      ],
    },
    {
      question: "What do I get for free in Isofit?",
      answer: [
        `Unlimited workout logging by tap, Quicklog and voice, unlimited routines, full session history, the exercise library and custom exercises, Apple Health import, data export, and ${LIMITS.freeAtlasMessages}. In Bonfire you can read, give kudos and comment.`,
      ],
    },
    {
      question: "What does Isofit Pro add?",
      answer: [
        `The full body graph with muscle detail and stats, ${LIMITS.proAtlasMessages} and ${LIMITS.proAtlasDeep}, Atlas programs saved to your routines, the weekly SITREP, posting to Bonfire, and higher $ISO earning.`,
      ],
    },
    {
      question: "Is there a limit on workouts or routines on the Free tier?",
      answer: ["No. Workouts, routines and history are unlimited on Free."],
    },
    {
      question: "Does Apple Health sync cost extra?",
      answer: ["No. Connecting Apple Health is optional and included on every tier."],
    },
    {
      question: "If I cancel Pro, do I lose my workout data?",
      answer: [
        "No. Cancelling moves you to Free and keeps your account, log and history. You do forfeit your $ISO balance and your streak resets.",
      ],
      link: { href: "/terms#4-memberships-billing-and-cancellation", label: "Terms: memberships, billing and cancellation" },
    },
    {
      question: "Can I buy Isofit today?",
      answer: [`Not yet. Isofit is pre-release, with the iOS launch planned for ${SITE.launchDateLong}. Joining the waitlist is free and carries no obligation to subscribe.`],
    },
  ],
  related: ["/features", "/features/body-graph", "/features/atlas", "/compare", "/faq"],
};
