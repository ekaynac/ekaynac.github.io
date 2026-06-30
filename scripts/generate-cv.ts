import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
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
\addtolength{\topmargin}{-.7in}
\addtolength{\textheight}{1.4in}
\urlstyle{same}
\raggedbottom
\raggedright
\setlength{\tabcolsep}{0in}

\titleformat{\section}{\vspace{-4pt}\scshape\raggedright\large\bfseries}{}{0em}{}[\color{black}\titlerule \vspace{-5pt}]

\newcommand{\resumeItem}[1]{\item\small{{#1 \vspace{-2pt}}}}
\newcommand{\resumeSubheading}[4]{\vspace{-2pt}\item
  \begin{tabular*}{1.0\textwidth}[t]{l@{\extracolsep{\fill}}r}
    \textbf{#1} & \textbf{\small #2} \\
    \textit{\small#3} & \textit{\small #4} \\
  \end{tabular*}\vspace{-7pt}}
\newcommand{\resumeProjectHeading}[2]{\item
  \begin{tabular*}{1.0\textwidth}{l@{\extracolsep{\fill}}r}
    \small#1 & \textbf{\small #2}\\
  \end{tabular*}\vspace{-7pt}}
\newcommand{\resumeSubHeadingListStart}{\begin{itemize}[leftmargin=0.0in, label={}]}
\newcommand{\resumeSubHeadingListEnd}{\end{itemize}}
\newcommand{\resumeItemListStart}{\begin{itemize}[leftmargin=0.15in]}
\newcommand{\resumeItemListEnd}{\end{itemize}\vspace{-5pt}}
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

function header(data: ProfileData): string {
  const p = data.profile;
  return [
    `\\begin{center}`,
    `    {\\Huge \\scshape ${esc(p.name)}}\\;{\\large\\textbar}\\;{\\large ${esc(p.title)}} \\\\ \\vspace{4pt}`,
    `    \\small ${esc(p.location)} ~\\textbar~ \\href{mailto:${p.email}}{\\underline{${esc(p.email)}}} ~\\textbar~`,
    `    \\href{${p.links.linkedin}}{\\underline{linkedin.com/in/enes-kaynakci}} ~\\textbar~`,
    `    \\href{${p.links.github}}{\\underline{github.com/ekaynac}} ~\\textbar~`,
    `    \\href{${p.links.website}}{\\underline{ekaynac.github.io}}`,
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
  out.push(`\\resumeSubHeadingListEnd`, `\\vspace{-8pt}`);
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
  out.push(`\\resumeSubHeadingListEnd`, `\\vspace{-8pt}`);
  return out.join("\n");
}

function sectionSkills(data: ProfileData, config: CvConfig): string {
  const out = [`\\section{Technical Skills}`, `\\begin{itemize}[leftmargin=0in, label={}, itemsep=3pt]`];
  for (const cat of config.skills) {
    const s = findSkill(data, cat);
    out.push(`\\small{\\item{\\textbf{${esc(s.category)}:} ${esc(s.items.join(", "))}}}`);
  }
  out.push(`\\end{itemize}`, `\\vspace{-10pt}`);
  return out.join("\n");
}

function sectionEducation(data: ProfileData, config: CvConfig): string {
  const out = [`\\section{Education}`, `\\resumeSubHeadingListStart`];
  for (const org of config.education) {
    const ed = findEducation(data, org);
    out.push(
      `\\resumeSubheading{${esc(ed.org)}}{${esc(formatDate(ed.start))} -- ${esc(formatDate(ed.end))}}{${esc(ed.credential)}}{${esc(ed.location)}}`,
    );
  }
  out.push(`\\resumeSubHeadingListEnd`, `\\vspace{-8pt}`);
  return out.join("\n");
}

function sectionLine(title: string, body: string): string {
  return [`\\section{${esc(title)}}`, `\\small{${esc(body)}}`, `\\vspace{-4pt}`].join("\n");
}

export function renderResume(data: ProfileData, config: CvConfig): string {
  const body = [
    header(data),
    sectionSummary(config),
    sectionExperience(data, config),
    sectionProjects(data, config),
    sectionSkills(data, config),
    sectionEducation(data, config),
    sectionLine("Certifications & Awards", config.awardsLine),
    sectionLine("Leadership & Interests", config.leadershipLine),
  ].join("\n\n");
  return `${PREAMBLE}\n\\begin{document}\n\n${body}\n\n\\end{document}\n`;
}

const isMain = process.argv[1] === fileURLToPath(import.meta.url);
if (isMain) {
  const out = resolve(dirname(fileURLToPath(import.meta.url)), "..", "cv", "resume.tex");
  writeFileSync(out, renderResume(profileData, cvConfig), "utf8");
  console.log(`Wrote ${out}`);
}
