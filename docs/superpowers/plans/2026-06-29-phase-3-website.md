# Phase 3 — Personal Website "Duality Morph" · Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Enes's interactive personal website — a minimal, designer-grade single page that morphs continuously between an "engineer" and a "poet" pole — and deploy it to GitHub Pages.

**Architecture:** A self-contained **Vite + React + TypeScript** app in `site/` (separate from the root content tooling). Content comes from a generated `site/src/site-data.json` (built from the `content/` single source of truth). The morph is a single scalar `t ∈ [0,1]` held in React context and written to a CSS custom property `--t`; all visual interpolation is done in CSS from `--t` (no heavy animation lib). OpenDesign provides the **art direction** (type, palette, layout, motion feel) which we apply to the token layer + components. Deploy via a GitHub Action to Pages.

**Tech Stack:** Vite, React 18, TypeScript, Vitest + @testing-library/react + jsdom (component tests), tsx (root generator), CSS custom properties for the morph, GitHub Actions + actions/deploy-pages.

## Global Constraints

- The morph is one scalar **`t ∈ [0,1]`**, default **`0` (engineer pole)**, persisted to `localStorage` key `morph-t`. All visual interpolation derives from the CSS var `--t` on `:root`. No scroll-jacking.
- **`prefers-reduced-motion`** → the morph quantizes to discrete `{0, 1}` and the hero token-shimmer is disabled.
- The morph control is an accessible slider: `role="slider"`, `aria-valuemin=0`, `aria-valuemax=100`, `aria-valuenow`, `aria-valuetext` ("engineer"…"poet"), keyboard Arrow/Home/End, visible focus.
- **AA contrast at every `t`** and in light + dark; all content is real DOM (readable JS-off / by crawlers); the morph only restyles.
- Content is generated from `content/` into `site/src/site-data.json` — do NOT hand-edit that JSON or duplicate facts. **SIMS is private → named, never linked.** Canonical links/email come from `profileData.profile`.
- **Poetry lines are a content dependency.** Until Enes supplies real lines, `site.config.ts` carries clearly-marked placeholder verse (`PLACEHOLDER:` prefix) and a test asserts no `PLACEHOLDER:` string reaches a production build (the test is skipped/xfail until lines land — see Task 2).
- Self-host + subset fonts; dependency-light; target Lighthouse ≥ 95.
- Deploy target: repo `ekaynac/ekaynac.github.io`, served by GitHub Pages from the Action artifact; site lives at `https://ekaynac.github.io`. Repo is flipped **public** at deploy (Task 6).
- ESM, conventional commits, commit per task. Work on branch `feature/profile/phase-3-website` off `master`.

---

### Task 1: Scaffold the `site/` app

**Files:**
- Create: `site/package.json`, `site/vite.config.ts`, `site/tsconfig.json`, `site/index.html`, `site/src/main.tsx`, `site/src/App.tsx`, `site/src/vite-env.d.ts`
- Test: `site/src/__tests__/smoke.test.tsx`
- Modify: root `.gitignore` (ignore `site/dist`, `site/node_modules`)

**Interfaces:**
- Produces a buildable Vite app and a working `npm test` (vitest) inside `site/`. `App` renders a top-level `<main>`.

- [ ] **Step 1: Write the failing test**

Create `site/src/__tests__/smoke.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  it("renders a main landmark", () => {
    render(<App />);
    expect(screen.getByRole("main")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `cd site && npm install && npm test`
Expected: FAIL (no `App`/config yet). If `npm install` has no network, report BLOCKED with the exact error.

- [ ] **Step 3: Implement**

Create `site/package.json`:

```json
{
  "name": "enes-site",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.5.0",
    "@testing-library/react": "^16.0.1",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.3",
    "jsdom": "^25.0.1",
    "typescript": "^5.7.2",
    "vite": "^5.4.11",
    "vitest": "^2.1.8"
  }
}
```

Create `site/vite.config.ts`:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/", // user-site (ekaynac.github.io) serves from root
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test-setup.ts"],
  },
});
```

Create `site/src/test-setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

Create `site/tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  },
  "include": ["src"]
}
```

Create `site/index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Enes Kaynakcı — AI / Software Engineer</title>
    <meta name="description" content="Enes Kaynakcı — AI-leaning full-stack engineer and poet." />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

Create `site/src/main.tsx`:

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

Create `site/src/App.tsx`:

```tsx
export default function App() {
  return <main>Enes Kaynakcı</main>;
}
```

Create `site/src/vite-env.d.ts`:

```ts
/// <reference types="vite/client" />
```

Append to root `.gitignore`:

```
site/node_modules/
site/dist/
```

- [ ] **Step 4: Run to verify it passes**

Run: `cd site && npm test`
Expected: PASS (1 test). Then `npm run build` → succeeds, emits `site/dist`.

- [ ] **Step 5: Commit**

```bash
git add site/package.json site/package-lock.json site/vite.config.ts site/tsconfig.json site/index.html site/src .gitignore
git commit -m "feat(site): scaffold Vite + React + TS app"
```

---

### Task 2: Site-data generator (from the dataset)

**Files:**
- Create: `site/site.config.ts` (curation: featured projects, hero pairs, about paragraphs, placeholder verse)
- Create: `scripts/generate-site-data.ts`
- Test: `scripts/__tests__/generate-site-data.test.ts`
- Generate: `site/src/site-data.json`
- Modify: root `package.json` (add `generate:site` script)

**Interfaces:**
- Consumes: `profileData` (root `content/index`), `siteConfig`.
- Produces: `renderSiteData(data, config): SiteData` and `site/src/site-data.json`. `SiteData` shape (consumed by Task 4 components):
  ```ts
  type SiteData = {
    profile: { name: string; title: string; location: string; email: string;
               links: { github: string; linkedin: string; website: string } };
    heroPairs: { engineer: string; poet: string }[];
    work: { slug: string; name: string; oneLiner: string; tech: string[]; url?: string; isPrivate: boolean }[];
    experience: { org: string; role: string; period: string; current: boolean; highlights: string[] }[];
    lines: { verse: string[]; note: string };
    about: { paragraphs: string[]; education: { org: string; credential: string; period: string }[] };
    skills: { category: string; items: string[] }[];
  };
  ```

- [ ] **Step 1: Write the failing test**

Create `scripts/__tests__/generate-site-data.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { renderSiteData } from "../generate-site-data";
import { profileData } from "../../content/index";
import { siteConfig } from "../../site/site.config";

describe("renderSiteData", () => {
  const d = renderSiteData(profileData, siteConfig);

  it("carries canonical profile + links", () => {
    expect(d.profile.email).toBe("tensorenes@gmail.com");
    expect(d.profile.links.github).toBe("https://github.com/ekaynac");
  });
  it("marks SIMS private with no url", () => {
    const sims = d.work.find((w) => w.slug === "sims")!;
    expect(sims.isPrivate).toBe(true);
    expect(sims.url).toBeUndefined();
  });
  it("gives public featured projects a url", () => {
    const llmdap = d.work.find((w) => w.slug === "llmdap")!;
    expect(llmdap.url).toBe("https://github.com/ekaynac/LLMDAP");
  });
  it("has at least one hero pair and flags the current role", () => {
    expect(d.heroPairs.length).toBeGreaterThan(0);
    expect(d.experience.some((e) => e.current)).toBe(true);
  });
  it("throws if a configured project slug is unknown", () => {
    expect(() => renderSiteData(profileData, { ...siteConfig, projects: ["nope"] })).toThrow(/project not found/);
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run (from repo root): `npm test -- generate-site-data`
Expected: FAIL — cannot find `../generate-site-data` / `../../site/site.config`.

- [ ] **Step 3: Implement**

Create `site/site.config.ts`:

```ts
export interface SiteConfig {
  heroPairs: { engineer: string; poet: string }[];
  projects: string[];
  experience: { org: string; start: string }[];
  skills: string[];
  education: string[];
  aboutParagraphs: string[];
  lines: { verse: string[]; note: string };
}

export const siteConfig: SiteConfig = {
  heroPairs: [
    { engineer: "I build systems.", poet: "I write lines." },
    { engineer: "Pipelines, models, services.", poet: "Images, rhythm, voice." },
  ],
  projects: ["llmdap", "onprem-ai-adoption-radar", "sims", "etch-a-chat"],
  experience: [
    { org: "Mega Bilgisayar", start: "2026-05-18" },
    { org: "Mia Teknoloji", start: "2025-02" },
    { org: "Meturone (Fixed-wing UAV Team)", start: "2021-09" },
  ],
  skills: ["Languages", "AI & ML", "Web & Mobile", "Infrastructure & Tools"],
  education: ["Bilkent University", "FH Upper Austria, Hagenberg Campus", "Middle East Technical University (METU)"],
  aboutParagraphs: [
    "I'm an AI-leaning full-stack engineer who ships end to end — LLM and agent pipelines, computer-vision systems, and the production microservices and interfaces around them.",
    "I'm also a poet: a published book, editor at an independent press, and a literature society I led. I think the two sides feed each other — both are about giving precise structure to something hard to pin down.",
  ],
  lines: {
    verse: ["PLACEHOLDER: replace with 2-4 real lines of Enes's poetry."],
    note: "From Uyandı Uyudu (2024). Poetry editor at Polemik Yayınları.",
  },
};
```

Create `scripts/generate-site-data.ts`:

```ts
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import type { ProfileData } from "../content/schema";
import { profileData } from "../content/index";
import { siteConfig, type SiteConfig } from "../site/site.config";
import { formatDate } from "./format-date";

export interface SiteData {
  profile: { name: string; title: string; location: string; email: string;
             links: { github: string; linkedin: string; website: string } };
  heroPairs: { engineer: string; poet: string }[];
  work: { slug: string; name: string; oneLiner: string; tech: string[]; url?: string; isPrivate: boolean }[];
  experience: { org: string; role: string; period: string; current: boolean; highlights: string[] }[];
  lines: { verse: string[]; note: string };
  about: { paragraphs: string[]; education: { org: string; credential: string; period: string }[] };
  skills: { category: string; items: string[] }[];
}

const period = (start: string, end: string) => `${formatDate(start)} – ${formatDate(end)}`;

export function renderSiteData(data: ProfileData, config: SiteConfig): SiteData {
  const work = config.projects.map((slug) => {
    const p = data.projects.find((x) => x.slug === slug);
    if (!p) throw new Error(`site.config: project not found: ${slug}`);
    return {
      slug: p.slug, name: p.name, oneLiner: p.oneLiner, tech: p.tech,
      url: !p.private && p.links.repo ? p.links.repo : undefined,
      isPrivate: p.private,
    };
  });

  const experience = config.experience.map((sel) => {
    const e = data.experience.find((x) => x.org === sel.org && x.start === sel.start);
    if (!e) throw new Error(`site.config: experience not found: ${sel.org} (${sel.start})`);
    return { org: e.org, role: e.role, period: period(e.start, e.end), current: e.current, highlights: e.highlights };
  });

  const skills = config.skills.map((cat) => {
    const s = data.skills.find((x) => x.category === cat);
    if (!s) throw new Error(`site.config: skill group not found: ${cat}`);
    return { category: s.category, items: s.items };
  });

  const education = config.education.map((org) => {
    const ed = data.education.find((x) => x.org === org);
    if (!ed) throw new Error(`site.config: education not found: ${org}`);
    return { org: ed.org, credential: ed.credential, period: period(ed.start, ed.end) };
  });

  return {
    profile: {
      name: data.profile.name, title: data.profile.title, location: data.profile.location,
      email: data.profile.email, links: data.profile.links,
    },
    heroPairs: config.heroPairs,
    work,
    experience,
    lines: config.lines,
    about: { paragraphs: config.aboutParagraphs, education },
    skills,
  };
}

const isMain = process.argv[1] === fileURLToPath(import.meta.url);
if (isMain) {
  const out = resolve(dirname(fileURLToPath(import.meta.url)), "..", "site", "src", "site-data.json");
  writeFileSync(out, JSON.stringify(renderSiteData(profileData, siteConfig), null, 2) + "\n", "utf8");
  console.log(`Wrote ${out}`);
}
```

Add to root `package.json` scripts: `"generate:site": "tsx scripts/generate-site-data.ts"`.

- [ ] **Step 4: Run to verify it passes**

Run (root): `npm test -- generate-site-data` → PASS (5). Then `npm run generate:site` → writes `site/src/site-data.json`. Then `npm test` (root) full suite green.

- [ ] **Step 5: Commit**

```bash
git add site/site.config.ts scripts/generate-site-data.ts scripts/__tests__/generate-site-data.test.ts site/src/site-data.json package.json
git commit -m "feat(site): generate site-data.json from dataset"
```

---

### Task 3: Morph engine (state + tokens + control)

**Files:**
- Create: `site/src/morph/morph.ts` (pure helpers), `site/src/morph/MorphProvider.tsx`, `site/src/morph/useMorph.ts`, `site/src/morph/MorphControl.tsx`, `site/src/morph/tokens.css`
- Test: `site/src/morph/__tests__/morph.test.ts`, `site/src/morph/__tests__/MorphControl.test.tsx`

**Interfaces:**
- Produces: `clampT(n: number): number` (clamp to [0,1]); `quantize(t: number): number` (→ nearest of 0/1); `MorphProvider` (writes `--t` to `:root`, persists `morph-t`, quantizes when reduced-motion); `useMorph(): { t: number; setT(n: number): void }`; `<MorphControl/>` (accessible slider).

- [ ] **Step 1: Write the failing tests**

Create `site/src/morph/__tests__/morph.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { clampT, quantize } from "../morph";

describe("morph helpers", () => {
  it("clamps to [0,1]", () => {
    expect(clampT(-0.5)).toBe(0);
    expect(clampT(1.5)).toBe(1);
    expect(clampT(0.37)).toBeCloseTo(0.37);
  });
  it("quantizes to the nearest pole", () => {
    expect(quantize(0.2)).toBe(0);
    expect(quantize(0.8)).toBe(1);
    expect(quantize(0.5)).toBe(1);
  });
});
```

Create `site/src/morph/__tests__/MorphControl.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MorphProvider } from "../MorphProvider";
import { MorphControl } from "../MorphControl";

describe("MorphControl", () => {
  it("is an accessible slider defaulting to the engineer pole", () => {
    render(<MorphProvider><MorphControl /></MorphProvider>);
    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("aria-valuemin", "0");
    expect(slider).toHaveAttribute("aria-valuemax", "100");
    expect(slider).toHaveAttribute("aria-valuenow", "0");
    expect(slider).toHaveAttribute("aria-valuetext");
  });
});
```

- [ ] **Step 2: Run to verify they fail**

Run: `cd site && npm test`
Expected: FAIL — modules not found.

- [ ] **Step 3: Implement**

Create `site/src/morph/morph.ts`:

```ts
export const clampT = (n: number): number => (n < 0 ? 0 : n > 1 ? 1 : n);
export const quantize = (t: number): number => (t < 0.5 ? 0 : 1);
export const STORAGE_KEY = "morph-t";
export const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;
```

Create `site/src/morph/MorphProvider.tsx`:

```tsx
import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { clampT, quantize, STORAGE_KEY, prefersReducedMotion } from "./morph";

export const MorphContext = createContext<{ t: number; setT: (n: number) => void }>({ t: 0, setT: () => {} });

function initialT(): number {
  if (typeof window === "undefined") return 0;
  const saved = Number(window.localStorage?.getItem(STORAGE_KEY));
  const base = Number.isFinite(saved) ? clampT(saved) : 0;
  return prefersReducedMotion() ? quantize(base) : base;
}

export function MorphProvider({ children }: { children: ReactNode }) {
  const [t, setRaw] = useState<number>(initialT);

  const setT = useCallback((n: number) => {
    const next = prefersReducedMotion() ? quantize(clampT(n)) : clampT(n);
    setRaw(next);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--t", String(t));
    document.documentElement.dataset.pole = t < 0.5 ? "engineer" : "poet";
    try { window.localStorage?.setItem(STORAGE_KEY, String(t)); } catch { /* ignore */ }
  }, [t]);

  const value = useMemo(() => ({ t, setT }), [t, setT]);
  return <MorphContext.Provider value={value}>{children}</MorphContext.Provider>;
}
```

Create `site/src/morph/useMorph.ts`:

```ts
import { useContext } from "react";
import { MorphContext } from "./MorphProvider";

export const useMorph = () => useContext(MorphContext);
```

Create `site/src/morph/MorphControl.tsx`:

```tsx
import { useMorph } from "./useMorph";

const label = (t: number) => (t < 0.25 ? "engineer" : t > 0.75 ? "poet" : "engineer ⟷ poet");

export function MorphControl() {
  const { t, setT } = useMorph();
  const now = Math.round(t * 100);
  const onKey = (e: React.KeyboardEvent) => {
    const step = 0.05;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") { setT(t + step); e.preventDefault(); }
    else if (e.key === "ArrowLeft" || e.key === "ArrowDown") { setT(t - step); e.preventDefault(); }
    else if (e.key === "Home") { setT(0); e.preventDefault(); }
    else if (e.key === "End") { setT(1); e.preventDefault(); }
  };
  return (
    <div className="morph-control">
      <span aria-hidden="true">engineer</span>
      <div
        role="slider"
        tabIndex={0}
        aria-label="Morph between engineer and poet"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={now}
        aria-valuetext={label(t)}
        onKeyDown={onKey}
        onPointerDown={(e) => {
          const track = e.currentTarget.getBoundingClientRect();
          const move = (clientX: number) => setT((clientX - track.left) / track.width);
          move(e.clientX);
          const onMove = (ev: PointerEvent) => move(ev.clientX);
          const onUp = () => { window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerup", onUp); };
          window.addEventListener("pointermove", onMove);
          window.addEventListener("pointerup", onUp);
        }}
        className="morph-track"
      >
        <div className="morph-fill" style={{ width: `${now}%` }} />
      </div>
      <span aria-hidden="true">poet</span>
    </div>
  );
}
```

Create `site/src/morph/tokens.css` (the `--t`-keyed token layer — the visual values are refined in Task 5; this establishes the interpolation contract):

```css
:root {
  --t: 0;
  /* density / radius interpolate with --t */
  --radius: calc(var(--t) * 10px);
  --grid-line: calc(1 - var(--t));            /* engineer: visible grid, poet: faded */
  --measure: calc(60ch + var(--t) * 12ch);
  /* type + color tokens are layered in Task 5 (engineer vs poet faces, cool↔warm) */
}
@media (prefers-reduced-motion: reduce) {
  * { transition: none !important; }
}
```

- [ ] **Step 4: Run to verify they pass**

Run: `cd site && npm test` → PASS (morph helpers + MorphControl + smoke). `npm run typecheck` clean.

- [ ] **Step 5: Commit**

```bash
git add site/src/morph
git commit -m "feat(site): morph engine — state, tokens, accessible control"
```

---

### Task 4: Section components (data-driven, semantic)

**Files:**
- Create: `site/src/data.ts`, `site/src/hooks/useGenerateText.ts`, `site/src/sections/Hero.tsx`, `Work.tsx`, `Experience.tsx`, `Lines.tsx`, `About.tsx`, `Contact.tsx`; update `site/src/App.tsx`
- Test: `site/src/sections/__tests__/sections.test.tsx`

**Interfaces:**
- Consumes: `SiteData` (Task 2) via `data.ts`; `useMorph` (Task 3).
- Produces semantic sections rendering real content. Build functional + accessible markup now; **visual styling (classes/CSS) is finalized in Task 5**.

- [ ] **Step 1: Write the failing test**

Create `site/src/sections/__tests__/sections.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MorphProvider } from "../../morph/MorphProvider";
import { Work } from "../Work";
import { Hero } from "../Hero";

const wrap = (ui: React.ReactNode) => render(<MorphProvider>{ui}</MorphProvider>);

describe("sections", () => {
  it("Hero shows the name and the morph slider", () => {
    wrap(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/Enes Kaynakc/);
    expect(screen.getByRole("slider")).toBeInTheDocument();
  });
  it("Work links public projects but renders SIMS without a link", () => {
    wrap(<Work />);
    expect(screen.getByRole("link", { name: /LLMDAP/i })).toHaveAttribute("href", "https://github.com/ekaynac/LLMDAP");
    const sims = screen.getByText(/Smart Inventory Management System/i);
    expect(within(sims.closest("article")!).queryByRole("link")).toBeNull();
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `cd site && npm test` → FAIL (modules not found).

- [ ] **Step 3: Implement**

Create `site/src/data.ts`:

```ts
import siteData from "./site-data.json";
import type { SiteData } from "../../scripts/generate-site-data";
export const data = siteData as SiteData;
```

Create `site/src/hooks/useGenerateText.ts` (token-by-token reveal; respects reduced-motion by returning the full text):

```ts
import { useEffect, useState } from "react";
import { prefersReducedMotion } from "../morph/morph";

export function useGenerateText(text: string, speedMs = 28): string {
  const [shown, setShown] = useState(prefersReducedMotion() ? text : "");
  useEffect(() => {
    if (prefersReducedMotion()) { setShown(text); return; }
    setShown("");
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speedMs);
    return () => clearInterval(id);
  }, [text, speedMs]);
  return shown;
}
```

Create `site/src/sections/Hero.tsx`:

```tsx
import { data } from "../data";
import { useMorph } from "../morph/useMorph";
import { useGenerateText } from "../hooks/useGenerateText";
import { MorphControl } from "../morph/MorphControl";

export function Hero() {
  const { t } = useMorph();
  const pair = data.heroPairs[0];
  const phrase = t < 0.5 ? pair.engineer : pair.poet;
  const shown = useGenerateText(phrase);
  return (
    <section className="hero" aria-labelledby="hero-name">
      <h1 id="hero-name">{data.profile.name}</h1>
      <p className="hero-line" aria-live="polite">{shown}</p>
      <p className="hero-tagline">{data.profile.title} · {data.profile.location}</p>
      <MorphControl />
      <nav className="hero-links" aria-label="Profile links">
        <a href={data.profile.links.github}>GitHub</a>
        <a href={data.profile.links.linkedin}>LinkedIn</a>
        <a href="/cv.pdf">CV</a>
        <a href={`mailto:${data.profile.email}`}>Email</a>
      </nav>
    </section>
  );
}
```

Create `site/src/sections/Work.tsx`:

```tsx
import { data } from "../data";

export function Work() {
  return (
    <section className="work" aria-labelledby="work-h">
      <h2 id="work-h">Work</h2>
      <div className="work-grid">
        {data.work.map((p) => (
          <article key={p.slug} className="project-card">
            <h3>{p.url ? <a href={p.url}>{p.name}</a> : p.name}{p.isPrivate && <span className="badge"> private</span>}</h3>
            <p>{p.oneLiner}</p>
            <ul className="tech">{p.tech.slice(0, 6).map((tag) => <li key={tag}>{tag}</li>)}</ul>
          </article>
        ))}
      </div>
    </section>
  );
}
```

Create `site/src/sections/Experience.tsx`:

```tsx
import { data } from "../data";

export function Experience() {
  return (
    <section className="experience" aria-labelledby="exp-h">
      <h2 id="exp-h">Experience</h2>
      <ul className="exp-list">
        {data.experience.map((e) => (
          <li key={`${e.org}-${e.period}`}>
            <div className="exp-head"><strong>{e.role}</strong>, {e.org} <span className="period">{e.period}</span></div>
            <ul>{e.highlights.slice(0, 2).map((h, i) => <li key={i}>{h}</li>)}</ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

Create `site/src/sections/Lines.tsx`:

```tsx
import { data } from "../data";

export function Lines() {
  return (
    <section className="lines" aria-labelledby="lines-h">
      <h2 id="lines-h">Lines</h2>
      <blockquote className="verse">
        {data.lines.verse.map((line, i) => <p key={i}>{line}</p>)}
      </blockquote>
      <p className="verse-note">{data.lines.note}</p>
    </section>
  );
}
```

Create `site/src/sections/About.tsx`:

```tsx
import { data } from "../data";

export function About() {
  return (
    <section className="about" aria-labelledby="about-h">
      <h2 id="about-h">About</h2>
      {data.about.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
      <ul className="education">
        {data.about.education.map((ed) => (
          <li key={ed.org}><strong>{ed.credential}</strong>, {ed.org} <span className="period">{ed.period}</span></li>
        ))}
      </ul>
    </section>
  );
}
```

Create `site/src/sections/Contact.tsx`:

```tsx
import { data } from "../data";

export function Contact() {
  return (
    <section className="contact" aria-labelledby="contact-h">
      <h2 id="contact-h">Contact</h2>
      <p>
        <a href={`mailto:${data.profile.email}`}>{data.profile.email}</a> ·{" "}
        <a href={data.profile.links.github}>GitHub</a> ·{" "}
        <a href={data.profile.links.linkedin}>LinkedIn</a>
      </p>
    </section>
  );
}
```

Update `site/src/App.tsx`:

```tsx
import { MorphProvider } from "./morph/MorphProvider";
import "./morph/tokens.css";
import { Hero } from "./sections/Hero";
import { Work } from "./sections/Work";
import { Experience } from "./sections/Experience";
import { Lines } from "./sections/Lines";
import { About } from "./sections/About";
import { Contact } from "./sections/Contact";

export default function App() {
  return (
    <MorphProvider>
      <main>
        <Hero />
        <Work />
        <Experience />
        <Lines />
        <About />
        <Contact />
      </main>
    </MorphProvider>
  );
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `cd site && npm test` → PASS (sections + morph + smoke). `npm run build` → succeeds.

- [ ] **Step 5: Commit**

```bash
git add site/src
git commit -m "feat(site): data-driven semantic sections"
```

---

### Task 5: Visual art direction (OpenDesign-driven) + integration

**Files:** `site/src/morph/tokens.css`, `site/src/styles/*.css`, section component class/markup refinements, fonts under `site/public/fonts/` + `site/src/styles/fonts.css`.

**This task is iterative and human-in-the-loop — not TDD.** It applies a designer-grade look to the functional app from Tasks 1–4.

- [ ] **Step 1: Pre-flight — OpenDesign daemon**

Verify the OpenDesign daemon is reachable (controller: `mcp__open-design__list_projects`). If unreachable, STOP and ask the user to fix the connection (see plan's Fallback note). Do not fake the visual step.

- [ ] **Step 2: Generate art direction in OpenDesign**

`create_project` ("enes-site"), then `start_run` with an art-directed brief built from the design spec (`docs/superpowers/specs/2026-06-24-website-design.md`): the `t`-morph mechanic, the two poles (engineer mono/grid/cool ⇄ poet serif/open/warm), the token system, the section list, sample content from `site-data.json`, AA-contrast + reduced-motion requirements, and a request for: a type pairing, a monochrome+temperature palette with one accent, the morph slider treatment, and the Hero/Work/Lines layouts. Poll `get_run` → `get_artifact`.

- [ ] **Step 3: Review the rendered artifact WITH the user**

Show the user the OpenDesign result. Iterate (`write_file`/follow-up `start_run`) until they approve the look and the morph feel at both poles.

- [ ] **Step 4: Integrate into the app**

Port the approved art direction into `tokens.css` (the `--t`-keyed type/color/space interpolation), `site/src/styles/*`, and section classes — keeping the Task 1–4 structure, data flow, and a11y intact. Self-host + subset the chosen fonts into `site/public/fonts/` with `font-display: swap`.

- [ ] **Step 5: Verify craft**

- `cd site && npm test` (all green — structure/a11y unchanged) and `npm run build`.
- Manually verify: AA contrast at `t=0` and `t=1` (light + dark); keyboard-only morph; `prefers-reduced-motion` → discrete toggle, no shimmer; layout holds 360–1440px.
- Run Lighthouse on `npm run preview`; target ≥ 95 across categories. Record scores in the commit body.

- [ ] **Step 6: Commit**

```bash
git add site/src site/public
git commit -m "feat(site): designer-grade art direction via OpenDesign"
```

---

### Task 6: Build pipeline, deploy to Pages, wire URL back

**Files:** Create `.github/workflows/site.yml`; modify `cv/cv.config.ts` + `readme/readme.config.ts` (surface the now-live website link).

- [ ] **Step 1: GitHub Pages build/deploy workflow**

Create `.github/workflows/site.yml`:

```yaml
name: Deploy Site
on:
  push:
    branches: [master]
    paths: ["site/**", "content/**", "scripts/generate-site-data.ts", ".github/workflows/site.yml"]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: true
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: "22" }
      - name: Generate site data
        run: npm ci && npm run generate:site
      - name: Build site
        run: cd site && npm ci && npm run build
      - name: Copy CV into site output
        run: cp public/cv.pdf site/dist/cv.pdf
      - uses: actions/upload-pages-artifact@v3
        with: { path: site/dist }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment: { name: github-pages, url: "${{ steps.deployment.outputs.page_url }}" }
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Validate the workflow YAML**

Run: `node -e "const s=require('fs').readFileSync('.github/workflows/site.yml','utf8');['deploy-pages','upload-pages-artifact','generate:site'].forEach(k=>{if(!s.includes(k))throw new Error('missing '+k)});console.log('ok')"`
Expected: `ok`.

- [ ] **Step 3: Surface the website link (now that it will be live)**

In `cv/cv.config.ts`, the header already has GitHub/LinkedIn/email; add the website to the header rendering only if straightforward — otherwise leave the CV as-is (the dataset already stores `profile.links.website`). In `readme/readme.config.ts`, add `"website"` to the `connect` array. Run `npm run generate:cv && npm run generate:readme` (root), `npm test` green, commit.

```bash
git add readme/readme.config.ts readme/README.md cv/cv.config.ts cv/resume.tex public/cv.pdf .github/workflows/site.yml
git commit -m "feat(site): Pages deploy workflow; surface website link"
```

- [ ] **Step 4: Enable Pages + flip repo public (controller, after user OK)**

These are outward-facing — confirm with the user first.
- `gh repo edit ekaynac/ekaynac.github.io --visibility public --accept-visibility-change-consequences`
- Push `master`; ensure Pages source = GitHub Actions (`gh api -X POST repos/ekaynac/ekaynac.github.io/pages -f build_type=workflow` or set in repo settings).
- Wait for the Action; verify `https://ekaynac.github.io` loads and the morph works.
- Redeploy the README/CV (already pushed) so the live link resolves.

---

## Self-Review

**Spec coverage:** concept/morph (Tasks 3,5) · token design system (3,5) · sections (4) · content from dataset incl. SIMS-private + poetry placeholder (2) · a11y/reduced-motion (3,4,5) · perf/fonts (5) · tech Vite/React static (1) · OpenDesign workflow (5) · Pages deploy + URL wire-back (6) · success criteria (5,6). ✅

**Placeholder scan:** the only `PLACEHOLDER:` is the poetry verse — an explicit, spec'd content dependency with a guard noted in Global Constraints; not a plan gap. No TODO/TBD in steps.

**Type consistency:** `SiteData` defined in Task 2 is imported by Task 4 (`data.ts`) and asserted in tests; `clampT/quantize/useMorph/MorphControl` names consistent across Tasks 3–4; `renderSiteData` signature consistent between generator and test.

**Fallback (daemon down):** If OpenDesign stays unreachable, Task 5 becomes controller-driven art direction — I design the token/type/color/motion layer directly to the same spec, still reviewed with the user. Tasks 1–4 and 6 are unaffected. This keeps the website unblocked while preferring OpenDesign when available.

**Scope note:** Larger than prior phases but one cohesive deliverable. If execution drags, Task 5 (visual) can split from 1–4 (functional foundation) into its own review cycle.
