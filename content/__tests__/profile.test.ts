import { describe, it, expect } from "vitest";
import { profileSchema, educationSchema } from "../schema";
import { profile } from "../profile";
import { education } from "../education";

describe("profile + education data", () => {
  it("profile matches schema", () => {
    expect(profileSchema.parse(profile)).toBeTruthy();
  });
  it("uses the canonical public email", () => {
    expect(profile.email).toBe("tensorenes@gmail.com");
  });
  it("links point to the right accounts", () => {
    expect(profile.links.github).toBe("https://github.com/ekaynac");
    expect(profile.links.website).toBe("https://ekaynac.github.io");
  });
  it("education entries all validate and include Bilkent", () => {
    education.forEach((e) => expect(educationSchema.parse(e)).toBeTruthy());
    expect(education.some((e) => e.org.includes("Bilkent"))).toBe(true);
  });
});
