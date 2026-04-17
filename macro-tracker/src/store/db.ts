import { openDB, type IDBPDatabase } from 'idb'
import type { FoodEntry, Recipe } from '../types'

const DB_NAME = 'macro-tracker'
const DB_VERSION = 1

export interface MacroTrackerDB {
  logs: {
    key: string // date YYYY-MM-DD
    value: { date: string; entries: FoodEntry[] }
  }
  recipes: {
    key: string // recipe id
    value: Recipe
    indexes: { 'by-name': string }
  }
  meta: {
    key: string
    value: { key: string; value: string }
  }
}

let dbPromise: Promise<IDBPDatabase<MacroTrackerDB>> | null = null

export function getDB() {
  if (!dbPromise) {
    dbPromise = openDB<MacroTrackerDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('logs')) {
          db.createObjectStore('logs', { keyPath: 'date' })
        }
        if (!db.objectStoreNames.contains('recipes')) {
          const recipeStore = db.createObjectStore('recipes', { keyPath: 'id' })
          recipeStore.createIndex('by-name', 'name')
        }
        if (!db.objectStoreNames.contains('meta')) {
          db.createObjectStore('meta', { keyPath: 'key' })
        }
      },
    })
  }
  return dbPromise
}
