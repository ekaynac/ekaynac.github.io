# Phase 2 — GitHub Profile README (generated from dataset) · Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Generate a clean, minimal GitHub profile README for `ekaynac/ekaynac` from the Phase 0 dataset, then deploy it to that repo.

**Architecture:** A `readme/readme.config.ts` view layer selects intro copy, featured projects, brief experience blurbs, skill groups, the "beyond code" line, and connect links. `scripts/generate-readme.ts` renders `readme/README.md` from `profileData` + the config (markdown; no live widgets). The file is committed in `ekaynac.github.io` (source-tracked) and then pushed to the separate `ekaynac/ekaynac` repo's `main` branch.

**Tech Stack:** TypeScript (ESM), Vitest, tsx — all already set up.

## Global Constraints

- Builds on the merged Phase 0/1 work in `ekaynac.github.io`. `content/index.ts` exports `profileData`. Do NOT modify `content/` data.
- Clean & minimal style: prose + links, no shields/stats widgets.
- Public repos get a markdown link; **private** projects (SIMS) are named with ` _(private)_` and **no** link. Generator pulls `links.repo`/`private` from the dataset.
- **No website link yet** (site deploys in Phase 3). Connect line = LinkedIn + Email only.
- Generator throws if a config reference (project slug / skill category / experience `{org,start}`) doesn't resolve.
- Deploy target: `ekaynac/ekaynac`, branch **`main`**, file `README.md` (the repo currently contains only that file). Deploy only after user approval.
- ESM, extensionless imports, conventional commits.

---

### Task 1: README config + generator

**Files:**
- Create: `readme/readme.config.ts`
- Create: `scripts/generate-readme.ts`
- Test: `scripts/__tests__/generate-readme.test.ts`
- Generate: `readme/README.md`
- Modify: `package.json` (add `generate:readme` script), `vitest.config.ts` (include is already `content/**`, `scripts/**`, `cv/**` — `scripts/**` covers the new test, no change needed)

**Interfaces:**
- Produces `interface ReadmeConfig`, `const readmeConfig`, and `renderReadme(data: ProfileData, config: ReadmeConfig): string`.

- [ ] **Step 1: Write the failing test**

Create `scripts/__tests__/generate-readme.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { renderReadme } from "../generate-readme";
import { profileData } from "../../content/index";
import { readmeConfig } from "../../readme/readme.config";

describe("renderReadme", () => {
  const md = renderReadme(profileData, readmeConfig);

  it("starts with the greeting H1", () => {
    expect(md.startsWith("# Hi, I'm Enes Kaynakcı")).toBe(true);
  });
  it("has the expected sections", () => {
    for (const h of ["## What I'm working on", "## Tech", "## Experience", "## Beyond code", "## Connect"]) {
      expect(md).toContain(h);
    }
  });
  it("links public projects but not the private SIMS", () => {
    expect(md).toContain("[LLMDAP — LLM Directory-bound Access Protection](https://github.com/ekaynac/LLMDAP)");
    expect(md).toContain("_(private)_"); // SIMS
    expect(md).not.toContain("](https://github.com/sims-1/sims)");
  });
  it("includes the current role and the ICAT paper", () => {
    expect(md).toContain("Mega Bilgisayar");
    expect(md).toContain("Hallux Valgus");
  });
  it("connect line has LinkedIn + Email but no website link", () => {
    expect(md).toContain("https://www.linkedin.com/in/enes-kaynakci/");
    expect(md).toContain("mailto:tensorenes@gmail.com");
    expect(md).not.toContain("https://ekaynac.github.io");
  });
  it("throws on an unknown project slug", () => {
    expect(() => renderReadme(profileData, { ...readmeConfig, projects: ["nope"] })).toThrow(/project not found/);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- generate-readme`
Expected: FAIL — `Cannot find module '../generate-readme'`.

- [ ] **Step 3: Write minimal implementation**

Create `readme/readme.config.ts`:

```ts
export interface ReadmeExperienceSelection {
  org: string;
  start: string;
  blurb: string;
}

export interface ReadmeConfig {
  intro: string;
  projects: string[];
  experience: ReadmeExperienceSelection[];
  skillGroups: string[];
  beyondCode: string;
  connect: Array<"linkedin" | "email" | "github" | "website">;
}

export const readmeConfig: ReadmeConfig = {
  intro:
    "AI-leaning full-stack engineer. I build LLM and agent pipelines, computer-vision systems, and full-stack products — currently building on-prem AI platforms at Mega Bilgisayar. Bilkent University Information Systems graduate (2026).",
  projects: ["llmdap", "onprem-ai-adoption-radar", "sims", "etch-a-chat"],
  experience: [
    { org: "Mega Bilgisayar", start: "2026-05-18", blurb: "On-prem LLM platforms, agent tooling, and computer-vision systems." },
    { org: "Mia Teknoloji", start: "2025-02", blurb: "End-to-end LLM and RAG pipelines (100/100 internship evaluation)." },
    { org: "Meturone (Fixed-wing UAV Team)", start: "2021-09", blurb: "Real-time aerial perception; Teknofest UAV finalist (2021 & 2022)." },
  ],
  skillGroups: ["Languages", "AI & ML", "Web & Mobile", "Infrastructure & Tools"],
  beyondCode:
    "Founder of Bilkent Game Development & Animation Society; President of Bilkent Literature Society; founding poetry editor at Polemik Yayınları; published poet.",
  connect: ["linkedin", "email"],
};
```

Create `scripts/generate-readme.ts`:

```ts
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import type { ProfileData, Project } from "../content/schema";
import { profileData } from "../content/index";
import { readmeConfig, type ReadmeConfig } from "../readme/readme.config";

function findProject(data: ProfileData, slug: string): Project {
  const p = data.projects.find((x) => x.slug === slug);
  if (!p) throw new Error(`readme.config: project not found: ${slug}`);
  return p;
}
function findSkill(data: ProfileData, category: string) {
  const s = data.skills.find((x) => x.category === category);
  if (!s) throw new Error(`readme.config: skill group not found: ${category}`);
  return s;
}
function findExperience(data: ProfileData, org: string, start: string) {
  const e = data.experience.find((x) => x.org === org && x.start === start);
  if (!e) throw new Error(`readme.config: experience not found: ${org} (${start})`);
  return e;
}

export function renderReadme(data: ProfileData, config: ReadmeConfig): string {
  const p = data.profile;
  const lines: string[] = [];

  lines.push(`# Hi, I'm ${p.name}`, "");
  lines.push(`**${p.title}** · ${p.location}`, "");
  lines.push(config.intro, "");

  lines.push("## What I'm working on", "");
  for (const slug of config.projects) {
    const pr = findProject(data, slug);
    const name = pr.links.repo ? `[${pr.name}](${pr.links.repo})` : pr.name;
    const priv = pr.private ? " _(private)_" : "";
    lines.push(`- **${name}**${priv} — ${pr.oneLiner}`);
  }
  lines.push("");

  lines.push("## Tech", "");
  for (const cat of config.skillGroups) {
    const s = findSkill(data, cat);
    lines.push(`**${s.category}:** ${s.items.join(", ")}  `);
  }
  lines.push("");

  lines.push("## Experience", "");
  for (const sel of config.experience) {
    const e = findExperience(data, sel.org, sel.start);
    lines.push(`- **${e.role}**, ${e.org} — ${sel.blurb}`);
  }
  for (const pub of data.publications) {
    const title = pub.url ? `[${pub.title}](${pub.url})` : pub.title;
    lines.push(`- **Paper:** ${title} — ICAT ${pub.year}`);
  }
  lines.push("");

  lines.push("## Beyond code", "", config.beyondCode, "");

  lines.push("## Connect", "");
  const linkFns: Record<string, string> = {
    linkedin: `[LinkedIn](${p.links.linkedin})`,
    email: `[Email](mailto:${p.email})`,
    github: `[GitHub](${p.links.github})`,
    website: `[Website](${p.links.website})`,
  };
  lines.push(config.connect.map((k) => linkFns[k]).join(" · "), "");

  return lines.join("\n").replace(/\n{3,}/g, "\n\n").trimEnd() + "\n";
}

const isMain = process.argv[1] === fileURLToPath(import.meta.url);
if (isMain) {
  const out = resolve(dirname(fileURLToPath(import.meta.url)), "..", "readme", "README.md");
  writeFileSync(out, renderReadme(profileData, readmeConfig), "utf8");
  console.log(`Wrote ${out}`);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- generate-readme`
Expected: PASS (6 tests). Then `npm test` full suite green; `npm run typecheck` clean.

- [ ] **Step 5: Add npm script and generate**

Add to `package.json` scripts: `"generate:readme": "tsx scripts/generate-readme.ts"`.
Run: `npm run generate:readme` → prints `Wrote …/readme/README.md`. Confirm the file looks complete.

- [ ] **Step 6: Commit**

```bash
git add readme/ scripts/generate-readme.ts scripts/__tests__/generate-readme.test.ts package.json
git commit -m "feat: generate GitHub profile README from dataset"
```

---

## Deploy (controller-driven, AFTER user approval — not a code task)
1. Show the user `readme/README.md`.
2. On approval: clone `ekaynac/ekaynac` to scratch, copy `readme/README.md` → `README.md`, commit (`docs: refresh profile README`), push to `main`.
3. Verify the rendered profile at github.com/ekaynac.

## Self-Review
- Spec coverage: generate-from-dataset (Task 1), clean/minimal (no widgets), SIMS-private no-link (test asserts), no website link (test asserts), throws on bad ref (test asserts). ✅
- The README repo (`ekaynac/ekaynac`) is separate and public; deploy step targets its `main` branch.
