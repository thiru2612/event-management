// src/components/RegisterModal.jsx
import React, { useState } from "react";
import "./LoginModal.css";
import { registerUser, login } from "../api";

export default function RegisterModal({ open, onClose, onRegistered, onSwitchToLogin, currentUserRole }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  if (!open) return null;

  const validateForm = () => {
    const newErrors = {};
    
    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
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
    
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
      await registerUser({ name, email, password, role });
      // Auto login after register
      const res = await login({ email, password });
      const payload = res.data;
      const token = payload.jwt;
      const user = payload.user;
      
      if (token && user) {
        onRegistered(user, token);
        // Reset form
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setRole("user");
      } else {
        setErrors({ submit: "Registration succeeded but login failed" });
      }
    } catch (err) {
      const message = err?.response?.data || err.message || "Registration failed";
      setErrors({ submit: typeof message === 'string' ? message : "Registration failed" });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setRole("user");
    setErrors({});
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Create Account</h3>
          <p>Join us to start creating and participating in events</p>
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
              Full Name
              <div className="input-group">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Enter your full name"
                  disabled={loading}
                  style={{ borderColor: errors.name ? 'var(--error-color)' : '' }}
                />
              </div>
              {errors.name && <div className="form-error">{errors.name}</div>}
            </label>
            
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
                  placeholder="Create a password"
                  disabled={loading}
                  style={{ borderColor: errors.password ? 'var(--error-color)' : '' }}
                />
              </div>
              {errors.password && <div className="form-error">{errors.password}</div>}
            </label>
            
            <label>
              Confirm Password
              <div className="input-group">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <circle cx="12" cy="16" r="1"></circle>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <input 
                  type="password" 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  placeholder="Confirm your password"
                  disabled={loading}
                  style={{ borderColor: errors.confirmPassword ? 'var(--error-color)' : '' }}
                />
              </div>
              {errors.confirmPassword && <div className="form-error">{errors.confirmPassword}</div>}
            </label>
            
            <label>
              Account Type
              <div className="input-group">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="8.5" cy="7" r="4"></circle>
                  <path d="M20 8v6"></path>
                  <path d="M23 11h-6"></path>
                </svg>
                <select 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)} 
                  disabled={loading}
                  style={{ borderColor: errors.role ? 'var(--error-color)' : '' }}
                >
                  <option value="user">Regular User</option>
                  {currentUserRole === "admin" && <option value="admin">Administrator</option>}
                </select>
              </div>
              {currentUserRole !== "admin" && (
                <div className="form-help" style={{ marginTop: '0.25rem', fontSize: '0.75rem', color: 'var(--gray-500)' }}>
                  Note: Only admin users can assign admin roles
                </div>
              )}
            </label>
            
            <div className="modal-actions">
              <button type="button" className="btn outline" onClick={handleClose} disabled={loading}>
                Cancel
              </button>
              <button type="submit" className="btn primary" disabled={loading}>
                {loading ? (
                  <>
                    <div className="loading-spinner"></div>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="8.5" cy="7" r="4"></circle>
                      <path d="M20 8v6"></path>
                      <path d="M23 11h-6"></path>
                    </svg>
                    Create Account
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
        
        <div className="switch-modal">
          <p>Already have an account? 
            <button type="button" className="link-btn" onClick={onSwitchToLogin} disabled={loading}>
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
