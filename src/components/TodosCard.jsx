/* eslint-disable react/prop-types */
import { useState } from 'react'

function TodosCard({ todo, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(todo.title)
  const [editDueDate, setEditDueDate] = useState(todo.dueDate || '')

  function openEditor() {
    setEditTitle(todo.title)
    setEditDueDate(todo.dueDate || '')
    setIsEditing(true)
  }

  function cancelEditor() {
    setEditTitle(todo.title)
    setEditDueDate(todo.dueDate || '')
    setIsEditing(false)
  }

  function submitUpdate(event) {
    event.preventDefault()

    const trimmedTitle = editTitle.trim()
    if (!trimmedTitle) {
      return
    }

    onUpdate(todo.id, {
      title: trimmedTitle,
      dueDate: editDueDate,
    })
    setIsEditing(false)
  }

  function toggleComplete() {
    onUpdate(todo.id, { completed: !todo.completed })
  }

  return (
    <article className={`card ${todo.completed ? 'card-complete' : ''}`}>
      {isEditing ? (
        <form className="card-edit" onSubmit={submitUpdate}>
          <input
            value={editTitle}
            onChange={(event) => setEditTitle(event.target.value)}
            type="text"
            aria-label="Edit title"
          />
          <input
            value={editDueDate}
            onChange={(event) => setEditDueDate(event.target.value)}
            type="date"
            aria-label="Edit due date"
          />
          <div className="card-actions">
            <button className="save-btn" type="submit">
              Save
            </button>
            <button className="secondary-btn" onClick={cancelEditor} type="button">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="card-body">
            <h3>{todo.title}</h3>
            <p>{todo.dueDate ? `Due: ${todo.dueDate}` : 'No due date'}</p>
          </div>
          <div className="card-actions">
            <button className="secondary-btn" onClick={toggleComplete} type="button">
              {todo.completed ? 'Mark pending' : 'Mark complete'}
            </button>
            <button className="secondary-btn" onClick={openEditor} type="button">
              Edit
            </button>
            <button onClick={() => onDelete(todo.id)} className="delete-btn" type="button">
              Delete
            </button>
          </div>
        </>
      )}
    </article>
  )
}

export default TodosCard
