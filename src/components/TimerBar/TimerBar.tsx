import { useState } from 'react'
import { useTimers } from '../../hooks/useTimers'
import './TimerBar.css'

function TimerBar() {
  const {
    timers,
    addTimer,
    removeTimer,
    startTimer,
    pauseTimer,
    resetTimer,
    updateTimerName,
  } = useTimers()

  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newTimerName, setNewTimerName] = useState('')
  const [newTimerDuration, setNewTimerDuration] = useState(5)

  const presets = [
    { label: '1 min', value: 1 },
    { label: '3 min', value: 3 },
    { label: '5 min', value: 5 },
    { label: '10 min', value: 10 },
    { label: '15 min', value: 15 },
    { label: '20 min', value: 20 },
    { label: '30 min', value: 30 },
  ]

  const handleCreateTimer = () => {
    const name = newTimerName.trim() || `Timer ${timers.length + 1}`
    addTimer(name, newTimerDuration)
    setNewTimerName('')
    setNewTimerDuration(5)
    setShowCreateForm(false)
  }

  const handleQuickAdd = (minutes: number) => {
    const name = `Timer ${timers.length + 1}`
    addTimer(name, minutes)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  const getBarColor = (remaining: number, duration: number) => {
    const percentage = (remaining / duration) * 100
    if (remaining === 0) return '#ef4444'
    if (percentage < 20) return '#f97316'
    if (percentage < 50) return '#eab308'
    return '#3b82f6'
  }

  return (
    <div className="timerbar-app fade-in">
      <h1 className="timerbar-title">📊 Timer Bar</h1>
      <p className="timerbar-subtitle">
        Timers sous forme de barres de progression
      </p>

      {/* Actions */}
      <div className="timerbar-actions">
        <button
          className="btn-create-timerbar"
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          ➕ Nouveau Timer
        </button>
      </div>

      {/* Formulaire de création */}
      {showCreateForm && (
        <div className="create-timerbar-form">
          <h3>Créer un nouveau timer</h3>

          <div className="form-group">
            <label>Nom :</label>
            <input
              type="text"
              value={newTimerName}
              onChange={(e) => setNewTimerName(e.target.value)}
              placeholder="Ex: Groupe A"
              maxLength={30}
            />
          </div>

          <div className="form-group">
            <label>Durée (minutes) :</label>
            <input
              type="number"
              value={newTimerDuration}
              onChange={(e) => setNewTimerDuration(Number(e.target.value))}
              min={1}
              max={120}
            />
          </div>

          <div className="form-group">
            <label>Préréglages :</label>
            <div className="presets">
              {presets.map((preset) => (
                <button
                  key={preset.value}
                  className={`btn-preset ${newTimerDuration === preset.value ? 'active' : ''}`}
                  onClick={() => setNewTimerDuration(preset.value)}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button className="btn-submit" onClick={handleCreateTimer}>
              Créer
            </button>
            <button
              className="btn-cancel"
              onClick={() => setShowCreateForm(false)}
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* Préréglages rapides */}
      {!showCreateForm && timers.length === 0 && (
        <div className="quick-presets">
          <p>Création rapide :</p>
          <div className="presets">
            {presets.map((preset) => (
              <button
                key={preset.value}
                className="btn-preset"
                onClick={() => handleQuickAdd(preset.value)}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Liste des timers */}
      <div className="timerbars-list">
        {timers.map((timer) => {
          const percentage = (timer.remaining / timer.duration) * 100
          const isFinished = timer.remaining === 0

          return (
            <div
              key={timer.id}
              className={`timerbar-item ${isFinished ? 'finished' : ''}`}
            >
              {/* Header */}
              <div className="timerbar-header">
                <div className="timerbar-info">
                  <input
                    type="text"
                    value={timer.name}
                    onChange={(e) => updateTimerName(timer.id, e.target.value)}
                    className="timerbar-name"
                    maxLength={30}
                  />
                  <div className="timerbar-time-display">
                    <span className="time-remaining">
                      {formatTime(timer.remaining)}
                    </span>
                    <span className="time-separator"> / </span>
                    <span className="time-total">
                      {formatTime(timer.duration)}
                    </span>
                  </div>
                </div>

                <div className="timerbar-controls">
                  {!timer.isRunning ? (
                    <button
                      className="btn-control btn-play"
                      onClick={() => startTimer(timer.id)}
                      disabled={isFinished}
                      title="Démarrer"
                    >
                      ▶️
                    </button>
                  ) : (
                    <button
                      className="btn-control btn-pause"
                      onClick={() => pauseTimer(timer.id)}
                      title="Pause"
                    >
                      ⏸️
                    </button>
                  )}

                  <button
                    className="btn-control btn-reset"
                    onClick={() => resetTimer(timer.id)}
                    title="Réinitialiser"
                  >
                    🔄
                  </button>

                  <button
                    className="btn-control btn-delete"
                    onClick={() => removeTimer(timer.id)}
                    title="Supprimer"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              {/* Barre de progression */}
              <div className="progress-bar-container">
                <div
                  className="progress-bar-fill"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: getBarColor(timer.remaining, timer.duration),
                    transition: timer.isRunning ? 'width 1s linear' : 'width 0.3s',
                  }}
                >
                  {isFinished && (
                    <span className="finished-label">✓ Terminé !</span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Message vide */}
      {timers.length === 0 && !showCreateForm && (
        <div className="empty-state-timerbar">
          <div className="empty-icon">📊</div>
          <p>Aucun timer actif</p>
          <p className="hint">Créez un timer ou choisissez un préréglage</p>
        </div>
      )}

      {/* Info */}
      <div className="timerbar-info-box">
        <h3>💡 Astuces</h3>
        <ul>
          <li>✏️ <strong>Nom modifiable</strong> : Cliquez dans le champ pour renommer</li>
          <li>🎨 <strong>Code couleur</strong> : Bleu → Jaune → Orange → Rouge</li>
          <li>⏸️ <strong>Pause</strong> : Interrompez et reprenez à tout moment</li>
          <li>🔔 <strong>Alarme</strong> : Son automatique à la fin</li>
        </ul>
      </div>
    </div>
  )
}

export default TimerBar
