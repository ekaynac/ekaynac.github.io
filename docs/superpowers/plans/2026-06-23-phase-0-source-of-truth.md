# Phase 0 — Source-of-Truth Content Package · Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a typed, schema-validated content dataset that is the single source of truth for Enes Kaynakcı's CV, GitHub profile, LinkedIn pack, and personal website.

**Architecture:** A small TypeScript package at the repo root. Zod schemas (`content/schema.ts`) define the shape and invariants; plain typed data files (`content/*.ts`) hold the facts with zero runtime deps; `content/index.ts` aggregates them into one `profile` object the website and other phases import. Validation runs in Vitest tests (Zod `.parse` + custom invariants, including a privacy guard); a `tsx` script renders `MASTER-PROFILE.md` from the same data. Data files stay dependency-free so the website bundle never pulls in Zod.

**Tech Stack:** TypeScript (ESM), Zod (validation), Vitest (tests), tsx (script runner), Node 26 / npm.

## Global Constraints

- Node ESM only — `"type": "module"` in package.json; imports are extensionless (resolved by tsx/Vitest/Bundler resolution).
- Data files (`content/profile.ts`, `experience.ts`, `projects.ts`, `education.ts`, `certifications.ts`, `publications.ts`, `leadership.ts`, `skills.ts`) must import **only types** from `./schema` — never the `zod` runtime. Validation happens in tests/index, not in data files.
- Canonical public email is exactly `tensorenes@gmail.com`. Public links: GitHub `https://github.com/ekaynac`, LinkedIn `https://www.linkedin.com/in/enes-kaynakci/`, website `https://ekaynac.github.io`.
- **Privacy (hard rule):** no national ID, home address, parents' names, or personal phone numbers anywhere in committed files. A test enforces this (no 11-digit runs, no Turkish-mobile patterns).
- Exactly **4 featured projects**, slugs: `sims`, `llmdap`, `etch-a-chat`, `onprem-ai-adoption-radar`.
- Exactly **1** experience entry with `current: true` (Mega Bilgisayar, AI / Software Engineer, started `2026-05-18`).
- Dates are strings: `YYYY-MM`, `YYYY-MM-DD`, or the literal `present`.
- Conventional commits (`feat:`, `test:`, `chore:`). Commit after every task. Local git identity is already set (Enes); repo already initialized.
- All work happens in `/Users/eneskaynakci/Github/CV`.

---

### Task 1: Tooling scaffold

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `vitest.config.ts`
- Test: `content/__tests__/smoke.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: a working `npm test` (Vitest) and `npm run typecheck`. Later tasks add tests under `content/__tests__/` and `scripts/__tests__/`.

- [ ] **Step 1: Write the failing test**

Create `content/__tests__/smoke.test.ts`:

```ts
import { describe, it, expect } from "vitest";

describe("toolchain", () => {
  it("runs vitest", () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — `npm` error "Missing script: test" / no package.json yet.

- [ ] **Step 3: Write minimal implementation**

Create `package.json`:

```json
{
  "name": "ekaynac-profile",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "typecheck": "tsc --noEmit",
    "generate:profile": "tsx scripts/generate-master-profile.ts"
  },
  "dependencies": {
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@types/node": "^22.10.0",
    "tsx": "^4.19.2",
    "typescript": "^5.7.2",
    "vitest": "^2.1.8"
  }
}
```

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "types": ["node"]
  },
  "include": ["content", "scripts"]
}
```

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["content/**/*.test.ts", "scripts/**/*.test.ts"],
  },
});
```

Then install: `npm install`

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS — 1 test passed (smoke).

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json tsconfig.json vitest.config.ts content/__tests__/smoke.test.ts
git commit -m "chore: scaffold TypeScript content package (vitest, zod, tsx)"
```

---

### Task 2: Content schema

**Files:**
- Create: `content/schema.ts`
- Test: `content/__tests__/schema.test.ts`

**Interfaces:**
- Consumes: `zod`.
- Produces (consumed by all data files as **types** and by tests as **schemas**):
  - Schemas: `profileSchema`, `experienceSchema`, `projectSchema`, `educationSchema`, `certificationSchema`, `publicationSchema`, `leadershipSchema`, `skillGroupSchema`, `profileDataSchema`.
  - Types: `Profile`, `Experience`, `Project`, `Education`, `Certification`, `Publication`, `Leadership`, `SkillGroup`, `ProfileData`.
  - Helpers: `dateRef` (zod string), `urlSchema` (zod string url).

- [ ] **Step 1: Write the failing test**

Create `content/__tests__/schema.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import {
  dateRef,
  experienceSchema,
  projectSchema,
  profileDataSchema,
} from "../schema";

describe("schema", () => {
  it("accepts valid date refs and rejects bad ones", () => {
    expect(dateRef.safeParse("2026-05").success).toBe(true);
    expect(dateRef.safeParse("2026-05-18").success).toBe(true);
    expect(dateRef.safeParse("present").success).toBe(true);
    expect(dateRef.safeParse("May 2026").success).toBe(false);
  });

  it("requires at least one highlight on experience", () => {
    const bad = experienceSchema.safeParse({
      org: "X", role: "Y", location: "Z",
      start: "2020-01", end: "present", current: true,
      employmentType: "full-time", highlights: [], tech: [],
    });
    expect(bad.success).toBe(false);
  });

  it("validates a minimal project and rejects a bad slug", () => {
    const ok = projectSchema.safeParse({
      slug: "demo", name: "Demo", oneLiner: "x",
      description: "a".repeat(40), tech: ["TS"], featured: false,
    });
    expect(ok.success).toBe(true);
    const bad = projectSchema.safeParse({
      slug: "Bad Slug", name: "Demo", oneLiner: "x",
      description: "a".repeat(40), tech: ["TS"], featured: false,
    });
    expect(bad.success).toBe(false);
  });

  it("exposes profileDataSchema as an object schema", () => {
    expect(typeof profileDataSchema.parse).toBe("function");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — `Cannot find module '../schema'`.

- [ ] **Step 3: Write minimal implementation**

Create `content/schema.ts`:

```ts
import { z } from "zod";

export const dateRef = z
  .string()
  .regex(/^(\d{4}-\d{2}(-\d{2})?|present)$/, "Use YYYY-MM, YYYY-MM-DD, or 'present'");

export const urlSchema = z.string().url();

export const profileSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  tagline: z.string().min(1),
  location: z.string().min(1),
  email: z.string().email(),
  links: z.object({
    github: urlSchema,
    linkedin: urlSchema,
    website: urlSchema,
  }),
  summary: z.string().min(40),
  languages: z
    .array(z.object({ name: z.string().min(1), level: z.string().min(1) }))
    .min(1),
});

export const experienceSchema = z.object({
  org: z.string().min(1),
  role: z.string().min(1),
  location: z.string().min(1),
  start: dateRef,
  end: dateRef,
  current: z.boolean(),
  employmentType: z.enum([
    "full-time",
    "part-time",
    "internship",
    "contract",
    "volunteer",
  ]),
  highlights: z.array(z.string().min(1)).min(1),
  tech: z.array(z.string().min(1)).default([]),
});

export const projectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/, "lowercase kebab-case"),
  name: z.string().min(1),
  oneLiner: z.string().min(1),
  description: z.string().min(40),
  role: z.string().optional(),
  tech: z.array(z.string().min(1)).min(1),
  links: z
    .object({ repo: urlSchema.optional(), demo: urlSchema.optional() })
    .default({}),
  start: dateRef.optional(),
  end: dateRef.optional(),
  featured: z.boolean(),
  private: z.boolean().default(false),
  highlights: z.array(z.string().min(1)).default([]),
});

export const educationSchema = z.object({
  org: z.string().min(1),
  credential: z.string().min(1),
  location: z.string().min(1),
  start: dateRef,
  end: dateRef,
  note: z.string().optional(),
});

export const certificationSchema = z.object({
  title: z.string().min(1),
  issuer: z.string().min(1),
  date: dateRef,
  credentialId: z.string().optional(),
  url: urlSchema.optional(),
});

export const publicationSchema = z.object({
  title: z.string().min(1),
  authors: z.string().min(1),
  venue: z.string().min(1),
  year: z.number().int().gte(2000).lte(2100),
  details: z.string().optional(),
  url: urlSchema.optional(),
});

export const leadershipSchema = z.object({
  org: z.string().min(1),
  role: z.string().min(1),
  start: dateRef,
  end: dateRef,
  category: z.enum(["leadership", "creative", "community"]),
  highlights: z.array(z.string().min(1)).default([]),
});

export const skillGroupSchema = z.object({
  category: z.string().min(1),
  items: z.array(z.string().min(1)).min(1),
});

export const profileDataSchema = z.object({
  profile: profileSchema,
  experience: z.array(experienceSchema).min(1),
  projects: z.array(projectSchema).min(1),
  education: z.array(educationSchema).min(1),
  certifications: z.array(certificationSchema),
  publications: z.array(publicationSchema),
  leadership: z.array(leadershipSchema),
  skills: z.array(skillGroupSchema).min(1),
});

export type Profile = z.infer<typeof profileSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Certification = z.infer<typeof certificationSchema>;
export type Publication = z.infer<typeof publicationSchema>;
export type Leadership = z.infer<typeof leadershipSchema>;
export type SkillGroup = z.infer<typeof skillGroupSchema>;
export type ProfileData = z.infer<typeof profileDataSchema>;
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS — schema tests + smoke pass.

- [ ] **Step 5: Commit**

```bash
git add content/schema.ts content/__tests__/schema.test.ts
git commit -m "feat: add zod content schema and inferred types"
```

---

### Task 3: Profile + education data

**Files:**
- Create: `content/profile.ts`
- Create: `content/education.ts`
- Test: `content/__tests__/profile.test.ts`

**Interfaces:**
- Consumes: types `Profile`, `Education` from `./schema`.
- Produces: `export const profile: Profile` and `export const education: Education[]`.

- [ ] **Step 1: Write the failing test**

Create `content/__tests__/profile.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { profileSchema, educationSchema } from "../schema";
import { profile } from "../profile";
import { education } from "../education";

describe("profile + education data", () => {
  it("profile matches schema", () => {
    expect(profileSchema.parse(profile)).toBeTruthy();
  });
  it("uses the canonical public email", () => {
    expect(profile.email).toBe("tensorenes@gmail.com");
  });
  it("links point to the right accounts", () => {
    expect(profile.links.github).toBe("https://github.com/ekaynac");
    expect(profile.links.website).toBe("https://ekaynac.github.io");
  });
  it("education entries all validate and include Bilkent", () => {
    education.forEach((e) => expect(educationSchema.parse(e)).toBeTruthy());
    expect(education.some((e) => e.org.includes("Bilkent"))).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — `Cannot find module '../profile'`.

- [ ] **Step 3: Write minimal implementation**

Create `content/profile.ts`:

```ts
import type { Profile } from "./schema";

export const profile: Profile = {
  name: "Enes Kaynakcı",
  title: "AI / Software Engineer",
  tagline:
    "AI / Software Engineer — LLM pipelines, computer vision, and end-to-end product delivery",
  location: "Ankara, Türkiye",
  email: "tensorenes@gmail.com",
  links: {
    github: "https://github.com/ekaynac",
    linkedin: "https://www.linkedin.com/in/enes-kaynakci/",
    website: "https://ekaynac.github.io",
  },
  summary:
    "AI-leaning full-stack engineer who ships end to end: LLM and agent pipelines and computer-vision systems backed by production microservices and modern web and mobile front-ends. Bilkent University Information Systems graduate (2026), currently building on-prem AI platforms and computer-vision systems at Mega Bilgisayar.",
  languages: [
    { name: "Turkish", level: "Native" },
    { name: "English", level: "C1" },
    { name: "German", level: "Beginner" },
  ],
};
```

Create `content/education.ts`:

```ts
import type { Education } from "./schema";

export const education: Education[] = [
  {
    org: "Bilkent University",
    credential: "B.Sc. in Information Systems and Technologies",
    location: "Ankara, Türkiye",
    start: "2022-08",
    end: "2026-06",
    note: "Graduated June 2026, CGPA 3.08/4.00; Honour standing in multiple semesters.",
  },
  {
    org: "FH Upper Austria, Hagenberg Campus",
    credential: "Erasmus Exchange Student",
    location: "Hagenberg, Austria",
    start: "2024-10",
    end: "2025-02",
  },
  {
    org: "Middle East Technical University (METU)",
    credential: "B.Sc. in Electrical-Electronics Engineering (transferred)",
    location: "Ankara, Türkiye",
    start: "2018-09",
    end: "2021-06",
    note: "Transferred to Bilkent University.",
  },
];
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add content/profile.ts content/education.ts content/__tests__/profile.test.ts
git commit -m "feat: add profile and education data"
```

---

### Task 4: Experience data

**Files:**
- Create: `content/experience.ts`
- Test: `content/__tests__/experience.test.ts`

**Interfaces:**
- Consumes: type `Experience` from `./schema`.
- Produces: `export const experience: Experience[]`.

- [ ] **Step 1: Write the failing test**

Create `content/__tests__/experience.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { experienceSchema } from "../schema";
import { experience } from "../experience";

describe("experience data", () => {
  it("all entries validate", () => {
    experience.forEach((e) => expect(experienceSchema.parse(e)).toBeTruthy());
  });
  it("has exactly one current role and it is Mega full-time from 2026-05-18", () => {
    const current = experience.filter((e) => e.current);
    expect(current).toHaveLength(1);
    expect(current[0].org).toBe("Mega Bilgisayar");
    expect(current[0].employmentType).toBe("full-time");
    expect(current[0].start).toBe("2026-05-18");
    expect(current[0].end).toBe("present");
  });
  it("includes the Mia internship with the 100/100 evaluation highlight", () => {
    const mia = experience.find((e) => e.org === "Mia Teknoloji");
    expect(mia).toBeDefined();
    expect(mia!.highlights.some((h) => h.includes("100/100"))).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — `Cannot find module '../experience'`.

- [ ] **Step 3: Write minimal implementation**

Create `content/experience.ts`:

```ts
import type { Experience } from "./schema";

export const experience: Experience[] = [
  {
    org: "Mega Bilgisayar",
    role: "AI / Software Engineer",
    location: "Ankara, Türkiye",
    start: "2026-05-18",
    end: "present",
    current: true,
    employmentType: "full-time",
    highlights: [
      "Build on-prem LLM platforms and agent tooling, including a customized LibreChat deployment (BukaUI) and MCP-based portal agents for internal workflows.",
      "Designed LLMDAP, a sovereign LLM-agent identity and memory-protection library binding agent memory and tool access to AD/LDAP or OIDC identities with Casbin authorization, envelope encryption, and a tamper-evident audit trail.",
      "Developed computer-vision industrial-safety systems (PPE/vest detection) on Advantech edge hardware using YOLO.",
      "Created the On-Prem AI Adoption Radar: a deterministic, self-hosted system that scores and ranks AI and agent tooling for enterprise adoption, with an MCP server and an auto-publishing static dashboard.",
    ],
    tech: [
      "TypeScript", "Python", "LLMs", "RAG", "MCP", "Casbin",
      "LDAP/OIDC", "YOLO", "Docker", "GitHub Actions",
    ],
  },
  {
    org: "Mia Teknoloji",
    role: "AI Intern, AI R&D",
    location: "Ankara, Türkiye",
    start: "2025-02",
    end: "2025-07",
    current: false,
    employmentType: "internship",
    highlights: [
      "Engineered end-to-end LLM agent pipelines using RAG, function calling, transformers, and embedding models.",
      "Delivered a production SQL-generation pipeline with a 3-tier fallback mechanism using OpenWebUI and local LLMs.",
      "Built a Turkish translation pipeline integrating Zemberek morphology for improved contextual accuracy.",
      "Received a 100/100 internship evaluation (all competencies rated Excellent) and was nominated for the company's Best Internship award.",
    ],
    tech: [
      "Python", "RAG", "Function Calling", "Transformers",
      "Embeddings", "OpenWebUI", "Zemberek", "Local LLMs",
    ],
  },
  {
    org: "Mega Bilgisayar",
    role: "AI Solutions Team",
    location: "Ankara, Türkiye",
    start: "2024-06",
    end: "2024-08",
    current: false,
    employmentType: "part-time",
    highlights: [
      "Developed and deployed an industrial safety system using YOLOv5 and OpenCV on NVIDIA Jetson with TensorRT optimization.",
    ],
    tech: ["YOLOv5", "OpenCV", "NVIDIA Jetson", "TensorRT", "Python"],
  },
  {
    org: "Meturone (Fixed-wing UAV Team)",
    role: "Computer Vision Team Member",
    location: "Ankara, Türkiye",
    start: "2021-09",
    end: "2023-09",
    current: false,
    employmentType: "volunteer",
    highlights: [
      "Teknofest International UAV Competition finalist (2021 and 2022); deployed FP16-quantized YOLOv5 on Jetson Xavier for real-time aerial perception.",
      "Curated and published an ~11,500-image (8,815 train / 2,650 validation) UAV detection dataset for open-source use.",
    ],
    tech: ["YOLOv5", "TensorRT", "Jetson Xavier", "OpenCV", "Python"],
  },
  {
    org: "METU Formula Racing — Driverless",
    role: "Perception Team Member",
    location: "Ankara, Türkiye",
    start: "2021-09",
    end: "2022-09",
    current: false,
    employmentType: "volunteer",
    highlights: [
      "Trained a YOLO cone-detection model and deployed an FP16-quantized YOLOv5 to NVIDIA Jetson Xavier with TensorRT for the driverless vehicle's perception stack.",
    ],
    tech: ["YOLOv5", "TensorRT", "Jetson Xavier", "Python"],
  },
];
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add content/experience.ts content/__tests__/experience.test.ts
git commit -m "feat: add experience data"
```

---

### Task 5: Projects data

**Files:**
- Create: `content/projects.ts`
- Test: `content/__tests__/projects.test.ts`

**Interfaces:**
- Consumes: type `Project` from `./schema`.
- Produces: `export const projects: Project[]`.

- [ ] **Step 1: Write the failing test**

Create `content/__tests__/projects.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { projectSchema } from "../schema";
import { projects } from "../projects";

describe("projects data", () => {
  it("all entries validate", () => {
    projects.forEach((p) => expect(projectSchema.parse(p)).toBeTruthy());
  });
  it("has exactly the four expected featured projects", () => {
    const featured = projects.filter((p) => p.featured).map((p) => p.slug).sort();
    expect(featured).toEqual(
      ["etch-a-chat", "llmdap", "onprem-ai-adoption-radar", "sims"]
    );
  });
  it("slugs are unique", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
  it("private projects do not expose a repo link", () => {
    projects
      .filter((p) => p.private)
      .forEach((p) => expect(p.links.repo).toBeUndefined());
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — `Cannot find module '../projects'`.

- [ ] **Step 3: Write minimal implementation**

Create `content/projects.ts`:

```ts
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
    links: { repo: "https://github.com/sims-1/sims" },
    start: "2025-09",
    end: "2026-06",
    featured: true,
    private: false,
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
      "An open-source aerial-vehicle detection dataset (8,815 training / 2,650 validation images) curated from flight footage and published in YOLOv5 format for the Teknofest 2022 Combat UAV competition.",
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
```

> Note for executor: `https://github.com/sims-1/sims` is the link used on Enes's current CV/README; the schema validates URL *format* only. If this repo turns out private/missing during a later phase, swap to the correct public URL or mark the project `private`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add content/projects.ts content/__tests__/projects.test.ts
git commit -m "feat: add projects data"
```

---

### Task 6: Skills, certifications, publications, leadership data

**Files:**
- Create: `content/skills.ts`
- Create: `content/certifications.ts`
- Create: `content/publications.ts`
- Create: `content/leadership.ts`
- Test: `content/__tests__/misc.test.ts`

**Interfaces:**
- Consumes: types `SkillGroup`, `Certification`, `Publication`, `Leadership` from `./schema`.
- Produces: `export const skills: SkillGroup[]`, `export const certifications: Certification[]`, `export const publications: Publication[]`, `export const leadership: Leadership[]`.

- [ ] **Step 1: Write the failing test**

Create `content/__tests__/misc.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import {
  skillGroupSchema,
  certificationSchema,
  publicationSchema,
  leadershipSchema,
} from "../schema";
import { skills } from "../skills";
import { certifications } from "../certifications";
import { publications } from "../publications";
import { leadership } from "../leadership";

describe("skills/certs/publications/leadership", () => {
  it("skills validate and include an AI & ML group", () => {
    skills.forEach((s) => expect(skillGroupSchema.parse(s)).toBeTruthy());
    expect(skills.some((s) => s.category.includes("AI"))).toBe(true);
  });
  it("certifications validate and include the Stanford ML cert", () => {
    certifications.forEach((c) => expect(certificationSchema.parse(c)).toBeTruthy());
    expect(certifications.some((c) => c.issuer.includes("Stanford"))).toBe(true);
  });
  it("publications validate and include the ICAT paper", () => {
    publications.forEach((p) => expect(publicationSchema.parse(p)).toBeTruthy());
    expect(publications.some((p) => p.venue.includes("ICAT"))).toBe(true);
  });
  it("leadership validates and includes the Game Dev society", () => {
    leadership.forEach((l) => expect(leadershipSchema.parse(l)).toBeTruthy());
    expect(leadership.some((l) => l.org.includes("Game Development"))).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — `Cannot find module '../skills'`.

- [ ] **Step 3: Write minimal implementation**

Create `content/skills.ts`:

```ts
import type { SkillGroup } from "./schema";

export const skills: SkillGroup[] = [
  {
    category: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "PHP", "Java", "C", "Dart", "Kotlin"],
  },
  {
    category: "AI & ML",
    items: [
      "LLM Pipelines", "RAG", "Function Calling", "Agents", "MCP",
      "Transformers", "Embeddings", "DSPy", "TensorFlow", "PyTorch",
      "OpenCV", "TensorRT", "YOLOv5",
    ],
  },
  {
    category: "Web & Mobile",
    items: [
      "React", "Next.js", "React Native (Expo)", "Node.js", "Express",
      "Fastify", "FastAPI", "Laravel", "Socket.io", "Tailwind CSS", "Vite",
    ],
  },
  {
    category: "Infrastructure & Tools",
    items: [
      "Docker", "Kubernetes (EKS)", "Nginx", "MySQL", "MongoDB", "Redis",
      "RabbitMQ", "GitHub Actions", "Git", "Supabase", "Vercel",
      "LDAP/OIDC", "Casbin",
    ],
  },
];
```

Create `content/certifications.ts`:

```ts
import type { Certification } from "./schema";

export const certifications: Certification[] = [
  {
    title: "Deep Learning Specialization",
    issuer: "DeepLearning.AI",
    date: "2020-05",
    credentialId: "XKZ62YB4SBBS",
  },
  {
    title: "Machine Learning",
    issuer: "Stanford University (Online)",
    date: "2023-08",
    credentialId: "Z98VVD9RBNEA",
  },
  {
    title: "CCNA: Introduction to Networks",
    issuer: "Cisco",
    date: "2024-01",
  },
  {
    title: "SolidWorks (Basic Level)",
    issuer: "ABKTEKNİK",
    date: "2018-11",
  },
];
```

Create `content/publications.ts`:

```ts
import type { Publication } from "./schema";

export const publications: Publication[] = [
  {
    title: "Automatic Calculation of Hallux Valgus Angle",
    authors: "Alp, E., Kaynakcı, E., et al.",
    venue: "ICAT — International Conference on Advanced Technologies",
    year: 2022,
    details:
      "Vol. 10, pp. 222–225. In partnership with SBÜ Gülhane Training & Research Hospital and Gazi University.",
    url: "https://github.com/ekaynac/HalluxValgus",
  },
];
```

Create `content/leadership.ts`:

```ts
import type { Leadership } from "./schema";

export const leadership: Leadership[] = [
  {
    org: "Bilkent Game Development & Animation Society",
    role: "Founder",
    start: "2023-01",
    end: "present",
    category: "leadership",
    highlights: [
      "Founded the university's first game development society; organized the inaugural Bilkent Game Jam (50+ participants).",
    ],
  },
  {
    org: "Bilkent Literature Society",
    role: "President (later Audit Board Head)",
    start: "2024-02",
    end: "present",
    category: "leadership",
    highlights: [
      "Elected president; organized the inaugural Bilkent Mythology Panel.",
    ],
  },
  {
    org: "Polemik Yayınları",
    role: "Founding Member & Poetry Editor",
    start: "2022-01",
    end: "present",
    category: "creative",
    highlights: [
      "Poetry editor for an independent publishing house; provide typesetting (dizgi) in Adobe InDesign and Scribus.",
    ],
  },
  {
    org: "Independent (Poetry)",
    role: "Author",
    start: "2024-01",
    end: "present",
    category: "creative",
    highlights: [
      "Published the poetry book \"Uyandı Uyudu\" (Kharon Yayınları, 2024); second book in progress.",
    ],
  },
  {
    org: "METU Voicing Society",
    role: "Theatrical Poetry Moderator",
    start: "2022-09",
    end: "present",
    category: "creative",
    highlights: [],
  },
];
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add content/skills.ts content/certifications.ts content/publications.ts content/leadership.ts content/__tests__/misc.test.ts
git commit -m "feat: add skills, certifications, publications, leadership data"
```

---

### Task 7: Aggregate index + invariant/privacy guard

**Files:**
- Create: `content/index.ts`
- Test: `content/__tests__/content.test.ts`

**Interfaces:**
- Consumes: all data exports + `profileDataSchema`, `ProfileData` from prior tasks.
- Produces: `export const profileData: ProfileData` (the single object the website + later phases import) and a re-export of each section.

- [ ] **Step 1: Write the failing test**

Create `content/__tests__/content.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { profileData } from "../index";
import { profileDataSchema } from "../schema";

// Collect every string value in the dataset for invariant scanning.
function allStrings(value: unknown, acc: string[] = []): string[] {
  if (typeof value === "string") acc.push(value);
  else if (Array.isArray(value)) value.forEach((v) => allStrings(v, acc));
  else if (value && typeof value === "object")
    Object.values(value).forEach((v) => allStrings(v, acc));
  return acc;
}

describe("aggregated content", () => {
  it("validates against profileDataSchema", () => {
    expect(profileDataSchema.parse(profileData)).toBeTruthy();
  });

  const strings = allStrings(profileData);

  it("contains no placeholder tokens", () => {
    const bad = /\b(TODO|TBD|FIXME|XXX|lorem ipsum)\b/i;
    const offenders = strings.filter((s) => bad.test(s));
    expect(offenders).toEqual([]);
  });

  it("leaks no personal phone numbers (privacy guard)", () => {
    const phone = /\b0?5\d{2}[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}\b/;
    const offenders = strings.filter((s) => phone.test(s));
    expect(offenders).toEqual([]);
  });

  it("leaks no 11-digit national-ID-like runs (privacy guard)", () => {
    const id = /\b\d{11}\b/;
    const offenders = strings.filter((s) => id.test(s));
    expect(offenders).toEqual([]);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — `Cannot find module '../index'`.

- [ ] **Step 3: Write minimal implementation**

Create `content/index.ts`:

```ts
import type { ProfileData } from "./schema";
import { profile } from "./profile";
import { experience } from "./experience";
import { projects } from "./projects";
import { education } from "./education";
import { certifications } from "./certifications";
import { publications } from "./publications";
import { leadership } from "./leadership";
import { skills } from "./skills";

export const profileData: ProfileData = {
  profile,
  experience,
  projects,
  education,
  certifications,
  publications,
  leadership,
  skills,
};

export {
  profile, experience, projects, education,
  certifications, publications, leadership, skills,
};
export * from "./schema";
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS — all suites green. Also run `npm run typecheck` → Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add content/index.ts content/__tests__/content.test.ts
git commit -m "feat: aggregate content index with validation and privacy guards"
```

---

### Task 8: MASTER-PROFILE.md generator

**Files:**
- Create: `scripts/generate-master-profile.ts`
- Create: `scripts/__tests__/generate-master-profile.test.ts`
- Generate: `MASTER-PROFILE.md`

**Interfaces:**
- Consumes: `profileData` from `../content/index`.
- Produces: `export function renderMasterProfile(data: ProfileData): string` and a CLI side-effect writing `MASTER-PROFILE.md`.

- [ ] **Step 1: Write the failing test**

Create `scripts/__tests__/generate-master-profile.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { renderMasterProfile } from "../generate-master-profile";
import { profileData } from "../../content/index";

describe("renderMasterProfile", () => {
  const md = renderMasterProfile(profileData);

  it("starts with the name as an H1", () => {
    expect(md.startsWith("# Enes Kaynakcı")).toBe(true);
  });
  it("includes all major sections", () => {
    for (const heading of [
      "## Summary", "## Experience", "## Projects",
      "## Education", "## Skills", "## Certifications",
      "## Publications", "## Leadership & Creative",
    ]) {
      expect(md).toContain(heading);
    }
  });
  it("renders the current role and a featured project", () => {
    expect(md).toContain("Mega Bilgisayar");
    expect(md).toContain("LLMDAP");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — `Cannot find module '../generate-master-profile'`.

- [ ] **Step 3: Write minimal implementation**

Create `scripts/generate-master-profile.ts`:

```ts
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import type { ProfileData } from "../content/schema";
import { profileData } from "../content/index";

const fmt = (d: string) => (d === "present" ? "Present" : d);

export function renderMasterProfile(data: ProfileData): string {
  const { profile, experience, projects, education, certifications, publications, leadership, skills } = data;
  const lines: string[] = [];

  lines.push(`# ${profile.name}`);
  lines.push(`**${profile.title}** · ${profile.location}`);
  lines.push(`${profile.email} · ${profile.links.github} · ${profile.links.linkedin} · ${profile.links.website}`);
  lines.push("");
  lines.push("> Generated from the content dataset. Do not edit by hand — edit `content/*.ts` and run `npm run generate:profile`.");
  lines.push("");

  lines.push("## Summary");
  lines.push(profile.summary);
  lines.push("");
  lines.push(`**Languages:** ${profile.languages.map((l) => `${l.name} (${l.level})`).join(", ")}`);
  lines.push("");

  lines.push("## Experience");
  for (const e of experience) {
    lines.push(`### ${e.role} — ${e.org}`);
    lines.push(`${fmt(e.start)} – ${fmt(e.end)} · ${e.location} · ${e.employmentType}`);
    for (const h of e.highlights) lines.push(`- ${h}`);
    if (e.tech.length) lines.push(`_Tech:_ ${e.tech.join(", ")}`);
    lines.push("");
  }

  lines.push("## Projects");
  for (const p of projects) {
    const tag = p.featured ? " ⭐" : p.private ? " (private)" : "";
    const link = p.links.repo ? ` — ${p.links.repo}` : "";
    lines.push(`### ${p.name}${tag}`);
    lines.push(`${p.oneLiner}${link}`);
    lines.push(p.description);
    if (p.highlights.length) for (const h of p.highlights) lines.push(`- ${h}`);
    lines.push(`_Tech:_ ${p.tech.join(", ")}`);
    lines.push("");
  }

  lines.push("## Education");
  for (const ed of education) {
    lines.push(`- **${ed.credential}**, ${ed.org} (${fmt(ed.start)} – ${fmt(ed.end)})${ed.note ? ` — ${ed.note}` : ""}`);
  }
  lines.push("");

  lines.push("## Skills");
  for (const s of skills) lines.push(`- **${s.category}:** ${s.items.join(", ")}`);
  lines.push("");

  lines.push("## Certifications");
  for (const c of certifications) lines.push(`- **${c.title}** — ${c.issuer} (${fmt(c.date)})`);
  lines.push("");

  lines.push("## Publications");
  for (const pub of publications) lines.push(`- ${pub.authors} (${pub.year}). **${pub.title}.** ${pub.venue}.${pub.details ? ` ${pub.details}` : ""}`);
  lines.push("");

  lines.push("## Leadership & Creative");
  for (const l of leadership) {
    lines.push(`### ${l.role} — ${l.org} (${l.category})`);
    lines.push(`${fmt(l.start)} – ${fmt(l.end)}`);
    for (const h of l.highlights) lines.push(`- ${h}`);
    lines.push("");
  }

  return lines.join("\n").replace(/\n{3,}/g, "\n\n").trimEnd() + "\n";
}

// CLI: write MASTER-PROFILE.md at the repo root when run directly.
const isMain = process.argv[1] === fileURLToPath(import.meta.url);
if (isMain) {
  const out = resolve(dirname(fileURLToPath(import.meta.url)), "..", "MASTER-PROFILE.md");
  writeFileSync(out, renderMasterProfile(profileData), "utf8");
  console.log(`Wrote ${out}`);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS — generator tests green.

- [ ] **Step 5: Generate the file and verify**

Run: `npm run generate:profile`
Expected: prints `Wrote …/MASTER-PROFILE.md`. Open `MASTER-PROFILE.md` and confirm it reads as a complete profile.

- [ ] **Step 6: Commit**

```bash
git add scripts/generate-master-profile.ts scripts/__tests__/generate-master-profile.test.ts MASTER-PROFILE.md
git commit -m "feat: render MASTER-PROFILE.md from content dataset"
```

---

## Self-Review

**Spec coverage** (against `2026-06-23-personal-brand-refresh-design.md` §2–3, Phase 0):
- Typed `content/*.ts` single source of truth → Tasks 3–7. ✅
- `MASTER-PROFILE.md` human-readable mirror → Task 8. ✅
- Confirmed facts (Mega title/date, canonical email, dataset size, featured set) → baked into Tasks 3–5 + Global Constraints. ✅
- Privacy handling (no ID/address/phone) → Task 7 guard tests + Global Constraints. ✅
- Stack alignment with website (TS, importable dataset) → `content/index.ts` exports `profileData`. ✅

**Deferred to later phases (correctly out of scope here):** CV LaTeX + Tectonic Action (Phase 1), README (Phase 2), website rendering (Phase 3), LinkedIn pack (Phase 4). The dataset is the shared input to all of them.

**Placeholder scan:** No TODO/TBD in plan steps; the one executor note (SIMS URL) is a verification instruction, not a code placeholder. The `vest-detection-system`, `bukaui`, `fanzinapp` entries intentionally have empty `highlights: []` and `links: {}` (private projects) — schema allows it.

**Type consistency:** `profileData` (index) ↔ `ProfileData` (schema) ↔ `renderMasterProfile(data: ProfileData)` consistent. Export names (`profile`, `experience`, `projects`, `education`, `certifications`, `publications`, `leadership`, `skills`) match across data files, index, and tests. Featured slug set identical in plan, data, and test (`etch-a-chat`, `llmdap`, `onprem-ai-adoption-radar`, `sims`).

**Open confirmations that do NOT block Phase 0** (resolve in Phase 1 when wording the CV): Meturone vs OTUS UCAV team naming; FanzinApp Kotlin-vs-Flutter (defaulted to Kotlin); whether to surface CGPA publicly; exact SIMS public repo URL.
