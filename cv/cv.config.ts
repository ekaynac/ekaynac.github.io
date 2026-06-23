export interface CvExperienceSelection {
  org: string;
  start: string;
  maxHighlights: number;
}

export interface CvConfig {
  summary: string;
  experience: CvExperienceSelection[];
  projects: string[];
  maxProjectHighlights: number;
  skills: string[];
  education: string[];
  awardsLine: string;
  leadershipLine: string;
}

export const cvConfig: CvConfig = {
  summary:
    "AI-leaning full-stack engineer building LLM and agent pipelines and computer-vision systems on production microservices and modern web and mobile stacks. Bilkent University Information Systems graduate (2026).",
  experience: [
    { org: "Mega Bilgisayar", start: "2026-05-18", maxHighlights: 3 },
    { org: "Mia Teknoloji", start: "2025-02", maxHighlights: 3 },
    { org: "Mega Bilgisayar", start: "2024-06", maxHighlights: 1 },
    { org: "Meturone (Fixed-wing UAV Team)", start: "2021-09", maxHighlights: 2 },
  ],
  projects: ["sims", "llmdap", "etch-a-chat"],
  maxProjectHighlights: 1,
  skills: ["Languages", "AI & ML", "Web & Mobile", "Infrastructure & Tools"],
  education: [
    "Bilkent University",
    "FH Upper Austria, Hagenberg Campus",
    "Middle East Technical University (METU)",
  ],
  awardsLine:
    "Deep Learning Specialization (DeepLearning.AI), Stanford Machine Learning; 2nd Place — 18th METU Robotics Days (Autonomous UAV CV, 2022); Teknofest UAV Finalist (2021 & 2022).",
  leadershipLine:
    "Founder, Bilkent Game Development & Animation Society; President, Bilkent Literature Society; founding poetry editor at Polemik Yayınları; published poet (Uyandı Uyudu, 2024).",
};
