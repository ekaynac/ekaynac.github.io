import { writeFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, resolve } from "node:path";
import type { ProfileData, Experience, Project } from "../content/schema";
import { profileData } from "../content/index";
import { cvConfig, type CvConfig } from "../cv/cv.config";
import { latexEscape as esc } from "./latex-escape";
import { formatDate } from "./format-date";

const PREAMBLE = String.raw`\documentclass[letterpaper,10pt]{article}
\usepackage[empty]{fullpage}
\usepackage{titlesec}
\usepackage[usenames,dvipsnames]{color}
\usepackage{enumitem}
\usepackage[hidelinks]{hyperref}
\usepackage{fancyhdr}
\usepackage{tabularx}
\usepackage{fontspec}

\pagestyle{fancy}
\fancyhf{}
\renewcommand{\headrulewidth}{0pt}
\renewcommand{\footrulewidth}{0pt}
\addtolength{\oddsidemargin}{-0.6in}
\addtolength{\evensidemargin}{-0.5in}
\addtolength{\textwidth}{1.19in}
\addtolength{\topmargin}{-.75in}
\addtolength{\textheight}{1.55in}
\urlstyle{same}
\raggedbottom
\raggedright
\setlength{\tabcolsep}{0in}

\titleformat{\section}{\vspace{-9pt}\scshape\raggedright\large\bfseries}{}{0em}{}[\color{black}\titlerule \vspace{-6pt}]

\newcommand{\resumeItem}[1]{\item\small{{#1 \vspace{-3pt}}}}
\newcommand{\resumeSubheading}[4]{\vspace{-2pt}\item
  \begin{tabular*}{1.0\textwidth}[t]{l@{\extracolsep{\fill}}r}
    \textbf{#1} & \textbf{\small #2} \\
    \textit{\small#3} & \textit{\small #4} \\
  \end{tabular*}\vspace{-6pt}}
\newcommand{\resumeProjectHeading}[2]{\item
  \begin{tabular*}{1.0\textwidth}{l@{\extracolsep{\fill}}r}
    \small#1 & \textbf{\small #2}\\
  \end{tabular*}\vspace{-6pt}}
\newcommand{\resumeSubHeadingListStart}{\begin{itemize}[leftmargin=0.0in, label={}]}
\newcommand{\resumeSubHeadingListEnd}{\end{itemize}}
\newcommand{\resumeItemListStart}{\begin{itemize}[leftmargin=0.15in, label={\textbullet}]}
\newcommand{\resumeItemListEnd}{\end{itemize}\vspace{1pt}}
`;

function findExperience(data: ProfileData, org: string, start: string): Experience {
  const e = data.experience.find((x) => x.org === org && x.start === start);
  if (!e) throw new Error(`cv.config: experience not found: ${org} (${start})`);
  return e;
}
function findProject(data: ProfileData, slug: string): Project {
  const p = data.projects.find((x) => x.slug === slug);
  if (!p) throw new Error(`cv.config: project not found: ${slug}`);
  return p;
}
function findSkill(data: ProfileData, category: string) {
  const s = data.skills.find((x) => x.category === category);
  if (!s) throw new Error(`cv.config: skill group not found: ${category}`);
  return s;
}
function findEducation(data: ProfileData, org: string) {
  const ed = data.education.find((x) => x.org === org);
  if (!ed) throw new Error(`cv.config: education not found: ${org}`);
  return ed;
}

export interface RenderOptions {
  /** Contact phone for the private build only; omitted from the public CV. */
  phone?: string;
}

function header(data: ProfileData, opts: RenderOptions): string {
  const p = data.profile;
  // The phone is never in the dataset: it would land in the public repo and on the
  // live site. It is injected only for the private build.
  const sep = " ~\\textbar~ ";
  const reach = [esc(p.location), opts.phone ? esc(opts.phone) : "", `\\href{mailto:${p.email}}{\\underline{${esc(p.email)}}}`]
    .filter(Boolean)
    .join(sep);
  const links = [
    `\\href{${p.links.linkedin}}{\\underline{linkedin.com/in/enes-kaynakci}}`,
    `\\href{${p.links.github}}{\\underline{github.com/ekaynac}}`,
    `\\href{${p.links.website}}{\\underline{ekaynac.github.io}}`,
  ].join(sep);
  // Adding the phone overflows a single centred contact line, so the private build
  // splits reach-me-here from find-me-here instead of letting it wrap raggedly.
  const contact = opts.phone
    ? [`    \\small ${reach} \\\\ \\vspace{2pt}`, `    \\small ${links}`]
    : [`    \\small ${reach}${sep}${links}`];
  return [
    `\\begin{center}`,
    `    {\\Huge \\scshape ${esc(p.name)}} \\\\ \\vspace{3pt}`,
    `    {\\large ${esc(p.title)}} \\\\ \\vspace{3pt}`,
    ...contact,
    `\\end{center}`,
  ].join("\n");
}

function sectionSummary(config: CvConfig): string {
  return [`\\section{Summary}`, `\\small{${esc(config.summary)}}`, `\\vspace{-4pt}`].join("\n");
}

function sectionExperience(data: ProfileData, config: CvConfig): string {
  const out = [`\\section{Experience}`, `\\resumeSubHeadingListStart`];
  for (const sel of config.experience) {
    const e = findExperience(data, sel.org, sel.start);
    out.push(
      `\\resumeSubheading{${esc(e.org)}}{${esc(formatDate(e.start))} -- ${esc(formatDate(e.end))}}{${esc(e.role)}}{${esc(e.location)}}`,
    );
    const hs = e.highlights.slice(0, sel.maxHighlights);
    if (hs.length) {
      out.push(`\\resumeItemListStart`);
      for (const h of hs) out.push(`\\resumeItem{${esc(h)}}`);
      out.push(`\\resumeItemListEnd`);
    }
  }
  out.push(`\\resumeSubHeadingListEnd`, `\\vspace{-7pt}`);
  return out.join("\n");
}

function sectionProjects(data: ProfileData, config: CvConfig): string {
  const out = [`\\section{Projects}`, `\\resumeSubHeadingListStart`];
  for (const slug of config.projects) {
    const p = findProject(data, slug);
    const heading = `\\textbf{${esc(p.name)}} $|$ \\emph{${esc(p.tech.slice(0, 4).join(", "))}}`;
    const right = p.links.repo ? `\\href{${p.links.repo}}{\\underline{Code}}` : ``;
    out.push(`\\resumeProjectHeading{${heading}}{${right}}`);
    out.push(`\\resumeItemListStart`, `\\resumeItem{${esc(p.oneLiner)}}`);
    for (const h of p.highlights.slice(0, config.maxProjectHighlights)) out.push(`\\resumeItem{${esc(h)}}`);
    out.push(`\\resumeItemListEnd`);
  }
  out.push(`\\resumeSubHeadingListEnd`, `\\vspace{-7pt}`);
  return out.join("\n");
}

function sectionSkills(data: ProfileData, config: CvConfig): string {
  const dropped = new Set(config.skillExclusions.map((x) => x.toLowerCase()));
  const kept = new Set<string>();
  const out = [`\\section{Technical Skills}`, `\\begin{itemize}[leftmargin=0in, label={}, itemsep=0pt]`];
  for (const cat of config.skills) {
    const s = findSkill(data, cat);
    const items = s.items.filter((i) => {
      if (!dropped.has(i.toLowerCase())) return true;
      kept.add(i.toLowerCase());
      return false;
    });
    if (!items.length) throw new Error(`cv.config: skillExclusions emptied the "${cat}" group`);
    out.push(`\\small{\\item{\\textbf{${esc(s.category)}:} ${esc(items.join(", "))}}}`);
  }
  // A stale exclusion would silently do nothing, so surface it as config drift.
  const unmatched = config.skillExclusions.filter((x) => !kept.has(x.toLowerCase()));
  if (unmatched.length) {
    throw new Error(`cv.config: skillExclusions match no skill item: ${unmatched.join(", ")}`);
  }
  out.push(`\\end{itemize}`, `\\vspace{-8pt}`);
  return out.join("\n");
}

function sectionEducation(data: ProfileData, config: CvConfig): string {
  const out = [`\\section{Education}`, `\\begin{itemize}[leftmargin=0in, label={}, itemsep=1pt]`];
  for (const org of config.education) {
    const ed = findEducation(data, org);
    const line = [
      `\\textbf{${esc(ed.org)}}`,
      `${esc(ed.credential)}`,
      `${esc(ed.location)}`,
      `${esc(formatDate(ed.start))} -- ${esc(formatDate(ed.end))}`,
    ].join(", ");
    out.push(`\\small{\\item{${line}}}`);
  }
  out.push(`\\end{itemize}`, `\\vspace{-8pt}`);
  return out.join("\n");
}

function sectionLine(title: string, body: string): string {
  return [`\\section{${esc(title)}}`, `\\small{${esc(body)}}`, `\\vspace{-6pt}`].join("\n");
}

export function renderResume(data: ProfileData, config: CvConfig, opts: RenderOptions = {}): string {
  const body = [
    header(data, opts),
    sectionSummary(config),
    sectionExperience(data, config),
    sectionProjects(data, config),
    sectionSkills(data, config),
    sectionEducation(data, config),
    sectionLine("Certifications", config.certificationsLine),
    sectionLine("Awards", config.awardsLine),
    sectionLine("Leadership & Activities", config.leadershipLine),
  ].join("\n\n");
  return `${PREAMBLE}\n\\begin{document}\n\n${body}\n\n\\end{document}\n`;
}

/**
 * The private build's phone number comes from CV_PHONE, or from the gitignored
 * `cv/private.contact.ts`. It is deliberately not importable from tracked source.
 */
async function loadPrivatePhone(root: string): Promise<string> {
  if (process.env.CV_PHONE) return process.env.CV_PHONE;
  const path = resolve(root, "cv", "private.contact.ts");
  try {
    const mod = (await import(pathToFileURL(path).href)) as { phone?: unknown };
    if (typeof mod.phone === "string" && mod.phone.trim()) return mod.phone.trim();
    throw new Error(`${path} does not export a non-empty "phone" string`);
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    throw new Error(
      `private build needs a phone number. Set CV_PHONE, or create cv/private.contact.ts ` +
        `(gitignored) exporting \`export const phone = "+90 ..."\`. ${detail}`,
    );
  }
}

const isMain = process.argv[1] === fileURLToPath(import.meta.url);
if (isMain) {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
  const isPrivate = process.argv.includes("--private");
  const opts: RenderOptions = isPrivate ? { phone: await loadPrivatePhone(root) } : {};
  const out = resolve(root, "cv", isPrivate ? "private.resume.tex" : "resume.tex");
  writeFileSync(out, renderResume(profileData, cvConfig, opts), "utf8");
  console.log(`Wrote ${out}${isPrivate ? " (private: includes phone)" : ""}`);
}
