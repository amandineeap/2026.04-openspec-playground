import { describe, it, expect } from 'vitest'
import { scoreRecipes } from './recipeScoring'
import type { Recipe, MacroValues } from '../types'

function recipe(id: string, macros: Partial<Recipe> = {}): Recipe {
  return { id, name: `Recipe ${id}`, servingSize: '1 serving', calories: 400, protein: 30, carbs: 40, fat: 15, ...macros }
}

describe('scoreRecipes', () => {
  it('returns empty array when budget is exhausted', () => {
    const budget: MacroValues = { calories: 0, protein: 0, carbs: 0, fat: 0 }
    expect(scoreRecipes([recipe('1')], budget)).toEqual([])
  })

  it('filters recipes exceeding budget by more than 20%', () => {
    const budget: MacroValues = { calories: 300, protein: 25, carbs: 30, fat: 10 }
    const over = recipe('over', { calories: 500 })
    const fits = recipe('fits', { calories: 300, protein: 25, carbs: 30, fat: 10 })
    const result = scoreRecipes([over, fits], budget)
    expect(result.map((r) => r.id)).not.toContain('over')
    expect(result.map((r) => r.id)).toContain('fits')
  })

  it('returns recipes sorted by closeness to budget', () => {
    const budget: MacroValues = { calories: 400, protein: 30, carbs: 40, fat: 15 }
    const exact = recipe('exact', { calories: 400, protein: 30, carbs: 40, fat: 15 })
    const close = recipe('close', { calories: 350, protein: 25, carbs: 35, fat: 12 })
    const result = scoreRecipes([close, exact], budget)
    expect(result[0].id).toBe('exact')
  })

  it('limits results to topN', () => {
    const budget: MacroValues = { calories: 1000, protein: 100, carbs: 100, fat: 50 }
    const recipes = Array.from({ length: 20 }, (_, i) => recipe(String(i)))
    expect(scoreRecipes(recipes, budget, 5)).toHaveLength(5)
  })
})
