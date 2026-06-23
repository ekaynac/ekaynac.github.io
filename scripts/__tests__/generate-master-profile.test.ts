import { describe, it, expect } from "vitest";
import { renderMasterProfile } from "../generate-master-profile";
import { profileData } from "../../content/index";

describe("renderMasterProfile", () => {
  const md = renderMasterProfile(profileData);

  it("starts with the name as an H1", () => {
    expect(md.startsWith("# Enes Kaynakcı")).toBe(true);
  });
  it("includes all major sections", () => {
    for (const heading of [
      "## Summary", "## Experience", "## Projects",
      "## Education", "## Skills", "## Certifications",
      "## Publications", "## Leadership & Creative",
    ]) {
      expect(md).toContain(heading);
    }
  });
  it("renders the current role and a featured project", () => {
    expect(md).toContain("Mega Bilgisayar");
    expect(md).toContain("LLMDAP");
  });
});
