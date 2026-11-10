# LinkedIn Pack — Enes Kaynakcı

Copy-paste-ready text for your LinkedIn profile, drawn from the same source of truth as your CV/README/site so everything stays consistent. Each block below maps to a LinkedIn field — see **"Where to paste"** at the bottom.

> Tip: edit on desktop (linkedin.com → **Me → View Profile → ✏️ per section**). Headline & About have character limits (noted). Keep it first-person and keyword-rich — recruiters search LinkedIn by keyword.

---

## 1) Headline  *(max 220 chars)*

```
AI / Software Engineer at Mega Bilgisayar · LLM & agent pipelines, computer vision, microservices · Bilkent University, Information Systems '26
```

*Alternatives:*
```
AI / Software Engineer · I build LLM/agent pipelines, computer-vision systems & the platforms around them · Bilkent '26
```
```
AI-leaning Full-Stack Engineer · LLMs · Computer Vision · Microservices · Ankara
```

---

## 2) About  *(max ~2,600 chars)*

```
I build AI systems end to end — from LLM and agent pipelines to the production platforms that carry them.

Right now I'm an AI / Software Engineer at Mega Bilgisayar, building fully on-prem AI platforms: an MCP gateway and vLLM agent for our internal portal, and an industrial-safety vision pipeline on NVIDIA Jetson (zero-shot OWLv2, ByteTrack, face anonymization). I built InfraMedic solo (~1,000 merged PRs), a diagnose-and-remediate appliance for heterogeneous infrastructure (vCenter, Zabbix, Proxmox and more) with an on-prem LLM analyst. Around it sit two more products I designed: LLMDAP, a sovereign identity and memory-protection layer that binds AI agents to AD/LDAP or OIDC identities and governs every model call, and Kütüphane, an open-source governed knowledge catalog and agent memory where agents propose and only a person accepts. I also build and measure unattended coding agents: the first Auto Dev Cycle shipped 24 InfraMedic tasks in 19 days at ~$2 builder cost each; when measurement showed its Go rewrite was 14x slower than plain agent loops, I stopped it and published the post-mortem.

Before this, as an AI Intern in Mia Teknoloji's AI R&D team I engineered end-to-end LLM agent pipelines (RAG, function calling, embeddings), shipped a production SQL-generation pipeline with a 3-tier fallback, and built a Turkish translation pipeline using Zemberek morphology — earning a 100/100 internship evaluation. Earlier I worked on real-time computer vision for fixed-wing UAVs (Teknofest International UAV Competition finalist, 2021 & 2022) and curated an ~11,500-image open-source detection dataset.

My graduation project, SIMS, is a 10-microservice platform (PHP/Laravel, Node.js, Python, React) with an MCP-powered AI assistant. Outside work I run a Proxmox homelab with GPU containers and zero open ports (it serves tensorenes.com), and I built the live website of Polemik Yayınları, the publishing house where I edit poetry, plus Küre Dizgi, an open-source tool that typesets a poem on a sphere. I'm comfortable across the stack — LLMs and computer vision, the microservices and infra behind them, and modern web/mobile front-ends.

I'm a Bilkent University Information Systems graduate (2026), with an Erasmus exchange at FH Upper Austria (Hagenberg). I hold the DeepLearning.AI Deep Learning Specialization and Stanford's Machine Learning certificate.

I like systems that hold their shape under load and say exactly what they mean. Always happy to talk AI engineering, agents, and computer vision.

📫 tensorenes@gmail.com · tensorenes.com · github.com/ekaynac
```

---

## 3) Experience  *(add each as a separate position)*

**AI / Software Engineer — Mega Bilgisayar**
Full-time · May 2026 – Present · Ankara, Türkiye
```
• Built a fully on-prem AI portal stack: an aggregating MCP gateway with per-identity tool catalogs (Nextcloud, TrueConf, SIMS) and a vLLM agent that retrieves an embedding-selected tool subset per turn, with confirmation-gated writes.
• Built InfraMedic solo (~1,000 merged PRs): a diagnose-and-remediate appliance for heterogeneous infrastructure (vCenter, Zabbix, Proxmox, iLO, Linux, StoreOnce, Axis) with an on-prem LLM analyst, a deny-by-default policy gate, audited secret leases, and an operator console.
• Built Kütüphane, an open-source governed knowledge catalog and agent memory layer: every item carries its write-path provenance and model-use rights, agents propose over MCP, and only a person accepts, by passkey.
• Built and measured three generations of unattended coding agents (Auto Dev Cycle, its Go rewrite, nöbetçi-mcp): 24 InfraMedic tasks (59 merged PRs) in 19 days at ~$2 builder cost each, and a hidden-test referee that drove the decision to retire the rewrite.
• Led an industrial-safety vision platform: zero-shot OWLv2 detection, ByteTrack tracking, and face anonymization emitting signed violation events, deployed on NVIDIA Jetson and RTX via TensorRT.
• Designed LLMDAP, a sovereign LLM-agent identity and memory-protection product binding agent memory and tool access to AD/LDAP or OIDC identities with Casbin authorization, envelope encryption, and a tamper-evident audit trail.
```

**AI Intern, AI R&D — Mia Teknoloji**
Internship · Feb 2025 – Jul 2025 · Ankara, Türkiye
```
• Engineered end-to-end LLM agent pipelines using RAG, function calling, transformers, and embedding models.
• Delivered a production SQL-generation pipeline with a 3-tier fallback mechanism using OpenWebUI and local LLMs.
• Built a Turkish translation pipeline integrating Zemberek morphology for improved contextual accuracy.
• Received a 100/100 internship evaluation (all competencies rated Excellent) and was nominated for the company's Best Internship award.
```

**AI Solutions Team Intern — Mega Bilgisayar**
Internship · Jun 2024 – Aug 2024 · Ankara, Türkiye
```
• Developed and deployed an industrial safety system using YOLOv5 and OpenCV on NVIDIA Jetson with TensorRT optimization.
```

**Computer Vision Team Member — Meturone (Fixed-wing UAV Team)**
2021 – 2023 · Ankara, Türkiye
```
• Teknofest International UAV Competition finalist (2021 & 2022); deployed FP16-quantized YOLOv5 on Jetson Xavier for real-time aerial perception.
• Curated and published an ~11,500-image (8,815 train / 2,650 validation) UAV detection dataset for open-source use.
```

---

## 4) Education

```
İhsan Doğramacı Bilkent University — B.Sc., Information Systems and Technologies — 2022–2026
```
```
FH Upper Austria, Hagenberg Campus — Erasmus Exchange — 2024–2025
```
```
Middle East Technical University (METU) — Electrical-Electronics Engineering (transferred) — 2018–2021
```

---

## 5) Licenses & Certifications

```
Deep Learning Specialization — DeepLearning.AI — 2020 — Credential ID XKZ62YB4SBBS
```
```
Machine Learning — Stanford University (Online) — 2023 — Credential ID Z98VVD9RBNEA
```
```
CCNA: Introduction to Networks — Cisco — 2024
```
```
SolidWorks (Basic Level) — ABKTEKNİK — 2018
```

---

## 6) Projects  *(LinkedIn "Projects" section)*

```
InfraMedic — Safety-first diagnose-and-remediate appliance for heterogeneous infrastructure: platform adapters, an on-prem LLM analyst that pseudonymizes before any prompt, saga-based remediation behind a deny-by-default policy gate, an operator console. ~1,000 merged PRs. Python. Sole creator at Mega Bilgisayar. [Private repo]
```
```
Kütüphane — Governed knowledge catalog and memory layer for AI agents: provenance from the write path, person-only acceptance by passkey, rights checked before every embedding and answer, MCP + HTTP, on-prem. Python, PostgreSQL. Sole creator at Mega Bilgisayar. → github.com/ekaynac/kutuphane
```
```
Unattended Coding Agents (Auto Dev Cycle → nöbetçi-mcp) — Three generations of an unattended build/gate/review loop. v1: GLM-5.3-flash via OpenRouter wrote the code, a local Qwen3.8-27B on an NVIDIA DGX Spark (vLLM) swept, frontier models planned and reviewed; 24 InfraMedic tasks / 59 merged PRs in 19 days at a median ~$2 builder cost per task. v2 (Go, open source): capacity scheduler, model gateway, and a hidden-test referee; stopped with a public post-mortem when plain agent loops matched it 14x faster. Now: nöbetçi-mcp, a build → checks → independent review delegation server that never merges. Sole creator at Mega Bilgisayar. → github.com/ekaynac/auto-dev-cycle
```
```
LLMDAP — Sovereign LLM-agent identity & memory protection bound to AD/LDAP or OIDC (Casbin authz, envelope encryption, signed audit, governed model bridge with attestation and credential leases), v2.0. TypeScript, Node.js. [Private repo]
```
```
AI Radar Pulse — New AI models, papers, repositories, and news, collected, triaged, and ranked every two hours, fully unattended; rules over classifier-answered facts with visible reasons, RSS, a daily Telegram digest, and a watchdog. Python. → ekaynac.github.io/onprem-ai-adoption-radar
```
```
Homelab — Infrastructure-as-documentation Proxmox VE platform: ZFS, tested PBS backups, GPU in unprivileged LXC, Cloudflare Tunnel ingress with zero forwarded ports, Tailscale admin access. Hosts tensorenes.com, the LLMDAP demo, and CI runners. [Private repo]
```
```
Polemik Yayınları Website — Live publisher website on React + Strapi CMS with an inventory view, submission workflow, and CI deploys. → polemikyayin.com
```
```
Küre Dizgi — Offline editor that lays a poem out on a sphere and projects it onto printed book pages without hiding a point-size cut; SVG/PDF/IDML output. JavaScript, Python. MIT. → ekaynac.github.io/kure-dizgi
```
SIMS — Smart Inventory Management System (graduation project) — A 10-microservice platform (PHP/Laravel, Node.js, Python/FastAPI, React) with an MCP-powered AI assistant. [Private repo]
```
```
Etch-A-Chat — Privacy-focused real-time vector-drawing messenger. React Native (Expo + Skia), microservices on Kubernetes. [Private repo]
```

---

## 7) Publications

```
Automatic Calculation of Hallux Valgus Angle — ICAT (International Conference on Advanced Technologies), 2022, vol. 10, pp. 222–225. Co-authored; in partnership with SBÜ Gülhane Hospital and Gazi University.
```

---

## 8) Skills  *(add these; pin your top 3 as "Top skills")*

**Suggested Top 3 (pin these):** LLM Pipelines · Computer Vision · Microservices

```
Large Language Models (LLM), Retrieval-Augmented Generation (RAG), AI Agents, Model Context Protocol (MCP), Prompt Engineering, AI-Assisted Development, Computer Vision, YOLO, OWLv2, OpenCV, TensorRT, PyTorch, TensorFlow, vLLM, Ollama,
Python, TypeScript, JavaScript, PHP, Java, C, Kotlin, Dart,
React, Next.js, React Native, Node.js, Fastify, FastAPI, Laravel, Strapi,
Docker, Podman, Kubernetes, Proxmox VE, Redis, RabbitMQ, PostgreSQL, MySQL, MongoDB, Nginx, GitHub Actions, LDAP/OIDC, Casbin, Cloudflare Tunnel, Tailscale
```

---

## Where to paste each piece

| Block | LinkedIn location |
|---|---|
| **1. Headline** | Profile → ✏️ (pencil on the intro card) → **Headline** |
| **2. About** | Profile → **About** section → ✏️ |
| **3. Experience** | Profile → **Add profile section → Core → Add position** (one per role) |
| **4. Education** | **Add profile section → Core → Add education** |
| **5. Certifications** | **Add profile section → Recommended → Add licenses & certifications** |
| **6. Projects** | **Add profile section → Additional → Add projects** |
| **7. Publications** | **Add profile section → Additional → Add publications** |
| **8. Skills** | **Add profile section → Core → Add skills** (then reorder → pin top 3) |
| **Featured** | **Add profile section → Recommended → Add featured** → link your CV (tensorenes.com/cv.pdf), github.com/ekaynac, the Kütüphane repo, and tensorenes.com |

**Also worth doing on LinkedIn:**
- Set **Location** to Ankara, Türkiye; turn on **Open to work** (recruiters only) if you want inbound.
- Add a **custom public URL** (e.g. linkedin.com/in/enes-kaynakci — you already have this).
- Add your **site URL** (`tensorenes.com`) to Featured + the Contact info.
- Banner image: a calm, technical/abstract image reads well; (your site's ink visual would make a great banner export later).
