// src/components/LoginModal.jsx
import React, { useState } from "react";
import "./LoginModal.css";
import { login } from "../api";

export default function LoginModal({ open, onClose, onLogin, onSwitchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login({ email, password });
      const payload = res.data;
      const token = payload.jwt;
      const user = payload.user;
      
      if (token && user) {
        onLogin(user, token);
      } else {
        alert("Login failed: Invalid response format");
      }
    } catch (err) {
      const message = err?.response?.data || err.message || "Login failed";
      alert(typeof message === 'string' ? message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              disabled={loading}
            />
          </label>
          <label>
            Password
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              disabled={loading}
            />
          </label>
          <div className="modal-actions">
            <button type="button" className="btn outline" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn primary" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
        <div className="switch-modal">
          <p>Don't have an account? 
            <button type="button" className="link-btn" onClick={onSwitchToRegister}>
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}