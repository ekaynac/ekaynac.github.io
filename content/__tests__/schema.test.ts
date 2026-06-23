import { describe, it, expect } from "vitest";
import {
  dateRef,
  experienceSchema,
  projectSchema,
  profileDataSchema,
} from "../schema";

describe("schema", () => {
  it("accepts valid date refs and rejects bad ones", () => {
    expect(dateRef.safeParse("2026-05").success).toBe(true);
    expect(dateRef.safeParse("2026-05-18").success).toBe(true);
    expect(dateRef.safeParse("present").success).toBe(true);
    expect(dateRef.safeParse("2026").success).toBe(true);
    expect(dateRef.safeParse("May 2026").success).toBe(false);
  });

  it("requires at least one highlight on experience", () => {
    const bad = experienceSchema.safeParse({
      org: "X", role: "Y", location: "Z",
      start: "2020-01", end: "present", current: true,
      employmentType: "full-time", highlights: [], tech: [],
    });
    expect(bad.success).toBe(false);
  });

  it("validates a minimal project and rejects a bad slug", () => {
    const ok = projectSchema.safeParse({
      slug: "demo", name: "Demo", oneLiner: "x",
      description: "a".repeat(40), tech: ["TS"], featured: false,
    });
    expect(ok.success).toBe(true);
    const bad = projectSchema.safeParse({
      slug: "Bad Slug", name: "Demo", oneLiner: "x",
      description: "a".repeat(40), tech: ["TS"], featured: false,
    });
    expect(bad.success).toBe(false);
  });

  it("exposes profileDataSchema as an object schema", () => {
    expect(typeof profileDataSchema.parse).toBe("function");
  });
});
