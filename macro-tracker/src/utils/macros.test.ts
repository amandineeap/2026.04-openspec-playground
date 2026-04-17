import { describe, it, expect } from 'vitest'
import { sumMacros, getRemainingBudget } from './macros'
import type { FoodEntry, MacroTargets } from '../types'

function entry(overrides: Partial<FoodEntry> = {}): FoodEntry {
  return {
    id: '1',
    name: 'Test',
    servingSize: '1 serving',
    calories: 100,
    protein: 10,
    carbs: 10,
    fat: 5,
    createdAt: 0,
    ...overrides,
  }
}

describe('sumMacros', () => {
  it('returns zeros for empty entries', () => {
    expect(sumMacros([])).toEqual({ calories: 0, protein: 0, carbs: 0, fat: 0 })
  })

  it('sums multiple entries', () => {
    const entries = [entry(), entry({ calories: 200, protein: 20, carbs: 30, fat: 10 })]
    expect(sumMacros(entries)).toEqual({ calories: 300, protein: 30, carbs: 40, fat: 15 })
  })
})

describe('getRemainingBudget', () => {
  const targets: MacroTargets = { calories: 2000, protein: 150, carbs: 200, fat: 65 }

  it('returns full budget when nothing logged', () => {
    const totals = { calories: 0, protein: 0, carbs: 0, fat: 0 }
    expect(getRemainingBudget(targets, totals)).toEqual(targets)
  })

  it('returns correct remaining', () => {
    const totals = { calories: 500, protein: 50, carbs: 60, fat: 20 }
    expect(getRemainingBudget(targets, totals)).toEqual({ calories: 1500, protein: 100, carbs: 140, fat: 45 })
  })

  it('clamps to 0 when over target', () => {
    const totals = { calories: 2500, protein: 200, carbs: 250, fat: 80 }
    expect(getRemainingBudget(targets, totals)).toEqual({ calories: 0, protein: 0, carbs: 0, fat: 0 })
  })
})
