import { useState, useRef, useEffect } from 'react'
import './Roue.css'

interface Segment {
  id: string
  text: string
  color: string
}

const defaultColors = [
  '#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6',
  '#ec4899', '#f97316', '#84cc16', '#06b6d4', '#6366f1'
]

export default function Roue() {
  const [segments, setSegments] = useState<Segment[]>([
    { id: '1', text: 'Élève 1', color: defaultColors[0] },
    { id: '2', text: 'Élève 2', color: defaultColors[1] },
    { id: '3', text: 'Élève 3', color: defaultColors[2] },
    { id: '4', text: 'Élève 4', color: defaultColors[3] },
    { id: '5', text: 'Élève 5', color: defaultColors[4] },
    { id: '6', text: 'Élève 6', color: defaultColors[5] },
  ])
  const [newSegmentText, setNewSegmentText] = useState('')
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [winner, setWinner] = useState<string | null>(null)
  const [history, setHistory] = useState<string[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)

  const drawWheel = () => {
    const canvas = canvasRef.current
    if (!canvas || segments.length === 0) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 10

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.save()
    ctx.translate(centerX, centerY)
    ctx.rotate((rotation * Math.PI) / 180)

    const anglePerSegment = (2 * Math.PI) / segments.length

    segments.forEach((segment, i) => {
      const startAngle = i * anglePerSegment
      const endAngle = startAngle + anglePerSegment

      // Draw segment
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.arc(0, 0, radius, startAngle, endAngle)
      ctx.closePath()
      ctx.fillStyle = segment.color
      ctx.fill()
      ctx.strokeStyle = '#fff'
      ctx.lineWidth = 3
      ctx.stroke()

      // Draw text
      ctx.save()
      ctx.rotate(startAngle + anglePerSegment / 2)
      ctx.textAlign = 'center'
      ctx.fillStyle = '#fff'
      ctx.font = 'bold 16px Arial'
      ctx.shadowColor = 'rgba(0,0,0,0.5)'
      ctx.shadowBlur = 4
      ctx.fillText(segment.text, radius * 0.65, 5)
      ctx.restore()
    })

    ctx.restore()

    // Draw center circle
    ctx.beginPath()
    ctx.arc(centerX, centerY, 20, 0, 2 * Math.PI)
    ctx.fillStyle = '#1f2937'
    ctx.fill()
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 3
    ctx.stroke()

    // Draw pointer (triangle at top)
    ctx.beginPath()
    ctx.moveTo(centerX, 10)
    ctx.lineTo(centerX - 15, 40)
    ctx.lineTo(centerX + 15, 40)
    ctx.closePath()
    ctx.fillStyle = '#ef4444'
    ctx.fill()
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 2
    ctx.stroke()
  }

  useEffect(() => {
    drawWheel()
  }, [segments, rotation])

  const playTickSound = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext()
    }
    const ctx = audioContextRef.current
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.frequency.value = 800
    oscillator.type = 'square'

    gainNode.gain.setValueAtTime(0.1, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.05)
  }

  const spinWheel = () => {
    if (isSpinning || segments.length === 0) return

    setIsSpinning(true)
    setWinner(null)

    const spins = 5 + Math.random() * 3 // 5-8 tours
    const extraDegrees = Math.random() * 360
    const totalRotation = spins * 360 + extraDegrees
    const duration = 4000 // 4 secondes

    const startTime = Date.now()
    const startRotation = rotation

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const currentRotation = startRotation + totalRotation * easeOut

      setRotation(currentRotation % 360)

      // Play tick sound every 30 degrees
      if (Math.floor(currentRotation / 30) > Math.floor((startRotation + totalRotation * Math.max(0, easeOut - 0.01)) / 30)) {
        playTickSound()
      }

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        // Determine winner
        const finalRotation = currentRotation % 360
        const anglePerSegment = 360 / segments.length
        // Pointer is at top (0°), so we need to find which segment is under it
        const adjustedRotation = (360 - finalRotation) % 360
        const winnerIndex = Math.floor(adjustedRotation / anglePerSegment) % segments.length
        const winnerText = segments[winnerIndex].text

        setWinner(winnerText)
        setHistory(prev => [winnerText, ...prev.slice(0, 9)])
        setIsSpinning(false)
      }
    }

    requestAnimationFrame(animate)
  }

  const addSegment = () => {
    if (!newSegmentText.trim()) return

    const newSegment: Segment = {
      id: Date.now().toString(),
      text: newSegmentText.trim(),
      color: defaultColors[segments.length % defaultColors.length]
    }

    setSegments([...segments, newSegment])
    setNewSegmentText('')
  }

  const removeSegment = (id: string) => {
    if (segments.length <= 2) {
      alert('La roue doit avoir au moins 2 segments')
      return
    }
    setSegments(segments.filter(s => s.id !== id))
  }

  const editSegment = (id: string, newText: string) => {
    setSegments(segments.map(s => s.id === id ? { ...s, text: newText } : s))
  }

  return (
    <div className="roue-container">
      <div className="roue-header">
        <h2>🎡 Roue de la Fortune</h2>
        <p>Tournez la roue pour un tirage au sort visuel et ludique !</p>
      </div>

      <div className="roue-content">
        <div className="roue-wheel-section">
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            className="roue-canvas"
          />

          <button
            className="roue-spin-btn"
            onClick={spinWheel}
            disabled={isSpinning || segments.length === 0}
          >
            {isSpinning ? '⏳ En cours...' : '🎲 TOURNER'}
          </button>

          {winner && (
            <div className="roue-winner">
              <div className="roue-winner-label">🎉 Résultat :</div>
              <div className="roue-winner-text">{winner}</div>
            </div>
          )}
        </div>

        <div className="roue-controls">
          <div className="roue-section">
            <h3>📝 Segments</h3>
            <div className="roue-add-segment">
              <input
                type="text"
                value={newSegmentText}
                onChange={(e) => setNewSegmentText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addSegment()}
                placeholder="Nouveau segment..."
                maxLength={20}
              />
              <button onClick={addSegment} disabled={!newSegmentText.trim()}>
                ➕ Ajouter
              </button>
            </div>

            <div className="roue-segments-list">
              {segments.map((segment) => (
                <div key={segment.id} className="roue-segment-item">
                  <div
                    className="roue-segment-color"
                    style={{ backgroundColor: segment.color }}
                  />
                  <input
                    type="text"
                    value={segment.text}
                    onChange={(e) => editSegment(segment.id, e.target.value)}
                    maxLength={20}
                  />
                  <button
                    className="roue-remove-btn"
                    onClick={() => removeSegment(segment.id)}
                    title="Supprimer"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          </div>

          {history.length > 0 && (
            <div className="roue-section">
              <h3>📜 Historique</h3>
              <div className="roue-history">
                {history.map((item, index) => (
                  <div key={index} className="roue-history-item">
                    {index + 1}. {item}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
