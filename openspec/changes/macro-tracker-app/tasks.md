## 1. Project Setup

- [ ] 1.1 Scaffold Vite + React + TypeScript project
- [ ] 1.2 Install dependencies: `idb`, `recharts`, `tailwindcss`, and configure Tailwind
- [ ] 1.3 Set up project folder structure (components, hooks, store, data, types)
- [ ] 1.4 Define core TypeScript types: `MacroTargets`, `FoodEntry`, `DayLog`, `Recipe`
- [ ] 1.5 Configure Vite build with gzip compression plugin for recipe JSON

## 2. Local Persistence Layer

- [ ] 2.1 Create IndexedDB schema and initialisation logic using `idb` (stores: `logs`, `recipes`, `meta`)
- [ ] 2.2 Implement `localStorage` helpers for reading/writing macro targets and app settings
- [ ] 2.3 Write `usePersistence` hook that exposes save/load for food logs keyed by date
- [ ] 2.4 Implement version flag check to detect whether recipe indexing has been performed

## 3. Recipe Dataset

- [ ] 3.1 Source or download a public recipe dataset with macro values (min 10k recipes, confirm licence)
- [ ] 3.2 Normalise and convert dataset to a compact JSON format matching the `Recipe` type
- [ ] 3.3 Implement first-visit indexing: load JSON, iterate, and write recipes to IndexedDB
- [ ] 3.4 Set version flag in localStorage after successful indexing

## 4. Macro Targets

- [ ] 4.1 Build `MacroTargetsForm` component for entering/editing daily targets
- [ ] 4.2 Implement first-time setup flow: show targets form if no saved targets exist
- [ ] 4.3 Persist targets to localStorage on save and load on app mount
- [ ] 4.4 Expose current targets via React Context so all components can access them

## 5. Food Logging

- [ ] 5.1 Build `AddFoodEntryForm` component with fields for name, serving size, calories, protein, carbs, fat
- [ ] 5.2 Add form validation: all macro fields required, no negative values
- [ ] 5.3 Implement save entry action: append to selected date's log in IndexedDB
- [ ] 5.4 Build `FoodLogList` component displaying entries for the selected date with delete buttons
- [ ] 5.5 Implement delete entry action: remove from IndexedDB and refresh totals
- [ ] 5.6 Calculate and expose daily totals (sum of all entries for selected date) reactively

## 6. Progress Visualisation

- [ ] 6.1 Build `DailyProgressBars` component: four progress bars (calories, protein, carbs, fat) vs targets
- [ ] 6.2 Style over-target state with distinct colour / overflow indicator
- [ ] 6.3 Build `WeeklyTrendChart` component using Recharts line chart showing 7-day macro totals
- [ ] 6.4 Handle empty-state for weekly chart when no data exists in the past 7 days
- [ ] 6.5 Build date navigation control (prev/next day buttons + date picker) and wire to selected date state

## 7. Recipe Suggestions

- [ ] 7.1 Implement `getRemainingBudget` utility: targets minus daily totals per macro
- [ ] 7.2 Implement recipe scoring function: filter recipes exceeding budget by >20%, score remainder by normalised Euclidean distance in macro-space
- [ ] 7.3 Build `RecipeSuggestions` component: display top 10 ranked recipes for current remaining budget
- [ ] 7.4 Show "targets reached" empty state when all macros are at or above target
- [ ] 7.5 Re-run suggestions automatically when food log changes (reactive dependency on daily totals)
- [ ] 7.6 Add "Add to log" button on each suggestion that pre-fills `AddFoodEntryForm` with recipe macros

## 8. Recipe Browser

- [ ] 8.1 Build `RecipeBrowser` component with debounced search input querying IndexedDB by name
- [ ] 8.2 Implement virtualized or paginated recipe list (handle 10k+ items without DOM overflow)
- [ ] 8.3 Build `RecipeDetailCard` showing name, serving size, and full macro breakdown
- [ ] 8.4 Add "Add to log" button in `RecipeDetailCard` wired to food logging
- [ ] 8.5 Verify search response time is under 300 ms on typical result sets

## 9. App Shell & Navigation

- [ ] 9.1 Build responsive app shell with bottom tab navigation (Dashboard, Log, Recipes, Settings)
- [ ] 9.2 Wire up routing between Dashboard, Food Log, Recipe Browser, and Settings pages
- [ ] 9.3 Add Settings page exposing macro targets form and any future preferences
- [ ] 9.4 Ensure layout is usable on mobile (375 px) and desktop (1280 px+)

## 10. Polish & QA

- [ ] 10.1 Add skeleton loaders for IndexedDB async operations on app mount
- [ ] 10.2 Test offline functionality: disable network and verify all features work
- [ ] 10.3 Verify data persists across page reload and browser restart
- [ ] 10.4 Run Lighthouse audit and resolve any accessibility or performance issues
- [ ] 10.5 Write basic unit tests for scoring algorithm and daily totals calculation
