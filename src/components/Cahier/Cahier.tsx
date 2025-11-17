import { useState, useRef, useEffect } from 'react'
import './Cahier.css'

function Cahier() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [text, setText] = useState('')
  const [fontFamily, setFontFamily] = useState('Cursive')
  const [fontSize, setFontSize] = useState(32)
  const [textColor, setTextColor] = useState('#000080')
  const [lineOpacity, setLineOpacity] = useState(1)
  const [showMargin, setShowMargin] = useState(true)

  const fonts = [
    { value: 'Cursive', label: 'Cursive' },
    { value: 'Arial', label: 'Arial' },
    { value: '"Comic Sans MS"', label: 'Comic Sans' },
    { value: 'Georgia', label: 'Georgia' },
    { value: 'Verdana', label: 'Verdana' },
  ]

  // Dessiner les lignes seyes
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height

    // Effacer
    ctx.clearRect(0, 0, width, height)

    // Fond blanc
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)

    // Paramètres seyes
    const lineHeight = 8 // Hauteur d'une grande ligne en pixels
    const smallLineHeight = lineHeight / 4 // Petites lignes
    const marginLeft = showMargin ? 80 : 0

    // Couleur des lignes avec opacité
    const lineColor = `rgba(200, 200, 255, ${lineOpacity})`
    const strongLineColor = `rgba(150, 150, 220, ${lineOpacity})`
    const marginColor = `rgba(255, 150, 150, ${lineOpacity})`

    // Lignes horizontales
    ctx.strokeStyle = lineColor
    ctx.lineWidth = 0.5

    for (let y = 0; y < height; y += lineHeight) {
      // Grande ligne
      ctx.strokeStyle = strongLineColor
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()

      // Petites lignes intermédiaires
      ctx.strokeStyle = lineColor
      ctx.lineWidth = 0.5

      for (let i = 1; i < 4; i++) {
        const yPos = y + i * smallLineHeight
        if (yPos < height) {
          ctx.beginPath()
          ctx.moveTo(0, yPos)
          ctx.lineTo(width, yPos)
          ctx.stroke()
        }
      }
    }

    // Lignes verticales (carreaux)
    ctx.strokeStyle = lineColor
    ctx.lineWidth = 0.5

    for (let x = 0; x < width; x += lineHeight) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
    }

    // Marge
    if (showMargin) {
      ctx.strokeStyle = marginColor
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(marginLeft, 0)
      ctx.lineTo(marginLeft, height)
      ctx.stroke()
    }
  }, [lineOpacity, showMargin])

  const handleExport = () => {
    const canvas = canvasRef.current
    const textarea = textareaRef.current
    if (!canvas || !textarea) return

    // Créer un canvas temporaire pour combiner lignes + texte
    const tempCanvas = document.createElement('canvas')
    tempCanvas.width = canvas.width
    tempCanvas.height = canvas.height
    const tempCtx = tempCanvas.getContext('2d')
    if (!tempCtx) return

    // Dessiner les lignes
    tempCtx.drawImage(canvas, 0, 0)

    // Dessiner le texte
    tempCtx.font = `${fontSize}px ${fontFamily}`
    tempCtx.fillStyle = textColor
    tempCtx.textBaseline = 'top'

    const lines = text.split('\n')
    const lineHeight = 32 // Hauteur de ligne pour le texte
    const marginLeft = showMargin ? 90 : 10

    lines.forEach((line, index) => {
      tempCtx.fillText(line, marginLeft, 10 + index * lineHeight)
    })

    // Télécharger
    const link = document.createElement('a')
    link.download = 'cahier-seyes.png'
    link.href = tempCanvas.toDataURL()
    link.click()
  }

  const handlePrint = () => {
    window.print()
  }

  const clearText = () => {
    setText('')
  }

  return (
    <div className="cahier-app fade-in">
      <h1 className="cahier-title">📓 Cahier Seyes</h1>
      <p className="cahier-subtitle">Cahier avec lignes réglées françaises</p>

      {/* Barre d'outils */}
      <div className="cahier-toolbar">
        <div className="toolbar-group">
          <label>Police :</label>
          <select value={fontFamily} onChange={e => setFontFamily(e.target.value)}>
            {fonts.map(font => (
              <option key={font.value} value={font.value}>{font.label}</option>
            ))}
          </select>
        </div>

        <div className="toolbar-group">
          <label>Taille :</label>
          <input
            type="range"
            min="20"
            max="48"
            value={fontSize}
            onChange={e => setFontSize(Number(e.target.value))}
          />
          <span>{fontSize}px</span>
        </div>

        <div className="toolbar-group">
          <label>Couleur :</label>
          <input
            type="color"
            value={textColor}
            onChange={e => setTextColor(e.target.value)}
          />
        </div>

        <div className="toolbar-group">
          <label>Opacité lignes :</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={lineOpacity}
            onChange={e => setLineOpacity(Number(e.target.value))}
          />
        </div>

        <div className="toolbar-group">
          <label>
            <input
              type="checkbox"
              checked={showMargin}
              onChange={e => setShowMargin(e.target.checked)}
            />
            Afficher marge
          </label>
        </div>
      </div>

      {/* Actions */}
      <div className="cahier-actions">
        <button className="btn-action" onClick={handleExport}>
          💾 Exporter en image
        </button>
        <button className="btn-action" onClick={handlePrint}>
          🖨️ Imprimer
        </button>
        <button className="btn-action btn-clear" onClick={clearText}>
          🗑️ Effacer le texte
        </button>
      </div>

      {/* Zone de cahier */}
      <div className="cahier-container">
        <canvas
          ref={canvasRef}
          width={800}
          height={1000}
          className="cahier-canvas"
        />
        <textarea
          ref={textareaRef}
          value={text}
          onChange={e => setText(e.target.value)}
          className="cahier-textarea"
          style={{
            fontFamily: fontFamily,
            fontSize: `${fontSize}px`,
            color: textColor,
            paddingLeft: showMargin ? '90px' : '10px',
            lineHeight: `${fontSize}px`,
          }}
          placeholder="Écrivez ici..."
          spellCheck={true}
        />
      </div>

      {/* Informations */}
      <div className="cahier-info">
        <h3>💡 Utilisation</h3>
        <ul>
          <li>✏️ <strong>Écrivez</strong> directement dans la zone de texte</li>
          <li>🎨 <strong>Personnalisez</strong> la police, taille et couleur</li>
          <li>📏 <strong>Lignes seyes</strong> authentiques pour l'apprentissage</li>
          <li>💾 <strong>Exportez</strong> en image ou imprimez</li>
          <li>📐 <strong>Marge</strong> rouge désactivable</li>
        </ul>

        <h3>📚 Idéal pour :</h3>
        <ul>
          <li>Exercices d'écriture cursive</li>
          <li>Modèles de copie pour élèves</li>
          <li>Devoirs à imprimer</li>
          <li>Projection au tableau</li>
        </ul>
      </div>
    </div>
  )
}

export default Cahier
