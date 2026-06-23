# Personal Brand Refresh — Design Spec

**Date:** 2026-06-23
**Owner:** Enes Kaynakcı (GitHub: [ekaynac](https://github.com/ekaynac), LinkedIn: [enes-kaynakci](https://www.linkedin.com/in/enes-kaynakci/))
**Status:** Approved approach — pending spec review

---

## 1. Goal & Context

Refresh Enes's professional presence across **four channels** — CV, LinkedIn, GitHub profile, and a **new personal website** — from a single, consistent source of truth.

**Primary driver:** Passive discoverability. Not an urgent job hunt; the aim is a polished, current, accurate presence so opportunities find him.

**Core problem:** The existing assets have **drifted out of sync** and are stale:
- `cv.md` (LaTeX résumé, March 2026) lists Mega Bilgisayar as *past* (2024), but Enes is **currently there**.
- 2025–2026 work is missing everywhere: the current Mega body of work (VestDetectionSystem/Advantech, BukaUI, the BukaForces portal suite, LLMDAP, onprem-ai-adoption-radar), client sites (Polemik, tolga.com, MDF/fanzine), etc.
- The GitHub profile README (`ekaynac/ekaynac`) is decent but equally stale.

**Strategic decisions (confirmed with user):**

| Decision | Choice |
|---|---|
| Primary goal | Passive / be discoverable |
| Target market | Both Turkey + International |
| Positioning | **AI-leaning full-stack** (lead AI/LLM, show end-to-end product delivery) |
| Website | Yes — build it |
| Hosting | **GitHub Pages** (Next.js static export) |
| Domain | Free subdomain for now → `ekaynac.github.io`; custom domain later |
| Privacy of client/employer work | **Name everything freely** (still avoid leaking secrets/credentials) |
| Current role | **Currently at Mega Bilgisayar** (exact title + start date TBC in Phase 0) |

---

## 2. Architecture: One Source of Truth → Derived Assets

**Chosen approach: A — Monorepo + shared content.**

A single repo (`ekaynac.github.io`) holds a typed content dataset that is the **single source of truth**. The website renders it; the CV, README, and LinkedIn copy are generated/kept in sync from the same data. This directly fixes the drift problem: future updates mean editing one place, not four.

```
ekaynac.github.io/                 (local: /Users/eneskaynakci/Github/CV)
├── content/                       # SINGLE SOURCE OF TRUTH (typed data)
│   ├── profile.ts                 # name, headline, contact, links, summary
│   ├── experience.ts              # roles (Mega, Mia, Meturone, ...)
│   ├── projects.ts                # featured projects (+ repo links, tags, private flag)
│   ├── skills.ts                  # grouped skills
│   ├── education.ts               # Bilkent, Hagenberg, METU
│   └── leadership.ts              # societies, Polemik, publications
├── MASTER-PROFILE.md              # human-readable mirror of the dataset
├── cv/                            # LaTeX résumé (Jake Gutierrez template)
│   └── resume.tex
├── linkedin/                      # copy-paste LinkedIn pack
│   └── linkedin-pack.md
├── app/ or src/                   # Next.js website
├── public/cv.pdf                  # compiled CV, downloadable from site
└── .github/workflows/             # CV compile (Tectonic) + Pages deploy
```

Rejected: **B** (separate assets, manual sync — guarantees future drift) and **C** (website only — doesn't refresh the CV/LinkedIn/README text the user asked for).

---

## 3. Phased Design

Delivery is phased; **Phase 0 first** (user-confirmed). Each later phase consumes the Phase 0 dataset.

### Phase 0 — Source of Truth *(foundation, do first)*

**Goal:** Produce the canonical dataset every other asset derives from.

**Work:**
1. Mine inputs:
   - `AFERİN` folder (CVs, transcripts, certificates, evaluation forms, feedback docs).
   - All 47 GitHub repos (public + private) — descriptions, READMEs, languages, recency, to extract real project facts.
   - Existing `cv.md` and `ekaynac/ekaynac` README.
2. Synthesize into `content/*.ts` (typed) **and** `MASTER-PROFILE.md` (readable mirror).
3. **Confirm with user** the facts that can't be safely inferred:
   - Exact Mega Bilgisayar **title** + **start date** (and full-time/contract).
   - Which **contact details** to expose publicly (website is public; CV currently uses `tensorenes@gmail.com` + phone — decide public email, whether phone appears, whether to use the Bilkent address).
   - Whether a **professional headshot** exists / should be used.
   - **Top 4–6 projects** to feature as flagship.
   - Graduation status/date (graduation transcript files dated 2026-06-23 suggest just graduated — confirm).

**Deliverable:** `content/*.ts` + `MASTER-PROFILE.md`, reviewed and approved.

### Phase 1 — CV

**Goal:** A current, ATS-friendly, AI-leaning-full-stack résumé PDF.

**Work:**
- Keep the proven **LaTeX template** (Jake Gutierrez style already in `cv.md`) → `cv/resume.tex`.
- Repopulate from the Phase 0 dataset: add current Mega role, 2025–26 projects, reframe summary/skills toward AI-leaning full-stack; keep to 1 page.
- **Compile path (no local LaTeX):** GitHub Action using **Tectonic** compiles `resume.tex` → `public/cv.pdf` on push. PDF is downloadable from the website and attachable to applications.

**Deliverable:** `cv/resume.tex` + auto-built `public/cv.pdf`.

### Phase 2 — GitHub Profile README

**Goal:** `ekaynac/ekaynac` README reflects current role + flagship projects + AI-leaning framing.

**Work:** Regenerate the README from the dataset (sections: intro, current focus, flagship projects, tech stack, past work, beyond code, connect). Keep the existing tasteful structure; update content + links.

**Deliverable:** Updated `ekaynac/ekaynac/README.md` (pushed via gh/MCP).

### Phase 3 — Website *(design TBD with user at this phase)*

**Goal:** A personal site on `ekaynac.github.io` that does "something interesting" (creative direction to be brainstormed when we reach this phase — user explicitly deferred it).

**Locked constraints:**
- Stack: **Next.js + TypeScript + Tailwind + framer-motion** (matches `tolga.com`).
- `output: export` (static) → **GitHub Pages** via GitHub Actions.
- Renders the Phase 0 content dataset; hosts `/cv.pdf`.
- Baseline sections: Hero, About, Experience, Projects, Skills, Contact + CV download — but the *creative concept/interaction* is an open design question for Phase 3.

**Deliverable:** Deployed site at `https://ekaynac.github.io`.

### Phase 4 — LinkedIn Pack

**Goal:** Make the LinkedIn update a 10-minute copy-paste job.

**Work:** LinkedIn has no profile-edit API, so produce `linkedin/linkedin-pack.md`: optimized headline, About section, per-role experience bullets, featured projects, skills list, plus a "where to paste each piece" checklist.

**Deliverable:** `linkedin/linkedin-pack.md`.

---

## 4. Tooling Decisions

- **CV compile:** Tectonic via GitHub Action (local machine has no `pdflatex`/`tectonic`/`pandoc`). Keeps PDF reproducible without local TeX install.
- **Website build:** Next.js `output: export`; deploy with `actions/deploy-pages`.
- **GitHub writes:** `gh` CLI + GitHub MCP (authenticated as `ekaynac`, `repo` scope — private repos visible).
- **Repo:** local `/Users/eneskaynakci/Github/CV` → new remote `ekaynac.github.io` (user Pages site). Profile README stays in its own `ekaynac` repo.

## 5. Privacy Handling

User chose "name everything freely." Projects and clients (Mega, BukaForces, Polemik, tolga.com, MDF) may be named publicly. **Still:** never expose secrets, credentials, internal URLs, or confidential implementation details from private repos. Describe *what was built and its impact*, not proprietary internals.

## 6. Non-Goals (this round)

- Custom domain purchase/DNS (deferred — free subdomain first).
- Automated LinkedIn profile editing (no API; manual paste).
- Reworking/refactoring the client project repos themselves.
- A blog/CMS on the website (can be added later).

## 7. Success Criteria

- One dataset drives all assets; updating a fact means editing one file.
- CV PDF is current (Mega role + 2025–26 work), 1 page, ATS-parseable, auto-built.
- GitHub profile README and LinkedIn pack match the CV.
- Website live on `ekaynac.github.io`, renders the dataset, offers CV download.
- All four channels tell one consistent "AI-leaning full-stack engineer" story.
