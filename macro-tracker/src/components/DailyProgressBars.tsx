import type { MacroTargets, MacroValues } from '../types'

interface Props {
  targets: MacroTargets
  totals: MacroValues
}

const MACRO_CONFIG = [
  { key: 'calories' as const, label: 'Calories', unit: 'kcal', color: 'bg-amber-400', overColor: 'bg-red-400' },
  { key: 'protein' as const, label: 'Protein', unit: 'g', color: 'bg-blue-400', overColor: 'bg-red-400' },
  { key: 'carbs' as const, label: 'Carbs', unit: 'g', color: 'bg-emerald-400', overColor: 'bg-red-400' },
  { key: 'fat' as const, label: 'Fat', unit: 'g', color: 'bg-purple-400', overColor: 'bg-red-400' },
]

export function DailyProgressBars({ targets, totals }: Props) {
  return (
    <div className="space-y-3">
      {MACRO_CONFIG.map(({ key, label, unit, color, overColor }) => {
        const current = totals[key]
        const target = targets[key]
        const pct = Math.min(100, (current / target) * 100)
        const over = current > target

        return (
          <div key={key}>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-gray-700">{label}</span>
              <span className={over ? 'text-red-500 font-semibold' : 'text-gray-500'}>
                {current} / {target} {unit}
                {over && ' ⚠️'}
              </span>
            </div>
            <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${over ? overColor : color}`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
