import { useEffect, useMemo, useState } from 'react'
import TodosCard from './TodosCard'

const BASE_URL = 'https://todos-28286-default-rtdb.firebaseio.com/todos'

function Home() {
  const [alertMessage, setAlertMessage] = useState('')
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [newTitle, setNewTitle] = useState('')
  const [newDueDate, setNewDueDate] = useState('')

  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await fetch(`${BASE_URL}.json`)
        const data = await response.json()

        if (!data) {
          setTodos([])
          return
        }

        const tempTodos = Object.keys(data).map((key) => ({
          id: key,
          title: data[key].title,
          dueDate: data[key].dueDate || '',
          completed: Boolean(data[key].completed),
        }))

        setTodos(tempTodos)
      } catch {
        setAlertMessage('Failed to fetch tasks. Please refresh and try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchTodos()
  }, [])

  const completedCount = useMemo(
    () => todos.filter((todo) => todo.completed).length,
    [todos],
  )

  async function addTaskHandler(event) {
    event.preventDefault()

    const trimmedTitle = newTitle.trim()
    if (!trimmedTitle) {
      setAlertMessage('Task title is required.')
      return
    }

    const currentTask = {
      title: trimmedTitle,
      dueDate: newDueDate,
      completed: false,
    }

    try {
      const response = await fetch(`${BASE_URL}.json`, {
        method: 'POST',
        body: JSON.stringify(currentTask),
      })

      const createdTask = await response.json()
      setTodos((previousTodos) => [...previousTodos, { ...currentTask, id: createdTask.name }])
      setNewTitle('')
      setNewDueDate('')
      setAlertMessage('Task added successfully.')
    } catch {
      setAlertMessage('Unable to add task. Please try again.')
    }
  }

  async function deleteTaskHandler(todoId) {
    try {
      await fetch(`${BASE_URL}/${todoId}.json`, {
        method: 'DELETE',
      })
      setTodos((previousTodos) => previousTodos.filter((todo) => todo.id !== todoId))
      setAlertMessage('Task deleted.')
    } catch {
      setAlertMessage('Delete failed. Please try again.')
    }
  }

  async function updateTaskHandler(todoId, updatedTask) {
    try {
      await fetch(`${BASE_URL}/${todoId}.json`, {
        method: 'PATCH',
        body: JSON.stringify(updatedTask),
      })

      setTodos((previousTodos) =>
        previousTodos.map((todo) =>
          todo.id === todoId
            ? {
                ...todo,
                ...updatedTask,
              }
            : todo,
        ),
      )
      setAlertMessage('Task updated.')
    } catch {
      setAlertMessage('Update failed. Please try again.')
    }
  }

  return (
    <main className="page">
      <section className="panel">
        <header className="panel-head">
          <h1>Todo Manager</h1>
          <p>Manage tasks, due dates, and completion status in one responsive dashboard.</p>
        </header>

        <div className={alertMessage ? 'alert' : 'd-none'}>
          <div>{alertMessage}</div>
          <button className="close-btn" onClick={() => setAlertMessage('')} type="button">
            ✕
          </button>
        </div>

        <form className="todo-form" onSubmit={addTaskHandler}>
          <input
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
            type="text"
            placeholder="Create task"
            aria-label="Task title"
          />
          <input
            value={newDueDate}
            onChange={(event) => setNewDueDate(event.target.value)}
            type="date"
            aria-label="Due date"
          />
          <button className="btn" type="submit">
            Add new task
          </button>
        </form>

        <div className="stats">
          <span>Total: {todos.length}</span>
          <span>Completed: {completedCount}</span>
          <span>Pending: {todos.length - completedCount}</span>
        </div>
      </section>

      <section className="list-section">
        {loading ? (
          <div className="empty-state">Loading tasks...</div>
        ) : todos.length === 0 ? (
          <div className="empty-state">No tasks yet. Add your first task above.</div>
        ) : (
          todos.map((todo) => (
            <TodosCard
              key={todo.id}
              todo={todo}
              onDelete={deleteTaskHandler}
              onUpdate={updateTaskHandler}
            />
          ))
        )}
      </section>
    </main>
  )
}

export default Home
