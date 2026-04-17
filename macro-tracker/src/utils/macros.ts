import type { FoodEntry, MacroTargets, MacroValues } from '../types'

export function sumMacros(entries: FoodEntry[]): MacroValues {
  return entries.reduce(
    (acc, e) => ({
      calories: acc.calories + e.calories,
      protein: acc.protein + e.protein,
      carbs: acc.carbs + e.carbs,
      fat: acc.fat + e.fat,
      fibre: 0,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0, fibre: 0 }
  )
}

export interface MacroPercentageSplit {
  protein: number
  carbs: number
  fat: number
  fibre: number
}

export function getMacroPercentageSplit(targets: Pick<MacroTargets, 'protein' | 'carbs' | 'fat' | 'fibre'>): MacroPercentageSplit {
  const { protein, carbs, fat, fibre } = targets
  const total = protein + carbs + fat + fibre

  if (total === 0) return { protein: 25, carbs: 25, fat: 25, fibre: 25 }

  const raw = {
    protein: Math.round((protein / total) * 100),
    carbs: Math.round((carbs / total) * 100),
    fat: Math.round((fat / total) * 100),
    fibre: Math.round((fibre / total) * 100),
  }

  // Absorb rounding error into the largest value
  const sum = raw.protein + raw.carbs + raw.fat + raw.fibre
  const diff = 100 - sum
  if (diff !== 0) {
    const largest = (Object.keys(raw) as (keyof typeof raw)[]).reduce((a, b) => raw[a] >= raw[b] ? a : b)
    raw[largest] += diff
  }

  return raw
}

export function getRemainingBudget(targets: MacroTargets, totals: MacroValues): MacroValues {
  return {
    calories: Math.max(0, targets.calories - totals.calories),
    protein: Math.max(0, targets.protein - totals.protein),
    carbs: Math.max(0, targets.carbs - totals.carbs),
    fat: Math.max(0, targets.fat - totals.fat),
    fibre: Math.max(0, targets.fibre - totals.fibre),
  }
}
