import { SITE } from "@/lib/site";

// Apple's official black "Download on the App Store" badge, unmodified, from
// developer.apple.com/app-store/marketing/guidelines. Apple asks that it is
// never shown shorter than 40px, so compact stays at that minimum.
const BADGE = { src: "/badges/download-on-the-app-store.svg", width: 119.66407, height: 40 };

export default function AppStoreLink({
  compact = false,
  className = "",
}: {
  compact?: boolean;
  className?: string;
}) {
  const height = compact ? 40 : 48;
  return (
    <a href={SITE.appStoreUrl} className={`badge-shine inline-flex shrink-0 items-center rounded-[9px] ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- a fixed-size SVG needs no optimizer */}
      <img
        src={BADGE.src}
        alt="Download on the App Store"
        width={Math.round((BADGE.width * height) / BADGE.height)}
        height={height}
        className="block"
        style={{ height, width: "auto" }}
      />
    </a>
  );
}
