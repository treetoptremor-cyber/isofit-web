"use client";

import { useId, useState, type FormEvent } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type WaitlistStatus = "idle" | "loading" | "success" | "error" | "duplicate";

type WaitlistFormProps = {
  dark?: boolean;
  compact?: boolean;
  formId?: string;
  source?: string;
  /** Accessible name for the form landmark. Two forms on one page must not share one. */
  label?: string;
  /** Server-rendered result of a no-JavaScript submission, read from the query string. */
  notice?: { status: Exclude<WaitlistStatus, "idle" | "loading">; message: string };
};

export default function WaitlistForm({
  dark = false,
  compact = false,
  formId,
  source = "landing_page",
  label = "Join the Isofit waitlist",
  notice,
}: WaitlistFormProps) {
  const inputId = useId();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<WaitlistStatus>(notice?.status ?? "idle");
  const [message, setMessage] = useState(notice?.message ?? "");

  const resetStatusIfNeeded = () => {
    if (status !== "idle" && status !== "loading") {
      setStatus("idle");
      setMessage("");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // Only runs with JavaScript on. With it off the form posts itself to
    // /api/waitlist, which redirects back here with the result.
    event.preventDefault();

    const trimmedFirstName = firstName.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedFirstName || !trimmedEmail) {
      setStatus("error");
      setMessage("Please enter your first name and email address.");
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

  const isDisabled = status === "loading";
  const isInvalid = status === "error";
  const describedBy = `${inputId}-help ${inputId}-status`;
  const fieldClassName = `h-11 w-full rounded-xl border px-3 text-base outline-none transition-colors disabled:opacity-60 min-w-0 sm:h-12 ${
    dark
      ? "border-[#9aa8b8] bg-[#191411] text-[#f3efe6] placeholder:text-[#c2cdd8] focus:border-[#6aa5ee]"
      : "border-[#7a7066] bg-transparent text-[#2a2420] placeholder:text-[#6c6259] focus:border-[#245c9b]"
  }`;

  return (
    <form
      id={formId}
      method="post"
      action="/api/waitlist"
      onSubmit={handleSubmit}
      aria-label={label}
      aria-busy={status === "loading"}
      className={`${compact ? "w-full max-w-[460px]" : "w-full max-w-[560px]"} scroll-mt-28`}
    >
      <input type="hidden" name="source" value={source} />
      <div className="bg-transparent">
        <div className="grid grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-2 sm:gap-3">
          <div className="min-w-0">
            <label htmlFor={`${inputId}-name`} className="sr-only">
              First name
            </label>
            <input
              id={`${inputId}-name`}
              name="first_name"
              autoComplete="given-name"
              type="text"
              required
              value={firstName}
              onChange={(event) => {
                setFirstName(event.target.value);
                resetStatusIfNeeded();
              }}
              disabled={status === "loading"}
              placeholder="First name"
              aria-invalid={isInvalid}
              aria-describedby={describedBy}
              className={fieldClassName}
            />
          </div>
          <div className="min-w-0">
            <label htmlFor={`${inputId}-email`} className="sr-only">
              Email address
            </label>
            <input
              id={`${inputId}-email`}
              name="email"
              autoComplete="email"
              autoCapitalize="none"
              spellCheck={false}
              type="email"
              required
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                resetStatusIfNeeded();
              }}
              disabled={status === "loading"}
              placeholder="Email address"
              aria-invalid={isInvalid}
              aria-describedby={describedBy}
              className={fieldClassName}
            />
          </div>
          <button
            type="submit"
            disabled={isDisabled}
            className="col-span-2 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#245c9b] px-5 py-2.5 text-base font-semibold text-white transition-colors hover:bg-[#1d4a7d] disabled:cursor-wait sm:min-h-12"
          >
            {status === "loading" ? "Joining..." : "Join the Waitlist"}
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
      <p id={`${inputId}-help`} className={`mt-2 flex items-start gap-2 text-sm leading-5 ${dark ? "text-[#f3efe6]/80" : "text-[#6c6259]"}`}>
        <span aria-hidden="true" className="mt-2 inline-block h-[5px] w-[5px] shrink-0 rounded-full bg-[#245c9b]" />
        Be first in. No spam, just a heads-up when we launch.
      </p>
      <p
        id={`${inputId}-status`}
        role={isInvalid ? "alert" : "status"}
        aria-atomic="true"
        className={`text-sm [&:not(:empty)]:mt-2 ${
          status === "success"
            ? dark ? "text-[#3DDC97]" : "text-[#36552b]"
            : status === "duplicate"
              ? dark
                ? "text-[#9CB2FF]"
                : "text-[#245c9b]"
              : dark ? "text-[#F5A524]" : "text-[#93411d]"
        }`}
        aria-live="polite"
      >
        {message}
      </p>
    </form>
  );
}
