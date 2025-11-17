import { useState, useEffect } from 'react'
import './Groupes.css'

interface Student {
  id: string
  name: string
}

interface Group {
  id: number
  students: Student[]
  color: string
}

const groupColors = [
  '#ef4444', '#3b82f6', '#10b981', '#f59e0b',
  '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'
]

export default function Groupes() {
  const [studentsList, setStudentsList] = useState<Student[]>(() => {
    const saved = localStorage.getItem('students-list-groupes')
    return saved ? JSON.parse(saved) : []
  })
  const [newStudentName, setNewStudentName] = useState('')
  const [groups, setGroups] = useState<Group[]>([])
  const [groupMode, setGroupMode] = useState<'number' | 'size'>('number')
  const [groupCount, setGroupCount] = useState(4)
  const [groupSize, setGroupSize] = useState(5)
  const [bulkInput, setBulkInput] = useState('')
  const [showBulkInput, setShowBulkInput] = useState(false)

  useEffect(() => {
    localStorage.setItem('students-list-groupes', JSON.stringify(studentsList))
  }, [studentsList])

  const addStudent = () => {
    if (!newStudentName.trim()) return

    const newStudent: Student = {
      id: Date.now().toString(),
      name: newStudentName.trim()
    }

    setStudentsList([...studentsList, newStudent])
    setNewStudentName('')
  }

  const removeStudent = (id: string) => {
    setStudentsList(studentsList.filter(s => s.id !== id))
  }

  const importBulk = () => {
    const names = bulkInput
      .split('\n')
      .map(name => name.trim())
      .filter(name => name.length > 0)

    const newStudents: Student[] = names.map(name => ({
      id: Date.now().toString() + Math.random(),
      name
    }))

    setStudentsList([...studentsList, ...newStudents])
    setBulkInput('')
    setShowBulkInput(false)
  }

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const generateGroups = () => {
    if (studentsList.length === 0) {
      alert('Ajoutez des élèves d\'abord !')
      return
    }

    const shuffled = shuffleArray(studentsList)
    const newGroups: Group[] = []

    if (groupMode === 'number') {
      // Diviser par nombre de groupes
      const studentsPerGroup = Math.ceil(shuffled.length / groupCount)

      for (let i = 0; i < groupCount; i++) {
        const start = i * studentsPerGroup
        const end = start + studentsPerGroup
        const groupStudents = shuffled.slice(start, end)

        if (groupStudents.length > 0) {
          newGroups.push({
            id: i + 1,
            students: groupStudents,
            color: groupColors[i % groupColors.length]
          })
        }
      }
    } else {
      // Diviser par taille de groupe
      let groupId = 1
      for (let i = 0; i < shuffled.length; i += groupSize) {
        const groupStudents = shuffled.slice(i, i + groupSize)
        newGroups.push({
          id: groupId++,
          students: groupStudents,
          color: groupColors[(groupId - 2) % groupColors.length]
        })
      }
    }

    setGroups(newGroups)
  }

  const clearGroups = () => {
    setGroups([])
  }

  const exportGroups = () => {
    let text = '📋 Groupes générés\n\n'
    groups.forEach(group => {
      text += `Groupe ${group.id}:\n`
      group.students.forEach((student, index) => {
        text += `  ${index + 1}. ${student.name}\n`
      })
      text += '\n'
    })

    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'groupes.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="groupes-container">
      <div className="groupes-header">
        <h2>👥 Générateur de Groupes</h2>
        <p>Créez automatiquement des groupes aléatoires</p>
      </div>

      <div className="groupes-content">
        <div className="groupes-sidebar">
          <div className="groupes-section">
            <h3>📝 Liste des élèves ({studentsList.length})</h3>

            <div className="groupes-add-student">
              <input
                type="text"
                value={newStudentName}
                onChange={e => setNewStudentName(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && addStudent()}
                placeholder="Nom de l'élève..."
                maxLength={30}
              />
              <button onClick={addStudent} disabled={!newStudentName.trim()}>
                ➕
              </button>
            </div>

            <button
              className="groupes-bulk-btn"
              onClick={() => setShowBulkInput(!showBulkInput)}
            >
              📋 Import multiple
            </button>

            {showBulkInput && (
              <div className="groupes-bulk-input">
                <textarea
                  value={bulkInput}
                  onChange={e => setBulkInput(e.target.value)}
                  placeholder="Un nom par ligne..."
                  rows={5}
                />
                <button onClick={importBulk}>✅ Importer</button>
              </div>
            )}

            <div className="groupes-students-list">
              {studentsList.map(student => (
                <div key={student.id} className="groupes-student-item">
                  <span>{student.name}</span>
                  <button onClick={() => removeStudent(student.id)}>🗑️</button>
                </div>
              ))}
              {studentsList.length === 0 && (
                <div className="groupes-empty">
                  Aucun élève. Ajoutez-en pour commencer !
                </div>
              )}
            </div>
          </div>

          <div className="groupes-section">
            <h3>⚙️ Configuration</h3>

            <div className="groupes-mode">
              <label>
                <input
                  type="radio"
                  checked={groupMode === 'number'}
                  onChange={() => setGroupMode('number')}
                />
                Nombre de groupes
              </label>
              <label>
                <input
                  type="radio"
                  checked={groupMode === 'size'}
                  onChange={() => setGroupMode('size')}
                />
                Taille des groupes
              </label>
            </div>

            {groupMode === 'number' ? (
              <div className="groupes-setting">
                <label>Nombre de groupes :</label>
                <input
                  type="number"
                  value={groupCount}
                  onChange={e => setGroupCount(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                  max="10"
                />
              </div>
            ) : (
              <div className="groupes-setting">
                <label>Élèves par groupe :</label>
                <input
                  type="number"
                  value={groupSize}
                  onChange={e => setGroupSize(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                  max="20"
                />
              </div>
            )}

            <button
              className="groupes-generate-btn"
              onClick={generateGroups}
              disabled={studentsList.length === 0}
            >
              🎲 Générer les groupes
            </button>

            {groups.length > 0 && (
              <>
                <button className="groupes-clear-btn" onClick={clearGroups}>
                  🔄 Nouvelle génération
                </button>
                <button className="groupes-export-btn" onClick={exportGroups}>
                  💾 Exporter en TXT
                </button>
              </>
            )}
          </div>
        </div>

        <div className="groupes-main">
          {groups.length === 0 ? (
            <div className="groupes-placeholder">
              <div className="groupes-placeholder-icon">👥</div>
              <div className="groupes-placeholder-text">
                Configurez et générez vos groupes
              </div>
            </div>
          ) : (
            <div className="groupes-grid">
              {groups.map(group => (
                <div
                  key={group.id}
                  className="groupes-group"
                  style={{ borderColor: group.color }}
                >
                  <div
                    className="groupes-group-header"
                    style={{ backgroundColor: group.color }}
                  >
                    <div className="groupes-group-title">Groupe {group.id}</div>
                    <div className="groupes-group-count">
                      {group.students.length} élève{group.students.length > 1 ? 's' : ''}
                    </div>
                  </div>
                  <div className="groupes-group-students">
                    {group.students.map((student, index) => (
                      <div key={student.id} className="groupes-group-student">
                        <span className="groupes-group-student-number">{index + 1}.</span>
                        <span className="groupes-group-student-name">{student.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
