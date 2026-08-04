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

**Ownership.** [I take products, not tickets: sole creator of InfraMedic at Mega; conceived and shipped LLMDAP and the Adoption Radar end to end. Once I understand the intent behind a requirement I deliver past it — see "How I work best" in §4 for the phrasing.]

## 4. The human layer

> Letter-ready blocks distilled from Enes's own words (2026-08-04). Sensitive facts
> (salary, availability, service status, strategy notes) live in `coverletter/private.profile.md`
> — gitignored, never committed, never quoted verbatim in a letter.

**Why I do this work.** I want the hours I work to produce something real. What pulls me is
building impactful products while growing at the edge of current technology — R&D is where
I'm happiest: taking something new and turning it into something that ships. I genuinely
dislike wasted time, which shapes how I work more than any tool preference does.

**How I work best.** I take ownership of the product, not just my tickets. Give me a goal
worth caring about and I'll understand the intention behind the requirements and do more
than what's written — my follow-through is a strength I'm confident in. The flip side: I do
my best work when the direction is defined and requirements are reasonably clear. I'll
gladly push beyond them; I just want them to exist. I can adapt to any domain and any
technology stack.

**What I'm looking for.** A relatively small team where my impact is visible, working on
R&D-flavored problems. Hybrid is exactly my style — not fully remote, not five days at a
desk. I want to come in to create value, not to perform presence; during hours when I'm
not actively producing, I prefer flexibility. Based in Türkiye; also open to project-based
collaboration with international teams.

**Outside the terminal.** I'm involved in independent publishing: a published poetry book
(*Uyandı Uyudu*, 2024), founding poetry editor at Polemik Yayınları. I perform my own
poems — voice recordings and live stages I both organize and read at. Making time for a
life outside work matters to me, and I bring the same care for structure and rhythm to
both sides.

**Languages.** Turkish (native); English (C1) — fully comfortable working, presenting,
and debating in an English-only workplace.

**Practical facts recruiters ask.** → `private.profile.md` (never in a public file).

**Red lines (public-safe version).** Directionless projects with no defined goal;
office presence as ritual rather than for collaboration; fully-remote-only setups.

## 5. Closers (pick one)

**A — Direct.** I'd be glad to walk you through any of these systems in detail — the code I can't show publicly I can explain on a whiteboard. Thank you for your time.

**B — Warm.** If it sounds like I'd fit, I'd love to talk. Everything above is real and demo-able, and the rest of my work is at ekaynac.github.io.

---

*Workflow: for each application, copy this into `coverletter/letters/<company>-<role>.md`
(the whole `letters/` dir is gitignored), assemble, tailor, send as PDF with the same LaTeX
header style as the CV if a formal look is needed. Salary/availability/service answers come
from `private.profile.md` at send time — they never appear in tracked files.*
