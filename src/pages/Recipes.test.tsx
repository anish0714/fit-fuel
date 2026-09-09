import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import Recipes from "./Recipes";

describe("Recipes", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("shows dinners by default", () => {
    render(<Recipes />);
    expect(screen.getByText("Salt & Pepper Tofu Steaks")).toBeInTheDocument();
    expect(screen.queryByText("Salt & Pepper Scramble Bagel")).not.toBeInTheDocument();
  });

  it("filters by search text", () => {
    render(<Recipes />);
    fireEvent.change(screen.getByPlaceholderText("Search recipes…"), {
      target: { value: "spinach" },
    });
    expect(screen.getByText("Tofu & Spinach Bake")).toBeInTheDocument();
    expect(screen.queryByText("Salt & Pepper Tofu Steaks")).not.toBeInTheDocument();
  });

  it("filters by protein type", () => {
    render(<Recipes />);
    fireEvent.click(screen.getByRole("button", { name: "fish" }));
    expect(screen.getByText("Crispy Breaded Fish Fillets")).toBeInTheDocument();
    expect(screen.queryByText("Salt & Pepper Tofu Steaks")).not.toBeInTheDocument();
  });

  it("filters by the chickpea protein type", () => {
    render(<Recipes />);
    fireEvent.click(screen.getByRole("button", { name: "chickpea" }));
    expect(screen.getByText("Chickpea & Spinach Skillet")).toBeInTheDocument();
    expect(screen.getByText("Crispy Chickpea Bowl with Spring Mix")).toBeInTheDocument();
    expect(screen.queryByText("Salt & Pepper Tofu Steaks")).not.toBeInTheDocument();
  });

  it("switches to the breakfast tab", () => {
    render(<Recipes />);
    fireEvent.click(screen.getByRole("button", { name: "12:00 PM Rotation" }));
    expect(screen.getByText("Salt & Pepper Scramble Bagel")).toBeInTheDocument();
    expect(screen.getByText("High-Fibre Oats Bowl")).toBeInTheDocument();
    expect(screen.queryByText("Salt & Pepper Tofu Steaks")).not.toBeInTheDocument();
  });

  it("toggles a recipe as a favorite and persists it", () => {
    render(<Recipes />);
    const favoriteButtons = screen.getAllByLabelText("Add to favorites");
    fireEvent.click(favoriteButtons[0]);
    expect(JSON.parse(localStorage.getItem("ff:favorites") ?? "[]")).toHaveLength(1);
  });
});
