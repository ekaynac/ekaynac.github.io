import { describe, it, expect } from "vitest";
import { latexEscape } from "../latex-escape";

describe("latexEscape", () => {
  it("escapes ampersand", () => expect(latexEscape("R&D")).toBe("R\\&D"));
  it("escapes percent, hash, dollar, underscore", () =>
    expect(latexEscape("a%b#c$d_e")).toBe("a\\%b\\#c\\$d\\_e"));
  it("escapes braces", () => expect(latexEscape("{x}")).toBe("\\{x\\}"));
  it("escapes backslash without re-escaping its braces", () =>
    expect(latexEscape("a\\b")).toBe("a\\textbackslash{}b"));
  it("escapes tilde and caret", () =>
    expect(latexEscape("~^")).toBe("\\textasciitilde{}\\textasciicircum{}"));
  it("leaves Turkish characters intact", () =>
    expect(latexEscape("Enes Kaynakcı, Yayınları")).toBe("Enes Kaynakcı, Yayınları"));
  it("leaves ordinary punctuation intact", () =>
    expect(latexEscape("C++ / 100/100 — AES-256")).toBe("C++ / 100/100 — AES-256"));
});
