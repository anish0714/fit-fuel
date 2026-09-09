import { Salad } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { GitHubIcon } from "./icons";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  { to: "/", label: "Overview", end: true },
  { to: "/recipes", label: "Recipes", end: false },
  { to: "/meal-plan", label: "Meal Plan", end: false },
  { to: "/shopping-list", label: "Shopping List", end: false },
  { to: "/supplements", label: "Supplements", end: false },
  { to: "/macros", label: "Macros", end: false },
];

export default function Layout() {
  return (
    <div className="min-h-dvh bg-canvas text-fg">
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-2 font-display text-lg font-semibold">
            <Salad size={20} className="text-accent" />
            Fit Fuel
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/anish0714/fit-fuel"
              target="_blank"
              rel="noreferrer"
              aria-label="View source on GitHub"
              className="rounded-md p-1.5 text-fg-muted transition-colors hover:bg-canvas-subtle hover:text-fg"
            >
              <GitHubIcon size={18} />
            </a>
            <ThemeToggle />
          </div>
        </div>
        <nav className="mx-auto max-w-5xl overflow-x-auto px-6">
          <div className="flex gap-1">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `border-b-2 px-3 py-3 text-sm font-semibold whitespace-nowrap transition-colors ${
                    isActive
                      ? "border-accent text-accent-emphasis"
                      : "border-transparent text-fg-muted hover:text-fg"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">
        <Outlet />
      </main>
      <footer className="border-t border-line py-6 text-center text-xs text-fg-subtle">
        Estimates only — not medical or nutritional advice.
      </footer>
    </div>
  );
}
