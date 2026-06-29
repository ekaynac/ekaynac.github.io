import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MorphProvider } from "../MorphProvider";
import { MorphControl } from "../MorphControl";

describe("MorphControl", () => {
  it("is an accessible slider defaulting to the engineer pole", () => {
    render(<MorphProvider><MorphControl /></MorphProvider>);
    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("aria-valuemin", "0");
    expect(slider).toHaveAttribute("aria-valuemax", "100");
    expect(slider).toHaveAttribute("aria-valuenow", "0");
    expect(slider).toHaveAttribute("aria-valuetext");
  });
});
