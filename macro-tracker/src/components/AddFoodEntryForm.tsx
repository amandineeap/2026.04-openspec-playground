import { useState } from 'react'
import type { FoodEntry, MacroValues } from '../types'

interface Props {
  onAdd: (entry: FoodEntry) => void
  prefill?: Partial<FoodEntry>
}

type FormState = {
  name: string
  servingSize: string
  calories: string
  protein: string
  carbs: string
  fat: string
}

const empty: FormState = { name: '', servingSize: '1 serving', calories: '', protein: '', carbs: '', fat: '' }

export function AddFoodEntryForm({ onAdd, prefill }: Props) {
  const [form, setForm] = useState<FormState>(
    prefill
      ? {
          name: prefill.name ?? '',
          servingSize: prefill.servingSize ?? '1 serving',
          calories: String(prefill.calories ?? ''),
          protein: String(prefill.protein ?? ''),
          carbs: String(prefill.carbs ?? ''),
          fat: String(prefill.fat ?? ''),
        }
      : empty
  )
  const [errors, setErrors] = useState<Partial<FormState>>({})

  const macroFields: { key: keyof MacroValues; label: string }[] = [
    { key: 'calories', label: 'Calories (kcal)' },
    { key: 'protein', label: 'Protein (g)' },
    { key: 'carbs', label: 'Carbs (g)' },
    { key: 'fat', label: 'Fat (g)' },
  ]

  function validate(): boolean {
    const e: Partial<FormState> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    macroFields.forEach(({ key }) => {
      const v = Number(form[key])
      if (form[key] === '' || isNaN(v)) e[key] = 'Required'
      else if (v < 0) e[key] = 'Cannot be negative'
    })
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    if (!validate()) return
    onAdd({
      id: crypto.randomUUID(),
      name: form.name.trim(),
      servingSize: form.servingSize.trim(),
      calories: Number(form.calories),
      protein: Number(form.protein),
      carbs: Number(form.carbs),
      fat: Number(form.fat),
      createdAt: Date.now(),
    })
    setForm(empty)
    setErrors({})
  }

  function set(key: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [key]: e.target.value })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <input
            placeholder="Food name *"
            value={form.name}
            onChange={set('name')}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          {errors.name && <p className="text-red-500 text-xs mt-0.5">{errors.name}</p>}
        </div>
        <div className="col-span-2">
          <input
            placeholder="Serving size (e.g. 1 cup)"
            value={form.servingSize}
            onChange={set('servingSize')}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        {macroFields.map(({ key, label }) => (
          <div key={key}>
            <input
              type="number"
              min="0"
              placeholder={label}
              value={form[key]}
              onChange={set(key)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {errors[key] && <p className="text-red-500 text-xs mt-0.5">{errors[key]}</p>}
          </div>
        ))}
      </div>
      <button
        type="submit"
        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 rounded-lg text-sm transition-colors"
      >
        Add to Log
      </button>
    </form>
  )
}
