import { useState, useEffect } from 'react'
import './Planning.css'

interface Activity {
  id: string
  name: string
  startTime: string // HH:MM
  endTime: string // HH:MM
  color: string
  category: string
}

const activityColors = {
  'Français': '#3b82f6',
  'Mathématiques': '#10b981',
  'Histoire/Géo': '#f59e0b',
  'Sciences': '#8b5cf6',
  'Arts': '#ec4899',
  'Sport': '#ef4444',
  'Récréation': '#84cc16',
  'Autre': '#6b7280'
}

const defaultActivities: Activity[] = [
  { id: '1', name: 'Accueil', startTime: '08:30', endTime: '08:45', color: activityColors['Autre'], category: 'Autre' },
  { id: '2', name: 'Français - Lecture', startTime: '08:45', endTime: '09:45', color: activityColors['Français'], category: 'Français' },
  { id: '3', name: 'Mathématiques', startTime: '09:45', endTime: '10:30', color: activityColors['Mathématiques'], category: 'Mathématiques' },
  { id: '4', name: 'Récréation', startTime: '10:30', endTime: '10:45', color: activityColors['Récréation'], category: 'Récréation' },
  { id: '5', name: 'Français - Grammaire', startTime: '10:45', endTime: '11:45', color: activityColors['Français'], category: 'Français' },
  { id: '6', name: 'Pause déjeuner', startTime: '11:45', endTime: '13:30', color: activityColors['Récréation'], category: 'Récréation' },
  { id: '7', name: 'Sciences', startTime: '13:30', endTime: '14:30', color: activityColors['Sciences'], category: 'Sciences' },
  { id: '8', name: 'Arts plastiques', startTime: '14:30', endTime: '15:15', color: activityColors['Arts'], category: 'Arts' },
  { id: '9', name: 'Récréation', startTime: '15:15', endTime: '15:30', color: activityColors['Récréation'], category: 'Récréation' },
  { id: '10', name: 'Sport', startTime: '15:30', endTime: '16:30', color: activityColors['Sport'], category: 'Sport' },
]

export default function Planning() {
  const [activities, setActivities] = useState<Activity[]>(defaultActivities)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showAddForm, setShowAddForm] = useState(false)
  const [newActivity, setNewActivity] = useState({
    name: '',
    startTime: '',
    endTime: '',
    category: 'Autre' as keyof typeof activityColors
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [])

  const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number)
    return hours * 60 + minutes
  }

  const getCurrentActivity = (): Activity | null => {
    const now = currentTime.getHours() * 60 + currentTime.getMinutes()
    return activities.find(activity => {
      const start = timeToMinutes(activity.startTime)
      const end = timeToMinutes(activity.endTime)
      return now >= start && now < end
    }) || null
  }

  const getNextActivity = (): Activity | null => {
    const now = currentTime.getHours() * 60 + currentTime.getMinutes()
    return activities.find(activity => {
      const start = timeToMinutes(activity.startTime)
      return now < start
    }) || null
  }

  const getTimePosition = (time: string): number => {
    const minutes = timeToMinutes(time)
    const startDay = 8 * 60 // 8:00
    const endDay = 17 * 60 // 17:00
    const dayDuration = endDay - startDay
    return ((minutes - startDay) / dayDuration) * 100
  }

  const getCurrentTimePosition = (): number => {
    const now = currentTime.getHours() * 60 + currentTime.getMinutes()
    const startDay = 8 * 60
    const endDay = 17 * 60
    const dayDuration = endDay - startDay
    return ((now - startDay) / dayDuration) * 100
  }

  const addActivity = () => {
    if (!newActivity.name || !newActivity.startTime || !newActivity.endTime) {
      alert('Veuillez remplir tous les champs')
      return
    }

    const activity: Activity = {
      id: Date.now().toString(),
      name: newActivity.name,
      startTime: newActivity.startTime,
      endTime: newActivity.endTime,
      color: activityColors[newActivity.category],
      category: newActivity.category
    }

    setActivities([...activities, activity].sort((a, b) =>
      timeToMinutes(a.startTime) - timeToMinutes(b.startTime)
    ))

    setNewActivity({ name: '', startTime: '', endTime: '', category: 'Autre' })
    setShowAddForm(false)
  }

  const removeActivity = (id: string) => {
    setActivities(activities.filter(a => a.id !== id))
  }

  const currentActivity = getCurrentActivity()
  const nextActivity = getNextActivity()
  const currentTimePos = getCurrentTimePosition()
  const isSchoolTime = currentTimePos >= 0 && currentTimePos <= 100

  return (
    <div className="planning-container">
      <div className="planning-header">
        <h2>📅 Planning de la Journée</h2>
        <p>Emploi du temps visuel avec indicateur temps réel</p>
      </div>

      <div className="planning-status">
        <div className="planning-clock">
          🕐 {currentTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
        </div>

        {currentActivity && (
          <div className="planning-current" style={{ borderColor: currentActivity.color }}>
            <div className="planning-current-label">En cours :</div>
            <div className="planning-current-name">{currentActivity.name}</div>
            <div className="planning-current-time">
              {currentActivity.startTime} - {currentActivity.endTime}
            </div>
          </div>
        )}

        {!currentActivity && nextActivity && (
          <div className="planning-next">
            <div className="planning-next-label">Prochain :</div>
            <div className="planning-next-name">{nextActivity.name}</div>
            <div className="planning-next-time">à {nextActivity.startTime}</div>
          </div>
        )}

        {!currentActivity && !nextActivity && (
          <div className="planning-done">
            <div className="planning-done-label">✅ Journée terminée !</div>
          </div>
        )}
      </div>

      <div className="planning-timeline">
        <div className="planning-timeline-hours">
          {[8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map(hour => (
            <div key={hour} className="planning-hour-mark">
              <div className="planning-hour-line" />
              <div className="planning-hour-label">{hour}:00</div>
            </div>
          ))}
        </div>

        <div className="planning-activities">
          {activities.map(activity => {
            const startPos = getTimePosition(activity.startTime)
            const endPos = getTimePosition(activity.endTime)
            const width = endPos - startPos

            return (
              <div
                key={activity.id}
                className="planning-activity"
                style={{
                  left: `${startPos}%`,
                  width: `${width}%`,
                  backgroundColor: activity.color
                }}
              >
                <div className="planning-activity-name">{activity.name}</div>
                <div className="planning-activity-time">
                  {activity.startTime} - {activity.endTime}
                </div>
                <button
                  className="planning-activity-remove"
                  onClick={() => removeActivity(activity.id)}
                  title="Supprimer"
                >
                  ×
                </button>
              </div>
            )
          })}

          {isSchoolTime && (
            <div
              className="planning-now-indicator"
              style={{ left: `${currentTimePos}%` }}
            >
              <div className="planning-now-line" />
              <div className="planning-now-label">Maintenant</div>
            </div>
          )}
        </div>
      </div>

      <div className="planning-controls">
        <button
          className="planning-add-btn"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? '❌ Annuler' : '➕ Ajouter une activité'}
        </button>

        {showAddForm && (
          <div className="planning-add-form">
            <input
              type="text"
              placeholder="Nom de l'activité"
              value={newActivity.name}
              onChange={e => setNewActivity({ ...newActivity, name: e.target.value })}
            />
            <input
              type="time"
              value={newActivity.startTime}
              onChange={e => setNewActivity({ ...newActivity, startTime: e.target.value })}
            />
            <input
              type="time"
              value={newActivity.endTime}
              onChange={e => setNewActivity({ ...newActivity, endTime: e.target.value })}
            />
            <select
              value={newActivity.category}
              onChange={e => setNewActivity({ ...newActivity, category: e.target.value as keyof typeof activityColors })}
            >
              {Object.keys(activityColors).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <button onClick={addActivity}>✅ Ajouter</button>
          </div>
        )}
      </div>

      <div className="planning-legend">
        <h3>Légende</h3>
        <div className="planning-legend-items">
          {Object.entries(activityColors).map(([category, color]) => (
            <div key={category} className="planning-legend-item">
              <div className="planning-legend-color" style={{ backgroundColor: color }} />
              <span>{category}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
