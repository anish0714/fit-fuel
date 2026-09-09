import { useMemo, useState } from "react";
import { BREAKFASTS, DINNERS } from "../data/recipes";

const PROTEIN_BAR = { label: "Protein bar", protein: 20, kcal: 200 };
const POST_WORKOUT_BOWL = { label: "Post-workout bowl", protein: 28, kcal: 230 };

export default function Macros() {
  const [breakfastId, setBreakfastId] = useState(BREAKFASTS[0]?.id ?? "");
  const [dinnerId, setDinnerId] = useState(DINNERS[0]?.id ?? "");

  const breakfast = BREAKFASTS.find((b) => b.id === breakfastId);
  const dinner = DINNERS.find((d) => d.id === dinnerId);

  const total = useMemo(() => {
    const protein = (breakfast?.macros.protein ?? 0) + (dinner?.macros.protein ?? 0) + PROTEIN_BAR.protein + POST_WORKOUT_BOWL.protein;
    const kcal = (breakfast?.macros.kcal ?? 0) + (dinner?.macros.kcal ?? 0) + PROTEIN_BAR.kcal + POST_WORKOUT_BOWL.kcal;
    return { protein, kcal };
  }, [breakfast, dinner]);

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Macro breakdown</h1>
      <p className="mt-2 mb-8 max-w-2xl text-fg-muted">
        Estimates only — exact numbers shift with brand, portion, and oil used. Weigh proteins raw for
        tighter tracking.
      </p>

      <section className="mb-10 rounded-xl border border-accent/40 bg-accent-muted p-5">
        <h2 className="mb-4 text-sm font-bold text-accent-emphasis">Build a day</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <select
            value={breakfastId}
            onChange={(e) => setBreakfastId(e.target.value)}
            className="w-full rounded-lg border border-line bg-canvas px-3 py-2 text-sm outline-none focus:border-accent"
          >
            {BREAKFASTS.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
          <select
            value={dinnerId}
            onChange={(e) => setDinnerId(e.target.value)}
            className="w-full rounded-lg border border-line bg-canvas px-3 py-2 text-sm outline-none focus:border-accent"
          >
            {DINNERS.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
        <p className="mt-3 text-xs text-fg-muted">
          Plus the fixed protein bar ({PROTEIN_BAR.protein}g / {PROTEIN_BAR.kcal} kcal) and post-workout bowl (
          {POST_WORKOUT_BOWL.protein}g / {POST_WORKOUT_BOWL.kcal} kcal).
        </p>
        <div className="mt-4 flex gap-8 font-mono">
          <div>
            <div className="text-2xl font-bold">{total.protein}g</div>
            <div className="text-[11px] tracking-wide text-fg-muted uppercase">total protein</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{total.kcal}</div>
            <div className="text-[11px] tracking-wide text-fg-muted uppercase">total kcal</div>
          </div>
        </div>
      </section>

      <div className="overflow-x-auto rounded-xl border border-line">
        <table className="w-full min-w-[480px] border-collapse text-sm">
          <thead>
            <tr className="bg-canvas-inset text-left">
              <th className="border-b border-line px-4 py-3 text-xs font-semibold tracking-wide text-fg-muted uppercase">
                Item
              </th>
              <th className="border-b border-line px-4 py-3 text-right text-xs font-semibold tracking-wide text-fg-muted uppercase">
                Protein
              </th>
              <th className="border-b border-line px-4 py-3 text-right text-xs font-semibold tracking-wide text-fg-muted uppercase">
                Calories
              </th>
            </tr>
          </thead>
          <tbody>
            {[...DINNERS, ...BREAKFASTS].map((recipe) => (
              <tr key={recipe.id} className="border-b border-line last:border-0">
                <td className="px-4 py-3">{recipe.name}</td>
                <td className="px-4 py-3 text-right font-mono">{recipe.macros.protein} g</td>
                <td className="px-4 py-3 text-right font-mono">{recipe.macros.kcal}</td>
              </tr>
            ))}
            <tr className="border-b border-line">
              <td className="px-4 py-3">{PROTEIN_BAR.label}</td>
              <td className="px-4 py-3 text-right font-mono">{PROTEIN_BAR.protein} g</td>
              <td className="px-4 py-3 text-right font-mono">{PROTEIN_BAR.kcal}</td>
            </tr>
            <tr>
              <td className="px-4 py-3">{POST_WORKOUT_BOWL.label}</td>
              <td className="px-4 py-3 text-right font-mono">{POST_WORKOUT_BOWL.protein} g</td>
              <td className="px-4 py-3 text-right font-mono">{POST_WORKOUT_BOWL.kcal}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
