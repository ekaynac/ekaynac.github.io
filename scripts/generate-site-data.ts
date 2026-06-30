import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import type { ProfileData } from "../content/schema";
import { profileData } from "../content/index";
import { siteConfig, type SiteConfig } from "../site/site.config";
import { formatDate } from "./format-date";

export interface SiteData {
  profile: { name: string; title: string; location: string; email: string; summary: string;
             links: { github: string; linkedin: string; website: string } };
  heroPairs: { engineer: string; poet: string }[];
  work: {
    slug: string; name: string; oneLiner: string; tech: string[]; url?: string; isPrivate: boolean;
    trueName: string; sigil: string; floor: number; summonWords: string[];
  }[];
  experience: { org: string; role: string; period: string; current: boolean; highlights: string[] }[];
  lines: { verse: string[]; note: string };
  about: { paragraphs: string[]; education: { org: string; credential: string; period: string }[] };
  skills: { category: string; items: string[] }[];
  myth: { threshold: string; poleCode: string; poleSpell: string };
}

const period = (start: string, end: string) => `${formatDate(start)} – ${formatDate(end)}`;

export function renderSiteData(data: ProfileData, config: SiteConfig): SiteData {
  const work = config.projects.map((slug) => {
    const p = data.projects.find((x) => x.slug === slug);
    if (!p) throw new Error(`site.config: project not found: ${slug}`);
    const djinn = config.djinn[slug];
    if (!djinn) throw new Error(`djinn meta not found: ${slug}`);
    return {
      slug: p.slug, name: p.name, oneLiner: p.oneLiner, tech: p.tech,
      url: !p.private && p.links.repo ? p.links.repo : undefined,
      isPrivate: p.private,
      trueName: djinn.trueName,
      sigil: djinn.sigil,
      floor: djinn.floor,
      summonWords: djinn.summonWords,
    };
  });

  const experience = config.experience.map((sel) => {
    const e = data.experience.find((x) => x.org === sel.org && x.start === sel.start);
    if (!e) throw new Error(`site.config: experience not found: ${sel.org} (${sel.start})`);
    return { org: e.org, role: e.role, period: period(e.start, e.end), current: e.current, highlights: e.highlights };
  });

  const skills = config.skills.map((cat) => {
    const s = data.skills.find((x) => x.category === cat);
    if (!s) throw new Error(`site.config: skill group not found: ${cat}`);
    return { category: s.category, items: s.items };
  });

  const education = config.education.map((org) => {
    const ed = data.education.find((x) => x.org === org);
    if (!ed) throw new Error(`site.config: education not found: ${org}`);
    return { org: ed.org, credential: ed.credential, period: period(ed.start, ed.end) };
  });

  return {
    profile: {
      name: data.profile.name, title: data.profile.title, location: data.profile.location,
      email: data.profile.email, summary: data.profile.summary, links: data.profile.links,
    },
    heroPairs: config.heroPairs,
    work,
    experience,
    lines: config.lines,
    about: { paragraphs: config.aboutParagraphs, education },
    skills,
    myth: config.myth,
  };
}

const isMain = process.argv[1] === fileURLToPath(import.meta.url);
if (isMain) {
  const out = resolve(dirname(fileURLToPath(import.meta.url)), "..", "site", "src", "site-data.json");
  writeFileSync(out, JSON.stringify(renderSiteData(profileData, siteConfig), null, 2) + "\n", "utf8");
  console.log(`Wrote ${out}`);
}
