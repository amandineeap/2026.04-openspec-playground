import { useState, useEffect } from 'react'
import { MacroTargetsProvider, useMacroTargets } from './store/MacroTargetsContext'
import { ensureRecipesIndexed } from './store/recipeIndex'
import { MacroTargetsForm } from './components/MacroTargetsForm'
import { DateNav } from './components/DateNav'
import { DashboardPage } from './pages/DashboardPage'
import { LogPage } from './pages/LogPage'
import { RecipesPage } from './pages/RecipesPage'
import { SettingsPage } from './pages/SettingsPage'

type Tab = 'dashboard' | 'log' | 'recipes' | 'settings'

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'log', label: 'Log', icon: '📝' },
  { id: 'recipes', label: 'Recipes', icon: '🍽️' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
]

function AppInner() {
  const { targets } = useMacroTargets()
  const [tab, setTab] = useState<Tab>('dashboard')
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [indexing, setIndexing] = useState(true)

  useEffect(() => {
    ensureRecipesIndexed().then(() => setIndexing(false))
  }, [])

  if (indexing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Loading recipe database…</p>
        </div>
      </div>
    )
  }

  if (!targets) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome 👋</h1>
          <p className="text-gray-500 text-sm mb-5">Set your daily macro targets to get started.</p>
          <MacroTargetsForm />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-2xl mx-auto">
      <header className="bg-white border-b border-gray-100 px-4 pt-4 pb-3 sticky top-0 z-10">
        <h1 className="text-lg font-bold text-gray-900 mb-2">MacroTracker</h1>
        {(tab === 'dashboard' || tab === 'log') && (
          <DateNav date={date} onChange={setDate} />
        )}
      </header>

      <main className="flex-1 overflow-y-auto p-4 pb-24">
        {tab === 'dashboard' && <DashboardPage date={date} />}
        {tab === 'log' && <LogPage date={date} />}
        {tab === 'recipes' && <RecipesPage />}
        {tab === 'settings' && <SettingsPage />}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100">
        <div className="max-w-2xl mx-auto flex">
          {TABS.map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex-1 flex flex-col items-center py-2 text-xs transition-colors ${
                tab === id ? 'text-emerald-600 font-semibold' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <span className="text-xl leading-none mb-0.5">{icon}</span>
              {label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}

export default function App() {
  return (
    <MacroTargetsProvider>
      <AppInner />
    </MacroTargetsProvider>
  )
}
