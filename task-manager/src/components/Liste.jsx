import Tache from './Tache'

function Liste({ taches, onSupprimer, onToggle }) {
  return (
    <div>
      {taches.map((tache) => (
        <Tache
          key={tache.id}
          tache={tache}
          onSupprimer={onSupprimer}
          onToggle={onToggle}
        />
      ))}
    </div>
  )
}

export default Liste