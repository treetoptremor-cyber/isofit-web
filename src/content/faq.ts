import { ACTIVITY_SCOPE, LIMITS, PRICING } from "@/content/facts";
import type { DocFaq, PageDoc } from "@/content/types";
import { SITE } from "@/lib/site";

export type FaqGroup = { id: string; heading: string; faqs: DocFaq[] };

export const FAQ_GROUPS: FaqGroup[] = [
  {
    id: "basics",
    heading: "The basics",
    faqs: [
      {
        question: "What is Isofit?",
        answer: [
          "Isofit is a workout logging app for iPhone. You record training by tapping, typing or speaking, a body graph shows which muscles that work reached, and Atlas, a built-in AI coach, answers questions about your training. It also has Bonfire, a members-only community feed.",
        ],
      },
      {
        question: "Who is Isofit for?",
        answer: [
          `Adults aged 18 and over who want a clearer picture of their training. It is not tied to one style: you can log ${ACTIVITY_SCOPE}, or a mix. You do not need to follow an Isofit program.`,
        ],
      },
      {
        question: "What does the name Isofit mean?",
        answer: ["It is left open on purpose. Read it as isometric, as \"I'm so fit\", or as ISO, in search of, fitness. The logo is a cube whose faces spell I, S, O."],
      },
      {
        question: "What devices does Isofit support?",
        answer: ["iPhone running iOS 17.6 or later. There is no iPad, Apple Watch, Android or web version."],
      },
      {
        question: "When will Isofit launch?",
        answer: [`The iOS launch is planned for ${SITE.launchDateLong}. Isofit is not in the App Store yet.`],
      },
    ],
  },
  {
    id: "logging",
    heading: "Logging workouts",
    faqs: [
      {
        question: "How do I log a workout in Isofit?",
        answer: [
          "Three ways. Tap in sets, reps, weight, distance, time and RPE on each exercise row. Type a Quicklog line such as \"bench 5x5 225lbs\" and get a finished row. Or hold the microphone, describe the session, and review the draft Isofit builds.",
        ],
        link: { href: "/features/workout-logging", label: "How workout logging works" },
      },
      {
        question: "Do I have to use Isofit's exercise library?",
        answer: [
          "No. The library has 485 exercises, but you can type any name and create it as a custom exercise. Isofit maps custom exercises to muscles so they count on the body graph.",
        ],
      },
      {
        question: "Does Isofit work offline?",
        answer: ["Tap logging and Quicklog work offline, and finished sessions sync when you reconnect. Voice logging and Atlas need a connection."],
      },
      {
        question: "Does Isofit track personal records?",
        answer: ["No. There is no personal-record tracking. History shows every past session and the sets in it."],
      },
      {
        question: "Does Isofit support kilograms and kilometers?",
        answer: ["Yes. Choose metric or imperial for your account and switch units on any row."],
      },
    ],
  },
  {
    id: "body-graph",
    heading: "Body graph",
    faqs: [
      {
        question: "What is the body graph?",
        answer: [
          "A front and back figure shaded by the working sets you logged for each muscle over the last 7, 30 or 90 days or all time. It shows what you train most and what you have been skipping.",
        ],
        link: { href: "/features/body-graph", label: "How the body graph is calculated" },
      },
      {
        question: "Is the body graph a recovery score?",
        answer: ["No. It counts logged working sets. It does not estimate recovery, readiness or soreness."],
      },
    ],
  },
  {
    id: "atlas",
    heading: "Atlas",
    faqs: [
      {
        question: "What is Atlas?",
        answer: [
          "Atlas is Isofit's AI coach, a chat assistant for training questions. With personalization on, it reads your logged workouts so its answers reflect your own history. On Pro it can write programs and save them to your routines.",
        ],
        link: { href: "/features/atlas", label: "What Atlas does and what it sees" },
      },
      {
        question: "How personalized is Atlas?",
        answer: [
          "When you message Atlas, it receives your recent workout data, training insights, profile context and the recent messages in the thread. The Atlas personalization opt-in is off by default. Opting in lets Atlas keep memory items such as goals and preferences, and use your Apple Health daily summaries if you connected Apple Health. Withdrawing the opt-in in account settings deletes stored memory items and stops Atlas using those summaries; Atlas still works, and messages already sent are not deleted.",
        ],
        link: { href: "/privacy#4-atlas-ai-and-your-data", label: "Privacy Policy: Atlas and your data" },
      },
      {
        question: "Does Atlas replace a personal trainer or medical professional?",
        answer: [
          "No. Atlas is a training and organization tool, not a doctor, physical therapist or substitute for in-person professional care. Injuries, severe pain and symptoms that need diagnosis belong with a qualified healthcare professional.",
        ],
      },
      {
        question: "Can I use Isofit without Atlas or Bonfire?",
        answer: ["Yes. Fast, flexible logging is the foundation. Atlas and Bonfire are optional."],
      },
    ],
  },
  {
    id: "bonfire",
    heading: "Bonfire",
    faqs: [
      {
        question: "What is the Bonfire?",
        answer: [
          "Bonfire is Isofit's members-only community feed. A post is tied to a session you logged, with a caption and an optional photo, and members can give kudos and comment. There are no follows, groups or direct messages.",
        ],
        link: { href: "/features/bonfire", label: "How Bonfire works" },
      },
      {
        question: "Will my workouts be shared automatically?",
        answer: ["No. Your log is private. A session appears in Bonfire only if you choose to post it. Posts are visible to all Isofit members."],
        link: { href: "/privacy#61-other-isofit-members", label: "Privacy Policy: visibility and sharing" },
      },
    ],
  },
  {
    id: "pricing",
    heading: "Pricing",
    faqs: [
      {
        question: "How much does Isofit cost?",
        answer: [
          `Logging is free, with no cap on workouts or routines. Pro is planned at ${PRICING.proMonthly} a month or ${PRICING.proYearly} a year in the US App Store and adds the full body graph, ${LIMITS.proAtlasMessages} with deep analysis and saved programs, the weekly SITREP, and posting to Bonfire. The App Store listing is final.`,
        ],
        link: { href: "/pricing", label: "Full Free and Pro comparison" },
      },
      {
        question: "Who handles payments?",
        answer: [
          "Apple processes membership payments through the App Store, and RevenueCat manages subscription status on Isofit's behalf. Isofit does not store your full payment card details.",
        ],
        link: { href: "/terms#4-memberships-billing-and-cancellation", label: "Terms: memberships, billing, and cancellation" },
      },
      {
        question: "Is joining the waitlist free?",
        answer: ["Yes. It costs nothing and does not commit you to a subscription."],
      },
      {
        question: "What information do I give when I join the waitlist?",
        answer: ["A first name and an email address, used to tell you when Isofit launches. Isofit does not collect phone numbers. No fitness information is asked for until you create an account in the app."],
      },
      {
        question: "Does cancelling my membership delete my data?",
        answer: [
          "No. Cancelling a paid membership does not delete your account or personal data. To delete your account, use the option in the app's settings or email privacy@isofit.app. Deleting your account does not cancel an App Store subscription, so cancel that with Apple too, under Settings > your name > Subscriptions on iPhone. After deletion, Isofit keeps pseudonymized consent records and records the law requires, and may keep anonymized, aggregated data for platform analytics.",
        ],
        link: { href: "/privacy#10-membership-cancellation-and-account-deletion", label: "Privacy Policy: cancellation and deletion" },
      },
    ],
  },
  {
    id: "privacy",
    heading: "Privacy and Apple Health",
    faqs: [
      {
        question: "Does Isofit work with Apple Health?",
        answer: [
          "Yes, optionally and on every tier. Isofit can read workouts and daily summaries such as steps, exercise minutes, sleep and resting heart rate. You approve each data type in the iOS permission screen. Isofit never writes to Apple Health, and syncing happens while the app is open.",
        ],
        link: { href: "/privacy#5-apple-health-and-healthkit-data", label: "Privacy Policy: Apple Health and HealthKit" },
      },
      {
        question: "How does Isofit protect my information?",
        answer: [
          "Isofit uses administrative, technical and organizational safeguards, including encryption in transit and at rest, as described in the Privacy Policy. Workout data is private by default. Isofit does not sell personal information or use your data for advertising.",
        ],
        link: { href: "/privacy#9-data-security", label: "Privacy Policy: data security" },
      },
      {
        question: "Can I sign in with Google?",
        answer: [
          "Yes. Google Sign-In is an optional way to sign in to your Isofit account. If you choose it, Google processes your sign-in and shares the account information you authorize with Isofit, under Google's own privacy policy.",
        ],
        link: { href: "/privacy#62-technology-service-providers", label: "Privacy Policy: service providers" },
      },
      {
        question: "Does Isofit store my precise GPS location?",
        answer: [
          "No. Device location access for weather is optional. Weather providers receive only the coarse location used for the forecast, such as a zip code, your device location if you enable it, or a city inferred from your timezone. They never receive your identity or health data.",
        ],
        link: { href: "/privacy#62-technology-service-providers", label: "Privacy Policy: weather providers" },
      },
      {
        question: "Is my fitness data used to train AI models?",
        answer: [
          "No. Isofit's Privacy Policy states that fitness and health data are not used to train AI models. Atlas sends your messages and training context to its AI provider, OpenAI, to generate replies; processing a request is different from training a model. Apple Health data is never used to train AI models.",
        ],
        link: { href: "/privacy#6-who-we-share-your-data-with", label: "Privacy Policy: providers and data use" },
      },
      {
        question: "Can I export or delete my data?",
        answer: [
          "Yes. From the app you can export a JSON file of your training, Atlas, account, health and social records, and you can delete your account. Deletion is scheduled after a seven-day grace period.",
        ],
      },
    ],
  },
];

export const FAQ_DOC: PageDoc = {
  path: "/faq",
  name: "FAQ",
  metaTitle: "Isofit FAQ: pricing, logging, Atlas, Apple Health, privacy",
  metaDescription:
    "Direct answers about Isofit: what it is, what it costs, how logging works, what Atlas sees, whether it works with Apple Health, and how your data is handled.",
  h1: "Questions about Isofit, answered directly.",
  lede: `Isofit is a workout logger for iPhone with a muscle-by-muscle body graph and an AI coach called Atlas. Logging is free, Pro is planned at ${PRICING.proMonthly} a month, and the iOS launch is planned for ${SITE.launchDateLong}. The answers below cover the product, pricing, privacy and Apple Health.`,
  sections: [],
  faqs: FAQ_GROUPS.flatMap((group) => group.faqs),
  related: ["/features", "/pricing", "/compare", "/about"],
};
