import { useFoodLog } from '../hooks/useFoodLog'
import { AddFoodEntryForm } from '../components/AddFoodEntryForm'
import { FoodLogList } from '../components/FoodLogList'
import { DailyProgressBars } from '../components/DailyProgressBars'
import { sumMacros } from '../utils/macros'
import { useMacroTargets } from '../store/MacroTargetsContext'

interface Props {
  date: string
}

export function LogPage({ date }: Props) {
  const { log, loading, addEntry, deleteEntry } = useFoodLog(date)
  const { targets } = useMacroTargets()
  const totals = sumMacros(log.entries)

  return (
    <div className="space-y-4">
      {targets && (
        <section className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <DailyProgressBars targets={targets} totals={totals} />
        </section>
      )}
      <section className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <h2 className="font-bold text-gray-800 mb-3">Add Food</h2>
        <AddFoodEntryForm onAdd={addEntry} />
      </section>
      <section className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <h2 className="font-bold text-gray-800 mb-3">
          Log
          {log.entries.length > 0 && (
            <span className="ml-2 text-sm font-normal text-gray-400">
              {totals.calories} kcal · P {totals.protein}g · C {totals.carbs}g · F {totals.fat}g
            </span>
          )}
        </h2>
        {loading ? (
          <div className="space-y-2 animate-pulse">
            {[...Array(3)].map((_, i) => <div key={i} className="h-14 bg-gray-100 rounded-lg" />)}
          </div>
        ) : (
          <FoodLogList entries={log.entries} onDelete={deleteEntry} />
        )}
      </section>
    </div>
  )
}
