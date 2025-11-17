import { useState } from 'react'
import './Sac.css'

const defaultItems = [
  { id: '1', name: 'Cahier', icon: '📓', required: true },
  { id: '2', name: 'Trousse', icon: '✏️', required: true },
  { id: '3', name: 'Livre', icon: '📚', required: true },
  { id: '4', name: 'Ardoise', icon: '📝', required: false },
  { id: '5', name: 'Classeur', icon: '📁', required: false },
  { id: '6', name: 'Règle', icon: '📐', required: false },
]

function Sac() {
  const [items, setItems] = useState(defaultItems)
  const [newItem, setNewItem] = useState('')
  const [newIcon, setNewIcon] = useState('📦')

  const icons = ['📓', '📚', '✏️', '📝', '📁', '📐', '🎒', '✂️', '🖍️', '🖊️', '📏', '🧮']

  const toggleRequired = (id: string) => {
    setItems(items.map(item => item.id === id ? {...item, required: !item.required} : item))
  }

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const addItem = () => {
    if (!newItem.trim()) return
    setItems([...items, { id: Date.now().toString(), name: newItem, icon: newIcon, required: true }])
    setNewItem('')
  }

  const requiredItems = items.filter(i => i.required)

  return (
    <div className="sac-app fade-in">
      <h1 className="sac-title">🎒 Affaires à apporter</h1>
      <p className="sac-subtitle">Liste des objets requis pour aujourd'hui</p>

      <div className="required-items-display">
        <h2>Aujourd'hui, il faut :</h2>
        <div className="items-grid-big">
          {requiredItems.map(item => (
            <div key={item.id} className="item-big">
              <div className="item-icon-big">{item.icon}</div>
              <div className="item-name-big">{item.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="manage-section">
        <h3>Gestion des affaires</h3>

        <div className="add-item-form">
          <select value={newIcon} onChange={e => setNewIcon(e.target.value)}>
            {icons.map(icon => (
              <option key={icon} value={icon}>{icon}</option>
            ))}
          </select>
          <input value={newItem} onChange={e => setNewItem(e.target.value)} placeholder="Nom de l'objet" />
          <button onClick={addItem}>➕ Ajouter</button>
        </div>

        <div className="items-list">
          {items.map(item => (
            <div key={item.id} className={`item-row ${item.required ? 'required' : ''}`}>
              <span className="item-icon-small">{item.icon}</span>
              <span className="item-name">{item.name}</span>
              <button onClick={() => toggleRequired(item.id)}>
                {item.required ? '✓ Requis' : '○ Optionnel'}
              </button>
              <button onClick={() => deleteItem(item.id)}>🗑️</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sac
