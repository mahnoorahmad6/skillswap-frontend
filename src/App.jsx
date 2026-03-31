import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/profile";
import Login from "./pages/login";
import Register from "./pages/register";
import ChangePassword from "./pages/ChangePassword";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Search from "./pages/Search";


function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/profile" element={<Profile />} />
         <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/" element={<Dashboard />} />
          
          <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;