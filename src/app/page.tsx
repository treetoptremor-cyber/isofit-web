"use client";

import Link from "next/link";
import { useState } from "react";

type Feature = {
  icon: "stopwatch" | "camera" | "brain" | "chart" | "body" | "calendar" | "program" | "mic";
  title: string;
  copy: string;
  color: string;
};

const FEATURES: Feature[] = [
  { icon: "stopwatch", color: "#4A90E2", title: "Quick Logger", copy: "Log any workout in seconds. Manual, voice, or tap-and-go." },
  { icon: "camera", color: "#b4583a", title: "Form Check", copy: "Film a lift. Get instant, actionable corrections from Atlas." },
  { icon: "brain", color: "#b4583a", title: "Atlas mfc", copy: "A coach that reads your data — not a chatbot with opinions." },
  { icon: "chart", color: "#4A90E2", title: "Progression", copy: "Track volume, PRs, and overload across every muscle group." },
  { icon: "body", color: "#3f5a32", title: "Body Graph", copy: "See what you're training — and what you're missing." },
  { icon: "calendar", color: "#3f5a32", title: "Streaks", copy: "Show up. Log it. Watch consistency compound into results." },
  { icon: "program", color: "#b4583a", title: "Periodization", copy: "Training plans shaped by your history, and personalized templates for ease and consistency." },
  { icon: "mic", color: "#4A90E2", title: "Voice Log", copy: "Say what you did. Atlas structures it for you." },
];

const FAQS = [
  [
    "Is ISOfit free?",
    "Yes. The free tier gives you unlimited workout logging, $ISO earning, and read-only access to The Bonfire community feed. Atlas MFC, voice logging, and premium rewards are pay-per-use from your $ISO balance.",
  ],
  [
    "How is Atlas MFC different from other AI fitness apps?",
    "Atlas isn't a generic chatbot. It operates across specialized training domains and bases responses on your actual workout history.",
  ],
  [
    "Do I need a wearable?",
    "No. Log by voice, text, or autofill in-app. Wearable sync is optional.",
  ],
  [
    "How does the form check work?",
    "Record a lift and send video/photo to Atlas. It identifies movement and returns 1–3 specific corrections in plain language.",
  ],
  [
    "Is my training data private?",
    "Yes. Workouts, conversations, and body metrics are protected with strict per-user access controls.",
  ],
  ["When does ISOfit launch?", "Target launch is summer 2026."],
] as const;

function IsoMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" aria-hidden="true">
      <path d="M60 12 L108 36 L60 60 L12 36 Z" fill="#4A90E2" />
      <path d="M12 36 L60 60 L60 108 L12 84 Z" fill="#2d6cb8" />
      <path d="M108 36 L60 60 L60 108 L108 84 Z" fill="#4A90E2" opacity="0.85" />
    </svg>
  );
}

function LogoLockup() {
  return (
    <div className="flex items-center gap-3">
      <IsoMark size={28} />
      <div className="leading-none">
        <p className="text-xl font-bold tracking-tight text-[#4A90E2]">ISOfit</p>
        <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-[#7a7066]">Atlas MFC</p>
      </div>
    </div>
  );
}

function WaitlistForm({ dark = false, compact = false }: { dark?: boolean; compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className={`max-w-[520px] rounded-2xl border px-5 py-4 ${dark ? "border-white/20 bg-white/10 text-[#f3efe6]" : "border-[#2a2420]/15 bg-white"}`}>
        <p className="font-semibold">You're on the list.</p>
        <p className={`text-sm ${dark ? "text-[#f3efe6]/75" : "text-[#4a423b]"}`}>We'll send one email when ISOfit opens. That's it.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (email.trim()) setDone(true);
      }}
      className={`max-w-[${compact ? "460px" : "520px"}]`}
    >
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-[#2a2420]/10 bg-white p-2 shadow-[0_12px_30px_rgba(42,36,32,0.1)]">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          className="h-12 min-w-[180px] flex-1 rounded-xl px-3 text-[#2a2420] outline-none"
        />
        <button className="h-12 rounded-xl bg-[#4A90E2] px-5 font-semibold text-white">Get Early Access</button>
      </div>
      <p className={`mt-3 text-sm ${dark ? "text-[#f3efe6]/70" : "text-[#7a7066]"}`}>Be first in. No spam, just a heads-up when we launch.</p>
    </form>
  );
}

function PhoneShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-[330px] rounded-[40px] bg-[#f2f2f7] p-3 shadow-[0_30px_80px_rgba(0,0,0,0.18)]">
      <div className="mx-auto mb-2 h-8 w-28 rounded-full bg-black" />
      <div className="overflow-hidden rounded-[30px] border border-black/10 bg-[#f3efe6]">{children}</div>
    </div>
  );
}

function ChatPreview() {
  return (
    <PhoneShell>
      <div className="space-y-3 p-4">
        <p className="text-[10px] uppercase tracking-[0.2em] text-[#7a7066]">Tue · 06:12 · 54°f</p>
        <h3 className="text-3xl font-bold leading-tight text-[#2a2420]">
          Good morning, <span className="text-[#b4583a]">Morgan.</span>
        </h3>
        <p className="text-sm text-[#4a423b]">You recovered at 71% — the best week you've had in three.</p>
        {["How did I sleep last night, really?", "What should I do with my legs today?", "Build me a week around my half-marathon."].map((q, i) => (
          <div key={q} className={`rounded-2xl p-3 ${i === 1 ? "bg-[#b4583a] text-[#f3efe6]" : "bg-white text-[#2a2420]"}`}>
            <p className="text-xs uppercase tracking-[0.2em] opacity-70">Ask Atlas</p>
            <p className="mt-1 text-sm font-medium">{q}</p>
          </div>
        ))}
      </div>
    </PhoneShell>
  );
}

function AboutPreview() {
  return (
    <PhoneShell>
      <div className="space-y-4 p-4">
        <p className="text-[10px] uppercase tracking-[0.2em] text-[#7a7066]">Machine Fitness Coach</p>
        <h3 className="text-3xl font-bold leading-tight text-[#2a2420]">
          A coach for the <span className="text-[#b4583a]">machine</span> you move in.
        </h3>
        <div className="space-y-2">
          {["Listens.", "Reads the signal.", "Coaches, gently."].map((item, i) => (
            <div key={item} className={`rounded-2xl p-3 ${i === 1 ? "bg-[#b4583a] text-[#f3efe6]" : "bg-white text-[#2a2420]"}`}>
              <p className="text-xs uppercase tracking-[0.2em] opacity-70">{String(i + 1).padStart(2, "0")}</p>
              <p className="font-semibold">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </PhoneShell>
  );
}

function FeatureIcon({ kind, color }: { kind: Feature["icon"]; color: string }) {
  const cls = "h-6 w-6";
  const style = { color };
  switch (kind) {
    case "stopwatch":
      return <svg className={cls} viewBox="0 0 24 24" fill="none" style={style}><circle cx="12" cy="13" r="7" stroke="currentColor" strokeWidth="1.8" /><path d="M12 13V9M12 3v3M9 3h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>;
    case "camera":
      return <svg className={cls} viewBox="0 0 24 24" fill="none" style={style}><rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.8" /><circle cx="12" cy="13.5" r="3.5" stroke="currentColor" strokeWidth="1.8" /></svg>;
    default:
      return <div className="h-6 w-6 rounded-full border-2" style={{ borderColor: color }} />;
  }
}

export default function Page() {
  const [openFaq, setOpenFaq] = useState<number>(0);

  return (
    <main className="bg-[#f3efe6] text-[#2a2420]">
      <header className="sticky top-0 z-40 border-b border-[#2a2420]/15 bg-[#f3efe6]/85 backdrop-blur">
        <div className="mx-auto flex h-[68px] w-full max-w-[1180px] items-center justify-between px-5 md:px-8">
          <LogoLockup />
          <nav className="hidden items-center gap-8 text-[10px] uppercase tracking-[0.2em] text-[#4a423b] md:flex">
            <Link href="#features">Features</Link>
            <Link href="#how">How it works</Link>
            <Link href="#coach">The coach</Link>
            <Link href="#faq">FAQ</Link>
          </nav>
          <Link href="#waitlist" className="rounded-xl bg-[#2a2420] px-4 py-2 text-sm font-semibold text-white">Join the Waitlist</Link>
        </div>
      </header>

      <section className="mx-auto grid w-full max-w-[1180px] gap-12 px-5 py-16 md:grid-cols-2 md:px-8">
        <div className="pt-4">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#2a2420]/15 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-[#4a423b]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4A90E2]" />
            ISOfit · workout tracker · iOS
          </div>
          <h1 className="text-5xl font-bold leading-[0.98] tracking-tight md:text-7xl">
            Your workouts,<br />working <span className="text-[#4A90E2]">for you.</span>
          </h1>
          <p className="mt-6 max-w-[520px] text-lg text-[#4a423b]">
            Log every session in seconds with the cleanest workout tracker on iOS — then let <strong className="text-[#b4583a]">Atlas mfc</strong> turn your training history into real coaching.
          </p>
          <div id="waitlist" className="mt-8">
            <WaitlistForm />
          </div>
        </div>
        <div className="space-y-3">
          <ChatPreview />
          <p className="text-center text-[10px] uppercase tracking-[0.2em] text-[#7a7066]">Images are for context only</p>
        </div>
      </section>

      <section id="features" className="border-y border-[#2a2420]/15 bg-[#fbf9f3]">
        <div className="mx-auto w-full max-w-[1180px] px-5 py-16 md:px-8">
          <h2 className="mb-10 text-3xl font-semibold tracking-tight md:text-4xl">One tracker, eight ways to stay honest.</h2>
          <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <article key={f.title} className="space-y-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#2a2420]/10 bg-white">
                  <FeatureIcon kind={f.icon} color={f.color} />
                </div>
                <h3 className="font-semibold">{f.title}</h3>
                <p className="text-sm text-[#4a423b]">{f.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="mx-auto grid w-full max-w-[1180px] gap-12 px-5 py-20 md:grid-cols-2 md:px-8">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#3f5a32]">01 · Tracking & consistency</p>
          <h2 className="mt-4 text-4xl font-bold leading-tight">Log it in seconds. Keep it for life.</h2>
          <ul className="mt-6 space-y-4 text-[#4a423b]">
            <li><strong className="text-[#2a2420]">Log every workout</strong> — so that the habit sticks and the data accumulates.</li>
            <li><strong className="text-[#2a2420]">Voice, text, or autofill</strong> — so no session goes unrecorded.</li>
            <li><strong className="text-[#2a2420]">Automatic streak tracking</strong> — so showing up becomes your metric.</li>
          </ul>
        </div>
        <div className="rounded-3xl border border-[#2a2420]/10 bg-white p-6 shadow-[0_22px_50px_rgba(42,36,32,0.1)]">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#7a7066]">Consistency · this month</p>
          <div className="mt-4 grid grid-cols-7 gap-1.5">
            {Array.from({ length: 35 }).map((_, i) => (
              <div key={i} className={`aspect-square rounded ${i % 6 === 0 ? "bg-[#ece6d9]" : "bg-[#3f5a32]/80"}`} />
            ))}
          </div>
          <div className="mt-5 flex gap-8 border-t border-[#2a2420]/10 pt-4">
            <div><p className="text-3xl font-bold">23</p><p className="text-xs uppercase tracking-[0.2em] text-[#7a7066]">day streak</p></div>
            <div><p className="text-3xl font-bold">28</p><p className="text-xs uppercase tracking-[0.2em] text-[#7a7066]">sessions</p></div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#2a2420]/15 bg-[#fbf9f3]">
        <div className="mx-auto grid w-full max-w-[1180px] gap-12 px-5 py-20 md:grid-cols-2 md:px-8">
          <div className="order-2 md:order-1">
            <FormCard />
          </div>
          <div className="order-1 md:order-2">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#4A90E2]">02 · Form analysis & progression</p>
            <h2 className="mt-4 text-4xl font-bold leading-tight">Fix the rep before it becomes a pattern.</h2>
            <ul className="mt-6 space-y-4 text-[#4a423b]">
              <li><strong className="text-[#2a2420]">Point your camera at any lift</strong> — Atlas returns 1–3 corrections in plain language.</li>
              <li><strong className="text-[#2a2420]">Track volume and overload</strong> — plateaus show in data before the mirror.</li>
              <li><strong className="text-[#2a2420]">Use an interactive body graph</strong> — imbalances get caught, not guessed.</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="coach" className="mx-auto grid w-full max-w-[1180px] gap-12 px-5 py-20 md:grid-cols-2 md:px-8">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#b4583a]">03 · Personalized programming</p>
          <h2 className="mt-4 text-4xl font-bold leading-tight">Coaching built on your last 30 days.</h2>
          <p className="mt-6 text-[#4a423b]">Atlas operates across specialized domains and adapts your plan to frequency, recovery, and progression logic.</p>
        </div>
        <div className="space-y-3">
          <AboutPreview />
          <p className="text-center text-[10px] uppercase tracking-[0.2em] text-[#7a7066]">Images are for context only</p>
        </div>
      </section>

      <section id="faq" className="mx-auto w-full max-w-[1180px] px-5 py-20 md:px-8">
        <h2 className="mb-8 text-4xl font-bold">Questions, answered plainly.</h2>
        <div className="border-y border-[#2a2420]/15">
          {FAQS.map(([q, a], i) => (
            <div key={q} className="border-t border-[#2a2420]/10 first:border-t-0">
              <button className="flex w-full items-center justify-between py-5 text-left" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                <span className="text-lg font-semibold">{q}</span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#2a2420]/15 text-[#4a423b]">{openFaq === i ? "−" : "+"}</span>
              </button>
              {openFaq === i && <p className="pb-5 text-[#4a423b]">{a}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-5 pb-20 md:px-8">
        <div className="overflow-hidden rounded-3xl bg-[#2a2420] p-10 md:p-14">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#f3efe6]/60">Join the waitlist</p>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-[#f3efe6] md:text-5xl">
            Start training with a <span className="text-[#4A90E2]">new coach</span> who understands the data.
          </h2>
          <p className="mt-4 max-w-[500px] text-[#f3efe6]/75">ISOfit is launching summer 2026. Be first in — no spam, just a heads-up when we launch.</p>
          <div className="mt-8">
            <WaitlistForm dark compact />
          </div>
        </div>
      </section>

      <footer className="border-t border-[#2a2420]/15">
        <div className="mx-auto flex w-full max-w-[1180px] flex-wrap items-center justify-between gap-5 px-5 py-10 md:px-8">
          <LogoLockup />
          <div className="flex flex-wrap gap-6 text-[10px] uppercase tracking-[0.2em] text-[#7a7066]">
            <a href="#">Privacy</a>
            <a href="#">Your data</a>
            <a href="#">Contact</a>
            <a href="#">iOS</a>
          </div>
          <p className="text-right text-[10px] uppercase tracking-[0.2em] text-[#7a7066]">© 2026 ISOfit · Thoughtfully created in Queens, NY</p>
        </div>
      </footer>
    </main>
  );
}

function FormCard() {
  const muscles = [
    ["Chest", 82],
    ["Back", 64],
    ["Quads", 91],
    ["Shoulders", 38],
    ["Hamstrings", 29],
  ] as const;

  return (
    <div className="space-y-4 rounded-3xl border border-[#2a2420]/10 bg-white p-5">
      <div className="aspect-[4/3] rounded-2xl bg-[repeating-linear-gradient(135deg,#ece6d9,#ece6d9_11px,#f3efe6_11px,#f3efe6_22px)] p-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#2a2420]/90 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#f3efe6]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#b4583a]" />
          analysing · barbell row
        </div>
      </div>
      <div className="rounded-2xl border border-[#2a2420]/10 p-4">
        <p className="text-[10px] uppercase tracking-[0.2em] text-[#b4583a]">3 corrections from Atlas</p>
        <ul className="mt-3 space-y-2 text-sm">
          <li>Brace your core before the pull, not during.</li>
          <li>Lead with the elbows — keep wrists neutral.</li>
          <li>Slow the lower; you're dropping the last third.</li>
        </ul>
        <div className="mt-4 border-t border-[#2a2420]/10 pt-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#7a7066]">Weekly volume · by group</p>
          <div className="mt-2 space-y-2">
            {muscles.map(([name, value]) => (
              <div key={name} className="flex items-center gap-3">
                <span className="w-24 text-xs text-[#4a423b]">{name}</span>
                <div className="h-2 flex-1 rounded-full bg-[#ece6d9]">
                  <div className="h-2 rounded-full bg-[#4A90E2]" style={{ width: `${value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}