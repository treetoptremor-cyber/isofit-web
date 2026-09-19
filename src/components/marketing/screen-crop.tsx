import Image from "next/image";

import styles from "./marketing.module.css";

const SOURCE_W = 1206;
const SOURCE_H = 2622;

/**
 * A detail crop of a real screenshot — the same asset the phone frames use,
 * read closer and without the frame so the interface text is legible at
 * reading size. `top` and `height` are fractions of the source height.
 */
export default function ScreenCrop({
  src,
  alt,
  caption,
  top,
  height,
  sizes = "(max-width: 767px) 100vw, 640px",
  className = "",
  captionClassName = "",
}: {
  src: string;
  alt: string;
  caption: React.ReactNode;
  top: number;
  height: number;
  sizes?: string;
  className?: string;
  /** Used where the caption sits on the lattice and needs its own ground. */
  captionClassName?: string;
}) {
  const shift = (top * (SOURCE_H / SOURCE_W) * 100).toFixed(2);
  return (
    <figure className={`m-0 ${className}`}>
      <div
        className={styles.crop}
        style={{ aspectRatio: `${SOURCE_W} / ${Math.round(height * SOURCE_H)}` }}
      >
        <Image
          src={src}
          alt={alt}
          width={SOURCE_W}
          height={SOURCE_H}
          sizes={sizes}
          style={{ marginTop: `-${shift}%` }}
        />
      </div>
      <figcaption className={`mt-3.5 font-mono text-xs leading-5 text-[#554d45] ${captionClassName}`}>{caption}</figcaption>
    </figure>
  );
}
