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
      "Sovereign LLM-agent identity and memory protection bound to AD/LDAP or OIDC.",
    description:
      "A TypeScript/Node library that binds LLM-agent memory, configuration, and tool access to Active Directory (LDAP) or OIDC identities. Provides fine-grained Casbin authorization, AES-256-GCM envelope-encrypted memory, key rotation, a tamper-evident hash-chained audit trail, and optional HSM/PKCS#11 — running entirely on-premise with no mandatory external service.",
    role: "Author",
    tech: [
      "TypeScript", "Node.js", "Casbin", "LDAP/Active Directory",
      "OIDC", "AES-256-GCM", "PKCS#11", "jose",
    ],
    links: { repo: "https://github.com/ekaynac/LLMDAP" },
    start: "2026-06",
    end: "present",
    featured: true,
    private: false,
    highlights: [
      "On-prem by default: LDAP identity, embedded Casbin, local encrypted storage, hash-chained audit.",
      "Optional adapters (HSM/PKCS#11, OIDC) loaded lazily so the lean profile stays dependency-light.",
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
    links: { repo: "https://github.com/ekaynac/EtchaMessage" },
    start: "2025-09",
    end: "2026-06",
    featured: true,
    private: false,
    highlights: [
      "Live collaborative vector canvas over Socket.io.",
      "5 microservices on AWS EKS with phone-OTP auth and SHA-256 contact sync.",
    ],
  },
  {
    slug: "onprem-ai-adoption-radar",
    name: "On-Prem AI Adoption Radar",
    oneLiner:
      "A deterministic, self-hosted radar that decides which AI/agent tools to adopt, pilot, watch, or avoid.",
    description:
      "A self-hosted Python system that collects real signals (GitHub releases, registries, vendor blogs), scores them against an on-prem adoption rubric, and produces decision cards with adopt/pilot/watch/avoid rings plus a cumulative timeline. The core scoring pipeline is fully deterministic (LLM optional and off by default), with OSV.dev security gating, license-change detection, an MCP server, and a daily GitHub Action that auto-publishes a static dashboard. 352 tests with ≥80% coverage enforced.",
    role: "Creator",
    tech: ["Python", "MCP", "GitHub Actions", "OSV.dev", "Static Site (GitHub Pages)"],
    links: { repo: "https://github.com/ekaynac/onprem-ai-adoption-radar" },
    start: "2026-06",
    end: "present",
    featured: true,
    private: false,
    highlights: [
      "Deterministic, reproducible scoring — decisions come from a rubric, not a prompt.",
      "Evidence-based: star growth, release cadence, and OSV security advisories drive ring changes.",
    ],
  },
  {
    slug: "vest-detection-system",
    name: "Vest Detection System",
    oneLiner: "Industrial PPE/safety-vest detection on edge hardware (Mega / Advantech).",
    description:
      "A computer-vision safety system that detects personal protective equipment (safety vests) in industrial environments, deployed on Advantech edge hardware with YOLO-based detection for Mega Bilgisayar's Smart Production Systems.",
    role: "Developer",
    tech: ["Python", "YOLO", "OpenCV", "Advantech", "Edge AI"],
    links: {},
    start: "2026",
    end: "present",
    featured: false,
    private: true,
    highlights: [],
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
];
