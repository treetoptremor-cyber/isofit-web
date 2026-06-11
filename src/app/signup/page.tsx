"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { AuthShell } from "@/components/pwa/auth-shell";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    let supabase;
    try {
      supabase = createClient();
    } catch {
      setIsSubmitting(false);
      setErrorMessage("Supabase environment variables are missing.");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          first_name: firstName.trim(),
          last_name: lastName.trim(),
        },
      },
    });

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
      title="Create your account"
      subtitle="Start logging workouts and managing your plan."
      footer={
        <p>
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-[#2d6cb8] hover:text-[#69A5F0]">
            Sign in
          </Link>
        </p>
      }
    >
      <form className="space-y-3" onSubmit={handleSignup}>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block space-y-1.5">
            <span className="text-sm font-medium">First name</span>
            <input
              type="text"
              autoComplete="given-name"
              required
              value={firstName}
              disabled={isSubmitting}
              onChange={(event) => setFirstName(event.target.value)}
              className="h-11 w-full rounded-xl border border-[#2a2420]/15 bg-white px-3 outline-none transition-colors focus:border-[#69A5F0]"
            />
          </label>
          <label className="block space-y-1.5">
            <span className="text-sm font-medium">Last name</span>
            <input
              type="text"
              autoComplete="family-name"
              required
              value={lastName}
              disabled={isSubmitting}
              onChange={(event) => setLastName(event.target.value)}
              className="h-11 w-full rounded-xl border border-[#2a2420]/15 bg-white px-3 outline-none transition-colors focus:border-[#69A5F0]"
            />
          </label>
        </div>

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
            autoComplete="new-password"
            required
            value={password}
            disabled={isSubmitting}
            minLength={8}
            onChange={(event) => setPassword(event.target.value)}
            className="h-11 w-full rounded-xl border border-[#2a2420]/15 bg-white px-3 outline-none transition-colors focus:border-[#69A5F0]"
          />
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="h-11 w-full rounded-xl bg-[#67835a] font-display text-sm font-semibold text-white transition-colors hover:bg-[#5a7350] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Creating account..." : "Create account"}
        </button>
      </form>

      {errorMessage ? (
        <p className="rounded-xl border border-[#b4583a]/20 bg-[#b4583a]/8 px-3 py-2 text-sm text-[#8b3b22]">
          {errorMessage}
        </p>
      ) : null}
    </AuthShell>
  );
}
