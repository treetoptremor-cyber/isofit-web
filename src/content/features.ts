import { ACTIVITY_SCOPE, LIMITS } from "@/content/facts";
import type { PageDoc } from "@/content/types";

export const FEATURES_DOC: PageDoc = {
  path: "/features",
  name: "Features",
  metaTitle: "Isofit features: logging, body graph, Atlas AI coach, Bonfire",
  metaDescription:
    "Everything Isofit does: workout logging by tap, text or voice, a muscle-by-muscle body graph, the Atlas AI coach, the Bonfire community, Apple Health import and data export.",
  h1: "Everything Isofit does, in one place.",
  lede:
    "Isofit has four parts, one per tab: a workout logger you can tap, type or talk to; a body graph that shows which muscles your logged sets reached; Atlas, an AI coach that can read your training history; and Bonfire, a members-only community feed. Around them sit Apple Health import, streaks, routines, data export and account deletion.",
  sections: [
    {
      id: "the-four-tabs",
      label: "The app",
      heading: "The four main features",
      table: {
        head: ["Feature", "What it does", "Tier"],
        rows: [
          ["Workout logging", "Record any session by tapping in sets, typing a Quicklog line or speaking. Routines, timers, history, offline queue.", "Free"],
          ["Body graph", "Front and back figure shaded by working sets per muscle over 7, 30 or 90 days or all time.", "Pro (locked preview on Free)"],
          ["Atlas AI coach", "Chat-based coaching that can read your log, review sessions and write programs.", `Free: ${LIMITS.freeAtlasMessages}. Pro: higher limits and programs`],
          ["Bonfire community", "Members-only feed of posts tied to logged sessions, with kudos and comments.", "Free to read and react. Pro to post"],
        ],
      },
    },
    {
      id: "everything-else",
      label: "Also included",
      heading: "What else ships in the app",
      specs: [
        { term: "Exercise library", value: `485 exercises across ${ACTIVITY_SCOPE}. Create a custom exercise for anything missing and Isofit maps it to muscles.` },
        { term: "Apple Health import", value: "Optional and free. Imports workouts, and shows daily steps, exercise minutes, sleep, resting heart rate and distance. Read-only: Isofit never writes to Apple Health." },
        { term: "Routines", value: "Save a finished session as a routine, favorite it, and load it onto the board next time. Programs Atlas writes land in the same list." },
        { term: "History", value: "Every past session, open on every tier. Edit old sets, delete a session, or backdate one you forgot to log." },
        { term: "Streaks", value: "A day streak on the Log tab, judged by your own local date, with one automatic streak freeze a month." },
        { term: "$ISO", value: "In-app points earned by logging and spent on small actions such as Bonfire kudos, comments and voice logs. $ISO has no cash value and is not money." },
        { term: "Weekly SITREP", value: "On Pro, Atlas writes a Monday review of your training week that you can open and discuss." },
        { term: "Appearance", value: "Light, dark or match the system." },
        { term: "Sign-in", value: "Sign in with Apple, Google, or email and password." },
        { term: "Your data", value: "On-demand JSON export and in-app account deletion with a seven-day grace period." },
      ],
    },
    {
      id: "not-included",
      label: "Not included",
      heading: "What Isofit does not have",
      body: ["Knowing what an app lacks is as useful as knowing what it has. As of this page's review date, Isofit has:"],
      bullets: [
        "No Android, iPad, Apple Watch or web app.",
        "No writing to Apple Health.",
        "No home-screen widgets.",
        "No personal-record tracking.",
        "No video posts in Bonfire, and no follows, groups or direct messages.",
        "No meal, calorie or macro tracking.",
        "No recovery or readiness score.",
      ],
    },
  ],
  related: ["/features/workout-logging", "/features/body-graph", "/features/atlas", "/features/bonfire", "/pricing", "/compare"],
};

export const LOGGING_DOC: PageDoc = {
  path: "/features/workout-logging",
  name: "Workout logging",
  metaTitle: "Workout logging by tap, text or voice | Isofit",
  metaDescription:
    "Log workouts in Isofit three ways: tap in sets, reps and weight, type a Quicklog line like \"bench 5x5 225lbs\", or speak the session. Free on iPhone, works offline.",
  h1: "Log a workout by tapping, typing or talking.",
  lede:
    "Isofit's logger accepts a workout three ways and stores it one way. Tap in sets, reps, weight, distance, time and RPE. Type a Quicklog line such as \"bench 5x5 225lbs\" and get a finished row. Or hold the microphone, describe the session, and review the draft before it saves. All three produce the same structured log, and logging is free.",
  sections: [
    {
      id: "three-ways",
      label: "Input",
      heading: "Three ways to get a workout in",
      table: {
        head: ["Method", "How it works", "Good for"],
        rows: [
          ["Tap", "Add an exercise from the library, then set sets, reps, weight, distance, time and RPE on its row.", "Logging set by set during a session."],
          ["Quicklog (typed)", "Type a line like \"bench 5x5 225lbs\". Separate exercises with commas. Parsed on your phone, no network needed.", "Getting a whole session down in seconds."],
          ["Voice", "Hold the microphone for up to 90 seconds and describe what you did. Isofit drafts the rows for you to review.", "Logging with chalk on your hands, or after the fact."],
        ],
      },
    },
    {
      id: "quicklog",
      label: "Quicklog",
      heading: "What Quicklog understands",
      body: [
        "Quicklog reads the numbers out of a plain sentence and leaves the rest as the exercise name. It runs entirely on the phone, so it is instant and works with no signal.",
      ],
      specs: [
        { term: "Sets and reps", value: "\"5x5\", \"3x12\"" },
        { term: "Weight", value: "\"225lbs\", \"100kg\"" },
        { term: "Distance", value: "\"3mi\", \"5k\", \"400m\"" },
        { term: "Duration", value: "\"25:00\", \"30min\", \"1hr\"" },
        { term: "Effort", value: "\"rpe 8\"" },
        { term: "Several exercises", value: "Separate with commas, up to 20 in one line." },
      ],
    },
    {
      id: "voice",
      label: "Voice",
      heading: "How voice logging works",
      body: [
        "Hold the microphone button and talk. Speech is transcribed on your iPhone where the device supports it. The transcript is then sent to Isofit's server, where an AI model (OpenAI) turns it into exercise rows. If on-device transcription is not confident, the audio is sent for server transcription instead.",
        "Voice never writes to your log on its own. The parsed rows appear in the logger as a draft for you to check, fix and save. Voice logging is available on every tier. Each voice log costs 0.05 $ISO, the in-app points you earn by logging, refunded if the log fails.",
        "Units are kept as spoken. Say \"squat 100 kilos\" and the row records 100 kg even if your account is set to pounds. Isofit never converts a spoken weight.",
      ],
    },
    {
      id: "what-you-can-record",
      label: "Metrics",
      heading: "What you can record for each set",
      specs: [
        { term: "Strength", value: "Sets, reps and weight in pounds or kilograms. Bodyweight sets count with no weight entered." },
        { term: "Cardio and conditioning", value: "Distance in miles, kilometers or meters, and duration." },
        { term: "Effort", value: "RPE, the rating of perceived exertion, per exercise." },
        { term: "Timing", value: "A set timer and a rest timer on every row, which add up to the session duration." },
        { term: "Warm-ups", value: "Sets can be marked as warm-ups so they stay out of your working-set counts." },
        { term: "Notes", value: "A note on any exercise." },
      ],
    },
    {
      id: "library",
      label: "Exercises",
      heading: "A library for more than lifting",
      body: [
        `The built-in library has 485 exercises covering ${ACTIVITY_SCOPE}. You are not limited to it: type a name that is not there and Isofit offers to create it as a custom exercise, then maps it to the muscles it trains so it counts on your body graph.`,
      ],
    },
    {
      id: "routines-history-offline",
      label: "Day to day",
      heading: "Routines, history and offline use",
      bullets: [
        "Save any finished session as a routine, favorite it, and load it next time. There is no cap on routines.",
        "History lists every session on every tier. Edit old sets, delete a session, or backdate a workout you forgot.",
        "Finish a session with no signal and it is queued on the phone, then synced when you reconnect. Each session carries its own ID, so a retry can never log it twice.",
        "Units follow your account setting and can be switched per row.",
      ],
      specs: [
        { term: "Offline", value: "The session is queued on the phone, with its date fixed to the day it happened." },
        { term: "Synced", value: "The queue has drained and the server holds the session." },
        { term: "Needs attention", value: "Something did not replay. The Log tab says so instead of failing quietly." },
      ],
    },
  ],
  faqs: [
    {
      question: "Can I log a workout by typing a sentence?",
      answer: [
        "Yes. Quicklog takes a line such as \"bench 5x5 225lbs, run 5k 25:00 rpe 7\" and turns it into structured rows. It reads sets and reps, weight, distance, duration and RPE, and treats the remaining words as the exercise name.",
      ],
    },
    {
      question: "Can I log a workout with my voice?",
      answer: [
        "Yes. Hold the microphone button, describe the session for up to 90 seconds, and Isofit drafts the rows. You review the draft before it is saved. Each voice log costs 0.05 $ISO.",
      ],
    },
    {
      question: "Does workout logging work offline?",
      answer: [
        "Tap logging and Quicklog work offline, and finished sessions are queued on the phone until you reconnect. Voice logging needs a connection because the transcript is parsed on the server.",
      ],
    },
    {
      question: "Is workout logging free in Isofit?",
      answer: ["Yes. Logging, Quicklog, routines, history and Apple Health import are on the Free tier, with no cap on workouts or routines."],
    },
    {
      question: "Does Isofit track personal records?",
      answer: ["No. Isofit does not have personal-record tracking. History shows every past session and the sets in it."],
    },
    {
      question: "Can I log running, yoga or martial arts, or only lifting?",
      answer: [`You can log all of them. The library covers ${ACTIVITY_SCOPE}, and rows adapt to the activity: distance and time for a run, duration for a hold or a class.`],
    },
  ],
  related: ["/features/body-graph", "/features/atlas", "/pricing", "/compare"],
};

export const BODY_GRAPH_DOC: PageDoc = {
  path: "/features/body-graph",
  name: "Body graph",
  metaTitle: "Body graph: a muscle heat map of your training | Isofit",
  metaDescription:
    "Isofit's body graph shades a front and back figure by the working sets you logged for each muscle over 7, 30 or 90 days or all time, so you can see what you train and what you skip.",
  h1: "See which muscles your training reaches, and which it misses.",
  lede:
    "The body graph is Isofit's muscle heat map. It shades a front and back figure by the number of working sets you logged for each muscle, over the last 7, 30 or 90 days or your whole history. Muscles you train most read warmest and neglected ones stay pale. It counts the work you logged. It is not a recovery or soreness score. The full body graph is a Pro feature.",
  sections: [
    {
      id: "how-it-works",
      label: "Method",
      heading: "How the body graph is calculated",
      body: [
        "The unit is the working set. Each working set you log gives full credit to the exercise's primary muscles and partial credit to its secondary muscles. Warm-up sets are left out. Bodyweight sets count. The graph measures sets, not tonnage, so a heavy single and a light set of twenty each count once.",
        "Totals are taken over a fixed window with no decay, then scaled so the warmest color always marks your most-worked muscle in that window. The in-app note says it directly: resistance volume uses recorded working sets and primary and secondary muscle weights, and this is not a recovery score.",
      ],
    },
    {
      id: "what-you-see",
      label: "On screen",
      heading: "What the body graph shows",
      specs: [
        { term: "Figure", value: "Front and back views with each muscle region shaded from rest to most worked." },
        { term: "Time windows", value: "7 days, 30 days, 90 days, or all time." },
        { term: "Sets by muscle", value: "A ranked list of muscles with the working sets credited to each." },
        { term: "Stat cards", value: "Total sets, most worked muscle and least worked muscle for the window." },
        { term: "Muscle detail", value: "Tap a muscle on the figure to open its detail panel." },
        { term: "History", value: "The second mode of the Progress tab: every past session, open on every tier." },
      ],
    },
    {
      id: "gaps",
      label: "Reading it",
      heading: "Two kinds of gap, and a question for Atlas",
      body: [
        "A muscle you have not trained at all is a different problem from one you have trained less than usual, so Isofit labels them separately. Tap a muscle and its detail panel says \"Not trained in this window\" if it has no credited sets, or \"Below your usual volume\" if it has fallen behind your own typical training frequency. The comparison is with your own history, not with someone else's template.",
        "The same panel hands the number to Atlas. It drafts a question for you along the lines of \"My chest got 12 weighted sets over the last 30 days. Is that enough, and what would you change?\", so the coach starts from the figure you are looking at.",
        "When a window holds very little training, the whole figure is drawn dimmer. One logged set will not paint a muscle as fully worked; the scale opens to its full range at roughly two solid sessions' worth of sets.",
      ],
    },
    {
      id: "muscles",
      label: "Taxonomy",
      heading: "The muscles Isofit tracks",
      body: [
        "Exercises are mapped to 25 muscle groups: chest, upper chest, lower chest, front delts, side delts, rear delts, biceps, brachialis, triceps, long head of the triceps, forearms, lats, upper back, traps, lower back, core, obliques, glutes, hip flexors, adductors, quadriceps, hamstrings, calves, soleus and ankles.",
        "Closely related groups are merged for display. Brachialis counts toward biceps, the long head toward triceps, soleus toward calves, and upper and lower chest toward chest. Hip flexors and adductors are tracked in the list but are not drawn on the figure.",
      ],
    },
    {
      id: "free-vs-pro",
      label: "Tiers",
      heading: "Body graph on Free and Pro",
      table: {
        head: ["", "Free", "Pro"],
        rows: [
          ["Body figure", "Visible under a locked veil", "Full color"],
          ["Tap a muscle for detail", "No", "Yes"],
          ["Sets by muscle, total, most and least worked", "No", "Yes"],
          ["Session history", "Yes", "Yes"],
        ],
      },
    },
  ],
  faqs: [
    {
      question: "What is a body graph in a workout app?",
      answer: [
        "A body graph, also called a muscle heat map, is a drawing of the body colored by how much you trained each muscle. In Isofit the color comes from the number of working sets you logged for that muscle in the chosen time window.",
      ],
    },
    {
      question: "Does the Isofit body graph show muscle recovery?",
      answer: [
        "No. It shows logged work, not recovery, readiness or soreness. A muscle is warm because you logged many working sets for it in the window, not because Isofit thinks it is fatigued.",
      ],
    },
    {
      question: "How do I find out which muscles I am neglecting?",
      answer: [
        "Open the body graph, choose the 30 or 90 day window, and look for pale regions. The least-worked stat card names the muscle with the fewest credited sets, and the sets-by-muscle list ranks the rest.",
      ],
    },
    {
      question: "Is the body graph free?",
      answer: ["Free members see a locked preview of the figure. The colored graph, muscle detail and stat cards are part of Pro. Session history is free."],
    },
    {
      question: "Do custom exercises count on the body graph?",
      answer: ["Yes. When you create a custom exercise, Isofit maps it to primary and secondary muscles so its sets are credited like any library exercise."],
    },
  ],
  related: ["/features/workout-logging", "/features/atlas", "/pricing", "/compare"],
};

export const ATLAS_DOC: PageDoc = {
  path: "/features/atlas",
  name: "Atlas AI coach",
  metaTitle: "Atlas: an AI workout coach that reads your training log | Isofit",
  metaDescription:
    "Atlas is the AI coach inside Isofit. With your permission it reads your workout history to review sessions, answer training questions and write programs. General fitness guidance, not medical advice.",
  h1: "Atlas is an AI coach that can read your training log.",
  lede:
    "Atlas is the chat-based AI coach built into Isofit. Ask it to review a session, explain a plateau or plan a training week. If you turn personalization on, Atlas reads your logged workouts, so its answers are about your training and not a generic template. On Pro it can write a program and save it into your routines. Atlas gives general fitness guidance and is not a source of medical advice.",
  sections: [
    {
      id: "what-atlas-does",
      label: "Uses",
      heading: "What you can ask Atlas",
      bullets: [
        "Review the workout you just logged and suggest what to change next time.",
        "Start from the body graph: tap a muscle and Isofit drafts the question for you, such as whether the sets that muscle got in the window are enough.",
        "Explain training concepts: volume, intensity, RPE, progression, exercise order.",
        "Plan a week or a block around your schedule and the equipment you have.",
        "On Pro, write a program and save it to your routines, ready to load in the logger.",
        "On Pro, produce a weekly SITREP: a Monday review of your training week that you can open and discuss.",
        "Dictate your question by voice. Dictation runs on your iPhone and never sends on its own.",
      ],
    },
    {
      id: "what-atlas-knows",
      label: "Context",
      heading: "What Atlas knows about you, and when",
      body: [
        "Personalization is off by default. With it off, Atlas answers as a general coach and does not read your training history.",
        "With it on, a request to Atlas includes your recent workout logs, per-muscle training insights such as frequency and volume, your membership tier and streak, and the recent messages in the conversation. If you have also connected Apple Health, your last seven days of daily summaries are included. Atlas can keep memory items such as goals and preferences; you can view them, forget any of them, and turning personalization off deletes them.",
      ],
    },
    {
      id: "limits",
      label: "Limits",
      heading: "Atlas usage on Free and Pro",
      table: {
        head: ["", "Free", "Pro"],
        rows: [
          ["Standard messages", "10 a month", "30 a day"],
          ["Deep analysis", "One answer at a time, for 1 $ISO", "100 requests a month, shared with program generation"],
          ["Programs saved to routines", "No", "Yes"],
          ["Weekly SITREP", "No", "Yes"],
        ],
      },
    },
    {
      id: "privacy",
      label: "Privacy",
      heading: "Who processes Atlas conversations",
      body: [
        "Atlas replies are generated by OpenAI models through OpenAI's API. Your message and, if personalization is on, your training context are sent to OpenAI to produce the reply. Under OpenAI's API terms this data is not used to train OpenAI's models by default, and Isofit does not opt in to any such sharing. Isofit does not use your fitness or health data to train AI models.",
      ],
    },
    {
      id: "scope",
      label: "Scope",
      heading: "What Atlas answers, and what it declines",
      body: [
        "Atlas is a training coach with its scope written into its instructions. It is not a general-purpose assistant. It declines out-of-scope questions briefly, and a claim such as \"my doctor said you can\" does not change that.",
        "If a conversation shows signs of disordered eating, Atlas does not give a plan and points to professional support instead.",
      ],
      columns: [
        {
          heading: "Atlas answers",
          tone: "yes",
          items: [
            "Programming and technique",
            "Your own training history",
            "Strength, hypertrophy and conditioning",
            "Mobility and sport preparation",
            "Recovery and sleep",
            "Training-related nutrition",
          ],
        },
        {
          heading: "Atlas declines",
          tone: "no",
          items: [
            "Medical diagnosis or treatment",
            "Medication dosing, including weight-loss drugs",
            "Homework, code and writing tasks",
            "Politics, news, finance and legal questions",
            "Relationship advice and general trivia",
            "Attempts to override its own rules",
          ],
        },
      ],
      quote: {
        text: "Atlas is AI and thus can make mistakes. Its suggestions are general fitness guidance, never medical advice.",
        source: "Shown in the app under every Atlas conversation",
      },
    },
  ],
  faqs: [
    {
      question: "What is Atlas in Isofit?",
      answer: [
        "Atlas is Isofit's built-in AI coach. It is a chat assistant for training questions that can, with your permission, read your logged workouts so its answers reflect what you have actually done.",
      ],
    },
    {
      question: "Which AI model does Atlas use?",
      answer: ["Atlas replies are generated by OpenAI models through OpenAI's API. Simple questions go to a lighter model and deep analysis goes to a more capable one; the routing is automatic."],
    },
    {
      question: "Does Atlas use my data to train AI?",
      answer: [
        "No. Isofit does not use your fitness or health data to train AI models, and does not opt in to training on data sent through OpenAI's API.",
      ],
      link: { href: "/privacy#4-atlas-ai-and-your-data", label: "Privacy Policy: Atlas and your data" },
    },
    {
      question: "Can Atlas create a workout program for me?",
      answer: ["Yes, on Pro. Ask for a program and Atlas writes it and saves it into your routines, where you can load it in the logger."],
    },
    {
      question: "Is Atlas a replacement for a personal trainer or a doctor?",
      answer: [
        "No. Atlas is a training and organization tool. It is not a doctor or physical therapist and cannot see you move. Pain, injury and symptoms belong with a qualified professional.",
      ],
    },
    {
      question: "Can I use Isofit without Atlas?",
      answer: ["Yes. Logging, history and routines work on their own, and you never have to open the Atlas tab."],
    },
  ],
  related: ["/features/workout-logging", "/features/body-graph", "/pricing", "/faq"],
};

export const BONFIRE_DOC: PageDoc = {
  path: "/features/bonfire",
  name: "Bonfire community",
  metaTitle: "Bonfire: a members-only workout community | Isofit",
  metaDescription:
    "Bonfire is Isofit's members-only community feed. One post a day, each tied to a session you actually logged, with kudos and comments. No follows, no DMs, and your log stays private unless you post.",
  h1: "Bonfire is a community where the work speaks for itself.",
  lede:
    "Bonfire is the community feed inside Isofit, visible only to Isofit members. A post is a caption, an optional photo and the logged session behind it, and you can make one a day. Others can give kudos and comment. There are no follows, groups or direct messages. Your workout log is private, and nothing appears in Bonfire unless you choose to post that session.",
  sections: [
    {
      id: "how-it-works",
      label: "Mechanics",
      heading: "How Bonfire works",
      specs: [
        { term: "Feeds", value: "Home, the member feed, and Embers, the highlights." },
        { term: "Posts", value: "A caption, an optional photo, one category and the session you logged. One post a day. Video is not supported." },
        { term: "Reactions", value: "Kudos is the only reaction. Comments are a single flat thread." },
        { term: "Search", value: "Find members by handle and posts by tag." },
        { term: "Who can do what", value: "Every member can read, give kudos, comment and report. Posting is part of Pro." },
        { term: "$ISO", value: "A kudos costs 0.50 $ISO and a comment costs 0.25 $ISO, shown before you tap, and the post's author collects them. $ISO is in-app points earned by logging and has no cash value." },
      ],
    },
    {
      id: "privacy",
      label: "Privacy",
      heading: "What is public and what is private",
      body: [
        "Your workout log, body graph and Atlas conversations are private to you. Sharing is a deliberate action on a single session, never automatic.",
        "A Bonfire post is public to every Isofit member. There is no private or friends-only post, so treat anything you post as visible to the whole community. Bonfire is not visible to people outside Isofit.",
      ],
    },
    {
      id: "safety",
      label: "Safety",
      heading: "Moderation and safety tools",
      bullets: [
        "Report any post, comment or avatar.",
        "Block a member so neither of you sees the other, or mute them so you stop seeing their posts. Blocked accounts are listed in the You tab.",
        "Posts and avatars are screened automatically before they are published, and content that draws repeated reports is hidden pending review.",
        "Isofit is for adults aged 18 and over.",
      ],
    },
  ],
  faqs: [
    {
      question: "What is the Bonfire in Isofit?",
      answer: ["Bonfire is Isofit's members-only community feed, where a post is tied to a workout the member actually logged. It has kudos and comments, and no follows, groups or direct messages."],
    },
    {
      question: "Are my workouts shared automatically?",
      answer: ["No. Your log is private. A session only appears in Bonfire if you choose to post it."],
    },
    {
      question: "Who can see my Bonfire posts?",
      answer: ["Every Isofit member. Posts are not visible outside the app, and there is no private-post option."],
    },
    {
      question: "Do I have to use Bonfire?",
      answer: ["No. Bonfire is optional and the rest of Isofit works without it."],
    },
    {
      question: "Can I post videos to Bonfire?",
      answer: ["No. Posts support a caption and an optional photo. Video is not available."],
    },
  ],
  related: ["/features/workout-logging", "/pricing", "/faq"],
};
