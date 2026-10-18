"use client";

import { useEffect, useRef, useState } from "react";

import type { Bar } from "./sets-bars";

// The bars of the "Sets by muscle" card loading up as it scrolls into view. The card is a real
// screenshot, so each bar is covered by a patch the colour of the card and the patch is wiped
// away left to right, one bar after another. Server-rendered and with reduced motion there are no
// patches at all, so the screenshot reads exactly as it is. Coordinates are in screenshot pixels.

const SOURCE_W = 1206;
const SOURCE_H = 2622;
const PAD = 4;
const STAGGER = 110;

export default function BarsReveal({ bars, top, height }: { bars: Bar[]; top: number; height: number }) {
  const root = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const arm = requestAnimationFrame(() => setArmed(true));
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setPlay(true);
        observer.disconnect();
      },
      { threshold: 0.45 },
    );
    observer.observe(el);
    return () => {
      cancelAnimationFrame(arm);
      observer.disconnect();
    };
  }, []);

  const bandTop = top * SOURCE_H;
  const bandHeight = height * SOURCE_H;
  return (
    <div ref={root} aria-hidden="true" className="pointer-events-none absolute inset-0">
      {armed &&
        bars.map((bar, index) => (
          <span
            key={bar.y0}
            className="absolute bg-white"
            style={{
              left: `${(((bar.x0 - PAD) / SOURCE_W) * 100).toFixed(3)}%`,
              width: `${(((bar.x1 - bar.x0 + PAD * 2) / SOURCE_W) * 100).toFixed(3)}%`,
              top: `${(((bar.y0 - PAD - bandTop) / bandHeight) * 100).toFixed(3)}%`,
              height: `${(((bar.y1 - bar.y0 + PAD * 2) / bandHeight) * 100).toFixed(3)}%`,
              transformOrigin: "right center",
              transform: play ? "scaleX(0)" : "scaleX(1)",
              transition: `transform 900ms cubic-bezier(0.22, 1, 0.36, 1) ${index * STAGGER}ms`,
            }}
          />
        ))}
    </div>
  );
}
