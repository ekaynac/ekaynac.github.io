# Cover Letter Base — Enes Kaynakcı

> **How to use this document.** This is the single source of truth for writing cover letters.
> It is NOT a cover letter itself. When applying somewhere: pick one opener, 2–3 body blocks
> that match the job ad, one human block, and one closer — then tailor the company-specific
> sentences. Keep every letter under one page / ~300 words.
>
> Sections marked `[TODO: …]` need Enes's own words — fill them in and delete the marker.
> This file is manually maintained (not generated from `content/`); keep facts in sync with
> the dataset when they change.

---

## 1. Fixed facts (keep in sync with `content/`)

- **Name / title:** Enes Kaynakcı — AI / Software Engineer
- **Location:** Ankara, Türkiye
- **Email:** tensorenes@gmail.com · **Site:** https://ekaynac.github.io · **GitHub:** ekaynac · **LinkedIn:** enes-kaynakci
- **Current role:** AI / Software Engineer at Mega Bilgisayar (since May 2026, full-time)
- **Education:** B.Sc. Information Systems & Technologies, Bilkent University (June 2026); Erasmus at FH Hagenberg (2024–25); METU EEE 2018–21 (transferred)
- **Positioning:** AI-leaning full-stack engineer — LLM/agent pipelines + computer vision, delivered end-to-end on production microservices and modern web/mobile stacks
- **Signature work:** on-prem AI portal stack (MCP gateway + vLLM agent), LLMDAP, InfraMedic, On-Prem AI Adoption Radar, SIMS (10-microservice graduation project), Etch-A-Chat

## 2. Openers (pick one, then add one company-specific sentence)

**A — The builder opener.** I'm an AI-leaning full-stack engineer who ships end to end: LLM and agent pipelines, computer-vision systems, and the production services and interfaces around them. At Mega Bilgisayar I build fully on-premise AI platforms — the kind of systems where you can't hand-wave infrastructure, identity, or security away.

**B — The sovereignty opener** (for security/enterprise/infra companies). Most of my work answers one question: how do you give an organization real AI capability without sending its data anywhere? That has meant an on-prem MCP gateway with per-identity tool catalogs, an identity-and-memory-protection library for LLM agents (LLMDAP), and a deny-by-default infrastructure diagnosis platform.

**C — The dual-background opener** (for product/creative-leaning companies). I'm a software engineer and a published poet. I mention both because they're the same skill applied twice: giving precise structure to something hard to pin down — an agent pipeline in one case, a line of verse in the other.

## 3. Body blocks (pick 2–3 that match the job ad)

**LLM / agents.** [Portal stack: aggregating MCP gateway, per-identity namespaced tool catalogs, vLLM agent with per-turn embedding-retrieved tools, confirmation-gated writes — all on-prem. LLMDAP: Casbin authz, envelope-encrypted agent memory, tamper-evident audit. Adoption Radar: deterministic scoring over LLM vibes.]

**Computer vision / edge.** [PPE detection on Jetson with YOLO/SAM/DepthAnything; Teknofest UAV finalist ×2; FP16 TensorRT deployment; ~11,500-image open-source dataset; ICAT 2022 co-authored medical-CV paper.]

**Full-stack / product delivery.** [SIMS: 10 microservices, 4 languages, Redis event bus, MCP assistant. Etch-A-Chat: React Native + Skia collaborative canvas, 5 services on EKS. This CV/site/README pipeline itself: typed dataset → generated artifacts, tested in CI.]

**Proof of work ethic.** [100/100 internship evaluation at Mia Teknoloji, nominated for Best Internship; returned to Mega as a full-timer after interning there — they asked me back.]

## 4. The human layer — [TODO: Enes fills these in, in his own words]

> These are the blocks that make a letter feel like a person wrote it. Bullet answers are fine;
> we'll polish the prose together.

- **Why I do this work:** [TODO: what genuinely pulls you — the moment you got hooked on AI/CV, what you want to exist in the world]
- **What I'm like to work with:** [TODO: 3–4 honest traits, with a tiny story each if possible — e.g., how you handle being stuck, disagreement, deadlines]
- **What I'm looking for:** [TODO: kind of team, kind of problems, on-site/remote/hybrid, Turkey vs. international, visa/relocation willingness]
- **Outside the terminal:** [TODO: the poet/editor/society-founder side in your own voice — plus anything else: games, music, sports]
- **Languages:** [TODO: Turkish (native), English (level? TOEFL/IELTS?), German from Erasmus?]
- **Practical facts recruiters ask:** [TODO: notice period, earliest start date, military service status, salary expectation policy — "share range only when asked"?]
- **Red lines / dealbreakers:** [TODO: anything you won't do — helps me never pitch you somewhere wrong]

## 5. Closers (pick one)

**A — Direct.** I'd be glad to walk you through any of these systems in detail — the code I can't show publicly I can explain on a whiteboard. Thank you for your time.

**B — Warm.** If it sounds like I'd fit, I'd love to talk. Everything above is real and demo-able, and the rest of my work is at ekaynac.github.io.

---

*Workflow: for each application, copy this into `coverletter/letters/<company>-<role>.md` (gitignored if it contains anything private), assemble, tailor, send as PDF with the same LaTeX header style as the CV if a formal look is needed.*
