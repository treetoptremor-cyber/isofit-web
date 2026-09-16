import Link from "next/link";

import InlineWaitlistCta from "@/components/inline-waitlist-cta";
import { WEB_MEMBERSHIP_PRICES } from "@/lib/membership-pricing";

export const metadata = {
  title: "FAQ | Isofit",
  description: "Everything you need to know about Isofit.",
};

type FaqItem = {
  question: string;
  answer: string[];
  reference?: { href: string; label: string };
};

const FAQS: FaqItem[] = [
  {
    question: "What is Isofit?",
    answer:
      [
        "Isofit is a workout organization and training app built to make logging easier and your training history more useful.",
        "Quickly record what you did, see how your work adds up over time, and ask Atlas for guidance.",
      ],
  },
  {
    question: "Who is Isofit for?",
    answer:
      [
        "Isofit is for adults aged 18 and over who want a clearer picture of their training.",
        "You can use it for strength training, bodybuilding, running, martial arts, kettlebells, functional fitness, sports practice, mobility work, or a mix of different activities.",
        "You do not need to follow a specific Isofit program.",
      ],
  },
  {
    question: "How do I log a workout?",
    answer: [
      "Log your workout naturally by typing or speaking.",
      "You can enter a quick description during your session and organize the details later, or record exercises, sets, reps, weight, time, distance, intensity, and other metrics as you go.",
      "Isofit is designed to reduce the amount of tapping and form-filling normally required by workout apps.",
    ],
  },
  {
    question: "Do I need to use a specific exercise library?",
    answer: [
      "No.",
      "You can select exercises from the Isofit library, create your own, or describe your workout in plain language. Isofit is designed to accommodate different sports, training methods, and personal terminology.",
    ],
  },
  {
    question: "What is Atlas?",
    answer: [
      "Atlas is Isofit's AI training guide.",
      "Atlas can help you understand your workout history, identify patterns, organize your training, modify a program, prepare for a session, or think through questions about strength, conditioning, recovery, and performance.",
    ],
  },
  {
    question: "Does Atlas replace a personal trainer or medical professional?",
    answer: [
      "No.",
      "Atlas is a training and organization tool - not a doctor, physical therapist, or substitute for in-person professional care. Medical concerns, injuries, severe pain, or symptoms requiring diagnosis should be discussed with a qualified healthcare professional.",
    ],
  },
  {
    question: "How personalized is Atlas?",
    answer: [
      "Atlas can use the information you choose to provide, including your goals, training experience, available equipment, preferences, limitations, and workout history.",
      "When you message Atlas, it receives recent workout data, training insights, profile context, and recent messages from the current thread. Persistent memory is a separate, optional setting that is off by default.",
      "You can turn personalization off in your account settings to delete stored Atlas memory items. This does not delete messages already sent or coaching already delivered.",
    ],
    reference: { href: "/privacy#4-atlas-ai-and-your-data", label: "Privacy Policy: Atlas and your data" },
  },
  {
    question: "What is the Bonfire?",
    answer: [
      "The Bonfire is Isofit's community space.",
      "It gives members a place to share training logs, ask questions, celebrate progress, exchange useful ideas, and interact without turning every workout into a performance for social media.",
      "Community participation is optional.",
    ],
  },
  {
    question: "Will my workouts automatically be shared?",
    answer: [
      "No.",
      "Your personal workout information is private by default. You choose what, if anything, you share with the Bonfire or other members.",
    ],
    reference: { href: "/privacy#61-other-isofit-members", label: "Privacy Policy: visibility and sharing" },
  },
  {
    question: "Can I use Isofit without Atlas or the Bonfire?",
    answer: [
      "Yes.",
      "Fast, flexible workout logging is the foundation of Isofit. Atlas and the Bonfire add more value, but you will not be required to use every feature.",
    ],
  },
  {
    question: "How much will Isofit cost?",
    answer: [
      "Core workout logging is free. Paid memberships unlock additional features, including expanded Atlas access.",
      `Current web memberships are Gold at $${WEB_MEMBERSHIP_PRICES.gold}/month and Pro at $${WEB_MEMBERSHIP_PRICES.pro}/month. The price, included features, and billing period for your purchase are shown before checkout; check the App Store for iOS purchase pricing when available.`,
    ],
    reference: { href: "/terms#4-memberships-billing-and-cancellation", label: "Terms: memberships, billing, and cancellation" },
  },
  {
    question: "What devices will Isofit support?",
    answer: [
      "Isofit is being developed with iPhone as the primary launch platform.",
      "Additional ways to access Isofit may be introduced as the product grows.",
      "Supported iPhone models and the minimum iOS version will be listed on the App Store when available.",
    ],
  },
  {
    question: "When will Isofit launch?",
    answer: [
      "Isofit is currently in development, with an iOS launch planned for October 1, 2026.",
      "Waitlist members will receive product updates and will be among the first considered for early access and beta testing.",
    ],
  },
  {
    question: "Is joining the waitlist free?",
    answer: [
      "Yes.",
      "Joining the waitlist does not require payment and does not obligate you to purchase a membership or subscription when Isofit launches.",
    ],
  },
  {
    question: "What information do I provide when joining?",
    answer: [
      "The waitlist only asks for the information needed to contact you about Isofit's development and launch.",
      "More detailed fitness information will not be required until you choose to create an account and begin using the app.",
    ],
  },
  {
    question: "How does Isofit protect my information?",
    answer:
      [
      "Isofit uses administrative, technical, and organizational safeguards, including encryption in transit and at rest, as described in the Privacy Policy.",
      "Workout data is private by default. Community content and profile information are visible according to your visibility settings. Isofit does not sell personal information or use your data for advertising.",
      ],
    reference: { href: "/privacy#9-data-security", label: "Privacy Policy: data security" },
  },
  {
    question: "Is my fitness data used to train AI models?",
    answer: [
      "No. Isofit's Privacy Policy states that fitness and health data are not used to train AI models. Atlas sends your messages and training context to its AI provider to generate replies; processing a request is different from training a model.",
      "Apple Health access through ISO Sync requires your express permission. HealthKit data is used to provide your sync and synthesis features and is never used to train AI models.",
    ],
    reference: { href: "/privacy#6-who-we-share-your-data-with", label: "Privacy Policy: providers and data use" },
  },
  {
    question: "Does canceling my membership delete my data?",
    answer: [
      "No. Canceling a paid membership does not delete your account or personal data. Request account deletion through account settings or contact privacy@isofit.app.",
      "Some records may be retained where required by law. ISO Sync data follows the separate 90-day retention schedule after cancellation described in the Privacy Policy.",
    ],
    reference: { href: "/privacy#10-membership-cancellation-and-account-deletion", label: "Privacy Policy: cancellation and deletion" },
  },
];

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-[#f3efe6] px-4 py-8 text-[#2a2420] sm:px-5 md:px-8 md:py-12">
      <div className="mx-auto w-full max-w-[920px]">
        <div className="mb-6 flex flex-col items-start gap-3 sm:mb-8 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <h1 className="font-display text-[clamp(2rem,9vw,3.25rem)] font-bold tracking-[-0.02em]">Frequently Asked Questions</h1>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center rounded-xl bg-[#245c9b] px-4 py-2 font-display text-sm font-semibold text-white transition-colors hover:bg-[#194b82]"
          >
            Back Home
          </Link>
        </div>

        <div className="rounded-3xl border border-[#2a2420]/10 bg-white p-5 shadow-[0_20px_45px_rgba(42,36,32,0.08)] sm:p-6">
          <h2 className="font-display text-2xl font-semibold tracking-[-0.015em] text-[#2a2420] sm:text-3xl">
            Everything you need to know about Isofit
          </h2>
          <p className="mt-4 text-base leading-7 text-[#4a423b]">
            Isofit brings workout logging, intelligent coaching, progress insights, and community into one place - without forcing you into a specific training style.
          </p>

          <div className="mt-7 rounded-2xl border border-[#2a2420]/10">
            {FAQS.map((item) => (
              <section key={item.question} className="border-b border-[#2a2420]/10 p-5 last:border-b-0 sm:p-6">
                <h3 className="font-display text-lg font-semibold sm:text-xl">{item.question}</h3>
                <div className="mt-2 space-y-2">
                  {item.answer.map((paragraph) => (
                    <p key={paragraph} className="text-base leading-7 text-[#4a423b]">
                      {paragraph}
                    </p>
                  ))}
                  {item.reference ? (
                    <Link href={item.reference.href} className="inline-block py-2 text-sm font-medium text-[#245c9b] underline underline-offset-4">
                      {item.reference.label}
                    </Link>
                  ) : null}
                </div>
              </section>
            ))}
          </div>

          <p className="mt-6 text-base leading-7 text-[#4a423b]">
            Need a hand? Email <a href="mailto:support@isofit.app" className="font-medium text-[#245c9b] underline underline-offset-4">support@isofit.app</a>.
            {" "}For privacy requests, contact <a href="mailto:privacy@isofit.app" className="font-medium text-[#245c9b] underline underline-offset-4">privacy@isofit.app</a>.
          </p>

          <section className="mt-8 rounded-2xl border border-[#2a2420]/10 bg-[#f8f5ee] p-5 sm:p-6">
            <h2 className="font-display text-[clamp(1.5rem,5vw,2rem)] font-semibold leading-tight tracking-[-0.015em] text-[#2a2420]">
              Your work deserves a better record.
            </h2>
            <p className="mt-2 text-base leading-7 text-[#4a423b]">
              Log faster. Understand your progress. Build something you can keep.
            </p>
            <div className="mt-5">
              <InlineWaitlistCta />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
