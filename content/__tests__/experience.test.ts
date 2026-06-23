import { describe, it, expect } from "vitest";
import { experienceSchema } from "../schema";
import { experience } from "../experience";

describe("experience data", () => {
  it("all entries validate", () => {
    experience.forEach((e) => expect(experienceSchema.parse(e)).toBeTruthy());
  });
  it("has exactly one current role and it is Mega full-time from 2026-05-18", () => {
    const current = experience.filter((e) => e.current);
    expect(current).toHaveLength(1);
    expect(current[0].org).toBe("Mega Bilgisayar");
    expect(current[0].employmentType).toBe("full-time");
    expect(current[0].start).toBe("2026-05-18");
    expect(current[0].end).toBe("present");
    expect(current[0].role).toBe("AI / Software Engineer");
  });
  it("includes the Mia internship with the 100/100 evaluation highlight", () => {
    const mia = experience.find((e) => e.org === "Mia Teknoloji");
    expect(mia).toBeDefined();
    expect(mia!.highlights.some((h) => h.includes("100/100"))).toBe(true);
  });
});
