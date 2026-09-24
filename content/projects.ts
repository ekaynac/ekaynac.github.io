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
      "A proprietary TypeScript/Node product (v1.15) that makes every LLM-agent session run as a real corporate identity. Binds agent memory, configuration, and tool access to Active Directory (LDAP) or OIDC, with deny-by-default Casbin authorization, per-identity AES-256-GCM envelope-encrypted memory, key rotation, and a hash-chained, signed audit trail. Ships an LLM gateway with host-side model attestation, behavioural canaries (refusal, anchor, and drift probes), and identity-scoped RAG, plus optional HSM/PKCS#11 — running entirely on-premise with no mandatory external service.",
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
      "Per-identity envelope encryption, deny-by-default Casbin, and a signed hash-chained audit trail, fully on-prem through v1.15.",
      "LLM gateway with host-side model attestation and behavioural canaries that flag refusal and drift.",
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
    name: "On-Prem Intelligence Desk",
    oneLiner:
      "A self-hosted, fully cited answer to \"what should I run on-prem?\": capacity fit, benchmarks, license gate, and adoption ring.",
    description:
      "A self-hosted Python system (formerly the On-Prem AI Adoption Radar) that discovers and re-evaluates on-prem AI signals every two hours from 77 curated sources, scores them against a deterministic adoption rubric (adopt/pilot/watch/avoid), and republishes a static public edition. An Answer Machine turns a task plus hardware into a ranked, cited recommendation; a weekly analyst brief records Act/Evaluate/Ignore calls in a public ledger and scores them by the same rules. Adds benchmark triangulation across public leaderboards, model lineage, a hardware platform catalog, deterministic capacity planning, schema-validated LLM news classification, and an MCP server for agents. Core scoring needs no LLM; ≥80% coverage enforced.",
    role: "Creator",
    tech: ["Python", "React", "MCP", "GitHub Actions", "OSV.dev", "Static Site (GitHub Pages)"],
    links: { repo: "https://github.com/ekaynac/onprem-ai-adoption-radar" },
    start: "2026-06",
    end: "present",
    featured: true,
    private: false,
    highlights: [
      "Deterministic, reproducible scoring: decisions come from a rubric, not a prompt, and every number carries its source.",
      "Publicly scored weekly calls, capacity planning over CLI and MCP, and benchmark triangulation that flags gaps instead of averaging them.",
    ],
  },
  {
    slug: "inframedic",
    name: "InfraMedic",
    oneLiner:
      "Safety-first diagnose-and-remediate platform across seven infrastructure platforms, with an on-prem LLM analyst.",
    description:
      "A Python platform that diagnoses managed infrastructure through a typed pipeline of immutable models (device registry, observations, signals, findings, run manifests). Seven platform adapters (VMware vCenter, Zabbix, Proxmox, HPE iLO, Linux, HPE StoreOnce, Axis) feed deterministic detectors; an Ollama-backed LLM analyst narrates signals into findings after pseudonymization and redaction, with sensitivity-aware routing that keeps restricted devices off cloud models. Encrypted secrets use audited just-in-time leases, remediation runs as sagas behind a deny-by-default policy gate and a sandbox, and a server-rendered operator UI covers devices, runs, findings, and audit. Conformance and safety suites guarantee secret values never leak into registry rows, audit records, manifests, or logs. Designed and built solo at Mega Bilgisayar (600+ pull requests); its roadmap is now developed by the Auto Dev Cycle.",
    role: "Sole creator (Mega Bilgisayar)",
    tech: ["Python", "Ollama", "SQLite", "vCenter", "Zabbix", "Proxmox", "pytest"],
    links: {},
    start: "2026-07",
    end: "present",
    featured: true,
    private: true,
    highlights: [
      "Deny-by-default policy gate, saga-based remediation, and purpose-bound secret leases with TTL and a full audit trail.",
      "Seven platform adapters with an on-prem LLM analyst that pseudonymizes before any prompt and fails closed for restricted devices.",
    ],
  },
  {
    slug: "auto-dev-cycle",
    name: "Auto Dev Cycle",
    oneLiner:
      "A self-driving software development loop run by a supervised network of low-cost and open-weight models.",
    description:
      "A continuous development framework that takes roadmap tasks through ten stages (preflight, plan, build, test gate, review, edge check, merge, deploy, ledger, learning) without a human in the loop for routine work. Low-cost open-weight models such as GLM and Kimi do the building, a frontier model supervises, and an independent GPT reviewer is reserved for structural seam reviews, so most tokens go to cheap models that can run around the clock. Every model call, token count, gate result, and review finding is recorded to a ledger and surfaced on a live dashboard; each review finding is reproduced as a failing test before its fix lands, and proposed process improvements are logged but never auto-applied. It currently develops InfraMedic, delivering 25 ledgered PRs in its first two and a half weeks. Designed and built solo at Mega Bilgisayar.",
    role: "Sole creator (Mega Bilgisayar)",
    tech: ["Python", "LLM Agents", "GLM", "Kimi", "OpenRouter", "Ollama Cloud", "React", "GitHub Actions"],
    links: {},
    start: "2026-09",
    end: "present",
    featured: true,
    private: true,
    highlights: [
      "Ten-stage plan-build-gate-review-merge-deploy loop on low-cost models, with a frontier model only for supervision and seam review; shipped 25 ledgered InfraMedic PRs in 2.5 weeks.",
      "Every review finding reproduced as a failing test before its fix; every model call and token ledgered, and unmeasured work is reported as unmeasured, never as clean.",
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
      "A single-node Proxmox VE platform rebuilt entirely from its own repository: three ZFS pools, Proxmox Backup Server with nightly jobs and a tested restore, NVIDIA GPU passthrough into unprivileged LXC containers with CUDA verified, public ingress through Cloudflare Tunnel, and admin access over a Tailscale subnet router, with no router port ever forwarded. Every phase ends with an execution log of what actually happened, and live host config is snapshotted into git after each change. Hosts this site at tensorenes.com.",
    role: "Creator",
    tech: ["Proxmox VE", "ZFS", "LXC", "Cloudflare Tunnel", "Tailscale", "NVIDIA CUDA", "Caddy"],
    links: {},
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
];
