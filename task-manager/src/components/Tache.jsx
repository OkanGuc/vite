function Tache({ tache, onSupprimer, onToggle }) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0 group">
      <button
        onClick={() => onToggle(tache.id)}
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${
          tache.faite
            ? 'bg-indigo-500 border-indigo-500'
            : 'border-gray-300 hover:border-indigo-400'
        }`}
      >
        {tache.faite && <span className="text-white text-xs">✓</span>}
      </button>
      <span className={`flex-1 text-sm transition-all ${
        tache.faite ? 'line-through text-gray-300' : 'text-gray-700'
      }`}>
        {tache.texte}
      </span>
      <button
        onClick={() => onSupprimer(tache.id)}
        className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-400 transition-all text-sm"
      >
        ✕
      </button>
    </div>
  )
}

export default Tache