import type { Recipe, FoodEntry } from '../types'

interface Props {
  recipe: Recipe
  onAddToLog: (entry: Omit<FoodEntry, 'id' | 'createdAt'>) => void
  onClose: () => void
}

export function RecipeDetailCard({ recipe, onAddToLog, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-bold text-lg text-gray-900">{recipe.name}</h3>
            <p className="text-sm text-gray-500">{recipe.servingSize}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none ml-2">
            ×
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-5">
          {[
            { label: 'Calories', value: recipe.calories, unit: 'kcal', bg: 'bg-amber-50', text: 'text-amber-700' },
            { label: 'Protein', value: recipe.protein, unit: 'g', bg: 'bg-blue-50', text: 'text-blue-700' },
            { label: 'Carbs', value: recipe.carbs, unit: 'g', bg: 'bg-emerald-50', text: 'text-emerald-700' },
            { label: 'Fat', value: recipe.fat, unit: 'g', bg: 'bg-purple-50', text: 'text-purple-700' },
          ].map(({ label, value, unit, bg, text }) => (
            <div key={label} className={`${bg} rounded-xl p-3 text-center`}>
              <p className={`text-xl font-bold ${text}`}>{value}</p>
              <p className="text-xs text-gray-500">{label} ({unit})</p>
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            onAddToLog({
              name: recipe.name,
              servingSize: recipe.servingSize,
              calories: recipe.calories,
              protein: recipe.protein,
              carbs: recipe.carbs,
              fat: recipe.fat,
            })
            onClose()
          }}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2.5 rounded-xl transition-colors"
        >
          Add to Today's Log
        </button>
      </div>
    </div>
  )
}
