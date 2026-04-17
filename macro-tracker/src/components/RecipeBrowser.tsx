import { useState, useEffect, useCallback, useRef } from 'react'
import { searchRecipes } from '../store/recipeIndex'
import { RecipeDetailCard } from './RecipeDetailCard'
import type { Recipe, FoodEntry } from '../types'

const PAGE_SIZE = 30

interface Props {
  onAddToLog: (entry: Omit<FoodEntry, 'id' | 'createdAt'>) => void
}

export function RecipeBrowser({ onAddToLog }: Props) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Recipe[]>([])
  const [selected, setSelected] = useState<Recipe | null>(null)
  const [page, setPage] = useState(1)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const runSearch = useCallback((q: string) => {
    searchRecipes(q, 200).then((r) => {
      setResults(r)
      setPage(1)
    })
  }, [])

  useEffect(() => {
    runSearch('')
  }, [runSearch])

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const q = e.target.value
    setQuery(q)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => runSearch(q), 150)
  }

  const visible = results.slice(0, page * PAGE_SIZE)
  const hasMore = results.length > visible.length

  return (
    <div>
      <input
        type="search"
        placeholder="Search recipes…"
        value={query}
        onChange={handleSearch}
        className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-3"
      />
      <p className="text-xs text-gray-400 mb-2">{results.length} recipes</p>
      <ul className="space-y-2">
        {visible.map((recipe) => (
          <li
            key={recipe.id}
            className="flex items-start justify-between bg-gray-50 hover:bg-gray-100 rounded-lg px-3 py-2 cursor-pointer transition-colors"
            onClick={() => setSelected(recipe)}
          >
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm text-gray-800 truncate">{recipe.name}</p>
              <div className="flex gap-3 mt-0.5 text-xs text-gray-500">
                <span>{recipe.calories} kcal</span>
                <span>P {recipe.protein}g</span>
                <span>C {recipe.carbs}g</span>
                <span>F {recipe.fat}g</span>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onAddToLog({
                  name: recipe.name,
                  servingSize: recipe.servingSize,
                  calories: recipe.calories,
                  protein: recipe.protein,
                  carbs: recipe.carbs,
                  fat: recipe.fat,
                })
              }}
              className="ml-2 text-xs bg-emerald-500 hover:bg-emerald-600 text-white px-2 py-1 rounded-md transition-colors whitespace-nowrap"
            >
              + Log
            </button>
          </li>
        ))}
      </ul>
      {hasMore && (
        <button
          onClick={() => setPage((p) => p + 1)}
          className="w-full mt-3 text-sm text-emerald-600 hover:text-emerald-700 py-2"
        >
          Load more ({results.length - visible.length} remaining)
        </button>
      )}
      {selected && (
        <RecipeDetailCard
          recipe={selected}
          onAddToLog={onAddToLog}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  )
}
