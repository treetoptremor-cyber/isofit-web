// What other workout apps say about themselves, taken only from their own
// websites, help centers and store listings on the date below. Anything that
// could not be confirmed from a first-party page is written as "Not stated"
// rather than guessed. Re-verify before changing COMPETITORS_REVIEWED.

export const COMPETITORS_REVIEWED = "2026-09-19";
export const COMPETITORS_REVIEWED_LONG = "September 19, 2026";

export type CompetitorRowKey =
  | "platforms"
  | "logging"
  | "library"
  | "muscles"
  | "coaching"
  | "social"
  | "health"
  | "scope"
  | "price"
  | "export";

// The rows the /compare hub shows, in short form.
export const HUB_ROWS = ["logging", "muscles", "coaching", "social", "platforms", "price"] as const;
export type HubRowKey = (typeof HUB_ROWS)[number];

export type Competitor = {
  slug: string;
  name: string;
  maker: string;
  website: string;
  // One neutral sentence on what the app is, in its maker's framing.
  summary: string;
  // Who should honestly pick this app over Isofit.
  chooseThem: string[];
  rows: Record<CompetitorRowKey, string>;
  // Three-to-twelve-word versions of the hub table's rows, from the same
  // sources. The full rows stay on each head-to-head page.
  brief: Record<HubRowKey, string>;
  sources: { label: string; url: string }[];
};

export const COMPETITORS: Competitor[] = [
  {
    slug: "hevy",
    name: "Hevy",
    maker: "Hevy Studios S.L.",
    website: "https://www.hevyapp.com",
    summary:
      "Hevy is a free workout tracker for iOS and Android built around reusable routines, structured set logging and a social feed of friends' workouts.",
    chooseThem: [
      "You train with friends who already use Hevy and want a shared feed and leaderboards.",
      "You need Android, Apple Watch, Wear OS or a web app today.",
      "You want demonstration animations for every library exercise.",
      "You want a low-cost or lifetime plan: Hevy lists Pro at $2.99 a month, $23.99 a year or $74.99 once.",
      "You already use ChatGPT and want to chat about your training there, with your Hevy history connected.",
    ],
    rows: {
      platforms: "iOS, Android, Apple Watch, Wear OS and a web app.",
      logging:
        "Structured sets, reps and weight with warm-up, drop and failure sets, supersets, RPE and rest timers. Routines work as reusable templates. Free-text or voice logging is not advertised.",
      library: "400+ exercises, each with a demonstration animation, plus custom exercises.",
      muscles: "A last-7-days body heat map, set counts per muscle group and a muscle distribution chart.",
      coaching:
        "Hevy Trainer (Pro) generates a program and suggests progressive overload; Hevy says these programs come from an algorithm and do not rely on AI. Separately, a Hevy app inside ChatGPT (tag @hevy in a ChatGPT conversation) reads your Hevy workout history, analyzes it, answers training questions and saves generated plans to your account. It is free to all Hevy users, and the chat happens in ChatGPT, not in the Hevy app (read September 23, 2026).",
      social: "The home tab is a social feed with follows, likes, comments and leaderboards. Profiles can be switched to private.",
      health: "Connects to Apple Health and Health Connect with read and write permission.",
      scope: "Strength first, with cardio and duration exercise types.",
      price:
        "Free tier with unlimited workouts, 4 routines and 7 custom exercises. Pro is listed at $2.99 monthly, $23.99 yearly or $74.99 lifetime (USD).",
      export: "Workout data export from settings, and CSV import from Strong.",
    },
    brief: {
      logging: "Structured sets and routines. Typed or voice logging not advertised.",
      muscles: "Last-7-days heat map and sets per muscle group.",
      coaching: "Algorithmic programs (Pro), plus an AI chat about your Hevy data inside ChatGPT.",
      social: "Feed with follows, comments and leaderboards.",
      platforms: "iOS, Android, Apple Watch, Wear OS and web.",
      price: "Free tier. Pro $2.99 a month, $23.99 a year or $74.99 once.",
    },
    sources: [
      { label: "Hevy pricing", url: "https://hevy.com/pricing" },
      { label: "Hevy help center", url: "https://help.hevyapp.com" },
      { label: "Hevy in ChatGPT (read September 23, 2026)", url: "https://www.hevyapp.com/features/hevy-chatgpt/" },
      { label: "Hevy on the App Store", url: "https://apps.apple.com/us/app/hevy-workout-tracker-gym-log/id1458862350" },
    ],
  },
  {
    slug: "strong",
    name: "Strong",
    maker: "Strong Fitness PTE. LTD.",
    website: "https://www.strong.app",
    summary:
      "Strong is a long-established workout tracker for iPhone, Apple Watch and Android focused on fast, structured logging of sets, reps and weight.",
    chooseThem: [
      "You want a focused lifting log with no AI and no social feed.",
      "You need Android or an Apple Watch app today.",
      "You want your workouts written into Apple Health: Strong writes workouts, bodyweight and body fat to Health.",
      "You want built-in plate and warm-up calculators.",
    ],
    rows: {
      platforms: "iPhone, iPad, Apple Watch and Android.",
      logging: "Structured sets, reps and weight with templates, supersets and RPE. Free-text or voice logging is not advertised.",
      library: "Cardio and strength exercises with a growing set of animated videos, plus custom exercises. No library size is stated.",
      muscles: "A muscle heat map is listed as a feature. What it measures is not stated.",
      coaching: "None advertised.",
      social: "Routines and workouts can be shared by link. No feed or follows are advertised.",
      health: "Writes workouts, bodyweight and body fat to Apple Health, and reads bodyweight and body fat.",
      scope: "Strength focused, with cardio and duration exercise types.",
      price: "Free version limited to 3 custom routines with unlimited workouts. PRO is listed at $4.99 monthly or $29.99 yearly (USD).",
      export: "CSV export on iOS and Android.",
    },
    brief: {
      logging: "Structured sets and templates. Typed or voice logging not advertised.",
      muscles: "A muscle heat map. What it measures is not stated.",
      coaching: "None advertised.",
      social: "Share by link. No feed advertised.",
      platforms: "iPhone, iPad, Apple Watch and Android.",
      price: "Free, 3 custom routines. PRO $4.99 a month or $29.99 a year.",
    },
    sources: [
      { label: "Strong website", url: "https://www.strong.app" },
      { label: "Strong help: Apple Health", url: "https://help.strongapp.io/article/147-sync-with-apple-health" },
      { label: "Strong help: export", url: "https://help.strongapp.io/article/235-export-workout-data" },
      { label: "Strong on the App Store", url: "https://apps.apple.com/us/app/strong-workout-tracker-gym-log/id464254577" },
    ],
  },
  {
    slug: "fitbod",
    name: "Fitbod",
    maker: "Fitbod Inc.",
    website: "https://fitbod.me",
    summary:
      "Fitbod is a workout planner that generates each session for you from your goals, experience, equipment and muscle recovery, then has you log against that plan.",
    chooseThem: [
      "You want the app to decide today's workout for you rather than record what you chose to do.",
      "You want a per-muscle recovery percentage that drives exercise selection.",
      "You need Android, Apple Watch or Wear OS today.",
      "You want exercise demonstration videos.",
    ],
    rows: {
      platforms: "iOS, Android, Apple Watch and Wear OS.",
      logging:
        "The app generates a workout and you log sets, reps and weight against it. Free-text or voice logging is not advertised.",
      library: "Fitbod's own pages give 800+ and 1,000+ exercises, with video demonstrations.",
      muscles: "A post-workout heat map of muscles used, and a 0 to 100% recovery figure per muscle group.",
      coaching:
        "Workouts are generated by a proprietary algorithm that Fitbod describes as using machine learning. No AI chat is advertised.",
      social: "Workouts can be shared by link or as a summary image. No feed is advertised.",
      health: "Reads and writes workouts, heart rate and body measurements with Apple Health and Health Connect.",
      scope: "Strength first. Fitbod describes itself as not a cardio app, with cardio available as an optional block.",
      price: "Listed at $15.99 monthly or $95.99 yearly (USD) after a 7-day trial. No ongoing free tier was found.",
      export: "Not stated.",
    },
    brief: {
      logging: "Logs against a generated workout. Typed or voice logging not advertised.",
      muscles: "Post-workout heat map and a 0 to 100% recovery figure.",
      coaching: "Algorithmic workout generation. No AI chat advertised.",
      social: "Share by link or image. No feed advertised.",
      platforms: "iOS, Android, Apple Watch and Wear OS.",
      price: "$15.99 a month or $95.99 a year after a 7-day trial.",
    },
    sources: [
      { label: "Fitbod website", url: "https://fitbod.me" },
      { label: "Fitbod help: muscle recovery", url: "https://help.fitbod.me/hc/en-us/articles/360006269014" },
      { label: "Fitbod on the App Store", url: "https://apps.apple.com/us/app/fitbod-workout-fitness-plans/id1041517543" },
    ],
  },
  {
    slug: "jefit",
    name: "JEFIT",
    maker: "Jefit Inc.",
    website: "https://www.jefit.com",
    summary:
      "JEFIT is a strength-training planner and tracker with a large exercise database, ready-made routines and an AI-powered adaptive plan on its paid tier.",
    chooseThem: [
      "You want the largest built-in exercise database: JEFIT lists 1,400+ exercises.",
      "You want to pick from a catalog of ready-made routines.",
      "You need Android, Apple Watch or Wear OS today.",
      "You want a weekly-adapting plan built on mesocycles.",
    ],
    rows: {
      platforms: "iOS, Android, Apple Watch, Wear OS and a website.",
      logging:
        "Structured logging with warm-up, working, drop and failure sets, supersets, and an instant workout generated from time, equipment and muscle focus. Free-text or voice logging is not advertised.",
      library: "1,400+ exercises with video instructions and animations, plus custom exercises.",
      muscles: "A muscle map of your training, a muscle recovery chart and weekly sets per muscle.",
      coaching:
        "An Adaptive Plan described as powered by AI, and AI-powered progressive overload suggestions, on the Elite tier. AI chat is not advertised.",
      social: "Follow friends, comment on workouts and share to the JEFIT feed.",
      health: "Not stated on the pages we could load.",
      scope: "Strength-training focused.",
      price: "Free Basic tier. Elite is listed at $12.99 monthly or $69.99 yearly (USD) and removes ads.",
      export: "Not stated.",
    },
    brief: {
      logging: "Structured sets and instant workouts. Typed or voice logging not advertised.",
      muscles: "Muscle map, recovery chart and weekly sets per muscle.",
      coaching: "AI-powered Adaptive Plan (Elite). AI chat not advertised.",
      social: "Follows, comments and the JEFIT feed.",
      platforms: "iOS, Android, Apple Watch, Wear OS and a website.",
      price: "Free Basic. Elite $12.99 a month or $69.99 a year.",
    },
    sources: [
      { label: "JEFIT Elite pricing", url: "https://www.jefit.com/elite" },
      { label: "JEFIT website", url: "https://www.jefit.com" },
      { label: "JEFIT on the App Store", url: "https://apps.apple.com/us/app/jefit-workout-plan-gym-tracker/id449810000" },
    ],
  },
];

export const COMPETITOR_ROW_LABELS: Record<CompetitorRowKey, string> = {
  platforms: "Platforms",
  logging: "How you log",
  library: "Exercise library",
  muscles: "Muscle view",
  coaching: "AI and coaching",
  social: "Community",
  health: "Apple Health",
  scope: "Activities covered",
  price: "Price",
  export: "Data export",
};
