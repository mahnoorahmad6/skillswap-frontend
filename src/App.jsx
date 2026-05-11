import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/profile";
import Contact from "./pages/Contact";
import Login from "./pages/login";
import Register from "./pages/register";
import ChangePassword from "./pages/ChangePassword";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Search from "./pages/Search";
import UserProfile from "./pages/UserProfile";
import About from "./pages/About";
import { loadUser } from "./features/user/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Chat from "./pages/Chat";


function App() {
    const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser()); // ← reloads full user with skills on every refresh
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/profile" element={<Profile />} /> 
          <Route path="/contact" element={<Contact />} /> 
        <Route path="/about" element={<About />} />
         <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/user/:id" element={<UserProfile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/chat/:friendId" element={<Chat />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;