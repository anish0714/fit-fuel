import { Search } from "lucide-react";
import type { ProteinType } from "../types";

const PROTEINS: (ProteinType | "all")[] = ["all", "tofu", "chicken", "fish", "chickpea"];

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  protein: ProteinType | "all";
  onProteinChange: (value: ProteinType | "all") => void;
  fiberOnly: boolean;
  onFiberOnlyChange: (value: boolean) => void;
  favoritesOnly: boolean;
  onFavoritesOnlyChange: (value: boolean) => void;
  showProteinFilter?: boolean;
  showFiberFilter?: boolean;
}

export default function FilterBar({
  search,
  onSearchChange,
  protein,
  onProteinChange,
  fiberOnly,
  onFiberOnlyChange,
  favoritesOnly,
  onFavoritesOnlyChange,
  showProteinFilter = true,
  showFiberFilter = true,
}: Props) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:max-w-xs">
        <Search size={16} className="absolute top-1/2 left-3 -translate-y-1/2 text-fg-subtle" />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search recipes…"
          className="w-full rounded-full border border-line bg-canvas-subtle py-2 pr-4 pl-9 text-sm outline-none placeholder:text-fg-subtle focus:border-accent"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {showProteinFilter && (
          <div className="flex overflow-hidden rounded-full border border-line">
            {PROTEINS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => onProteinChange(p)}
                className={`px-3 py-1.5 text-xs font-semibold capitalize transition-colors ${
                  protein === p ? "bg-accent text-canvas" : "bg-canvas-subtle text-fg-muted hover:text-fg"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}

        {showFiberFilter && (
          <button
            type="button"
            onClick={() => onFiberOnlyChange(!fiberOnly)}
            aria-pressed={fiberOnly}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
              fiberOnly ? "border-accent bg-accent-muted text-accent-emphasis" : "border-line text-fg-muted hover:text-fg"
            }`}
          >
            High fiber
          </button>
        )}

        <button
          type="button"
          onClick={() => onFavoritesOnlyChange(!favoritesOnly)}
          aria-pressed={favoritesOnly}
          className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
            favoritesOnly ? "border-danger bg-danger/10 text-danger" : "border-line text-fg-muted hover:text-fg"
          }`}
        >
          Favorites
        </button>
      </div>
    </div>
  );
}
