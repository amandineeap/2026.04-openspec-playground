import { useEffect, useState } from 'react'
import { getAllRecipes } from '../store/recipeIndex'
import { scoreRecipes } from '../utils/recipeScoring'
import { getRemainingBudget } from '../utils/macros'
import type { MacroTargets, MacroValues, Recipe, FoodEntry } from '../types'

interface Props {
  targets: MacroTargets
  totals: MacroValues
  onAddToLog: (entry: Omit<FoodEntry, 'id' | 'createdAt'>) => void
}

export function RecipeSuggestions({ targets, totals, onAddToLog }: Props) {
  const [suggestions, setSuggestions] = useState<Recipe[]>([])
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([])
  const [budgetExhausted, setBudgetExhausted] = useState(false)

  useEffect(() => {
    getAllRecipes().then(setAllRecipes)
  }, [])

  useEffect(() => {
    const budget = getRemainingBudget(targets, totals)
    const keys: (keyof MacroValues)[] = ['calories', 'protein', 'carbs', 'fat']
    const exhausted = keys.every((k) => budget[k] <= 0)
    setBudgetExhausted(exhausted)
    if (!exhausted) {
      setSuggestions(scoreRecipes(allRecipes, budget))
    } else {
      setSuggestions([])
    }
  }, [targets, totals, allRecipes])

  if (budgetExhausted) {
    return (
      <div className="text-center py-6 text-emerald-600 font-medium">
        🎉 Targets reached for today! Great work.
      </div>
    )
  }

  if (suggestions.length === 0) {
    return (
      <p className="text-gray-400 text-sm text-center py-4">
        Loading suggestions…
      </p>
    )
  }

  return (
    <ul className="space-y-2">
      {suggestions.map((recipe) => (
        <li
          key={recipe.id}
          className="flex items-start justify-between bg-gray-50 rounded-lg px-3 py-2"
        >
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm text-gray-800 truncate">{recipe.name}</p>
            <p className="text-xs text-gray-500">{recipe.servingSize}</p>
            <div className="flex gap-3 mt-1 text-xs text-gray-500">
              <span>{recipe.calories} kcal</span>
              <span>P {recipe.protein}g</span>
              <span>C {recipe.carbs}g</span>
              <span>F {recipe.fat}g</span>
            </div>
          </div>
          <button
            onClick={() =>
              onAddToLog({
                name: recipe.name,
                servingSize: recipe.servingSize,
                calories: recipe.calories,
                protein: recipe.protein,
                carbs: recipe.carbs,
                fat: recipe.fat,
              })
            }
            className="ml-2 text-xs bg-emerald-500 hover:bg-emerald-600 text-white px-2 py-1 rounded-md transition-colors whitespace-nowrap"
          >
            + Log
          </button>
        </li>
      ))}
    </ul>
  )
}
