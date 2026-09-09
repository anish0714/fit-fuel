import type { Staple, TimelineStop } from "../types";

export const TIMELINE: TimelineStop[] = [
  { time: "12:00", label: "Meal 1 — Eggs & Bagel", detail: "4 eggs, 2 bagels. Fast breaks here." },
  { time: "2:30", label: "Snack", detail: "Protein bar." },
  { time: "4:00–7:00", label: "Gym + Commute", detail: "Training block, bus transit both ways." },
  { time: "~7:05", label: "Post-Workout Bowl", detail: "Plant-based protein powder, berries, chia." },
  { time: "~7:30", label: "Evening Meal", detail: "Tofu, fish, or chicken — air fryer." },
  { time: "8:00", label: "Window Closes", detail: "Fast begins until 12:00 next day." },
];

export const STAPLES: Staple[] = [
  { label: "Restrictions", value: "Lactose-intolerant · no beef, no pork" },
  { label: "Eating window", value: "12:00 PM – 8:00 PM (intermittent fasting)" },
  { label: "Training", value: "Gym 4:00–7:00 PM, incl. bus commute" },
  { label: "Equipment", value: "Air fryer (Ninja Crispi)" },
  { label: "Flavor base", value: "Salt, pepper, and pantry basics — extra spice is optional, not required" },
];
