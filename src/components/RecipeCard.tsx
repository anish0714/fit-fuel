import { Heart, Leaf } from "lucide-react";
import type { Recipe } from "../types";
import Badge from "./Badge";

interface Props {
  recipe: Recipe;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export default function RecipeCard({ recipe, isFavorite, onToggleFavorite }: Props) {
  return (
    <article className="flex flex-col gap-3.5 rounded-2xl border border-line bg-canvas-subtle p-5 shadow-sm">
      <header className="flex items-start justify-between gap-2">
        <h3 className="font-display text-lg leading-snug font-semibold text-balance">{recipe.name}</h3>
        <div className="flex shrink-0 items-center gap-1.5">
          {recipe.fiberFocus && (
            <span
              title="Extra fiber from spring mix or spinach"
              className="rounded-full bg-accent-muted p-1 text-accent-emphasis"
            >
              <Leaf size={13} />
            </span>
          )}
          {recipe.protein && <Badge protein={recipe.protein} />}
          <button
            type="button"
            onClick={() => onToggleFavorite(recipe.id)}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            aria-pressed={isFavorite}
            className="rounded-md p-1 text-fg-subtle transition-colors hover:text-danger"
          >
            <Heart size={17} fill={isFavorite ? "currentColor" : "none"} className={isFavorite ? "text-danger" : ""} />
          </button>
        </div>
      </header>

      <div>
        <h4 className="mb-1.5 text-xs font-bold tracking-wide text-fg-muted uppercase">Ingredients</h4>
        <ul className="list-disc space-y-0.5 pl-4 text-sm leading-relaxed text-fg">
          {recipe.ingredients.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="mb-1.5 text-xs font-bold tracking-wide text-fg-muted uppercase">Method</h4>
        <ol className="list-decimal space-y-0.5 pl-4 text-sm leading-relaxed text-fg">
          {recipe.method.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ol>
      </div>

      {recipe.settings && (
        <p className="rounded-lg bg-canvas-inset px-3 py-2 font-mono text-[13px] text-fg">{recipe.settings}</p>
      )}

      <div className="mt-auto flex gap-5 border-t border-line pt-3">
        <div className="font-mono">
          <div className="text-lg font-semibold">{recipe.macros.protein}g</div>
          <div className="text-[11px] tracking-wide text-fg-muted uppercase">protein</div>
        </div>
        <div className="font-mono">
          <div className="text-lg font-semibold">{recipe.macros.kcal}</div>
          <div className="text-[11px] tracking-wide text-fg-muted uppercase">kcal</div>
        </div>
      </div>
    </article>
  );
}
