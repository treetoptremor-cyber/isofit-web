"use client";

import { useId, useState, type FormEvent } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type WaitlistFormProps = {
  dark?: boolean;
  compact?: boolean;
  formId?: string;
  source?: string;
  // Accessible name for the form landmark. Two forms on one page must not share one.
  label?: string;
};

// The email is required; a first name is optional. Fields stack, with visible
// labels. A bad email marks only the email field; a failed request is reported
// separately and never clears what was typed.
export default function WaitlistForm({
  dark = false,
  compact = false,
  formId,
  source = "landing_page",
  label = "Join the Isofit waitlist",
}: WaitlistFormProps) {
  const inputId = useId();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "duplicate">("idle");
  const [emailError, setEmailError] = useState("");
  const [message, setMessage] = useState("");

  const clearFeedback = () => {
    if (emailError) setEmailError("");
    if (status !== "idle" && status !== "loading") {
      setStatus("idle");
      setMessage("");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // Only runs with JavaScript on. Without it the form posts itself to
    // /api/waitlist, which redirects to a /waitlist result page.
    event.preventDefault();

    const trimmedFirstName = firstName.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail) {
      setEmailError("Enter your email address.");
      return;
    }
    if (!EMAIL_REGEX.test(trimmedEmail)) {
      setEmailError("That email address does not look right.");
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
          first_name: trimmedFirstName || null,
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
      setMessage("No connection. Your details are still here; please try again.");
    }
  };

  const busy = status === "loading";
  const field = `h-12 w-full min-w-0 rounded-xl border px-3.5 text-base outline-none transition-colors disabled:opacity-60 ${
    dark
      ? "border-[#8496a8] bg-[#1A2430] text-[#E6EDF3] focus:border-[#6B8AFD]"
      : "border-[#7a7066] bg-transparent text-[#2a2420] focus:border-[#2d6cb8]"
  }`;
  const labelClass = `mb-1 block text-sm font-medium ${dark ? "text-[#f3efe6]/90" : "text-ink-2"}`;
  const optional = <span className={`font-normal ${dark ? "text-[#f3efe6]/60" : "text-ink-3"}`}> (optional)</span>;

  return (
    <form
      id={formId}
      method="post"
      action="/api/waitlist"
      onSubmit={handleSubmit}
      noValidate
      aria-label={label}
      aria-busy={busy}
      className={`${compact ? "w-full max-w-[460px]" : "w-full max-w-[560px]"} scroll-mt-28`}
    >
      <input type="hidden" name="source" value={source} />
      <div className="grid gap-2.5">
        <div>
          <label htmlFor={`${inputId}-name`} className={labelClass}>
            First name{optional}
          </label>
          <input
            id={`${inputId}-name`}
            name="first_name"
            autoComplete="given-name"
            type="text"
            value={firstName}
            onChange={(event) => {
              setFirstName(event.target.value);
              clearFeedback();
            }}
            disabled={busy}
            className={field}
          />
        </div>
        <div>
          <label htmlFor={`${inputId}-email`} className={labelClass}>
            Email address
          </label>
          <input
            id={`${inputId}-email`}
            name="email"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            inputMode="email"
            enterKeyHint="go"
            type="email"
            required
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              clearFeedback();
            }}
            disabled={busy}
            aria-invalid={emailError ? true : undefined}
            aria-describedby={emailError ? `${inputId}-email-error` : `${inputId}-help`}
            className={`${field} ${emailError ? (dark ? "!border-[#F5A524]" : "!border-[#93411d]") : ""}`}
          />
          <p id={`${inputId}-email-error`} role="alert" className={`text-sm [&:not(:empty)]:mt-1.5 ${dark ? "text-[#F5A524]" : "text-[#93411d]"}`}>
            {emailError}
          </p>
        </div>
        <button
          type="submit"
          disabled={busy}
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-forest px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-forest-dark disabled:cursor-wait"
        >
          {busy ? "Joining..." : "Join the waitlist"}
          <svg width="16" height="13" viewBox="0 0 16 13" fill="none" aria-hidden="true">
            <path d="M1 6.5h13M9 1l5 5.5L9 12" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <p id={`${inputId}-help`} className={`mt-1.5 flex items-start gap-2 text-sm leading-5 ${dark ? "text-[#f3efe6]/80" : "text-[#6c6259]"}`}>
        <span aria-hidden="true" className="mt-2 inline-block h-[5px] w-[5px] shrink-0 rounded-full bg-[#3f5a32]" />
        Be first in. No spam, just a heads-up when we launch.
      </p>
      <p
        id={`${inputId}-status`}
        role={status === "error" ? "alert" : "status"}
        aria-atomic="true"
        aria-live="polite"
        className={`text-sm [&:not(:empty)]:mt-2 ${
          status === "success"
            ? dark ? "text-[#3DDC97]" : "text-[#36552b]"
            : status === "duplicate"
              ? dark ? "text-[#9CB2FF]" : "text-[#245c9b]"
              : dark ? "text-[#F5A524]" : "text-[#93411d]"
        }`}
      >
        {message}
      </p>
    </form>
  );
}
