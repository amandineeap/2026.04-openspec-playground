import { MacroTargetsForm } from '../components/MacroTargetsForm'
import { MacroSplit } from '../components/MacroSplit'

export function SettingsPage() {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <h2 className="font-bold text-gray-800 mb-4">Daily Macro Targets</h2>
        <MacroTargetsForm />
      </div>
      <MacroSplit />
    </div>
  )
}
