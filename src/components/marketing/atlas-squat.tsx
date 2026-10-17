"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// Atlas doing a back squat in the page background, played by the page's own scroll. It never pins
// or holds the page: it is a fixed, faded layer behind the content, driven by how far down the page
// you are. Decorative. It only exists once its frames have loaded, after the page itself, and not at
// all for reduced motion or Save-Data / 2G connections, so the page reads the same without it.
const FRAMES = 18;
const REPS = 6;
const frameSrc = (index: number) => `/atlas/squat/squat-${String(index + 1).padStart(2, "0")}.avif`;

export default function AtlasSquat() {
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
      const index = progress >= 1 ? 0 : Math.min(FRAMES - 1, Math.floor(((progress * REPS) % 1) * FRAMES));
      if (index === shown) return;
      shown = index;
      ctx.drawImage(frames[index], 0, 0, el.width, el.height);
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
  const mask = "radial-gradient(ellipse 70% 70% at 50% 50%, #000 35%, transparent 100%)";
  return createPortal(
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 bottom-0 -z-10 flex justify-center lg:justify-end lg:pr-[3vw]"
    >
      <canvas
        ref={canvas}
        className="aspect-[540/729] h-[78svh] max-w-none opacity-[.14] mix-blend-multiply md:opacity-25 lg:opacity-40"
        style={{ WebkitMaskImage: mask, maskImage: mask }}
      />
    </div>,
    document.body,
  );
}
