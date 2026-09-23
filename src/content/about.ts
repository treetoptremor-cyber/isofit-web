import { ACTIVITY_SCOPE } from "@/content/facts";
import { FOUNDER, HOW_IT_WORKS, KEY_FACTS } from "@/content/positioning";
import type { PageDoc } from "@/content/types";
import { SITE } from "@/lib/site";

export const ABOUT_DOC: PageDoc = {
  path: "/about",
  name: "About Isofit",
  metaTitle: "About Isofit and founder An Hu | iPhone workout logger",
  metaDescription:
    "Isofit is an independent workout logging app for iPhone, founded in 2026 by An Hu and designed in Queens, New York. Who builds it, what it is for, where the name comes from, and how to get in touch.",
  h1: "Isofit is an independent workout app, founded by An Hu and designed in Queens, New York.",
  lede: `Isofit is a workout logger for iPhone published by ${SITE.company} and designed in ${SITE.madeIn}. It was founded in ${SITE.founded} by ${SITE.founder.name}, who builds it alone. The app exists to make a training log useful after the workout is over: quick to fill in, honest about what you trained, and able to answer questions about it. The iOS launch is planned for ${SITE.launchDateLong}.`,
  sections: [
    FOUNDER,
    {
      id: "why",
      label: "Purpose",
      heading: "Why Isofit exists",
      body: [
        "Most workout logs remember everything and tell you nothing. You write down sets for months and end up with a long list. Isofit starts from the question that list cannot answer on its own: what does all this work add up to?",
        "So the app does three things in order. It makes logging fast enough that you keep doing it, by accepting taps, a typed line or your voice. It turns the log into a picture, the body graph, that shows which muscles your sets reached. And it gives you Atlas, a coach you can ask about your own history.",
      ],
    },
    HOW_IT_WORKS,
    {
      id: "principles",
      label: "Principles",
      heading: "How Isofit is built",
      bullets: [
        "The log is yours. Export it as a file or delete your account from inside the app.",
        "No data sales and no advertising. Isofit does not sell personal information or let advertisers near it.",
        "No training on your data. Fitness and health data is not used to train AI models.",
        "Opt-in by default. Atlas personalization and Apple Health access are off until you turn them on.",
        "Say what it is. The body graph counts logged sets and says plainly that it is not a recovery score. Atlas says plainly that it can be wrong.",
        "Adults only. Isofit is for people aged 18 and over.",
      ],
    },
    KEY_FACTS,
    {
      id: "name",
      label: "The name",
      heading: "About the name",
      body: [
        "The name is left open on purpose. Read it as isometric, as \"I'm so fit\", or as ISO, in search of, fitness. All three are fair.",
        `The logo is a cube whose three visible faces carry the letters I, S and O, and the same cube marks $ISO, the in-app points. Whatever you hear in the name, the app is a general training log for ${ACTIVITY_SCOPE}. Inside it, Atlas is the AI coach, marked by a cairn of stacked stones, and Bonfire is the community feed.`,
      ],
    },
  ],
  faqs: [
    {
      question: "Who makes Isofit?",
      answer: [`Isofit was founded in ${SITE.founded} by ${SITE.founder.name}, who builds it alone in ${SITE.madeIn}. It is published by ${SITE.company}, a company domiciled in ${SITE.domicile}.`],
    },
    {
      question: "What does the name Isofit mean?",
      answer: ["It is left open on purpose: isometric, \"I'm so fit\", or ISO, in search of, fitness. The logo is a cube whose faces spell I, S, O."],
    },
    {
      question: "How do I contact Isofit?",
      answer: [`Email ${SITE.supportEmail} for help, and expect a reply ${SITE.supportResponse}. Privacy requests go to ${SITE.privacyEmail}.`],
    },
  ],
  related: ["/features", "/pricing", "/faq"],
};
