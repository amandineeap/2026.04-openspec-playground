import { useState } from 'react'
import { useMacroTargets } from '../store/MacroTargetsContext'
import type { MacroTargets } from '../types'

interface Props {
  onSave?: () => void
}

export function MacroTargetsForm({ onSave }: Props) {
  const { targets, setTargets } = useMacroTargets()
  const [form, setForm] = useState<MacroTargets>(
    targets ?? { calories: 2000, protein: 150, carbs: 200, fat: 65, fibre: 30 }
  )
  const [errors, setErrors] = useState<Partial<Record<keyof MacroTargets, string>>>({})

  function validate(): boolean {
    const e: Partial<Record<keyof MacroTargets, string>> = {}
    ;(Object.keys(form) as (keyof MacroTargets)[]).forEach((k) => {
      if (form[k] <= 0) e[k] = 'Must be greater than 0'
    })
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    if (!validate()) return
    setTargets(form)
    onSave?.()
  }

  const fields: { key: keyof MacroTargets; label: string; unit: string }[] = [
    { key: 'calories', label: 'Calories', unit: 'kcal' },
    { key: 'protein', label: 'Protein', unit: 'g' },
    { key: 'carbs', label: 'Carbohydrates', unit: 'g' },
    { key: 'fat', label: 'Fat', unit: 'g' },
    { key: 'fibre', label: 'Fibre', unit: 'g' },
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map(({ key, label, unit }) => (
        <div key={key}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label} ({unit})
          </label>
          <input
            type="number"
            min="1"
            value={form[key]}
            onChange={(e) => setForm({ ...form, [key]: Number(e.target.value) })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          {errors[key] && <p className="text-red-500 text-xs mt-1">{errors[key]}</p>}
        </div>
      ))}
      <button
        type="submit"
        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 rounded-lg transition-colors"
      >
        Save Targets
      </button>
    </form>
  )
}
