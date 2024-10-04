import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Index from './component/Home/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About'
import Productdetails from './component/Resturant/Productdetails';
import AllProductList from './component/Resturant/AllProductList';
import ContactForm from './pages/ContactForm';
import Cart from './pages/Cart';
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
        <Route path="/allproduct" element={<AllProductList />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/contact_us" element={<ContactForm />}/>
      </Routes>
    </>
  )
}

export default App
