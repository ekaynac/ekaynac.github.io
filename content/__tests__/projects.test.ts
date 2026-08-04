import { describe, it, expect } from "vitest";
import { projectSchema } from "../schema";
import { projects } from "../projects";

describe("projects data", () => {
  it("all entries validate", () => {
    projects.forEach((p) => expect(projectSchema.parse(p)).toBeTruthy());
  });
  it("has exactly the five expected featured projects", () => {
    const featured = projects.filter((p) => p.featured).map((p) => p.slug).sort();
    expect(featured).toEqual(
      ["etch-a-chat", "inframedic", "llmdap", "onprem-ai-adoption-radar", "sims"]
    );
  });
  it("slugs are unique", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
  it("private projects do not expose a repo link", () => {
    projects
      .filter((p) => p.private)
      .forEach((p) => expect(p.links.repo).toBeUndefined());
  });
});
