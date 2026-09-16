"use client";

import { useId, useState } from "react";

import WaitlistForm from "@/components/waitlist-form";

export default function InlineWaitlistCta() {
  const [isSignupVisible, setIsSignupVisible] = useState(false);
  const panelId = useId();

  return (
    <div>
      <button
        type="button"
        aria-expanded={isSignupVisible}
        aria-controls={panelId}
        onClick={() => setIsSignupVisible((visible) => !visible)}
        className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#526b46] px-5 py-3 font-display text-sm font-semibold text-white transition-colors hover:bg-[#435b38]"
      >
        Join the Isofit Waitlist
      </button>
        <div id={panelId} hidden={!isSignupVisible} className="mt-4 rounded-2xl border border-[#2a2420]/10 bg-[#f8f5ee] p-3 sm:p-4">
          {isSignupVisible ? (
          <WaitlistForm formId="faq-waitlist-form" source="faq_page" />
          ) : null}
        </div>
    </div>
  );
}
