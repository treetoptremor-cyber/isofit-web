"use client";

import { useEffect, useState } from "react";

import AppStoreLink from "@/components/marketing/app-store-link";

// A phone-only "Download on the App Store" badge at the bottom right, on no backdrop. It shows
// once the first screen has scrolled away, and stays out of the way whenever the
// footer is in view, an input has the keyboard up, or the menu is open. It also
// steps aside while you scroll down, so it never sits over what you are reading,
// and comes back when you scroll up or pause.
export default function StickyAppLink() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(max-width: 767px)").matches) return;

    const inView = new Set<Element>();
    let scrolled = window.scrollY > 480;
    let keyboard = false;
    let menu = document.body.dataset.menuOpen === "true";
    let reading = false;
    let lastY = window.scrollY;
    let pause = 0;
    const update = () => setShow(scrolled && !reading && inView.size === 0 && !keyboard && !menu);

    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) inView.add(entry.target);
        else inView.delete(entry.target);
      }
      update();
    }, { rootMargin: "0px 0px 72px 0px" });
    document.querySelectorAll("footer").forEach((element) => io.observe(element));

    const onScroll = () => {
      const y = window.scrollY;
      scrolled = y > 480;
      if (Math.abs(y - lastY) > 4) {
        reading = y > lastY;
        lastY = y;
      }
      window.clearTimeout(pause);
      pause = window.setTimeout(() => {
        reading = false;
        update();
      }, 700);
      update();
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
      window.clearTimeout(pause);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  if (!show) return null;
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[110] md:hidden">
      <div className="px-4 pt-3" style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}>
        <div className="pointer-events-auto flex justify-end">
          <AppStoreLink />
        </div>
      </div>
    </div>
  );
}
