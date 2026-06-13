import Link from "next/link";

import InlineWaitlistCta from "@/components/inline-waitlist-cta";

export const metadata = {
  title: "FAQ | ISOfit",
  description: "Everything you need to know about ISOfit.",
};

type FaqItem = {
  question: string;
  answer: string[];
};

const FAQS: FaqItem[] = [
  {
    question: "What is ISOfit?",
    answer:
      [
        "ISOfit is a workout organization and training app built to make logging easier and your training history more useful.",
        "Quickly record what you did, see how your work adds up over time, ask Atlas for guidance, and earn $ISO through consistent participation.",
      ],
  },
  {
    question: "Who is ISOfit for?",
    answer:
      [
        "ISOfit is for anyone who wants a clearer picture of their training.",
        "You can use it for strength training, bodybuilding, running, martial arts, kettlebells, functional fitness, sports practice, mobility work, or a mix of different activities.",
        "You do not need to follow a specific ISOfit program.",
      ],
  },
  {
    question: "How do I log a workout?",
    answer: [
      "Log your workout naturally by typing or speaking.",
      "You can enter a quick description during your session and organize the details later, or record exercises, sets, reps, weight, time, distance, intensity, and other metrics as you go.",
      "ISOfit is designed to reduce the amount of tapping and form-filling normally required by workout apps.",
    ],
  },
  {
    question: "Do I need to use a specific exercise library?",
    answer: [
      "No.",
      "You can select exercises from the ISOfit library, create your own, or describe your workout in plain language. ISOfit is designed to accommodate different sports, training methods, and personal terminology.",
    ],
  },
  {
    question: "What is Atlas?",
    answer: [
      "Atlas is ISOfit's AI training guide.",
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
      "Memory and personalization controls will be clearly presented. You will be able to use ISOfit without allowing Atlas to retain personal training context between conversations.",
    ],
  },
  {
    question: "What is $ISO?",
    answer: [
      "$ISO is ISOfit's participation and rewards system.",
      "Members may earn $ISO through eligible activity inside the app and use it for available ISOfit features, benefits, or rewards. Specific earning rates, redemption options, and eligibility rules will always be shown in the app.",
    ],
  },
  {
    question: "Is $ISO an investment or cryptocurrency?",
    answer: [
      "ISOfit does not promise that $ISO will have a cash value or generate a financial return.",
      "It is being designed primarily as an in-app utility and rewards system. Any future functionality will be explained clearly before it becomes available.",
    ],
  },
  {
    question: "Do I need to understand crypto to use ISOfit?",
    answer: [
      "No.",
      "You can use the workout logger, progress tools, Atlas, and community features without understanding wallets, exchanges, or cryptocurrency terminology.",
    ],
  },
  {
    question: "What is the Bonfire?",
    answer: [
      "The Bonfire is ISOfit's community space.",
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
  },
  {
    question: "Can I use ISOfit without Atlas or the Bonfire?",
    answer: [
      "Yes.",
      "Fast, flexible workout logging is the foundation of ISOfit. Atlas, $ISO, and the Bonfire add more value, but you will not be required to use every feature.",
    ],
  },
  {
    question: "How much will ISOfit cost?",
    answer: [
      "Core workout logging is planned to be available free of charge.",
      "Paid options may provide expanded Atlas access and other premium capabilities. Final pricing and included features will be shown clearly before you purchase anything.",
    ],
  },
  {
    question: "What devices will ISOfit support?",
    answer: [
      "ISOfit is being developed with iPhone as the primary launch platform.",
      "Additional ways to access ISOfit may be introduced as the product grows.",
    ],
  },
  {
    question: "When will ISOfit launch?",
    answer: [
      "ISOfit is currently in development.",
      "Waitlist members will receive product updates and will be among the first considered for early access and beta testing.",
    ],
  },
  {
    question: "Is joining the waitlist free?",
    answer: [
      "Yes.",
      "Joining the waitlist does not require payment and does not obligate you to purchase a membership or subscription when ISOfit launches.",
    ],
  },
  {
    question: "What information do I provide when joining?",
    answer: [
      "The waitlist only asks for the information needed to contact you about ISOfit's development and launch.",
      "More detailed fitness information will not be required until you choose to create an account and begin using the app.",
    ],
  },
  {
    question: "How does ISOfit protect my information?",
    answer:
      [
        "ISOfit is being designed around limited data collection, clear consent choices, and controlled access to personal information.",
        "Your private workout and account data will not be publicly displayed or sold to advertisers. Additional details will be available in the ISOfit Privacy Policy.",
      ],
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
            className="rounded-xl bg-[#69A5F0] px-4 py-2 font-display text-sm font-semibold text-white transition-colors hover:bg-[#5C94DA]"
          >
            Back Home
          </Link>
        </div>

        <div className="rounded-3xl border border-[#2a2420]/10 bg-white p-5 shadow-[0_20px_45px_rgba(42,36,32,0.08)] sm:p-6">
          <h2 className="font-display text-2xl font-semibold tracking-[-0.015em] text-[#2a2420] sm:text-3xl">
            Everything you need to know about ISOfit
          </h2>
          <p className="mt-4 text-[15px] leading-7 text-[#4a423b]">
            ISOfit brings workout logging, intelligent coaching, progress insights, rewards, and community into one place - without forcing you into a specific training style.
          </p>

          <div className="mt-7 rounded-2xl border border-[#2a2420]/10">
            {FAQS.map((item) => (
              <section key={item.question} className="border-b border-[#2a2420]/10 p-5 last:border-b-0 sm:p-6">
                <h3 className="font-display text-lg font-semibold sm:text-xl">{item.question}</h3>
                <div className="mt-2 space-y-2">
                  {item.answer.map((paragraph) => (
                    <p key={paragraph} className="text-[15px] leading-7 text-[#4a423b]">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <section className="mt-8 rounded-2xl border border-[#2a2420]/10 bg-[#f8f5ee] p-5 sm:p-6">
            <h2 className="font-display text-[clamp(1.5rem,5vw,2rem)] font-semibold leading-tight tracking-[-0.015em] text-[#2a2420]">
              Your work deserves a better record.
            </h2>
            <p className="mt-2 text-[15px] leading-7 text-[#4a423b]">
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
