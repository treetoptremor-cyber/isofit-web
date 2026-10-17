# Isofit public-site redesign: Phase 0 baseline and Phase 1 visual system

Status: **Gate 1 review.** No production code has changed. Everything here is documentation, baseline data, tooling and static mockups.

## Phase 0: baseline (Gate 0)

Next.js 16 docs under `node_modules/next/dist/docs/` were read (fonts, CSS, project structure) before any work. `next build` passes on the untouched branch.

**Baseline source.** Captured from a production build of branch commit `f93979b`, whose only difference from `main` (`0cfd7cf`) is this `docs/redesign` folder. Regenerate against `main` if the base moves.

**Routes inventoried (33 rendered pages, 32 machine outputs).** All 14 `PageDoc` routes plus `/terms`, `/privacy`, `/health-privacy`, `/login`, `/signup`, `/join`, `/forgot-password`, `/update-password`, `/waitlist/{ok,already,missing}`, `/billing`, `/billing/{return,success,cancel}`, `/checkout/{success,cancelled}`, `/iso-sync/{success,cancel}`. Protected and captured: `/llms.txt`, `/llms-full.txt`, `/sitemap.xml`, `/robots.txt`, all 14 `/md/*` mirrors (full text) and all 14 `/og/*` images (sha256). `/api/waitlist` and `/auth/*` are unchanged by design and not fetched.

**Evidence in `baseline/`**
- `text/` (desktop, JS on), `text-mobile/` (390 px, plus the mobile menu opened) and `text-nojs/` (JavaScript disabled): per route, status, title, canonical, meta/OG/Twitter, JSON-LD, headings, anchor ids, links, alts and full rendered text. No-JS text equals JS text on every route captured, which confirms content is server-rendered today.
- `machine/`: protected outputs, byte for byte.
- `perf/`: mobile-emulated metrics for `/`, `/features/body-graph`, `/compare/isofit-vs-hevy`, `/pricing`, `/faq` (requests, bytes by type, CLS, LCP, DCL, DOM nodes). Home today: 19 requests, 963 KB (545 KB script), CLS 0, LCP ~140 ms locally. Local numbers are noisy and bytes are what to compare. An interaction baseline (menu, FAQ, form states, sticky CTA) is still to do and will be scripted in Phase 2 against the shared shell.
- `../page-manifest.json`: the schema section 5 manifest for all 33 routes (template, source ref, block ids, metadata ref, canonical, mirror flag, motion ids, preserved anchors). Block ids are taken from the rendered section/heading id pairs; the homepage `glance` and a few legal sections have no matching `PageDoc` id, so Phase 2 will reconcile those when it regroups.

**Tooling.** `tools/capture.mjs` captures a running build; `tools/compare.py <baseline> <new> [--perf]` fails on any change to status, title, canonical, meta, JSON-LD, or machine output; compares links, alts, anchor ids and headings as multisets (so approved regrouping passes but missing, renamed or duplicated items fail); requires every baseline copy line to remain and none to appear more often than before (duplicated copy fails); checks mobile and no-JS captures and the mobile menu. Lines of 3 characters or fewer, such as arrow glyphs, are ignored. Section *order* is reviewed against the manifest, not by the script. Run twice against the untouched build it reports `clean`. Baseline screenshots (390 and 1440 wide) are not committed; `capture.mjs` regenerates them.

**Findings that shape the plan**
- The site already uses Unbounded (via `next/font/google`) and the paper/ink/forest/blue/terra/heat tokens, so this is an evolution, not a font swap. The change is scale, rhythm and surface contrast.
- `/billing`, `/billing/*`, `/checkout/*`, `/iso-sync/*`, `/login`, `/signup` render almost no static text (a shell or client redirect), so their baseline is thin; Phase 3 will exercise them in a browser.
- `/md/*` mirrors, `llms*.txt`, sitemap and robots are generated from `PageDoc` data and are untouched by any plan below.

## Phase 1: visual system

Mockups (open in a browser, files reference the real screenshots and fonts): `mockups/home.html`, `mockups/feature-detail.html` (body graph), `mockups/compare-detail.html` (long SEO page). PNG renders at 1440 and 390 wide sit beside them. All copy in them is existing copy, verbatim; the feature and comparison mockups show only some sections and say so.

**Type (Unbounded for display, existing sans and mono unchanged)**

| Role | Size | Weight | Tracking |
|---|---|---|---|
| Hero | clamp(2.75rem, 8.4vw, 6.75rem) | 800 | -0.045em |
| Statement (chapter heading) | clamp(2rem, 4.4vw, 3.25rem) | 700 | -0.04em |
| h2 | clamp(1.75rem, 3.6vw, 2.75rem) | 700 | -0.035em |
| h3 | clamp(1.25rem, 2vw, 1.5rem) | 700 | -0.02em |

Sentence case as in the source copy. No serif.

**Color.** Existing token values kept; none needed changing. Contrast checked: ink on paper 13.3:1, blue on paper 5.9:1, blue-heading on paper 4.1:1 (large display only, as today), sky on ink 6.0:1, terra-light on terra-ink 5.0:1, sage-light on forest-ink 5.1:1, paper on forest-dark 6.6:1, terra on terra-soft 5.3:1, ink-3 on paper 5.2:1.

**What is new**
1. *Chapters.* The four product parts (log, see, ask, share) become full-bleed chapters, each with its own surface (paper, ink, terra-soft, forest-soft) and a large outlined mono-style numeral (decorative, `aria-hidden`; the existing "01 · Log it" label stays as the real text).
2. *Heat ribbon.* The six real heat-map colors form the brand's ownable motif: hero accent bar, fact-strip top rules, legend. Colors are never recolored.
3. *Hero.* Much larger Unbounded headline with the real body-graph screen beside it. The inline waitlist form (same fields, labels and "Be first in" line), Web app link, launch-status line and the Rest / Most worked legend all stay in the first screen.
4. *Long pages.* Large page title, sticky in-page contents on desktop, tables keep today's stack-to-cards behavior on phones, Isofit column tinted `forest-soft`.
5. *Grid motif* is back as in the live site: the app's 26 px sky grid, fixed behind the page and fading toward every edge. It shows on paper surfaces (hero, fact strip, first chapter, pricing) and as a slightly stronger grid inside the ink chapter; the terra-soft, forest-soft and closing bands are solid so the grid never competes with screens or text.

**Motion (Phase 4, not applied yet).** Only `hero-settle` (shown in the mockups: 600 ms, 8 px, page load) is prototyped; skipped under `prefers-reduced-motion`; content is visible without it.

**Mobile shell.** At 390 px the header shows the logo, the Join the waitlist button and a native `<details>` Menu (works without JS) holding the primary links and Web app. Long tables use the existing stack-to-cards pattern (`.table-stack`), shown in `compare-detail-mobile.png`.

**Mockup limits to be aware of.** Static HTML, not the Next components. The "sets by muscle" figure uses the full screenshot; the real build keeps the existing `ScreenCrop`. Footer is abbreviated; feature and comparison pages show only some sections, but those shown use the live anchor ids (`what-you-see`, `gaps`, `how-it-works`, `muscles`, `free-vs-pro`; `choose-them`, `choose-isofit`) and the live heading levels. The mockup does not yet show the Quicklog example in the hero (suggested by the schema's America.gov row; open for Gate 1).

## Gate 1 decisions (from the user)
1. Approved, with the grid background restored (done in the mockups, see item 5 above).
2. Chapter surfaces approved as is.
3. Body-graph page: neglected-muscles logic added. Using only existing copy, the "gaps" section now shows the two live panel labels ("Not trained in this window", "Below your usual volume") as two visual states beside the real muscle-detail screenshot; the FAQ "How do I find out which muscles I am neglecting?" stays unchanged. No new copy was written; say so if you want an extra sentence.
4. Homepage hero: status line is now "Coming soon to iOS." and the button reads "Try web app". These are deliberate copy changes. `SITE.launchStatus` is one constant that also feeds the footer, mobile menu, meta descriptions, JSON-LD, `llms.txt`, FAQ and comparison pages, plus the homepage "Platform" and "Status" fact-strip rows, which still say "iPhone ... and web app, both coming soon". In Phase 2 only the hero line and the Web app link label (all headers) change; the rest is left until you decide whether to update it site-wide, since doing so would change metadata, structured data and the mirrors.

## Original Gate 1 questions
1. Is the hero scale and the numbered, color-blocked chapters the right level of expressiveness?
2. Any chapter surface you dislike (ink for "See it", terra-soft for "Ask Atlas", forest-soft for "Bonfire")?
3. Approve applying this system in Phase 2 to the shared shell, the homepage and the body-graph page?

## Phase 2: shared patterns, homepage, body-graph page (Gate 2)

**Code changed:** `src/app/page.tsx` (chapters, hero scale, heat ribbon, fact-strip heat rules), `src/components/marketing/primitives.tsx` (larger Unbounded scale for `PageHero` and `Section` headings, new `HeatRibbon`), `src/components/marketing/doc-sections.tsx` and `doc-page.tsx` (optional `chips` prop that highlights phrases already in a paragraph), `src/app/features/body-graph/page.tsx` (neglected-muscles chips), `src/components/marketing/web-app-link.tsx` ("Try web app"), `src/lib/site.ts` (`heroStatus`). The existing grid in `PageShell` is unchanged and still shows behind paper surfaces; the ink chapter has its own.

**Verification run:** `tsc` clean, `eslint` 0 errors (one pre-existing warning in `mobile-menu.tsx`), `next build` passes, `compare.py` against the baseline with `approved-changes.json` reports `clean` for desktop, mobile (including the opened menu) and no-JS captures: titles, canonicals, meta, JSON-LD, links, alts, headings, anchors, copy and all 32 machine outputs unchanged. Without the approved list the only differences are "Web app" -> "Try web app" (every header and the mobile menu) and the hero line "Coming soon to iPhone and the web." -> "Coming soon to iOS." Perf (local, mobile emulation): JS bytes +37, page bytes +0.5 to 0.9%, CLS 0, LCP unchanged within noise.

**Not yet verified:** keyboard-only and screen-reader pass, 200%/400% zoom, forced reduced-motion screenshot, interaction states (menu, form errors, sticky CTA). These are scheduled before Phase 3.

**Side effects to review.** The larger heading scale lives in shared components, so every page that uses `PageHero` or `Section` (features, pricing, compare, FAQ, about) already picks it up; those pages have not had their layouts reviewed yet. "Try web app" appears in all headers; the footer link still says "Web app". The approved-changes list allows "Coming soon to iPhone and the web." to drop on one page, so it cannot by itself catch a missing footer copy of the same line; the footer text was checked by hand.

## Phase 3 and performance (approved at Gate 2)

**Rollout.** The type scale, heat ribbon under every interior page title (`PageHero`), and the shared sections already reach features, compare, pricing, FAQ and About through shared components; legal and the auth, waitlist, billing, checkout and sync screens keep their layouts and behavior and sit on the same tokens. No workflow, form, route or backend code changed.

**Performance work (user asked for fast loads and low latency).** Method: production builds of `main` and this branch side by side, mobile emulation, 1.6 Mbps / 150 ms RTT, 4x CPU slowdown, median of 5 (`scratchpad` scripts; `tools/capture.mjs` records the unthrottled equivalent in `baseline/perf`).
- **Found and fixed a regression I introduced:** the larger hero heading wrapped differently between the fallback font and Unbounded, so the homepage layout shifted (CLS 0.175, "needs improvement"). The h1 now reserves its three lines (`min-h-[3.06em]`); CLS is 0.023, equal to `main`'s 0.026.
- **Images:** `next.config.ts` now serves AVIF first (WebP fallback) with a 30-day optimizer cache. Measured on `/features/workout-logging`: hero screen 52 KB to 40 KB, phone frame 31 KB to 8 KB, repeat-visit cache lifetime 4 hours to 30 days.
- **Unchanged and already good:** all marketing pages are statically generated; the middleware only runs on `/billing`; JavaScript is within about 1 KB of `main` (545 KB raw, framework dominated, 9 chunks); one self-hosted preloaded variable font; no third-party scripts; hero images are `priority`, the rest lazy.
- **Result (median, throttled):** FCP/LCP within ±40 ms of `main` on `/`, `/pricing`, `/faq`, `/features/body-graph`, `/features/workout-logging`, `/compare/isofit-vs-hevy` (home 876 → 852 ms after the CLS fix, `main` 808 ms; within run-to-run noise). TBT 236 to 320 ms on both.
- **Known, pre-existing, not changed:** `log.png` is requested at two widths on the workout-logging page (a `sizes` mismatch between the preload and the image); worth a follow-up since it is one extra image request.

**Overflow:** no horizontal scroll at 320 or 390 px on 26 routes (all 14 SEO pages, legal, auth, waitlist, billing/checkout/sync samples). This includes the two overflows that already existed on `main`.

## Phase 4: motion and verification

Motion is decorative only and limited to the four approved patterns: `hero-settle` (hero h1, lede and figure ease in, 0.5 s), `story-reveal` (page sections and chapter copy fade up once on entering the viewport), `screen-reveal` (phone figures, same mechanism) and `control-feedback` (press scale on rounded buttons and links).

- All motion is gated on `prefers-reduced-motion: no-preference`; `reveal.tsx` does nothing under reduced motion or without IntersectionObserver.
- Fail open: only below-fold items are hidden, and only after JS adds `reveal-ready`; without JS nothing is hidden, and a 6 s timeout reveals anything still pending.
- Verified at 390 px: 12/12 reveal items hidden then revealed after scroll; 0 hidden under reduced motion.
- No horizontal overflow at 320 and 390 px over 26 routes. `compare.py --perf --approved` reports `clean`. Home CLS 0.023, JS unchanged at about 545 KB.

### Final review fixes

- `reveal.tsx`: `threshold` is now 0 so a tall section reveals as soon as its top enters the lower part of the viewport (no blank screen on phones); focus inside a pending item reveals it at once.
- Standalone account, billing, checkout, sync and password screens (`AuthShell`, `StatusPage`, `ReturnLanding`, `AppShell`) now use the paper/rule/ink tokens, the faint grid, the heat ribbon and the larger Unbounded title. Forms, copy and behavior are unchanged; the `/signup` and billing buttons use the `forest` token (contrast fix).

## App Store launch update (2026-10-14)

Isofit is live on the App Store (https://apps.apple.com/us/app/isofit-workout-log-ai-coach/id6798953719) and the web app is live. This is the single site-wide update deferred in item 4 above.

- `SITE.launchStatus` now reads "Available on the App Store and on the web."; `SITE.heroStatus` is gone and `SITE.appStoreUrl` holds the listing link.
- Every "Join the waitlist" control (header, mobile menu, sticky phone bar, homepage hero, closing band on every page) is now "Download on the App Store", beside "Try web app". `WaitlistBand` became `GetAppBand`, `StickyWaitlist` became `StickyAppLink`.
- Copy that said coming soon, pre-release, planned, "neither app is available yet" or "at launch" now describes a live product. The two waitlist FAQ entries are removed. Pro prices are stated as prices rather than plans; the App Store listing remains final.
- Metadata, JSON-LD (`downloadUrl`/`installUrl` replace the pre-release `releaseNotes`), `llms.txt`, `llms-full.txt`, the markdown mirrors, and the social images ("iPhone + web · On the App Store", cache key `?v=5`) all read from these constants.
- `/api/waitlist` and the `/waitlist/*` result pages are left in place so old forms and bookmarks still resolve.
- `baseline/` captures are the pre-redesign site and are intentionally not updated, so `compare.py` will report these copy changes; add them to `approved-changes.json` when you next run it.

### Scroll-linked depth

Four decorative effects, all CSS scroll-driven animations (no script) inside `@supports (animation-timeline: view())` and `prefers-reduced-motion: no-preference`, animating only the independent `translate`/`scale` properties: `.px-float` (hero product figure lags up to 24 px, home and body-graph), `.px-grid` (page grid drifts slower than the page), `.px-heat` (heat-ramp swatches light up in sequence), `.px-num` (chapter numerals slide against the scroll, 768 px and up). Unsupported browsers and reduced motion show everything static. Text ledger of this commit is identical to its parent.

### Scroll-scrubbed Atlas squat and stronger depth

- `/features/atlas` plays Atlas's 18-frame squat from the iOS app in the page background (`atlas-squat.tsx`): a fixed, faded layer behind the content, six reps over the whole page's scroll. It never pins or holds the page. Frames are cropped (the app's "Tap repeatedly" prompt removed), resized to 540 px wide AVIF in `public/atlas/squat/` (411 KB total, cached 30 days) and fetched only after the page has loaded and gone idle. Reduced motion, Save-Data / 2G connections, no JS and failed loads show nothing, so the page is unchanged. The hero caption "Atlas, as the app draws it. The real conversation is below." was removed at the owner's request.
- Stronger CSS scroll-driven depth: hero figure lag 64 px, hero copy climbs 48 px, grid drift doubled, chapter numerals and phone screens drift 110 / 56 px, heat ribbon draws in, a thin heat-colored progress line across the top of every page, and bigger reveals (32 px rise, screens scale in).
