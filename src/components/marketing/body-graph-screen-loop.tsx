"use client";

import { useEffect, useRef, useState } from "react";

import { bloomAllowed, drawBloom, loadBloomFrames, loadImage } from "./body-graph-frames";

// The body graph inside the iPhone mockup, filling itself in on a loop. The phone shows the real
// screenshot underneath, so with no script, reduced motion or Save-Data it is exactly the still it
// was. When the frames arrive, a clean copy of the screen's grid covers the figures and the same
// pre-rendered bloom that plays behind the page is drawn on top, aligned to the screenshot's own
// figures. It then fades to reveal the real screen, rests, and starts again. It pauses offscreen.
// Everything is placed in percentages of the 1206 x 2622 screenshot.
const COVER = { src: "/body-graph/screen-clear.avif", left: 40, top: 640, width: 1126, height: 1222 };
const FIGURES = { left: 83.5, top: 656, width: 1036, height: 1201 };
const pct = (value: number, of: number) => `${((value / of) * 100).toFixed(3)}%`;

const FADE_IN = 600;
const BLOOM = 4400;
const HOLD = 1200;
const FADE_OUT = 800;
const REST = 2500;
const CYCLE = FADE_IN + BLOOM + HOLD + FADE_OUT + REST;

const ease = (t: number) => t * t * (3 - 2 * t);

export default function BodyGraphScreenLoop() {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState<{ frames: HTMLImageElement[]; cover: HTMLImageElement } | null>(null);

  useEffect(() => {
    if (!bloomAllowed()) return;
    let cancelled = false;
    Promise.all([loadBloomFrames(), loadImage(COVER.src)])
      .then(([frames, cover]) => {
        if (!cancelled) setReady({ frames, cover });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const el = root.current;
    const cv = canvas.current;
    if (!ready || !el || !cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const { frames } = ready;
    cv.width = frames[0].naturalWidth;
    cv.height = frames[0].naturalHeight;
    let raf = 0;
    let clock = 0;
    let last = 0;
    let shown = -1;
    const tick = (now: number) => {
      clock = (clock + (last ? now - last : 0)) % CYCLE;
      last = now;
      let cover = 1;
      let progress = 0;
      if (clock < FADE_IN) cover = ease(clock / FADE_IN);
      else if (clock < FADE_IN + BLOOM) progress = ease((clock - FADE_IN) / BLOOM);
      else if (clock < FADE_IN + BLOOM + HOLD) progress = 1;
      else if (clock < FADE_IN + BLOOM + HOLD + FADE_OUT) {
        progress = 1;
        cover = 1 - ease((clock - FADE_IN - BLOOM - HOLD) / FADE_OUT);
      } else cover = 0;
      el.style.opacity = cover.toFixed(3);
      shown = drawBloom(ctx, frames, progress, shown);
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      last = 0;
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !raf) raf = requestAnimationFrame(tick);
      else if (!entry.isIntersecting) stop();
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      stop();
    };
  }, [ready]);

  if (!ready) return null;
  return (
    <div ref={root} aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ opacity: 0 }}>
      <div
        className="absolute"
        style={{
          left: pct(COVER.left, 1206),
          top: pct(COVER.top, 2622),
          width: pct(COVER.width, 1206),
          height: pct(COVER.height, 2622),
          backgroundImage: `url(${COVER.src})`,
          backgroundSize: "100% 100%",
        }}
      />
      <canvas
        ref={canvas}
        className="absolute"
        style={{
          left: pct(FIGURES.left, 1206),
          top: pct(FIGURES.top, 2622),
          width: pct(FIGURES.width, 1206),
          height: pct(FIGURES.height, 2622),
        }}
      />
    </div>
  );
}
