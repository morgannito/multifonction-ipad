import { MiniApp } from '../App'
import './Sidebar.css'

interface AppInfo {
  id: MiniApp
  name: string
  icon: string
  description: string
}

interface SidebarProps {
  apps: AppInfo[]
  selectedApp: MiniApp
  onSelectApp: (app: MiniApp) => void
}

function Sidebar({ apps, selectedApp, onSelectApp }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-title">Multi-Fonction</h1>
        <p className="sidebar-subtitle">iPad</p>
      </div>

      <nav className="sidebar-nav">
        {apps.map((app) => (
          <button
            key={app.id}
            className={`sidebar-item ${selectedApp === app.id ? 'active' : ''}`}
            onClick={() => onSelectApp(app.id)}
          >
            <span className="sidebar-icon">{app.icon}</span>
            <div className="sidebar-text">
              <div className="sidebar-name">{app.name}</div>
              <div className="sidebar-description">{app.description}</div>
            </div>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <p>v1.0.0</p>
      </div>
    </aside>
  )
}

export default Sidebar
