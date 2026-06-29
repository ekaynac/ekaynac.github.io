import { describe, it, expect } from "vitest";
import { clampT, quantize } from "../morph";

describe("morph helpers", () => {
  it("clamps to [0,1]", () => {
    expect(clampT(-0.5)).toBe(0);
    expect(clampT(1.5)).toBe(1);
    expect(clampT(0.37)).toBeCloseTo(0.37);
  });
  it("quantizes to the nearest pole", () => {
    expect(quantize(0.2)).toBe(0);
    expect(quantize(0.8)).toBe(1);
    expect(quantize(0.5)).toBe(1);
  });
});
