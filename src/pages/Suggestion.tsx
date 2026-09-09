import { useMemo } from "react";
import { CheckCircle2 } from "lucide-react";
import { POST_WORKOUT_EXTRAS } from "../data/extras";
import { KG_PER_LB, PROTEIN_GOALS } from "../data/goals";
import { BREAKFASTS, DINNERS } from "../data/recipes";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { buildProteinSuggestion } from "../lib/proteinSuggestion";

interface SuggestionInputs {
  weight: number;
  weightUnit: "kg" | "lb";
  goalId: string;
  scoopProtein: number;
  scoopKcal: number;
  breakfastId: string;
  dinnerId: string;
}

const DEFAULT_INPUTS: SuggestionInputs = {
  weight: 75,
  weightUnit: "kg",
  goalId: "active",
  scoopProtein: 24,
  scoopKcal: 130,
  breakfastId: BREAKFASTS[0]?.id ?? "",
  dinnerId: DINNERS[0]?.id ?? "",
};

export default function Suggestion() {
  const [inputs, setInputs] = useLocalStorage<SuggestionInputs>("ff:suggestion-inputs", DEFAULT_INPUTS);

  function update<K extends keyof SuggestionInputs>(key: K, value: SuggestionInputs[K]) {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }

  const breakfast = BREAKFASTS.find((b) => b.id === inputs.breakfastId) ?? BREAKFASTS[0];
  const dinner = DINNERS.find((d) => d.id === inputs.dinnerId) ?? DINNERS[0];
  const goal = PROTEIN_GOALS.find((g) => g.id === inputs.goalId) ?? PROTEIN_GOALS[0];

  const result = useMemo(() => {
    const weightKg = inputs.weightUnit === "kg" ? inputs.weight : inputs.weight * KG_PER_LB;
    const targetProtein = Math.round(weightKg * goal.gramsPerKg);
    return buildProteinSuggestion({
      targetProtein,
      breakfast,
      dinner,
      scoopProtein: inputs.scoopProtein || 0,
      scoopKcal: inputs.scoopKcal || 0,
      breakfasts: BREAKFASTS,
      dinners: DINNERS,
    });
  }, [inputs, goal, breakfast, dinner]);

  const surplus = result.finalProtein - result.targetProtein;

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Get suggestion</h1>
      <p className="mt-2 mb-8 max-w-2xl text-fg-muted">
        Enter your weight and your protein powder's own numbers, pick your planned breakfast and dinner,
        and this works out whether your day needs the protein bar, a second scoop, or a higher-protein
        swap to hit your target.
      </p>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[380px_1fr]">
        <section className="flex flex-col gap-4 rounded-xl border border-line bg-canvas-subtle p-5">
          <h2 className="text-sm font-bold">Your numbers</h2>

          <label className="flex flex-col gap-1.5 text-sm">
            Weight
            <div className="flex gap-2">
              <input
                type="number"
                min={1}
                value={inputs.weight}
                onChange={(e) => update("weight", Number(e.target.value))}
                className="w-full rounded-lg border border-line bg-canvas px-3 py-2 outline-none focus:border-accent"
              />
              <select
                value={inputs.weightUnit}
                onChange={(e) => update("weightUnit", e.target.value as SuggestionInputs["weightUnit"])}
                className="rounded-lg border border-line bg-canvas px-2 py-2 outline-none focus:border-accent"
              >
                <option value="kg">kg</option>
                <option value="lb">lb</option>
              </select>
            </div>
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            Goal
            <select
              value={inputs.goalId}
              onChange={(e) => update("goalId", e.target.value)}
              className="w-full rounded-lg border border-line bg-canvas px-3 py-2 outline-none focus:border-accent"
            >
              {PROTEIN_GOALS.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.label} ({g.gramsPerKg}g/kg)
                </option>
              ))}
            </select>
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="flex flex-col gap-1.5 text-sm">
              Protein per scoop (g)
              <input
                type="number"
                min={0}
                value={inputs.scoopProtein}
                onChange={(e) => update("scoopProtein", Number(e.target.value))}
                className="w-full rounded-lg border border-line bg-canvas px-3 py-2 outline-none focus:border-accent"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm">
              Calories per scoop
              <input
                type="number"
                min={0}
                value={inputs.scoopKcal}
                onChange={(e) => update("scoopKcal", Number(e.target.value))}
                className="w-full rounded-lg border border-line bg-canvas px-3 py-2 outline-none focus:border-accent"
              />
            </label>
          </div>

          <label className="flex flex-col gap-1.5 text-sm">
            Planned breakfast
            <select
              value={breakfast?.id}
              onChange={(e) => update("breakfastId", e.target.value)}
              className="w-full rounded-lg border border-line bg-canvas px-3 py-2 outline-none focus:border-accent"
            >
              {BREAKFASTS.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} — {b.macros.protein}g
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            Planned dinner
            <select
              value={dinner?.id}
              onChange={(e) => update("dinnerId", e.target.value)}
              className="w-full rounded-lg border border-line bg-canvas px-3 py-2 outline-none focus:border-accent"
            >
              {DINNERS.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} — {d.macros.protein}g{d.protein ? ` (${d.protein})` : ""}
                </option>
              ))}
            </select>
          </label>
        </section>

        <section className="flex flex-col gap-6">
          <div className="rounded-xl border border-line bg-canvas-subtle p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <div>
                <div className="text-xs font-semibold tracking-wide text-fg-muted uppercase">Daily target</div>
                <div className="font-mono text-3xl font-bold">{result.targetProtein}g protein</div>
              </div>
              <div className="text-xs text-fg-muted">
                {goal.label} · {goal.gramsPerKg}g per kg bodyweight
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-line">
            <table className="w-full border-collapse text-sm">
              <tbody>
                <Row label={breakfast?.name ?? "Breakfast"} protein={breakfast?.macros.protein ?? 0} kcal={breakfast?.macros.kcal ?? 0} />
                <Row label={dinner?.name ?? "Dinner"} protein={dinner?.macros.protein ?? 0} kcal={dinner?.macros.kcal ?? 0} />
                <Row label="Post-workout scoop" protein={inputs.scoopProtein || 0} kcal={inputs.scoopKcal || 0} />
                <Row label={POST_WORKOUT_EXTRAS.label} protein={POST_WORKOUT_EXTRAS.protein} kcal={POST_WORKOUT_EXTRAS.kcal} />
                <tr className="border-t border-line font-semibold">
                  <td className="px-4 py-3">Base plan total</td>
                  <td className="px-4 py-3 text-right font-mono">{result.baseProtein}g</td>
                  <td className="px-4 py-3 text-right font-mono">{result.baseKcal} kcal</td>
                </tr>
              </tbody>
            </table>
          </div>

          {result.metWithoutExtras ? (
            <div className="flex items-start gap-3 rounded-xl border border-accent/40 bg-accent-muted p-5 text-accent-emphasis">
              <CheckCircle2 size={20} className="mt-0.5 shrink-0" />
              <div>
                <div className="font-semibold">Your base plan already covers it.</div>
                <div className="mt-1 text-sm">
                  No protein bar or second scoop needed — you're {surplus}g over target with breakfast,
                  dinner, and a single scoop.
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-warm/40 bg-warm-muted p-5">
              <div className="font-semibold text-warm">
                Short by {result.targetProtein - result.baseProtein}g on the base plan — here's what closes it:
              </div>
              <ol className="mt-3 flex flex-col gap-2">
                {result.steps.map((step) => (
                  <li key={step.label} className="flex items-center justify-between gap-3 rounded-lg bg-canvas px-3 py-2 text-sm">
                    <span>{step.label}</span>
                    <span className="font-mono text-fg-muted">
                      +{step.protein}g / {step.kcal} kcal
                    </span>
                  </li>
                ))}
              </ol>
              <div className="mt-4 flex items-center justify-between border-t border-line pt-3 font-mono">
                <span className="text-sm font-semibold text-fg">Final total</span>
                <span>
                  {result.finalProtein}g · {result.finalKcal} kcal
                </span>
              </div>
              {result.stillShort && (
                <p className="mt-3 text-xs text-warm">
                  Still {result.targetProtein - result.finalProtein}g short even with the bar, a second
                  scoop, and the highest-protein options in the library — consider a bigger dinner portion
                  or an extra snack.
                </p>
              )}
            </div>
          )}
        </section>
      </div>

      <p className="mt-8 border-l-2 border-line pl-3 text-xs text-fg-muted">
        Estimates only, based on a simple grams-per-kilogram target — not medical or dietary advice.
      </p>
    </div>
  );
}

function Row({ label, protein, kcal }: { label: string; protein: number; kcal: number }) {
  return (
    <tr className="border-b border-line last:border-0">
      <td className="px-4 py-3">{label}</td>
      <td className="px-4 py-3 text-right font-mono">{protein}g</td>
      <td className="px-4 py-3 text-right font-mono">{kcal} kcal</td>
    </tr>
  );
}
