import { useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { getLogsForDateRange } from '../hooks/useFoodLog'
import { sumMacros } from '../utils/macros'

function getLast7Days(): string[] {
  const days: string[] = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    days.push(d.toISOString().slice(0, 10))
  }
  return days
}

export function WeeklyTrendChart() {
  const [data, setData] = useState<{ date: string; calories: number; protein: number; carbs: number; fat: number }[]>([])
  const [hasData, setHasData] = useState(false)

  useEffect(() => {
    const days = getLast7Days()
    getLogsForDateRange(days[0], days[6]).then((logs) => {
      const byDate = Object.fromEntries(logs.map((l) => [l.date, l]))
      const chartData = days.map((date) => {
        const log = byDate[date]
        const totals = log ? sumMacros(log.entries) : { calories: 0, protein: 0, carbs: 0, fat: 0 }
        return { date: date.slice(5), ...totals }
      })
      setData(chartData)
      setHasData(logs.some((l) => l.entries.length > 0))
    })
  }, [])

  if (!hasData) {
    return (
      <div className="flex items-center justify-center h-40 text-gray-400 text-sm">
        No data yet — start logging meals to see your weekly trends.
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="date" tick={{ fontSize: 11 }} />
        <YAxis tick={{ fontSize: 11 }} />
        <Tooltip />
        <Legend wrapperStyle={{ fontSize: 11 }} />
        <Line type="monotone" dataKey="calories" stroke="#fbbf24" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="protein" stroke="#60a5fa" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="carbs" stroke="#34d399" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="fat" stroke="#a78bfa" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}
