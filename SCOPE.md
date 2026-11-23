# Site / CV · Kapsam sözleşmesi (SCOPE.md)

## Kimlik
- **Bu repo:** Enes Kaynakcı's public professional presence — CV PDF, personal site, GitHub profile README
  (published to `ekaynac/ekaynac`), LinkedIn pack — generated from one typed dataset (`content/*.ts`).
- **Bu repo değildir:** a portfolio of the projects it describes, a blog/CMS, or a place where they are built.
- **Neden ayrı bir proje:** it only *narrates* other projects (PORTFOLIO §2 "Site ↔ diğer projeler");
  it is public and every merge goes live.

## Çekirdek (değişmezler)
- **C1** Single source of truth: facts live only in `content/*.ts`. Generated, never hand-edited:
  MASTER-PROFILE.md, `cv/resume.tex`, `public/cv.pdf`, `readme/README.md`, `site/src/site-data.json`.
  Hand-maintained (only exception): `linkedin/linkedin-pack.md`, `coverletter/cover-letter-base.md`.
- **C2** Public repo, no personal data: no phone, address, ID, salary, secrets, internal URLs or local paths in
  code, outputs, issues, PRs or commits; the phone exists only in the gitignored private build (`docs/cv-builds.md`).
- **C3** A claim about a portfolio project never contradicts that project's SCOPE.md Kimlik. The source of every
  number and claim is Enes's approval.
- **C4** The public CV stays one page, ATS-parseable, built and linted in CI.
- **C5** One story: CV, site, profile README and the hand-maintained packs never contradict `content/`.

## Kapsam içi (yetenekler)
- **K1** Generators (`scripts/generate-*.ts`) and their tests.
- **K2** CV template/config (`cv/`) and the ATS lint (`scripts/ats-lint.ts`).
- **K3** Site code (`site/`, Vite + React) rendering the dataset; fixes and small UI changes. A visual redesign is always B.
- **K4** Content schema and validation (`content/schema.ts`, content tests).
- **K5** Content sync: reads repos Enes lists and *proposes* changes (always B); never writes `content/` without
  approval; private-repo information enters only in wording Enes approved, never internals.
- **K6** Profile README: generated in `readme/`, published to `ekaynac/ekaynac` (only that file) with Enes's approval per push.
- **K7** Keeping the hand-maintained packs (C1) consistent with `content/`; `[TODO]` sections are Enes's own words,
  never filled by the agent.
- **K8** *(maintenance)* CI definitions and dependencies — never cited for new behavior; always B.
- **K9** *(maintenance)* This SCOPE.md and the canonical documents listed in "Kanon" (and `docs/superpowers/`): edits only
  on Enes's explicit decision; always B2; never cited for new behavior or content claims.

## Kapsam dışı
- **D1** Changing the projects the site describes → that project's repo (PORTFOLIO §1).
- **D2** Serving tensorenes.com, lab.tensorenes.com, Cloudflare, DNS → homelab (homelab-dev), via an
  `[istek: site-dev]` issue on `ekaynac/homelab`.
- **D3** Editing LinkedIn itself (no API) → Enes, by hand from `linkedin/linkedin-pack.md`.
- **D4** Blog/CMS → not done (spec §6).
- **D5** Canon-backlog items and a separate artist portfolio → parked; lifting this is a SCOPE change.
- **D6** Migrating the site to Next.js/Tailwind (historical spec stack) → not done.
- **D7** Private application artefacts (`private.*`, `coverletter/letters/`) → never committed.

## Sınırlar ve arayüzler
- **Sunduğu sözleşmeler:** `public/cv.pdf` (served at `/cv.pdf`), `readme/README.md` (→ `ekaynac/ekaynac`), the built site.
- **Kullandığı dış sözleşmeler:** each portfolio project's SCOPE.md Kimlik; Radar's `pulse.v1.json` as a
  narrative source only (not read at build or runtime; reading it would be a new interface, B). A Kimlik change
  arrives as an `[istek]` from the system owner (PORTFOLIO §6) and is at least B. Homelab serves the
  tensorenes.com copy of this site; how a merge reaches it is homelab's (deploy gate) — *not verified*.
- **Dokunabildiği:** this repo; `ekaynac/ekaynac` README per K6. **Dokunmadığı:** other repos' code, homelab
  (requests go as `[istek]`), DNS/Cloudflare, LinkedIn, `private.*` files, GitHub Pages settings, guardrails
  (spark-hub, `spark-inceleme`).
- **Merge = canlı yayın mı?** **Evet** — merge to `master` deploys ekaynac.github.io (`site.yml`); a push to
  `ekaynac/ekaynac` updates the live profile. Every merge and push needs Enes's approval.

## Kanon
| Konu | Esas belge |
|---|---|
| Facts | `content/*.ts` |
| Public vs private CV | `docs/cv-builds.md` |
| Approved but unpublished | `docs/canon-backlog.md` |
| Strategy, channels, non-goals | `docs/superpowers/specs/2026-06-23-personal-brand-refresh-design.md` |

Historical (not used as justification): the spec's Next.js/Tailwind stack and `ekaynac.github.io`-only domain lines;
`docs/superpowers/plans/*`.

## Değişiklik kaydı
- 2026-11-18 · v1 · Enes approval · #3
- 2026-11-23 · v1.1 · K9 added (canonical document maintenance) · Enes approval · #9
