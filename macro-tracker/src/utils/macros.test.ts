import { describe, it, expect } from 'vitest'
import { sumMacros, getRemainingBudget, getMacroPercentageSplit } from './macros'
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
    expect(sumMacros([])).toEqual({ calories: 0, protein: 0, carbs: 0, fat: 0, fibre: 0 })
  })

  it('sums multiple entries', () => {
    const entries = [entry(), entry({ calories: 200, protein: 20, carbs: 30, fat: 10 })]
    expect(sumMacros(entries)).toEqual({ calories: 300, protein: 30, carbs: 40, fat: 15, fibre: 0 })
  })
})

describe('getRemainingBudget', () => {
  const targets: MacroTargets = { calories: 2000, protein: 150, carbs: 200, fat: 65, fibre: 30 }

  it('returns full budget when nothing logged', () => {
    const totals = { calories: 0, protein: 0, carbs: 0, fat: 0, fibre: 0 }
    expect(getRemainingBudget(targets, totals)).toEqual(targets)
  })

  it('returns correct remaining', () => {
    const totals = { calories: 500, protein: 50, carbs: 60, fat: 20, fibre: 10 }
    expect(getRemainingBudget(targets, totals)).toEqual({ calories: 1500, protein: 100, carbs: 140, fat: 45, fibre: 20 })
  })

  it('clamps to 0 when over target', () => {
    const totals = { calories: 2500, protein: 200, carbs: 250, fat: 80, fibre: 40 }
    expect(getRemainingBudget(targets, totals)).toEqual({ calories: 0, protein: 0, carbs: 0, fat: 0, fibre: 0 })
  })
})

describe('getMacroPercentageSplit', () => {
  it('returns 25/25/25/25 when all targets are zero', () => {
    expect(getMacroPercentageSplit({ protein: 0, carbs: 0, fat: 0, fibre: 0 }))
      .toEqual({ protein: 25, carbs: 25, fat: 25, fibre: 25 })
  })

  it('returns 100% for single non-zero macro', () => {
    expect(getMacroPercentageSplit({ protein: 100, carbs: 0, fat: 0, fibre: 0 }))
      .toEqual({ protein: 100, carbs: 0, fat: 0, fibre: 0 })
  })

  it('computes correct gram-based split and always sums to 100', () => {
    const result = getMacroPercentageSplit({ protein: 50, carbs: 100, fat: 25, fibre: 25 })
    expect(result.protein + result.carbs + result.fat + result.fibre).toBe(100)
    // protein=25%, carbs≈50%, fat≈12-13%, fibre≈12-13% (rounding may vary by 1)
    expect(result.protein).toBe(25)
    expect(result.carbs).toBeGreaterThanOrEqual(49)
    expect(result.carbs).toBeLessThanOrEqual(50)
  })

  it('always sums to exactly 100', () => {
    // Values that cause rounding issues
    const result = getMacroPercentageSplit({ protein: 33, carbs: 33, fat: 33, fibre: 1 })
    expect(result.protein + result.carbs + result.fat + result.fibre).toBe(100)
  })
})
