## Why

Users who track macronutrients (protein, carbs, fat, calories) lack a simple, offline-first tool that both logs daily intake and actively suggests meals from a large recipe library to hit their daily targets. Existing solutions are either cloud-dependent, paywalled, or don't offer intelligent recipe matching against personal goals.

## What Changes

- New React web application with local-first data persistence (localStorage / IndexedDB)
- Daily macro target configuration per user
- Food/meal logging with macro breakdown
- Progress visualisation dashboard (daily, weekly, trend charts)
- Recipe suggestion engine that filters a large recipe dataset against remaining daily macro budget
- Recipe browsing and search with macro details

## Capabilities

### New Capabilities

- `macro-targets`: User-defined daily macronutrient targets (calories, protein, carbs, fat)
- `food-logging`: Log meals and individual food items with macro values for a given day
- `progress-visualisation`: Charts and summaries showing macro intake vs targets over time
- `recipe-suggestions`: Suggest recipes from a large dataset that fit remaining macro budget for the day
- `recipe-browser`: Browse, search, and view detailed macro info for recipes
- `local-persistence`: All user data (logs, targets, settings) saved and persisted locally in the browser

### Modified Capabilities

## Impact

- New standalone React application (Vite + TypeScript)
- No backend required; all data stored in browser (localStorage or IndexedDB via a wrapper like `idb`)
- Recipe dataset ingested as a static JSON file or indexed client-side (e.g. 10k+ recipes from a public dataset)
- Charting library required (e.g. Recharts or Chart.js)
- No breaking changes to any existing system (greenfield app)
