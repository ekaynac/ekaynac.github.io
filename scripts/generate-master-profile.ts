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
