import { RotateCcw } from "lucide-react";
import { BREAKFASTS, DINNERS } from "../data/recipes";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { WEEKDAYS, type MealPlan as MealPlanType } from "../types";

const FIXED_EXTRAS = { protein: 20 + 28, kcal: 200 + 230 }; // protein bar + post-workout bowl

const EMPTY_PLAN: MealPlanType = Object.fromEntries(
  WEEKDAYS.map((day) => [day, { dinnerId: null, breakfastId: null }]),
);

export default function MealPlan() {
  const [plan, setPlan] = useLocalStorage<MealPlanType>("ff:mealplan", EMPTY_PLAN);

  function updateDay(day: string, field: "dinnerId" | "breakfastId", value: string) {
    setPlan((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value || null },
    }));
  }

  function resetPlan() {
    setPlan(EMPTY_PLAN);
  }

  return (
    <div>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">Meal plan</h1>
          <p className="mt-2 max-w-2xl text-fg-muted">
            Assign a dinner and a breakfast for each day. Totals include the fixed protein bar and
            post-workout bowl, so you can see the day's estimated protein and calories at a glance.
          </p>
        </div>
        <button
          type="button"
          onClick={resetPlan}
          className="flex shrink-0 items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-fg-muted transition-colors hover:text-fg"
        >
          <RotateCcw size={13} />
          Reset week
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {WEEKDAYS.map((day) => {
          const entry = plan[day] ?? { dinnerId: null, breakfastId: null };
          const breakfast = BREAKFASTS.find((b) => b.id === entry.breakfastId);
          const dinner = DINNERS.find((d) => d.id === entry.dinnerId);
          const totalProtein = (breakfast?.macros.protein ?? 0) + (dinner?.macros.protein ?? 0) + FIXED_EXTRAS.protein;
          const totalKcal = (breakfast?.macros.kcal ?? 0) + (dinner?.macros.kcal ?? 0) + FIXED_EXTRAS.kcal;
          const hasPicks = Boolean(breakfast || dinner);

          return (
            <div
              key={day}
              className="grid grid-cols-1 items-center gap-3 rounded-xl border border-line bg-canvas-subtle p-4 sm:grid-cols-[100px_1fr_1fr_auto]"
            >
              <div className="text-sm font-bold">{day}</div>

              <select
                value={entry.breakfastId ?? ""}
                onChange={(e) => updateDay(day, "breakfastId", e.target.value)}
                className="w-full rounded-lg border border-line bg-canvas px-3 py-2 text-sm outline-none focus:border-accent"
              >
                <option value="">Breakfast — none picked</option>
                {BREAKFASTS.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>

              <select
                value={entry.dinnerId ?? ""}
                onChange={(e) => updateDay(day, "dinnerId", e.target.value)}
                className="w-full rounded-lg border border-line bg-canvas px-3 py-2 text-sm outline-none focus:border-accent"
              >
                <option value="">Dinner — none picked</option>
                {DINNERS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>

              <div className="flex gap-4 font-mono text-sm sm:justify-end">
                <span className={hasPicks ? "font-semibold" : "text-fg-subtle"}>{totalProtein}g protein</span>
                <span className={hasPicks ? "font-semibold" : "text-fg-subtle"}>{totalKcal} kcal</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
