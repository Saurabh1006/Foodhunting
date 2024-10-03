import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Index from "./component/Home/Home";
import Productdetails from "./component/Resturant/Productdetails";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
function App() {
  return (
    <div>
      {/* Global toaster for notifications */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Define Routes */}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/:jsonType/:id" element={<Productdetails />} />
      </Routes>
    </div>
  );
}

export default App;
