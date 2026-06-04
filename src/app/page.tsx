"use client";

import Image from "next/image";
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

function IsoLogo({ size = 34 }: { size?: number }) {
  return (
    <Image
      src="/iso-logo.png"
      alt="ISOfit"
      width={size}
      height={size}
      priority
      className="shrink-0"
    />
  );
}

function LogoLockup() {
  return (
    <div className="flex items-center gap-2.5">
      <IsoLogo size={34} />
      <div className="leading-none">
        <p className="font-display text-xl font-bold leading-none tracking-tight text-[#4A90E2]">ISOfit</p>
        <p className="mt-px font-mono text-[9px] uppercase leading-none tracking-[0.2em] text-[#7a7066]">Atlas MFC</p>
      </div>
    </div>
  );
}

function WaitlistForm({ dark = false, compact = false }: { dark?: boolean; compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className={`${compact ? "max-w-[460px]" : "max-w-[520px]"} rounded-2xl border px-5 py-4 ${dark ? "border-white/20 bg-white/10 text-[#f3efe6]" : "border-[#2a2420]/15 bg-white"}`}>
        <p className="font-display font-semibold">You&apos;re on the list.</p>
        <p className={`text-sm ${dark ? "text-[#f3efe6]/75" : "text-[#4a423b]"}`}>We&apos;ll send one email when ISOfit opens. That&apos;s it.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (email.trim()) setDone(true);
      }}
      className={compact ? "max-w-[460px]" : "max-w-[520px]"}
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
        <button className="flex h-12 items-center gap-2 rounded-xl bg-[#4A90E2] px-5 font-display text-[15px] font-semibold text-white shadow-[0_6px_16px_rgba(74,144,226,0.33)] transition-colors hover:bg-[#3f80cf]">
          Get Early Access
          <svg width="16" height="13" viewBox="0 0 16 13" fill="none" aria-hidden="true">
            <path d="M1 6.5h13M9 1l5 5.5L9 12" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <p className={`mt-3 flex items-center gap-2 text-sm ${dark ? "text-[#f3efe6]/70" : "text-[#7a7066]"}`}>
        <span className="inline-block h-[5px] w-[5px] rounded-full bg-[#3f5a32]" />
        Be first in. No spam, just a heads-up when we launch.
      </p>
    </form>
  );
}

function ChalkGridBG({ opacity = 1 }: { opacity?: number }) {
  const minor = 26;
  return (
    <svg
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ opacity }}
    >
      <defs>
        <pattern id="isoGridMinor" width={minor} height={minor} patternUnits="userSpaceOnUse">
          <line x1="0" y1={minor} x2={minor} y2={minor} stroke="#4A90E2" strokeWidth="1" opacity="0.5" />
          <line x1={minor} y1="0" x2={minor} y2={minor} stroke="#4A90E2" strokeWidth="1" opacity="0.5" />
        </pattern>
        <pattern id="isoGridMajor" width={minor * 5} height={minor * 5} patternUnits="userSpaceOnUse">
          <line x1="0" y1={minor * 5} x2={minor * 5} y2={minor * 5} stroke="#2d6cb8" strokeWidth="1.5" opacity="0.8" />
          <line x1={minor * 5} y1="0" x2={minor * 5} y2={minor * 5} stroke="#2d6cb8" strokeWidth="1.5" opacity="0.8" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="#f3efe6" />
      <rect width="100%" height="100%" fill="url(#isoGridMinor)" />
      <rect width="100%" height="100%" fill="url(#isoGridMajor)" />
    </svg>
  );
}

function IOSStatusBar() {
  return (
    <div className="relative z-10 flex items-center justify-between px-7 pb-1 pt-3.5">
      <span className="text-[15px] font-semibold tracking-tight text-black">9:41</span>
      <div className="flex items-center gap-1.5 text-black">
        <svg width="18" height="11" viewBox="0 0 18 11" fill="currentColor" aria-hidden="true">
          <rect x="0" y="7" width="3" height="4" rx="0.6" />
          <rect x="5" y="5" width="3" height="6" rx="0.6" />
          <rect x="10" y="2.5" width="3" height="8.5" rx="0.6" />
          <rect x="15" y="0" width="3" height="11" rx="0.6" />
        </svg>
        <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor" aria-hidden="true">
          <path d="M8 2.6c2.1 0 4 .8 5.4 2.2l1.1-1.1C13 2.1 10.6 1 8 1S3 2.1 1.5 3.7l1.1 1.1C4 3.4 5.9 2.6 8 2.6z" />
          <path d="M8 6c1.1 0 2.1.4 2.8 1.2l1.1-1.1C10.8 5 9.5 4.4 8 4.4S5.2 5 4.1 6.1l1.1 1.1C5.9 6.4 6.9 6 8 6z" />
          <circle cx="8" cy="9.4" r="1.4" />
        </svg>
        <svg width="26" height="12" viewBox="0 0 26 12" fill="none" aria-hidden="true">
          <rect x="0.5" y="0.5" width="22" height="11" rx="3" stroke="currentColor" strokeOpacity="0.35" />
          <rect x="2" y="2" width="19" height="8" rx="1.8" fill="currentColor" />
          <path d="M24 4v4c.8-.3 1.4-1 1.4-2S24.8 4.3 24 4z" fill="currentColor" fillOpacity="0.4" />
        </svg>
      </div>
    </div>
  );
}

function PhoneShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-[360px]">
      <div className="relative overflow-hidden rounded-[46px] bg-[#f3efe6] shadow-[0_40px_80px_rgba(0,0,0,0.18),0_0_0_1px_rgba(0,0,0,0.12)]">
        <div className="absolute left-1/2 top-2.5 z-50 h-[34px] w-[112px] -translate-x-1/2 rounded-full bg-black" />
        <div className="absolute inset-x-0 top-0 z-40">
          <IOSStatusBar />
        </div>
        {children}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-50 flex justify-center pb-2">
          <div className="h-[5px] w-[120px] rounded-full bg-black/25" />
        </div>
      </div>
    </div>
  );
}

function PhoneChrome() {
  return (
    <div className="flex items-center justify-between px-5 pb-2 pt-3">
      <button className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f3efe6]/90 shadow-[0_0_0_1px_rgba(42,36,32,0.08)]" aria-label="Menu">
        <svg width="16" height="4" viewBox="0 0 16 4" fill="#4a423b" aria-hidden="true">
          <circle cx="2" cy="2" r="1.6" />
          <circle cx="8" cy="2" r="1.6" />
          <circle cx="14" cy="2" r="1.6" />
        </svg>
      </button>
      <div className="flex items-center gap-1.5 rounded-full bg-[#f3efe6]/90 px-3 py-1.5 shadow-[0_0_0_1px_rgba(42,36,32,0.08)]">
        <IsoMark size={13} />
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#4a423b]">ISOfit · Atlas</span>
      </div>
      <button className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f3efe6]/90 shadow-[0_0_0_1px_rgba(42,36,32,0.08)]" aria-label="Settings">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <circle cx="7" cy="7" r="5" stroke="#4a423b" strokeWidth="1.5" />
          <circle cx="7" cy="7" r="1.4" fill="#4a423b" />
        </svg>
      </button>
    </div>
  );
}

function SuggestIcon({ kind, color }: { kind: "moon" | "run" | "calendar"; color: string }) {
  const s = { stroke: color, strokeWidth: 1.6, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (kind) {
    case "moon":
      return (
        <svg width="20" height="20" viewBox="0 0 22 22" aria-hidden="true">
          <path d="M18 13A7 7 0 1 1 9 4c-.3 1-.4 2 0 3 .4 1.2 1.3 2.1 2.5 2.6 1.2.5 2.5.5 3.7 0 .8-.3 1.4-.8 1.8-1.5.5 1.6.5 3.3 0 4.9z" {...s} />
        </svg>
      );
    case "run":
      return (
        <svg width="20" height="20" viewBox="0 0 22 22" aria-hidden="true">
          <circle cx="14" cy="4.5" r="1.8" {...s} />
          <path d="M7 20l3-5-3-3 3-4 4 2 4-1M5 10l2-2 4-1" {...s} />
        </svg>
      );
    case "calendar":
      return (
        <svg width="20" height="20" viewBox="0 0 22 22" aria-hidden="true">
          <rect x="3" y="5" width="16" height="14" rx="2" {...s} />
          <path d="M3 9h16M7 3v4M15 3v4" {...s} />
        </svg>
      );
  }
}

const CHAT_CARDS = [
  { kicker: "Recovery", q: "How did I sleep last night, really?", meta: "62 bpm rhhr · 7h 12m", tone: "paper", icon: "moon" },
  { kicker: "Today", q: "What should I do with my legs today?", meta: "Strain 9.4 · Recovery 71%", tone: "clay", icon: "run" },
  { kicker: "Plan", q: "Build me a week around my half-marathon.", meta: "Race in 42 days", tone: "paper", icon: "calendar" },
] as const;

function SuggestCard({ kicker, q, meta, tone, icon }: (typeof CHAT_CARDS)[number]) {
  const dark = tone === "clay";
  return (
    <div className={`flex items-start gap-3.5 rounded-[18px] px-4 py-3.5 ${dark ? "bg-[#b4583a]" : "bg-[#f3efe6]/90 shadow-[0_0_0_1px_rgba(42,36,32,0.08)]"}`}>
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${dark ? "bg-white/15" : "bg-[#ece6d9]"}`}>
        <SuggestIcon kind={icon} color={dark ? "#f3efe6" : "#4a423b"} />
      </div>
      <div className="min-w-0 flex-1">
        <p className={`font-mono text-[9px] uppercase tracking-[0.18em] ${dark ? "text-[#f3efe6]/70" : "text-[#b4583a]"}`}>{kicker}</p>
        <p className={`mt-1.5 font-display text-[15px] font-medium leading-tight ${dark ? "text-[#f3efe6]" : "text-[#2a2420]"}`}>{q}</p>
        <p className={`mt-2 font-mono text-[8px] uppercase tracking-[0.18em] ${dark ? "text-[#f3efe6]/55" : "text-[#7a7066]"}`}>{meta}</p>
      </div>
      <svg width="9" height="15" viewBox="0 0 9 15" fill="none" className="mt-1 shrink-0" aria-hidden="true">
        <path d="M1.5 1.5l6 6-6 6" stroke={dark ? "rgba(243,239,230,0.55)" : "#7a7066"} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function ChatScreen() {
  return (
    <div className="relative min-h-[640px]">
      <ChalkGridBG />
      <div className="relative flex min-h-[640px] flex-col pt-[52px]">
        <PhoneChrome />
        <div className="px-6 pt-3">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-[#7a7066]">Tue · 06:12 · 54°f</p>
          <h3 className="mt-3 font-display text-[32px] font-bold leading-none tracking-[-0.02em] text-[#2a2420]">
            Good morning,
            <br />
            <span className="text-[#b4583a]">Morgan.</span>
          </h3>
          <p className="mt-3 max-w-[280px] text-[13.5px] leading-snug text-[#4a423b]">
            You recovered at <b className="font-semibold text-[#2a2420]">71%</b> — the best week you&apos;ve had in three. Ask me anything.
          </p>
        </div>
        <div className="flex items-center justify-between px-6 pb-2 pt-5">
          <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-[#7a7066]">Ask Atlas</span>
          <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-[#7a7066]">
            Shuffle
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
              <path d="M1 3.5h7l-2-2M10 7.5H3l2 2" stroke="#7a7066" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
        <div className="flex flex-col gap-2.5 px-5">
          {CHAT_CARDS.map((c) => (
            <SuggestCard key={c.q} {...c} />
          ))}
        </div>
        <div className="h-6" />
        <div
          className="sticky bottom-0 mt-auto px-4 pb-7 pt-6"
          style={{ background: "linear-gradient(180deg, rgba(243,239,230,0) 0%, rgba(243,239,230,0.9) 38%, #f3efe6 70%)" }}
        >
          <div className="flex items-center gap-2 rounded-[24px] bg-white py-2 pl-5 pr-2 shadow-[0_10px_30px_rgba(42,36,32,0.12),0_0_0_1px_rgba(42,36,32,0.08)] ring-2 ring-[#3f5a32]/40">
            <span className="flex-1 text-[14px] text-[#7a7066]">Ask Atlas anything…</span>
            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ece6d9]" aria-label="Voice input">
              <svg width="12" height="18" viewBox="0 0 12 18" fill="none" aria-hidden="true">
                <rect x="3" y="1" width="6" height="11" rx="3" fill="#4a423b" />
                <path d="M1 9c0 2.8 2.2 5 5 5s5-2.2 5-5M6 14v3" stroke="#4a423b" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-[#b4583a]" aria-label="Send">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M7 13V3M3 7l4-4 4 4" stroke="#f3efe6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AtlasMark({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <path d="M22 82C22 74 38 68 58 68 84 68 96 76 96 84 96 92 78 96 58 96 38 96 22 92 22 82Z" fill="#3f5a32" />
      <g transform="rotate(-5 62 52)">
        <path d="M36 52C36 44 48 40 62 40 76 40 86 46 86 54 86 60 74 64 62 64 48 64 36 60 36 52Z" fill="#2a2420" />
      </g>
      <g transform="rotate(6 64 25)">
        <path d="M50 22C50 16 58 14 64 14 72 14 78 18 78 26 78 32 70 36 64 36 58 36 50 32 50 26Z" fill="#b4583a" />
      </g>
    </svg>
  );
}

const ABOUT_CARDS = [
  { n: "01", title: "Listens.", body: "Pairs with your wearables and the way you actually live. Trends over time — not single-day noise.", tone: "paper" },
  { n: "02", title: "Reads the signal.", body: "Past surface numbers to the system underneath: load, recovery, and the rhythm between them.", tone: "clay" },
  { n: "03", title: "Coaches, gently.", body: "One call a day, phrased like a friend who knows the science. No streaks, no guilt.", tone: "paper" },
] as const;

function AboutScreen() {
  return (
    <div className="relative min-h-[640px]">
      <ChalkGridBG />
      <div className="relative pt-[52px]">
        <PhoneChrome />
        <div className="px-6 pt-4">
          <AtlasMark size={64} />
          <p className="mt-5 font-display text-[26px] font-bold tracking-[-0.02em] text-[#2a2420]">
            Atlas <span className="lowercase text-[#b4583a]">mfc</span>
          </p>
          <p className="mt-2.5 font-mono text-[9.5px] uppercase tracking-[0.18em] text-[#7a7066]">Machine Fitness Coach</p>
          <h3 className="mt-5 font-display text-[30px] font-bold leading-none tracking-[-0.02em] text-[#2a2420]">
            A coach
            <br />
            for the <span className="text-[#b4583a]">machine</span>
            <br />
            you move in.
          </h3>
          <p className="mt-4 max-w-[300px] text-[13.5px] leading-snug text-[#4a423b]">
            Atlas listens to the signals your body already sends — heart, sleep, strain, recovery — and turns them into a plan that meets you where you are today.
          </p>
        </div>
        <div className="px-5 pb-8 pt-7">
          <p className="px-1 pb-3 font-mono text-[9.5px] uppercase tracking-[0.18em] text-[#7a7066]">How it works</p>
          <div className="flex flex-col gap-2.5">
            {ABOUT_CARDS.map((c) => {
              const dark = c.tone === "clay";
              return (
                <div
                  key={c.n}
                  className={`rounded-[18px] px-5 py-4 ${dark ? "bg-[#b4583a] text-[#f3efe6]" : "bg-[#f3efe6]/90 text-[#2a2420] shadow-[0_0_0_1px_rgba(42,36,32,0.08)]"}`}
                >
                  <p className={`font-mono text-[9px] uppercase tracking-[0.18em] ${dark ? "text-[#f3efe6]/70" : "text-[#b4583a]"}`}>{c.n}</p>
                  <p className="mt-1.5 font-display text-[20px] font-semibold tracking-[-0.01em]">{c.title}</p>
                  <p className={`mt-1.5 text-[13px] leading-snug ${dark ? "text-[#f3efe6]/85" : "text-[#4a423b]"}`}>{c.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureIcon({ kind, color }: { kind: Feature["icon"]; color: string }) {
  const s = { stroke: color, strokeWidth: 1.7, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const p = { width: 24, height: 24, viewBox: "0 0 28 28", "aria-hidden": true } as const;
  switch (kind) {
    case "stopwatch":
      return <svg {...p}><circle cx="14" cy="16" r="9" {...s} /><path d="M14 16V11M14 7V4M11 4h6M22 9l1.5-1.5" {...s} /></svg>;
    case "camera":
      return <svg {...p}><rect x="3" y="8" width="22" height="15" rx="3" {...s} /><circle cx="14" cy="15.5" r="4.5" {...s} /><path d="M10 8l1.6-2.6h4.8L18 8" {...s} /></svg>;
    case "brain":
      return <svg {...p}><path d="M14 6.5C12 4.5 8.5 5 8 8c-2.2.4-3 3-1.6 4.6C5 14.4 6 17.5 9 17.7 9.2 20 11.2 21.5 14 21V6.5z" {...s} /><path d="M14 6.5C16 4.5 19.5 5 20 8c2.2.4 3 3 1.6 4.6C23 14.4 22 17.5 19 17.7 18.8 20 16.8 21.5 14 21" {...s} /></svg>;
    case "chart":
      return <svg {...p}><path d="M4 24h20" {...s} /><rect x="6" y="14" width="3.5" height="8" rx="1" {...s} /><rect x="12.5" y="9" width="3.5" height="13" rx="1" {...s} /><rect x="19" y="5" width="3.5" height="17" rx="1" {...s} /></svg>;
    case "body":
      return <svg {...p}><circle cx="14" cy="6" r="2.6" {...s} /><path d="M14 9v8M14 12l-5-2M14 12l5-2M14 17l-3.5 6M14 17l3.5 6" {...s} /></svg>;
    case "calendar":
      return <svg {...p}><rect x="4" y="6" width="20" height="18" rx="3" {...s} /><path d="M4 11h20M9 3v5M19 3v5M10 17l2.5 2.5L18 14" {...s} /></svg>;
    case "program":
      return <svg {...p}><rect x="4" y="4" width="9" height="9" rx="2" {...s} /><rect x="15" y="4" width="9" height="9" rx="2" {...s} /><rect x="4" y="15" width="9" height="9" rx="2" {...s} /><rect x="15" y="15" width="9" height="9" rx="2" {...s} /></svg>;
    case "mic":
      return <svg {...p}><rect x="10.5" y="3" width="7" height="13" rx="3.5" {...s} /><path d="M6.5 13a7.5 7.5 0 0 0 15 0M14 20.5V25M10 25h8" {...s} /></svg>;
  }
}

function ContextNote() {
  return <p className="mt-14 text-center font-mono text-[8.5px] uppercase tracking-[0.18em] text-[#7a7066]">Images are for context only</p>;
}

export default function Page() {
  const [openFaq, setOpenFaq] = useState<number>(0);

  return (
    <main className="relative text-[#2a2420]">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          WebkitMaskImage: "radial-gradient(ellipse at center, #000 38%, transparent 82%)",
          maskImage: "radial-gradient(ellipse at center, #000 38%, transparent 82%)",
        }}
      >
        <ChalkGridBG opacity={0.4} />
      </div>
      <header className="sticky top-0 z-40 border-b border-[#2a2420]/15 bg-[#f3efe6]/85 backdrop-blur">
        <div className="mx-auto flex h-[68px] w-full max-w-[1180px] items-center justify-between px-5 md:px-8">
          <LogoLockup />
          <nav className="hidden items-center gap-8 font-mono text-[10px] uppercase tracking-[0.2em] text-[#4a423b] md:flex">
            <Link href="#features">Features</Link>
            <Link href="#how">How it works</Link>
            <Link href="#coach">The coach</Link>
            <Link href="#faq">FAQ</Link>
          </nav>
          <Link href="#waitlist" className="rounded-xl bg-[#67835a] px-4 py-2 font-display text-[13px] font-semibold text-white transition-colors hover:bg-[#5a7350]">Join the Waitlist</Link>
        </div>
      </header>

      <section className="mx-auto grid w-full max-w-[1180px] items-center gap-12 px-5 py-16 md:grid-cols-2 md:px-8">
        <div className="pt-4">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#2a2420]/15 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#4a423b]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4A90E2]" />
            ISOfit · workout tracker · made for iOS
          </div>
          <h1 className="font-display text-[clamp(46px,6vw,76px)] font-extrabold leading-[0.98] tracking-[-0.03em] text-[#2a2420]">
            Your workouts, working <span className="text-[#4A90E2]">for you.</span>
          </h1>
          <p className="mt-6 max-w-[480px] text-lg leading-relaxed text-[#4a423b]">
            Log every session in seconds with the cleanest workout tracker on iOS — then let <strong className="font-semibold text-[#b4583a]">Atlas mfc</strong>, your machine fitness coach, turn your training history into real coaching.
          </p>
          <div id="waitlist" className="mt-8">
            <WaitlistForm />
          </div>
        </div>
        <div>
          <PhoneShell>
            <ChatScreen />
          </PhoneShell>
          <ContextNote />
        </div>
      </section>

      <section id="features" className="border-y border-[#2a2420]/15 bg-[#fbf9f3]">
        <div className="mx-auto w-full max-w-[1180px] px-5 py-16 md:px-8">
          <h2 className="mb-10 max-w-[520px] font-display text-3xl font-semibold leading-tight tracking-[-0.015em] md:text-4xl">One iOS app, numerous paths to your next PR.</h2>
          <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <article key={f.title} className="space-y-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#2a2420]/10 bg-white shadow-[0_1px_0_rgba(42,36,32,0.04)]">
                  <FeatureIcon kind={f.icon} color={f.color} />
                </div>
                <h3 className="font-display text-base font-semibold">{f.title}</h3>
                <p className="text-sm text-[#4a423b]">{f.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="mx-auto grid w-full max-w-[1180px] items-center gap-12 px-5 py-20 md:grid-cols-2 md:px-8">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#3f5a32]">01 · Tracking &amp; consistency</p>
          <h2 className="mt-4 font-display text-[clamp(32px,4vw,46px)] font-bold leading-tight tracking-[-0.02em]">Log in seconds. Reference for life.</h2>
          <ul className="mt-6 space-y-4 text-[#4a423b]">
            <li><strong className="font-semibold text-[#2a2420]">Log every workout</strong> — so that the habit sticks and the data accumulates.</li>
            <li><strong className="font-semibold text-[#2a2420]">Voice, text, or autofill</strong> — so no session goes unrecorded.</li>
            <li><strong className="font-semibold text-[#2a2420]">Automatic streak tracking</strong> — so showing up becomes your metric.</li>
          </ul>
        </div>
        <div className="rounded-3xl border border-[#2a2420]/10 bg-white p-6 shadow-[0_22px_50px_rgba(42,36,32,0.1)]">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#7a7066]">Consistency · this month</p>
          <div className="mt-4 grid grid-cols-7 gap-1.5">
            {Array.from({ length: 35 }).map((_, i) => (
              <div key={i} className={`aspect-square rounded ${i % 6 === 0 ? "bg-[#ece6d9]" : "bg-[#3f5a32]/80"}`} />
            ))}
          </div>
          <div className="mt-5 flex gap-8 border-t border-[#2a2420]/10 pt-4">
            <div><p className="font-display text-3xl font-bold">23</p><p className="font-mono text-xs uppercase tracking-[0.2em] text-[#7a7066]">day streak</p></div>
            <div><p className="font-display text-3xl font-bold">28</p><p className="font-mono text-xs uppercase tracking-[0.2em] text-[#7a7066]">sessions</p></div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#2a2420]/15 bg-[#fbf9f3]">
        <div className="mx-auto grid w-full max-w-[1180px] items-center gap-12 px-5 py-20 md:grid-cols-2 md:px-8">
          <div className="order-2 md:order-1">
            <FormCard />
          </div>
          <div className="order-1 md:order-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#4A90E2]">02 · Form analysis &amp; progression</p>
            <h2 className="mt-4 font-display text-[clamp(32px,4vw,46px)] font-bold leading-tight tracking-[-0.02em]">Fix the rep before it becomes a pattern.</h2>
            <ul className="mt-6 space-y-4 text-[#4a423b]">
              <li><strong className="font-semibold text-[#2a2420]">Point your camera at any lift</strong> — Atlas returns 1–3 corrections in plain language.</li>
              <li><strong className="font-semibold text-[#2a2420]">Track volume and overload</strong> — plateaus show in data before the mirror.</li>
              <li><strong className="font-semibold text-[#2a2420]">Use an interactive body graph</strong> — imbalances get caught, not guessed.</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="coach" className="mx-auto grid w-full max-w-[1180px] items-center gap-12 px-5 py-20 md:grid-cols-2 md:px-8">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#b4583a]">03 · Personalized programming</p>
          <h2 className="mt-4 font-display text-[clamp(32px,4vw,46px)] font-bold leading-tight tracking-[-0.02em]">Coaching built from your day to day.</h2>
          <p className="mt-6 text-[#4a423b]">Atlas operates across specialized domains and adapts your plan to frequency, recovery, and progression logic.</p>
        </div>
        <div>
          <PhoneShell>
            <AboutScreen />
          </PhoneShell>
          <ContextNote />
        </div>
      </section>

      <section id="faq" className="mx-auto w-full max-w-[1180px] px-5 py-20 md:px-8">
        <h2 className="mb-8 font-display text-[clamp(32px,4vw,46px)] font-bold leading-tight tracking-[-0.02em]">Questions, answered plainly.</h2>
        <div className="border-y border-[#2a2420]/15">
          {FAQS.map(([q, a], i) => (
            <div key={q} className="border-t border-[#2a2420]/10 first:border-t-0">
              <button className="flex w-full items-center justify-between gap-5 py-5 text-left" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                <span className="font-display text-lg font-semibold">{q}</span>
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#2a2420]/15 text-[#4a423b]">{openFaq === i ? "−" : "+"}</span>
              </button>
              {openFaq === i && <p className="max-w-[620px] pb-5 text-[#4a423b]">{a}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-5 pb-20 md:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-[#2a2420] p-10 md:p-14">
          <div className="absolute inset-0 opacity-40">
            <ChalkGridBG opacity={0.32} />
          </div>
          <div className="absolute inset-0" style={{ background: "radial-gradient(90% 120% at 100% 0%, rgba(74,144,226,0.2), transparent 55%)" }} />
          <div className="relative max-w-[620px]">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#f3efe6]/60">Join the waitlist</p>
            <h2 className="mt-4 font-display text-[clamp(34px,5vw,56px)] font-extrabold leading-[0.98] tracking-[-0.03em] text-[#f3efe6]">
              Start training with a <span className="text-[#4A90E2]">new coach</span> who understands the data.
            </h2>
            <p className="mt-4 max-w-[500px] text-[#f3efe6]/75">ISOfit is launching summer 2026. Be first in — no spam, just a heads-up when we launch.</p>
            <div className="mt-8">
              <WaitlistForm dark compact />
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#2a2420]/15">
        <div className="mx-auto flex w-full max-w-[1180px] flex-wrap items-center justify-between gap-5 px-5 py-10 md:px-8">
          <LogoLockup />
          <div className="flex flex-wrap gap-6 font-mono text-[10px] uppercase tracking-[0.2em] text-[#7a7066]">
            <a href="https://isofit.app/privacy">Privacy Policy</a>
            <a href="#">Contact</a>
          </div>
          <p className="text-right font-mono text-[10px] uppercase tracking-[0.2em] text-[#7a7066]">© 2026 ISOfit · humbly designed in queens, NY</p>
        </div>
      </footer>
    </main>
  );
}

function FormCard() {
  const muscles = [
    ["Chest", 82, "#4A90E2"],
    ["Back", 64, "#4A90E2"],
    ["Quads", 91, "#4A90E2"],
    ["Shoulders", 38, "#b4583a"],
    ["Hamstrings", 29, "#b4583a"],
  ] as const;

  return (
    <div className="space-y-4 rounded-3xl border border-[#2a2420]/10 bg-white p-5">
      <div className="aspect-[4/3] rounded-2xl bg-[repeating-linear-gradient(135deg,#ece6d9,#ece6d9_11px,#f3efe6_11px,#f3efe6_22px)] p-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#2a2420]/90 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#f3efe6]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#b4583a]" />
          analysing · barbell row
        </div>
      </div>
      <div className="rounded-2xl border border-[#2a2420]/10 p-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#b4583a]">3 corrections from Atlas</p>
        <ul className="mt-3 space-y-2 text-sm">
          <li>Brace your core before the pull, not during.</li>
          <li>Lead with the elbows — keep wrists neutral.</li>
          <li>Slow the lower; you&apos;re dropping the last third.</li>
        </ul>
        <div className="mt-4 border-t border-[#2a2420]/10 pt-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#7a7066]">Weekly volume · by group</p>
          <div className="mt-2 space-y-2">
            {muscles.map(([name, value, color]) => (
              <div key={name} className="flex items-center gap-3">
                <span className="w-24 text-xs text-[#4a423b]">{name}</span>
                <div className="h-2 flex-1 rounded-full bg-[#ece6d9]">
                  <div className="h-2 rounded-full" style={{ width: `${value}%`, background: color, opacity: color === "#b4583a" ? 0.7 : 1 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
