import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Index from './component/Home/Home';
import Productdetails from './component/Resturant/Productdetails';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
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
        <Route path="/:jsonType/:id" element={<Productdetails />}/>
      </Routes>
    </>
  )
}

export default App
