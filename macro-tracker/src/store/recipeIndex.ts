import { getDB } from './db'
import { isRecipeIndexed, markRecipeIndexed } from './localStorage'
import type { Recipe } from '../types'

export async function ensureRecipesIndexed(): Promise<void> {
  if (isRecipeIndexed()) return

  const { default: rawRecipes } = await import('../data/recipes.json')
  const db = await getDB()
  const tx = db.transaction('recipes', 'readwrite')
  for (const recipe of rawRecipes as Recipe[]) {
    await tx.store.put(recipe)
  }
  await tx.done
  markRecipeIndexed()
}

export async function searchRecipes(query: string, limit = 50): Promise<Recipe[]> {
  const db = await getDB()
  const all = await db.getAll('recipes')
  if (!query.trim()) return all.slice(0, limit)
  const lower = query.toLowerCase()
  return all.filter((r) => r.name.toLowerCase().includes(lower)).slice(0, limit)
}

export async function getAllRecipes(): Promise<Recipe[]> {
  const db = await getDB()
  return db.getAll('recipes')
}
