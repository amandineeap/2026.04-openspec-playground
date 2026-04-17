import type { MacroValues, Recipe } from '../types'

const TOLERANCE = 0.2

export function scoreRecipes(recipes: Recipe[], budget: MacroValues, topN = 10): Recipe[] {
  const keys: (keyof MacroValues)[] = ['calories', 'protein', 'carbs', 'fat']

  const budgetExhausted = keys.every((k) => budget[k] <= 0)
  if (budgetExhausted) return []

  const filtered = recipes.filter((r) =>
    keys.every((k) => {
      if (budget[k] <= 0) return true
      return r[k] <= budget[k] * (1 + TOLERANCE)
    })
  )

  const scored = filtered.map((r) => {
    const dist = keys.reduce((sum, k) => {
      const norm = budget[k] > 0 ? (r[k] - budget[k]) / budget[k] : 0
      return sum + norm * norm
    }, 0)
    return { recipe: r, score: dist }
  })

  scored.sort((a, b) => a.score - b.score)
  return scored.slice(0, topN).map((s) => s.recipe)
}
