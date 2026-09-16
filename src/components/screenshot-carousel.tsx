"use client";

import Image from "next/image";
import { useId, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";

const screenshots = [
  {
    src: "/screenshots/body-graph.png",
    title: "Body graph",
    caption: "See where your training adds up.",
    alt: "Isofit’s body graph highlights trained muscles on front and back body views, with training volume by muscle below.",
  },
  {
    src: "/screenshots/history.png",
    title: "History",
    caption: "Review the work behind it.",
    alt: "Isofit’s workout history lists recent sessions with their exercises, sets, repetitions, and weights.",
  },
  {
    src: "/screenshots/atlas.png",
    title: "Atlas analysis",
    caption: "Ask what it means for your next session.",
    alt: "An Atlas conversation reviews the September 8 workout and discusses exercise order, volume, and possible changes for next time.",
  },
] as const;

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={direction === "left" ? "M14 5 7 12l7 7" : "m10 5 7 7-7 7"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ScreenshotCarousel() {
  const [active, setActive] = useState(0);
  const id = useId();
  const gesture = useRef<{ id: number; x: number; y: number } | null>(null);
  const current = screenshots[active];

  function move(direction: number) {
    setActive((index) => (index + direction + screenshots.length) % screenshots.length);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      move(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      move(1);
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      setActive(event.key === "Home" ? 0 : screenshots.length - 1);
    }
  }

  function startSwipe(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary || event.button !== 0) return;
    gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function finishSwipe(event: PointerEvent<HTMLDivElement>) {
    const start = gesture.current;
    if (!start || start.id !== event.pointerId) return;
    gesture.current = null;
    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    if (Math.abs(deltaX) >= 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.25) {
      move(deltaX < 0 ? 1 : -1);
    }
  }

  return (
    <section
      aria-label="Inside Isofit"
      aria-roledescription="carousel"
      className="mx-auto w-full min-w-0 max-w-[444px]"
      onKeyDown={handleKeyDown}
    >
      <p id={`${id}-instructions`} className="sr-only">
        Three app screenshots. Swipe left or right, use the arrow buttons, or choose a dot.
        When the carousel is focused, use the left and right arrow keys to change screenshots.
      </p>

      <div className="mx-auto grid w-full max-w-[396px] grid-cols-[2.75rem_minmax(0,1fr)_2.75rem] items-center gap-1 sm:max-w-[444px] sm:gap-2">
        <button
          type="button"
          aria-label="Previous screenshot"
          aria-controls={`${id}-screens`}
          onClick={() => move(-1)}
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-[#2a2420]/25 bg-[#f8f5ee] text-[#2a2420] transition-colors hover:border-[#245c9b] hover:bg-white"
        >
          <Arrow direction="left" />
        </button>
        <div
          id={`${id}-screens`}
          className="app-device mx-auto select-none rounded-[3rem]"
          tabIndex={0}
          aria-label={`App preview: ${current.title}`}
          aria-describedby={`${id}-instructions`}
          onPointerDown={startSwipe}
          onPointerUp={finishSwipe}
          onPointerCancel={() => { gesture.current = null; }}
          onLostPointerCapture={() => { gesture.current = null; }}
        >
          <div className="app-device-screen">
            <div
              className="flex h-full transition-transform duration-300 ease-out motion-reduce:transition-none"
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
              {screenshots.map((screenshot, index) => (
                <div
                  key={screenshot.src}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${screenshots.length}: ${screenshot.title}`}
                  aria-hidden={index !== active}
                  className="h-full w-full shrink-0"
                >
                  <Image
                    src={screenshot.src}
                    alt={screenshot.alt}
                    width={1206}
                    height={2622}
                    sizes="(max-width: 639px) 250px, 284px"
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "auto"}
                    draggable={false}
                    className="h-auto w-full"
                  />
                </div>
              ))}
            </div>
          </div>
          <Image
            src="/mockups/iphone-frame.png"
            alt=""
            width={836}
            height={1881}
            sizes="(max-width: 427px) calc(100vw - 128px), (max-width: 639px) 300px, 340px"
            loading="eager"
            draggable={false}
            className="pointer-events-none absolute inset-0 z-10 h-full w-full"
          />
        </div>
        <button
          type="button"
          aria-label="Next screenshot"
          aria-controls={`${id}-screens`}
          onClick={() => move(1)}
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-[#2a2420]/25 bg-[#f8f5ee] text-[#2a2420] transition-colors hover:border-[#245c9b] hover:bg-white"
        >
          <Arrow direction="right" />
        </button>
      </div>

      <div aria-live="polite" aria-atomic="true" className="mt-2 min-h-[4.5rem] text-center">
        <p className="font-display text-base font-bold text-sky">
          <span className="mr-2 font-mono text-sm font-normal tabular-nums text-[#6c6259]">0{active + 1}</span>
          {current.title}
        </p>
        <p className="mt-2 text-base leading-relaxed text-[#4a423b]">{current.caption}</p>
      </div>

      <div role="group" aria-label="Choose a screenshot" className="mt-3 flex justify-center">
        {screenshots.map((screenshot, index) => (
          <button
            key={screenshot.src}
            type="button"
            aria-label={`Show ${screenshot.title}, screenshot ${index + 1} of ${screenshots.length}`}
            aria-current={index === active ? "true" : undefined}
            aria-controls={`${id}-screens`}
            onClick={() => setActive(index)}
            className="group inline-flex size-11 items-center justify-center rounded-full"
          >
            <span aria-hidden="true" className={`h-2 rounded-full transition-[width,background-color] duration-200 ${index === active ? "w-6 bg-[#245c9b]" : "w-2 bg-[#8b8176] group-hover:bg-[#245c9b]"}`} />
          </button>
        ))}
      </div>
    </section>
  );
}
