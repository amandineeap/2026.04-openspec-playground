import { RecipeBrowser } from '../components/RecipeBrowser'
import { useFoodLog } from '../hooks/useFoodLog'
import type { FoodEntry } from '../types'

export function RecipesPage() {
  const today = new Date().toISOString().slice(0, 10)
  const { addEntry } = useFoodLog(today)

  function handleAddToLog(entry: Omit<FoodEntry, 'id' | 'createdAt'>) {
    addEntry({ ...entry, id: crypto.randomUUID(), createdAt: Date.now() })
  }

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <h2 className="font-bold text-gray-800 mb-3">Recipe Browser</h2>
      <RecipeBrowser onAddToLog={handleAddToLog} />
    </div>
  )
}
