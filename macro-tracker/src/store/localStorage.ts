import type { MacroTargets } from '../types'

const TARGETS_KEY = 'macro-targets'
const RECIPE_INDEX_VERSION_KEY = 'recipe-index-version'
const CURRENT_RECIPE_VERSION = '1'

export function getStoredTargets(): MacroTargets | null {
  try {
    const raw = localStorage.getItem(TARGETS_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<MacroTargets>
    return { fibre: 0, ...parsed } as MacroTargets
  } catch {
    return null
  }
}

export function saveTargets(targets: MacroTargets): void {
  localStorage.setItem(TARGETS_KEY, JSON.stringify(targets))
}

export function isRecipeIndexed(): boolean {
  return localStorage.getItem(RECIPE_INDEX_VERSION_KEY) === CURRENT_RECIPE_VERSION
}

export function markRecipeIndexed(): void {
  localStorage.setItem(RECIPE_INDEX_VERSION_KEY, CURRENT_RECIPE_VERSION)
}
