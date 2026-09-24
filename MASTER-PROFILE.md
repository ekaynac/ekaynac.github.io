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
- Created the On-Prem Intelligence Desk: a deterministic, self-hosted system that ranks AI models and agent tooling for on-prem adoption with cited evidence, publicly scored weekly calls, and an MCP server.
- Designed LLMDAP, a sovereign LLM-agent identity and memory-protection product binding agent memory and tool access to AD/LDAP or OIDC identities with Casbin authorization, envelope encryption, and a tamper-evident audit trail.
- Built InfraMedic solo: a diagnose-and-remediate platform across seven infrastructure platforms with an on-prem LLM analyst.
- Built the Auto Dev Cycle: a continuous plan-build-review-deploy loop that develops InfraMedic on a supervised network of low-cost open-weight models, with every model call ledgered.
_Tech:_ TypeScript, Python, LLMs, vLLM, RAG, MCP, Casbin, LDAP/OIDC, OWLv2, TensorRT, Docker, GitHub Actions

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
A proprietary TypeScript/Node product (v1.15) that makes every LLM-agent session run as a real corporate identity. Binds agent memory, configuration, and tool access to Active Directory (LDAP) or OIDC, with deny-by-default Casbin authorization, per-identity AES-256-GCM envelope-encrypted memory, key rotation, and a hash-chained, signed audit trail. Ships an LLM gateway with host-side model attestation, behavioural canaries (refusal, anchor, and drift probes), and identity-scoped RAG, plus optional HSM/PKCS#11 — running entirely on-premise with no mandatory external service.
- Per-identity envelope encryption, deny-by-default Casbin, and a signed hash-chained audit trail, fully on-prem through v1.15.
- LLM gateway with host-side model attestation and behavioural canaries that flag refusal and drift.
_Tech:_ TypeScript, Node.js, Casbin, LDAP/Active Directory, OIDC, AES-256-GCM, PKCS#11, jose

### Etch-A-Chat ⭐
Privacy-focused real-time vector-drawing messenger.
Co-developed a privacy-focused messaging app where users exchange hand-drawn vector messages on a live collaborative canvas. Built with React Native (Expo + Skia), Socket.io, MongoDB, Redis, and RabbitMQ; 5 microservices with an API gateway on Kubernetes (AWS EKS), SHA-256 contact sync, phone-OTP auth, and push notifications. Monorepo managed with pnpm + Turborepo.
- Live collaborative vector canvas over Socket.io.
- 5 microservices on AWS EKS with phone-OTP auth and SHA-256 contact sync.
_Tech:_ React Native, Expo, Skia, Socket.io, MongoDB, Redis, RabbitMQ, Kubernetes, AWS EKS, pnpm, Turborepo

### On-Prem Intelligence Desk ⭐
A self-hosted, fully cited answer to "what should I run on-prem?": capacity fit, benchmarks, license gate, and adoption ring. — https://github.com/ekaynac/onprem-ai-adoption-radar
A self-hosted Python system (formerly the On-Prem AI Adoption Radar) that discovers and re-evaluates on-prem AI signals every two hours from 77 curated sources, scores them against a deterministic adoption rubric (adopt/pilot/watch/avoid), and republishes a static public edition. An Answer Machine turns a task plus hardware into a ranked, cited recommendation; a weekly analyst brief records Act/Evaluate/Ignore calls in a public ledger and scores them by the same rules. Adds benchmark triangulation across public leaderboards, model lineage, a hardware platform catalog, deterministic capacity planning, schema-validated LLM news classification, and an MCP server for agents. Core scoring needs no LLM; ≥80% coverage enforced.
- Deterministic, reproducible scoring: decisions come from a rubric, not a prompt, and every number carries its source.
- Publicly scored weekly calls, capacity planning over CLI and MCP, and benchmark triangulation that flags gaps instead of averaging them.
_Tech:_ Python, React, MCP, GitHub Actions, OSV.dev, Static Site (GitHub Pages)

### InfraMedic ⭐
Safety-first diagnose-and-remediate platform across seven infrastructure platforms, with an on-prem LLM analyst.
A Python platform that diagnoses managed infrastructure through a typed pipeline of immutable models (device registry, observations, signals, findings, run manifests). Seven platform adapters (VMware vCenter, Zabbix, Proxmox, HPE iLO, Linux, HPE StoreOnce, Axis) feed deterministic detectors; an Ollama-backed LLM analyst narrates signals into findings after pseudonymization and redaction, with sensitivity-aware routing that keeps restricted devices off cloud models. Encrypted secrets use audited just-in-time leases, remediation runs as sagas behind a deny-by-default policy gate and a sandbox, and a server-rendered operator UI covers devices, runs, findings, and audit. Conformance and safety suites guarantee secret values never leak into registry rows, audit records, manifests, or logs. Designed and built solo at Mega Bilgisayar (600+ pull requests); its roadmap is now developed by the Auto Dev Cycle.
- Deny-by-default policy gate, saga-based remediation, and purpose-bound secret leases with TTL and a full audit trail.
- Seven platform adapters with an on-prem LLM analyst that pseudonymizes before any prompt and fails closed for restricted devices.
_Tech:_ Python, Ollama, SQLite, vCenter, Zabbix, Proxmox, pytest

### Auto Dev Cycle ⭐
A self-driving software development loop run by a supervised network of low-cost and open-weight models.
A continuous development framework that takes roadmap tasks through ten stages (preflight, plan, build, test gate, review, edge check, merge, deploy, ledger, learning) without a human in the loop for routine work. Low-cost open-weight models such as GLM and Kimi do the building, a frontier model supervises, and an independent GPT reviewer is reserved for structural seam reviews, so most tokens go to cheap models that can run around the clock. Every model call, token count, gate result, and review finding is recorded to a ledger and surfaced on a live dashboard; each review finding is reproduced as a failing test before its fix lands, and proposed process improvements are logged but never auto-applied. It currently develops InfraMedic, delivering 25 ledgered PRs in its first two and a half weeks. Designed and built solo at Mega Bilgisayar.
- Ten-stage plan-build-gate-review-merge-deploy loop on low-cost models, with a frontier model only for supervision and seam review; shipped 25 ledgered InfraMedic PRs in 2.5 weeks.
- Every review finding reproduced as a failing test before its fix; every model call and token ledgered, and unmeasured work is reported as unmeasured, never as clean.
_Tech:_ Python, LLM Agents, GLM, Kimi, OpenRouter, Ollama Cloud, React, GitHub Actions

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
A single-node Proxmox VE platform rebuilt entirely from its own repository: three ZFS pools, Proxmox Backup Server with nightly jobs and a tested restore, NVIDIA GPU passthrough into unprivileged LXC containers with CUDA verified, public ingress through Cloudflare Tunnel, and admin access over a Tailscale subnet router, with no router port ever forwarded. Every phase ends with an execution log of what actually happened, and live host config is snapshotted into git after each change. Hosts this site at tensorenes.com.
- GPU-enabled unprivileged containers, tested backups, and public services over Cloudflare Tunnel with zero forwarded ports.
_Tech:_ Proxmox VE, ZFS, LXC, Cloudflare Tunnel, Tailscale, NVIDIA CUDA, Caddy

### Polemik Yayınları Website ⭐
Production website and catalog for an independent publishing house.
The live website of Polemik Yayınları: a React + TypeScript + Vite front end on a Strapi headless CMS with PostgreSQL. Includes a book catalog with Kitapyurdu links, an inventory view with location and stock filters, a manuscript-submission workflow, a catalog scraper, prerendered social-preview tags, a generated sitemap, a strict CSP, and privacy-friendly Umami analytics, deployed through GitHub Actions.
- Live publisher site on a Strapi CMS with an inventory view, submission workflow, and CI deploys.
_Tech:_ React, TypeScript, Vite, Strapi, PostgreSQL, Tailwind CSS

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
