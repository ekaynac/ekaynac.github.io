import { describe, it, expect } from "vitest";
import { renderReadme } from "../generate-readme";
import { profileData } from "../../content/index";
import { readmeConfig } from "../../readme/readme.config";

describe("renderReadme", () => {
  const md = renderReadme(profileData, readmeConfig);

  it("starts with the greeting H1", () => {
    expect(md.startsWith("# Hi, I'm Enes Kaynakcı")).toBe(true);
  });
  it("has the expected sections", () => {
    for (const h of ["## What I'm working on", "## Tech", "## Experience", "## Beyond code", "## Connect"]) {
      expect(md).toContain(h);
    }
  });
  it("links public projects but not private ones", () => {
    expect(md).toContain("](https://github.com/ekaynac/onprem-ai-adoption-radar)");
    expect(md).toContain("_(private)_"); // SIMS, LLMDAP, InfraMedic, Etch-A-Chat
    expect(md).not.toContain("](https://github.com/ekaynac/LLMDAP)"); // repo went private
    expect(md).not.toContain("](https://github.com/sims-1/sims)");
  });
  it("includes the current role and the ICAT paper", () => {
    expect(md).toContain("Mega Bilgisayar");
    expect(md).toContain("Hallux Valgus");
  });
  it("connect line has the live website, LinkedIn, and Email", () => {
    expect(md).toContain("https://ekaynac.github.io");
    expect(md).toContain("https://www.linkedin.com/in/enes-kaynakci/");
    expect(md).toContain("mailto:tensorenes@gmail.com");
  });
  it("throws on an unknown project slug", () => {
    expect(() => renderReadme(profileData, { ...readmeConfig, projects: ["nope"] })).toThrow(/project not found/);
  });
  it("never links a private project, even if it has a repo URL", () => {
    const data = {
      ...profileData,
      projects: profileData.projects.map((p) =>
        p.slug === "sims" ? { ...p, private: true, links: { repo: "https://github.com/fake/private-sims" } } : p,
      ),
    };
    const out = renderReadme(data, readmeConfig);
    expect(out).toContain("_(private)_");
    expect(out).not.toContain("github.com/fake/private-sims");
  });
});
