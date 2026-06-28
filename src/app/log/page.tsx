"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { AppShell } from "@/components/pwa/app-shell";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { createClient } from "@/lib/supabase/client";
import { getStoredWorkouts, saveWorkout, type StoredExercise, type StoredWorkout } from "@/lib/workout-storage";

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

type ActiveTab = "log" | "progress";

type WorkoutLogRow = {
  id: string;
  workout_type: WorkoutType;
  exercises: unknown;
  notes: string | null;
  log_date: string;
  created_at: string;
};

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

function createWorkoutId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random()}`;
}

function normalizeStoredExercises(exercises: unknown): StoredExercise[] {
  if (!Array.isArray(exercises)) {
    return [];
  }

  return exercises
    .map((exercise) => {
      if (!exercise || typeof exercise !== "object") {
        return null;
      }

      const maybeExercise = exercise as { name?: unknown; sets?: unknown };
      const name = typeof maybeExercise.name === "string" ? maybeExercise.name.trim() : "";
      if (!name) {
        return null;
      }

      const sets = Array.isArray(maybeExercise.sets)
        ? maybeExercise.sets
          .map((set) => {
            if (!set || typeof set !== "object") {
              return null;
            }

            const maybeSet = set as { weight?: unknown; reps?: unknown };
            const nextSet: { weight?: number; reps?: number } = {};
            if (typeof maybeSet.weight === "number" && Number.isFinite(maybeSet.weight)) {
              nextSet.weight = maybeSet.weight;
            }
            if (typeof maybeSet.reps === "number" && Number.isFinite(maybeSet.reps)) {
              nextSet.reps = maybeSet.reps;
            }
            return nextSet;
          })
          .filter((set): set is { weight?: number; reps?: number } => set !== null)
        : [];

      return { name, sets };
    })
    .filter((exercise): exercise is StoredExercise => exercise !== null);
}

function createWorkoutSignature(workout: Pick<StoredWorkout, "workout_type" | "exercises" | "notes" | "log_date">) {
  const exerciseKey = workout.exercises
    .map((exercise) => `${exercise.name.toLowerCase()}-${exercise.sets.length}`)
    .join("|");
  return `${workout.log_date}|${workout.workout_type}|${workout.notes ?? ""}|${exerciseKey}`;
}

function mergeWorkouts(localWorkouts: StoredWorkout[], remoteWorkouts: StoredWorkout[]) {
  const bySignature = new Map<string, StoredWorkout>();
  [...localWorkouts, ...remoteWorkouts].forEach((workout) => {
    const signature = createWorkoutSignature(workout);
    const current = bySignature.get(signature);

    if (!current) {
      bySignature.set(signature, workout);
      return;
    }

    if (new Date(workout.submitted_at).getTime() > new Date(current.submitted_at).getTime()) {
      bySignature.set(signature, workout);
    }
  });

  return [...bySignature.values()].sort((a, b) => {
    const dateDiff = new Date(b.log_date).getTime() - new Date(a.log_date).getTime();
    if (dateDiff !== 0) {
      return dateDiff;
    }

    return new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime();
  });
}

function formatLogDate(logDate: string) {
  const parsedDate = new Date(`${logDate}T00:00:00`);
  if (Number.isNaN(parsedDate.getTime())) {
    return logDate;
  }
  return parsedDate.toLocaleDateString();
}

function SignupTermPopover({ label, description }: { label: string; description: string }) {
  return (
    <Popover>
      <PopoverTrigger className="inline text-sm font-semibold text-[#2d6cb8] underline decoration-[#2d6cb8]/50 underline-offset-2 transition-colors hover:text-[#69A5F0]">
        {label}
      </PopoverTrigger>
      <PopoverContent>{description}</PopoverContent>
    </Popover>
  );
}

export default function LogPage() {
  const router = useRouter();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  const [activeTab, setActiveTab] = useState<ActiveTab>("log");
  const [workoutType, setWorkoutType] = useState<WorkoutType>("strength");
  const [exercises, setExercises] = useState<ExerciseRow[]>([createExerciseRow()]);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isProgressLoading, setIsProgressLoading] = useState(false);
  const [progressWorkouts, setProgressWorkouts] = useState<StoredWorkout[]>([]);
  const [guestProgressWorkouts, setGuestProgressWorkouts] = useState<StoredWorkout[]>(() =>
    getStoredWorkouts(),
  );
  const [progressRefreshKey, setProgressRefreshKey] = useState(0);
  const [showSignupPrompt, setShowSignupPrompt] = useState(false);
  const displayedProgressWorkouts = isAuthenticated ? progressWorkouts : guestProgressWorkouts;

  const showToast = useCallback((kind: "success" | "error", message: string) => {
    setToast({ kind, message });
    window.setTimeout(() => setToast(null), 3200);
  }, []);

  useEffect(() => {
    let active = true;

    let supabase;
    try {
      supabase = createClient();
    } catch {
      return;
    }

    void supabase.auth.getSession().then(({ data }) => {
      if (!active) {
        return;
      }
      const token = data.session?.access_token ?? null;
      setAccessToken(token);
      setIsAuthenticated(Boolean(token));
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) {
        return;
      }
      const token = session?.access_token ?? null;
      setAccessToken(token);
      setIsAuthenticated(Boolean(token));
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (activeTab !== "progress" || !isAuthenticated) {
      return;
    }

    let cancelled = false;

    const loadProgress = async () => {
      const localWorkouts = getStoredWorkouts();
      setProgressWorkouts(localWorkouts);
      setIsProgressLoading(true);

      let supabase;
      try {
        supabase = createClient();
      } catch {
        if (!cancelled) {
          setIsProgressLoading(false);
        }
        return;
      }

      const fourteenDaysAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
      const { data, error } = await supabase
        .from("workout_logs")
        .select("id, workout_type, exercises, notes, log_date, created_at")
        .gte("log_date", fourteenDaysAgo)
        .order("log_date", { ascending: false });

      if (cancelled) {
        return;
      }

      if (error) {
        setIsProgressLoading(false);
        showToast("error", "Unable to load workout history.");
        return;
      }

      const remoteWorkouts = (data ?? []).map((workout) => {
        const row = workout as WorkoutLogRow;
        return {
          id: row.id,
          workout_type: row.workout_type,
          exercises: normalizeStoredExercises(row.exercises),
          notes: row.notes ?? undefined,
          log_date: row.log_date,
          submitted_at: row.created_at,
          synced: true,
        } satisfies StoredWorkout;
      });

      setProgressWorkouts(mergeWorkouts(localWorkouts, remoteWorkouts));
      setIsProgressLoading(false);
    };

    void loadProgress().catch(() => {
      if (!cancelled) {
        setIsProgressLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [activeTab, isAuthenticated, progressRefreshKey, showToast]);

  async function handleSignOut() {
    let supabase;
    try {
      supabase = createClient();
    } catch {
      showToast("error", "Supabase environment variables are missing.");
      return;
    }

    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    setIsSigningOut(true);
    await supabase.auth.signOut();
    setIsSigningOut(false);
    setAccessToken(null);
    setIsAuthenticated(false);
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

  function resetForm() {
    setExercises([createExerciseRow()]);
    setNotes("");
  }

  async function handleSubmitWorkout() {
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

    const trimmedNotes = notes.trim() || undefined;
    const logDate = new Date().toLocaleDateString("en-CA");
    const normalizedExercises = sanitizedExercises.map((exercise) => ({
      name: exercise.name,
      sets: Array.from({ length: exercise.sets }, () => ({
        weight: exercise.weight,
        reps: exercise.reps,
      })),
    }));

    const workoutForStorage: StoredWorkout = {
      id: createWorkoutId(),
      workout_type: workoutType,
      exercises: normalizedExercises,
      notes: trimmedNotes,
      log_date: logDate,
      submitted_at: new Date().toISOString(),
      synced: isAuthenticated,
    };

    if (!isAuthenticated) {
      saveWorkout({ ...workoutForStorage, synced: false });
      setGuestProgressWorkouts(getStoredWorkouts());
      resetForm();
      setShowSignupPrompt(true);
      setProgressRefreshKey((current) => current + 1);
      showToast("success", "Workout logged!");
      return;
    }

    if (!supabaseUrl) {
      showToast("error", "Supabase URL is not configured.");
      return;
    }

    if (!accessToken) {
      showToast("error", "Your session has expired. Please sign in again.");
      return;
    }

    setIsSubmitting(true);

    const response = await fetch(`${supabaseUrl}/functions/v1/submit-workout-log-pwa`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        workout_type: workoutType,
        exercises: normalizedExercises.map((exercise) => ({
          name: exercise.name,
          sets: exercise.sets,
        })),
        notes: trimmedNotes,
        log_date: logDate,
      }),
    });

    const payload = (await response.json().catch(() => null)) as { error?: string; message?: string } | null;
    setIsSubmitting(false);

    if (!response.ok) {
      showToast("error", payload?.error ?? payload?.message ?? "Unable to submit workout.");
      return;
    }

    saveWorkout({ ...workoutForStorage, synced: true });
    resetForm();
    setShowSignupPrompt(false);
    setProgressRefreshKey((current) => current + 1);
    showToast("success", "Workout logged!");
  }

  return (
    <AppShell
      title="Workout Logger"
      description="Track your workout and submit it to Isofit."
      actions={
        <div className="flex w-full flex-wrap justify-end gap-2 sm:w-auto">
          <Link
            href="/billing"
            className="inline-flex h-10 items-center justify-center rounded-xl border border-[#2a2420]/15 bg-white px-4 text-sm font-semibold transition-colors hover:bg-[#f8f5ee]"
          >
            Billing
          </Link>
          {isAuthenticated ? (
            <button
              type="button"
              disabled={isSigningOut}
              onClick={() => void handleSignOut()}
              className="h-10 rounded-xl bg-[#2a2420] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#3b342f] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSigningOut ? "Signing out..." : "Sign out"}
            </button>
          ) : null}
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

      <section className="inline-flex rounded-2xl border border-[#2a2420]/10 bg-white p-1 shadow-[0_10px_20px_rgba(42,36,32,0.06)]">
        <button
          type="button"
          onClick={() => setActiveTab("log")}
          className={`h-10 rounded-xl px-4 text-sm font-semibold transition-colors ${
            activeTab === "log" ? "bg-[#2a2420] text-white" : "text-[#4a423b] hover:bg-[#f8f5ee]"
          }`}
        >
          Log
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("progress")}
          className={`h-10 rounded-xl px-4 text-sm font-semibold transition-colors ${
            activeTab === "progress" ? "bg-[#2a2420] text-white" : "text-[#4a423b] hover:bg-[#f8f5ee]"
          }`}
        >
          Progress
        </button>
      </section>

      {activeTab === "log" ? (
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

          {showSignupPrompt && !isAuthenticated ? (
            <div className="space-y-3 rounded-2xl border border-[#2a2420]/10 bg-[#f8f5ee] px-4 py-3">
              <p className="text-sm text-[#4a423b]">
                Create an account to unlock{" "}
                <SignupTermPopover
                  label="Atlas mfc"
                  description="Atlas is Isofit's machine fitness coach. Ask it anything about your training - programming, form, recovery, etc."
                />{" "}
                and{" "}
                <SignupTermPopover
                  label="$ISO"
                  description="$ISO is Isofit's in-app currency. Earn it by consistently showing up for your fitness journey and spend it on rewards, mfc features, and more."
                />{" "}
                ecosystem.
              </p>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/signup"
                  className="inline-flex h-10 items-center justify-center rounded-xl bg-[#2a2420] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#3b342f]"
                >
                  Sign up
                </Link>
                <Link
                  href="/login"
                  className="inline-flex h-10 items-center justify-center rounded-xl border border-[#2a2420]/15 bg-white px-4 text-sm font-semibold transition-colors hover:bg-[#f3efe6]"
                >
                  Log in
                </Link>
              </div>
            </div>
          ) : null}
        </section>
      ) : (
        <section className="space-y-3 rounded-3xl border border-[#2a2420]/10 bg-white p-4 shadow-[0_14px_30px_rgba(42,36,32,0.07)] sm:p-5">
          {isAuthenticated && isProgressLoading ? (
            <p className="text-sm text-[#4a423b]">Loading workout history...</p>
          ) : null}

          {!isProgressLoading && displayedProgressWorkouts.length === 0 ? (
            <p className="text-sm text-[#4a423b]">
              No workouts logged yet. Start logging to see your history here.
            </p>
          ) : (
            <div className="space-y-3">
              {displayedProgressWorkouts.map((workout) => {
                const exerciseNames = workout.exercises.map((exercise) => exercise.name).join(", ");

                return (
                  <article
                    key={`${workout.id}-${workout.submitted_at}`}
                    className="space-y-2 rounded-2xl border border-[#2a2420]/10 bg-[#f8f5ee] p-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-xs font-medium uppercase tracking-[0.08em] text-[#7a7066]">
                        {formatLogDate(workout.log_date)}
                      </p>
                      <span className="rounded-full border border-[#2a2420]/15 bg-white px-2.5 py-1 text-xs font-semibold capitalize text-[#4a423b]">
                        {workout.workout_type}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-[#2a2420]">
                      {workout.exercises.length} {workout.exercises.length === 1 ? "exercise" : "exercises"}
                    </p>
                    <p className="text-sm text-[#4a423b]">
                      {exerciseNames || "No exercise names provided"}
                    </p>
                    {workout.notes ? <p className="text-sm text-[#4a423b]">{workout.notes}</p> : null}
                  </article>
                );
              })}
            </div>
          )}
        </section>
      )}
    </AppShell>
  );
}
