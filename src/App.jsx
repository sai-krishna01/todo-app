import { useState, useRef, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import TodosCard from './components/TodosCard'
import Home from './components/Home'

function App () { 



  return (
    <>
      

    
    <Routes>
     <Route path='/' element={<Home/>} />
    </Routes>

    </>
  )
}

export default App
