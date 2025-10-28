// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import "../styles/Navbar.css";

const Navbar = ({ user, onLogout, onLogin }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const role = user?.role || "user";

  const handleLoginSuccess = (userData, token) => {
    onLogin(userData, token);
    setShowLogin(false);
  };

  const handleRegisterSuccess = (userData, token) => {
    onLogin(userData, token);
    setShowRegister(false);
  };

  const isActive = (path) => location.pathname === path;

  const getUserInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U';
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">Event2Way</div>
        
        <ul>
          <li><Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link></li>
          <li><Link to="/events" className={isActive('/events') ? 'active' : ''}>Events</Link></li>
          {role === "admin" && (
            <li><Link to="/create-event" className={isActive('/create-event') ? 'active' : ''}>Create Event</Link></li>
          )}
        </ul>

        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        
        <div className="auth-section">
          {user ? (
            <div className="user-menu">
              <div className="user-avatar">
                {getUserInitials(user.name)}
              </div>
              <span>Welcome, {user.name}</span>
              <button onClick={onLogout} className="logout-btn">Logout</button>
            </div>
          ) : (
            <button onClick={() => setShowLogin(true)} className="login-btn">
              <svg className="login-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              Login
            </button>
          )}
        </div>
        
        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <ul>
            <li><Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link></li>
            <li><Link to="/events" onClick={() => setMobileMenuOpen(false)}>Events</Link></li>
            {role === "admin" && (
              <li><Link to="/create-event" onClick={() => setMobileMenuOpen(false)}>Create Event</Link></li>
            )}
          </ul>
          {!user && (
            <div style={{ padding: '1rem 0', borderTop: '1px solid var(--gray-200)', marginTop: '1rem' }}>
              <button onClick={() => { setShowLogin(true); setMobileMenuOpen(false); }} className="login-btn" style={{ width: '100%' }}>
                Login
              </button>
            </div>
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