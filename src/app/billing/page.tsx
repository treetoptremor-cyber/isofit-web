"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { AppShell } from "@/components/pwa/app-shell";
import { createClient } from "@/lib/supabase/client";

type BillingTier = "isofit_gold" | "isofit_pro";

type PlanCard = {
  tier: BillingTier;
  name: string;
  price: string;
  colorClass: string;
};

const PLANS: PlanCard[] = [
  {
    tier: "isofit_gold",
    name: "Gold",
    price: "$12/mo",
    colorClass: "border-[#d9b94f]/40 bg-[#f8f1dc]",
  },
  {
    tier: "isofit_pro",
    name: "Pro",
    price: "$15/mo",
    colorClass: "border-[#69A5F0]/35 bg-[#ecf4ff]",
  },
];

export default function BillingPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const [loadingTier, setLoadingTier] = useState<BillingTier | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (stripePublishableKey) {
      void loadStripe(stripePublishableKey);
    }
  }, [stripePublishableKey]);

  const envMissing = !supabaseUrl || !stripePublishableKey;

  async function handleUpgrade(tier: BillingTier) {
    if (!supabaseUrl) {
      setErrorMessage("Supabase URL is not configured.");
      return;
    }

    setErrorMessage("");
    setLoadingTier(tier);

    let supabase;
    try {
      supabase = createClient();
    } catch {
      setLoadingTier(null);
      setErrorMessage("Supabase environment variables are missing.");
      return;
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();

    const accessToken = session?.access_token;
    if (!accessToken) {
      setLoadingTier(null);
      setErrorMessage("Your session has expired. Please log in again.");
      return;
    }

    const origin = window.location.origin;
    const response = await fetch(`${supabaseUrl}/functions/v1/stripe-create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        tier,
        success_url: `${origin}/billing/success`,
        cancel_url: `${origin}/billing/cancel`,
      }),
    });

    const payload = (await response.json().catch(() => null)) as { url?: string; error?: string; message?: string } | null;
    setLoadingTier(null);

    if (!response.ok || !payload?.url) {
      setErrorMessage(payload?.error ?? payload?.message ?? "Unable to start checkout right now.");
      return;
    }

    window.location.assign(payload.url);
  }

  return (
    <AppShell
      title="Billing"
      description="Choose your ISOfit plan."
      actions={
        <Link
          href="/log"
          className="rounded-xl border border-[#2a2420]/15 bg-white px-4 py-2 text-sm font-semibold transition-colors hover:bg-[#f8f5ee]"
        >
          Back to logger
        </Link>
      }
    >
      <section className="grid gap-4 sm:grid-cols-2">
        {PLANS.map((plan) => {
          const isLoading = loadingTier === plan.tier;
          return (
            <article
              key={plan.tier}
              className={`rounded-3xl border p-5 shadow-[0_14px_30px_rgba(42,36,32,0.07)] ${plan.colorClass}`}
            >
              <p className="font-display text-2xl font-bold tracking-[-0.01em]">{plan.name}</p>
              <p className="mt-1 text-sm text-[#4a423b]">{plan.price}</p>
              <button
                type="button"
                disabled={envMissing || loadingTier !== null}
                onClick={() => void handleUpgrade(plan.tier)}
                className="mt-5 h-11 w-full rounded-xl bg-[#67835a] font-display text-sm font-semibold text-white transition-colors hover:bg-[#5a7350] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? "Redirecting..." : `Upgrade to ${plan.name}`}
              </button>
            </article>
          );
        })}
      </section>

      {envMissing ? (
        <p className="rounded-2xl border border-[#b4583a]/20 bg-[#b4583a]/10 px-4 py-3 text-sm text-[#8b3b22]">
          Billing configuration is missing required environment variables.
        </p>
      ) : null}

      {errorMessage ? (
        <p className="rounded-2xl border border-[#b4583a]/20 bg-[#b4583a]/10 px-4 py-3 text-sm text-[#8b3b22]">
          {errorMessage}
        </p>
      ) : null}
    </AppShell>
  );
}
