"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { bloomAllowed, drawBloom, loadBloomFrames } from "./body-graph-frames";

// The Isofit body graph filling itself in behind the page, played by the page's own scroll. The
// frames are pre-rendered from the app's own figure (front and back, heat ramp and all), so the page
// ships pictures of the bloom, not the figure's drawing. Each muscle blooms from the middle of its
// figure outward, pale first and then warming to its own heat, with the fine structure and outline
// arriving last. Scroll position picks a pair of frames and they are cross-faded, so 20 frames
// read as continuous. Like AtlasSquat it is a fixed, faded layer behind the content that never pins
// or holds the scroll, and it only loads after the page has settled, and not at all for reduced
// motion or Save-Data / 2G connections. It is pushed right until the viewport edge falls through
// the middle of the back figure, so the front figure shows whole and the back figure half. On phones it sits above the sticky download bar, a little
// smaller and fainter, and without the blend mode, which is costly to repaint while scrolling.
export default function BodyGraphBloom() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [frames, setFrames] = useState<HTMLImageElement[] | null>(null);

  useEffect(() => {
    if (!bloomAllowed()) return;
    let cancelled = false;
    loadBloomFrames()
      .then((loaded) => {
        if (!cancelled) setFrames(loaded);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const el = canvas.current;
    if (!frames || !el) return;
    const ctx = el.getContext("2d");
    if (!ctx) return;
    el.width = frames[0].naturalWidth;
    el.height = frames[0].naturalHeight;
    let raf = 0;
    let shown = -1;
    const paint = () => {
      raf = 0;
      const span = document.documentElement.scrollHeight - window.innerHeight;
      const progress = span > 0 ? Math.min(1, Math.max(0, window.scrollY / span)) : 0;
      shown = drawBloom(ctx, frames, progress, shown);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [frames]);

  if (!frames) return null;
  const mask = "radial-gradient(ellipse 75% 70% at 50% 50%, #000 40%, transparent 100%)";
  return createPortal(
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 bottom-[4.75rem] -z-10 flex justify-end overflow-hidden md:bottom-0"
    >
      <canvas
        ref={canvas}
        className="aspect-[220/255] h-[min(66svh,calc(130vw*1.159))] max-w-none shrink-0 translate-x-[23%] opacity-[.15] md:h-[min(84svh,calc(92vw*1.159))] md:opacity-35 md:mix-blend-multiply lg:opacity-50"
        style={{ WebkitMaskImage: mask, maskImage: mask }}
      />
    </div>,
    document.body,
  );
}
