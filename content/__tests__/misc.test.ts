import { describe, it, expect } from "vitest";
import {
  skillGroupSchema,
  certificationSchema,
  publicationSchema,
  leadershipSchema,
} from "../schema";
import { skills } from "../skills";
import { certifications } from "../certifications";
import { publications } from "../publications";
import { leadership } from "../leadership";

describe("skills/certs/publications/leadership", () => {
  it("skills validate and include an AI & ML group", () => {
    skills.forEach((s) => expect(skillGroupSchema.parse(s)).toBeTruthy());
    expect(skills.some((s) => s.category.includes("AI"))).toBe(true);
  });
  it("certifications validate and include the Stanford ML cert", () => {
    certifications.forEach((c) => expect(certificationSchema.parse(c)).toBeTruthy());
    expect(certifications.some((c) => c.issuer.includes("Stanford"))).toBe(true);
  });
  it("publications validate and include the ICAT paper", () => {
    publications.forEach((p) => expect(publicationSchema.parse(p)).toBeTruthy());
    expect(publications.some((p) => p.venue.includes("ICAT"))).toBe(true);
  });
  it("leadership validates and includes the Game Dev society", () => {
    leadership.forEach((l) => expect(leadershipSchema.parse(l)).toBeTruthy());
    expect(leadership.some((l) => l.org.includes("Game Development"))).toBe(true);
  });
});
