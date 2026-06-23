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
    expect(tex).toContain("Stanford Machine Learning");
  });
  it("caps experience highlights per the config", () => {
    // Mega current is configured maxHighlights: 3; it has 4 in the dataset.
    const mega = profileData.experience.find((e) => e.start === "2026-05-18")!;
    expect(mega.highlights.length).toBe(4);
    expect(tex).not.toContain(mega.highlights[3]); // 4th highlight excluded
  });
  it("throws when a config selection does not resolve", () => {
    const bad = { ...cvConfig, projects: ["does-not-exist"] };
    expect(() => renderResume(profileData, bad)).toThrow(/project not found/);
  });
});
