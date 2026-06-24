import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import type { ProfileData, Project } from "../content/schema";
import { profileData } from "../content/index";
import { readmeConfig, type ReadmeConfig } from "../readme/readme.config";

function findProject(data: ProfileData, slug: string): Project {
  const p = data.projects.find((x) => x.slug === slug);
  if (!p) throw new Error(`readme.config: project not found: ${slug}`);
  return p;
}
function findSkill(data: ProfileData, category: string) {
  const s = data.skills.find((x) => x.category === category);
  if (!s) throw new Error(`readme.config: skill group not found: ${category}`);
  return s;
}
function findExperience(data: ProfileData, org: string, start: string) {
  const e = data.experience.find((x) => x.org === org && x.start === start);
  if (!e) throw new Error(`readme.config: experience not found: ${org} (${start})`);
  return e;
}

export function renderReadme(data: ProfileData, config: ReadmeConfig): string {
  const p = data.profile;
  const lines: string[] = [];

  lines.push(`# Hi, I'm ${p.name}`, "");
  lines.push(`**${p.title}** · ${p.location}`, "");
  lines.push(config.intro, "");

  lines.push("## What I'm working on", "");
  for (const slug of config.projects) {
    const pr = findProject(data, slug);
    const name = !pr.private && pr.links.repo ? `[${pr.name}](${pr.links.repo})` : pr.name;
    const priv = pr.private ? " _(private)_" : "";
    lines.push(`- **${name}**${priv} — ${pr.oneLiner}`);
  }
  lines.push("");

  lines.push("## Tech", "");
  for (const cat of config.skillGroups) {
    const s = findSkill(data, cat);
    lines.push(`**${s.category}:** ${s.items.join(", ")}  `);
  }
  lines.push("");

  lines.push("## Experience", "");
  for (const sel of config.experience) {
    const e = findExperience(data, sel.org, sel.start);
    lines.push(`- **${e.role}**, ${e.org} — ${sel.blurb}`);
  }
  for (const pub of data.publications) {
    const title = pub.url ? `[${pub.title}](${pub.url})` : pub.title;
    lines.push(`- **Paper:** ${title} — ICAT ${pub.year}`);
  }
  lines.push("");

  lines.push("## Beyond code", "", config.beyondCode, "");

  lines.push("## Connect", "");
  const linkFns: Record<string, string> = {
    linkedin: `[LinkedIn](${p.links.linkedin})`,
    email: `[Email](mailto:${p.email})`,
    github: `[GitHub](${p.links.github})`,
    website: `[Website](${p.links.website})`,
  };
  lines.push(config.connect.map((k) => linkFns[k]).join(" · "), "");

  return lines.join("\n").replace(/\n{3,}/g, "\n\n").trimEnd() + "\n";
}

const isMain = process.argv[1] === fileURLToPath(import.meta.url);
if (isMain) {
  const out = resolve(dirname(fileURLToPath(import.meta.url)), "..", "readme", "README.md");
  writeFileSync(out, renderReadme(profileData, readmeConfig), "utf8");
  console.log(`Wrote ${out}`);
}
