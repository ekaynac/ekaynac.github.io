import { describe, it, expect } from "vitest";
import { profileData } from "../index";
import { profileDataSchema } from "../schema";

// Collect every string value in the dataset for invariant scanning.
function allStrings(value: unknown, acc: string[] = []): string[] {
  if (typeof value === "string") acc.push(value);
  else if (Array.isArray(value)) value.forEach((v) => allStrings(v, acc));
  else if (value && typeof value === "object")
    Object.values(value).forEach((v) => allStrings(v, acc));
  return acc;
}

describe("aggregated content", () => {
  it("validates against profileDataSchema", () => {
    expect(profileDataSchema.parse(profileData)).toBeTruthy();
  });

  const strings = allStrings(profileData);

  it("contains no placeholder tokens", () => {
    const bad = /\b(TODO|TBD|FIXME|XXX|lorem ipsum)\b/i;
    const offenders = strings.filter((s) => bad.test(s));
    expect(offenders).toEqual([]);
  });

  it("leaks no personal phone numbers (privacy guard)", () => {
    const phone = /\b0?5\d{2}[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}\b/;
    const offenders = strings.filter((s) => phone.test(s));
    expect(offenders).toEqual([]);
  });

  it("leaks no 11-digit national-ID-like runs (privacy guard)", () => {
    const id = /\b\d{11}\b/;
    const offenders = strings.filter((s) => id.test(s));
    expect(offenders).toEqual([]);
  });
});
