import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MorphProvider } from "../../morph/MorphProvider";
import { Work } from "../Work";
import { Hero } from "../Hero";

const wrap = (ui: React.ReactNode) => render(<MorphProvider>{ui}</MorphProvider>);

describe("sections", () => {
  it("Hero shows the name and the morph slider", () => {
    wrap(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/Enes Kaynakc/);
    expect(screen.getByRole("slider")).toBeInTheDocument();
  });
  it("Work links public projects but renders SIMS without a link", () => {
    wrap(<Work />);
    expect(screen.getByRole("link", { name: /LLMDAP/i })).toHaveAttribute("href", "https://github.com/ekaynac/LLMDAP");
    const sims = screen.getByText(/Smart Inventory Management System/i);
    expect(within(sims.closest("article")!).queryByRole("link")).toBeNull();
  });
});
