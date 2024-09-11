import { useState, useRef, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import TodosCard from './components/TodosCard'
import Home from './components/Home'

{<head><script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4457127668879479"
  crossorigin="anonymous"></script></head>}
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
