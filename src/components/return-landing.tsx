import Image from "next/image";
import { HeatRibbon } from "@/components/marketing/primitives";
import { ShellBackdrop } from "@/components/pwa/shell-backdrop";

type ReturnLandingProps = {
  title: string;
  message: string;
};

export function ReturnLanding({ title, message }: ReturnLandingProps) {
  return (
    <main className="relative isolate flex min-h-screen flex-col items-center justify-center bg-paper px-4 py-12 text-ink">
      <ShellBackdrop />
      <div className="w-full max-w-md rounded-3xl border border-rule bg-white p-8 text-center shadow-[0_22px_50px_rgba(42,36,32,0.08)] sm:p-10">
        <div className="flex items-center justify-center gap-2.5">
          <Image src="/iso-logo.png" alt="Isofit" width={34} height={34} priority className="shrink-0" />
          <p className="font-display text-xl font-bold leading-none tracking-tight text-[#69A5F0]">Isofit</p>
        </div>
        <HeatRibbon className="mx-auto mt-6 max-w-24" />
        <h1 className="mt-5 font-display text-[clamp(1.85rem,8vw,2.5rem)] font-extrabold leading-[1.05] tracking-[-0.04em]">
          {title}
        </h1>
        <p className="mt-4 text-[15px] leading-7 text-ink-2">{message}</p>
        <a
          href="isofit://open"
          className="mt-8 inline-flex rounded-xl bg-forest px-5 py-2.5 font-display text-sm font-semibold text-white transition-colors hover:bg-[#5C94DA]"
        >
          Return to the Isofit app
        </a>
      </div>
    </main>
  );
}
