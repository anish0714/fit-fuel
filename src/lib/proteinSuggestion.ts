import { POST_WORKOUT_EXTRAS, PROTEIN_BAR } from "../data/extras";
import type { Recipe } from "../types";

export interface SuggestionStep {
  label: string;
  protein: number;
  kcal: number;
}

export interface SuggestionResult {
  baseProtein: number;
  baseKcal: number;
  targetProtein: number;
  steps: SuggestionStep[];
  finalProtein: number;
  finalKcal: number;
  metWithoutExtras: boolean;
  stillShort: boolean;
}

interface BuildSuggestionParams {
  targetProtein: number;
  breakfast: Recipe;
  dinner: Recipe;
  scoopProtein: number;
  scoopKcal: number;
  breakfasts: Recipe[];
  dinners: Recipe[];
}

/**
 * Tiered recommendation: try the protein bar first (simplest, no cooking
 * change), then a second scoop, then swapping to the highest-protein
 * breakfast or dinner already in the library — stopping as soon as the
 * target is met.
 */
export function buildProteinSuggestion({
  targetProtein,
  breakfast,
  dinner,
  scoopProtein,
  scoopKcal,
  breakfasts,
  dinners,
}: BuildSuggestionParams): SuggestionResult {
  const baseProtein = breakfast.macros.protein + dinner.macros.protein + scoopProtein + POST_WORKOUT_EXTRAS.protein;
  const baseKcal = breakfast.macros.kcal + dinner.macros.kcal + scoopKcal + POST_WORKOUT_EXTRAS.kcal;
  const metWithoutExtras = baseProtein >= targetProtein;

  let protein = baseProtein;
  let kcal = baseKcal;
  const steps: SuggestionStep[] = [];

  if (!metWithoutExtras) {
    protein += PROTEIN_BAR.protein;
    kcal += PROTEIN_BAR.kcal;
    steps.push({ label: "Add your protein bar", protein: PROTEIN_BAR.protein, kcal: PROTEIN_BAR.kcal });

    if (protein < targetProtein) {
      protein += scoopProtein;
      kcal += scoopKcal;
      steps.push({ label: "Add a second scoop after your workout", protein: scoopProtein, kcal: scoopKcal });
    }

    if (protein < targetProtein) {
      const bestBreakfast = [...breakfasts].sort((a, b) => b.macros.protein - a.macros.protein)[0];
      if (bestBreakfast && bestBreakfast.id !== breakfast.id && bestBreakfast.macros.protein > breakfast.macros.protein) {
        const deltaProtein = bestBreakfast.macros.protein - breakfast.macros.protein;
        const deltaKcal = bestBreakfast.macros.kcal - breakfast.macros.kcal;
        protein += deltaProtein;
        kcal += deltaKcal;
        steps.push({ label: `Switch breakfast to ${bestBreakfast.name}`, protein: deltaProtein, kcal: deltaKcal });
      }
    }

    if (protein < targetProtein) {
      const bestDinner = [...dinners].sort((a, b) => b.macros.protein - a.macros.protein)[0];
      if (bestDinner && bestDinner.id !== dinner.id && bestDinner.macros.protein > dinner.macros.protein) {
        const deltaProtein = bestDinner.macros.protein - dinner.macros.protein;
        const deltaKcal = bestDinner.macros.kcal - dinner.macros.kcal;
        protein += deltaProtein;
        kcal += deltaKcal;
        steps.push({ label: `Switch dinner to ${bestDinner.name}`, protein: deltaProtein, kcal: deltaKcal });
      }
    }
  }

  return {
    baseProtein,
    baseKcal,
    targetProtein,
    steps,
    finalProtein: protein,
    finalKcal: kcal,
    metWithoutExtras,
    stillShort: protein < targetProtein,
  };
}
