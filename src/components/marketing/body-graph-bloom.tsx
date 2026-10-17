"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// The body graph filling itself in behind the page, played by the page's own scroll. Muscles bloom
// from the centre of the torso outward and warm from pale to terracotta as you read down, with a
// finer second layer of fibre arriving late so the figure gets denser. Like AtlasSquat it is a
// fixed, faded layer behind the content that never pins or holds the scroll, and it draws nothing
// for reduced motion or Save-Data / 2G. It is inline SVG driven by one CSS variable: no assets.
type Patch = { cx: number; cy: number; rx: number; ry: number; rot?: number; tier: number; mirror?: boolean };

const CENTER = { x: 100, y: 190 };
const REACH = 235;

const PATCHES: Patch[] = [
  // Torso first: it is nearest the centre, so it appears first.
  ...[0, 1, 2, 3, 4].map((i): Patch => ({ cx: 100, cy: 124 + i * 15, rx: 9, ry: 6, tier: 4 - (i % 2) })),
  { cx: 87, cy: 101, rx: 17, ry: 13, rot: -8, tier: 3, mirror: true },
  { cx: 76, cy: 146, rx: 6, ry: 15, rot: 6, tier: 2, mirror: true },
  { cx: 88, cy: 72, rx: 12, ry: 6, rot: -14, tier: 1, mirror: true },
  { cx: 66, cy: 88, rx: 11, ry: 13, tier: 4, mirror: true },
  { cx: 56, cy: 124, rx: 7, ry: 18, rot: 8, tier: 2, mirror: true },
  { cx: 49, cy: 164, rx: 6, ry: 21, rot: 8, tier: 1, mirror: true },
  { cx: 82, cy: 222, rx: 13, ry: 38, rot: 4, tier: 3, mirror: true },
  { cx: 94, cy: 232, rx: 5, ry: 30, tier: 2, mirror: true },
  { cx: 80, cy: 330, rx: 9, ry: 30, rot: -3, tier: 1, mirror: true },
  { cx: 89, cy: 330, rx: 4, ry: 24, tier: 0, mirror: true },
  { cx: 43, cy: 201, rx: 6, ry: 9, tier: 0, mirror: true },
  { cx: 80, cy: 415, rx: 10, ry: 6, tier: 0, mirror: true },
  { cx: 100, cy: 38, rx: 16, ry: 21, tier: 0 },
];

type Cell = { key: string; cx: number; cy: number; rx: number; ry: number; rot: number; tier: number; d: number; inner: boolean };

const CELLS: Cell[] = PATCHES.flatMap((p, i) =>
  (p.mirror ? [-1, 1] : [1]).flatMap((side) => {
    const cx = p.mirror ? 100 + side * (100 - p.cx) : p.cx;
    const rot = (p.rot ?? 0) * (p.mirror ? side * -1 : 1);
    const d = Math.min(1, Math.hypot(cx - CENTER.x, p.cy - CENTER.y) / REACH);
    const base = { cx, cy: p.cy, rot, d, tier: p.tier };
    return [
      { ...base, key: `${i}-${side}`, rx: p.rx, ry: p.ry, inner: false },
      // The fibre layer: a smaller, warmer patch inside, arriving after the outer one.
      ...(p.tier > 0 ? [{ ...base, key: `${i}-${side}-f`, rx: p.rx * 0.5, ry: p.ry * 0.55, tier: Math.min(5, p.tier + 1), inner: true }] : []),
    ];
  }),
);

export default function BodyGraphBloom() {
  const root = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      connection?.saveData ||
      /(^|-)2g$/.test(connection?.effectiveType ?? "")
    ) {
      return;
    }
    const frame = requestAnimationFrame(() => setOn(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!on || !el) return;
    let raf = 0;
    const paint = () => {
      raf = 0;
      const span = document.documentElement.scrollHeight - window.innerHeight;
      const progress = span > 0 ? Math.min(1, Math.max(0, window.scrollY / span)) : 0;
      el.style.setProperty("--p", progress.toFixed(3));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    paint();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [on]);

  if (!on) return null;
  const mask = "radial-gradient(ellipse 70% 70% at 50% 50%, #000 35%, transparent 100%)";
  return createPortal(
    <div
      ref={root}
      aria-hidden="true"
      style={{ "--p": 0 } as React.CSSProperties}
      className="pointer-events-none fixed inset-x-0 bottom-0 -z-10 flex justify-center lg:justify-end lg:pr-[3vw]"
    >
      <svg
        viewBox="0 0 200 440"
        className="aspect-[200/440] h-[84svh] max-w-none shrink-0 opacity-[.16] mix-blend-multiply md:opacity-30 lg:opacity-45"
        style={{ WebkitMaskImage: mask, maskImage: mask }}
      >
        {CELLS.map((c) => (
          <ellipse
            key={c.key}
            cx={c.cx}
            cy={c.cy}
            rx={c.rx}
            ry={c.ry}
            style={
              {
                rotate: `${c.rot}deg`,
                "--d": c.d.toFixed(3),
                "--lag": c.inner ? 0.55 : 0,
                "--tier": `var(--color-heat-${c.tier})`,
                // Reveal radiates out with progress; colour warms from pale toward its own heat.
                opacity: "clamp(0, calc((var(--p) * 1.6 - var(--d) - var(--lag)) * 3.5), 1)",
                fill: c.tier === 0 ? "var(--color-heat-0)" : "color-mix(in srgb, var(--color-heat-0), var(--tier) calc(min(1, var(--p) * 1.5 + 0.25) * 100%))",
                scale: "calc(0.6 + 0.4 * clamp(0, calc((var(--p) * 1.6 - var(--d) - var(--lag)) * 3.5), 1))",
                transformBox: "fill-box",
                transformOrigin: "center",
              } as React.CSSProperties
            }
          />
        ))}
      </svg>
    </div>,
    document.body,
  );
}
