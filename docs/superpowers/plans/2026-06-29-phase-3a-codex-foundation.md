# Phase 3a — BÂBİL Codex Foundation · Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development. Steps use checkbox (`- [ ]`) syntax. NOTE: this is an art-forward build — logic tasks are TDD; visual/aesthetic tasks (tokens, floor theming) are spec + acceptance + build/a11y verification and are expected to iterate with the user (the `site/design-reference/v2-modern.html` prototype is the concrete visual starting point).

**Goal:** Build the shippable mythic foundation of BÂBİL — the codex world, the tower of floors, the scroll-ascent, the code⇄incantation morph as a full-page instrument, the threshold cold-open, and the plain-CV escape hatch — on the existing React foundation, fully accessible.

**Architecture:** Reuse the `site/` Vite+React+TS app, the `MorphProvider`/`--t` engine, and the `site-data.json` pipeline already on branch `feature/profile/phase-3-website`. Extend the data with **myth metadata** (per-project djinn true-name/sigil/floor/summon-words). Replace the plain sections + tokens with a **manuscript-aesthetic codex**: a `Tower` of `Floor`s revealed on scroll, a `FullPageMorph` ritual instrument, a `Threshold` cold-open, and an always-present `PlainCV` escape hatch. Static manuscript visuals in 3a (WebGL djinn + voice are 3b/3c).

**Tech Stack:** Vite, React 18, TypeScript, Vitest + @testing-library/react, CSS custom properties for the morph, IntersectionObserver for scroll-ascent.

## Global Constraints

- Build on branch `feature/profile/phase-3-website` (the scaffold, `MorphProvider`, `useMorph`, `morph.ts` helpers `clampT`/`quantize`, and `scripts/generate-site-data.ts` already exist). Do NOT modify `content/` facts.
- The morph is one scalar **`t ∈ [0,1]`**, default `0` = **code/engineer pole**, `1` = **incantation/poet pole**, persisted (`morph-t`), written to CSS var `--t` (the existing `MorphProvider` already does this).
- **Escape hatch is mandatory and always reachable:** a persistent, keyboard-focusable "Plain CV / read normally" control that renders ALL content as a clean linear semantic document + a `cv.pdf` link. The mythic experience is layered OVER real DOM content (works JS-off, crawler/SR-readable).
- **`prefers-reduced-motion`:** no scroll parallax/auto-animation; tower pre-revealed; morph quantizes to {0,1}; no shimmer.
- Every ritual (morph, ascend, summon-placeholder) has a pointer + keyboard equivalent with correct ARIA; focus order = reading order; skip-link; AA contrast at every `t`.
- **SIMS stays sealed:** named (true-name "the Sealed One"), shown, **never linked** (private). Other featured djinn link to real repos from `site-data.json`.
- Palette = manuscript: ink-black, aged parchment, **gold leaf**, lapis, cinnabar; dark-first + legible light. Type: Space Grotesk (code pole) ⟷ Fraunces variable (incantation pole).
- Static manuscript visuals only in 3a (sigils may be simple SVG/placeholder marks; curated public-domain imagery + WebGL djinn come later). No autoplay audio.
- ESM, conventional commits, commit per task. Tests run inside `site/` (`cd site && npm test`) except the data generator test (repo root `npm test -- generate-site-data`).

---

### Task 1: Myth metadata in the data pipeline

**Files:**
- Modify: `site/site.config.ts`, `scripts/generate-site-data.ts`
- Test: `scripts/__tests__/generate-site-data.test.ts` (extend)

**Interfaces:**
- Produces: `SiteData` extended with `myth: { threshold: string; poleCode: string; poleSpell: string }` and each `work[]` item gains `trueName: string`, `sigil: string`, `floor: number`, `summonWords: string[]`. Consumed by Tasks 4/6.

- [ ] **Step 1: Write the failing test** — add to `scripts/__tests__/generate-site-data.test.ts`:

```ts
it("carries myth metadata and per-djinn true names", () => {
  const d = renderSiteData(profileData, siteConfig);
  expect(d.myth.threshold).toMatch(/cin|djinn|sistem|system/i);
  expect(d.myth.poleCode).toBeTruthy();
  expect(d.myth.poleSpell).toBeTruthy();
  const llmdap = d.work.find((w) => w.slug === "llmdap")!;
  expect(llmdap.trueName).toBeTruthy();
  expect(llmdap.sigil).toBeTruthy();
  expect(typeof llmdap.floor).toBe("number");
  const sims = d.work.find((w) => w.slug === "sims")!;
  expect(sims.trueName).toBeTruthy();
  expect(sims.url).toBeUndefined(); // still sealed
});
```

- [ ] **Step 2: Run to verify it fails** — `npm test -- generate-site-data` → FAIL (`d.myth` undefined).

- [ ] **Step 3: Implement** — in `site/site.config.ts`, add a `myth` block and a `djinn` map keyed by slug, e.g.:

```ts
export interface DjinnMeta { trueName: string; sigil: string; floor: number; summonWords: string[]; }
// add to SiteConfig:
//   myth: { threshold: string; poleCode: string; poleSpell: string };
//   djinn: Record<string, DjinnMeta>;
```
with values:
```ts
myth: {
  threshold: "Bir sistem kurmak, bir cin doğurmaktır. — To build a system is to birth a djinn.",
  poleCode: "code", poleSpell: "incantation",
},
djinn: {
  llmdap: { trueName: "the Namebinder", sigil: "namebinder", floor: 1, summonWords: ["namebinder", "llmdap", "bind"] },
  "onprem-ai-adoption-radar": { trueName: "the Augur", sigil: "augur", floor: 2, summonWords: ["augur", "radar", "omen"] },
  sims: { trueName: "the Sealed One", sigil: "sealed", floor: 3, summonWords: ["sealed", "sims"] },
  "etch-a-chat": { trueName: "the Scribe of Vanishing Marks", sigil: "scribe", floor: 4, summonWords: ["scribe", "etch"] },
},
```
In `scripts/generate-site-data.ts`: extend `SiteData` with `myth` + the four djinn fields on `work[]`; in the `work` map, look up `config.djinn[slug]` (throw `djinn meta not found: <slug>` if missing) and spread `trueName/sigil/floor/summonWords`; copy `myth` through.

- [ ] **Step 4: Run to verify it passes** — `npm test -- generate-site-data` → PASS; then `npm run generate:site`; root `npm test` green.

- [ ] **Step 5: Commit**
```bash
git add site/site.config.ts scripts/generate-site-data.ts scripts/__tests__/generate-site-data.test.ts site/src/site-data.json
git commit -m "feat(site): add djinn myth metadata to site data"
```

---

### Task 2: Codex token system (manuscript aesthetic)

**Files:**
- Rewrite: `site/src/morph/tokens.css`
- Create: `site/src/styles/fonts.css` (Space Grotesk + Fraunces variable), `site/src/styles/codex.css` (manuscript frame, paper grain, gold rules)
- Test: `site/src/styles/__tests__/tokens.test.ts`

**Interfaces:** Produces the CSS-var contract (everything keys off `--t`): `--ink --paper --gold --lapis --cinnabar --acc --font --wght --track` etc., manuscript-themed, dark-first + light, reduced-motion safe.

- [ ] **Step 1: Write the failing test** — `site/src/styles/__tests__/tokens.test.ts` reads the file and asserts the contract exists (a real guard against accidental deletion):

```ts
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
const css = readFileSync(new URL("../../morph/tokens.css", import.meta.url), "utf8");
describe("codex tokens", () => {
  it("defines the manuscript palette keyed off --t", () => {
    for (const v of ["--t", "--ink", "--paper", "--gold", "--acc", "--font"]) expect(css).toContain(v);
    expect(css).toContain("color-mix");           // morph interpolation
    expect(css).toContain("prefers-reduced-motion");
  });
});
```

- [ ] **Step 2: Run to verify it fails** — `cd site && npm test -- tokens` → FAIL.

- [ ] **Step 3: Implement** — author `tokens.css` using the **v2 prototype** (`site/design-reference/v2-modern.html`) as the structural reference, swapping its duotone for the **manuscript palette**: `--ink/--paper/--gold/--lapis/--cinnabar` as `a`(code)/`b`(spell) OKLch pairs mixed by `--t` via `color-mix(in oklab, …, … calc(var(--t)*100%))`; `--font` cross-fades Space Grotesk→Fraunces at t=0.5; metrics (`--wght --track --leading --radius --grid`) interpolate; dark-first with a `prefers-color-scheme: light` block; a `prefers-reduced-motion` block disabling `--t` transition. Add `@property --t`. `codex.css` adds the manuscript frame (ruled gold borders, corner rosette placeholders, procedural paper-grain via layered gradients/SVG noise) and `fonts.css` the `@import`/`<link>` faces. Acceptance: `cd site && npm run build` succeeds; visual review with the user.

- [ ] **Step 4: Run to verify it passes** — `cd site && npm test -- tokens` → PASS; `npm run build` succeeds.

- [ ] **Step 5: Commit**
```bash
git add site/src/morph/tokens.css site/src/styles/fonts.css site/src/styles/codex.css
git commit -m "feat(site): codex manuscript token system (ink, parchment, gold)"
```

---

### Task 3: FullPageMorph — the ritual instrument

**Files:**
- Create: `site/src/morph/FullPageMorph.tsx`, `site/src/morph/pointer.ts` (pure helper)
- Test: `site/src/morph/__tests__/FullPageMorph.test.tsx`, `site/src/morph/__tests__/pointer.test.ts`
- Remove/replace usage of the old `MorphControl` in `App.tsx` (Task 7)

**Interfaces:**
- Consumes: `useMorph()` (`{ t, setT }`), `clampT` from `morph.ts`.
- Produces: `xToT(clientX: number, width: number): number` (= `clampT(clientX/width)`); `<FullPageMorph/>` rendering a full-viewport drag field + a full-height seam with an accessible `role="slider"` handle (aria valuemin/max/now/valuetext, Arrow/Home/End keys), pole labels (`code` ⟷ `incantation`), directional-lock drag (horizontal morphs, vertical scrolls), reduced-motion → discrete.

- [ ] **Step 1: Write the failing tests** —

`site/src/morph/__tests__/pointer.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { xToT } from "../pointer";
describe("xToT", () => {
  it("maps pointer x across width to [0,1]", () => {
    expect(xToT(0, 1000)).toBe(0);
    expect(xToT(500, 1000)).toBe(0.5);
    expect(xToT(2000, 1000)).toBe(1);
    expect(xToT(-50, 1000)).toBe(0);
  });
});
```
`site/src/morph/__tests__/FullPageMorph.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MorphProvider } from "../MorphProvider";
import { FullPageMorph } from "../FullPageMorph";
describe("FullPageMorph", () => {
  it("exposes an accessible full-page slider defaulting to the code pole", () => {
    render(<MorphProvider><FullPageMorph /></MorphProvider>);
    const s = screen.getByRole("slider");
    expect(s).toHaveAttribute("aria-valuenow", "0");
    expect(s).toHaveAttribute("aria-valuetext");
    expect(screen.getByText(/code/i)).toBeInTheDocument();
    expect(screen.getByText(/incantation/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run to verify they fail** — `cd site && npm test -- FullPageMorph pointer` → FAIL (modules missing).

- [ ] **Step 3: Implement** — `pointer.ts` exports `xToT`. `FullPageMorph.tsx` adapts the **v2 prototype's** drag/seam/keyboard JS into React: a fixed drag-field (directional lock via pointer deltas; horizontal → `setT(xToT(e.clientX, innerWidth))` + `preventDefault`, vertical → release to native scroll), a fixed full-height seam at `left: calc(var(--t)*100%)`, the `role="slider"` handle wired to `useMorph` with Arrow/Home/End, and `code`/`incantation` pole labels. Reduced-motion handled by `MorphProvider.setT` (already quantizes).

- [ ] **Step 4: Run to verify they pass** — `cd site && npm test` green; `npm run typecheck` clean.

- [ ] **Step 5: Commit**
```bash
git add site/src/morph/FullPageMorph.tsx site/src/morph/pointer.ts site/src/morph/__tests__/FullPageMorph.test.tsx site/src/morph/__tests__/pointer.test.ts
git commit -m "feat(site): full-page morph ritual instrument"
```

---

### Task 4: Tower + Floor + scroll-ascent

**Files:**
- Create: `site/src/tower/Tower.tsx`, `site/src/tower/Floor.tsx`, `site/src/tower/useReveal.ts`
- Test: `site/src/tower/__tests__/tower.test.tsx`, `site/src/tower/__tests__/useReveal.test.ts`

**Interfaces:**
- Produces: `useReveal(): { ref, revealed }` (IntersectionObserver-based; `revealed=true` immediately under reduced-motion); `<Floor index level title id>` (a `<section>` with reveal state + manuscript framing); `<Tower>` (an `<ol>`-like ordered wrapper that lays out floors and renders a faint ascent rule).

- [ ] **Step 1: Write the failing tests** —
`useReveal.test.ts`:
```ts
import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useReveal } from "../useReveal";
describe("useReveal", () => {
  it("starts revealed when reduced-motion is preferred", () => {
    vi.stubGlobal("matchMedia", (q: string) => ({ matches: q.includes("reduced-motion"), addEventListener(){}, removeEventListener(){} }));
    const { result } = renderHook(() => useReveal());
    expect(result.current.revealed).toBe(true);
  });
});
```
`tower.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Tower } from "../Tower";
import { Floor } from "../Floor";
describe("Tower", () => {
  it("renders floors as ordered sections with headings", () => {
    render(<Tower><Floor index={1} level="01" id="work" title="The Bound"><p>x</p></Floor></Tower>);
    expect(screen.getByRole("region", { name: /The Bound/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run to verify they fail** — `cd site && npm test -- tower useReveal` → FAIL.

- [ ] **Step 3: Implement** — `useReveal`: if `matchMedia('(prefers-reduced-motion: reduce)').matches` → `revealed=true` synchronously; else IntersectionObserver sets `revealed=true` on first intersection (threshold ~0.15), unobserve after. `Floor`: `<section id aria-labelledby>` with an eyebrow (`level` + `title`), `data-revealed` attr, manuscript frame class; reveal toggles a CSS class (CSS does the parallax/fade — guarded by reduced-motion in tokens). `Tower`: wrapper with the ascent rule + ordered semantics.

- [ ] **Step 4: Run to verify they pass** — `cd site && npm test` green.

- [ ] **Step 5: Commit**
```bash
git add site/src/tower
git commit -m "feat(site): tower scaffold with scroll-ascent floors"
```

---

### Task 5: Threshold cold-open + Plain-CV escape hatch

**Files:**
- Create: `site/src/experience/Threshold.tsx`, `site/src/experience/PlainCV.tsx`, `site/src/experience/useMode.ts`
- Test: `site/src/experience/__tests__/escape.test.tsx`

**Interfaces:**
- Produces: `useMode(): { mode: "codex" | "plain"; setMode }` (persisted to `localStorage` `site-mode`; defaults `codex`, but defaults `plain` under reduced-motion is NOT forced — reduced-motion keeps codex but static); `<Threshold onEnter>`; `<PlainCV data>` — a clean linear semantic document of all content + `cv.pdf`.

- [ ] **Step 1: Write the failing test** — `escape.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PlainCV } from "../PlainCV";
import { data } from "../../data";
describe("escape hatch", () => {
  it("PlainCV renders all sections as a linear document with a CV link", () => {
    render(<PlainCV data={data} />);
    expect(screen.getByRole("heading", { name: /Enes Kaynakc/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /CV/i })).toHaveAttribute("href", "/cv.pdf");
    expect(screen.getByText(/Mega Bilgisayar/)).toBeInTheDocument();
    expect(screen.getByText(/LLMDAP/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run to verify it fails** — `cd site && npm test -- escape` → FAIL.

- [ ] **Step 3: Implement** — `PlainCV`: a plain, unstyled-ish semantic render of profile/summary, experience, work (SIMS no link), lines, about/education, contact + a `/cv.pdf` link (the accessible, fast fallback). `Threshold`: the cold-open panel (ink field, the `myth.threshold` line, an "Enter" button calling `onEnter`, and a "Read the plain CV →" link). `useMode`: persisted mode toggle. A persistent header control toggles modes (wired in Task 7).

- [ ] **Step 4: Run to verify it passes** — `cd site && npm test` green.

- [ ] **Step 5: Commit**
```bash
git add site/src/experience
git commit -m "feat(site): threshold cold-open and plain-CV escape hatch"
```

---

### Task 6: Theme the floors (sections as the codex)

**Files:**
- Rewrite: `site/src/sections/Hero.tsx` (→ Foundation), `Work.tsx` (→ The Bound), `Experience.tsx` (→ The Raising), `Lines.tsx`, `About.tsx` (→ The Architect), `Contact.tsx` (→ The Seal)
- Create: `site/src/sections/Sigil.tsx` (simple SVG sigil by id)
- Test: `site/src/sections/__tests__/sections.test.tsx` (extend)

**Interfaces:** Consumes extended `SiteData` (Task 1) + `Floor` (Task 4) + `Sigil`. Each section renders inside a `Floor` with myth framing; **Work shows each djinn's `trueName` + `Sigil`; SIMS sealed (no link).**

- [ ] **Step 1: Write the failing test** — extend `sections.test.tsx`:
```tsx
it("The Bound shows djinn true-names; SIMS sealed with no link", () => {
  render(<MorphProvider><Work /></MorphProvider>);
  expect(screen.getByText(/the Namebinder/i)).toBeInTheDocument();     // LLMDAP
  expect(screen.getByText(/the Sealed One/i)).toBeInTheDocument();     // SIMS
  const sims = screen.getByText(/Smart Inventory Management System/i);
  expect(within(sims.closest("article")!).queryByRole("link")).toBeNull();
});
```

- [ ] **Step 2: Run to verify it fails** — `cd site && npm test -- sections` → FAIL.

- [ ] **Step 3: Implement** — retheme each section per the spec's floor mapping, reading the extended data, wrapping content in `<Floor>`, adding the djinn `trueName` + `<Sigil id={w.sigil}/>` to Work cards (SIMS keeps `_(sealed)_`, no link), keeping the morphing hero phrase from the v2 prototype. `Sigil.tsx` renders a small distinct inline SVG mark per sigil id (placeholder marks acceptable in 3a). Visual acceptance with the user.

- [ ] **Step 4: Run to verify it passes** — `cd site && npm test` green; `npm run build` succeeds.

- [ ] **Step 5: Commit**
```bash
git add site/src/sections
git commit -m "feat(site): theme floors as the codex (djinn, sigils, sealed SIMS)"
```

---

### Task 7: Compose the experience + a11y/integration pass

**Files:**
- Rewrite: `site/src/App.tsx`
- Test: `site/src/__tests__/app.test.tsx`

**Interfaces:** Wires `MorphProvider` → mode (`useMode`): `plain` → `<PlainCV>`; `codex` → `<Threshold>` then the `<Tower>` of themed `<Floor>`s + `<FullPageMorph>` + a persistent mode-toggle + skip-link. All content present as DOM regardless of mode.

- [ ] **Step 1: Write the failing test** — `app.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";
describe("App", () => {
  it("has a main landmark, a skip link, and an always-present escape to plain CV", () => {
    render(<App />);
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /skip to content/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /plain|read normally|cv/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run to verify it fails** — `cd site && npm test -- app` → FAIL.

- [ ] **Step 3: Implement** — compose App per Interfaces; import `tokens.css`/`codex.css`/`fonts.css`; ensure skip-link, the mode toggle (button), `FullPageMorph`, and the `Tower` of floors; reduced-motion path renders the tower pre-revealed.

- [ ] **Step 4: Run to verify it passes** — `cd site && npm test` (all green), `npm run typecheck`, `npm run build`. Then manual a11y pass: keyboard-only morph + navigation + mode toggle; reduced-motion (no parallax); plain mode reads linearly; AA contrast at `t=0` and `t=1`. Record notes in the commit body.

- [ ] **Step 5: Commit**
```bash
git add site/src/App.tsx site/src/__tests__/app.test.tsx
git commit -m "feat(site): compose codex experience with escape hatch and a11y"
```

---

## Self-Review

**Spec coverage (against `2026-06-29-babil-summoning-tower-design.md`):** myth data (T1) · manuscript aesthetic (T2) · code⇄incantation full-page morph (T3) · ascend/tower (T4) · threshold + escape hatch (T5) · floors/djinn/sealed-SIMS (T6) · compose + a11y + reduced-motion + DOM-first (T7). Summon (voice/sigil rituals) and WebGL djinn are **3b/3c** (correctly out of 3a scope). ✅

**Placeholder scan:** No TODO/TBD in steps. Visual tasks (T2, T6) intentionally specify structure + acceptance + the v2 reference rather than verbatim final CSS — this is an art build that iterates with the user; flagged explicitly in the header. Sigils are simple placeholder SVGs in 3a (real art later) — stated.

**Type consistency:** `SiteData.myth` + `work[].{trueName,sigil,floor,summonWords}` defined in T1, consumed in T4/T6. `xToT(clientX,width)` consistent between `pointer.ts` and `FullPageMorph`. `useReveal`/`useMode` signatures consistent across T4/T5/T7. The existing `MorphProvider`/`useMorph`/`clampT`/`quantize` are reused unchanged.

**Open content items (resolve during build, non-blocking):** real poetry lines (Lines floor placeholder until provided); djinn true-names confirmed-by-default (user may rename); curated Siyah Kalem/Bruegel imagery deferred to 3b/3d (3a uses frame + placeholder sigils).

**Scope/fallback:** Large but the foundation (scaffold/morph/data) is reused. If subagents drop (API instability seen this session), controller verifies committed state and continues; visual tasks may be controller-driven for tight art control.
