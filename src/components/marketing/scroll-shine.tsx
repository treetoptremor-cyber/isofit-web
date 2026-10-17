"use client";

import { useEffect } from "react";

// Drives the light that sweeps behind every App Store badge while the page
// scrolls. It writes one custom property per frame, so it works the same in
// every browser, and does nothing for people who ask for reduced motion.
const SWEEP_PX = 900;

export default function ScrollShine() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    let frame = 0;
    let idle = 0;

    const paint = () => {
      frame = 0;
      root.style.setProperty("--shine", ((window.scrollY % SWEEP_PX) / SWEEP_PX).toFixed(3));
    };
    const onScroll = () => {
      root.dataset.shine = "on";
      if (!frame) frame = requestAnimationFrame(paint);
      window.clearTimeout(idle);
      idle = window.setTimeout(() => delete root.dataset.shine, 260);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
      window.clearTimeout(idle);
      delete root.dataset.shine;
    };
  }, []);

  return null;
}
