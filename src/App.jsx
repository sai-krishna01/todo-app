import { useState, useRef, useEffect } from 'react'
import { Route, router } from 'react-router'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TodosCard from './components/TodosCard'
import Home from './components/Home'

function App() {
  // const [count, setCount] = useState(0)
  const [alertStatus, setAlertStatus] =useState(false)
  const [todos, setTodos] = useState([])
  const taskinput = useRef()

  //fetch tados from firebase
useEffect(()=>{
  fetch('https://todos-28286-default-rtdb.firebaseio.com/todos.json').then((data)=>{
    return data.json()}).then((data)=>{
       let tempTodos = []
       for(const key in data){
        let todos = {
          id:key,
          ...data[key]
        }
        tempTodos.push(todos)
       }
       setTodos(tempTodos)
    })
},[])

useEffect(()=>{
  console.log(todos)
}, [todos])

  
  
  function addTaskHandeler() {
    // let task = taskinput.current.value
    let currenttask ={
      title: taskinput.current.value,
    }

    //submit data to firebase
    fetch('https://todos-28286-default-rtdb.firebaseio.com/todos.json',{
      method: 'POST',
      body: JSON.stringify(currenttask)
    }).then(()=>{
      setAlertStatus(true)
      setTodos((preTodos)=>[...preTodos, currenttask])
    })
  }
  
  function closeAlertHandler(){
    setAlertStatus(false)
  }
  return (
    <>
      <div className="container">
        <div className={alertStatus == true ? "alert": "d-none"}>
        <div>task added !</div> 
        <button className='close-btn' onClick={closeAlertHandler}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x" viewBox="0 0 16 24">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
</svg></button>
        </div>
        <h2 className='title'>manage your task in one place, @sai krishna</h2>
        <p className='desc'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, saepe.</p>


        <input ref={taskinput} type="text" placeholder='create task' />
        <button className='btn' onClick={addTaskHandeler}>add new task</button>
      </div>


      {
        todos.map((todo)=>{
        return <TodosCard title={todo.title} id={todo.id} />
        })
      }

    
    <Routes>
     <route path='/' element={<Home/>} />
    </Routes>


    </>
  )
}

export default App
