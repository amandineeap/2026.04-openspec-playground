interface Props {
  date: string
  onChange: (date: string) => void
}

function formatDisplay(iso: string): string {
  const d = new Date(iso + 'T00:00:00')
  const today = new Date().toISOString().slice(0, 10)
  if (iso === today) return 'Today'
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
  if (iso === yesterday) return 'Yesterday'
  return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })
}

function addDays(iso: string, n: number): string {
  const d = new Date(iso + 'T00:00:00')
  d.setDate(d.getDate() + n)
  return d.toISOString().slice(0, 10)
}

export function DateNav({ date, onChange }: Props) {
  const today = new Date().toISOString().slice(0, 10)
  const isToday = date === today

  return (
    <div className="flex items-center justify-between bg-white rounded-xl px-4 py-2 shadow-sm border border-gray-100">
      <button
        onClick={() => onChange(addDays(date, -1))}
        className="p-1 rounded hover:bg-gray-100 transition-colors text-gray-500"
        aria-label="Previous day"
      >
        ‹
      </button>
      <div className="flex items-center gap-2">
        <span className="font-semibold text-gray-800">{formatDisplay(date)}</span>
        <input
          type="date"
          value={date}
          max={today}
          onChange={(e) => onChange(e.target.value)}
          className="opacity-0 absolute w-0 h-0"
          id="date-picker"
        />
        <label
          htmlFor="date-picker"
          className="text-gray-400 hover:text-gray-600 cursor-pointer text-sm"
          title="Pick a date"
        >
          📅
        </label>
      </div>
      <button
        onClick={() => onChange(addDays(date, 1))}
        disabled={isToday}
        className="p-1 rounded hover:bg-gray-100 transition-colors text-gray-500 disabled:opacity-30"
        aria-label="Next day"
      >
        ›
      </button>
    </div>
  )
}
