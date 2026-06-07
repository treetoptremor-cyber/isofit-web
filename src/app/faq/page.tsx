import Link from "next/link";

export const metadata = {
  title: "FAQ | ISOfit",
  description: "Frequently asked questions about ISOfit and Atlas MFC.",
};

const FAQS = [
  {
    question: "Is ISOfit free?",
    answer:
      "Yes. The free tier gives you unlimited workout logging, $ISO earning, and read-only access to The Bonfire community feed. Atlas MFC, voice logging, and premium rewards are pay-per-use from your $ISO balance.",
  },
  {
    question: "How is Atlas MFC different from other AI fitness apps?",
    answer:
      "Atlas isn't a generic chatbot. It operates across specialized training domains and bases responses on your actual workout history.",
  },
  {
    question: "Do I need a wearable?",
    answer: "No. Log by voice, text, or autofill in-app. Wearable sync is optional.",
  },
  {
    question: "How does the form check work?",
    answer:
      "Record a lift and send video/photo to Atlas. It identifies movement and returns 1-3 specific corrections in plain language.",
  },
  {
    question: "Is my training data private?",
    answer: "Yes. Workouts, conversations, and body metrics are protected with strict per-user access controls.",
  },
  {
    question: "When does ISOfit launch?",
    answer: "Target launch is summer 2026.",
  },
];

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-[#f3efe6] px-5 py-14 text-[#2a2420] md:px-8">
      <div className="mx-auto w-full max-w-[920px]">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h1 className="font-display text-[clamp(34px,5vw,52px)] font-bold tracking-[-0.02em]">
            FAQ
          </h1>
          <Link
            href="/"
            className="rounded-xl bg-[#69A5F0] px-4 py-2 font-display text-sm font-semibold text-white transition-colors hover:bg-[#5C94DA]"
          >
            Back Home
          </Link>
        </div>

        <div className="rounded-3xl border border-[#2a2420]/10 bg-white shadow-[0_20px_45px_rgba(42,36,32,0.08)]">
          {FAQS.map((item) => (
            <section key={item.question} className="border-b border-[#2a2420]/10 p-6 last:border-b-0">
              <h2 className="font-display text-xl font-semibold">{item.question}</h2>
              <p className="mt-2 text-[15px] leading-7 text-[#4a423b]">{item.answer}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
