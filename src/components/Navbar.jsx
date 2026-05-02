import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/user/userSlice"; 
import './Navbar.css'; 

function Navbar() {
  const user = useSelector((state) => state.user?.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Clear Redux state
     dispatch(logoutUser()); 
    
    // 2. Redirect to Homepage
    navigate("/");
  };

  return (
    <nav className="nav-bar">
      <div className="nav-container">
        <div className="nav-logo">
          <Link to="/">SkillSwap<span>.</span></Link>
        </div>
        
        <div className="nav-group">
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/search">Services</Link>
            <Link to="/contact">Contact</Link>
            {user ? (
              /* --- Authenticated View --- */
              <div className="nav-user-controls">
                <Link to="/profile" className="nav-profile-pill">
                  <div className="nav-avatar-sm">{user.name.charAt(0)}</div>
                  <span>{user.name}</span>
                </Link>
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              </div>
            ) : (
              /* --- Visitor View --- */
              <div className="nav-links">
                <Link to="/login" className="login-link">Login</Link>
                <Link to="/register" className="register-button">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;