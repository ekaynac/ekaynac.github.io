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
      "Build on-prem LLM platforms and agent tooling, including a customized LibreChat deployment and MCP & n8n based portal agents for internal workflows.",
      "Designed LLMDAP, a sovereign LLM-agent identity and memory-protection library binding agent memory and tool access to AD/LDAP or OIDC identities with Casbin authorization, envelope encryption, and a tamper-evident audit trail.",
      "R&D'd computer-vision industrial-safety systems (PPE/vest detection) on Nvidia Jetson edge hardware using YOLO, SAM, DepthAnything etc. models.",
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
    role: "AI Solutions Team Intern",
    location: "Ankara, Türkiye",
    start: "2024-06",
    end: "2024-08",
    current: false,
    employmentType: "internship",
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
