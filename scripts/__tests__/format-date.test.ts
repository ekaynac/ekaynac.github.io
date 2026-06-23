import { describe, it, expect } from "vitest";
import { formatDate } from "../format-date";

describe("formatDate", () => {
  it("formats present", () => expect(formatDate("present")).toBe("Present"));
  it("formats year-month", () => expect(formatDate("2026-05")).toBe("May 2026"));
  it("formats full date to month-year", () => expect(formatDate("2026-05-18")).toBe("May 2026"));
  it("formats bare year", () => expect(formatDate("2022")).toBe("2022"));
  it("passes through unexpected input unchanged", () => expect(formatDate("weird")).toBe("weird"));
});
