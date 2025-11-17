import { useState, useEffect } from 'react'
import './Counter.css'

function Counter() {
  const [minValue, setMinValue] = useState(1)
  const [maxValue, setMaxValue] = useState(10)
  const [currentNumber, setCurrentNumber] = useState(5)
  const [isRolling, setIsRolling] = useState(false)
  const [history, setHistory] = useState<number[]>([])
  const [speed, setSpeed] = useState(50) // ms entre chaque nombre pendant le tirage

  const generateRandom = () => {
    return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue
  }

  const handleDraw = () => {
    if (isRolling) return

    setIsRolling(true)
    let count = 0
    const totalIterations = 20 // Nombre de changements avant d'arrêter

    const interval = setInterval(() => {
      setCurrentNumber(generateRandom())
      count++

      if (count >= totalIterations) {
        clearInterval(interval)
        const final = generateRandom()
        setCurrentNumber(final)
        setHistory((prev) => [final, ...prev.slice(0, 9)]) // Garder les 10 derniers
        setIsRolling(false)
      }
    }, speed)
  }

  const clearHistory = () => {
    setHistory([])
  }

  const adjustMin = (delta: number) => {
    const newMin = Math.max(0, minValue + delta)
    if (newMin < maxValue) {
      setMinValue(newMin)
    }
  }

  const adjustMax = (delta: number) => {
    const newMax = maxValue + delta
    if (newMax > minValue) {
      setMaxValue(newMax)
    }
  }

  useEffect(() => {
    setCurrentNumber(Math.floor((minValue + maxValue) / 2))
  }, [minValue, maxValue])

  return (
    <div className="counter-app fade-in">
      <h1 className="counter-title">🎲 Générateur</h1>
      <p className="counter-subtitle">
        Tirage au sort de nombres aléatoires
      </p>

      {/* Configuration */}
      <div className="counter-config">
        <div className="config-group">
          <label>Minimum :</label>
          <div className="value-controls">
            <button
              className="btn-adjust"
              onClick={() => adjustMin(-1)}
              disabled={minValue <= 0}
            >
              -
            </button>
            <input
              type="number"
              value={minValue}
              onChange={(e) => {
                const val = parseInt(e.target.value) || 0
                if (val < maxValue) setMinValue(val)
              }}
              className="value-input"
            />
            <button className="btn-adjust" onClick={() => adjustMin(1)}>
              +
            </button>
          </div>
        </div>

        <div className="config-group">
          <label>Maximum :</label>
          <div className="value-controls">
            <button
              className="btn-adjust"
              onClick={() => adjustMax(-1)}
              disabled={maxValue <= minValue + 1}
            >
              -
            </button>
            <input
              type="number"
              value={maxValue}
              onChange={(e) => {
                const val = parseInt(e.target.value) || 1
                if (val > minValue) setMaxValue(val)
              }}
              className="value-input"
            />
            <button className="btn-adjust" onClick={() => adjustMax(1)}>
              +
            </button>
          </div>
        </div>

        <div className="config-group">
          <label>Vitesse :</label>
          <div className="speed-control">
            <input
              type="range"
              min="20"
              max="100"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="speed-slider"
            />
            <span className="speed-label">
              {speed < 40 ? 'Rapide' : speed < 70 ? 'Normal' : 'Lent'}
            </span>
          </div>
        </div>
      </div>

      {/* Affichage du nombre */}
      <div className={`counter-display ${isRolling ? 'rolling' : ''}`}>
        <div className="number-container">
          <div className="current-number">{currentNumber}</div>
        </div>

        <div className="range-indicator">
          de {minValue} à {maxValue}
        </div>
      </div>

      {/* Bouton de tirage */}
      <div className="counter-actions">
        <button
          className={`btn-draw ${isRolling ? 'rolling' : ''}`}
          onClick={handleDraw}
          disabled={isRolling}
        >
          {isRolling ? '🎰 Tirage en cours...' : '🎲 Tirer un nombre'}
        </button>
      </div>

      {/* Préréglages */}
      <div className="presets-section">
        <h3>Préréglages rapides</h3>
        <div className="presets-grid">
          <button
            className="preset-btn"
            onClick={() => {
              setMinValue(1)
              setMaxValue(6)
            }}
          >
            🎲 Dé (1-6)
          </button>
          <button
            className="preset-btn"
            onClick={() => {
              setMinValue(1)
              setMaxValue(10)
            }}
          >
            🔢 1-10
          </button>
          <button
            className="preset-btn"
            onClick={() => {
              setMinValue(1)
              setMaxValue(20)
            }}
          >
            📊 1-20
          </button>
          <button
            className="preset-btn"
            onClick={() => {
              setMinValue(1)
              setMaxValue(100)
            }}
          >
            💯 1-100
          </button>
        </div>
      </div>

      {/* Historique */}
      {history.length > 0 && (
        <div className="history-section">
          <div className="history-header">
            <h3>📜 Historique des tirages</h3>
            <button className="btn-clear-history" onClick={clearHistory}>
              🗑️ Effacer
            </button>
          </div>

          <div className="history-list">
            {history.map((num, index) => (
              <div key={index} className="history-item">
                <span className="history-number">{num}</span>
                <span className="history-index">#{history.length - index}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Informations */}
      <div className="counter-info">
        <h3>💡 Utilisations</h3>
        <ul>
          <li>🎲 <strong>Tirage au sort</strong> d'élèves (numéro de liste)</li>
          <li>🎯 <strong>Jeux pédagogiques</strong> avec dés virtuels</li>
          <li>📝 <strong>Exercices aléatoires</strong> (numéro de question)</li>
          <li>🏆 <strong>Challenges</strong> avec nombres mystère</li>
        </ul>
      </div>
    </div>
  )
}

export default Counter
