import { COMPETITORS_REVIEWED_LONG } from "@/content/competitors";
import { ACTIVITY_SCOPE, LIMITS, PRICING } from "@/content/facts";
import type { DocSection } from "@/content/types";
import { SITE } from "@/lib/site";

// Sections shared by the home page and the pages that go deeper (compare,
// about). Competitor claims here must match competitors.ts, which is sourced.

export const DIFFERENTIATORS: DocSection = {
  id: "different",
  label: "Differences",
  heading: "What makes Isofit different",
  body: [
    `Compared with Hevy, Strong, Fitbod and JEFIT, using only what each company publishes about itself, read ${COMPETITORS_REVIEWED_LONG}. Those four are released, run on Android and a smartwatch, and most cost less than Isofit Pro, so the comparison page also says where each is the better choice.`,
  ],
  items: [
    {
      heading: "Log by typing or talking, not only by tapping",
      body: `Type "bench 5x5 225lbs, run 5k 25:00 rpe 7" into Quicklog and Isofit logs two finished rows, parsed on your phone so it works with no signal. Or say the session out loud and review the draft before it saves. Hevy, Strong, Fitbod and JEFIT advertise structured set entry, and none of them advertises typed or voice logging.`,
    },
    {
      heading: "An AI coach inside the app you log with",
      body: `Atlas is a chat coach built into Isofit that, with your permission, reads your training history to review a session, explain a stall or write a program, and its scope is written into its instructions. Free includes ${LIMITS.freeAtlasMessages} and Pro includes ${LIMITS.proAtlasMessages}. Hevy offers a chat about your Hevy data, but it runs inside ChatGPT rather than the Hevy app; Strong advertises no coaching, and Fitbod and JEFIT generate workouts without a chat.`,
    },
    {
      heading: "Muscle coverage over 7, 30 or 90 days, or all time",
      body: "The body graph, a Pro feature, counts every working set you logged against the muscles it trains, over the last 7, 30 or 90 days or your whole history. Hevy's heat map covers the last 7 days. Fitbod shows a 0 to 100% recovery estimate per muscle group; Isofit counts only the work you logged and does not guess recovery.",
    },
    {
      heading: "One log for six kinds of training",
      body: `Isofit's 485-exercise library covers ${ACTIVITY_SCOPE}, so a week of lifting, running and climbing lives in one log and one body graph. Hevy, Strong, Fitbod and JEFIT each describe themselves as strength-first or strength-focused. JEFIT's library is larger, at 1,400+ exercises, but it is built around strength training.`,
    },
    {
      heading: "A community without followers or leaderboards",
      body: "Bonfire is a members-only feed where every post is tied to a session you logged, capped at one post a day, with no follows, groups or direct messages. Your log stays private unless you post. Hevy's home tab is a follow-based feed with leaderboards, and JEFIT lets you follow friends and share to its feed.",
    },
  ],
};

// The home page's one-line version of the five, pointing to /compare for the
// sourced detail. Same claims, same competitor facts.
export const DIFFERENTIATORS_BRIEF: DocSection = {
  id: "different",
  label: "Differences",
  heading: "What makes Isofit different",
  body: [
    `Compared with Hevy, Strong, Fitbod and JEFIT as each describes itself, read ${COMPETITORS_REVIEWED_LONG}. Those four are released, run on Android and a watch, and most cost less.`,
  ],
  items: [
    { heading: "Log by typing or talking", body: "Type \"bench 5x5 225lbs\" or say the session. None of the four advertises typed or voice logging." },
    { heading: "A coach inside the app", body: "Atlas is a chat coach built into Isofit. Hevy's chat runs inside ChatGPT; Strong, Fitbod and JEFIT advertise no chat." },
    { heading: "Any time window", body: "The body graph looks back 7, 30 or 90 days or all time. Hevy's heat map covers the last 7 days." },
    { heading: "One log for six kinds of training", body: "485 exercises across lifting, cardio, yoga, sports, climbing and martial arts. The four describe themselves as strength-first or strength-focused." },
    { heading: "No followers or leaderboards", body: "Bonfire posts are tied to logged sessions, one a day. Hevy's home feed is built on follows and leaderboards." },
  ],
};

export const AUDIENCE: DocSection = {
  id: "who-for",
  label: "Who it is for",
  heading: "Who Isofit is for",
  body: [
    "Isofit is for adults 18 and over with an iPhone on iOS 17.6 or later. It is not the right fit if you need Android or a smartwatch, want the app to plan each workout for you, or want calorie tracking.",
  ],
  bullets: [
    "Lifters who log every set and find tapping through rows between sets too slow.",
    "Hybrid athletes who mix lifting with running, climbing, yoga, sports or martial arts and want one log instead of one app per sport.",
    "People who want to see which muscles they have neglected over the last 7, 30 or 90 days.",
    "People training without a coach who want answers drawn from their own training history, not a generic plan.",
    "Hevy and Strong users who want typed or voice logging and a coach they can chat with.",
    "People who want their log private by default, with a feed they post to only when they choose.",
  ],
};

export const HOW_IT_WORKS: DocSection = {
  id: "how-it-works",
  label: "Getting started",
  heading: "How Isofit works",
  items: [
    {
      heading: "Join the waitlist",
      body: `Isofit is not in the App Store yet. Leave an email address, and a first name if you like, and you get one email when the app launches, planned for ${SITE.launchDateLong}. Joining is free and does not commit you to a subscription.`,
    },
    {
      heading: "Download it and sign in",
      body: "At launch, Isofit is a free download for iPhone on iOS 17.6 or later. Sign in with Apple, Google, or an email and password. Isofit is for adults 18 and over.",
    },
    {
      heading: "Log your first session",
      body: "Tap in sets, type a Quicklog line or speak the session, then finish it to save it to your history. Save any finished session as a routine to start from next time.",
    },
    {
      heading: "Turn on only what you want",
      body: "Apple Health access and Atlas personalization are both off until you turn them on, and you can turn either off later. You choose which Apple Health data types Isofit may read in the iOS permission screen.",
    },
    {
      heading: "Upgrade, cancel or leave",
      body: `Pro is a monthly (${PRICING.proMonthly}) or yearly (${PRICING.proYearly}) App Store subscription with no long-term contract, cancelled any time in your Apple account settings. Cancelling keeps your account and training data. You can export everything as a JSON file, or delete your account from inside the app with a seven-day grace period.`,
    },
    {
      heading: "Get help",
      body: `Support is by email at ${SITE.supportEmail}, with a reply ${SITE.supportResponse}. Privacy requests go to ${SITE.privacyEmail}, and if a fact on this site is out of date, email support and it will be corrected.`,
    },
  ],
};

const FOUNDER_PORTRAIT = { src: SITE.founder.photo, alt: `Illustrated black-and-white portrait of ${SITE.founder.name}, founder of Isofit, under a string of bare bulbs.` };

// The full letter, in An's own words, for /about. Edit it only at typo level.
export const FOUNDER: DocSection = {
  id: "founder",
  label: "Founder",
  heading: `Meet ${SITE.founder.name}, Isofit's founder`,
  byline: "Founder, designer and developer",
  image: FOUNDER_PORTRAIT,
  links: [
    { href: SITE.founder.linkedInUrl, label: "LinkedIn" },
    { href: SITE.founder.xUrl, label: `X (${SITE.founder.xHandle})` },
  ],
  quote: {
    text: "I wanted to see my progress, understand where my effort was going, and know whether my program was actually working.",
  },
  statement: {
    attribution: `${SITE.founder.name}, founder of Isofit`,
    paragraphs: [
      "I founded Isofit in 2026 to make workout logging easy and useful beyond the workout. I design and build the app myself, working between New York City and Philadelphia.",
      "I’ve been strength training for over 15 years and spent much of that time researching training principles and writing my own programs. But my workout history lived in pages of the Notes app that I rarely reopened. I was recording the work without getting anything back from it. I wanted to see my progress, understand where my effort was going, and know whether my program was actually working.",
      "In early 2026, I was negotiating to buy an independent gym and began scoping its membership software as a CRM. When the deal fell through, I realized I didn’t need to own a gym to build something useful for the people in it. The workout log became the focus.",
      "That’s what drives Isofit: quick logging, useful visualizations, and a clearer connection between the work you put in and what you do next. Atlas, Isofit’s AI coach, brings guidance into that same space, with the ability to help you make sense of your own training history (if you opt in). It gives general guidance without personalization.",
      "Before Isofit, I spent eight years in New York fine dining as a senior server and captain at Jungsik, Loring Place, and Pastis. Preparation, timing, and the habit of learning from each service still shape how I build. I hold degrees from Parsons School of Design and Baruch College’s Zicklin School of Business.",
      "As of 2025 I’m also a new father. Isofit was conceived and built during nap time.",
    ],
  },
};

// The home page's founder panel, in An's words, with the Atlas and data cards.
export const FOUNDER_PANEL: DocSection = {
  id: "team",
  label: `Independent by design · Founded in ${SITE.founded}`,
  heading: "Why I built Isofit.",
  byline: "Founder, designer & developer",
  image: FOUNDER_PORTRAIT,
  quote: {
    text: "I wanted to see my progress, understand where my effort was going, and know whether my program was actually working.",
  },
  statement: {
    attribution: `${SITE.founder.name}, founder of Isofit`,
    paragraphs: [
      "I founded Isofit to make workout logs useful beyond the workout. I design and build the app myself, working between New York City and Philadelphia.",
      "I’m also a new father. Most of Isofit was built during nap time.",
    ],
  },
  items: [
    { label: "Atlas · AI coach", heading: "Ask about your training.", body: "Review a session or plan your next week. With your permission, Atlas can use your workout history." },
    { label: "Your data", heading: "Your training stays yours.", body: "Your log is private by default. You choose what to share and can export your data." },
  ],
};

export const KEY_FACTS: DocSection = {
  id: "key-facts",
  label: "Reference",
  heading: "Key facts about Isofit",
  specs: [
    { term: "Company name", value: `${SITE.company}, publisher of the Isofit app` },
    { term: "Type", value: "Consumer mobile app: a workout logger for iPhone" },
    { term: "Founded", value: SITE.founded },
    {
      term: "Founder",
      value: `${SITE.founder.name}: strength athlete of 15+ years; eight years as a senior server and captain in New York fine dining (Jungsik, Loring Place, Pastis); degrees from Parsons School of Design and Baruch Zicklin School of Business. ${SITE.founder.linkedInUrl}`,
    },
    { term: "Headquarters", value: `${SITE.company} is domiciled in ${SITE.domicile}. The app is designed in ${SITE.madeIn}.` },
    { term: "Team", value: `One developer, the founder` },
    { term: "Website", value: SITE.url },
    { term: "Core offering", value: "A workout logger with a muscle-by-muscle body graph, an AI coach and a members-only community" },
    {
      term: "Features",
      value: "Workout logging by tap, typed Quicklog line or voice; body graph; Atlas AI coach; Bonfire community; read-only Apple Health import; JSON data export",
    },
    { term: "Platform", value: "iPhone, iOS 17.6 or later. No iPad, Apple Watch, Android or web app." },
    { term: "Exercise library", value: `485 exercises across ${ACTIVITY_SCOPE}, plus custom exercises` },
    { term: "Pricing", value: `Free tier for logging. Pro is planned at ${PRICING.proMonthly} a month or ${PRICING.proYearly} a year (USD, US App Store).` },
    { term: "Contract terms", value: "Monthly or yearly App Store subscription. No long-term contract; cancel any time in your Apple account settings." },
    { term: "Status", value: `Pre-release. iOS launch planned ${SITE.launchDateLong}.` },
    { term: "Support", value: `Email ${SITE.supportEmail}, answered ${SITE.supportResponse}. Privacy requests: ${SITE.privacyEmail}.` },
    { term: "Competitors", value: "Hevy, Strong, Fitbod and JEFIT" },
    { term: "Social", value: `Isofit: ${SITE.xHandle} on X. ${SITE.founder.name}: ${SITE.founder.xHandle} on X, and ${SITE.founder.linkedInUrl}` },
    { term: "Facts last reviewed", value: SITE.factsReviewedLong },
  ],
};
