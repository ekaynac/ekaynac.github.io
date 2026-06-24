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
    "AI-leaning full-stack engineer who ships end to end: LLM and agent pipelines and computer-vision systems backed by production microservices and modern web and mobile front-ends. Bilkent University Information Systems graduate (2026), currently building on-prem AI platforms, computer-vision and LLM systems at Mega Bilgisayar.",
  languages: [
    { name: "Turkish", level: "Native" },
    { name: "English", level: "C1" },
    { name: "German", level: "Beginner" },
  ],
};
