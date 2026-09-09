export const PROTEIN_BAR = { label: "Protein bar", protein: 20, kcal: 200 };

// Assumes a typical plant-based scoop (~24g protein / 130 kcal) when a page
// doesn't ask the user for their own product's numbers.
export const DEFAULT_SCOOP = { protein: 24, kcal: 130 };

export const POST_WORKOUT_EXTRAS = { label: "Berries + chia", protein: 4, kcal: 100 };

export const POST_WORKOUT_BOWL = {
  label: "Post-workout bowl",
  protein: DEFAULT_SCOOP.protein + POST_WORKOUT_EXTRAS.protein,
  kcal: DEFAULT_SCOOP.kcal + POST_WORKOUT_EXTRAS.kcal,
};
