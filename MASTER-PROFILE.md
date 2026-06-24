# Enes Kaynakcı
**AI / Software Engineer** · Ankara, Türkiye
tensorenes@gmail.com · https://github.com/ekaynac · https://www.linkedin.com/in/enes-kaynakci/ · https://ekaynac.github.io

> Generated from the content dataset. Do not edit by hand — edit `content/*.ts` and run `npm run generate:profile`.

## Summary

AI-leaning full-stack engineer who ships end to end: LLM and agent pipelines and computer-vision systems backed by production microservices and modern web and mobile front-ends. Bilkent University Information Systems graduate (2026), currently building on-prem AI platforms, computer-vision and LLM systems at Mega Bilgisayar.

**Languages:** Turkish (Native), English (C1), German (Beginner)

## Experience

### AI / Software Engineer — Mega Bilgisayar
2026-05-18 – Present · Ankara, Türkiye · full-time
- Build on-prem LLM platforms and agent tooling, including a customized LibreChat deployment and MCP & n8n based portal agents for internal workflows.
- Designed LLMDAP, a sovereign LLM-agent identity and memory-protection library binding agent memory and tool access to AD/LDAP or OIDC identities with Casbin authorization, envelope encryption, and a tamper-evident audit trail.
- R&D'd computer-vision industrial-safety systems (PPE/vest detection) on Nvidia Jetson edge hardware using YOLO, SAM, DepthAnything etc. models.
- Created the On-Prem AI Adoption Radar: a deterministic, self-hosted system that scores and ranks AI and agent tooling for enterprise adoption, with an MCP server and an auto-publishing static dashboard.
_Tech:_ TypeScript, Python, LLMs, RAG, MCP, Casbin, LDAP/OIDC, YOLO, Docker, GitHub Actions

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
- Teknofest International UAV Competition finalist (2021 and 2022); deployed FP16-quantized YOLOv5 on Jetson Xavier for real-time aerial perception.
- Curated and published an ~11,500-image (8,815 train / 2,650 validation) UAV detection dataset for open-source use.
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
Sovereign LLM-agent identity and memory protection bound to AD/LDAP or OIDC. — https://github.com/ekaynac/LLMDAP
A TypeScript/Node library that binds LLM-agent memory, configuration, and tool access to Active Directory (LDAP) or OIDC identities. Provides fine-grained Casbin authorization, AES-256-GCM envelope-encrypted memory, key rotation, a tamper-evident hash-chained audit trail, and optional HSM/PKCS#11 — running entirely on-premise with no mandatory external service.
- On-prem by default: LDAP identity, embedded Casbin, local encrypted storage, hash-chained audit.
- Optional adapters (HSM/PKCS#11, OIDC) loaded lazily so the lean profile stays dependency-light.
_Tech:_ TypeScript, Node.js, Casbin, LDAP/Active Directory, OIDC, AES-256-GCM, PKCS#11, jose

### Etch-A-Chat ⭐
Privacy-focused real-time vector-drawing messenger. — https://github.com/ekaynac/EtchaMessage
Co-developed a privacy-focused messaging app where users exchange hand-drawn vector messages on a live collaborative canvas. Built with React Native (Expo + Skia), Socket.io, MongoDB, Redis, and RabbitMQ; 5 microservices with an API gateway on Kubernetes (AWS EKS), SHA-256 contact sync, phone-OTP auth, and push notifications. Monorepo managed with pnpm + Turborepo.
- Live collaborative vector canvas over Socket.io.
- 5 microservices on AWS EKS with phone-OTP auth and SHA-256 contact sync.
_Tech:_ React Native, Expo, Skia, Socket.io, MongoDB, Redis, RabbitMQ, Kubernetes, AWS EKS, pnpm, Turborepo

### On-Prem AI Adoption Radar ⭐
A deterministic, self-hosted radar that decides which AI/agent tools to adopt, pilot, watch, or avoid. — https://github.com/ekaynac/onprem-ai-adoption-radar
A self-hosted Python system that collects real signals (GitHub releases, registries, vendor blogs), scores them against an on-prem adoption rubric, and produces decision cards with adopt/pilot/watch/avoid rings plus a cumulative timeline. The core scoring pipeline is fully deterministic (LLM optional and off by default), with OSV.dev security gating, license-change detection, an MCP server, and a daily GitHub Action that auto-publishes a static dashboard. 352 tests with ≥80% coverage enforced.
- Deterministic, reproducible scoring — decisions come from a rubric, not a prompt.
- Evidence-based: star growth, release cadence, and OSV security advisories drive ring changes.
_Tech:_ Python, MCP, GitHub Actions, OSV.dev, Static Site (GitHub Pages)

### Vest Detection System (private)
Industrial PPE/safety-vest detection on edge hardware (Mega / Advantech).
A computer-vision safety system that detects personal protective equipment (safety vests) in industrial environments, deployed on Advantech edge hardware with YOLO-based detection for Mega Bilgisayar's Smart Production Systems.
_Tech:_ Python, YOLO, OpenCV, Advantech, Edge AI

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

## Education

- **B.Sc. in Information Systems and Technologies**, Bilkent University (2022-08 – 2026-06) — Graduated June 2026, CGPA 3.08/4.00; Honour standing in multiple semesters.
- **Erasmus Exchange Student**, FH Upper Austria, Hagenberg Campus (2024-10 – 2025-02)
- **B.Sc. in Electrical-Electronics Engineering (transferred)**, Middle East Technical University (METU) (2018-09 – 2021-06) — Transferred to Bilkent University.

## Skills

- **Languages:** Python, TypeScript, JavaScript, PHP, Java, C, Dart, Kotlin
- **AI & ML:** LLM Pipelines, RAG, Function Calling, Agents, MCP, Transformers, Embeddings, DSPy, TensorFlow, PyTorch, OpenCV, TensorRT, YOLOv5
- **Web & Mobile:** React, Next.js, React Native (Expo), Node.js, Express, Fastify, FastAPI, Laravel, Socket.io, Tailwind CSS, Vite
- **Infrastructure & Tools:** Docker, Kubernetes (EKS), Nginx, MySQL, MongoDB, Redis, RabbitMQ, GitHub Actions, Git, Supabase, Vercel, LDAP/OIDC, Casbin

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
- Published the poetry book "Uyandı Uyudu" (Kharon Yayınları, 2024); second book in progress.

### Theatrical Poetry Moderator — METU Voicing Society (creative)
2022-09 – Present
