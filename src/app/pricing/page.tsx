import DocPage from "@/components/marketing/doc-page";
import { CONTAINER, Device, Plate } from "@/components/marketing/primitives";
import { PRICING_DOC, TIER_CARDS } from "@/content/pricing";
import { docMetadata } from "@/lib/metadata";

export const metadata = docMetadata(PRICING_DOC);

function TierCards() {
  return (
    <section aria-label="Isofit tiers" className={`${CONTAINER} pb-4`}>
      <div className="grid gap-5 md:grid-cols-2">
        {TIER_CARDS.map((tier) => {
          const pro = tier.name === "Pro";
          return (
            <div key={tier.name} className={`rounded-[1.75rem] border p-7 sm:p-9 ${pro ? "border-ink bg-ink text-paper" : "border-rule bg-paper-raised"}`}>
              <h2 className={`label ${pro ? "!text-sky" : ""}`}>{tier.name}</h2>
              <p className={`mt-4 font-display text-[2.5rem] font-bold leading-none tracking-[-0.03em] tabular-nums ${pro ? "text-white" : "text-ink"}`}>
                {tier.price}
                {tier.per ? <span className={`ml-2 align-middle font-mono text-sm font-normal tracking-normal ${pro ? "text-paper/70" : "text-ink-3"}`}>{tier.per}</span> : null}
              </p>
              <p className={`mt-3 text-[0.9375rem] leading-6 ${pro ? "text-paper/75" : "text-ink-3"}`}>{tier.note}</p>
              <ul className={`mt-7 grid gap-3 border-t pt-6 ${pro ? "border-paper/20" : "border-rule"}`}>
                {tier.items.map((item) => (
                  <li key={item} className={`flex gap-3 text-[1.0625rem] leading-relaxed ${pro ? "text-paper/90" : "text-ink-2"}`}>
                    <span aria-hidden="true" className={`mt-[0.35rem] font-mono text-sm font-bold ${pro ? "text-sky" : "text-forest"}`}>+</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function PricingPage() {
  return (
    <DocPage
      doc={PRICING_DOC}
      trail={[{ href: "/pricing", label: "Pricing" }]}
      lead={<TierCards />}
      media={{
        billing: (
          <Plate caption="The Pro paywall in the app. It reads its prices live from the App Store, so the price shown there is the price you pay.">
            <Device
              src="/screenshots/paywall.png"
              alt="Isofit's paywall titled Keep what you built, with a yearly or monthly toggle, a Pro card at $14.99 a month listing the workout logger, Apple Health sync, Atlas coaching, deep analysis, Body Graph and Bonfire, a Free card below it, and buttons to continue with Pro or continue with free."
            />
          </Plate>
        ),
      }}
    />
  );
}
