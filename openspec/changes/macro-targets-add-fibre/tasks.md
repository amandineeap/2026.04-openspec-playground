## 1. Types & Data Model

- [x] 1.1 Add `fibre: number` to the `MacroTargets` interface in `src/types/index.ts`
- [x] 1.2 Add `fibre: number` to the `MacroValues` interface in `src/types/index.ts`

## 2. Storage & Migration

- [x] 2.1 Update `src/store/localStorage.ts` load logic to default `fibre: 0` when loading stored targets that lack a fibre field
- [x] 2.2 Update `src/store/MacroTargetsContext.tsx` default/initial state to include `fibre: 0`

## 3. Macro Targets Form

- [x] 3.1 Add a fibre (g) input field to `src/components/MacroTargetsForm.tsx`
- [x] 3.2 Ensure the form saves fibre value alongside other targets

## 4. Percentage Split Display

- [x] 4.1 Add a `getMacroPercentageSplit` utility in `src/utils/macros.ts` that computes protein/carbs/fat/fibre % of total macro grams (gram-based, not calorie-based), normalised to sum exactly to 100 (handle all-zero edge case: return 25/25/25/25)
- [x] 4.2 Display the percentage split (e.g. "Protein 30% / Carbs 40% / Fat 20% / Fibre 10%") in the macro targets summary view (Settings page or wherever targets are shown)

## 5. Progress Views

- [x] 5.1 Add a fibre progress bar to `src/components/DailyProgressBars.tsx` (consumed vs. target in grams)
- [x] 5.2 Verify fibre shows 0 consumed (since food entries don't carry fibre yet) with the correct target

## 6. Tests

- [x] 6.1 Add unit tests for `getMacroPercentageSplit` in `src/utils/macros.test.ts` covering: normal 4-macro split, single macro non-zero, all-zero edge case (25/25/25/25), and rounding summing to exactly 100
