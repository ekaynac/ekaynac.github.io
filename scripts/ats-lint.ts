/**
 * ATS lint for the generated CV PDF.
 *
 * Applicant tracking systems do not "see" the CV — they run it through a PDF text
 * extractor and then segment the result by section heading. So every check here is
 * about what an extractor gets back, not about how the page looks.
 *
 * The pure checker (`atsLint`) takes an already-collected report so it can be unit
 * tested without a PDF; `collectReport` shells out to poppler to build one.
 */

import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";
import { profileData } from "../content/index";
import { cvConfig } from "../cv/cv.config";

export type Severity = "error" | "warn";

export interface Finding {
  severity: Severity;
  code: string;
  message: string;
}

export interface FontEntry {
  name: string;
  embedded: boolean;
  hasToUnicode: boolean;
}

/**
 * Poppler offers three extraction strategies and real-world ATS pipelines use
 * different ones, so the CV has to survive all three.
 *   reading — default mode, column/reading-order heuristics (most aggressive)
 *   layout  — preserves visual layout
 *   raw     — content-stream order
 */
export interface ExtractedText {
  reading: string;
  layout: string;
  raw: string;
}

export interface AtsReport {
  pages: number;
  imageCount: number;
  encrypted: boolean;
  hasForm: boolean;
  hasJavaScript: boolean;
  fonts: FontEntry[];
  text: ExtractedText;
}

export interface AtsExpectations {
  name: string;
  email: string;
  /** Headings that must survive extraction as their own line. */
  requiredSections: string[];
  /** Employers whose entry must keep its date range on the same extracted line. */
  datedOrgs: string[];
}

const MIN_EXTRACTED_WORDS = 150;
/** How far after an employer/school line its date range may land and still read as attached. */
const MAX_LINES_ENTRY_TO_DATE = 2;
const BULLET = "•";
/** U+FB00–U+FB06: ligature glyphs that some PDFs emit instead of the plain letters. */
const LIGATURE_RANGE = /[ﬀ-ﬆ]/;
/** Month-year ranges as rendered by formatDate, e.g. "May 2026 – Present". */
const DATE_RANGE = /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4}\s*[–-]\s*(\w+\s*)?\d{0,4}/;
/**
 * Phone-shaped digit runs — the repo is public, so these must never reach the PDF.
 * Matches the 3-3-2-2 grouping used in Türkiye, with or without a country/area prefix.
 */
const PHONE_LIKE = /(?:\+\d{1,3}[\s.-]?)?(?:\(0?\d{3}\)|0\d{3}|\b\d{3})[\s.-]?\d{3}[\s.-]?\d{2}[\s.-]?\d{2}\b/;

const MODES: (keyof ExtractedText)[] = ["reading", "layout", "raw"];

function lines(text: string): string[] {
  return text.split("\n").map((l) => l.trim());
}

function firstNonEmptyLine(text: string): string {
  return lines(text).find((l) => l.length > 0) ?? "";
}

function checkStructure(report: AtsReport): Finding[] {
  const out: Finding[] = [];
  if (report.pages !== 1) {
    out.push({ severity: "error", code: "single-page", message: `expected 1 page, got ${report.pages}` });
  }
  if (report.imageCount > 0) {
    out.push({
      severity: "error",
      code: "no-images",
      message: `${report.imageCount} image(s) embedded; ATS extractors cannot read text inside images`,
    });
  }
  if (report.encrypted) {
    out.push({ severity: "error", code: "not-encrypted", message: "PDF is encrypted; many parsers refuse it" });
  }
  if (report.hasForm) {
    out.push({ severity: "warn", code: "no-form", message: "PDF contains an AcroForm; parsers may read field values instead of text" });
  }
  if (report.hasJavaScript) {
    out.push({ severity: "warn", code: "no-javascript", message: "PDF contains JavaScript; some upload filters reject it" });
  }
  return out;
}

function checkFonts(report: AtsReport): Finding[] {
  const out: Finding[] = [];
  if (report.fonts.length === 0) {
    out.push({ severity: "error", code: "fonts-present", message: "no fonts found; the PDF likely has no text layer" });
    return out;
  }
  const notEmbedded = report.fonts.filter((f) => !f.embedded).map((f) => f.name);
  if (notEmbedded.length) {
    out.push({
      severity: "error",
      code: "fonts-embedded",
      message: `font(s) not embedded, text may re-flow or drop: ${notEmbedded.join(", ")}`,
    });
  }
  const noUnicode = report.fonts.filter((f) => !f.hasToUnicode).map((f) => f.name);
  if (noUnicode.length) {
    out.push({
      severity: "error",
      code: "fonts-tounicode",
      message: `font(s) without a ToUnicode map, extraction will produce garbage: ${noUnicode.join(", ")}`,
    });
  }
  return out;
}

function checkTextLayer(report: AtsReport): Finding[] {
  const out: Finding[] = [];
  for (const mode of MODES) {
    const words = report.text[mode].split(/\s+/).filter(Boolean).length;
    if (words < MIN_EXTRACTED_WORDS) {
      out.push({
        severity: "error",
        code: "text-layer",
        message: `${mode} extraction yielded only ${words} words (min ${MIN_EXTRACTED_WORDS})`,
      });
    }
    if (LIGATURE_RANGE.test(report.text[mode])) {
      out.push({
        severity: "error",
        code: "no-ligature-mangling",
        message: `${mode} extraction contains ligature glyphs (U+FB00–FB06) instead of plain letters`,
      });
    }
  }
  return out;
}

function checkIdentity(report: AtsReport, expect: AtsExpectations): Finding[] {
  const out: Finding[] = [];
  for (const mode of MODES) {
    const first = firstNonEmptyLine(report.text[mode]);
    if (first !== expect.name) {
      out.push({
        severity: "error",
        code: "name-first-line",
        message: `${mode}: first line must be the name alone; got ${JSON.stringify(first)}`,
      });
    }
  }
  if (!report.text.raw.includes(expect.email)) {
    out.push({ severity: "error", code: "contact-email", message: `email ${expect.email} not found in extracted text` });
  }
  const phone = report.text.raw.match(PHONE_LIKE);
  if (phone) {
    out.push({ severity: "error", code: "no-pii", message: `phone-shaped number in a public PDF: ${phone[0]}` });
  }
  return out;
}

function checkSections(report: AtsReport, expect: AtsExpectations): Finding[] {
  const out: Finding[] = [];
  for (const mode of MODES) {
    const seen = new Set(lines(report.text[mode]));
    const missing = expect.requiredSections.filter((s) => !seen.has(s));
    if (missing.length) {
      out.push({
        severity: "error",
        code: "required-sections",
        message: `${mode}: heading(s) not on their own extracted line: ${missing.join(", ")}`,
      });
    }
  }
  return out;
}

/**
 * The failure this exists to catch: a right-aligned date column that the extractor
 * lifts out into a separate block, leaving every employer and degree undated.
 *
 * Same-line is not the bar — a date on the line right after its employer is still
 * adjacent enough for a parser to associate the two. What breaks association is the
 * date landing far away, in a block of its own.
 */
function checkDatesStayAttached(report: AtsReport, expect: AtsExpectations): Finding[] {
  const out: Finding[] = [];
  for (const mode of MODES) {
    const textLines = lines(report.text[mode]).filter((l) => l.length > 0);
    for (const org of expect.datedOrgs) {
      // An org name can also appear in prose (the summary mentions Bilkent University),
      // so any one occurrence carrying its dates is enough.
      const occurrences = textLines.flatMap((l, i) => (l.includes(org) ? [i] : []));
      if (occurrences.length === 0) {
        out.push({ severity: "error", code: "entry-present", message: `${mode}: "${org}" missing from extracted text` });
        continue;
      }
      const dated = occurrences.some((at) =>
        textLines.slice(at, at + MAX_LINES_ENTRY_TO_DATE + 1).some((l) => DATE_RANGE.test(l)),
      );
      if (!dated) {
        out.push({
          severity: "error",
          code: "entry-date-attached",
          message:
            `${mode}: no date range within ${MAX_LINES_ENTRY_TO_DATE} line(s) of "${org}"; ` +
            `the date column was detached from its entry`,
        });
      }
    }
  }
  return out;
}

function checkBullets(report: AtsReport): Finding[] {
  const out: Finding[] = [];
  const bulleted = lines(report.text.raw).filter((l) => l.startsWith(BULLET));
  if (bulleted.length === 0) {
    out.push({
      severity: "warn",
      code: "bullet-glyph",
      message: `no line starts with U+2022; bullets may be extracting as a dash, weakening list detection`,
    });
  }
  return out;
}

export function atsLint(report: AtsReport, expect: AtsExpectations): Finding[] {
  return [
    ...checkStructure(report),
    ...checkFonts(report),
    ...checkTextLayer(report),
    ...checkIdentity(report, expect),
    ...checkSections(report, expect),
    ...checkDatesStayAttached(report, expect),
    ...checkBullets(report),
  ];
}

/** Expectations derived from the source of truth, so the lint follows the data. */
export function expectationsFrom(data = profileData, config = cvConfig): AtsExpectations {
  return {
    name: data.profile.name,
    email: data.profile.email,
    requiredSections: ["Summary", "Experience", "Projects", "Technical Skills", "Education", "Certifications", "Awards"],
    datedOrgs: [
      ...config.experience.map((sel) => sel.org),
      ...config.education,
    ],
  };
}

function poppler(bin: string, args: string[]): string {
  try {
    return execFileSync(bin, args, { encoding: "utf8", maxBuffer: 16 * 1024 * 1024 });
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    throw new Error(`${bin} failed — install poppler-utils (brew install poppler). ${detail}`);
  }
}

function parseFonts(raw: string): FontEntry[] {
  // pdffonts columns: name type encoding emb sub uni object ID
  return raw
    .split("\n")
    .slice(2) // header + rule
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const cols = l.split(/\s+/);
      const objIdIndex = cols.length - 2; // "object" and "ID" are two numeric columns
      return {
        name: cols[0],
        embedded: cols[objIdIndex - 3] === "yes",
        hasToUnicode: cols[objIdIndex - 1] === "yes",
      };
    });
}

function infoField(info: string, key: string): string {
  const line = info.split("\n").find((l) => l.startsWith(`${key}:`));
  return line ? line.slice(key.length + 1).trim() : "";
}

export function collectReport(pdfPath: string): AtsReport {
  const info = poppler("pdfinfo", [pdfPath]);
  const images = poppler("pdfimages", ["-list", pdfPath]);
  const fonts = poppler("pdffonts", [pdfPath]);
  return {
    pages: Number(infoField(info, "Pages")),
    imageCount: images.split("\n").slice(2).filter((l) => l.trim()).length,
    encrypted: infoField(info, "Encrypted") !== "no",
    hasForm: infoField(info, "Form") !== "none",
    hasJavaScript: infoField(info, "JavaScript") !== "no",
    fonts: parseFonts(fonts),
    text: {
      reading: poppler("pdftotext", [pdfPath, "-"]),
      layout: poppler("pdftotext", ["-layout", pdfPath, "-"]),
      raw: poppler("pdftotext", ["-raw", pdfPath, "-"]),
    },
  };
}

const isMain = process.argv[1] === fileURLToPath(import.meta.url);
if (isMain) {
  const arg = process.argv[2];
  const pdf = arg
    ? resolve(arg)
    : resolve(dirname(fileURLToPath(import.meta.url)), "..", "public", "cv.pdf");
  const findings = atsLint(collectReport(pdf), expectationsFrom());
  const errors = findings.filter((f) => f.severity === "error");

  for (const f of findings) {
    console.log(`${f.severity === "error" ? "ERROR" : "warn "}  [${f.code}] ${f.message}`);
  }
  if (findings.length === 0) console.log("ATS lint: all checks passed.");
  console.log(`\n${pdf}: ${errors.length} error(s), ${findings.length - errors.length} warning(s)`);
  if (errors.length > 0) process.exit(1);
}
