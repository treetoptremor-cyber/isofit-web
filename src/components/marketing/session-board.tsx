"use client";

import { useEffect, useRef, useState } from "react";

// The three rows of the Log tab's session board, drawn as text so they can be typed. Back Squat is
// always filled in; Overhead Press and Incline Bench type themselves one row at a time. "scroll"
// plays that through the page's own scroll (a passive listener, never pins or holds the page);
// "loop" plays it on a timer. For reduced motion, or before script runs, every row simply shows
// complete. It sits over the screenshot band it replaces, so it carries the same aspect ratio.
const ROWS = [
  { name: "Back Squat", sets: "3", reps: "8", lbs: "185", rpe: "7", window: null },
  { name: "Overhead Press", sets: "3", reps: "10", lbs: "95", rpe: "7", window: { scroll: [27, 45], loop: [6, 44] } },
  { name: "Incline Bench", sets: "3", reps: "8", lbs: "50", rpe: "7", window: { scroll: [43, 61], loop: [42, 80] } },
] as const;

// Share of each row's window spent typing the name, then the four figures in turn.
const NAME_SHARE = 0.5;
const CYCLE_MS = 9000;

type Segment = { text: string; from: number; to: number };

function segments(row: (typeof ROWS)[number], mode: "scroll" | "loop"): Record<"name" | "sets" | "reps" | "lbs" | "rpe", Segment> | null {
  if (!row.window) return null;
  const [start, end] = row.window[mode];
  const span = end - start;
  const nameEnd = start + span * NAME_SHARE;
  const step = (end - nameEnd) / 4;
  const at = (index: number) => [nameEnd + step * index, nameEnd + step * (index + 1)] as const;
  return {
    name: { text: row.name, from: start, to: nameEnd },
    sets: { text: row.sets, from: at(0)[0], to: at(0)[1] },
    reps: { text: row.reps, from: at(1)[0], to: at(1)[1] },
    lbs: { text: row.lbs, from: at(2)[0], to: at(2)[1] },
    rpe: { text: row.rpe, from: at(3)[0], to: at(3)[1] },
  };
}

function Typed({ segment, text, mode }: { segment?: Segment; text: string; mode: "scroll" | "loop" }) {
  if (!segment) return <>{text}</>;
  if (mode === "scroll") {
    return (
      <span className="tb-type" data-tb-scroll="" data-from={segment.from} data-to={segment.to}>
        {text}
      </span>
    );
  }
  // Inline values rather than calc() on custom properties, so every engine reads them the same.
  const style: React.CSSProperties = {
    animationName: "tb-type",
    animationTimingFunction: `steps(${text.length}, end)`,
    animationDuration: `${Math.round(((segment.to - segment.from) * CYCLE_MS) / 100)}ms`,
    animationDelay: `${Math.round((segment.from * CYCLE_MS) / 100)}ms`,
    animationFillMode: "both",
  };
  return (
    <span className="tb-type tb-on-loop" style={style}>
      {text}
    </span>
  );
}

const NOTES = {
  exercise: {
    title: "Exercise",
    body: "Add an exercise from the library of 500+, or type a name that is not there and Isofit offers to create it as a custom exercise. Hold a row for more actions.",
  },
  metrics: {
    title: "Metrics",
    body: "Sets, reps and weight in pounds or kilograms. Bodyweight sets count with no weight entered. Cardio uses distance and duration, and every row has Start and Rest timers that add up to the session duration.",
  },
  rpe: {
    title: "RPE",
    body: "Rate of perceived exertion: how hard the exercise felt, recorded for each exercise.",
  },
} as const;
type NoteKey = keyof typeof NOTES;

function InfoIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-full" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <circle cx="8" cy="8" r="6.4" />
      <path d="M8 7.2v4" />
      <circle cx="8" cy="4.9" r="0.35" fill="currentColor" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-full" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 7.5v9M7.5 12h9" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 10 10" className="size-[1.9cqw] shrink-0" fill="currentColor">
      <path d="M2 1.2v7.6L8.6 5z" />
    </svg>
  );
}

function TimerIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-[2.4cqw] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="9" r="5.2" />
      <path d="M8 9V6.2M6.4 1.8h3.2" />
    </svg>
  );
}

const rule = "border-rule";
const label = "font-mono text-[2cqw] uppercase tracking-[0.18em] text-ink-3";

export default function SessionBoard({ mode, alt }: { mode: "scroll" | "loop"; alt: string }) {
  const root = useRef<HTMLDivElement>(null);
  const [cycle, setCycle] = useState(0);
  const [visible, setVisible] = useState(mode === "scroll");
  const [note, setNote] = useState<NoteKey | null>(null);
  const info = mode === "scroll";

  useEffect(() => {
    if (mode !== "loop" || !root.current) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(root.current);
    return () => observer.disconnect();
  }, [mode]);

  // Scroll mode is driven from a passive scroll listener, not CSS scroll timelines, so it plays in
  // Safari and Firefox as well. Progress is how far the figure has travelled through the viewport.
  useEffect(() => {
    const board = root.current;
    if (mode !== "scroll" || !board || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const figure = board.closest("figure") ?? board;
    const parts = Array.from(board.querySelectorAll<HTMLElement>("[data-tb-scroll]")).map((el) => ({
      el,
      from: Number(el.dataset.from),
      to: Number(el.dataset.to),
      n: el.textContent?.length ?? 1,
      shown: -1,
    }));
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = figure.getBoundingClientRect();
      const progress = ((window.innerHeight - rect.top) / (window.innerHeight + rect.height)) * 100;
      for (const part of parts) {
        const typed = Math.floor(Math.min(1, Math.max(0, (progress - part.from) / (part.to - part.from))) * part.n);
        if (typed === part.shown) continue;
        part.shown = typed;
        part.el.style.clipPath = `inset(0 ${100 - (typed / part.n) * 100}% 0 0)`;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [mode]);

  useEffect(() => {
    if (!note) return;
    const close = (event: KeyboardEvent | MouseEvent) => {
      if (event instanceof KeyboardEvent ? event.key === "Escape" : !(event.target as HTMLElement).closest("[data-tb-info]")) setNote(null);
    };
    window.addEventListener("keydown", close);
    window.addEventListener("mousedown", close);
    return () => {
      window.removeEventListener("keydown", close);
      window.removeEventListener("mousedown", close);
    };
  }, [note]);

  useEffect(() => {
    if (mode !== "loop" || !visible) return;
    const timer = window.setInterval(() => setCycle((value) => value + 1), CYCLE_MS);
    return () => window.clearInterval(timer);
  }, [mode, visible]);

  return (
    <div
      ref={root}
      data-mode={mode}
      data-paused={mode === "loop" && !visible ? "true" : undefined}
      className="tb-board absolute inset-0 overflow-clip bg-paper-raised [container-type:inline-size]"
    >
      <p className="sr-only">{alt}</p>
      <div key={cycle} className="absolute inset-0 text-ink">
        <div className={`absolute inset-x-0 top-0 z-10 h-[12%] border-b-2 ${rule} ${label}`}>
          {(
            [
              ["exercise", "11.2%"],
              ["metrics", "53.7%"],
              ["rpe", "86.8%"],
            ] as const
          ).map(([key, left]) => (
            <span key={key} className="absolute top-1/2 flex -translate-y-1/2 items-center gap-[1.2cqw]" style={{ left }}>
              {NOTES[key].title}
              {info ? (
                <button
                  type="button"
                  data-tb-info=""
                  aria-label={`About ${NOTES[key].title}`}
                  aria-expanded={note === key}
                  onClick={() => setNote(note === key ? null : key)}
                  className="relative size-[2.8cqw] cursor-pointer rounded-full text-ink-3 before:absolute before:-inset-2 before:content-[''] hover:text-blue focus-visible:text-blue aria-expanded:text-blue"
                >
                  <InfoIcon />
                </button>
              ) : (
                <span aria-hidden="true" className="block size-[2.8cqw] text-ink-3">
                  <InfoIcon />
                </span>
              )}
            </span>
          ))}
        </div>
        {info && note ? (
          <div
            data-tb-info=""
            role="note"
            className="absolute inset-x-[3%] top-[13.5%] z-20 rounded-[1.6cqw] border-[0.3cqw] border-sky bg-paper-raised p-[2.4cqw] shadow-[0_1.5cqw_4cqw_rgba(42,36,32,0.18)]"
          >
            <p className="font-mono text-[2.1cqw] uppercase tracking-[0.18em] text-blue">{NOTES[note].title}</p>
            <p className="mt-[1cqw] font-sans text-[2.7cqw] leading-snug text-ink-2">{NOTES[note].body}</p>
          </div>
        ) : null}
        <span className={`absolute bottom-0 top-0 left-[50.5%] border-l ${rule}`} />
        <span className={`absolute bottom-0 top-0 left-[86%] border-l ${rule}`} />
        <div aria-hidden="true" className="absolute inset-0">
        {ROWS.map((row, index) => {
          const parts = segments(row, mode);
          return (
            <div
              key={row.name}
              className={`absolute inset-x-0 h-[28.9%] ${index < 2 ? `border-b-2 ${rule}` : ""}`}
              style={{ top: `${12 + index * 28.9}%` }}
            >
              <span className="absolute left-[3.4%] top-[50%] size-[3.9cqw] -translate-y-1/2 text-sky">
                <PlusIcon />
              </span>
              <span className="absolute left-[11.2%] top-[10%] whitespace-nowrap font-mono text-[3.9cqw] leading-[1.4] tracking-[0.04em]">
                <Typed text={row.name} segment={parts?.name} mode={mode} />
              </span>
              <span className="absolute left-[11.2%] top-[52%] flex h-[34%] w-[13.8%] items-center justify-center gap-[0.8cqw] rounded-[1.5cqw] border-[0.3cqw] border-sky bg-sky-soft font-mono text-[2.2cqw] font-semibold tracking-[0.12em] text-blue">
                <PlayIcon />
                START
              </span>
              <span className="absolute left-[26.2%] top-[52%] flex h-[34%] w-[13.8%] items-center justify-center gap-[0.8cqw] rounded-[1.5cqw] border-[0.3cqw] border-heat-0 bg-paper font-mono text-[2.2cqw] font-semibold tracking-[0.12em] text-ink-2">
                <TimerIcon />
                REST
              </span>
              {(
                [
                  ["sets", "Sets", "55.9%", "text-blue"],
                  ["reps", "Reps", "67.3%", ""],
                  ["lbs", "Lbs", "79.7%", ""],
                  ["rpe", "RPE", "92.6%", ""],
                ] as const
              ).map(([key, name, left, tone]) => (
                <span key={key} className="absolute top-[18%] -translate-x-1/2 text-center" style={{ left }}>
                  <span className={`block h-[3em] font-mono text-[4.4cqw] font-bold leading-[3em] ${tone}`}>
                    <Typed text={row[key]} segment={parts?.[key]} mode={mode} />
                  </span>
                  <span className={`${label} -mt-[1.6cqw] block`}>{name}</span>
                </span>
              ))}
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}
