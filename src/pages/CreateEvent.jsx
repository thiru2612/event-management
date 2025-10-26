// src/pages/CreateEvent.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../api";
import "../styles/Form.css";

const CreateEvent = () => {
  const [form, setForm] = useState({ title: "", date: "", description: "", location: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    
    if (!token || !user) {
      alert("Please login to create events");
      navigate("/");
      return;
    }
    
    const userData = JSON.parse(user);
    if (userData.role !== "admin") {
      alert("Only admin users can create events");
      navigate("/");
      return;
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await createEvent(form);
      alert(`Event Created: ${form.title}`);
      navigate("/events");
    } catch (error) {
      console.error("Failed to create event:", error);
      const message = error?.response?.data || "Failed to create event";
      alert(typeof message === 'string' ? message : "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Create New Event</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Event Title" 
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })} 
          disabled={loading}
        />
        <input 
          type="date" 
          required
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })} 
          disabled={loading}
        />
        <input 
          type="text" 
          placeholder="Event Location" 
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })} 
          disabled={loading}
        />
        <textarea 
          placeholder="Event Description" 
          rows="4"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          disabled={loading}
        ></textarea>
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;