export interface SiteConfig {
  heroPairs: { engineer: string; poet: string }[];
  projects: string[];
  experience: { org: string; start: string }[];
  skills: string[];
  education: string[];
  aboutParagraphs: string[];
  lines: { verse: string[]; note: string };
}

export const siteConfig: SiteConfig = {
  heroPairs: [
    { engineer: "I build systems.", poet: "I write lines." },
    { engineer: "Pipelines, models, services.", poet: "Images, rhythm, voice." },
  ],
  projects: ["llmdap", "onprem-ai-adoption-radar", "sims", "etch-a-chat"],
  experience: [
    { org: "Mega Bilgisayar", start: "2026-05-18" },
    { org: "Mia Teknoloji", start: "2025-02" },
    { org: "Meturone (Fixed-wing UAV Team)", start: "2021-09" },
  ],
  skills: ["Languages", "AI & ML", "Web & Mobile", "Infrastructure & Tools"],
  education: ["Bilkent University", "FH Upper Austria, Hagenberg Campus", "Middle East Technical University (METU)"],
  aboutParagraphs: [
    "I'm an AI-leaning full-stack engineer who ships end to end — LLM and agent pipelines, computer-vision systems, and the production microservices and interfaces around them.",
    "I'm also a poet: a published book, editor at an independent press, and a literature society I led. I think the two sides feed each other — both are about giving precise structure to something hard to pin down.",
  ],
  lines: {
    verse: ["PLACEHOLDER: replace with 2-4 real lines of Enes's poetry."],
    note: "From Uyandı Uyudu (2024). Poetry editor at Polemik Yayınları.",
  },
};
