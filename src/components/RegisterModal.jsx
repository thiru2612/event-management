// src/components/RegisterModal.jsx
import React, { useState } from "react";
import "./RegisterModal.css";
import { registerUser, login } from "../api";

export default function RegisterModal({ open, onClose, onRegistered, onSwitchToLogin, currentUserRole }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerUser({ name, email, password, role });
      // Auto login after register
      const res = await login({ email, password });
      const payload = res.data;
      const token = payload.jwt;
      const user = payload.user;
      
      if (token && user) {
        onRegistered(user, token);
      } else {
        alert("Registration succeeded but login failed");
      }
    } catch (err) {
      const message = err?.response?.data || err.message || "Registration failed";
      alert(typeof message === 'string' ? message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Register</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
              disabled={loading}
            />
          </label>
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
          <label>
            Role
            <select value={role} onChange={(e) => setRole(e.target.value)} disabled={loading}>
              <option value="user">User</option>
              {currentUserRole === "admin" && <option value="admin">Admin</option>}
            </select>
          </label>
          {currentUserRole !== "admin" && (
            <p className="role-note">Note: Only admin users can assign admin roles</p>
          )}
          <div className="modal-actions">
            <button type="button" className="btn outline" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn primary" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
        <div className="switch-modal">
          <p>Already have an account? 
            <button type="button" className="link-btn" onClick={onSwitchToLogin}>
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
