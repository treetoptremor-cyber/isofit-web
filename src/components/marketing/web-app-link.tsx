import { SITE } from "@/lib/site";

export default function WebAppLink({
  compact = false,
  className = "",
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <a
      href={SITE.webAppUrl}
      className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-blue/30 bg-paper-raised font-semibold text-blue transition-colors hover:border-blue/60 hover:bg-sky-soft ${compact ? "min-h-11 px-3 text-[0.9375rem]" : "min-h-12 px-5 text-base"} ${className}`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="4" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 21h8m-4-4v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      Web app
      <span aria-hidden="true" className="font-normal">→</span>
    </a>
  );
}
