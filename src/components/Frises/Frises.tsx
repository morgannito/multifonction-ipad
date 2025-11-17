import { useState } from 'react'
import './Frises.css'

const patterns = [
  { id: 'circles', name: 'Cercles', pattern: ['⭕', '⭕', '⭕'] },
  { id: 'squares', name: 'Carrés', pattern: ['⬛', '⬛', '⬛'] },
  { id: 'triangles', name: 'Triangles', pattern: ['🔺', '🔺', '🔺'] },
  { id: 'colors', name: 'Couleurs', pattern: ['🔴', '🟡', '🔵'] },
  { id: 'shapes-mix', name: 'Formes mixtes', pattern: ['⭕', '⬛', '🔺'] },
  { id: 'rainbow', name: 'Arc-en-ciel', pattern: ['🔴', '🟠', '🟡', '🟢', '🔵', '🟣'] },
]

function Frises() {
  const [selectedPattern, setSelectedPattern] = useState(patterns[0])
  const [repeatCount, setRepeatCount] = useState(5)

  const getRepeatedPattern = () => {
    const result = []
    for (let i = 0; i < repeatCount; i++) {
      result.push(...selectedPattern.pattern)
    }
    return result
  }

  return (
    <div className="frises-app fade-in">
      <h1 className="frises-title">📐 Frises</h1>
      <p className="frises-subtitle">Modèles de frises reproductibles</p>

      <div className="pattern-display">
        <h2>{selectedPattern.name}</h2>
        <div className="pattern-strip">
          {getRepeatedPattern().map((shape, index) => (
            <span key={index} className="pattern-item">{shape}</span>
          ))}
        </div>
      </div>

      <div className="pattern-controls">
        <div className="control-group">
          <label>Motif :</label>
          <select value={selectedPattern.id} onChange={e => {
            const p = patterns.find(pa => pa.id === e.target.value)
            if (p) setSelectedPattern(p)
          }}>
            {patterns.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label>Répétitions :</label>
          <input type="range" min="1" max="10" value={repeatCount} onChange={e => setRepeatCount(Number(e.target.value))} />
          <span>{repeatCount}</span>
        </div>
      </div>

      <div className="patterns-grid">
        {patterns.map(pattern => (
          <button key={pattern.id} className={`pattern-card ${selectedPattern.id === pattern.id ? 'selected' : ''}`} onClick={() => setSelectedPattern(pattern)}>
            <div className="pattern-preview">
              {pattern.pattern.map((shape, i) => (
                <span key={i}>{shape}</span>
              ))}
            </div>
            <div className="pattern-name">{pattern.name}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default Frises
