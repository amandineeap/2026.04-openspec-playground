import { useMacroTargets } from '../store/MacroTargetsContext'
import { useFoodLog } from '../hooks/useFoodLog'
import { sumMacros } from '../utils/macros'
import { DailyProgressBars } from '../components/DailyProgressBars'
import { WeeklyTrendChart } from '../components/WeeklyTrendChart'
import { RecipeSuggestions } from '../components/RecipeSuggestions'
import type { FoodEntry } from '../types'

interface Props {
  date: string
}

export function DashboardPage({ date }: Props) {
  const { targets } = useMacroTargets()
  const { log, loading, addEntry } = useFoodLog(date)

  if (!targets) return null
  const totals = sumMacros(log.entries)

  async function handleAddToLog(entry: Omit<FoodEntry, 'id' | 'createdAt'>) {
    await addEntry({ ...entry, id: crypto.randomUUID(), createdAt: Date.now() })
  }

  return (
    <div className="space-y-5">
      <section className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <h2 className="font-bold text-gray-800 mb-3">Today's Progress</h2>
        {loading ? (
          <div className="space-y-3 animate-pulse">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-6 bg-gray-100 rounded" />
            ))}
          </div>
        ) : (
          <DailyProgressBars targets={targets} totals={totals} />
        )}
      </section>

      <section className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <h2 className="font-bold text-gray-800 mb-3">Weekly Trend</h2>
        <WeeklyTrendChart />
      </section>

      <section className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <h2 className="font-bold text-gray-800 mb-3">Suggested for You</h2>
        <RecipeSuggestions targets={targets} totals={totals} onAddToLog={handleAddToLog} />
      </section>
    </div>
  )
}
