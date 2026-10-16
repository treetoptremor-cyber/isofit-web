import { SITE } from "@/lib/site";

export default function AppStoreLink({
  compact = false,
  className = "",
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <a
      href={SITE.appStoreUrl}
      className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-forest font-semibold text-white transition-colors hover:bg-forest-dark ${compact ? "min-h-11 px-4 text-[0.9375rem]" : "min-h-12 px-5 text-base"} ${className}`}
    >
      Download on the App Store
      <span aria-hidden="true" className="font-normal">→</span>
    </a>
  );
}
