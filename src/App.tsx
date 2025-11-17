import { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import SoundMeter from './components/SoundMeter/SoundMeter'
import Timer from './components/Timer/Timer'
import TimerBar from './components/TimerBar/TimerBar'
import Pictos from './components/Pictos/Pictos'
import Counter from './components/Counter/Counter'
import Frises from './components/Frises/Frises'
import Sac from './components/Sac/Sac'
import Eleves from './components/Eleves/Eleves'
import Notes from './components/Notes/Notes'

export type MiniApp = 'soundmeter' | 'timer' | 'timerbar' | 'pictos' | 'counter' | 'frises' | 'sac' | 'eleves' | 'notes' | null

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
  {
    id: 'timer',
    name: 'Timers',
    icon: '⏱️',
    description: 'Timers avec horloge circulaire',
  },
  {
    id: 'timerbar',
    name: 'Timer Bar',
    icon: '📊',
    description: 'Timers en barre de progression',
  },
  {
    id: 'pictos',
    name: 'Pictogrammes',
    icon: '🎨',
    description: 'Modalités de travail visuelles',
  },
  {
    id: 'counter',
    name: 'Générateur',
    icon: '🎲',
    description: 'Tirage au sort de nombres',
  },
  {
    id: 'frises',
    name: 'Frises',
    icon: '📐',
    description: 'Modèles de frises',
  },
  {
    id: 'sac',
    name: 'Affaires',
    icon: '🎒',
    description: 'Liste des objets requis',
  },
  {
    id: 'eleves',
    name: 'Élèves',
    icon: '👨‍🎓',
    description: 'Gestion et tirage au sort',
  },
  {
    id: 'notes',
    name: 'Notes',
    icon: '📝',
    description: 'Pense-bête pour la classe',
  },
]

function App() {
  const [selectedApp, setSelectedApp] = useState<MiniApp>(null)

  const renderApp = () => {
    switch (selectedApp) {
      case 'soundmeter':
        return <SoundMeter />
      case 'timer':
        return <Timer />
      case 'timerbar':
        return <TimerBar />
      case 'pictos':
        return <Pictos />
      case 'counter':
        return <Counter />
      case 'frises':
        return <Frises />
      case 'sac':
        return <Sac />
      case 'eleves':
        return <Eleves />
      case 'notes':
        return <Notes />
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
