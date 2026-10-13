import IsoGrid from "@/components/marketing/iso-grid";

// The marketing site's faint grid, behind the standalone account and status
// screens. Decorative only.
export function ShellBackdrop() {
  const mask = "linear-gradient(to bottom, transparent, #000 12%, #000 88%, transparent), linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)";
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
      style={{ WebkitMaskImage: mask, WebkitMaskComposite: "source-in", maskImage: mask, maskComposite: "intersect" }}
    >
      <IsoGrid id="shell-grid" />
    </div>
  );
}
