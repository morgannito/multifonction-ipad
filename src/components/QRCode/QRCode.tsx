import { useState, useRef } from 'react'
import './QRCode.css'

type QRType = 'url' | 'text' | 'wifi'

export default function QRCodeGenerator() {
  const [qrType, setQrType] = useState<QRType>('url')
  const [urlInput, setUrlInput] = useState('')
  const [textInput, setTextInput] = useState('')
  const [wifiSSID, setWifiSSID] = useState('')
  const [wifiPassword, setWifiPassword] = useState('')
  const [wifiSecurity, setWifiSecurity] = useState<'WPA' | 'WEP' | 'nopass'>('WPA')
  const [qrSize, setQrSize] = useState(300)
  const [generatedData, setGeneratedData] = useState('')
  const [showQR, setShowQR] = useState(false)
  const qrImageRef = useRef<HTMLImageElement>(null)

  const generateQRData = () => {
    let data = ''

    switch (qrType) {
      case 'url':
        if (!urlInput.trim()) {
          alert('Veuillez entrer une URL')
          return
        }
        data = urlInput.trim()
        break

      case 'text':
        if (!textInput.trim()) {
          alert('Veuillez entrer du texte')
          return
        }
        data = textInput.trim()
        break

      case 'wifi':
        if (!wifiSSID.trim()) {
          alert('Veuillez entrer le nom du réseau WiFi')
          return
        }
        // Format: WIFI:T:WPA;S:mynetwork;P:mypassword;;
        data = `WIFI:T:${wifiSecurity};S:${wifiSSID};P:${wifiPassword};;`
        break
    }

    setGeneratedData(data)
    setShowQR(true)
  }

  const getQRCodeURL = () => {
    // Using qrserver.com API - free and reliable
    const encodedData = encodeURIComponent(generatedData)
    return `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodedData}`
  }

  const downloadQR = () => {
    if (!qrImageRef.current) return

    const link = document.createElement('a')
    link.href = getQRCodeURL()
    link.download = `qrcode-${Date.now()}.png`
    link.click()
  }

  const printQR = () => {
    const printWindow = window.open('', '_blank')
    if (!printWindow) return

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>QR Code</title>
          <style>
            body {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              margin: 0;
              font-family: Arial, sans-serif;
            }
            img {
              max-width: 100%;
              height: auto;
            }
            .info {
              margin-top: 20px;
              text-align: center;
              word-break: break-all;
              max-width: 80%;
            }
            @media print {
              body {
                padding: 20px;
              }
            }
          </style>
        </head>
        <body>
          <img src="${getQRCodeURL()}" alt="QR Code" />
          <div class="info">
            <p><strong>Données :</strong> ${generatedData}</p>
          </div>
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
  }

  const resetForm = () => {
    setShowQR(false)
    setGeneratedData('')
    setUrlInput('')
    setTextInput('')
    setWifiSSID('')
    setWifiPassword('')
  }

  return (
    <div className="qrcode-container">
      <div className="qrcode-header">
        <h2>📱 Générateur de QR Code</h2>
        <p>Créez rapidement des QR codes à scanner</p>
      </div>

      <div className="qrcode-content">
        <div className="qrcode-form">
          <div className="qrcode-tabs">
            <button
              className={`qrcode-tab ${qrType === 'url' ? 'active' : ''}`}
              onClick={() => setQrType('url')}
            >
              🔗 URL / Lien
            </button>
            <button
              className={`qrcode-tab ${qrType === 'text' ? 'active' : ''}`}
              onClick={() => setQrType('text')}
            >
              📝 Texte
            </button>
            <button
              className={`qrcode-tab ${qrType === 'wifi' ? 'active' : ''}`}
              onClick={() => setQrType('wifi')}
            >
              📶 WiFi
            </button>
          </div>

          <div className="qrcode-inputs">
            {qrType === 'url' && (
              <div className="qrcode-input-group">
                <label>URL ou lien :</label>
                <input
                  type="url"
                  value={urlInput}
                  onChange={e => setUrlInput(e.target.value)}
                  placeholder="https://example.com"
                />
                <div className="qrcode-hint">
                  Exemples : site web, vidéo YouTube, formulaire Google, etc.
                </div>
              </div>
            )}

            {qrType === 'text' && (
              <div className="qrcode-input-group">
                <label>Texte à encoder :</label>
                <textarea
                  value={textInput}
                  onChange={e => setTextInput(e.target.value)}
                  placeholder="Entrez votre texte ici..."
                  rows={5}
                />
                <div className="qrcode-hint">
                  Le texte sera visible après scan du QR code
                </div>
              </div>
            )}

            {qrType === 'wifi' && (
              <>
                <div className="qrcode-input-group">
                  <label>Nom du réseau (SSID) :</label>
                  <input
                    type="text"
                    value={wifiSSID}
                    onChange={e => setWifiSSID(e.target.value)}
                    placeholder="MonWiFi"
                  />
                </div>

                <div className="qrcode-input-group">
                  <label>Mot de passe :</label>
                  <input
                    type="text"
                    value={wifiPassword}
                    onChange={e => setWifiPassword(e.target.value)}
                    placeholder="motdepasse123"
                  />
                </div>

                <div className="qrcode-input-group">
                  <label>Type de sécurité :</label>
                  <select
                    value={wifiSecurity}
                    onChange={e => setWifiSecurity(e.target.value as 'WPA' | 'WEP' | 'nopass')}
                  >
                    <option value="WPA">WPA/WPA2</option>
                    <option value="WEP">WEP</option>
                    <option value="nopass">Aucune (réseau ouvert)</option>
                  </select>
                </div>

                <div className="qrcode-hint">
                  Scanner ce QR code permettra de se connecter automatiquement au WiFi
                </div>
              </>
            )}

            <div className="qrcode-input-group">
              <label>Taille du QR code : {qrSize}px</label>
              <input
                type="range"
                min="150"
                max="500"
                step="50"
                value={qrSize}
                onChange={e => setQrSize(parseInt(e.target.value))}
              />
            </div>

            <button className="qrcode-generate-btn" onClick={generateQRData}>
              ✨ Générer le QR Code
            </button>
          </div>
        </div>

        <div className="qrcode-result">
          {!showQR ? (
            <div className="qrcode-placeholder">
              <div className="qrcode-placeholder-icon">📱</div>
              <div className="qrcode-placeholder-text">
                Configurez et générez votre QR code
              </div>
            </div>
          ) : (
            <div className="qrcode-display">
              <div className="qrcode-image-container">
                <img
                  ref={qrImageRef}
                  src={getQRCodeURL()}
                  alt="QR Code"
                  className="qrcode-image"
                />
              </div>

              <div className="qrcode-data">
                <div className="qrcode-data-label">Données encodées :</div>
                <div className="qrcode-data-text">{generatedData}</div>
              </div>

              <div className="qrcode-actions">
                <button className="qrcode-action-btn" onClick={downloadQR}>
                  💾 Télécharger PNG
                </button>
                <button className="qrcode-action-btn" onClick={printQR}>
                  🖨️ Imprimer
                </button>
                <button className="qrcode-action-btn qrcode-reset-btn" onClick={resetForm}>
                  🔄 Nouveau QR Code
                </button>
              </div>

              <div className="qrcode-tips">
                <div className="qrcode-tip">
                  💡 <strong>Astuce :</strong> Testez le QR code avec votre téléphone avant de l'imprimer
                </div>
                <div className="qrcode-tip">
                  📏 <strong>Impression :</strong> Pour une lecture optimale, imprimez au minimum 3x3 cm
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="qrcode-examples">
        <h3>💡 Idées d'utilisation en classe</h3>
        <div className="qrcode-examples-grid">
          <div className="qrcode-example">
            <div className="qrcode-example-icon">🔗</div>
            <div className="qrcode-example-title">Ressources en ligne</div>
            <div className="qrcode-example-desc">
              Partagez des liens vers exercices, vidéos ou documents
            </div>
          </div>
          <div className="qrcode-example">
            <div className="qrcode-example-icon">📝</div>
            <div className="qrcode-example-title">Instructions</div>
            <div className="qrcode-example-desc">
              Consignes d'activité, codes d'accès, messages
            </div>
          </div>
          <div className="qrcode-example">
            <div className="qrcode-example-icon">📶</div>
            <div className="qrcode-example-title">WiFi de classe</div>
            <div className="qrcode-example-desc">
              Connexion rapide au WiFi pour les élèves
            </div>
          </div>
          <div className="qrcode-example">
            <div className="qrcode-example-icon">🎮</div>
            <div className="qrcode-example-title">Jeux pédagogiques</div>
            <div className="qrcode-example-desc">
              Liens vers quiz, Kahoot, LearningApps...
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
