import { useState } from 'react'
import './Pictos.css'

interface PictoCategory {
  id: string
  name: string
  pictos: Picto[]
}

interface Picto {
  id: string
  label: string
  icon: string
  color: string
}

const categories: PictoCategory[] = [
  {
    id: 'work-mode',
    name: 'Mode de travail',
    pictos: [
      { id: 'solo', label: 'Travail individuel', icon: '👤', color: '#3b82f6' },
      { id: 'pair', label: 'Travail en binôme', icon: '👥', color: '#8b5cf6' },
      { id: 'group', label: 'Travail en groupe', icon: '👨‍👩‍👧‍👦', color: '#ec4899' },
    ],
  },
  {
    id: 'noise',
    name: 'Niveau sonore',
    pictos: [
      { id: 'silence', label: 'Silence complet', icon: '🤫', color: '#22c55e' },
      { id: 'whisper', label: 'Chuchotements autorisés', icon: '🗣️', color: '#eab308' },
      { id: 'talk', label: 'Discussion autorisée', icon: '💬', color: '#f97316' },
    ],
  },
  {
    id: 'movement',
    name: 'Déplacements',
    pictos: [
      { id: 'seated', label: 'Rester assis', icon: '🪑', color: '#ef4444' },
      { id: 'limited', label: 'Déplacements limités', icon: '🚶', color: '#eab308' },
      { id: 'free', label: 'Déplacements libres', icon: '🏃', color: '#22c55e' },
    ],
  },
  {
    id: 'help',
    name: "Demande d'aide",
    pictos: [
      { id: 'no-help', label: 'Autonomie complète', icon: '🚫', color: '#ef4444' },
      { id: 'help-ok', label: 'Demande autorisée', icon: '🙋', color: '#22c55e' },
      { id: 'help-teacher', label: 'Aide enseignant uniquement', icon: '👨‍🏫', color: '#3b82f6' },
    ],
  },
  {
    id: 'resources',
    name: 'Ressources',
    pictos: [
      { id: 'no-resources', label: 'Pas de ressources', icon: '📵', color: '#ef4444' },
      { id: 'books', label: 'Livres autorisés', icon: '📚', color: '#3b82f6' },
      { id: 'all-resources', label: 'Toutes ressources', icon: '📖', color: '#22c55e' },
    ],
  },
]

function Pictos() {
  const [selectedPictos, setSelectedPictos] = useState<Set<string>>(new Set())
  const [displayMode, setDisplayMode] = useState<'grid' | 'fullscreen'>('grid')

  const togglePicto = (pictoId: string, categoryId: string) => {
    const newSelected = new Set(selectedPictos)

    // Désélectionner les autres pictos de la même catégorie
    const category = categories.find((c) => c.id === categoryId)
    category?.pictos.forEach((p) => {
      if (p.id !== pictoId) {
        newSelected.delete(p.id)
      }
    })

    // Toggle le picto actuel
    if (newSelected.has(pictoId)) {
      newSelected.delete(pictoId)
    } else {
      newSelected.add(pictoId)
    }

    setSelectedPictos(newSelected)
  }

  const clearAll = () => {
    setSelectedPictos(new Set())
  }

  const getSelectedPictos = () => {
    const selected: Picto[] = []
    categories.forEach((category) => {
      category.pictos.forEach((picto) => {
        if (selectedPictos.has(picto.id)) {
          selected.push(picto)
        }
      })
    })
    return selected
  }

  const selectedPictosArray = getSelectedPictos()

  if (displayMode === 'fullscreen' && selectedPictosArray.length > 0) {
    return (
      <div className="pictos-fullscreen">
        <button
          className="btn-exit-fullscreen"
          onClick={() => setDisplayMode('grid')}
        >
          ✕ Quitter le mode plein écran
        </button>

        <div className="fullscreen-pictos">
          {selectedPictosArray.map((picto) => (
            <div
              key={picto.id}
              className="fullscreen-picto"
              style={{ borderColor: picto.color }}
            >
              <div className="fullscreen-icon" style={{ color: picto.color }}>
                {picto.icon}
              </div>
              <div className="fullscreen-label">{picto.label}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="pictos-app fade-in">
      <h1 className="pictos-title">🎨 Pictogrammes</h1>
      <p className="pictos-subtitle">
        Affichez les modalités de travail en classe
      </p>

      {/* Actions */}
      <div className="pictos-actions">
        <button
          className="btn-fullscreen"
          onClick={() => setDisplayMode('fullscreen')}
          disabled={selectedPictosArray.length === 0}
        >
          🖥️ Mode Plein Écran
        </button>
        <button className="btn-clear" onClick={clearAll}>
          🗑️ Tout effacer
        </button>
      </div>

      {/* Aperçu des sélections */}
      {selectedPictosArray.length > 0 && (
        <div className="selected-preview">
          <h3>Sélection active :</h3>
          <div className="preview-pictos">
            {selectedPictosArray.map((picto) => (
              <div
                key={picto.id}
                className="preview-picto"
                style={{ backgroundColor: picto.color }}
              >
                <span className="preview-icon">{picto.icon}</span>
                <span className="preview-label">{picto.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Catégories */}
      <div className="pictos-categories">
        {categories.map((category) => (
          <div key={category.id} className="picto-category">
            <h2 className="category-title">{category.name}</h2>

            <div className="pictos-grid">
              {category.pictos.map((picto) => {
                const isSelected = selectedPictos.has(picto.id)

                return (
                  <button
                    key={picto.id}
                    className={`picto-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => togglePicto(picto.id, category.id)}
                    style={{
                      borderColor: isSelected ? picto.color : 'var(--border)',
                      backgroundColor: isSelected
                        ? `${picto.color}15`
                        : 'var(--surface)',
                    }}
                  >
                    <div
                      className="picto-icon"
                      style={{ color: picto.color }}
                    >
                      {picto.icon}
                    </div>
                    <div className="picto-label">{picto.label}</div>
                    {isSelected && (
                      <div
                        className="picto-check"
                        style={{ backgroundColor: picto.color }}
                      >
                        ✓
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Informations */}
      <div className="pictos-info">
        <h3>💡 Utilisation</h3>
        <ul>
          <li>
            ✅ <strong>Cliquez</strong> sur un pictogramme pour le sélectionner
          </li>
          <li>
            🖥️ <strong>Mode plein écran</strong> pour afficher sur grand écran
          </li>
          <li>
            🔄 <strong>Un seul picto</strong> par catégorie à la fois
          </li>
          <li>
            👀 <strong>Affichage clair</strong> pour les élèves
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Pictos
