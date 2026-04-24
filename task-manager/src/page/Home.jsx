import { useState, useEffect } from 'react'
import Liste from '../components/Liste'

function Home() {
  const [taches, setTaches] = useState(() => {
    const sauvegarde = localStorage.getItem('taches')
    return sauvegarde ? JSON.parse(sauvegarde) : []
  })
  const [nouvelleTache, setNouvelleTache] = useState('')

  useEffect(() => {
    localStorage.setItem('taches', JSON.stringify(taches))
  }, [taches])

  function ajouterTache() {
    if (nouvelleTache === '') return
    setTaches([...taches, { id: Date.now(), texte: nouvelleTache, faite: false }])
    setNouvelleTache('')
  }

  function supprimerTache(id) {
    setTaches(taches.filter(t => t.id !== id))
  }

  function toggleTache(id) {
    setTaches(taches.map(t =>
      t.id === id ? { ...t, faite: !t.faite } : t
    ))
  }

  function toutSupprimer() {
    setTaches([])
  }

  const tachesRestantes = taches.filter(t => !t.faite).length
  const tachesFaites = taches.filter(t => t.faite).length
  const progression = taches.length > 0 ? Math.round((tachesFaites / taches.length) * 100) : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">✓</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Task Manager</h1>
          </div>
          <p className="text-sm text-gray-400 ml-11">
            {tachesRestantes} {tachesRestantes === 1 ? 'tâche restante' : 'tâches restantes'}
          </p>
        </div>

        {/* Barre de progression */}
        {taches.length > 0 && (
          <div className="mb-6">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Progression</span>
              <span>{progression}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progression}%` }}
              />
            </div>
          </div>
        )}

        {/* Input */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={nouvelleTache}
            onChange={(e) => setNouvelleTache(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && ajouterTache()}
            placeholder="Ajouter une tâche..."
            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:bg-white transition"
          />
          <button
            onClick={ajouterTache}
            className="bg-indigo-500 hover:bg-indigo-600 active:scale-95 text-white px-5 py-3 rounded-xl text-sm font-medium transition-all"
          >
            +
          </button>
        </div>

        {/* Liste */}
        <Liste
          taches={taches}
          onSupprimer={supprimerTache}
          onToggle={toggleTache}
        />

        {/* Footer */}
        {taches.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
            <span className="text-xs text-gray-400">{tachesFaites} / {taches.length} complétées</span>
            <button
              onClick={toutSupprimer}
              className="text-xs text-red-400 hover:text-red-600 transition"
            >
              Tout supprimer
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

export default Home