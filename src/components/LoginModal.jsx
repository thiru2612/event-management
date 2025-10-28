// src/components/LoginModal.jsx
import React, { useState } from "react";
import "./LoginModal.css";
import { login } from "../api";

export default function LoginModal({ open, onClose, onLogin, onSwitchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  if (!open) return null;

  const validateForm = () => {
    const newErrors = {};
    
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setErrors({});
    
    try {
      const res = await login({ email, password });
      const payload = res.data;
      const token = payload.jwt;
      const user = payload.user;
      
      if (token && user) {
        onLogin(user, token);
        // Reset form
        setEmail("");
        setPassword("");
      } else {
        setErrors({ submit: "Login failed: Invalid response format" });
      }
    } catch (err) {
      const message = err?.response?.data || err.message || "Login failed";
      setErrors({ submit: typeof message === 'string' ? message : "Login failed" });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setEmail("");
    setPassword("");
    setErrors({});
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Welcome Back</h3>
          <p>Sign in to your account to continue</p>
        </div>
        
        <div className="modal-body">
          {errors.submit && (
            <div className="form-error" style={{ marginBottom: '1rem', padding: '0.75rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: 'var(--radius)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
              {errors.submit}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <label>
              Email Address
              <div className="input-group">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="Enter your email"
                  disabled={loading}
                  style={{ borderColor: errors.email ? 'var(--error-color)' : '' }}
                />
              </div>
              {errors.email && <div className="form-error">{errors.email}</div>}
            </label>
            
            <label>
              Password
              <div className="input-group">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <circle cx="12" cy="16" r="1"></circle>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="Enter your password"
                  disabled={loading}
                  style={{ borderColor: errors.password ? 'var(--error-color)' : '' }}
                />
              </div>
              {errors.password && <div className="form-error">{errors.password}</div>}
            </label>
            
            <div className="modal-actions">
              <button type="button" className="btn outline" onClick={handleClose} disabled={loading}>
                Cancel
              </button>
              <button type="submit" className="btn primary" disabled={loading}>
                {loading ? (
                  <>
                    <div className="loading-spinner"></div>
                    Signing in...
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                      <polyline points="10,17 15,12 10,7"></polyline>
                      <line x1="15" y1="12" x2="3" y2="12"></line>
                    </svg>
                    Sign In
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
        
        <div className="switch-modal">
          <p>Don't have an account? 
            <button type="button" className="link-btn" onClick={onSwitchToRegister} disabled={loading}>
              Create one here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}