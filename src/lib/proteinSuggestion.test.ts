import { describe, expect, it } from "vitest";
import { BREAKFASTS, DINNERS } from "../data/recipes";
import { buildProteinSuggestion } from "./proteinSuggestion";

const breakfast = BREAKFASTS.find((b) => b.id === "classic-scramble")!;
const dinner = DINNERS.find((d) => d.id === "tofu-steaks")!;

describe("buildProteinSuggestion", () => {
  it("needs no extras when the base plan already meets the target", () => {
    const result = buildProteinSuggestion({
      targetProtein: 80,
      breakfast,
      dinner,
      scoopProtein: 24,
      scoopKcal: 130,
      breakfasts: BREAKFASTS,
      dinners: DINNERS,
    });

    expect(result.metWithoutExtras).toBe(true);
    expect(result.steps).toHaveLength(0);
    expect(result.stillShort).toBe(false);
  });

  it("recommends the protein bar first when the base plan falls a little short", () => {
    // base = 43 (breakfast) + 24 (tofu dinner) + 24 (scoop) + 4 (extras) = 95
    const result = buildProteinSuggestion({
      targetProtein: 100,
      breakfast,
      dinner,
      scoopProtein: 24,
      scoopKcal: 130,
      breakfasts: BREAKFASTS,
      dinners: DINNERS,
    });

    expect(result.metWithoutExtras).toBe(false);
    expect(result.steps[0].label).toBe("Add your protein bar");
    expect(result.finalProtein).toBeGreaterThanOrEqual(100);
    expect(result.stillShort).toBe(false);
  });

  it("stacks bar, second scoop, and a breakfast/dinner swap for a large gap", () => {
    const result = buildProteinSuggestion({
      targetProtein: 220,
      breakfast,
      dinner,
      scoopProtein: 24,
      scoopKcal: 130,
      breakfasts: BREAKFASTS,
      dinners: DINNERS,
    });

    const labels = result.steps.map((s) => s.label);
    expect(labels).toContain("Add your protein bar");
    expect(labels).toContain("Add a second scoop after your workout");
    expect(labels.some((l) => l.startsWith("Switch dinner to"))).toBe(true);
  });

  it("does not suggest swapping to a recipe that is already selected", () => {
    const bestDinner = [...DINNERS].sort((a, b) => b.macros.protein - a.macros.protein)[0];
    const result = buildProteinSuggestion({
      targetProtein: 1000,
      breakfast,
      dinner: bestDinner,
      scoopProtein: 24,
      scoopKcal: 130,
      breakfasts: BREAKFASTS,
      dinners: DINNERS,
    });

    expect(result.steps.some((s) => s.label.startsWith("Switch dinner to"))).toBe(false);
  });
});
