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
      "Transformers", "Embeddings", "vLLM", "Ollama", "DSPy", "TensorFlow", "PyTorch",
      "OpenCV", "TensorRT", "OWLv2", "YOLOv5",
    ],
  },
  {
    category: "Web & Mobile",
    items: [
      "React", "Next.js", "React Native (Expo)", "Node.js", "Express",
      "Fastify", "FastAPI", "Laravel", "Strapi", "Socket.io", "Tailwind CSS", "Vite",
    ],
  },
  {
    category: "Infrastructure & Tools",
    items: [
      "Docker", "Kubernetes (EKS)", "Proxmox VE", "Nginx", "PostgreSQL", "MySQL", "MongoDB", "Redis",
      "RabbitMQ", "GitHub Actions", "Git", "Supabase", "Vercel",
      "LDAP/OIDC", "Casbin", "Cloudflare Tunnel", "Tailscale",
    ],
  },
];
