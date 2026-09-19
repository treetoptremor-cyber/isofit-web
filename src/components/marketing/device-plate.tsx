import Image from "next/image";

import IsoGrid from "./iso-grid";
import styles from "./marketing.module.css";

/**
 * A screenshot composited into the iPhone frame using the shared
 * .app-device / .app-device-screen rules from globals.css.
 * Only the hero pair is marked `priority`; everything else loads lazily.
 * next/image writes src, srcset and alt into the server HTML either way,
 * so a crawler that never runs JavaScript still indexes every screenshot.
 */
export function PhoneScreen({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="app-device mx-auto">
      <div className="app-device-screen">
        <Image
          src={src}
          alt={alt}
          width={1206}
          height={2622}
          sizes="(max-width: 767px) 240px, 330px"
          priority={priority}
          className="h-auto w-full"
        />
      </div>
      <Image
        src="/mockups/iphone-frame.png"
        alt=""
        width={836}
        height={1881}
        sizes="(max-width: 767px) 280px, 390px"
        priority={priority}
        className="pointer-events-none absolute inset-0 z-10 h-full w-full"
      />
    </div>
  );
}

function Tick({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute size-2.5 border-[#6aa5ee] ${className}`}
    />
  );
}

/**
 * A bounded draughtsman's plate: a mono label row, an optional right-hand
 * readout, corner registration ticks, the isometric lattice as the ground,
 * and a caption that says what you are looking at. It exists so a real
 * screenshot reads as evidence rather than as decoration.
 */
export function Plate({
  gridId,
  label,
  meter,
  caption,
  flat = false,
  bodyClassName = "px-5 pb-8 pt-7 sm:px-7",
  children,
}: {
  gridId: string;
  label: string;
  meter?: string;
  caption?: React.ReactNode;
  flat?: boolean;
  bodyClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <figure className={`${styles.deviceLg} m-0`}>
      <div className="relative rounded-md border border-[#2a2420]/20 bg-[#faf8f3]">
        <Tick className="-left-px -top-px border-l-2 border-t-2" />
        <Tick className="-bottom-px -right-px border-b-2 border-r-2" />
        <div className="flex items-baseline justify-between gap-4 border-b border-[#2a2420]/15 px-5 py-2.5 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-[#6c6259] sm:px-7">
          <span className="text-[#2a2420]">{label}</span>
          {meter ? <span className="tabular-nums text-[#6c6259]">{meter}</span> : null}
        </div>
        <div className={`relative overflow-hidden ${bodyClassName}`}>
          {flat ? null : (
            <>
              <IsoGrid id={gridId} opacity={0.5} />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(64% 50% at 50% 46%, rgba(250,248,243,0.94), rgba(250,248,243,0) 76%)",
                }}
              />
            </>
          )}
          <div className="relative">{children}</div>
        </div>
      </div>
      {caption ? (
        <figcaption className="mt-3.5 font-mono text-xs leading-5 text-[#554d45]">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
