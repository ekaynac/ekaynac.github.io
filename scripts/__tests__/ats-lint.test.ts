import { describe, it, expect } from "vitest";
import { atsLint, expectationsFrom, type AtsReport, type AtsExpectations } from "../ats-lint";

const expectations: AtsExpectations = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  requiredSections: ["Summary", "Experience", "Education"],
  datedOrgs: ["Analytical Engines Ltd", "Somerville College"],
};

const GOOD_TEXT = [
  "Ada Lovelace",
  "Engineer",
  "London, UK | ada@example.com",
  "Summary",
  ...Array.from({ length: 40 }, () => "engineer building analytical pipelines and note systems for machines"),
  "Experience",
  "Analytical Engines Ltd",
  "Jan 2020 – Present",
  "• Wrote the first algorithm",
  "Education",
  "Somerville College, B.Sc. in Mathematics, Oxford, UK, Sep 2016 – Jun 2020",
].join("\n");

function report(overrides: Partial<AtsReport> = {}, text = GOOD_TEXT): AtsReport {
  return {
    pages: 1,
    imageCount: 0,
    encrypted: false,
    hasForm: false,
    hasJavaScript: false,
    fonts: [{ name: "LMRoman10", embedded: true, hasToUnicode: true }],
    text: { reading: text, layout: text, raw: text },
    ...overrides,
  };
}

const codes = (r: AtsReport, e = expectations) => atsLint(r, e).map((f) => f.code);

describe("atsLint", () => {
  it("passes a well-formed report", () => {
    expect(atsLint(report(), expectations)).toEqual([]);
  });

  it("flags a multi-page CV", () => {
    expect(codes(report({ pages: 2 }))).toContain("single-page");
  });

  it("flags embedded images (text inside them is invisible to parsers)", () => {
    expect(codes(report({ imageCount: 1 }))).toContain("no-images");
  });

  it("flags fonts that are not embedded or lack a ToUnicode map", () => {
    const c = codes(report({ fonts: [{ name: "Arial", embedded: false, hasToUnicode: false }] }));
    expect(c).toContain("fonts-embedded");
    expect(c).toContain("fonts-tounicode");
  });

  it("flags a PDF with no text layer", () => {
    expect(codes(report({}, "Ada Lovelace\nSummary\nExperience\nEducation"))).toContain("text-layer");
  });

  it("flags a title glued onto the name line", () => {
    const text = GOOD_TEXT.replace("Ada Lovelace", "Ada Lovelace | Engineer");
    expect(codes(report({}, text))).toContain("name-first-line");
  });

  it("flags a missing or non-standard section heading", () => {
    const text = GOOD_TEXT.replace("\nEducation\n", "\nSchooling & Interests\n");
    expect(codes(report({}, text))).toContain("required-sections");
  });

  it("accepts a date on the line after its employer", () => {
    expect(codes(report())).not.toContain("entry-date-attached");
  });

  it("flags a date column the extractor detached from its entries", () => {
    const detached = [
      "Ada Lovelace",
      "Engineer",
      "ada@example.com",
      "Summary",
      ...Array.from({ length: 40 }, () => "engineer building analytical pipelines and note systems for machines"),
      "Experience",
      "Analytical Engines Ltd",
      "Chief Engineer",
      "• Wrote the first algorithm",
      "Education",
      "Somerville College",
      "B.Sc. in Mathematics",
      "Jan 2020 – Present",
      "Sep 2016 – Jun 2020",
    ].join("\n");
    expect(codes(report({}, detached))).toContain("entry-date-attached");
  });

  it("flags an employer that vanished from the extracted text", () => {
    const text = GOOD_TEXT.replace("Analytical Engines Ltd", "Redacted");
    expect(codes(report({}, text))).toContain("entry-present");
  });

  it("flags a missing email and a leaked phone number", () => {
    const text = GOOD_TEXT.replace("ada@example.com", "+90 532 111 22 33");
    const c = codes(report({}, text));
    expect(c).toContain("contact-email");
    expect(c).toContain("no-pii");
  });

  it("allows the phone in the private build only", () => {
    const text = GOOD_TEXT.replace("ada@example.com", "ada@example.com | +90 532 111 22 33");
    expect(codes(report({}, text))).toContain("no-pii");
    expect(codes(report({}, text), { ...expectations, allowPhone: true })).not.toContain("no-pii");
  });
  it("flags ligature glyphs that replace plain letters", () => {
    expect(codes(report({}, GOOD_TEXT.replace("first", "ﬁrst")))).toContain("no-ligature-mangling");
  });

  it("warns when bullets do not extract as U+2022", () => {
    const text = GOOD_TEXT.replace("• Wrote", "– Wrote");
    const findings = atsLint(report({}, text), expectations);
    expect(findings.map((f) => f.code)).toContain("bullet-glyph");
    expect(findings.find((f) => f.code === "bullet-glyph")!.severity).toBe("warn");
  });
});

describe("expectationsFrom", () => {
  const e = expectationsFrom();

  it("derives the identity from the source-of-truth dataset", () => {
    expect(e.name).toBe("Enes Kaynakcı");
    expect(e.email).toContain("@");
  });

  it("requires ATS-standard headings, not combined ones", () => {
    expect(e.requiredSections).toContain("Certifications");
    expect(e.requiredSections).toContain("Awards");
    expect(e.requiredSections).not.toContain("Certifications & Awards");
  });

  it("covers every dated CV entry", () => {
    expect(e.datedOrgs).toContain("Mega Bilgisayar");
    expect(e.datedOrgs).toContain("Bilkent University");
  });
});
