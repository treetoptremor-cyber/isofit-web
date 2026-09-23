import type { CompetitorRowKey, HubRowKey } from "@/content/competitors";

// Product facts reused across pages. Each was checked against the iOS app
// source (build 9) on SITE.factsReviewed. Things that could not be confirmed
// there (form check, notifications, a free trial, PR tracking) are deliberately
// absent from the site.

export const PRICING = {
  // Planned US App Store prices. The App Store listing is the authority.
  proMonthly: "$14.99",
  proYearly: "$124.99",
  currencyNote: "USD, US App Store. Prices vary by region and the App Store listing is final.",
} as const;

export const LIMITS = {
  freeAtlasMessages: "10 Atlas messages a month",
  proAtlasMessages: "30 Atlas messages a day",
  proAtlasDeep: "100 deep-analysis requests a month",
} as const;

export const ACTIVITY_SCOPE = "strength training, cardio, yoga, sports and martial arts";

export const ISOFIT_BRIEF: Record<HubRowKey, string> = {
  logging: "Tap, a typed Quicklog line, or voice.",
  muscles: "Body graph over 7, 30 or 90 days or all time (Pro).",
  coaching: "Atlas, an AI coach you chat with.",
  social: "Bonfire: members only, no follows or direct messages.",
  platforms: "iPhone only, iOS 17.6 or later.",
  price: `Free. Pro planned at ${PRICING.proMonthly} a month or ${PRICING.proYearly} a year.`,
};

export const ISOFIT_ROWS: Record<CompetitorRowKey, string> = {
  platforms: "iPhone only, iOS 17.6 or later. No iPad, Apple Watch, Android or web app.",
  logging:
    "Three ways into one structured log: tap in sets, reps, weight, distance, duration and RPE; type a Quicklog line such as \"bench 5x5 225lbs\"; or speak the workout and review the parsed draft before saving.",
  library: `500+ exercises covering ${ACTIVITY_SCOPE}, plus add unlimited custom exercises with your own muscle mapping.`,
  muscles:
    "A front and back body graph shaded by working sets per muscle over 7, 30 or 90 days or all time, with sets by muscle and most and least worked. It is explicitly not a recovery score. Pro feature.",
  coaching:
    "Atlas, an AI coach you talk to in chat. With your permission it reads your training history, and on Pro it writes programs and routines into your log. General fitness guidance, not medical advice.",
  social:
    "Bonfire, a members-only feed. A post is tied to a session you logged, limited to one a day, and visible to all members. No follows, groups or direct messages.",
  health: "Optionally reads workouts and daily summaries from Apple Health on every tier. Does not write to Apple Health.",
  scope: `Logs ${ACTIVITY_SCOPE}.`,
  price: `Free tier with logging, history and Apple Health import. Pro is planned at ${PRICING.proMonthly} monthly or ${PRICING.proYearly} yearly (USD).`,
  export: "On-demand JSON export of your training, Atlas, account, health and social records.",
};
