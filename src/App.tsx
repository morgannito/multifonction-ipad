import { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import SoundMeter from './components/SoundMeter/SoundMeter'

export type MiniApp = 'soundmeter' | null

interface AppInfo {
  id: MiniApp
  name: string
  icon: string
  description: string
}

const apps: AppInfo[] = [
  {
    id: 'soundmeter',
    name: 'Sonomètre',
    icon: '🔊',
    description: 'Mesure le niveau sonore en classe',
  },
]

function App() {
  const [selectedApp, setSelectedApp] = useState<MiniApp>(null)

  const renderApp = () => {
    switch (selectedApp) {
      case 'soundmeter':
        return <SoundMeter />
      default:
        return (
          <div className="empty-state">
            <div className="empty-icon">📱</div>
            <h2>Sélectionnez une application</h2>
            <p>Choisissez une mini-application dans le menu de gauche</p>
          </div>
        )
    }
  }

  return (
    <div className="app">
      <Sidebar
        apps={apps}
        selectedApp={selectedApp}
        onSelectApp={setSelectedApp}
      />
      <main className="main-content">
        {renderApp()}
      </main>
    </div>
  )
}

export default App
