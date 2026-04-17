export interface MacroTargets {
  calories: number
  protein: number
  carbs: number
  fat: number
}

export interface MacroValues {
  calories: number
  protein: number
  carbs: number
  fat: number
}

export interface FoodEntry {
  id: string
  name: string
  servingSize: string
  calories: number
  protein: number
  carbs: number
  fat: number
  createdAt: number
}

export interface DayLog {
  date: string // ISO date string YYYY-MM-DD
  entries: FoodEntry[]
}

export interface Recipe {
  id: string
  name: string
  servingSize: string
  calories: number
  protein: number
  carbs: number
  fat: number
}
