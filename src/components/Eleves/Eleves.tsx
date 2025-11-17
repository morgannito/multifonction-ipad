import { useState, useEffect } from 'react'
import './Eleves.css'

interface Student {
  id: string
  name: string
  stars: number
}

function Eleves() {
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('students')
    return saved ? JSON.parse(saved) : []
  })
  const [newName, setNewName] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students))
  }, [students])

  const addStudent = () => {
    if (!newName.trim()) return
    setStudents([...students, { id: Date.now().toString(), name: newName.trim(), stars: 0 }])
    setNewName('')
  }

  const randomPick = () => {
    if (students.length === 0) return
    const random = students[Math.floor(Math.random() * students.length)]
    setSelectedId(random.id)
    setTimeout(() => setSelectedId(null), 3000)
  }

  const addStar = (id: string) => {
    setStudents(students.map(s => s.id === id ? {...s, stars: s.stars + 1} : s))
  }

  const removeStar = (id: string) => {
    setStudents(students.map(s => s.id === id ? {...s, stars: Math.max(0, s.stars - 1)} : s))
  }

  const deleteStudent = (id: string) => {
    setStudents(students.filter(s => s.id !== id))
  }

  return (
    <div className="eleves-app fade-in">
      <h1 className="eleves-title">👨‍🎓 Gestion Élèves</h1>
      <p className="eleves-subtitle">Tirage au sort et récompenses</p>

      <div className="add-student">
        <input value={newName} onChange={e => setNewName(e.target.value)} onKeyPress={e => e.key === 'Enter' && addStudent()} placeholder="Nom de l'élève" />
        <button onClick={addStudent}>➕ Ajouter</button>
      </div>

      <button className="btn-random" onClick={randomPick} disabled={students.length === 0}>
        🎲 Tirage au sort
      </button>

      <div className="students-grid">
        {students.map(student => (
          <div key={student.id} className={`student-card ${selectedId === student.id ? 'selected-student' : ''}`}>
            <h3>{student.name}</h3>
            <div className="stars">{'⭐'.repeat(student.stars)}</div>
            <div className="student-actions">
              <button onClick={() => addStar(student.id)}>⭐+</button>
              <button onClick={() => removeStar(student.id)}>⭐-</button>
              <button onClick={() => deleteStudent(student.id)}>🗑️</button>
            </div>
          </div>
        ))}
      </div>

      {students.length === 0 && <div className="empty-eleves">Aucun élève. Ajoutez-en un !</div>}
    </div>
  )
}

export default Eleves
