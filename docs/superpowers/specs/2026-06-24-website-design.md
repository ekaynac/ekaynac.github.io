# Personal Website — Design Spec ("The Duality Morph")

**Date:** 2026-06-24
**Owner:** Enes Kaynakcı
**Phase:** 3 of the personal-brand refresh
**Status:** Design approved in concept (Duality Morph, minimal & refined, dual identity centered) — elevating to a comprehensive, designer-grade spec. Pending spec review.
**Build tool:** OpenDesign (generates the design/components); integrated + data-wired by us.

---

## 1. Context & Goal

A personal website for Enes — an **AI-leaning full-stack engineer who is also a published poet**. Goal: passive discoverability for both Turkey + international audiences, telling a story no generic engineer portfolio can. It must satisfy a recruiter skimming for signal **and** reward the curious visitor who explores.

The site is the public face that ties together the CV (`public/cv.pdf`) and GitHub. It derives its content from the same single source of truth (`content/`) as the CV and README.

**The bar:** a *designer-grade* site — the craft level of an Awwwards/Cargo personal site: intentional typography, a real design system, considered motion, pixel-level polish. Minimal in surface, maximal in care.

## 2. Concept — The Duality Morph

The site's organizing idea is a single, continuous **morph between two poles of one person**:

- **Engineer pole** (`t = 0`, the default landing state): monospace type, a precise modular grid, dense and structured, cool-neutral ink, sharp edges, exact motion. Reads as a sharp technical portfolio.
- **Poet pole** (`t = 1`): serif type, open whitespace, asymmetric and airy, warm-neutral paper, soft edges, gentle motion. Reads as a literary, editorial space.

A visitor **drives** the morph with one elegant control. Every visual dimension interpolates with a normalized scalar **`t ∈ [0,1]`**. The hero headline transforms word-by-word as `t` moves (e.g. *"I build **systems**"* ⇄ *"I write **lines**"*), revealed with a subtle **token-by-token "generation"** shimmer — a quiet nod to LLM work and to *language as the shared substrate of code and poetry*.

**Principle:** the morph is the *only* novelty. Everything else is restrained so the one idea lands.

## 3. Design Principles

1. **One idea, fully committed.** The duality morph is the soul; no competing gimmicks.
2. **Legible by default.** Lands at the engineer pole; a recruiter never has to interact to get the portfolio.
3. **Type is the design.** Monochrome + typographic; the interest comes from type, space, and motion, not ornament.
4. **Motion with intent.** Nothing moves without meaning; everything respects `prefers-reduced-motion`.
5. **Works without JS / at any `t`.** Content is real HTML; the morph enhances, never gates. Fully readable at `t=0` and `t=1`.

## 4. Design System (tokens)

The morph is implemented as **interpolation across design tokens** keyed on `t`. All tokens are CSS custom properties updated from a single `--t`.

**Typography**
- Two families: an **engineer face** (geometric/monospace — e.g. *Berkeley Mono / JetBrains Mono / Commit Mono* feel) and a **poet face** (a refined serif — e.g. *Newsreader / Fraunces / Spectral* feel). Final faces chosen in OpenDesign.
- The morph cross-fades family and shifts **weight, tracking (mono: 0 → serif: -0.01em), and leading (1.4 → 1.6)**.
- Modular type scale (1.250 major-third): `--step--1 … --step-5`. Fluid via `clamp()`.

**Color (monochrome + temperature)**
- Ink and paper only, plus ONE restrained accent. Temperature interpolates: engineer = cool neutral (slightly blue-gray), poet = warm neutral (slightly cream). Accent likewise shifts hue subtly.
- Tokens: `--paper`, `--ink`, `--ink-muted`, `--line`, `--accent`. Light + dark themes (respect `prefers-color-scheme`); the morph is orthogonal to light/dark.
- AA contrast maintained at every `t` and both themes.

**Space & density**
- Spacing scale (`--space-3xs … --space-3xl`). Density interpolates: engineer = tighter rhythm + visible grid lines; poet = looser rhythm + lines fade out.

**Motion**
- Easing: a single refined cubic-bezier for the morph; micro-interactions ≤ 200ms. The morph itself is spring/eased and continuous.
- `prefers-reduced-motion`: the morph becomes a **discrete two-state toggle** (engineer/poet) with an instant or 1-step cross-fade; the token-generation shimmer is disabled.

**Grid**
- 12-column fluid grid with a max content measure (~72ch for prose, wider for the work grid). The grid lines are a visible motif at the engineer pole and dissolve toward the poet pole.

## 5. The Morph Interaction (detailed)

- **State:** one source of truth, `t ∈ [0,1]` (default `0`). Held in a small store / context; written to `--t` on `:root` and to a few derived CSS vars. Persisted to `localStorage` so a return visitor keeps their setting; respects reduced-motion.
- **Control:** a refined **draggable handle** on a labeled track in the hero (labels: `engineer` ⟷ `poet`), with a thin progress fill. Discoverable, obviously interactive, elegant.
- **Inputs:** pointer drag; click-to-position; **keyboard** (focusable slider, Arrow keys, Home/End) with proper ARIA (`role="slider"`, `aria-valuenow/min/max/text`); optional scroll-coupling is **out of scope v1** (keep the control explicit and predictable).
- **What interpolates at `t`:** type family/weight/tracking/leading, color temperature + accent hue, spacing/density, grid-line opacity, corner radius (0 → soft), motion amplitude, and the hero word-morph + token shimmer.
- **Hero headline:** a small set of paired phrases whose keywords swap at a threshold; the swapped word re-renders with a token-by-token reveal. Pairs authored in content (see §6).

## 6. Page Architecture (single page, anchored sections)

Order and pole-affinity (each section is fully present at all `t`, but has a "home" pole where it's strongest):

1. **Hero** — name, the morphing headline, the morph control, a one-line dual-identity tagline, quiet links (GitHub, LinkedIn, CV, Email). *Home: balanced.*
2. **Work** — featured projects as a precise card grid (SIMS *private, no link*, LLMDAP, On-Prem AI Adoption Radar, Etch-A-Chat) with tech tags + links. *Home: engineer.*
3. **Experience** — a clean timeline/list (Mega current, Mia 100/100, Meturone). *Home: engineer.*
4. **Lines** — a quiet poetry corner: a few real lines of Enes's verse, set editorially; mentions *Uyandı Uyudu*, Polemik, "Raw Şiir". Strongest, most beautiful at the poet pole. *Home: poet.*
5. **About** — the dual narrative in prose; education (Bilkent, Hagenberg, METU), the engineer↔poet throughline. *Home: balanced.*
6. **Contact** — email + socials, restrained. *Home: balanced.*

## 7. Content Model

- A **`site-data.json` generated from `content/`** (a small generator like the CV/README ones), so projects/experience/skills/education stay in sync with the single source of truth.
- **Poetry content is NEW and required from Enes**: 2–4 short real lines (or a stanza) for *Lines* + the hero word-pairs. Until provided, the build uses clearly-marked placeholders and the section is wired but unfilled. **This is the one hard content dependency.**
- Featured-project privacy rule carries over: **SIMS is named without a link** (private).

## 8. Component Architecture (isolated units)

Small, single-purpose units with clear interfaces:
- `MorphProvider` — owns `t`, persistence, reduced-motion; exposes `t` + `setT`. *(state)*
- `MorphControl` — the accessible slider; consumes `t`/`setT`. *(input)*
- `tokens.css` — all `t`-keyed custom properties + the `--t`→derived-var math. *(styling core)*
- `Hero`, `WorkGrid` + `ProjectCard`, `ExperienceList`, `Lines`, `About`, `Contact` — presentational, read `site-data.json`. *(views)*
- `useGenerateText` — the token-by-token reveal for the hero word swap. *(effect)*
- `data` — typed loader for `site-data.json`. *(data)*

Each file is focused (<~200 lines); a section can be understood/changed without touching the morph core.

## 9. Accessibility & Resilience

- Semantic landmarks, heading order, skip-link, visible focus.
- The morph slider is fully keyboard-operable with correct ARIA; `prefers-reduced-motion` → discrete toggle, no shimmer.
- AA contrast at every `t`, both themes.
- All content is real DOM (SSR/static HTML), so it's readable with JS disabled and by crawlers/recruiters' tools; the morph only restyles.

## 10. Performance

- Static, dependency-light. No heavy animation libs if avoidable; CSS-var interpolation does most of the morph. Self-host + **subset** the two fonts. Target: tiny JS, instant first paint, Lighthouse ≥ 95.

## 11. Tech & Deploy

- **Self-contained static build.** Recommended: **Vite + React + a light motion approach** (CSS variables for the morph; `motion`/`framer-motion` only if needed) → static output. OpenDesign generates the design + components; we integrate and wire `site-data.json`.
- **Hosting: GitHub Pages** from the `ekaynac.github.io` repo (the morph is 100% client-side — Pages is sufficient; Vercel/Railway available as fallback but unnecessary). Build output served via a `gh-pages`-style Action or `/docs`. We **flip the repo public + enable Pages** at deploy, then wire `https://ekaynac.github.io` back into the CV (`profile.links.website`, already in the dataset) and the README.

## 12. OpenDesign Workflow

1. `create_project` ("enes-site").
2. `start_run` with the **full art-directed brief** (this spec, condensed into a generation prompt: concept, the `t`-morph mechanic, the token design system, section list, sample content, the two type/pole moodboards, accessibility + reduced-motion requirements).
3. Poll `get_run` → `get_artifact`; **review the rendered result with Enes**; iterate via `write_file` / follow-up `start_run` until the look + morph feel are right.
4. Integrate the approved artifact into the static build, wire real `site-data.json`, add the morph state/persistence/a11y, test, then deploy.

## 13. Success Criteria

- Lands at the engineer pole as a clean, credible portfolio; the morph is discoverable and delightful.
- Reads beautifully at both poles; the dual identity is unmistakable.
- Designer-grade craft (type, space, motion, detail); Lighthouse ≥ 95; fully accessible incl. reduced-motion.
- Content stays in sync with `content/` via `site-data.json`.
- Live on `https://ekaynac.github.io`, linked from CV + README.

## 14. Non-Goals (v1)

Blog/CMS; multi-page routing; scroll-jacking; i18n (English-first, though poetry lines may be Turkish); a backend.

## 15. Open Items (resolve during OpenDesign iteration)

- **Poetry lines** from Enes (hard dependency for *Lines* + hero pairs).
- Final type pairing (engineer face / poet face) and the single accent hue — explored visually in OpenDesign.
- Exact hero word-pairs.
- Light/dark default.
