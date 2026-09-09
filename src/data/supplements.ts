import type { SupplementEntry } from "../types";

export const SUPPLEMENTS: SupplementEntry[] = [
  {
    time: "12:00 PM",
    supplement: "Vitamin D3 + K2",
    paired: "With Meal 1 (eggs & bagel)",
    why: "Fat-soluble; egg-yolk fat aids uptake, and K2 is best absorbed alongside D3.",
  },
  {
    time: "12:05 PM",
    supplement: "B12 + Multivitamin",
    paired: "With Meal 1 (eggs & bagel)",
    why: "First food after the 16-hour fast; taking water-soluble vitamins with food reduces nausea and steadies absorption.",
  },
  {
    time: "~7:15 PM",
    supplement: "Omega-3 (fish oil)",
    paired: "With the evening meal",
    why: "Needs dietary fat to absorb well; spacing it from the noon dose and pairing with the oil-cooked dinner also limits reflux.",
  },
];
