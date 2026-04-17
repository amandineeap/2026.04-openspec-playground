## Context

The app currently tracks calories, protein, carbohydrates, and fat as daily macro targets. The `MacroTargets` and `MacroValues` interfaces in `src/types/index.ts` define the data shape. Targets are persisted to localStorage via the store. The macro targets form and progress views only show these four fields.

Fibre does not contribute calories in the standard nutritional model used in most countries (EU/AU: 0 kcal/g; US: 2 kcal/g) — for simplicity we treat fibre as 0 kcal, meaning it is tracked in grams only and excluded from the calorie-contributing macro percentage split.

## Goals / Non-Goals

**Goals:**
- Add `fibre` (g) to `MacroTargets` and `MacroValues` types
- Show fibre progress in all views that display macro progress
- Display protein/carbs/fat as a percentage split (summing to 100%) based on their calorie contributions (protein 4 kcal/g, carbs 4 kcal/g, fat 9 kcal/g)
- Gracefully migrate existing localStorage data (missing `fibre` defaults to `0`)

**Non-Goals:**
- Per-day fibre targets
- Counting fibre calories (treat as 0 kcal)
- Changing how food entries are logged (fibre is a target-level metric only for now)

## Decisions

### 1. Fibre is target-only, not per-food-entry
Fibre is added to `MacroTargets` but NOT to `FoodEntry` or `Recipe`. The percentage display and fibre progress bar will be based on the target vs. the sum of fibre across food entries — but since food entries don't carry fibre data, fibre progress will always show 0 consumed until food logging adds fibre support in a future change.

**Alternative considered:** Add fibre to `FoodEntry` now. Rejected — scope creep; food logging UI changes are a separate concern. Note: fibre progress will show 0 consumed until food logging adds fibre support.

### 2. Percentage split includes fibre, uses gram-based calculation
The protein/carbs/fat/fibre % split is computed from grams: `macro_g / (protein_g + carbs_g + fat_g + fibre_g) × 100`. Using grams (not calories) is the only way to include fibre meaningfully, since fibre contributes 0 kcal in the EU/AU model. The four values are normalised to always sum exactly to 100% (handle edge case: if all are 0, show 25/25/25/25).

### 3. localStorage migration via default
When loading targets from localStorage, spread stored value and default `fibre` to `0` if absent. No versioning needed — the field is purely additive.

## Risks / Trade-offs

- **Fibre always shows 0 consumed** → Acceptable for now; a future food-logging update will add per-entry fibre. The UI should make clear fibre tracking is limited until then.
- **Percentage rounding** → Use `Math.round` and adjust the largest value to absorb rounding error so sum is exactly 100.
- **Gram-based split may surprise users** → A high-fat diet (fat is calorie-dense) will appear smaller in the gram split than a calorie split. This is the accepted trade-off for including fibre.

## Migration Plan

1. Update types (`MacroTargets`, `MacroValues`)
2. Update store load logic to default `fibre: 0` when absent
3. Update macro targets form to include fibre input
4. Update progress/dashboard components to render fibre bar
5. Add percentage split display to macro targets summary
6. No server-side migration needed (localStorage only)
