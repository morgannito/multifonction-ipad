import { useState, useEffect } from 'react'
import './Points.css'

interface Team {
  id: string
  name: string
  points: number
  color: string
}

const defaultTeams: Team[] = [
  { id: '1', name: 'Équipe Rouge', points: 0, color: '#ef4444' },
  { id: '2', name: 'Équipe Bleue', points: 0, color: '#3b82f6' },
  { id: '3', name: 'Équipe Verte', points: 0, color: '#10b981' },
  { id: '4', name: 'Équipe Jaune', points: 0, color: '#f59e0b' },
]

export default function Points() {
  const [teams, setTeams] = useState<Team[]>(() => {
    const saved = localStorage.getItem('teams-points')
    return saved ? JSON.parse(saved) : defaultTeams
  })
  const [showWinner, setShowWinner] = useState(false)

  useEffect(() => {
    localStorage.setItem('teams-points', JSON.stringify(teams))
  }, [teams])

  const addPoints = (teamId: string, amount: number) => {
    setTeams(teams.map(team =>
      team.id === teamId
        ? { ...team, points: Math.max(0, team.points + amount) }
        : team
    ))
  }

  const setPoints = (teamId: string, points: number) => {
    setTeams(teams.map(team =>
      team.id === teamId
        ? { ...team, points: Math.max(0, points) }
        : team
    ))
  }

  const resetAllPoints = () => {
    if (confirm('Réinitialiser tous les points à 0 ?')) {
      setTeams(teams.map(team => ({ ...team, points: 0 })))
      setShowWinner(false)
    }
  }

  const editTeamName = (teamId: string, newName: string) => {
    setTeams(teams.map(team =>
      team.id === teamId
        ? { ...team, name: newName }
        : team
    ))
  }

  const getSortedTeams = () => {
    return [...teams].sort((a, b) => b.points - a.points)
  }

  const getMaxPoints = () => {
    return Math.max(...teams.map(t => t.points), 1)
  }

  const celebrateWinner = () => {
    setShowWinner(true)
    setTimeout(() => setShowWinner(false), 5000)
  }

  const sortedTeams = getSortedTeams()
  const winner = sortedTeams[0]
  const maxPoints = getMaxPoints()

  return (
    <div className="points-container">
      <div className="points-header">
        <h2>🏆 Système de Points par Équipe</h2>
        <p>Gérez les scores de vos équipes en temps réel</p>
      </div>

      {showWinner && winner.points > 0 && (
        <div className="points-winner-overlay">
          <div className="points-winner-content">
            <div className="points-trophy">🏆</div>
            <div className="points-winner-title">Félicitations !</div>
            <div
              className="points-winner-name"
              style={{ color: winner.color }}
            >
              {winner.name}
            </div>
            <div className="points-winner-score">{winner.points} points</div>
          </div>
        </div>
      )}

      <div className="points-leaderboard">
        <div className="points-podium">
          {sortedTeams.slice(0, 3).map((team, index) => (
            <div
              key={team.id}
              className={`points-podium-item points-podium-${index + 1}`}
            >
              <div className="points-podium-rank">
                {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
              </div>
              <div
                className="points-podium-team"
                style={{ backgroundColor: team.color }}
              >
                <div className="points-podium-name">{team.name}</div>
                <div className="points-podium-score">{team.points}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="points-teams">
          {teams.map((team) => {
            const percentage = (team.points / maxPoints) * 100

            return (
              <div key={team.id} className="points-team">
                <div className="points-team-header">
                  <input
                    type="text"
                    value={team.name}
                    onChange={e => editTeamName(team.id, e.target.value)}
                    className="points-team-name"
                    style={{ color: team.color }}
                  />
                  <div className="points-team-score">{team.points} pts</div>
                </div>

                <div className="points-team-bar-container">
                  <div
                    className="points-team-bar"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: team.color
                    }}
                  >
                    <div className="points-team-bar-shine" />
                  </div>
                </div>

                <div className="points-team-controls">
                  <button
                    className="points-btn points-btn-minus-big"
                    onClick={() => addPoints(team.id, -10)}
                  >
                    -10
                  </button>
                  <button
                    className="points-btn points-btn-minus"
                    onClick={() => addPoints(team.id, -1)}
                  >
                    -1
                  </button>
                  <input
                    type="number"
                    value={team.points}
                    onChange={e => setPoints(team.id, parseInt(e.target.value) || 0)}
                    className="points-team-input"
                    min="0"
                  />
                  <button
                    className="points-btn points-btn-plus"
                    onClick={() => addPoints(team.id, 1)}
                  >
                    +1
                  </button>
                  <button
                    className="points-btn points-btn-plus-big"
                    onClick={() => addPoints(team.id, 10)}
                  >
                    +10
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="points-actions">
        <button className="points-action-btn points-celebrate-btn" onClick={celebrateWinner}>
          🎉 Annoncer le gagnant
        </button>
        <button className="points-action-btn points-reset-btn" onClick={resetAllPoints}>
          🔄 Réinitialiser tout
        </button>
      </div>

      <div className="points-stats">
        <div className="points-stat">
          <div className="points-stat-label">Total des points</div>
          <div className="points-stat-value">
            {teams.reduce((sum, team) => sum + team.points, 0)}
          </div>
        </div>
        <div className="points-stat">
          <div className="points-stat-label">En tête</div>
          <div className="points-stat-value" style={{ color: winner.color }}>
            {winner.name}
          </div>
        </div>
        <div className="points-stat">
          <div className="points-stat-label">Écart</div>
          <div className="points-stat-value">
            {sortedTeams.length > 1 ? sortedTeams[0].points - sortedTeams[1].points : 0} pts
          </div>
        </div>
      </div>
    </div>
  )
}
