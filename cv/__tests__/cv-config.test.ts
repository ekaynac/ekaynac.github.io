import { describe, it, expect } from "vitest";
import { cvConfig } from "../cv.config";
import { profileData } from "../../content/index";

describe("cvConfig references resolve against the dataset", () => {
  it("every experience selection matches a dataset entry", () => {
    for (const sel of cvConfig.experience) {
      const found = profileData.experience.find((e) => e.org === sel.org && e.start === sel.start);
      expect(found, `${sel.org} (${sel.start})`).toBeTruthy();
    }
  });
  it("includes the current Mega role first", () => {
    expect(cvConfig.experience[0]).toMatchObject({ org: "Mega Bilgisayar", start: "2026-05-18" });
  });
  it("every project slug exists in the dataset", () => {
    for (const slug of cvConfig.projects) {
      expect(profileData.projects.find((p) => p.slug === slug), slug).toBeTruthy();
    }
  });
  it("every skill category exists", () => {
    for (const cat of cvConfig.skills) {
      expect(profileData.skills.find((s) => s.category === cat), cat).toBeTruthy();
    }
  });
  it("every education org exists", () => {
    for (const org of cvConfig.education) {
      expect(profileData.education.find((e) => e.org === org), org).toBeTruthy();
    }
  });
});
