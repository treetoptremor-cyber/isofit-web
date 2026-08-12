import Image from "next/image";

type ReturnLandingProps = {
  title: string;
  message: string;
};

export function ReturnLanding({ title, message }: ReturnLandingProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f3efe6] px-4 py-12 text-[#2a2420]">
      <div className="w-full max-w-md rounded-3xl border border-[#2a2420]/10 bg-white p-8 text-center shadow-[0_22px_50px_rgba(42,36,32,0.08)] sm:p-10">
        <div className="flex items-center justify-center gap-2.5">
          <Image src="/iso-logo.png" alt="Isofit" width={34} height={34} priority className="shrink-0" />
          <p className="font-display text-xl font-bold leading-none tracking-tight text-[#69A5F0]">Isofit</p>
        </div>
        <h1 className="mt-6 font-display text-2xl font-extrabold tracking-[-0.02em] sm:text-3xl">
          {title}
        </h1>
        <p className="mt-4 text-[15px] leading-7 text-[#4a423b]">{message}</p>
        <a
          href="isofit://open"
          className="mt-8 inline-flex rounded-xl bg-[#69A5F0] px-5 py-2.5 font-display text-sm font-semibold text-white transition-colors hover:bg-[#5C94DA]"
        >
          Return to the Isofit app
        </a>
      </div>
    </main>
  );
}
