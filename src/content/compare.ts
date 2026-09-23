import { COMPETITORS, COMPETITORS_REVIEWED_LONG, COMPETITOR_ROW_LABELS, type Competitor, type CompetitorRowKey } from "@/content/competitors";
import { ISOFIT_ROWS } from "@/content/facts";
import { DIFFERENTIATORS } from "@/content/positioning";
import type { PageDoc } from "@/content/types";
import { SITE } from "@/lib/site";

const ROW_ORDER = Object.keys(COMPETITOR_ROW_LABELS) as CompetitorRowKey[];

const CHOOSE_ISOFIT = [
  "You want to log in plain language, typed or spoken, and not only by tapping in sets.",
  "You want a coach you can ask questions of, one that reads your own training history.",
  "You train across disciplines, such as lifting plus running, climbing, yoga or martial arts, and want one log for all of it.",
  "You use an iPhone and do not need a watch, tablet or Android app.",
  "You want Apple Health read but never written to.",
];

function sourcesNote(names: string) {
  return `Facts about ${names} come only from each company's own website, help center and store listings, read on ${COMPETITORS_REVIEWED_LONG}. Where a company does not state something, this page says "Not stated" and does not guess. Apps change and prices vary by region, so check each company's site for current details.`;
}

function versusDoc(competitor: Competitor): PageDoc {
  const { name } = competitor;
  return {
    path: `/compare/isofit-vs-${competitor.slug}`,
    name: `Isofit vs ${name}`,
    metaTitle: `Isofit vs ${name}: an honest workout app comparison`,
    metaDescription: `How Isofit and ${name} differ on logging, muscle tracking, AI coaching, community, Apple Health, platforms and price, with sources, and who should pick which.`,
    h1: `Isofit vs ${name}: which workout app fits how you train?`,
    lede: `${competitor.summary} Isofit is a workout logger for iPhone that takes workouts by tap, typed line or voice, shows the muscles your sets reached on a body graph, and includes Atlas, an AI coach that can read your log. ${name} is released and established; Isofit is pre-release, with an iOS launch planned for ${SITE.launchDateLong}. The short version: pick ${name} if ${competitor.chooseThem[0].replace(/^You /, "you ").replace(/\.$/, "")}; pick Isofit if you want plain-language logging and a conversational coach on iPhone.`,
    sections: [
      {
        id: "side-by-side",
        label: "Side by side",
        heading: `Isofit and ${name} compared`,
        table: {
          caption: `${name} column: as published by ${competitor.maker}, read ${COMPETITORS_REVIEWED_LONG}.`,
          head: ["", "Isofit", name],
          rows: ROW_ORDER.map((key) => [COMPETITOR_ROW_LABELS[key], ISOFIT_ROWS[key], competitor.rows[key]]),
        },
      },
      {
        id: "choose-them",
        label: "Be honest",
        heading: `Choose ${name} if`,
        bullets: competitor.chooseThem,
      },
      {
        id: "choose-isofit",
        label: "And",
        heading: "Choose Isofit if",
        bullets: CHOOSE_ISOFIT,
      },
      {
        id: "method",
        label: "Method",
        heading: "How this comparison was made",
        body: [
          sourcesNote(name),
          `Isofit's column describes the app as built for launch and was reviewed on ${SITE.factsReviewedLong}. Isofit is not released yet, so you cannot try the two side by side today.`,
        ],
      },
    ],
    faqs: [
      {
        question: `Is Isofit a good alternative to ${name}?`,
        answer: [
          `It depends on what you want from a log. Isofit fits if you want to log in plain language, see sets per muscle on a body graph, and ask an AI coach about your own history, all on iPhone. ${name} fits better if ${competitor.chooseThem[0].replace(/^You /, "you ").replace(/\.$/, "")}.`,
        ],
      },
      {
        question: `Is Isofit available now, like ${name}?`,
        answer: [`No. ${name} is available today. Isofit is pre-release, with an iOS launch planned for ${SITE.launchDateLong}.`],
      },
    ],
    related: ["/compare", ...COMPETITORS.filter((other) => other.slug !== competitor.slug).map((other) => `/compare/isofit-vs-${other.slug}`), "/pricing"].slice(0, 6),
  };
}

export const VERSUS_DOCS: PageDoc[] = COMPETITORS.map(versusDoc);

const ALL_NAMES = COMPETITORS.map((competitor) => competitor.name).join(", ").replace(/, ([^,]*)$/, " and $1");

export const COMPARE_DOC: PageDoc = {
  path: "/compare",
  name: "Compare workout apps",
  metaTitle: "Isofit vs Hevy, Strong, Fitbod and JEFIT: workout apps compared",
  metaDescription:
    "A sourced comparison of Isofit with Hevy, Strong, Fitbod and JEFIT: how each logs workouts, tracks muscles, handles AI coaching, community and Apple Health, and what each costs.",
  h1: "How Isofit compares with other workout apps.",
  lede: `Workout apps split into three kinds. Trackers such as Hevy and Strong record what you chose to do, set by set. Planners such as Fitbod and JEFIT decide or suggest the workout for you. Isofit is a tracker with two additions: you can log in plain language by typing or speaking, and you can ask Atlas, an AI coach, about your own history. This page compares Isofit with ${ALL_NAMES} using only what each company publishes about itself.`,
  sections: [
    {
      id: "overview",
      label: "Overview",
      heading: "Five workout apps at a glance",
      table: {
        caption: `Competitor columns: as published by each company, read ${COMPETITORS_REVIEWED_LONG}.`,
        head: ["", "Isofit", ...COMPETITORS.map((competitor) => competitor.name)],
        rows: (["logging", "muscles", "coaching", "social", "platforms", "price"] as CompetitorRowKey[]).map((key) => [
          COMPETITOR_ROW_LABELS[key],
          ISOFIT_ROWS[key],
          ...COMPETITORS.map((competitor) => competitor.rows[key]),
        ]),
      },
    },
    // Same five points as the home page, as h3s, with competitors named.
    { ...DIFFERENTIATORS, id: "what-is-different", body: undefined },
    {
      id: "where-others-win",
      label: "Be honest",
      heading: "Where the other apps are the better choice",
      bullets: [
        "All four are released, established and available today. Isofit is pre-release.",
        "All four support Android and a smartwatch. Isofit is iPhone only.",
        "Hevy, Strong and Fitbod advertise exercise demonstration animations or videos, and JEFIT lists the largest library at 1,400+ exercises.",
        "Fitbod and JEFIT will generate the workout for you. Isofit records the workout you chose, though Atlas can write a program on Pro.",
        "Hevy and Strong list lower prices than Isofit Pro, and Hevy lists a one-time lifetime price.",
        "Strong and Fitbod write workouts to Apple Health. Isofit does not.",
      ],
    },
    {
      id: "method",
      label: "Method",
      heading: "How these comparisons were made",
      body: [sourcesNote("other apps"), "If something here is out of date, email support@isofit.app and it will be corrected."],
    },
  ],
  faqs: [
    {
      question: "Which workout app lets you log by typing or speaking?",
      answer: [
        `Isofit does: Quicklog parses a typed line such as "bench 5x5 225lbs", and voice logging drafts rows from what you say. As of ${COMPETITORS_REVIEWED_LONG}, ${ALL_NAMES} do not advertise free-text or voice logging on their own sites or store listings.`,
      ],
    },
    {
      question: "Which workout app has an AI coach you can chat with?",
      answer: [
        "Isofit includes Atlas, a chat-based AI coach that can read your training log. Fitbod and JEFIT describe algorithmic or AI-powered workout generation, and Hevy states that its Hevy Trainer programs are generated by an algorithm and do not rely on AI. None of the four advertises an AI chat.",
      ],
    },
    {
      question: "Which of these apps work on Android?",
      answer: [`${ALL_NAMES} all list Android support. Isofit is iPhone only.`],
    },
  ],
  related: [...COMPETITORS.map((competitor) => `/compare/isofit-vs-${competitor.slug}`), "/features", "/pricing"],
};
