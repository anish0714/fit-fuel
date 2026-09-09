import { useMemo, useState } from "react";
import FilterBar from "../components/FilterBar";
import RecipeCard from "../components/RecipeCard";
import { RECIPES } from "../data/recipes";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { ProteinType, RecipeCategory } from "../types";

const TABS: { id: RecipeCategory; label: string }[] = [
  { id: "dinner", label: "Dinners" },
  { id: "breakfast", label: "12:00 PM Rotation" },
];

export default function Recipes() {
  const [favorites, setFavorites] = useLocalStorage<string[]>("ff:favorites", []);
  const [category, setCategory] = useState<RecipeCategory>("dinner");
  const [search, setSearch] = useState("");
  const [protein, setProtein] = useState<ProteinType | "all">("all");
  const [fiberOnly, setFiberOnly] = useState(false);
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  function toggleFavorite(id: string) {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  }

  const filtered = useMemo(() => {
    return RECIPES.filter((recipe) => {
      if (recipe.category !== category) return false;
      if (search && !recipe.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (protein !== "all" && recipe.protein !== protein) return false;
      if (fiberOnly && !recipe.fiberFocus) return false;
      if (favoritesOnly && !favorites.includes(recipe.id)) return false;
      return true;
    });
  }, [category, search, protein, fiberOnly, favoritesOnly, favorites]);

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Recipes</h1>
      <p className="mt-2 mb-6 max-w-2xl text-fg-muted">
        {category === "dinner"
          ? "Air-fryer dinners built from tofu, fish, chicken, and chickpeas. The fiber-tagged ones fold in spring mix, spinach, or a full can of chickpeas."
          : "Four ways to start the eating window — three egg-and-bagel spins and one oats bowl for a change of pace."}
      </p>

      <div className="mb-6 flex gap-1 rounded-full border border-line bg-canvas-subtle p-1 w-fit">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setCategory(tab.id)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              category === tab.id ? "bg-accent text-canvas" : "text-fg-muted hover:text-fg"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <FilterBar
        search={search}
        onSearchChange={setSearch}
        protein={protein}
        onProteinChange={setProtein}
        fiberOnly={fiberOnly}
        onFiberOnlyChange={setFiberOnly}
        favoritesOnly={favoritesOnly}
        onFavoritesOnlyChange={setFavoritesOnly}
        showProteinFilter={category === "dinner"}
        showFiberFilter={category === "dinner"}
      />

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-dashed border-line py-12 text-center text-sm text-fg-muted">
          No recipes match those filters.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isFavorite={favorites.includes(recipe.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}
