"use client";

import { useState, type FormEvent } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type WaitlistFormProps = {
  dark?: boolean;
  compact?: boolean;
  formId?: string;
  source?: string;
};

export default function WaitlistForm({
  dark = false,
  compact = false,
  formId,
  source = "landing_page",
}: WaitlistFormProps) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "duplicate">("idle");
  const [message, setMessage] = useState("");

  const resetStatusIfNeeded = () => {
    if (status !== "idle" && status !== "loading") {
      setStatus("idle");
      setMessage("");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedFirstName = firstName.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedFirstName || !trimmedEmail) {
      return;
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const params = new URLSearchParams(window.location.search);
      const referrer = params.get("ref") || params.get("utm_source") || null;

      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: trimmedFirstName,
          email: trimmedEmail,
          referrer,
          source,
        }),
      });

      const payload = (await response.json().catch(() => null)) as
        | { message?: string; error?: string }
        | null;

      if (response.status === 201) {
        setStatus("success");
        setMessage(payload?.message ?? "Successfully joined the waitlist!");
        setFirstName("");
        setEmail("");
        return;
      }

      if (response.status === 200) {
        setStatus("duplicate");
        setMessage(payload?.message ?? "You're already on the list!");
        return;
      }

      setStatus("error");
      setMessage(payload?.error ?? "Something went wrong. Please try again.");
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  const hasRequiredFields = !!firstName.trim() && !!email.trim();
  const isDisabled = status === "loading" || !hasRequiredFields;

  return (
    <form
      id={formId}
      onSubmit={handleSubmit}
      className={`${compact ? "w-full max-w-[460px]" : "w-full max-w-[560px]"} scroll-mt-28`}
    >
      <div
        className={`space-y-2 rounded-2xl border p-2 ${
          dark ? "border-white/20 bg-white/10" : "border-[#2a2420]/10 bg-white"
        } shadow-[0_12px_30px_rgba(42,36,32,0.1)]`}
      >
        <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
          <input
            type="text"
            required
            value={firstName}
            onChange={(event) => {
              setFirstName(event.target.value);
              resetStatusIfNeeded();
            }}
            disabled={status === "loading"}
            placeholder="First name"
            className={`h-12 w-full rounded-xl border px-3 outline-none transition-colors disabled:opacity-60 sm:min-w-[130px] sm:flex-1 ${
              dark
                ? "border-[#243140] bg-[#1A2430] text-[#E6EDF3] placeholder:text-[#6B7C8F] focus:border-[#6B8AFD]"
                : "border-[#2a2420]/10 bg-white text-[#2a2420] placeholder:text-[#7a7066] focus:border-[#69A5F0]"
            }`}
          />
          <input
            type="email"
            required
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              resetStatusIfNeeded();
            }}
            disabled={status === "loading"}
            placeholder="you@email.com"
            className={`h-12 w-full rounded-xl border px-3 outline-none transition-colors disabled:opacity-60 sm:min-w-[180px] sm:flex-1 ${
              dark
                ? "border-[#243140] bg-[#1A2430] text-[#E6EDF3] placeholder:text-[#6B7C8F] focus:border-[#6B8AFD]"
                : "border-[#2a2420]/10 bg-white text-[#2a2420] placeholder:text-[#7a7066] focus:border-[#69A5F0]"
            }`}
          />
          <button
            type="submit"
            disabled={isDisabled}
            className={`flex h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl px-5 font-display text-[15px] font-semibold text-white transition-colors sm:w-auto sm:shrink-0 ${
              hasRequiredFields
                ? "bg-[#67835a] hover:bg-[#5a7350] shadow-[0_6px_16px_rgba(103,131,90,0.33)]"
                : "cursor-not-allowed bg-[#a89f90]"
            }`}
          >
            {status === "loading" ? "Joining..." : "Get Early Access"}
            <svg width="16" height="13" viewBox="0 0 16 13" fill="none" aria-hidden="true">
              <path
                d="M1 6.5h13M9 1l5 5.5L9 12"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <p className={`mt-3 flex items-center gap-2 text-sm ${dark ? "text-[#f3efe6]/70" : "text-[#7a7066]"}`}>
        <span className="inline-block h-[5px] w-[5px] rounded-full bg-[#3f5a32]" />
        Be first in. No spam, just a heads-up when we launch.
      </p>
      {(status === "success" || status === "duplicate" || status === "error") && (
        <p
          className={`mt-2 text-sm ${
            status === "success"
              ? "text-[#3DDC97]"
              : status === "duplicate"
                ? dark
                  ? "text-[#9CB2FF]"
                  : "text-[#69A5F0]"
                : "text-[#F5A524]"
          }`}
          aria-live="polite"
        >
          {message}
        </p>
      )}
    </form>
  );
}
