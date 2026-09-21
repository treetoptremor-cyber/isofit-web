import Image from "next/image";
import type { ReactNode } from "react";

const SOURCE_W = 1206;
const SOURCE_H = 2622;

// A band of a real screenshot enlarged to reading size, beside the whole
// screen in a phone frame with that band outlined, so the zoom has a
// reference. `top` and `height` are fractions of the source image's height.
export default function ScreenCrop({
  src,
  alt,
  caption,
  top,
  height,
  priority = false,
}: {
  src: string;
  alt: string;
  caption: ReactNode;
  top: number;
  height: number;
  priority?: boolean;
}) {
  const shift = (top * (SOURCE_H / SOURCE_W) * 100).toFixed(2);
  return (
    <figure>
      <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-6 md:grid-cols-[11.5rem_minmax(0,1fr)] md:gap-8 lg:grid-cols-[13rem_minmax(0,46rem)]">
        {/* The whole screen. Decorative: the zoom carries the alt text. */}
        <div aria-hidden="true" className="order-2 mx-auto w-[9.5rem] md:order-1 md:w-full">
          <div className="app-device !max-w-none">
            <div className="app-device-screen">
              <Image src={src} alt="" width={SOURCE_W} height={SOURCE_H} sizes="208px" loading={priority ? "eager" : "lazy"} className="h-auto w-full" />
              <span
                className="absolute inset-x-0 rounded-[6px] border-2 border-sky bg-sky/10 shadow-[0_0_0_200vmax_rgba(243,239,230,0.55)]"
                style={{ top: `${top * 100}%`, height: `${height * 100}%` }}
              />
            </div>
            <Image
              src="/mockups/iphone-frame.png"
              alt=""
              width={836}
              height={1881}
              sizes="208px"
              loading={priority ? "eager" : "lazy"}
              className="pointer-events-none absolute inset-0 z-10 h-full w-full"
            />
          </div>
        </div>
        <div
          className="order-1 overflow-hidden rounded-[1.25rem] border-2 border-sky/70 bg-paper-raised shadow-[0_18px_40px_rgba(42,36,32,0.10)] md:order-2"
          style={{ aspectRatio: `${SOURCE_W} / ${Math.round(height * SOURCE_H)}` }}
        >
          <Image
            src={src}
            alt={alt}
            width={SOURCE_W}
            height={SOURCE_H}
            sizes="(max-width: 767px) 100vw, 736px"
            loading={priority ? "eager" : "lazy"}
            className="h-auto w-full max-w-none"
            style={{ marginTop: `-${shift}%` }}
          />
        </div>
      </div>
      <figcaption className="caption mt-4">
        <span className="label mr-2 !text-ink">Real screen</span>
        {caption} The outlined band on the phone is the part shown enlarged.
      </figcaption>
    </figure>
  );
}
