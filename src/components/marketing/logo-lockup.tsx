"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { BOX, CYCLE, PATHS, paintPulse, restFill } from "@/lib/cube-pulse";

// The Isofit mark and wordmark linking home. Clicking plays the app's pulse once on the mark (the
// link still navigates). Each page renders its own header, so a click that navigates away leaves a
// flag for the next header to pick up and play. Skipped for reduced motion.
let playOnMount = false;

export default function LogoLockup() {
  const pathname = usePathname();
  const [playing, setPlaying] = useState(0);
  const refs = useRef<Record<string, SVGPathElement | null>>({});

  useEffect(() => {
    if (!playOnMount) return;
    playOnMount = false;
    const frame = requestAnimationFrame(() => setPlaying((n) => n + 1));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const start = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const t = (now - start) / 1000;
      if (t >= CYCLE) {
        setPlaying(0);
        return;
      }
      paintPulse(refs.current, t);
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const play = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (pathname === "/") setPlaying((n) => n + 1);
    else playOnMount = true;
  };

  return (
    <Link href="/" aria-label="Isofit home" onClick={play} className="flex min-h-11 items-center gap-2.5">
      <span className="relative inline-flex size-[34px] shrink-0 items-center justify-center">
        <Image src="/iso-logo.png" alt="" width={34} height={34} loading="eager" className={playing ? "invisible" : undefined} />
        {playing ? (
          <svg aria-hidden="true" viewBox={`${BOX.x} ${BOX.y} ${BOX.w} ${BOX.h}`} className="absolute h-[30px] w-auto overflow-visible">
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
        ) : null}
      </span>
      <span className="font-display text-xl font-bold leading-none tracking-tight text-sky">Isofit</span>
    </Link>
  );
}
