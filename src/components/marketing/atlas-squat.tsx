"use client";

import { useEffect, useRef, useState } from "react";

// Atlas doing a back squat, played by scrolling. Decorative: the page reads the same without it.
// The first frame is real markup, so no JS, reduced motion, slow connections and failed loads all
// leave a still of Atlas under the bar. The other 17 frames load only as the figure nears the screen.
const FRAMES = 18;
const REPS = 3;
const frameSrc = (index: number) => `/atlas/squat/squat-${String(index + 1).padStart(2, "0")}.avif`;

export default function AtlasSquat() {
  const track = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = track.current;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (
      !el ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      connection?.saveData ||
      /(^|-)2g$/.test(connection?.effectiveType ?? "")
    ) {
      return;
    }

    let cancelled = false;
    let frames: HTMLImageElement[] = [];
    let raf = 0;
    let shown = -1;

    const paint = () => {
      raf = 0;
      const ctx = canvas.current?.getContext("2d");
      if (!ctx || !canvas.current) return;
      const rect = el.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      const progress = span > 0 ? Math.min(1, Math.max(0, -rect.top / span)) : 0;
      const t = progress * REPS;
      const index = progress >= 1 ? 0 : Math.min(FRAMES - 1, Math.floor((t % 1) * FRAMES));
      if (index === shown) return;
      shown = index;
      ctx.drawImage(frames[index], 0, 0, canvas.current.width, canvas.current.height);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };

    const load = async () => {
      const loaded = await Promise.all(
        Array.from({ length: FRAMES }, (_, index) => {
          const image = new Image();
          image.decoding = "async";
          image.src = frameSrc(index);
          return image.decode().then(() => image);
        }),
      ).catch(() => null);
      if (cancelled || !loaded) return;
      frames = loaded;
      if (canvas.current) {
        canvas.current.width = frames[0].naturalWidth;
        canvas.current.height = frames[0].naturalHeight;
      }
      setReady(true);
      schedule();
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        void load();
      },
      { rootMargin: "1200px 0px" },
    );
    observer.observe(el);

    return () => {
      cancelled = true;
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div ref={track} className={ready ? "h-[320vh]" : ""}>
      <div className={ready ? "sticky top-20 flex h-[calc(100svh-6rem)] items-center justify-center" : "flex justify-center"}>
        <div className="relative aspect-[540/729] max-h-full w-full max-w-md overflow-hidden rounded-[1.75rem] border border-terra/20 bg-terra-soft shadow-[0_18px_40px_rgba(42,36,32,0.08)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={frameSrc(0)} alt="" width={540} height={729} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
          <canvas ref={canvas} aria-hidden="true" className={`absolute inset-0 h-full w-full ${ready ? "" : "hidden"}`} />
        </div>
      </div>
    </div>
  );
}
