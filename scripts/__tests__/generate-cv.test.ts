import { describe, it, expect } from "vitest";
import { renderResume } from "../generate-cv";
import { profileData } from "../../content/index";
import { cvConfig } from "../../cv/cv.config";

describe("renderResume", () => {
  const tex = renderResume(profileData, cvConfig);

  it("is a single complete LaTeX document", () => {
    expect((tex.match(/\\documentclass/g) || []).length).toBe(1);
    expect((tex.match(/\\begin\{document\}/g) || []).length).toBe(1);
    expect((tex.match(/\\end\{document\}/g) || []).length).toBe(1);
  });
  it("uses an XeLaTeX-safe preamble (no pdfTeX-only constructs)", () => {
    expect(tex).toContain("\\usepackage{fontspec}");
    expect(tex).not.toContain("fontenc");
    expect(tex).not.toContain("pdfgentounicode");
  });
  it("renders the name and current role", () => {
    expect(tex).toContain("Enes Kaynakcı");
    expect(tex).toContain("Mega Bilgisayar");
    expect(tex).toContain("AI / Software Engineer");
  });
  it("escapes ampersands from the data (Mia 'AI R&D')", () => {
    expect(tex).toContain("R\\&D");
    expect(tex).not.toContain("R&D");
  });
  it("renders the three configured projects", () => {
    expect(tex).toContain("SIMS");
    expect(tex).toContain("LLMDAP");
    expect(tex).toContain("Etch-A-Chat");
  });
  it("renders skills and the leadership/awards lines", () => {
    expect(tex).toContain("Technical Skills");
    expect(tex).toContain("Uyandı Uyudu");
    expect(tex).toContain("Stanford University");
  });
  it("puts the name alone on the first header line, title beneath it", () => {
    // A parser that reads line 1 as the candidate name must not get the title too.
    const nameLine = tex.split("\n").find((l) => l.includes("\\Huge"))!;
    expect(nameLine).toContain("Enes Kaynakcı");
    expect(nameLine).not.toContain("\\textbar");
    expect(nameLine).not.toContain(profileData.profile.title);
  });
  it("uses ATS-standard section headings, not combined ones", () => {
    for (const s of ["Summary", "Experience", "Projects", "Technical Skills", "Education", "Certifications", "Awards"]) {
      expect(tex).toContain(`\\section{${s}}`);
    }
    expect(tex).not.toContain("Certifications \\& Awards");
  });
  it("labels bullets with a real bullet glyph", () => {
    expect(tex).toContain("label={\\textbullet}");
  });
  it("keeps each education entry and its dates on one line", () => {
    // A right-aligned date column gets lifted into its own block by reading-order
    // extractors, which orphans every degree from its dates.
    expect(tex).toContain("Bilkent University}, B.Sc. in Information Systems and Technologies");
    expect(tex).toMatch(/Bilkent University\}.*Aug 2022 -- Jun 2026/);
  });
  it("caps experience highlights per the config", () => {
    // Mega current is configured maxHighlights: 3; it has 4 in the dataset.
    const mega = profileData.experience.find((e) => e.start === "2026-05-18")!;
    expect(mega.highlights.length).toBe(4);
    expect(tex).not.toContain(mega.highlights[3]); // 4th highlight excluded
  });
  it("drops the configured skill items from the CV only", () => {
    // Only from the skills lines: Casbin still belongs in LLMDAP's tech list, and
    // YOLOv5 in the Meturone bullet — the keywords stay on the page.
    const skillLines = tex.split("\n").filter((l) => /\\textbf\{[^}]+:\}/.test(l));
    expect(skillLines).toHaveLength(cvConfig.skills.length);
    for (const dropped of cvConfig.skillExclusions) {
      expect(skillLines.some((l) => l.includes(dropped))).toBe(false);
    }
    expect(skillLines.join("\n")).toContain("Kubernetes (EKS)");
    // The dataset keeps them for the README, site and LinkedIn pack.
    const infra = profileData.skills.find((g) => g.category === "Infrastructure & Tools")!;
    expect(infra.items).toContain("GitHub Actions");
    expect(infra.items).toContain("Vercel");
  });
  it("rejects a skill exclusion that matches nothing (config drift)", () => {
    const bad = { ...cvConfig, skillExclusions: [...cvConfig.skillExclusions, "Fortran"] };
    expect(() => renderResume(profileData, bad)).toThrow(/match no skill item: Fortran/);
  });
  it("keeps the phone out of the public build", () => {
    // public/cv.pdf ships in a public repo and on the live site.
    expect(tex).not.toMatch(/\+90/);
    expect(tex).not.toMatch(/\b5\d{2}[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}\b/);
  });
  it("injects the phone into the header only for the private build", () => {
    const priv = renderResume(profileData, cvConfig, { phone: "+90 500 000 00 00" });
    expect(priv).toContain("+90 500 000 00 00");
    const contactLine = priv.split("\n").find((l) => l.includes("mailto:"))!;
    expect(contactLine).toContain("+90 500 000 00 00");
  });
  it("throws when a config selection does not resolve", () => {
    const bad = { ...cvConfig, projects: ["does-not-exist"] };
    expect(() => renderResume(profileData, bad)).toThrow(/project not found/);
  });
});
