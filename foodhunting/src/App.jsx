import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Index from './component/Home/Home';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
        {/* Set the path and the component to render */}
        <Route path="/" element={<Index />} />
      </Routes>
    </>
  )
}

export default App
