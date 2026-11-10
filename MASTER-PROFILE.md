# Enes Kaynakcı
**AI / Software Engineer** · Ankara, Türkiye
tensorenes@gmail.com · https://github.com/ekaynac · https://www.linkedin.com/in/enes-kaynakci/ · https://tensorenes.com

> Generated from the content dataset. Do not edit by hand — edit `content/*.ts` and run `npm run generate:profile`.

## Summary

AI-leaning full-stack engineer who ships end to end: LLM and agent pipelines and computer-vision systems backed by production microservices and modern web and mobile front-ends. Bilkent University Information Systems graduate (2026), currently building on-prem AI platforms, computer-vision and LLM systems at Mega Bilgisayar.

**Languages:** Turkish (Native), English (C1), German (Beginner)

## Experience

### AI / Software Engineer — Mega Bilgisayar
2026-05-18 – Present · Ankara, Türkiye · full-time
- Built a fully on-prem AI portal stack: an aggregating MCP gateway with per-identity tool catalogs (Nextcloud, TrueConf, SIMS) and a vLLM agent that retrieves an embedding-selected tool subset per turn, with confirmation-gated writes.
- Led an industrial-safety vision platform: zero-shot OWLv2 detection, ByteTrack tracking, and face anonymization emitting signed violation events, deployed on NVIDIA Jetson and RTX via TensorRT.
- Built Kütüphane, an open-source governed knowledge catalog and agent memory layer: every item carries its write-path provenance and model-use rights, agents propose over MCP, and only a person accepts, by passkey.
- Designed LLMDAP, a sovereign LLM-agent identity and memory-protection product binding agent memory and tool access to AD/LDAP or OIDC identities with Casbin authorization, envelope encryption, and a tamper-evident audit trail.
- Built InfraMedic solo (~1,000 merged PRs): a diagnose-and-remediate appliance for heterogeneous infrastructure with an on-prem LLM analyst, a policy-gated remediation path, and an operator console.
- Built and measured three generations of unattended coding agents (Auto Dev Cycle, its Go rewrite, nöbetçi-mcp): 24 InfraMedic tasks in 19 days at ~$2 builder cost each, and a hidden-test referee that drove the decision to retire the rewrite.
_Tech:_ TypeScript, Python, LLMs, vLLM, RAG, MCP, Casbin, LDAP/OIDC, PostgreSQL, OWLv2, TensorRT, Docker, GitHub Actions

### AI Intern, AI R&D — Mia Teknoloji
2025-02 – 2025-07 · Ankara, Türkiye · internship
- Engineered end-to-end LLM agent pipelines using RAG, function calling, transformers, and embedding models.
- Delivered a production SQL-generation pipeline with a 3-tier fallback mechanism using OpenWebUI and local LLMs.
- Built a Turkish translation pipeline integrating Zemberek morphology for improved contextual accuracy.
- Received a 100/100 internship evaluation (all competencies rated Excellent) and was nominated for the company's Best Internship award.
_Tech:_ Python, RAG, Function Calling, Transformers, Embeddings, OpenWebUI, Zemberek, Local LLMs

### AI Solutions Team Intern — Mega Bilgisayar
2024-06 – 2024-08 · Ankara, Türkiye · internship
- Developed and deployed an industrial safety system using YOLOv5 and OpenCV on NVIDIA Jetson with TensorRT optimization.
_Tech:_ YOLOv5, OpenCV, NVIDIA Jetson, TensorRT, Python

### Computer Vision Team Member — Meturone (Fixed-wing UAV Team)
2021-09 – 2023-09 · Ankara, Türkiye · volunteer
- Teknofest International UAV Competition finalist (2021 and 2022); deployed FP16-quantized YOLOv5 on Jetson Xavier for real-time aerial perception and published an ~11,500-image UAV detection dataset for open-source use.
_Tech:_ YOLOv5, TensorRT, Jetson Xavier, OpenCV, Python

### Perception Team Member — METU Formula Racing — Driverless
2021-09 – 2022-09 · Ankara, Türkiye · volunteer
- Trained a YOLO cone-detection model and deployed an FP16-quantized YOLOv5 to NVIDIA Jetson Xavier with TensorRT for the driverless vehicle's perception stack.
_Tech:_ YOLOv5, TensorRT, Jetson Xavier, Python

## Projects

### SIMS — Smart Inventory Management System ⭐
10-microservice inventory platform with an MCP-powered AI assistant (graduation project).
Architected a 10-microservice platform (PHP/Laravel, Node.js/Fastify, Python/FastAPI, React/TypeScript) with per-service MySQL databases, a Redis event bus, and an Nginx API gateway. Added RS256 JWT auth with RBAC, auto-generated OpenAPI docs, correlation-ID tracing, and CI/CD with GitHub Actions, plus an AI chat assistant with tool execution via the Model Context Protocol (MCP) supporting OpenAI and Anthropic LLMs.
- 10 microservices across 4 languages with per-service databases and a Redis event bus.
- MCP-based AI assistant executing tools against the live system.
_Tech:_ PHP, Laravel, Node.js, Fastify, Python, FastAPI, React, TypeScript, MySQL, Redis, Nginx, MCP, Docker, GitHub Actions

### LLMDAP — LLM Directory-bound Access Protection ⭐
Sovereign LLM-agent identity, memory protection, and audited gateway bound to AD/LDAP or OIDC.
A proprietary TypeScript/Node product (v2.0) that makes every LLM-agent session run as a real corporate identity. Binds agent memory, configuration, and tool access to Active Directory (LDAP) or OIDC, with deny-by-default Casbin authorization, per-identity AES-256-GCM envelope-encrypted memory, key rotation, and a hash-chained, signed audit trail. Ships an LLM gateway with host-side model attestation, behavioural canaries (refusal, anchor, and drift probes), and identity-scoped RAG, plus a governed model bridge (chat, embeddings, rerank, and schema-typed decisions) with subject-bound caller authentication and per-call credential leases. Releases are signed images, and two internal security-audit rounds were closed before v2.0. Runs entirely on-premise with no mandatory external service; InfraMedic and Kütüphane route every model call through it.
- Per-identity envelope encryption, deny-by-default Casbin, and a signed hash-chained audit trail, fully on-prem through v2.0.
- Governed model bridge with host-side attestation, drift canaries, and per-call credential leases; every model call in InfraMedic and Kütüphane passes through it.
_Tech:_ TypeScript, Node.js, Casbin, LDAP/Active Directory, OIDC, AES-256-GCM, PKCS#11, jose

### Etch-A-Chat ⭐
Privacy-focused real-time vector-drawing messenger.
Co-developed a privacy-focused messaging app where users exchange hand-drawn vector messages on a live collaborative canvas. Built with React Native (Expo + Skia), Socket.io, MongoDB, Redis, and RabbitMQ; 5 microservices with an API gateway on Kubernetes (AWS EKS), SHA-256 contact sync, phone-OTP auth, and push notifications. Monorepo managed with pnpm + Turborepo.
- Live collaborative vector canvas over Socket.io.
- 5 microservices on AWS EKS with phone-OTP auth and SHA-256 contact sync.
_Tech:_ React Native, Expo, Skia, Socket.io, MongoDB, Redis, RabbitMQ, Kubernetes, AWS EKS, pnpm, Turborepo

### AI Radar Pulse ⭐
New AI models, papers, repositories, and news, collected, triaged, and ranked every two hours, fully unattended. — https://github.com/ekaynac/onprem-ai-adoption-radar
An unattended Python pipeline that collects new uploads from 30 lab organizations on Hugging Face, daily papers, fast-rising GitHub repositories, and lab and practitioner news every two hours, then ranks them in four lanes. A low-cost classifier answers facts about each item (event type, repository type, paper topic, whether it ships code or weights) and readable rules turn those facts into a ranking whose reasons are shown; when the classifier is down, the rules take over visibly. Quantizations and re-uploads are told apart from real releases by base-model tags, with no model call. Publishes a static site, RSS feeds, and a JSON feed, sends a daily Telegram digest with one-sentence Turkish explanations from a homelab worker, and runs a dead-man watchdog that alerts on stale publishes, empty lanes, failing sources, and degraded triage. It began as an on-prem AI adoption radar and intelligence platform (capacity planner, benchmark triangulation, MCP server); those layers were retired in November 2026 in favour of this narrower, cheaper tool.
- Ranks every item by readable rules over classifier-answered facts, shows the reasons, and keeps filtered-out items visible.
- Two-hourly unattended publishing with RSS, a Telegram digest, and a watchdog that names any failing source.
_Tech:_ Python, React, Hugging Face API, GitHub Actions, Telegram Bot API, Playwright

### InfraMedic ⭐
Safety-first diagnose-and-remediate appliance for heterogeneous infrastructure, with an on-prem LLM analyst.
A Python platform that diagnoses managed infrastructure through a typed pipeline of immutable models (device registry, observations, signals, findings, run manifests). Platform adapters (VMware vCenter, Zabbix, Proxmox, HPE iLO, Linux, HPE StoreOnce, Axis) feed deterministic detectors; an LLM analyst narrates signals into findings after pseudonymization and redaction, with sensitivity-aware routing that keeps restricted devices off cloud models and drops every cloud route when the appliance is air-gapped. Encrypted secrets use audited just-in-time leases, remediation runs as sagas behind a deny-by-default policy gate and a sandbox, and an operator console covers the fleet, investigations, approvals, model releases, and audit. Kobra runs ad-hoc device-audit sessions with session-scoped credentials and an audit receipt. Prompts are tuned by a nightly, budget-bounded DSPy/GEPA sweep against fixed suites, every model call goes through LLMDAP, and reference knowledge is read from Kütüphane. Conformance and safety suites guarantee secret values never leak into registry rows, audit records, manifests, or logs. Designed and built solo at Mega Bilgisayar (~1,000 merged pull requests, release 0.3.19); newer changes are delegated to nöbetçi-mcp.
- Deny-by-default policy gate, saga-based remediation, and purpose-bound secret leases with TTL and a full audit trail.
- ~1,000 merged PRs; an on-prem LLM analyst that pseudonymizes before any prompt and fails closed for restricted or air-gapped devices.
_Tech:_ Python, LLMDAP, DSPy, SQLite, vCenter, Zabbix, Proxmox, pytest

### Unattended Coding Agents — Auto Dev Cycle → nöbetçi-mcp ⭐
Three generations of an unattended coding loop, each measured honestly: build, gate, independent review, merge. — https://github.com/ekaynac/auto-dev-cycle
An R&D line on getting cheap and local models to ship reviewed code without a person in the loop, built at Mega Bilgisayar. The first Auto Dev Cycle (Python, September 2026) had frontier models plan, review, and audit on subscriptions while GLM-5.3-flash via OpenRouter wrote the code and a local Qwen3.8-27B on an NVIDIA DGX Spark (vLLM) swept; it delivered 24 InfraMedic tasks (59 merged PRs) in 19 days at a median builder cost of about $2 per task, with every call and token ledgered. Its project-agnostic Go rewrite (October 2026, Apache-2.0) added a capacity scheduler, a model gateway, sandboxed gates bound to exact trees, and a language-agnostic referee that judges any agent's patch against hidden tests; a measured comparison (with the atolye harness: no-network sandboxes, a secret-redacting gateway filter, hidden-test acceptance) showed plain agent loops matching its acceptance rate at about a fourteenth of the wall time (mini-swe-agent 16/20 on a local 27B model), so it was stopped and archived with a public post-mortem. The current generation is nöbetçi-mcp: a small MCP server a supervisor agent uses to delegate a task, which loops build, full checks, and independent review until GO, counts only failures that are new against the base commit, runs the candidate's new tests against the base code (red-first), and pushes a branch but never merges. It now builds InfraMedic changes and can read and propose project memory in Kütüphane.
- Shipped 24 InfraMedic tasks (59 PRs) in 19 days at ~$2 builder cost each; stopped the Go rewrite when measurement showed plain agent loops did as well 14x faster.
- nöbetçi-mcp today: build, checks, and independent review loop until GO, red-first test checks, never merges.
_Tech:_ Python, Go, MCP, vLLM, OpenRouter, DGX Spark, Podman, Claude Code, Codex CLI

### Kütüphane ⭐
A governed knowledge catalog and memory layer that people, agents, and applications read from the same copy. — https://github.com/ekaynac/kutuphane
An on-prem, air-gap-capable catalog and agent memory service: books, notes, rules, and skills, each carrying who wrote it (taken from the write path, never from a claim), who accepted it, where it applies, and what a model may do with it. Agents connect over MCP (search, cited answers, notes, links, code-citation checks, outcomes, signed packages) and applications over MCP or HTTP. Agents only propose; a person changes a note's standing, on the CLI with a separate database credential or by passkey on a phone. Notes are immutable and rollback is an event with a cause; rights, AI-input, and egress are checked before every embedding, rerank, and answer, and a local-only book never reaches a cloud route because every model call goes through LLMDAP. Skills are scanned at ingest; exports carry origin and rights. Python on PostgreSQL with hybrid search, Apache-2.0. InfraMedic reads its reference knowledge through it, and nöbetçi-mcp uses it as project memory.
- Provenance from the write path, person-only acceptance by passkey, and rights checked before every embedding and answer.
- MCP and HTTP interfaces, cited answers or an explicit not-in-library, and signed import/export packages.
_Tech:_ Python, PostgreSQL, MCP, OIDC, WebAuthn, LLMDAP, Docker

### OHS Computer Vision Platform (private)
Industrial PPE-violation detection on edge hardware (Mega / Advantech Smart Production Systems).
A containerized occupational-health-and-safety vision pipeline: zero-shot OWLv2 detection, ByteTrack tracking, PPE association, a violation state machine, and YuNet face anonymization, emitting structured violation events to JSONL and signed webhooks. Every component is selected from YAML config, so the same pipeline runs on a Mac, NVIDIA Jetson Xavier NX (TensorRT), and RTX workstations, with DVC-versioned models and a looping RTSP demo camera. Built for Mega Bilgisayar's Advantech Smart Production Systems.
- Zero-shot OWLv2 + ByteTrack pipeline with face anonymization and signed violation webhooks, config-driven across Jetson and RTX targets.
_Tech:_ Python, OWLv2, ByteTrack, TensorRT, Jetson Xavier NX, Docker, DVC

### BukaUI (private)
On-prem local-LLM platform (customized LibreChat) for Mega Bilgisayar.
A customized LibreChat deployment providing a local, on-premise LLM chat platform for Mega Bilgisayar, integrating internal models and tooling for private enterprise use.
_Tech:_ TypeScript, LibreChat, Docker, LLMs

### Automatic Hallux Valgus Angle Calculation
Deep-learning + classical CV pipeline for automated foot-angle diagnosis (ICAT 2022). — https://github.com/ekaynac/HalluxValgus
A pipeline combining YOLOv5 detection with classical image processing (segmentation, skeletonization) to automatically measure the Hallux Valgus angle from foot X-rays. Basis of a co-authored ICAT 2022 conference paper, in partnership with SBÜ Gülhane Hospital and Gazi University.
_Tech:_ Python, YOLOv5, OpenCV, Jupyter

### Teknofest SİHA Dataset
Open-source ~11,500-image UAV detection dataset (Teknofest 2022). — https://github.com/ekaynac/Teknofest-SIHA-dataset
An open-source aerial-vehicle detection dataset (8,815 training / 2,650 validation images) curated from flight footage and published in YOLOv5 format for the Teknofest 2022 Combat UAV competition, by Meturone's OTUS UCAV subteam.
_Tech:_ YOLOv5, Computer Vision, Dataset

### FanzinApp (private)
Mobile platform for fanzine submission, review, and archiving (Erasmus project).
A mobile app that streamlines fanzine submission and editorial review and builds a digital archive of past issues, making independent fanzines more accessible. Built with a Kotlin/Android front end on a Firebase (Firestore, Auth, Storage) backend. Developed at FH Hagenberg with Ecem Tekiner.
_Tech:_ Kotlin, Android, Firebase, Firestore

### Homelab — Proxmox Platform ⭐
Infrastructure-as-documentation home server with GPU containers and zero open ports.
A single-node Proxmox VE platform rebuilt entirely from its own repository: three ZFS pools, Proxmox Backup Server with nightly jobs and a tested restore, NVIDIA GPU passthrough into unprivileged LXC containers with CUDA verified, public ingress through Cloudflare Tunnel, and admin access over a Tailscale subnet router, with no router port ever forwarded. Every phase ends with an execution log of what actually happened, live host config is snapshotted into git after each change, and guest-to-guest traffic is default-deny with an explicit allow-list. Runs the LLMDAP demo stack, the AI Radar Pulse digest worker, self-hosted CI runners, and scheduled scrapers alongside this site at tensorenes.com, and explains itself at lab.tensorenes.com: a live, bilingual engineering drawing of why the lab exists and how it is built, fed by coarse, leak-checked metrics.
- GPU-enabled unprivileged containers, tested backups, and public services over Cloudflare Tunnel with zero forwarded ports.
_Tech:_ Proxmox VE, ZFS, LXC, Cloudflare Tunnel, Tailscale, NVIDIA CUDA, Caddy

### Polemik Yayınları Website ⭐
Production website and catalog for an independent publishing house.
The live website of Polemik Yayınları: a React + TypeScript + Vite front end on a Strapi headless CMS with PostgreSQL. Includes a book catalog with Kitapyurdu links, an inventory view with location and stock filters, a manuscript-submission workflow, a catalog scraper, prerendered social-preview tags, a generated sitemap, a strict CSP, and privacy-friendly Umami analytics, deployed through GitHub Actions.
- Live publisher site on a Strapi CMS with an inventory view, submission workflow, and CI deploys.
_Tech:_ React, TypeScript, Vite, Strapi, PostgreSQL, Tailwind CSS

### Küre Dizgi — Sphere Poetry Typesetting ⭐
Offline editor that lays a poem out on a sphere and projects it onto printed book pages. — https://github.com/ekaynac/kure-dizgi
Open-source tools split out of the typesetting of A. Tolga Suyolcuoğlu's poem Melissa Önermesi: a browser editor that lays rich text over a 16-leaf sphere with 3D, fixed-pole, leaf-pair, and neighbourhood views, and a book-projection view that fits the layout onto 130 × 195 mm pages without silently shrinking the type (the true point size is kept at the spine and the horizontal compression toward the edge is reported). Exports JSON, SVG with embedded fonts, PNG, and print PDF; a Python CLI splits the unfolding into a 16-page vector appendix, and an InDesign script places it into the book and exports IDML and PDF. Runs from a file with no build step or network; MIT-licensed, with the poem and publisher assets kept out of the package.
- Typesets a poem on a sphere and projects it to print without hiding a point-size cut.
_Tech:_ JavaScript, SVG, Quill, Python, PyMuPDF, InDesign scripting

## Education

- **B.Sc. in Information Systems and Technologies**, Bilkent University (2022-08 – 2026-06) — Graduated June 2026, CGPA 3.08/4.00; Honour standing in multiple semesters.
- **Erasmus Exchange Student**, FH Upper Austria, Hagenberg Campus (2024-10 – 2025-02)
- **B.Sc. in Electrical-Electronics Engineering (transferred)**, Middle East Technical University (METU) (2018-09 – 2021-06) — Transferred to Bilkent University.

## Skills

- **Languages:** Python, TypeScript, JavaScript, PHP, Java, C, Dart, Kotlin
- **AI & ML:** LLM Pipelines, RAG, Function Calling, Agents, MCP, Transformers, Embeddings, vLLM, Ollama, DSPy, TensorFlow, PyTorch, OpenCV, TensorRT, OWLv2, YOLOv5
- **Web & Mobile:** React, Next.js, React Native (Expo), Node.js, Express, Fastify, FastAPI, Laravel, Strapi, Socket.io, Tailwind CSS, Vite
- **Infrastructure & Tools:** Docker, Kubernetes (EKS), Proxmox VE, Nginx, PostgreSQL, MySQL, MongoDB, Redis, RabbitMQ, GitHub Actions, Git, Supabase, Vercel, LDAP/OIDC, Casbin, Cloudflare Tunnel, Tailscale

## Certifications

- **Deep Learning Specialization** — DeepLearning.AI (2020-05)
- **Machine Learning** — Stanford University (Online) (2023-08)
- **CCNA: Introduction to Networks** — Cisco (2024-01)
- **SolidWorks (Basic Level)** — ABKTEKNİK (2018-11)

## Publications

- Alp, E., Kaynakcı, E., et al. (2022). **Automatic Calculation of Hallux Valgus Angle.** ICAT — International Conference on Advanced Technologies. Vol. 10, pp. 222–225. In partnership with SBÜ Gülhane Training & Research Hospital and Gazi University.

## Leadership & Creative

### Founder — Bilkent Game Development & Animation Society (leadership)
2023-01 – Present
- Founded the university's first game development society; organized the inaugural Bilkent Game Jam (50+ participants).

### President (later Audit Board Head) — Bilkent Literature Society (leadership)
2024-02 – Present
- Elected president; organized the inaugural Bilkent Mythology Panel.

### Founding Member & Poetry Editor — Polemik Yayınları (creative)
2022-01 – Present
- Poetry editor for an independent publishing house; provide typesetting (dizgi) in Adobe InDesign and Scribus.

### Author — Independent (Poetry) (creative)
2024-01 – Present
- Published two poetry books: "Uyandı Uyudu" (Kharon Yayınları, 2024) and "Sarhoş" (Polemik Yayınları, 2025).

### Theatrical Poetry Moderator — METU Voicing Society (creative)
2022-09 – Present
