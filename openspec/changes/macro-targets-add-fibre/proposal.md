## Why

The current macro targets only track calories, protein, carbohydrates, and fat. Fibre is a key dietary metric and users need to set a daily fibre target alongside their other macros. Additionally, the macro split (protein, carbs, fat) should display as percentages totalling 100% so users can see how their targets are proportionally balanced.

## What Changes

- Add fibre (g) as a configurable daily macro target alongside protein, carbs, and fat
- Display protein/carbohydrates/fat/fibre targets as a gram-based percentage split that totals 100%
- Update the macro targets setup/edit form to include the fibre field
- Update progress views to show fibre tracking alongside other macros

## Capabilities

### New Capabilities

_(none)_

### Modified Capabilities

- `macro-targets`: Add fibre as a required target field; add percentage-split display showing protein/carbs/fat/fibre as % of total macro grams, enforcing 100% total

## Impact

- `MacroTargets` type gains a `fibre` field (grams)
- Macro targets form updated to include fibre input
- Percentage calculation logic added (protein_g / carbs_g / fat_g / fibre_g ÷ total macro grams × 100)
- Progress/dashboard views updated to display fibre progress
- Local storage schema updated; existing stored targets without fibre default to 0
