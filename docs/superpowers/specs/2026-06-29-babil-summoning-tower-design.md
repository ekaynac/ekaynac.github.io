# BÂBİL — *The Summoning Tower* · Website Design Spec

**Date:** 2026-06-29
**Owner:** Enes Kaynakcı
**Phase:** 3 (website) — supersedes `2026-06-24-website-design.md` (the minimal "Duality Morph"). The morph survives, reincarnated as **code ⇄ incantation**.
**Status:** Concept approved (full mythic immersive; weave all three interactions). Spec drafting → review.

> *"Bir sistem kurmak, bir cin doğurmaktır."* — To build a system is to birth a djinn.

---

## 1. Vision

A personal site that is not a portfolio but a **living codex**: a **Tower of Babel built and inhabited by djinn**, drawn in the ink-language of **Mehmed Siyah Kalem**, framed like a Timurid illuminated manuscript. Enes is the **summoner-architect** — the engineer who *raises the tower* (births djinn / systems) and the poet who *writes the lines* (incantations) that **bind** them.

**The threads, woven into one idea:**
- **Babel = language = the model.** Bruegel's doomed monument is also the myth of many tongues / one tower — i.e. translation, tokens, LLMs. *Tokens are the bricks; the model is the djinn that speaks every tongue.* Enes's actual work (RAG, Zemberek morphology, MCP agents) is Babel made literal.
- **Siyah Kalem's djinn = the projects.** Each system is a named ink-spirit bound into a floor of the tower. **LLMDAP** binds agents *by their true names via LDAP* — the oldest magic. SIMS, the Adoption Radar, Etch-A-Chat each get a sigil and a djinn.
- **Engineer ⇄ Poet = code ⇄ incantation.** The same content flips between the tower-as-**blueprint** (terminal, schematic, cold ink) and the tower-as-**illumination** (gold-leaf verse, djinn alive, warm pigment).

## 2. Experience Architecture (the journey)

A single, vertical, scroll-and-summon journey. Sections are **floors of the tower**, ascending.

0. **Threshold / cold open.** A dark parchment field; ink stirs; a single line writes itself — *"Bir sistem kurmak, bir cin doğurmaktır."* A sigil/seal and the name **Enes Kaynakcı**. One clear call: *enter* (and a discreet *read the plain CV →* escape hatch, always reachable). No audio autoplay.
1. **Foundation (Hero).** The tower's base. Name, the dual-identity line, the global **code⇄incantation** control (the seam/morph reborn as a ritual instrument), and the drag/scroll invitation.
2. **The Bound (Work).** Ascending courses; each **project = a djinn** bound into a floor — a Siyah-Kalem ink figure + sigil + true name. **Summon** it (hover/voice/sigil-trace) to reveal the system it is. SIMS is *sealed* (private — bound but unshowable; a veiled sigil, no link).
3. **The Raising (Experience).** Bruegel's cranes and scaffolds: roles as the labor that raised the tower (Mega, Mia — *100/100*, Meturone — *Teknofest*). Djinn-laborers haul glyph-stones as you scroll.
4. **Lines (the incantations).** The poet's floor — illuminated verse; strongest, most golden at the incantation pole. *Uyandı Uyudu*, Polemik.
5. **The Architect (About).** Two voices, one practice. Education as the architect's lineage.
6. **The Seal (Contact).** The tower's crown; a final sigil; ways to reach the summoner. *"Let's build something, or write it."*

**Escape hatch (non-negotiable):** a persistent, obvious **"Plain CV / read normally"** door that drops any visitor into a clean, fast, accessible linear reading of the same content (and the `cv.pdf`). The myth is the front door, not a cage.

## 3. The Three Interaction Systems (woven)

**A. Ascend / build Babel (scroll).** Scroll = construction. The tower assembles course by course as you descend the page; parallax strata, drifting djinn-laborers, cranes. Each floor "sets" as it enters view. Reduced-motion → the tower is simply *already built*; sections appear statically.

**B. Summon the djinn (voice + sigil + pointer).** Each project-djinn is *summoned* to reveal its detail, via any of:
- **Voice** — speak its true name / an incantation (browser **Web Speech API**, client-side; Turkish + English). Enes's **Whisper** websocket is the richer optional backend (Railway) for better Turkish ASR.
- **Sigil** — trace its mark with pointer/touch (a simple gesture path), or
- **Pointer/keyboard** — hover/click/Enter (the always-available, accessible path).
A summon plays a short ink-bloom + the djinn "wakes" (generative). Every ritual has a plain pointer/keyboard equivalent.

**C. Code ⇄ incantation morph (global tone).** The reincarnated duality slider: a scalar `t ∈ [0,1]` (the morph engine we already built) shifts the **entire world** between **system/blueprint** (Space-Grotesk-ish technical, cold ink, schematic linework, terminal cadence) and **spell/illumination** (Fraunces, warm pigment, gold leaf, ink figures fully inked). Driven by a full-page drag/seam *and* tied to scroll position as a default arc (engineer at the base → poet near the crown).

## 4. Art Direction

- **Palette — illuminated manuscript:** ink-black & aged parchment; **gold leaf** (the accent of binding/illumination); **lapis** blue; **cinnabar/ochre** red. The `code⇄incantation` morph shifts cold-ink → warm-pigment+gold. Dark-first (a codex by candlelight), with a legible light variant.
- **Type:** a technical face (Space Grotesk / a grotesque) for the *code* pole; an expressive variable serif (**Fraunces**, SOFT/WONK) for the *incantation* pole; consider a display face with character for the Arabic-manuscript-adjacent display moments (Latin only; no faux-script). Big, confident, hand-set feel.
- **Imagery (sourcing — honest):**
  - **Public-domain originals:** Mehmed Siyah Kalem's album paintings (Topkapı; 15th c., public domain) and **Bruegel's Tower of Babel** (1563; public domain) — curated, masked, recolored, and composited as textures/marginalia/strata.
  - **Generated assets:** ink-djinn figures, sigils, seals, and manuscript framing generated in the Siyah-Kalem/Timurid idiom (via OpenDesign / image generation) where originals don't fit — used as textures, not claimed as authentic.
  - **Generative (WebGL):** the *living* layer — ink/smoke/particle djinn (§5).
- **Frame:** every screen reads like a manuscript leaf — ruled borders, gold rosettes/sigils in corners, marginalia demons that react.

## 5. Generative / Technical Art (the TouchDesigner spirit, on the web)

A WebGL layer (Three.js or a light lib like **ogl**, or raw GLSL) carrying:
- **Ink-djinn:** flow-field / curl-noise particle figures and shader-based ink diffusion (reaction-diffusion / domain-warped fBm) that read as living ink-and-smoke spirits; gold flecks; they breathe and react to cursor, scroll, and summon events.
- **Parchment & gold:** procedural paper grain, ink bleed, foil/gold shimmer shaders.
- Performance-budgeted (§8); degrades to static manuscript imagery where WebGL is unavailable or reduced-motion is set.

## 6. Voice

- **v1 (Pages-safe):** browser **Web Speech API** `SpeechRecognition` — client-side, no backend; a press-to-speak "utter an incantation" affordance; matches spoken words against djinn true-names/incantations to summon. Graceful no-mic / unsupported fallback (the pointer path).
- **v2 (optional, Railway):** Enes's **Whisper** websocket (`server.py`, base model, Turkish) for stronger Turkish ASR. Off the critical path; the site never *requires* a backend.

## 7. Content Mapping (from the single source of truth)

All facts come from `content/` via a generated `site-data.json` (extended). Each project gains **myth metadata** (true-name, sigil id, floor, summon-words) in a `site.config`. Examples:
- **LLMDAP** → djinn *"the Namebinder"* — binds agents by true names (LDAP/OIDC). Public.
- **On-Prem AI Adoption Radar** → *"the Augur"* — reads omens, adopts/avoids. Public.
- **SIMS** → *"the Sealed One"* — bound but veiled (**private, no link**).
- **Etch-A-Chat** → *"the Scribe of Vanishing Marks."* Public.
SIMS-private, canonical links/email, experience, lines, education — unchanged facts from the dataset; only the *framing* is myth.

## 8. Accessibility, Performance & Resilience (CRITICAL for an immersive build)

- **The escape hatch** (§2) — always-visible plain-CV reading; the entire content is real semantic DOM underneath the myth (works with JS off, crawler-readable, screen-reader navigable).
- **Reduced-motion:** no parallax/auto-animation; tower pre-built; generative layer static; no shimmer. Honor `prefers-reduced-motion`.
- **Keyboard & SR:** every ritual (summon/morph/ascend) has a pointer+keyboard equivalent with correct ARIA; focus order = reading order; skip-link.
- **No autoplay audio**; audio is opt-in with a visible control.
- **Performance budget:** target interactive < 2.5s on a laptop; lazy-init WebGL after first paint; cap particle counts; pause rAF when tab hidden / off-viewport; respect data-saver. A **no-WebGL fallback** (static manuscript) must be first-class.
- **AA contrast** for all text at every morph state; gold/ink chosen for legibility, not just mood.

## 9. Tech & Deploy

- **React + TypeScript + Vite** (the `site/` app already scaffolded), + a WebGL layer (Three.js/ogl/raw GLSL), CSS-variable morph engine (already built — `MorphProvider`/`--t`), Web Speech API.
- Content from `content/` → extended `site-data.json`.
- **GitHub Pages** (static; the whole experience is client-side). Optional **Whisper backend on Railway** for v2 voice. Repo flipped public + Pages enabled at deploy; URL wired into CV/README.

## 10. Phased Build (so we ship something powerful early, then deepen)

- **3a — The Codex Foundation:** the world + manuscript art direction + the tower structure + scroll-ascend + sections-as-floors + the `code⇄incantation` morph + the plain-CV escape hatch + full a11y. *Strong, shippable, immersive — no heavy generative/voice yet (static manuscript visuals).*
- **3b — The Djinn:** the WebGL generative ink-djinn + sigils + pointer/keyboard summon.
- **3c — The Voice:** Web Speech API summoning (+ optional Whisper backend).
- **3d — Illumination:** audio/ambient, gold-foil shaders, polish, performance hardening, deploy.

Each sub-phase gets its own plan; **3a** is the next plan.

## 11. Risks & Honest Scope

- This is the largest piece of the project; the art (generative ink + curated/generated manuscript imagery) is the hard part — phasing (§10) de-risks by shipping the Codex Foundation first.
- Immersive ≠ inaccessible: the escape hatch + reduced-motion + DOM-first content are requirements, not nice-to-haves.
- Subagent/API instability has been intermittent this session; favor smaller tasks + controller verification.

## 12. Success Criteria

- A first-time visitor feels they've **entered something**, and a recruiter can still **read the work in under a minute** via the escape hatch.
- The three systems (ascend / summon / morph) work together and degrade gracefully (reduced-motion, no-WebGL, no-mic, JS-off).
- The aesthetic is unmistakably **Siyah-Kalem-meets-Babel**, not generic.
- Content stays synced with the dataset; live on `https://ekaynac.github.io`, linked from CV + README.

## 13. Non-Goals (v1)

Real Arabic/Ottoman script rendering; a literal game with win/lose; a mandatory backend; multi-page routing; monetization.
