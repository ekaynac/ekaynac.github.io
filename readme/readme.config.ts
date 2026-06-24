export interface ReadmeExperienceSelection {
  org: string;
  start: string;
  blurb: string;
}

export interface ReadmeConfig {
  intro: string;
  projects: string[];
  experience: ReadmeExperienceSelection[];
  skillGroups: string[];
  beyondCode: string;
  connect: Array<"linkedin" | "email" | "github" | "website">;
}

export const readmeConfig: ReadmeConfig = {
  intro:
    "AI-leaning full-stack engineer. I build LLM and agent pipelines, computer-vision systems, and full-stack products — currently building on-prem AI platforms at Mega Bilgisayar. Bilkent University Information Systems graduate (2026).",
  projects: ["llmdap", "onprem-ai-adoption-radar", "sims", "etch-a-chat"],
  experience: [
    { org: "Mega Bilgisayar", start: "2026-05-18", blurb: "On-prem LLM platforms, agent tooling, and computer-vision systems." },
    { org: "Mia Teknoloji", start: "2025-02", blurb: "End-to-end LLM and RAG pipelines (100/100 internship evaluation)." },
    { org: "Meturone (Fixed-wing UAV Team)", start: "2021-09", blurb: "Real-time aerial perception; Teknofest UAV finalist (2021 & 2022)." },
  ],
  skillGroups: ["Languages", "AI & ML", "Web & Mobile", "Infrastructure & Tools"],
  beyondCode:
    "Founder of Bilkent Game Development & Animation Society; President of Bilkent Literature Society; founding poetry editor at Polemik Yayınları; published poet.",
  connect: ["linkedin", "email"],
};
