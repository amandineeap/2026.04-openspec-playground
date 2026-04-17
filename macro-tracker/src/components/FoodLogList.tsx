import type { FoodEntry } from '../types'

interface Props {
  entries: FoodEntry[]
  onDelete: (id: string) => void
}

export function FoodLogList({ entries, onDelete }: Props) {
  if (entries.length === 0) {
    return (
      <p className="text-gray-400 text-sm text-center py-6">
        No entries yet. Add your first meal above.
      </p>
    )
  }

  return (
    <ul className="space-y-2">
      {entries.map((entry) => (
        <li
          key={entry.id}
          className="flex items-start justify-between bg-gray-50 rounded-lg px-3 py-2"
        >
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm text-gray-800 truncate">{entry.name}</p>
            <p className="text-xs text-gray-500">{entry.servingSize}</p>
            <div className="flex gap-3 mt-1 text-xs text-gray-500">
              <span>{entry.calories} kcal</span>
              <span>P {entry.protein}g</span>
              <span>C {entry.carbs}g</span>
              <span>F {entry.fat}g</span>
            </div>
          </div>
          <button
            onClick={() => onDelete(entry.id)}
            aria-label={`Delete ${entry.name}`}
            className="ml-2 text-gray-400 hover:text-red-500 transition-colors text-lg leading-none"
          >
            ×
          </button>
        </li>
      ))}
    </ul>
  )
}
