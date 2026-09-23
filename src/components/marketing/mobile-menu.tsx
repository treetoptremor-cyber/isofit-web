"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { PRIMARY_NAV, SITE } from "@/lib/site";

// The phone menu: six full-width rows and the waitlist button. It closes on a
// tap outside, on Escape, and when the route changes.
export default function MobileMenu({ waitlistHref }: { waitlistHref: string }) {
  const panelId = useId();
  const root = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  // "Open" is remembered per route, so a navigation closes it on its own.
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === pathname;
  const setOpen = (value: boolean) => setOpenFor(value ? pathname : null);

  useEffect(() => {
    document.body.dataset.menuOpen = open ? "true" : "false";
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (root.current && !root.current.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={root} className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(!open)}
        className="flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm font-semibold"
      >
        {open ? "Close" : "Menu"}
        <span aria-hidden="true" className="font-mono text-base leading-none">{open ? "×" : "≡"}</span>
      </button>
      <nav
        id={panelId}
        aria-label="Mobile"
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-rule bg-paper px-4 pb-4 pt-2 shadow-[0_18px_40px_rgba(42,36,32,0.16)]"
      >
        <ul className="divide-y divide-rule">
          {PRIMARY_NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                prefetch={false}
                aria-current={pathname === item.href ? "page" : undefined}
                className="flex min-h-12 items-center justify-between text-[1.0625rem] font-medium aria-[current=page]:text-blue"
              >
                {item.label}
                <span aria-hidden="true" className="text-ink-3">→</span>
              </Link>
            </li>
          ))}
          <li>
            <Link href="/login" prefetch={false} className="flex min-h-12 items-center justify-between text-[1.0625rem] font-medium">
              Log in
              <span aria-hidden="true" className="text-ink-3">→</span>
            </Link>
          </li>
        </ul>
        <Link href={waitlistHref} className="mt-3 flex min-h-12 items-center justify-center rounded-xl bg-forest px-3 font-semibold text-white">
          Join the waitlist
        </Link>
        <p className="label pt-3">iOS · {SITE.launchDateLong}</p>
      </nav>
    </div>
  );
}
