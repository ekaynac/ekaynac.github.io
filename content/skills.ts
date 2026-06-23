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
