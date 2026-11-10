import type { Project } from "./schema";

export const projects: Project[] = [
  {
    slug: "sims",
    name: "SIMS — Smart Inventory Management System",
    oneLiner:
      "10-microservice inventory platform with an MCP-powered AI assistant (graduation project).",
    description:
      "Architected a 10-microservice platform (PHP/Laravel, Node.js/Fastify, Python/FastAPI, React/TypeScript) with per-service MySQL databases, a Redis event bus, and an Nginx API gateway. Added RS256 JWT auth with RBAC, auto-generated OpenAPI docs, correlation-ID tracing, and CI/CD with GitHub Actions, plus an AI chat assistant with tool execution via the Model Context Protocol (MCP) supporting OpenAI and Anthropic LLMs.",
    role: "Architect & full-stack developer",
    tech: [
      "PHP", "Laravel", "Node.js", "Fastify", "Python", "FastAPI",
      "React", "TypeScript", "MySQL", "Redis", "Nginx", "MCP",
      "Docker", "GitHub Actions",
    ],
    links: {},
    start: "2025-09",
    end: "2026-06",
    featured: true,
    private: true,
    highlights: [
      "10 microservices across 4 languages with per-service databases and a Redis event bus.",
      "MCP-based AI assistant executing tools against the live system.",
    ],
  },
  {
    slug: "llmdap",
    name: "LLMDAP — LLM Directory-bound Access Protection",
    oneLiner:
      "Sovereign LLM-agent identity, memory protection, and audited gateway bound to AD/LDAP or OIDC.",
    description:
      "A proprietary TypeScript/Node product (v2.0) that makes every LLM-agent session run as a real corporate identity. Binds agent memory, configuration, and tool access to Active Directory (LDAP) or OIDC, with deny-by-default Casbin authorization, per-identity AES-256-GCM envelope-encrypted memory, key rotation, and a hash-chained, signed audit trail. Ships an LLM gateway with host-side model attestation, behavioural canaries (refusal, anchor, and drift probes), and identity-scoped RAG, plus a governed model bridge (chat, embeddings, rerank, and schema-typed decisions) with subject-bound caller authentication and per-call credential leases. Releases are signed images, and two internal security-audit rounds were closed before v2.0. Runs entirely on-premise with no mandatory external service; InfraMedic and Kütüphane route every model call through it.",
    role: "Author",
    tech: [
      "TypeScript", "Node.js", "Casbin", "LDAP/Active Directory",
      "OIDC", "AES-256-GCM", "PKCS#11", "jose",
    ],
    links: {},
    start: "2026-06",
    end: "present",
    featured: true,
    private: true,
    highlights: [
      "Per-identity envelope encryption, deny-by-default Casbin, and a signed hash-chained audit trail, fully on-prem through v2.0.",
      "Governed model bridge with host-side attestation, drift canaries, and per-call credential leases; every model call in InfraMedic and Kütüphane passes through it.",
    ],
  },
  {
    slug: "etch-a-chat",
    name: "Etch-A-Chat",
    oneLiner: "Privacy-focused real-time vector-drawing messenger.",
    description:
      "Co-developed a privacy-focused messaging app where users exchange hand-drawn vector messages on a live collaborative canvas. Built with React Native (Expo + Skia), Socket.io, MongoDB, Redis, and RabbitMQ; 5 microservices with an API gateway on Kubernetes (AWS EKS), SHA-256 contact sync, phone-OTP auth, and push notifications. Monorepo managed with pnpm + Turborepo.",
    role: "Co-developer",
    tech: [
      "React Native", "Expo", "Skia", "Socket.io", "MongoDB",
      "Redis", "RabbitMQ", "Kubernetes", "AWS EKS", "pnpm", "Turborepo",
    ],
    links: {},
    start: "2025-09",
    end: "2026-06",
    featured: true,
    private: true,
    highlights: [
      "Live collaborative vector canvas over Socket.io.",
      "5 microservices on AWS EKS with phone-OTP auth and SHA-256 contact sync.",
    ],
  },
  {
    slug: "onprem-ai-adoption-radar",
    name: "AI Radar Pulse",
    oneLiner:
      "New AI models, papers, repositories, and news, collected, triaged, and ranked every two hours, fully unattended.",
    description:
      "An unattended Python pipeline that collects new uploads from 30 lab organizations on Hugging Face, daily papers, fast-rising GitHub repositories, and lab and practitioner news every two hours, then ranks them in four lanes. A low-cost classifier answers facts about each item (event type, repository type, paper topic, whether it ships code or weights) and readable rules turn those facts into a ranking whose reasons are shown; when the classifier is down, the rules take over visibly. Quantizations and re-uploads are told apart from real releases by base-model tags, with no model call. Publishes a static site, RSS feeds, and a JSON feed, sends a daily Telegram digest with one-sentence Turkish explanations from a homelab worker, and runs a dead-man watchdog that alerts on stale publishes, empty lanes, failing sources, and degraded triage. It began as an on-prem AI adoption radar and intelligence platform (capacity planner, benchmark triangulation, MCP server); those layers were retired in November 2026 in favour of this narrower, cheaper tool.",
    role: "Creator",
    tech: ["Python", "React", "Hugging Face API", "GitHub Actions", "Telegram Bot API", "Playwright"],
    links: {
      repo: "https://github.com/ekaynac/onprem-ai-adoption-radar",
      demo: "https://ekaynac.github.io/onprem-ai-adoption-radar/",
    },
    start: "2026-06",
    end: "present",
    featured: true,
    private: false,
    highlights: [
      "Ranks every item by readable rules over classifier-answered facts, shows the reasons, and keeps filtered-out items visible.",
      "Two-hourly unattended publishing with RSS, a Telegram digest, and a watchdog that names any failing source.",
    ],
  },
  {
    slug: "inframedic",
    name: "InfraMedic",
    oneLiner:
      "Safety-first diagnose-and-remediate appliance for heterogeneous infrastructure, with an on-prem LLM analyst.",
    description:
      "A Python platform that diagnoses managed infrastructure through a typed pipeline of immutable models (device registry, observations, signals, findings, run manifests). Platform adapters (VMware vCenter, Zabbix, Proxmox, HPE iLO, Linux, HPE StoreOnce, Axis) feed deterministic detectors; an LLM analyst narrates signals into findings after pseudonymization and redaction, with sensitivity-aware routing that keeps restricted devices off cloud models and drops every cloud route when the appliance is air-gapped. Encrypted secrets use audited just-in-time leases, remediation runs as sagas behind a deny-by-default policy gate and a sandbox, and an operator console covers the fleet, investigations, approvals, model releases, and audit. Kobra runs ad-hoc device-audit sessions with session-scoped credentials and an audit receipt. Prompts are tuned by a nightly, budget-bounded DSPy/GEPA sweep against fixed suites, every model call goes through LLMDAP, and reference knowledge is read from Kütüphane. Conformance and safety suites guarantee secret values never leak into registry rows, audit records, manifests, or logs. Designed and built solo at Mega Bilgisayar (~1,000 merged pull requests, release 0.3.19); newer changes are delegated to nöbetçi-mcp.",
    role: "Sole creator (Mega Bilgisayar)",
    tech: ["Python", "LLMDAP", "DSPy", "SQLite", "vCenter", "Zabbix", "Proxmox", "pytest"],
    links: {},
    start: "2026-07",
    end: "present",
    featured: true,
    private: true,
    highlights: [
      "Deny-by-default policy gate, saga-based remediation, and purpose-bound secret leases with TTL and a full audit trail.",
      "~1,000 merged PRs; an on-prem LLM analyst that pseudonymizes before any prompt and fails closed for restricted or air-gapped devices.",
    ],
  },
  {
    slug: "auto-dev-cycle",
    name: "Unattended Coding Agents — Auto Dev Cycle → nöbetçi-mcp",
    oneLiner:
      "Three generations of an unattended coding loop, each measured honestly: build, gate, independent review, merge.",
    description:
      "An R&D line on getting cheap and local models to ship reviewed code without a person in the loop, built at Mega Bilgisayar. The first Auto Dev Cycle (Python, September 2026) had frontier models plan, review, and audit on subscriptions while GLM-5.3-flash via OpenRouter wrote the code and a local Qwen3.8-27B on an NVIDIA DGX Spark (vLLM) swept; it delivered 24 InfraMedic tasks (59 merged PRs) in 19 days at a median builder cost of about $2 per task, with every call and token ledgered. Its project-agnostic Go rewrite (October 2026, Apache-2.0) added a capacity scheduler, a model gateway, sandboxed gates bound to exact trees, and a language-agnostic referee that judges any agent's patch against hidden tests; a measured comparison (with the atolye harness: no-network sandboxes, a secret-redacting gateway filter, hidden-test acceptance) showed plain agent loops matching its acceptance rate at about a fourteenth of the wall time (mini-swe-agent 16/20 on a local 27B model), so it was stopped and archived with a public post-mortem. The current generation is nöbetçi-mcp: a small MCP server a supervisor agent uses to delegate a task, which loops build, full checks, and independent review until GO, counts only failures that are new against the base commit, runs the candidate's new tests against the base code (red-first), and pushes a branch but never merges. It now builds InfraMedic changes and can read and propose project memory in Kütüphane.",
    role: "Sole creator (Mega Bilgisayar)",
    tech: ["Python", "Go", "MCP", "vLLM", "OpenRouter", "DGX Spark", "Podman", "Claude Code", "Codex CLI"],
    links: { repo: "https://github.com/ekaynac/auto-dev-cycle" },
    start: "2026-09",
    end: "present",
    featured: true,
    private: false,
    highlights: [
      "Shipped 24 InfraMedic tasks (59 PRs) in 19 days at ~$2 builder cost each; stopped the Go rewrite when measurement showed plain agent loops did as well 14x faster.",
      "nöbetçi-mcp today: build, checks, and independent review loop until GO, red-first test checks, never merges.",
    ],
  },
  {
    slug: "kutuphane",
    name: "Kütüphane",
    oneLiner:
      "A governed knowledge catalog and memory layer that people, agents, and applications read from the same copy.",
    description:
      "An on-prem, air-gap-capable catalog and agent memory service: books, notes, rules, and skills, each carrying who wrote it (taken from the write path, never from a claim), who accepted it, where it applies, and what a model may do with it. Agents connect over MCP (search, cited answers, notes, links, code-citation checks, outcomes, signed packages) and applications over MCP or HTTP. Agents only propose; a person changes a note's standing, on the CLI with a separate database credential or by passkey on a phone. Notes are immutable and rollback is an event with a cause; rights, AI-input, and egress are checked before every embedding, rerank, and answer, and a local-only book never reaches a cloud route because every model call goes through LLMDAP. Skills are scanned at ingest; exports carry origin and rights. Python on PostgreSQL with hybrid search, Apache-2.0. InfraMedic reads its reference knowledge through it, and nöbetçi-mcp uses it as project memory.",
    role: "Sole creator (Mega Bilgisayar)",
    tech: ["Python", "PostgreSQL", "MCP", "OIDC", "WebAuthn", "LLMDAP", "Docker"],
    links: { repo: "https://github.com/ekaynac/kutuphane" },
    start: "2026-10",
    end: "present",
    featured: true,
    private: false,
    highlights: [
      "Provenance from the write path, person-only acceptance by passkey, and rights checked before every embedding and answer.",
      "MCP and HTTP interfaces, cited answers or an explicit not-in-library, and signed import/export packages.",
    ],
  },
  {
    slug: "vest-detection-system",
    name: "OHS Computer Vision Platform",
    oneLiner: "Industrial PPE-violation detection on edge hardware (Mega / Advantech Smart Production Systems).",
    description:
      "A containerized occupational-health-and-safety vision pipeline: zero-shot OWLv2 detection, ByteTrack tracking, PPE association, a violation state machine, and YuNet face anonymization, emitting structured violation events to JSONL and signed webhooks. Every component is selected from YAML config, so the same pipeline runs on a Mac, NVIDIA Jetson Xavier NX (TensorRT), and RTX workstations, with DVC-versioned models and a looping RTSP demo camera. Built for Mega Bilgisayar's Advantech Smart Production Systems.",
    role: "Lead developer (Mega Bilgisayar)",
    tech: ["Python", "OWLv2", "ByteTrack", "TensorRT", "Jetson Xavier NX", "Docker", "DVC"],
    links: {},
    start: "2026",
    end: "present",
    featured: false,
    private: true,
    highlights: [
      "Zero-shot OWLv2 + ByteTrack pipeline with face anonymization and signed violation webhooks, config-driven across Jetson and RTX targets.",
    ],
  },
  {
    slug: "bukaui",
    name: "BukaUI",
    oneLiner: "On-prem local-LLM platform (customized LibreChat) for Mega Bilgisayar.",
    description:
      "A customized LibreChat deployment providing a local, on-premise LLM chat platform for Mega Bilgisayar, integrating internal models and tooling for private enterprise use.",
    role: "Developer",
    tech: ["TypeScript", "LibreChat", "Docker", "LLMs"],
    links: {},
    start: "2026",
    end: "present",
    featured: false,
    private: true,
    highlights: [],
  },
  {
    slug: "hallux-valgus",
    name: "Automatic Hallux Valgus Angle Calculation",
    oneLiner: "Deep-learning + classical CV pipeline for automated foot-angle diagnosis (ICAT 2022).",
    description:
      "A pipeline combining YOLOv5 detection with classical image processing (segmentation, skeletonization) to automatically measure the Hallux Valgus angle from foot X-rays. Basis of a co-authored ICAT 2022 conference paper, in partnership with SBÜ Gülhane Hospital and Gazi University.",
    role: "Co-author & developer",
    tech: ["Python", "YOLOv5", "OpenCV", "Jupyter"],
    links: { repo: "https://github.com/ekaynac/HalluxValgus" },
    start: "2022",
    end: "2022",
    featured: false,
    private: false,
    highlights: [],
  },
  {
    slug: "teknofest-siha-dataset",
    name: "Teknofest SİHA Dataset",
    oneLiner: "Open-source ~11,500-image UAV detection dataset (Teknofest 2022).",
    description:
      "An open-source aerial-vehicle detection dataset (8,815 training / 2,650 validation images) curated from flight footage and published in YOLOv5 format for the Teknofest 2022 Combat UAV competition, by Meturone's OTUS UCAV subteam.",
    role: "Curator",
    tech: ["YOLOv5", "Computer Vision", "Dataset"],
    links: { repo: "https://github.com/ekaynac/Teknofest-SIHA-dataset" },
    start: "2022",
    end: "2022",
    featured: false,
    private: false,
    highlights: [],
  },
  {
    slug: "fanzinapp",
    name: "FanzinApp",
    oneLiner: "Mobile platform for fanzine submission, review, and archiving (Erasmus project).",
    description:
      "A mobile app that streamlines fanzine submission and editorial review and builds a digital archive of past issues, making independent fanzines more accessible. Built with a Kotlin/Android front end on a Firebase (Firestore, Auth, Storage) backend. Developed at FH Hagenberg with Ecem Tekiner.",
    role: "Co-developer",
    tech: ["Kotlin", "Android", "Firebase", "Firestore"],
    links: {},
    start: "2024-10",
    end: "2025-02",
    featured: false,
    private: true,
    highlights: [],
  },
  {
    slug: "homelab",
    name: "Homelab — Proxmox Platform",
    oneLiner: "Infrastructure-as-documentation home server with GPU containers and zero open ports.",
    description:
      "A single-node Proxmox VE platform rebuilt entirely from its own repository: three ZFS pools, Proxmox Backup Server with nightly jobs and a tested restore, NVIDIA GPU passthrough into unprivileged LXC containers with CUDA verified, public ingress through Cloudflare Tunnel, and admin access over a Tailscale subnet router, with no router port ever forwarded. Every phase ends with an execution log of what actually happened, live host config is snapshotted into git after each change, and guest-to-guest traffic is default-deny with an explicit allow-list. Runs the LLMDAP demo stack, the AI Radar Pulse digest worker, self-hosted CI runners, and scheduled scrapers alongside this site at tensorenes.com, and explains itself at lab.tensorenes.com: a live, bilingual engineering drawing of why the lab exists and how it is built, fed by coarse, leak-checked metrics.",
    role: "Creator",
    tech: ["Proxmox VE", "ZFS", "LXC", "Cloudflare Tunnel", "Tailscale", "NVIDIA CUDA", "Caddy"],
    links: { demo: "https://lab.tensorenes.com" },
    start: "2026-09",
    end: "present",
    featured: true,
    private: true,
    highlights: [
      "GPU-enabled unprivileged containers, tested backups, and public services over Cloudflare Tunnel with zero forwarded ports.",
    ],
  },
  {
    slug: "polemik-site",
    name: "Polemik Yayınları Website",
    oneLiner: "Production website and catalog for an independent publishing house.",
    description:
      "The live website of Polemik Yayınları: a React + TypeScript + Vite front end on a Strapi headless CMS with PostgreSQL. Includes a book catalog with Kitapyurdu links, an inventory view with location and stock filters, a manuscript-submission workflow, a catalog scraper, prerendered social-preview tags, a generated sitemap, a strict CSP, and privacy-friendly Umami analytics, deployed through GitHub Actions.",
    role: "Developer",
    tech: ["React", "TypeScript", "Vite", "Strapi", "PostgreSQL", "Tailwind CSS"],
    links: { demo: "https://polemikyayin.com" },
    start: "2026-02",
    end: "present",
    featured: true,
    private: true,
    highlights: [
      "Live publisher site on a Strapi CMS with an inventory view, submission workflow, and CI deploys.",
    ],
  },
  {
    slug: "kure-dizgi",
    name: "Küre Dizgi — Sphere Poetry Typesetting",
    oneLiner: "Offline editor that lays a poem out on a sphere and projects it onto printed book pages.",
    description:
      "Open-source tools split out of the typesetting of A. Tolga Suyolcuoğlu's poem Melissa Önermesi: a browser editor that lays rich text over a 16-leaf sphere with 3D, fixed-pole, leaf-pair, and neighbourhood views, and a book-projection view that fits the layout onto 130 × 195 mm pages without silently shrinking the type (the true point size is kept at the spine and the horizontal compression toward the edge is reported). Exports JSON, SVG with embedded fonts, PNG, and print PDF; a Python CLI splits the unfolding into a 16-page vector appendix, and an InDesign script places it into the book and exports IDML and PDF. Runs from a file with no build step or network; MIT-licensed, with the poem and publisher assets kept out of the package.",
    role: "Creator",
    tech: ["JavaScript", "SVG", "Quill", "Python", "PyMuPDF", "InDesign scripting"],
    links: {
      repo: "https://github.com/ekaynac/kure-dizgi",
      demo: "https://ekaynac.github.io/kure-dizgi/",
    },
    start: "2026-10",
    end: "2026-10",
    featured: true,
    private: false,
    highlights: [
      "Typesets a poem on a sphere and projects it to print without hiding a point-size cut.",
    ],
  },
];
