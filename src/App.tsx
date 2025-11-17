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
import Cahier from './components/Cahier/Cahier'
import Roue from './components/Roue/Roue'
import Planning from './components/Planning/Planning'
import Points from './components/Points/Points'
import Groupes from './components/Groupes/Groupes'
import QRCode from './components/QRCode/QRCode'

export type MiniApp = 'soundmeter' | 'timer' | 'timerbar' | 'pictos' | 'counter' | 'frises' | 'sac' | 'eleves' | 'notes' | 'cahier' | 'roue' | 'planning' | 'points' | 'groupes' | 'qrcode' | null

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
  {
    id: 'cahier',
    name: 'Cahier Seyes',
    icon: '📓',
    description: 'Cahier avec lignes réglées',
  },
  {
    id: 'roue',
    name: 'Roue Fortune',
    icon: '🎡',
    description: 'Roue pour tirage au sort',
  },
  {
    id: 'planning',
    name: 'Planning',
    icon: '📅',
    description: 'Emploi du temps visuel',
  },
  {
    id: 'points',
    name: 'Points Équipes',
    icon: '🏆',
    description: 'Score par équipe',
  },
  {
    id: 'groupes',
    name: 'Groupes',
    icon: '👥',
    description: 'Créer des groupes aléatoires',
  },
  {
    id: 'qrcode',
    name: 'QR Code',
    icon: '📱',
    description: 'Générer des QR codes',
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
      case 'cahier':
        return <Cahier />
      case 'roue':
        return <Roue />
      case 'planning':
        return <Planning />
      case 'points':
        return <Points />
      case 'groupes':
        return <Groupes />
      case 'qrcode':
        return <QRCode />
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
