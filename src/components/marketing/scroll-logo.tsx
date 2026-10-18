"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { BOX, CYCLE, PATHS, paintPulse, restFill } from "@/lib/cube-pulse";

// The Isofit cube played by the page's own scroll: the top face hops and lands, the impact sends I, S
// and O launching off their faces in turn. A fixed, faded layer behind the content, so it never pins
// or holds the page. Plain SVG driven from requestAnimationFrame, so it behaves the same in every
// browser and loads nothing extra. Decorative: absent for reduced motion, and the page reads the same
// without it.
const SCROLL_PER_CYCLE = 700;

export default function ScrollLogo() {
  const [on, setOn] = useState(false);
  const refs = useRef<Record<string, SVGPathElement | null>>({});

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const frame = requestAnimationFrame(() => setOn(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!on) return;
    let raf = 0;
    const paint = () => {
      raf = 0;
      const t = ((window.scrollY / SCROLL_PER_CYCLE) * CYCLE) % CYCLE;
      paintPulse(refs.current, t);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
    };
  }, [on]);

  if (!on) return null;
  return createPortal(
    <div aria-hidden="true" className="pointer-events-none fixed inset-y-0 right-0 -z-10 flex items-center justify-end pr-[4vw]">
      <svg
        viewBox={`${BOX.x - 60} ${BOX.y - 60} ${BOX.w + 120} ${BOX.h + 120}`}
        className="h-[42svh] w-auto max-w-none overflow-visible opacity-[.11] md:h-[62svh] md:opacity-20 lg:opacity-35"
      >
        {(Object.keys(PATHS) as (keyof typeof PATHS)[]).map((key) => (
          <path
            key={key}
            ref={(el) => {
              refs.current[key] = el;
            }}
            d={PATHS[key]}
            fillRule="evenodd"
            style={{ fill: restFill() }}
          />
        ))}
      </svg>
    </div>,
    document.body,
  );
}
