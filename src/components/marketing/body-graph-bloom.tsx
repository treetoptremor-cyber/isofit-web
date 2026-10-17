"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// The Isofit body graph filling itself in behind the page, played by the page's own scroll. The
// frames are pre-rendered from the app's own figure (front and back, heat ramp and all), so the page
// ships pictures of the bloom, not the figure's drawing. Each muscle blooms from the middle of its
// figure outward, pale first and then warming to its own heat, with the fine structure and outline
// arriving last. Scroll position picks a pair of frames and they are cross-faded, so 20 frames
// read as continuous. Like AtlasSquat it is a fixed, faded layer behind the content that never pins
// or holds the scroll, and it only loads after the page has settled, and not at all for reduced
// motion or Save-Data / 2G connections.
const FRAMES = 20;
const frameSrc = (index: number) => `/body-graph/bloom-${String(index + 1).padStart(2, "0")}.avif`;

export default function BodyGraphBloom() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [frames, setFrames] = useState<HTMLImageElement[] | null>(null);

  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      connection?.saveData ||
      /(^|-)2g$/.test(connection?.effectiveType ?? "")
    ) {
      return;
    }
    let cancelled = false;
    const load = () =>
      Promise.all(
        Array.from({ length: FRAMES }, (_, index) => {
          const image = new Image();
          image.decoding = "async";
          image.src = frameSrc(index);
          return image.decode().then(() => image);
        }),
      )
        .then((loaded) => {
          if (!cancelled) setFrames(loaded);
        })
        .catch(() => {});
    // Start once the page has settled, so the frames never compete with it.
    const start = () => (window.requestIdleCallback ? window.requestIdleCallback(() => void load(), { timeout: 3000 }) : window.setTimeout(() => void load(), 1500));
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener("load", start);
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
      const position = progress * (FRAMES - 1);
      const base = Math.min(FRAMES - 2, Math.floor(position));
      const blend = Math.round((position - base) * 16) / 16;
      const key = base + blend;
      if (key === shown) return;
      shown = key;
      ctx.clearRect(0, 0, el.width, el.height);
      ctx.drawImage(frames[base], 0, 0, el.width, el.height);
      if (blend > 0) {
        ctx.globalAlpha = blend;
        ctx.drawImage(frames[base + 1], 0, 0, el.width, el.height);
        ctx.globalAlpha = 1;
      }
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
      className="pointer-events-none fixed inset-x-0 bottom-0 -z-10 flex justify-center lg:justify-end lg:pr-[2vw]"
    >
      <canvas
        ref={canvas}
        className="aspect-[220/255] h-[min(84svh,calc(92vw*1.159))] max-w-none shrink-0 opacity-[.2] mix-blend-multiply md:opacity-35 lg:opacity-50"
        style={{ WebkitMaskImage: mask, maskImage: mask }}
      />
    </div>,
    document.body,
  );
}
