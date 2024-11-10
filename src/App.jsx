import { useState, useRef, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import TodosCard from './components/TodosCard'
import Home from './components/Home'
immport admin from './'
const userRole = "admin";


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
