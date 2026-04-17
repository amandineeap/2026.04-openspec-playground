import { useMacroTargets } from '../store/MacroTargetsContext'
import { getMacroPercentageSplit } from '../utils/macros'

const SPLIT_CONFIG = [
  { key: 'protein' as const, label: 'Protein', color: 'bg-blue-400' },
  { key: 'carbs' as const, label: 'Carbs', color: 'bg-emerald-400' },
  { key: 'fat' as const, label: 'Fat', color: 'bg-purple-400' },
  { key: 'fibre' as const, label: 'Fibre', color: 'bg-orange-400' },
]

export function MacroSplit() {
  const { targets } = useMacroTargets()
  if (!targets) return null

  const split = getMacroPercentageSplit(targets)

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <h2 className="font-bold text-gray-800 mb-3">Macro Split</h2>
      <div className="flex rounded-full overflow-hidden h-4 mb-3">
        {SPLIT_CONFIG.map(({ key, color }) => (
          <div key={key} className={`${color} transition-all`} style={{ width: `${split[key]}%` }} />
        ))}
      </div>
      <div className="flex justify-between text-xs text-gray-600">
        {SPLIT_CONFIG.map(({ key, label }) => (
          <span key={key}>{label} {split[key]}%</span>
        ))}
      </div>
    </div>
  )
}
