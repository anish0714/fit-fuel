export type ProteinType = "tofu" | "chicken" | "fish" | "chickpea";

export type RecipeCategory = "dinner" | "breakfast";

export interface Macros {
  protein: number;
  kcal: number;
}

export interface Recipe {
  id: string;
  name: string;
  category: RecipeCategory;
  protein: ProteinType | null;
  fiberFocus: boolean;
  ingredients: string[];
  method: string[];
  settings?: string;
  macros: Macros;
}

export interface TimelineStop {
  time: string;
  label: string;
  detail: string;
}

export interface Staple {
  label: string;
  value: string;
}

export interface SupplementEntry {
  time: string;
  supplement: string;
  paired: string;
  why: string;
}

export interface ShoppingItem {
  item: string;
  brand: string;
  where: string[];
  note: string;
}

export interface ShoppingCategory {
  category: string;
  items: ShoppingItem[];
}

export const WEEKDAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export type Weekday = (typeof WEEKDAYS)[number];

export interface MealPlan {
  [day: string]: { dinnerId: string | null; breakfastId: string | null };
}
