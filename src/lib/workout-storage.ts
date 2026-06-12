export interface StoredExercise {
  name: string;
  sets: Array<{ weight?: number; reps?: number }>;
}

export interface StoredWorkout {
  id: string;
  workout_type: "strength" | "cardio" | "mobility" | "mixed";
  exercises: StoredExercise[];
  notes?: string;
  log_date: string;
  submitted_at: string;
  synced: boolean;
}

const STORAGE_KEY = "isofit_workouts";
const MAX_AGE_DAYS = 14;
const DAY_IN_MS = 24 * 60 * 60 * 1000;

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function parseWorkouts(raw: string | null): StoredWorkout[] {
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((item): item is StoredWorkout => {
      if (!item || typeof item !== "object") {
        return false;
      }

      const workout = item as Partial<StoredWorkout>;
      return (
        typeof workout.id === "string"
        && typeof workout.workout_type === "string"
        && Array.isArray(workout.exercises)
        && typeof workout.log_date === "string"
        && typeof workout.submitted_at === "string"
        && typeof workout.synced === "boolean"
      );
    });
  } catch {
    return [];
  }
}

function isWithinAgeLimit(workout: StoredWorkout, nowMs: number) {
  const logDateMs = new Date(`${workout.log_date}T00:00:00`).getTime();
  if (!Number.isFinite(logDateMs)) {
    return false;
  }

  return nowMs - logDateMs <= MAX_AGE_DAYS * DAY_IN_MS;
}

function sortNewestFirst(workouts: StoredWorkout[]) {
  return [...workouts].sort((a, b) => {
    const logDateDiff = new Date(b.log_date).getTime() - new Date(a.log_date).getTime();
    if (logDateDiff !== 0) {
      return logDateDiff;
    }

    return new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime();
  });
}

function loadAndPruneWorkouts() {
  if (!canUseStorage()) {
    return [];
  }

  const nowMs = Date.now();
  const current = parseWorkouts(window.localStorage.getItem(STORAGE_KEY));
  const pruned = sortNewestFirst(current.filter((workout) => isWithinAgeLimit(workout, nowMs)));

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(pruned));
  return pruned;
}

export function getStoredWorkouts(): StoredWorkout[] {
  return loadAndPruneWorkouts();
}

export function saveWorkout(workout: StoredWorkout): void {
  if (!canUseStorage()) {
    return;
  }

  const next = sortNewestFirst([...loadAndPruneWorkouts(), workout]);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export function markWorkoutSynced(id: string): void {
  if (!canUseStorage()) {
    return;
  }

  const next = loadAndPruneWorkouts().map((workout) =>
    workout.id === id ? { ...workout, synced: true } : workout,
  );
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export function clearSyncedWorkouts(): void {
  if (!canUseStorage()) {
    return;
  }

  const next = loadAndPruneWorkouts().filter((workout) => !workout.synced);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}
