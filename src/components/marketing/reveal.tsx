"use client";

import { useEffect } from "react";

// Motion `story-reveal` and `screen-reveal`. Content is visible by default (no JS,
// reduced motion, or no IntersectionObserver all leave it untouched). Only elements
// that start below the fold are hidden, once, and each reveals a single time as it
// enters view. Decorative: nothing here decides whether content or a control exists.
export default function Reveal() {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!items.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;

    const belowFold = items.filter((item) => item.getBoundingClientRect().top > window.innerHeight * 0.92);
    if (!belowFold.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.revealed = "";
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -6% 0px" },
    );
    // Hide first, then watch: anything already on screen was never hidden.
    for (const item of belowFold) {
      delete item.dataset.revealed;
      item.dataset.revealPending = "";
      observer.observe(item);
    }
    // Keyboard focus inside a pending item reveals it at once.
    const onFocusIn = (event: FocusEvent) => {
      const host = (event.target as HTMLElement).closest<HTMLElement>("[data-reveal]");
      if (host) host.dataset.revealed = "";
    };
    document.addEventListener("focusin", onFocusIn);
    document.documentElement.classList.add("reveal-ready");
    // Fail open if the observer never fires (print, background tab, odd viewport).
    const failOpen = window.setTimeout(() => belowFold.forEach((item) => (item.dataset.revealed = "")), 6000);
    return () => {
      window.clearTimeout(failOpen);
      document.removeEventListener("focusin", onFocusIn);
      observer.disconnect();
      document.documentElement.classList.remove("reveal-ready");
      belowFold.forEach((item) => { item.dataset.revealed = ""; });
    };
  }, []);

  return null;
}
