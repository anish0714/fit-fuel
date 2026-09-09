import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import Suggestion from "./Suggestion";

describe("Suggestion", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("shows a placeholder before the first calculation", () => {
    render(<Suggestion />);
    expect(screen.getByText(/press calculate to see your target/i)).toBeInTheDocument();
  });

  it("computes the target only after pressing Calculate", () => {
    render(<Suggestion />);
    fireEvent.click(screen.getByRole("button", { name: "Calculate" }));
    expect(screen.getByText("120g protein")).toBeInTheDocument(); // default 75kg * 1.6g/kg
  });

  it("does not update the result when an input changes without recalculating", () => {
    render(<Suggestion />);
    fireEvent.click(screen.getByRole("button", { name: "Calculate" }));
    expect(screen.getByText("120g protein")).toBeInTheDocument();

    fireEvent.change(screen.getByDisplayValue("75"), { target: { value: "100" } });

    // Stale result stays on screen, with a notice, until Calculate runs again.
    expect(screen.getByText("120g protein")).toBeInTheDocument();
    expect(screen.getByText(/inputs changed/i)).toBeInTheDocument();
  });

  it("updates the result after pressing Calculate again", () => {
    render(<Suggestion />);
    fireEvent.click(screen.getByRole("button", { name: "Calculate" }));
    fireEvent.change(screen.getByDisplayValue("75"), { target: { value: "100" } });
    fireEvent.click(screen.getByRole("button", { name: "Calculate" }));

    expect(screen.getByText("160g protein")).toBeInTheDocument(); // 100kg * 1.6g/kg
    expect(screen.queryByText(/inputs changed/i)).not.toBeInTheDocument();
  });
});
