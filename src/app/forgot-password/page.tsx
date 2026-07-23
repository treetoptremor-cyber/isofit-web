"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";
import { AuthShell } from "@/components/pwa/auth-shell";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleResetRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsSubmitting(true);

    let supabase;
    try {
      supabase = createClient();
    } catch {
      setIsSubmitting(false);
      setErrorMessage("Supabase environment variables are missing.");
      return;
    }

    const origin = window.location.origin;
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${origin}/auth/callback?next=${encodeURIComponent("/update-password")}`,
    });

    setIsSubmitting(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setSuccessMessage("If an account exists for that email, we sent a reset link. Check your inbox.");
  }

  return (
    <AuthShell
      title="Reset password"
      subtitle="Enter your email and we'll send you a link to choose a new password."
      footer={
        <p>
          Remembered it?{" "}
          <Link href="/login" className="font-semibold text-[#2d6cb8] hover:text-[#69A5F0]">
            Sign in
          </Link>
        </p>
      }
    >
      <form className="space-y-3" onSubmit={handleResetRequest}>
        <label className="block space-y-1.5">
          <span className="text-sm font-medium">Email</span>
          <input
            type="email"
            autoComplete="email"
            required
            value={email}
            disabled={isSubmitting}
            onChange={(event) => setEmail(event.target.value)}
            className="h-11 w-full rounded-xl border border-[#2a2420]/15 bg-white px-3 outline-none transition-colors focus:border-[#69A5F0]"
          />
        </label>
        <button
          type="submit"
          disabled={isSubmitting}
          className="h-11 w-full rounded-xl bg-[#69A5F0] font-display text-sm font-semibold text-white transition-colors hover:bg-[#5c94da] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Sending link..." : "Send reset link"}
        </button>
      </form>

      {successMessage ? (
        <p className="rounded-xl border border-[#67835a]/20 bg-[#67835a]/8 px-3 py-2 text-sm text-[#3f5236]">
          {successMessage}
        </p>
      ) : null}

      {errorMessage ? (
        <p className="rounded-xl border border-[#b4583a]/20 bg-[#b4583a]/8 px-3 py-2 text-sm text-[#8b3b22]">
          {errorMessage}
        </p>
      ) : null}
    </AuthShell>
  );
}
