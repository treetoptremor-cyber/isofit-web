"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

const APP_SCREENS = [
  {
    src: "/mockups/progress-body-graph.webp",
    label: "Progress · Body graph",
    caption:
      "Every set lands on a muscle. The graph shows what is accumulating — and what you keep skipping.",
    alt: "Isofit Progress tab showing the body graph: front and back muscle maps shaded by training volume, with sets by muscle and total sets beneath them.",
  },
  {
    src: "/mockups/progress-history.webp",
    label: "Progress · History",
    caption: "Every session you have logged, in the order you trained it.",
    alt: "Isofit Progress tab showing workout history: dated session cards listing each exercise with its sets, reps and weight.",
  },
  {
    src: "/mockups/atlas-chat.webp",
    label: "Atlas mfc",
    caption: "Tell Atlas what you did. It tells you what to change next time.",
    alt: "Isofit Atlas tab showing a chat in which Atlas reviews a logged session and suggests reordering the work and holding back volume.",
  },
] as const;

const AUTOPLAY_MS = 5000;

function Chevron({ back = false }: { back?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-4 w-4 ${back ? "-ml-px" : "ml-px"}`}
    >
      <polyline points={back ? "15 18 9 12 15 6" : "9 18 15 12 9 6"} />
    </svg>
  );
}

export default function AppScreenCarousel({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  // Autoplay is a courtesy, not a hijack: it stops for good the moment
  // someone drives the carousel themselves.
  const [autoplay, setAutoplay] = useState(true);
  const [paused, setPaused] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), {
      threshold: 0.4,
    });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const scrollToIndex = useCallback(
    (next: number, smooth: boolean) => {
      const track = trackRef.current;
      if (!track) return;
      track.scrollTo({
        left: next * track.clientWidth,
        behavior: smooth && !reducedMotion ? "smooth" : "auto",
      });
    },
    [reducedMotion],
  );

  const goTo = useCallback(
    (next: number) => {
      setAutoplay(false);
      scrollToIndex((next + APP_SCREENS.length) % APP_SCREENS.length, true);
    },
    [scrollToIndex],
  );

  // The scroll position is the source of truth, so a swipe and a button
  // press converge on the same index.
  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;
    const next = Math.round(track.scrollLeft / track.clientWidth);
    setIndex(Math.min(APP_SCREENS.length - 1, Math.max(0, next)));
  }, []);

  useEffect(() => {
    if (!autoplay || paused || !onScreen || reducedMotion) return;
    const timer = window.setTimeout(
      () => scrollToIndex((index + 1) % APP_SCREENS.length, true),
      AUTOPLAY_MS,
    );
    return () => window.clearTimeout(timer);
  }, [autoplay, paused, onScreen, reducedMotion, index, scrollToIndex]);

  // A resize changes the slide width, which would otherwise leave the
  // track parked between two screens.
  useEffect(() => {
    const onResize = () => scrollToIndex(index, false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [index, scrollToIndex]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(index - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(index + 1);
    }
  };

  return (
    <div
      ref={rootRef}
      className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:gap-x-16 md:gap-y-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Ordered so a narrow screen reads heading, phone, then caption —
          a caption above the screen it describes would be backwards. */}
      <div className="order-1 max-w-[560px] md:col-start-1 md:row-start-1 md:self-end">{children}</div>

      <div
        className="order-2 mx-auto w-full max-w-[300px] md:col-start-2 md:row-start-1 md:row-span-2 md:max-w-[320px] md:self-center"
      >
      <div
        className="relative bg-[#1d2530] p-[3.2%] shadow-[0_26px_60px_-28px_rgba(42,36,32,0.7)]"
        style={{ borderRadius: "15.4% / 7.34%" }}
      >
        <span aria-hidden className="absolute -left-[0.9%] top-[15%] h-[4%] w-[1.1%] rounded-full bg-[#141a22]" />
        <span aria-hidden className="absolute -left-[0.9%] top-[22%] h-[7.5%] w-[1.1%] rounded-full bg-[#141a22]" />
        <span aria-hidden className="absolute -left-[0.9%] top-[31%] h-[7.5%] w-[1.1%] rounded-full bg-[#141a22]" />
        <span aria-hidden className="absolute -right-[0.9%] top-[25%] h-[11%] w-[1.1%] rounded-full bg-[#141a22]" />
        <div className="relative overflow-hidden bg-black" style={{ borderRadius: "15.4% / 7.09%" }}>
          <div
            ref={trackRef}
            onScroll={handleScroll}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="group"
            aria-roledescription="carousel"
            aria-label="Isofit app screens"
            className="flex snap-x snap-mandatory overflow-x-auto overflow-y-hidden [scrollbar-width:none] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[#69A5F0] [&::-webkit-scrollbar]:hidden"
          >
            {APP_SCREENS.map((screen, position) => (
              <div
                key={screen.src}
                className="w-full shrink-0 snap-center"
                role="group"
                aria-roledescription="slide"
                aria-label={`${position + 1} of ${APP_SCREENS.length}: ${screen.label}`}
              >
                <Image
                  src={screen.src}
                  alt={screen.alt}
                  width={1206}
                  height={2622}
                  sizes="(max-width: 767px) 300px, 320px"
                  className="block h-auto w-full"
                />
              </div>
            ))}
          </div>
          <span
            aria-hidden
            className="absolute left-1/2 top-[1.26%] h-[4.23%] w-[31%] -translate-x-1/2 rounded-full bg-black"
          />
        </div>
      </div>
      </div>

      <div className="order-3 max-w-[560px] md:col-start-1 md:row-start-2 md:self-start">
      {/* Every caption stays in the same grid cell, so the block is as tall
          as the longest one and nothing below it shifts between slides. */}
      <div className="grid text-center md:text-left">
        {APP_SCREENS.map((screen, position) => (
          <div
            key={screen.src}
            aria-hidden={position !== index}
            className={`col-start-1 row-start-1 transition-opacity duration-300 motion-reduce:transition-none ${
              position === index ? "" : "pointer-events-none"
            }`}
            style={{ opacity: position === index ? 1 : 0 }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#7a7066]">{screen.label}</p>
            <p className="mt-2 text-sm leading-relaxed text-[#4a423b]">{screen.caption}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-center gap-4 md:justify-start">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Previous screen"
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#2a2420]/20 bg-white text-[#2a2420] transition-colors hover:bg-[#f8f5ee]"
        >
          <Chevron back />
        </button>
        <div className="flex items-center gap-2">
          {APP_SCREENS.map((screen, position) => (
            <button
              key={screen.src}
              type="button"
              onClick={() => goTo(position)}
              aria-label={`Show ${screen.label}`}
              aria-current={position === index}
              className={`h-2 rounded-full transition-all duration-300 motion-reduce:transition-none ${
                position === index ? "w-6 bg-[#69A5F0]" : "w-2 bg-[#2a2420]/25 hover:bg-[#2a2420]/40"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label="Next screen"
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#2a2420]/20 bg-white text-[#2a2420] transition-colors hover:bg-[#f8f5ee]"
        >
          <Chevron />
        </button>
      </div>
      </div>
    </div>
  );
}
