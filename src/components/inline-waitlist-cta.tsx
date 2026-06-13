"use client";

import { useState } from "react";

import WaitlistForm from "@/components/waitlist-form";

export default function InlineWaitlistCta() {
  const [isSignupVisible, setIsSignupVisible] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsSignupVisible(true)}
        className="inline-flex h-12 items-center justify-center rounded-xl bg-[#67835a] px-5 font-display text-sm font-semibold text-white transition-colors hover:bg-[#5a7350]"
      >
        Join the ISOfit Waitlist
      </button>
      {isSignupVisible ? (
        <div className="mt-4 rounded-2xl border border-[#2a2420]/10 bg-[#f8f5ee] p-3 sm:p-4">
          <WaitlistForm formId="faq-waitlist-form" source="faq_page" />
        </div>
      ) : null}
    </div>
  );
}
