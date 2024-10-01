import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Index from './component/Home/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
        {/* Set the path and the component to render */}
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Signup />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  )
}

export default App
