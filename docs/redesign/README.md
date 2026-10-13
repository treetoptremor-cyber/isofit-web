# Isofit public-site redesign: Phase 0 baseline and Phase 1 visual system

Status: **Gate 1 review.** No production code has changed. Everything here is documentation, baseline data, tooling and static mockups.

## Phase 0: baseline (Gate 0)

Next.js 16 docs under `node_modules/next/dist/docs/` were read (fonts, CSS, project structure) before any work. `next build` passes on the untouched branch.

**Routes inventoried (33 rendered pages, 6 machine outputs).** All 14 `PageDoc` routes plus `/terms`, `/privacy`, `/health-privacy`, `/login`, `/signup`, `/join`, `/forgot-password`, `/update-password`, `/waitlist/{ok,already,missing}`, `/billing`, `/billing/{return,success,cancel}`, `/checkout/{success,cancelled}`, `/iso-sync/{success,cancel}`. Protected: `/llms.txt`, `/llms-full.txt`, `/sitemap.xml`, `/robots.txt`, `/md/*` mirrors, `/api/waitlist`, `/auth/*`, `/og/*`.

**Content ledger** = `baseline/text/*.json`: per route, status, title, canonical, meta/OG/Twitter tags, JSON-LD, every heading, anchor id, internal link, image alt and the full rendered text. `baseline/machine/*` stores protected outputs byte for byte.

**Tooling.** `tools/capture.mjs` captures a running build; `tools/compare.py <baseline> <new>` fails on any change to status, title, canonical, meta, JSON-LD, links, alts, missing anchors/headings, missing copy lines, or any machine-route output. Run against the unchanged branch it reports `clean`, so the check has no false positives. Baseline screenshots (390 and 1440 wide, 66 files, ~42 MB) are not committed; `capture.mjs` regenerates them.

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
3. *Hero.* Much larger Unbounded headline with the real body-graph screen beside it; waitlist form and launch-status line stay in the first screen.
4. *Long pages.* Large page title, sticky in-page contents on desktop, tables keep today's stack-to-cards behavior on phones, Isofit column tinted `forest-soft`.
5. *Grid motif* stays fixed, faint and decorative behind pages as today.

**Motion (Phase 4, not applied yet).** Only `hero-settle` (shown in the mockups: 600 ms, 8 px, page load) is prototyped; skipped under `prefers-reduced-motion`; content is visible without it.

**Mockup limits to be aware of.** Static HTML, not the Next components. The "sets by muscle" figure uses the full screenshot; the real build keeps the existing `ScreenCrop`. Header/footer are abbreviated.

## Gate 1 questions
1. Is the hero scale and the numbered, color-blocked chapters the right level of expressiveness?
2. Any chapter surface you dislike (ink for "See it", terra-soft for "Ask Atlas", forest-soft for "Bonfire")?
3. Approve applying this system in Phase 2 to the shared shell, the homepage and the body-graph page?
