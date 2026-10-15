"use client";

import { useEffect, useState } from "react";

import { SITE } from "@/lib/site";

// A phone-only "Download on the App Store" bar along the bottom edge. It shows
// once the first screen has scrolled away, and stays out of the way whenever the
// footer is in view, an input has the keyboard up, or the menu is open.
export default function StickyAppLink() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(max-width: 767px)").matches) return;

    const inView = new Set<Element>();
    let scrolled = window.scrollY > 480;
    let keyboard = false;
    let menu = document.body.dataset.menuOpen === "true";
    const update = () => setShow(scrolled && inView.size === 0 && !keyboard && !menu);

    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) inView.add(entry.target);
        else inView.delete(entry.target);
      }
      update();
    }, { rootMargin: "0px 0px 72px 0px" });
    document.querySelectorAll("footer").forEach((element) => io.observe(element));

    const onScroll = () => {
      const next = window.scrollY > 480;
      if (next !== scrolled) {
        scrolled = next;
        update();
      }
    };
    const isField = (target: EventTarget | null) => target instanceof HTMLElement && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName);
    const onFocusIn = (event: FocusEvent) => {
      if (isField(event.target)) {
        keyboard = true;
        update();
      }
    };
    const onFocusOut = (event: FocusEvent) => {
      if (isField(event.target)) {
        keyboard = false;
        update();
      }
    };
    const menuWatch = new MutationObserver(() => {
      menu = document.body.dataset.menuOpen === "true";
      update();
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    menuWatch.observe(document.body, { attributes: true, attributeFilter: ["data-menu-open"] });
    update();

    return () => {
      io.disconnect();
      menuWatch.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  if (!show) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-[110] md:hidden">
      <div className="border-t border-rule bg-paper/95 px-4 pt-3 backdrop-blur" style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}>
        <a href={SITE.appStoreUrl} className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-forest text-base font-semibold text-white hover:bg-forest-dark">
          Download on the App Store
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}
