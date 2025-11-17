import { useState } from 'react'
import { useTimers, Timer as TimerType } from '../../hooks/useTimers'
import './Timer.css'

interface TimerCardProps {
  timer: TimerType
  onStart: () => void
  onPause: () => void
  onReset: () => void
  onRemove: () => void
  onTogglePin: () => void
  onUpdateName: (name: string) => void
}

function TimerCard({
  timer,
  onStart,
  onPause,
  onReset,
  onRemove,
  onTogglePin,
  onUpdateName,
}: TimerCardProps) {
  const [isEditingName, setIsEditingName] = useState(false)
  const [editName, setEditName] = useState(timer.name)

  const minutes = Math.floor(timer.remaining / 60)
  const seconds = timer.remaining % 60
  const totalMinutes = Math.floor(timer.duration / 60)

  // Calculer le pourcentage pour le cercle
  const percentage = (timer.remaining / timer.duration) * 100
  const circumference = 2 * Math.PI * 90 // rayon de 90
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  // Couleur selon le temps restant
  const getColor = () => {
    if (timer.remaining === 0) return '#ef4444' // Rouge - Terminé
    if (percentage < 20) return '#f97316' // Orange - Urgent
    if (percentage < 50) return '#eab308' // Jaune - Attention
    return '#3b82f6' // Bleu - OK
  }

  const handleSaveName = () => {
    if (editName.trim()) {
      onUpdateName(editName.trim())
    }
    setIsEditingName(false)
  }

  const isFinished = timer.remaining === 0

  return (
    <div className={`timer-card ${timer.isPinned ? 'pinned' : ''} ${isFinished ? 'finished' : ''}`}>
      {/* Header avec nom et bouton épingler */}
      <div className="timer-header">
        {isEditingName ? (
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onBlur={handleSaveName}
            onKeyPress={(e) => e.key === 'Enter' && handleSaveName()}
            className="timer-name-input"
            autoFocus
            maxLength={20}
          />
        ) : (
          <h3
            className="timer-name"
            onClick={() => setIsEditingName(true)}
            title="Cliquer pour modifier"
          >
            {timer.name}
          </h3>
        )}

        <button
          className={`btn-pin ${timer.isPinned ? 'active' : ''}`}
          onClick={onTogglePin}
          title={timer.isPinned ? 'Désépingler' : 'Épingler'}
        >
          📌
        </button>
      </div>

      {/* Horloge circulaire */}
      <div className="timer-clock">
        <svg width="200" height="200" viewBox="0 0 200 200">
          {/* Cercle de fond */}
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="var(--border)"
            strokeWidth="8"
          />

          {/* Cercle de progression */}
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke={getColor()}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 100 100)"
            className="timer-progress"
          />
        </svg>

        {/* Affichage du temps */}
        <div className="timer-display">
          <div className="timer-time" style={{ color: getColor() }}>
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          <div className="timer-total">/ {totalMinutes} min</div>
        </div>

        {/* Animation de fin */}
        {isFinished && <div className="timer-finished-badge">✓ Terminé !</div>}
      </div>

      {/* Boutons de contrôle */}
      <div className="timer-controls">
        {!timer.isRunning ? (
          <button
            className="btn-timer btn-start"
            onClick={onStart}
            disabled={isFinished}
          >
            ▶️ Démarrer
          </button>
        ) : (
          <button className="btn-timer btn-pause" onClick={onPause}>
            ⏸️ Pause
          </button>
        )}

        <button className="btn-timer btn-reset" onClick={onReset}>
          🔄 Reset
        </button>

        <button className="btn-timer btn-remove" onClick={onRemove}>
          🗑️ Supprimer
        </button>
      </div>
    </div>
  )
}

function Timer() {
  const {
    timers,
    addTimer,
    removeTimer,
    startTimer,
    pauseTimer,
    resetTimer,
    togglePin,
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
    { label: '45 min', value: 45 },
    { label: '60 min', value: 60 },
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

  // Séparer les timers épinglés et non-épinglés
  const pinnedTimers = timers.filter((t) => t.isPinned)
  const unpinnedTimers = timers.filter((t) => !t.isPinned)

  return (
    <div className="timer-app fade-in">
      <h1 className="timer-app-title">⏱️ Timers</h1>
      <p className="timer-app-subtitle">
        Gérez plusieurs timers pour vos différents groupes d'élèves
      </p>

      {/* Bouton d'ajout rapide */}
      <div className="timer-actions">
        <button
          className="btn-create-timer"
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          ➕ Nouveau Timer
        </button>
      </div>

      {/* Formulaire de création */}
      {showCreateForm && (
        <div className="create-timer-form">
          <h3>Créer un nouveau timer</h3>

          <div className="form-group">
            <label>Nom du timer (optionnel) :</label>
            <input
              type="text"
              value={newTimerName}
              onChange={(e) => setNewTimerName(e.target.value)}
              placeholder="Ex: Groupe A, Exercice 1..."
              maxLength={20}
            />
          </div>

          <div className="form-group">
            <label>Durée :</label>
            <div className="duration-input">
              <input
                type="number"
                value={newTimerDuration}
                onChange={(e) => setNewTimerDuration(Number(e.target.value))}
                min={1}
                max={120}
              />
              <span>minutes</span>
            </div>
          </div>

          <div className="form-group">
            <label>Ou choisir un préréglage :</label>
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
              Créer le Timer
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
            {presets.slice(0, 6).map((preset) => (
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

      {/* Timers épinglés */}
      {pinnedTimers.length > 0 && (
        <div className="timers-section">
          <h2 className="section-title">📌 Timers épinglés</h2>
          <div className="timers-grid">
            {pinnedTimers.map((timer) => (
              <TimerCard
                key={timer.id}
                timer={timer}
                onStart={() => startTimer(timer.id)}
                onPause={() => pauseTimer(timer.id)}
                onReset={() => resetTimer(timer.id)}
                onRemove={() => removeTimer(timer.id)}
                onTogglePin={() => togglePin(timer.id)}
                onUpdateName={(name) => updateTimerName(timer.id, name)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Timers non-épinglés */}
      {unpinnedTimers.length > 0 && (
        <div className="timers-section">
          <h2 className="section-title">Tous les timers</h2>
          <div className="timers-grid">
            {unpinnedTimers.map((timer) => (
              <TimerCard
                key={timer.id}
                timer={timer}
                onStart={() => startTimer(timer.id)}
                onPause={() => pauseTimer(timer.id)}
                onReset={() => resetTimer(timer.id)}
                onRemove={() => removeTimer(timer.id)}
                onTogglePin={() => togglePin(timer.id)}
                onUpdateName={(name) => updateTimerName(timer.id, name)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Message si aucun timer */}
      {timers.length === 0 && !showCreateForm && (
        <div className="empty-state-timer">
          <div className="empty-icon">⏱️</div>
          <p>Aucun timer actif</p>
          <p className="hint">Créez un nouveau timer ou choisissez un préréglage ci-dessus</p>
        </div>
      )}

      {/* Informations */}
      <div className="timer-info">
        <h3>💡 Astuces</h3>
        <ul>
          <li>📌 <strong>Épinglez</strong> les timers importants pour les garder en haut</li>
          <li>✏️ <strong>Cliquez sur le nom</strong> pour le modifier</li>
          <li>⏸️ <strong>Mettez en pause</strong> à tout moment</li>
          <li>🔔 <strong>Alarme sonore</strong> automatique à la fin</li>
          <li>🔄 <strong>Réinitialisez</strong> pour relancer un timer</li>
        </ul>
      </div>
    </div>
  )
}

export default Timer
