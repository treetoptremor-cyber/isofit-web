"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { AuthShell } from "@/components/pwa/auth-shell";
import { createClient } from "@/lib/supabase/client";

type OAuthProvider = "apple" | "google";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [activeAction, setActiveAction] = useState<"password" | "apple" | "google" | null>(null);

  const isSubmitting = activeAction !== null;

  function getDestination() {
    if (typeof window === "undefined") {
      return "/log";
    }

    const params = new URLSearchParams(window.location.search);
    const redirectTo = params.get("redirectTo");
    if (redirectTo?.startsWith("/")) {
      return redirectTo;
    }

    return "/log";
  }

  async function handlePasswordSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const destination = getDestination();
    setErrorMessage("");
    setActiveAction("password");

    let supabase;
    try {
      supabase = createClient();
    } catch {
      setActiveAction(null);
      setErrorMessage("Supabase environment variables are missing.");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setActiveAction(null);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    router.push(destination);
    router.refresh();
  }

  async function handleOAuthSignIn(provider: OAuthProvider) {
    const destination = getDestination();
    setErrorMessage("");
    setActiveAction(provider);

    let supabase;
    try {
      supabase = createClient();
    } catch {
      setActiveAction(null);
      setErrorMessage("Supabase environment variables are missing.");
      return;
    }

    const origin = window.location.origin;
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${origin}/auth/callback?next=${encodeURIComponent(destination)}`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
      setActiveAction(null);
    }
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to access your workout log and billing."
      footer={
        <p>
          Need an account?{" "}
          <Link href="/signup" className="font-semibold text-[#2d6cb8] hover:text-[#69A5F0]">
            Create one
          </Link>
        </p>
      }
    >
      <form className="space-y-3" onSubmit={handlePasswordSignIn}>
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
        <label className="block space-y-1.5">
          <span className="text-sm font-medium">Password</span>
          <input
            type="password"
            autoComplete="current-password"
            required
            value={password}
            disabled={isSubmitting}
            onChange={(event) => setPassword(event.target.value)}
            className="h-11 w-full rounded-xl border border-[#2a2420]/15 bg-white px-3 outline-none transition-colors focus:border-[#69A5F0]"
          />
        </label>
        <button
          type="submit"
          disabled={isSubmitting}
          className="h-11 w-full rounded-xl bg-[#69A5F0] font-display text-sm font-semibold text-white transition-colors hover:bg-[#5c94da] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {activeAction === "password" ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <div className="relative text-center text-xs uppercase tracking-[0.18em] text-[#7a7066]">
        <span className="bg-white px-2">or continue with</span>
        <div className="absolute left-0 top-1/2 -z-10 h-px w-full -translate-y-1/2 bg-[#2a2420]/10" />
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <button
          type="button"
          disabled={isSubmitting}
          onClick={() => void handleOAuthSignIn("apple")}
          className="h-11 rounded-xl border border-[#2a2420]/15 bg-white px-4 text-sm font-semibold transition-colors hover:bg-[#f8f5ee] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {activeAction === "apple" ? "Connecting..." : "Continue with Apple"}
        </button>
        <button
          type="button"
          disabled={isSubmitting}
          onClick={() => void handleOAuthSignIn("google")}
          className="h-11 rounded-xl border border-[#2a2420]/15 bg-white px-4 text-sm font-semibold transition-colors hover:bg-[#f8f5ee] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {activeAction === "google" ? "Connecting..." : "Continue with Google"}
        </button>
      </div>

      {errorMessage ? (
        <p className="rounded-xl border border-[#b4583a]/20 bg-[#b4583a]/8 px-3 py-2 text-sm text-[#8b3b22]">
          {errorMessage}
        </p>
      ) : null}
    </AuthShell>
  );
}
