import { useState, useEffect } from 'react'
import './Notes.css'

interface Note {
  id: string
  title: string
  content: string
  isPinned: boolean
  createdAt: number
}

function Notes() {
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('classroom-notes')
    return saved ? JSON.parse(saved) : []
  })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editContent, setEditContent] = useState('')

  useEffect(() => {
    localStorage.setItem('classroom-notes', JSON.stringify(notes))
  }, [notes])

  const addNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'Nouvelle note',
      content: '',
      isPinned: false,
      createdAt: Date.now(),
    }
    setNotes([newNote, ...notes])
    startEditing(newNote)
  }

  const startEditing = (note: Note) => {
    setEditingId(note.id)
    setEditTitle(note.title)
    setEditContent(note.content)
  }

  const saveNote = () => {
    if (!editingId) return
    setNotes(notes.map(n => n.id === editingId ? {...n, title: editTitle, content: editContent} : n))
    setEditingId(null)
  }

  const deleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id))
  }

  const togglePin = (id: string) => {
    setNotes(notes.map(n => n.id === id ? {...n, isPinned: !n.isPinned} : n))
  }

  const pinnedNotes = notes.filter(n => n.isPinned)
  const unpinnedNotes = notes.filter(n => !n.isPinned)

  return (
    <div className="notes-app fade-in">
      <h1 className="notes-title">📝 Notes</h1>
      <p className="notes-subtitle">Pense-bête pour la classe</p>

      <button className="btn-add-note" onClick={addNote}>➕ Nouvelle Note</button>

      {editingId && (
        <div className="note-editor">
          <input value={editTitle} onChange={e => setEditTitle(e.target.value)} placeholder="Titre" />
          <textarea value={editContent} onChange={e => setEditContent(e.target.value)} placeholder="Contenu de la note..." rows={6} />
          <div className="editor-actions">
            <button className="btn-save" onClick={saveNote}>✓ Enregistrer</button>
            <button className="btn-cancel" onClick={() => setEditingId(null)}>✕ Annuler</button>
          </div>
        </div>
      )}

      {pinnedNotes.length > 0 && (
        <div className="notes-section">
          <h2>📌 Notes épinglées</h2>
          <div className="notes-grid">
            {pinnedNotes.map(note => (
              <div key={note.id} className="note-card pinned">
                <button className="btn-pin active" onClick={() => togglePin(note.id)}>📌</button>
                <h3 onClick={() => startEditing(note)}>{note.title}</h3>
                <p>{note.content}</p>
                <button className="btn-delete-note" onClick={() => deleteNote(note.id)}>🗑️</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {unpinnedNotes.length > 0 && (
        <div className="notes-section">
          <h2>Toutes les notes</h2>
          <div className="notes-grid">
            {unpinnedNotes.map(note => (
              <div key={note.id} className="note-card">
                <button className="btn-pin" onClick={() => togglePin(note.id)}>📌</button>
                <h3 onClick={() => startEditing(note)}>{note.title}</h3>
                <p>{note.content}</p>
                <button className="btn-delete-note" onClick={() => deleteNote(note.id)}>🗑️</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {notes.length === 0 && <div className="empty-notes">Aucune note. Créez-en une !</div>}
    </div>
  )
}

export default Notes
