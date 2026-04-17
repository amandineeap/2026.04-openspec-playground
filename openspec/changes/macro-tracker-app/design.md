## Context

Greenfield React application with no existing codebase. The app must work entirely offline, storing all user data in the browser. The recipe dataset is large (10k+ recipes) and must be searchable and filterable client-side without a backend. Users set daily macro targets and the app must match remaining budget to recipe macros in real time.

## Goals / Non-Goals

**Goals:**
- Offline-first, single-page React app (Vite + TypeScript)
- Daily macro target management and food/meal logging
- Client-side recipe suggestion engine matching remaining macro budget
- Progress visualisation with daily and weekly charts
- All data persisted locally (localStorage for settings/targets, IndexedDB via `idb` for logs and recipe index)
- Responsive design (mobile + desktop)

**Non-Goals:**
- User accounts, authentication, or cloud sync
- Social/sharing features
- Barcode scanning or external food database API calls
- Native mobile app (web only)
- Calorie counting from photos

## Decisions

### 1. Tech stack: Vite + React + TypeScript
Standard modern React setup. Vite for fast dev/build. TypeScript for safety around macro arithmetic and data models. No need for Next.js since there is no SSR or routing complexity that warrants it.

**Alternatives considered:** Create React App (deprecated), Next.js (overkill for a local-only SPA).

### 2. Local persistence: localStorage + IndexedDB (`idb`)
- `localStorage`: user settings and daily macro targets (small, synchronous, simple)
- `IndexedDB` via the `idb` wrapper: food logs (keyed by date) and recipe index (keyed by recipe ID)

**Alternatives considered:** Dexie.js (heavier), PouchDB (CouchDB sync model unnecessary), plain localStorage for everything (size limits prevent storing 10k+ recipes).

### 3. Recipe dataset: static JSON bundled at build time
A public domain recipe dataset (e.g. USDA-derived or Open Food Facts recipes, ~10k entries) is shipped as a compressed JSON file. On first load the app indexes it into IndexedDB for fast querying. This avoids any network dependency after initial page load.

**Alternatives considered:** Fetching from an API (breaks offline requirement), SQLite via WASM (complex setup, overkill).

### 4. Recipe suggestion algorithm: macro budget matching with scoring
Given remaining macros for the day (target minus logged), recipes are scored by how well they fit:
- Filter: exclude recipes that exceed remaining budget by more than a configurable tolerance (default 20%)
- Score: minimise the Euclidean distance in macro-space between the recipe and remaining budget (normalised per nutrient)
- Return top N results sorted by score

**Alternatives considered:** Simple threshold filter (less nuanced), ML-based recommendations (massively over-engineered for local data).

### 5. Charting: Recharts
Recharts is React-native (composable components), well-maintained, and has good TypeScript support. Used for daily progress bars (macros vs target) and weekly trend line charts.

**Alternatives considered:** Chart.js with react-chartjs-2 (imperative API, less ergonomic in React), Victory (larger bundle), D3 directly (too low-level).

### 6. State management: React Context + useReducer
App state (today's logs, targets, selected date) managed with Context + useReducer. No need for Redux or Zustand at this scale. Persistence is handled by custom hooks that sync to IndexedDB/localStorage on state changes.

**Alternatives considered:** Zustand (reasonable, but adds a dependency for modest benefit), Redux (overkill).

### 7. Styling: Tailwind CSS
Utility-first CSS for rapid, responsive layout. Avoids writing custom CSS for every component. Works well with Vite.

**Alternatives considered:** CSS Modules (more verbose), styled-components (runtime overhead, not needed).

## Risks / Trade-offs

- **Large recipe JSON bundle size** → Compress with gzip (Vite plugin); lazy-load and index into IndexedDB on first visit so the main bundle stays small.
- **IndexedDB async on critical path** → Preload today's logs on app mount; show skeleton loaders while hydrating.
- **Macro data accuracy** → Dataset quality varies; document that values are estimates and allow manual entry overrides.
- **localStorage size limits (~5 MB)** → Only settings/targets go here. Logs and recipes in IndexedDB (no practical size cap).
- **No data backup** → User data lives only in the browser; clearing site data deletes everything. Future: export/import JSON as a mitigation.

## Migration Plan

No existing system to migrate. First deployment is a fresh static build (e.g. hosted on GitHub Pages or Netlify). On first app load:
1. Detect absence of IndexedDB schema → run migration v1 (create stores)
2. Load and index recipe dataset into IndexedDB
3. Subsequent loads skip indexing if version flag is set in localStorage

Rollback: redeploy previous build; IndexedDB schema versioning handles forward-only migrations.

## Open Questions

- Which specific public recipe dataset to use? (USDA, Open Food Facts subset, Kaggle recipe dataset) — needs licence check
- Should the app support multiple users/profiles on the same device? (Initial assumption: single user)
- Export/import of user data — defer to a follow-up change?
