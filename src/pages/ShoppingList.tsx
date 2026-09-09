import { useMemo, useState } from "react";
import { Plus, X } from "lucide-react";
import { SHOPPING } from "../data/shopping";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface CustomItem {
  id: string;
  label: string;
}

export default function ShoppingList() {
  const [checked, setChecked] = useLocalStorage<Record<string, boolean>>("ff:shopping-checked", {});
  const [customItems, setCustomItems] = useLocalStorage<CustomItem[]>("ff:shopping-custom", []);
  const [draft, setDraft] = useState("");

  const totalBuiltIn = useMemo(() => SHOPPING.reduce((sum, group) => sum + group.items.length, 0), []);
  const checkedBuiltIn = useMemo(
    () => SHOPPING.flatMap((g) => g.items.map((i) => `${g.category}::${i.item}`)).filter((key) => checked[key]).length,
    [checked],
  );

  function toggle(key: string) {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function addCustomItem() {
    const label = draft.trim();
    if (!label) return;
    setCustomItems((prev) => [...prev, { id: crypto.randomUUID(), label }]);
    setDraft("");
  }

  function removeCustomItem(id: string) {
    setCustomItems((prev) => prev.filter((i) => i.id !== id));
    setChecked((prev) => {
      const next = { ...prev };
      delete next[`custom::${id}`];
      return next;
    });
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">Where to buy</h1>
          <p className="mt-2 max-w-2xl text-fg-muted">
            Real picks for FreshCo and Food Basics. A few items — the protein bar, powder, and
            supplements — are more realistically sourced elsewhere; those are flagged below.
          </p>
        </div>
        <div className="font-mono text-sm text-fg-muted">
          {checkedBuiltIn} / {totalBuiltIn} checked
        </div>
      </div>

      <div className="mb-8 rounded-xl border border-line bg-canvas-subtle p-4">
        <h2 className="mb-3 text-sm font-bold">Your list</h2>
        <div className="mb-3 flex gap-2">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addCustomItem()}
            placeholder="Add something not on the list…"
            className="flex-1 rounded-lg border border-line bg-canvas px-3 py-2 text-sm outline-none focus:border-accent"
          />
          <button
            type="button"
            onClick={addCustomItem}
            className="flex items-center gap-1 rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-canvas"
          >
            <Plus size={15} />
            Add
          </button>
        </div>
        {customItems.length > 0 && (
          <ul className="flex flex-col gap-1.5">
            {customItems.map((item) => {
              const key = `custom::${item.id}`;
              return (
                <li key={item.id} className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 hover:bg-canvas-inset">
                  <input
                    type="checkbox"
                    checked={Boolean(checked[key])}
                    onChange={() => toggle(key)}
                    className="h-4 w-4 accent-[var(--color-accent)]"
                  />
                  <span className={`flex-1 text-sm ${checked[key] ? "text-fg-subtle line-through" : ""}`}>
                    {item.label}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeCustomItem(item.id)}
                    aria-label={`Remove ${item.label}`}
                    className="text-fg-subtle hover:text-danger"
                  >
                    <X size={14} />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="flex flex-col gap-8">
        {SHOPPING.map((group) => (
          <div key={group.category}>
            <h2 className="mb-3 text-sm font-bold">{group.category}</h2>
            <ul className="flex flex-col gap-1 rounded-xl border border-line bg-canvas-subtle p-2">
              {group.items.map((item) => {
                const key = `${group.category}::${item.item}`;
                const isChecked = Boolean(checked[key]);
                return (
                  <li key={key} className="flex items-start gap-3 rounded-lg px-3 py-2.5 hover:bg-canvas-inset">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggle(key)}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-accent)]"
                    />
                    <div className="flex-1">
                      <div className={`text-sm font-semibold ${isChecked ? "text-fg-subtle line-through" : ""}`}>
                        {item.item}
                      </div>
                      <div className="mt-0.5 text-xs text-fg-muted">{item.brand}</div>
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {item.where.map((w) => (
                          <span
                            key={w}
                            className="rounded-md border border-line bg-canvas px-1.5 py-0.5 font-mono text-[10px] text-fg-muted"
                          >
                            {w}
                          </span>
                        ))}
                      </div>
                      <p className="mt-1.5 text-xs text-fg-muted">{item.note}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-8 border-l-2 border-line pl-3 text-xs text-fg-muted">
        Store inventory varies by location and shifts with flyers — check the FreshCo or Food Basics app for
        what's actually on the shelf near you before a trip.
      </p>
    </div>
  );
}
