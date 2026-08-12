"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useEffect, useState } from "react";
import { AuthShell } from "@/components/pwa/auth-shell";
import { createClient } from "@/lib/supabase/client";

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [hasRecoverySession, setHasRecoverySession] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function checkSession() {
      let supabase;
      try {
        supabase = createClient();
      } catch {
        if (isMounted) {
          setIsCheckingSession(false);
          setErrorMessage("Supabase environment variables are missing.");
        }
        return;
      }

      // Recovery links can also arrive as implicit-flow tokens in the URL
      // fragment (e.g. when the email redirect fell back to the Site URL and
      // the landing page forwarded us the hash). Adopt them before asking
      // for a session, then scrub the tokens from the address bar.
      const hashParams = new URLSearchParams(window.location.hash.slice(1));
      const accessToken = hashParams.get("access_token");
      const refreshToken = hashParams.get("refresh_token");
      if (accessToken && refreshToken) {
        await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        window.history.replaceState(null, "", window.location.pathname);
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!isMounted) {
        return;
      }

      setHasRecoverySession(Boolean(session));
      setIsCheckingSession(false);

      if (!session) {
        setErrorMessage("This reset link is invalid or has expired. Request a new one.");
      }
    }

    void checkSession();

    return () => {
      isMounted = false;
    };
  }, []);

  async function handleUpdatePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    let supabase;
    try {
      supabase = createClient();
    } catch {
      setIsSubmitting(false);
      setErrorMessage("Supabase environment variables are missing.");
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });

    setIsSubmitting(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    router.push("/log");
    router.refresh();
  }

  return (
    <AuthShell
      title="Choose a new password"
      subtitle="Enter a new password for your account."
      footer={
        <p>
          Back to{" "}
          <Link href="/login" className="font-semibold text-[#2d6cb8] hover:text-[#69A5F0]">
            Sign in
          </Link>
        </p>
      }
    >
      {isCheckingSession ? (
        <p className="text-sm text-[#4a423b]">Checking reset link...</p>
      ) : (
        <form className="space-y-3" onSubmit={handleUpdatePassword}>
          <label className="block space-y-1.5">
            <span className="text-sm font-medium">New password</span>
            <input
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={password}
              disabled={isSubmitting || !hasRecoverySession}
              onChange={(event) => setPassword(event.target.value)}
              className="h-11 w-full rounded-xl border border-[#2a2420]/15 bg-white px-3 outline-none transition-colors focus:border-[#69A5F0]"
            />
          </label>
          <label className="block space-y-1.5">
            <span className="text-sm font-medium">Confirm password</span>
            <input
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={confirmPassword}
              disabled={isSubmitting || !hasRecoverySession}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="h-11 w-full rounded-xl border border-[#2a2420]/15 bg-white px-3 outline-none transition-colors focus:border-[#69A5F0]"
            />
          </label>
          <button
            type="submit"
            disabled={isSubmitting || !hasRecoverySession}
            className="h-11 w-full rounded-xl bg-[#69A5F0] font-display text-sm font-semibold text-white transition-colors hover:bg-[#5c94da] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Updating..." : "Update password"}
          </button>
        </form>
      )}

      {errorMessage ? (
        <p className="rounded-xl border border-[#b4583a]/20 bg-[#b4583a]/8 px-3 py-2 text-sm text-[#8b3b22]">
          {errorMessage}{" "}
          {!hasRecoverySession && !isCheckingSession ? (
            <Link href="/forgot-password" className="font-semibold underline">
              Request a new link
            </Link>
          ) : null}
        </p>
      ) : null}
    </AuthShell>
  );
}
