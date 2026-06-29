import { describe, it, expect } from "vitest";
import { renderSiteData } from "../generate-site-data";
import { profileData } from "../../content/index";
import { siteConfig } from "../../site/site.config";

describe("renderSiteData", () => {
  const d = renderSiteData(profileData, siteConfig);

  it("carries canonical profile + links", () => {
    expect(d.profile.email).toBe("tensorenes@gmail.com");
    expect(d.profile.links.github).toBe("https://github.com/ekaynac");
  });
  it("marks SIMS private with no url", () => {
    const sims = d.work.find((w) => w.slug === "sims")!;
    expect(sims.isPrivate).toBe(true);
    expect(sims.url).toBeUndefined();
  });
  it("gives public featured projects a url", () => {
    const llmdap = d.work.find((w) => w.slug === "llmdap")!;
    expect(llmdap.url).toBe("https://github.com/ekaynac/LLMDAP");
  });
  it("has at least one hero pair and flags the current role", () => {
    expect(d.heroPairs.length).toBeGreaterThan(0);
    expect(d.experience.some((e) => e.current)).toBe(true);
  });
  it("throws if a configured project slug is unknown", () => {
    expect(() => renderSiteData(profileData, { ...siteConfig, projects: ["nope"] })).toThrow(/project not found/);
  });
  it("carries myth metadata and per-djinn true names", () => {
    const d = renderSiteData(profileData, siteConfig);
    expect(d.myth.threshold).toMatch(/cin|djinn|sistem|system/i);
    expect(d.myth.poleCode).toBeTruthy();
    expect(d.myth.poleSpell).toBeTruthy();
    const llmdap = d.work.find((w) => w.slug === "llmdap")!;
    expect(llmdap.trueName).toBeTruthy();
    expect(llmdap.sigil).toBeTruthy();
    expect(typeof llmdap.floor).toBe("number");
    const sims = d.work.find((w) => w.slug === "sims")!;
    expect(sims.trueName).toBeTruthy();
    expect(sims.url).toBeUndefined(); // still sealed
  });
});
