import { useAudioMeter, NoiseLevel } from '../../hooks/useAudioMeter'
import './SoundMeter.css'

interface NoiseLevelInfo {
  level: NoiseLevel
  color: string
  label: string
}

const noiseLevels: NoiseLevelInfo[] = [
  { level: 'quiet', color: '#22c55e', label: 'Calme' },
  { level: 'moderate', color: '#eab308', label: 'Modéré' },
  { level: 'loud', color: '#ef4444', label: 'Bruyant' },
]

function SoundMeter() {
  const {
    decibels,
    noiseLevel,
    isMonitoring,
    error,
    startMonitoring,
    stopMonitoring,
  } = useAudioMeter()

  const getCurrentColor = () => {
    const level = noiseLevels.find((l) => l.level === noiseLevel)
    return level?.color || '#22c55e'
  }

  return (
    <div className="sound-meter fade-in">
      <h1 className="sound-meter-title">🔊 Sonomètre</h1>
      <p className="sound-meter-subtitle">
        Mesure du niveau sonore en temps réel
      </p>

      {error && (
        <div className="error-message">
          <span>⚠️</span>
          <p>{error}</p>
        </div>
      )}

      <div className="meter-container">
        {/* Cercle principal avec niveau sonore */}
        <div
          className="meter-circle"
          style={{
            background: `radial-gradient(circle, ${getCurrentColor()}, ${getCurrentColor()}aa)`,
            boxShadow: `0 0 40px ${getCurrentColor()}66`,
          }}
        >
          <div className="meter-value">
            <span className="meter-number">{Math.round(decibels)}</span>
            <span className="meter-unit">dB</span>
          </div>
        </div>

        {/* Indicateurs de niveau */}
        <div className="noise-indicators">
          {noiseLevels.map((level) => (
            <div
              key={level.level}
              className={`noise-indicator ${
                noiseLevel === level.level ? 'active' : ''
              }`}
            >
              <div
                className="indicator-circle"
                style={{
                  backgroundColor: level.color,
                  opacity: noiseLevel === level.level ? 1 : 0.3,
                }}
              />
              <span className="indicator-label">{level.label}</span>
            </div>
          ))}
        </div>

        {/* Barre de progression */}
        <div className="progress-bar-container">
          <div
            className="progress-bar-fill"
            style={{
              width: `${decibels}%`,
              backgroundColor: getCurrentColor(),
            }}
          />
        </div>

        {/* Légende des seuils */}
        <div className="thresholds">
          <span className="threshold">0 dB</span>
          <span className="threshold">50 dB</span>
          <span className="threshold">70 dB</span>
          <span className="threshold">100 dB</span>
        </div>

        {/* Boutons de contrôle */}
        <div className="controls">
          {!isMonitoring ? (
            <button
              className="btn-start"
              onClick={startMonitoring}
            >
              <span className="btn-icon">▶️</span>
              Démarrer la mesure
            </button>
          ) : (
            <button
              className="btn-stop"
              onClick={stopMonitoring}
            >
              <span className="btn-icon">⏹️</span>
              Arrêter la mesure
            </button>
          )}
        </div>

        {/* Informations */}
        <div className="info-box">
          <h3>📚 Guide des niveaux sonores</h3>
          <ul>
            <li>
              <strong style={{ color: '#22c55e' }}>Calme (&lt; 40 dB)</strong> : Silence ou chuchotements - Idéal pour le travail
            </li>
            <li>
              <strong style={{ color: '#eab308' }}>Modéré (40-65 dB)</strong> : Conversation normale - Attention au volume
            </li>
            <li>
              <strong style={{ color: '#ef4444' }}>Bruyant (&gt; 65 dB)</strong> : Trop de bruit - Baissez le volume !
            </li>
          </ul>
          <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            💡 <strong>Astuce :</strong> Le sonomètre est maintenant plus sensible et réagit plus rapidement aux changements de volume.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SoundMeter
