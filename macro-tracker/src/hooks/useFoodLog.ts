import { useState, useEffect, useCallback } from 'react'
import { getDB } from '../store/db'
import type { FoodEntry, DayLog } from '../types'

function todayISO(): string {
  return new Date().toISOString().slice(0, 10)
}

export function useFoodLog(date: string = todayISO()) {
  const [log, setLog] = useState<DayLog>({ date, entries: [] })
  const [loading, setLoading] = useState(true)

  const loadLog = useCallback(async () => {
    const db = await getDB()
    const stored = await db.get('logs', date)
    setLog(stored ?? { date, entries: [] })
    setLoading(false)
  }, [date])

  useEffect(() => {
    setLoading(true)
    loadLog()
  }, [loadLog])

  const addEntry = useCallback(
    async (entry: FoodEntry) => {
      const db = await getDB()
      const current = (await db.get('logs', date)) ?? { date, entries: [] }
      const updated = { ...current, entries: [...current.entries, entry] }
      await db.put('logs', updated)
      setLog(updated)
    },
    [date]
  )

  const deleteEntry = useCallback(
    async (id: string) => {
      const db = await getDB()
      const current = (await db.get('logs', date)) ?? { date, entries: [] }
      const updated = { ...current, entries: current.entries.filter((e: FoodEntry) => e.id !== id) }
      await db.put('logs', updated)
      setLog(updated)
    },
    [date]
  )

  return { log, loading, addEntry, deleteEntry }
}

export async function getLogsForDateRange(startDate: string, endDate: string): Promise<DayLog[]> {
  const db = await getDB()
  const all = await db.getAll('logs')
  return all.filter((l) => l.date >= startDate && l.date <= endDate)
}
