# Fit Fuel

A high-protein, lactose-free meal planner built around a 12–8 intermittent fasting
window and a 4–7 PM gym block. It started as a static content page and grew into a
small full-featured React app: a filterable recipe library, a weekly meal-plan
calendar with live macro totals, a checkable shopping list, and a macro calculator —
all persisted client-side.

**Live demo:** https://anish0714.github.io/fit-fuel/

## Why this exists

Most meal-plan tools are either a static PDF or a full backend nobody needs for a
personal routine. This is the middle ground: a client-only React app that treats the
plan as real interactive state — recipes you can favorite and filter, a week you can
actually assign and see the macro impact of, a shopping list you check off on your
phone at the store — with nothing to persist server-side, because a `localStorage`
hook is all a single-user planner needs.

## Features

- **Recipe library** — air-fryer dinners and breakfast-bagel variations, searchable,
  filterable by protein type and by a "high fiber" tag, favoritable (persisted).
- **Meal plan** — assign a breakfast and dinner to each day of the week; each row
  computes its estimated protein and calories live, including the fixed protein bar
  and post-workout shake.
- **Shopping list** — the built-in list is checkable and persisted, grouped by
  category with real brand/store notes (FreshCo, Food Basics, or "actually buy this
  elsewhere"); a free-text section lets you add and remove your own items.
- **Supplement timing** — a table of what to take when, tied to which meal's fat
  content helps absorption.
- **Macro calculator** — pick any breakfast + dinner combination and see the day's
  total protein and calories update immediately.
- **Light/dark theme**, respecting system preference and remembering an explicit
  choice.

## Tech stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) for the dev server and build
- [React Router](https://reactrouter.com/) for client-side routing
- [Tailwind CSS v4](https://tailwindcss.com/) for styling, via the Vite/PostCSS plugin
- [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/react)
  for tests
- [oxlint](https://oxc.rs/docs/guide/usage/linter.html) for linting
- Deployed to GitHub Pages via GitHub Actions

## Getting started

```bash
npm install
npm run dev
```

Other scripts:

```bash
npm run lint     # oxlint
npm run test     # vitest
npm run build    # type-check + production build
npm run preview  # preview the production build locally
```

## Project structure

```
src/
  components/   Reusable UI: RecipeCard, FilterBar, Timeline, Layout, ThemeToggle
  pages/        One component per route
  data/         Recipes, schedule, supplements, and shopping content
  hooks/        useLocalStorage — the persistence primitive every page builds on
  types/        Shared TypeScript types
```

## Deployment

Every push to `main` builds and deploys to GitHub Pages via
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). Pull requests run
lint, test, and build via [`.github/workflows/ci.yml`](.github/workflows/ci.yml)
before anything merges.

## Disclaimer

All nutrition and supplement-timing content is a personal estimate, not medical or
dietary advice.
