"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AppShell } from "@/components/pwa/app-shell";
import { createClient } from "@/lib/supabase/client";

type WorkoutType = "strength" | "cardio" | "mobility" | "mixed";

type ExerciseRow = {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
};

type ToastState = {
  kind: "success" | "error";
  message: string;
} | null;

function createExerciseRow(): ExerciseRow {
  const id = typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random()}`;

  return {
    id,
    name: "",
    sets: 1,
    reps: 8,
    weight: 0,
  };
}

const WORKOUT_TYPES: Array<{ label: string; value: WorkoutType }> = [
  { label: "Strength", value: "strength" },
  { label: "Cardio", value: "cardio" },
  { label: "Mobility", value: "mobility" },
  { label: "Mixed", value: "mixed" },
];

export default function LogPage() {
  const router = useRouter();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  const [workoutType, setWorkoutType] = useState<WorkoutType>("strength");
  const [exercises, setExercises] = useState<ExerciseRow[]>([createExerciseRow()]);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);

  function showToast(kind: "success" | "error", message: string) {
    setToast({ kind, message });
    window.setTimeout(() => setToast(null), 3200);
  }

  async function handleSignOut() {
    let supabase;
    try {
      supabase = createClient();
    } catch {
      showToast("error", "Supabase environment variables are missing.");
      return;
    }

    setIsSigningOut(true);
    await supabase.auth.signOut();
    setIsSigningOut(false);
    router.push("/login");
    router.refresh();
  }

  function handleExerciseChange(id: string, field: keyof Omit<ExerciseRow, "id">, value: string) {
    setExercises((current) =>
      current.map((exercise) => {
        if (exercise.id !== id) {
          return exercise;
        }

        if (field === "name") {
          return { ...exercise, name: value };
        }

        const numericValue = Number(value);
        return {
          ...exercise,
          [field]: Number.isFinite(numericValue) ? numericValue : 0,
        };
      }),
    );
  }

  function addExercise() {
    setExercises((current) => [...current, createExerciseRow()]);
  }

  function removeExercise(id: string) {
    setExercises((current) => {
      if (current.length <= 1) {
        return current;
      }

      return current.filter((exercise) => exercise.id !== id);
    });
  }

  async function handleSubmitWorkout() {
    if (!supabaseUrl) {
      showToast("error", "Supabase URL is not configured.");
      return;
    }

    const sanitizedExercises = exercises
      .map((exercise) => ({
        ...exercise,
        name: exercise.name.trim(),
        sets: Math.max(1, Math.floor(exercise.sets || 1)),
        reps: Math.max(1, Math.floor(exercise.reps || 1)),
        weight: Number.isFinite(exercise.weight) ? exercise.weight : 0,
      }))
      .filter((exercise) => exercise.name.length > 0);

    if (sanitizedExercises.length === 0) {
      showToast("error", "Add at least one exercise name before submitting.");
      return;
    }

    setIsSubmitting(true);

    let supabase;
    try {
      supabase = createClient();
    } catch {
      setIsSubmitting(false);
      showToast("error", "Supabase environment variables are missing.");
      return;
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();
    const accessToken = session?.access_token;

    if (!accessToken) {
      setIsSubmitting(false);
      showToast("error", "Your session has expired. Please sign in again.");
      return;
    }

    const logDate = new Date().toLocaleDateString("en-CA");
    const response = await fetch(`${supabaseUrl}/functions/v1/submit-workout-log`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        workout_type: workoutType,
        exercises: sanitizedExercises.map((exercise) => ({
          name: exercise.name,
          sets: Array.from({ length: exercise.sets }, () => ({
            weight: exercise.weight,
            reps: exercise.reps,
          })),
        })),
        notes: notes.trim() || undefined,
        log_date: logDate,
      }),
    });

    const payload = (await response.json().catch(() => null)) as { error?: string; message?: string } | null;
    setIsSubmitting(false);

    if (!response.ok) {
      showToast("error", payload?.error ?? payload?.message ?? "Unable to submit workout.");
      return;
    }

    setExercises([createExerciseRow()]);
    setNotes("");
    showToast("success", "Workout logged!");
  }

  return (
    <AppShell
      title="Workout Logger"
      description="Track your workout and submit it to ISOfit."
      actions={
        <div className="flex w-full flex-wrap justify-end gap-2 sm:w-auto">
          <Link
            href="/billing"
            className="inline-flex h-10 items-center justify-center rounded-xl border border-[#2a2420]/15 bg-white px-4 text-sm font-semibold transition-colors hover:bg-[#f8f5ee]"
          >
            Billing
          </Link>
          <button
            type="button"
            disabled={isSigningOut}
            onClick={() => void handleSignOut()}
            className="h-10 rounded-xl bg-[#2a2420] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#3b342f] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSigningOut ? "Signing out..." : "Sign out"}
          </button>
        </div>
      }
    >
      {toast ? (
        <div
          className={`fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl border px-4 py-3 text-sm font-medium shadow-lg ${
            toast.kind === "success"
              ? "border-[#3f5a32]/25 bg-[#e8f3e2] text-[#2f4922]"
              : "border-[#b4583a]/25 bg-[#fbe9e2] text-[#8b3b22]"
          }`}
          role="status"
          aria-live="polite"
        >
          {toast.message}
        </div>
      ) : null}

      <section className="space-y-4 rounded-3xl border border-[#2a2420]/10 bg-white p-4 shadow-[0_14px_30px_rgba(42,36,32,0.07)] sm:p-5">
        <label className="block space-y-1.5">
          <span className="text-sm font-medium">Workout Type</span>
          <select
            value={workoutType}
            onChange={(event) => setWorkoutType(event.target.value as WorkoutType)}
            className="h-11 w-full rounded-xl border border-[#2a2420]/15 bg-white px-3 text-sm outline-none transition-colors focus:border-[#69A5F0]"
          >
            {WORKOUT_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </label>

        <div className="overflow-x-auto rounded-2xl border border-[#2a2420]/10">
          <table className="min-w-[640px] w-full border-collapse text-sm">
            <thead className="bg-[#f8f5ee] text-left">
              <tr>
                <th className="px-3 py-2 font-semibold">Exercise</th>
                <th className="px-3 py-2 font-semibold">Sets</th>
                <th className="px-3 py-2 font-semibold">Reps</th>
                <th className="px-3 py-2 font-semibold">Weight (lbs)</th>
                <th className="px-3 py-2 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {exercises.map((exercise) => (
                <tr key={exercise.id} className="border-t border-[#2a2420]/10">
                  <td className="px-3 py-2">
                    <input
                      type="text"
                      value={exercise.name}
                      onChange={(event) => handleExerciseChange(exercise.id, "name", event.target.value)}
                      placeholder="Barbell Squat"
                      className="h-10 w-full rounded-lg border border-[#2a2420]/15 px-3 outline-none transition-colors focus:border-[#69A5F0]"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="number"
                      min={1}
                      value={exercise.sets}
                      onChange={(event) => handleExerciseChange(exercise.id, "sets", event.target.value)}
                      className="h-10 w-20 rounded-lg border border-[#2a2420]/15 px-2 outline-none transition-colors focus:border-[#69A5F0]"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="number"
                      min={1}
                      value={exercise.reps}
                      onChange={(event) => handleExerciseChange(exercise.id, "reps", event.target.value)}
                      className="h-10 w-20 rounded-lg border border-[#2a2420]/15 px-2 outline-none transition-colors focus:border-[#69A5F0]"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="number"
                      min={0}
                      step="0.5"
                      value={exercise.weight}
                      onChange={(event) => handleExerciseChange(exercise.id, "weight", event.target.value)}
                      className="h-10 w-28 rounded-lg border border-[#2a2420]/15 px-2 outline-none transition-colors focus:border-[#69A5F0]"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <button
                      type="button"
                      onClick={() => removeExercise(exercise.id)}
                      disabled={exercises.length <= 1}
                      className="h-10 rounded-lg border border-[#b4583a]/30 px-3 text-sm font-semibold text-[#8b3b22] transition-colors hover:bg-[#fff1ea] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          type="button"
          onClick={addExercise}
          className="h-10 rounded-xl border border-[#2a2420]/15 px-4 text-sm font-semibold transition-colors hover:bg-[#f8f5ee]"
        >
          + Add Exercise
        </button>

        <label className="block space-y-1.5">
          <span className="text-sm font-medium">Notes (optional)</span>
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            rows={4}
            className="w-full rounded-xl border border-[#2a2420]/15 px-3 py-2 text-sm outline-none transition-colors focus:border-[#69A5F0]"
            placeholder="How did this workout feel?"
          />
        </label>

        <button
          type="button"
          disabled={isSubmitting}
          onClick={() => void handleSubmitWorkout()}
          className="h-11 w-full rounded-xl bg-[#67835a] font-display text-sm font-semibold text-white transition-colors hover:bg-[#5a7350] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Submitting..." : "Submit Workout"}
        </button>
      </section>
    </AppShell>
  );
}
