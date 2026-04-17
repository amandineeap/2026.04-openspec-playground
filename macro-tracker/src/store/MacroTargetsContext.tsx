import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { getStoredTargets, saveTargets } from './localStorage'
import type { MacroTargets } from '../types'

interface MacroTargetsContextValue {
  targets: MacroTargets | null
  setTargets: (t: MacroTargets) => void
}

const MacroTargetsContext = createContext<MacroTargetsContextValue | null>(null)

export function MacroTargetsProvider({ children }: { children: ReactNode }) {
  const [targets, setTargetsState] = useState<MacroTargets | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setTargetsState(getStoredTargets())
    setLoaded(true)
  }, [])

  function setTargets(t: MacroTargets) {
    saveTargets(t)
    setTargetsState(t)
  }

  if (!loaded) return null

  return (
    <MacroTargetsContext.Provider value={{ targets, setTargets }}>
      {children}
    </MacroTargetsContext.Provider>
  )
}

export function useMacroTargets() {
  const ctx = useContext(MacroTargetsContext)
  if (!ctx) throw new Error('useMacroTargets must be used within MacroTargetsProvider')
  return ctx
}
