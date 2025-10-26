// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import "../styles/Navbar.css";

const Navbar = ({ user, onLogout, onLogin }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const role = user?.role || "user";

  const handleLoginSuccess = (userData, token) => {
    onLogin(userData, token);
    setShowLogin(false);
  };

  const handleRegisterSuccess = (userData, token) => {
    onLogin(userData, token);
    setShowRegister(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">Event2Way</div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/events">View Events</Link></li>
          {role === "admin" && <li><Link to="/create-event">Create Event</Link></li>}
        </ul>
        <div className="auth-section">
          {user ? (
            <div className="user-menu">
              <span>Welcome, {user.name}</span>
              <button onClick={onLogout} className="logout-btn">Logout</button>
            </div>
          ) : (
            <button onClick={() => setShowLogin(true)} className="login-btn">
              <span className="login-icon">👤</span> Login
            </button>
          )}
        </div>
      </nav>
      
      <LoginModal 
        open={showLogin} 
        onClose={() => setShowLogin(false)}
        onLogin={handleLoginSuccess}
        onSwitchToRegister={() => {setShowLogin(false); setShowRegister(true);}}
      />
      
      <RegisterModal 
        open={showRegister} 
        onClose={() => setShowRegister(false)}
        onRegistered={handleRegisterSuccess}
        onSwitchToLogin={() => {setShowRegister(false); setShowLogin(true);}}
        currentUserRole={role}
      />
    </>
  );
};

export default Navbar;