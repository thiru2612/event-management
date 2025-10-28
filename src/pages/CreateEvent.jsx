// src/pages/CreateEvent.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../api";
import "../styles/Form.css";

const CreateEvent = () => {
  const [form, setForm] = useState({ 
    title: "", 
    date: "", 
    description: "", 
    location: "",
    type: "conference"
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
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

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.title.trim()) {
      newErrors.title = "Event title is required";
    } else if (form.title.length < 3) {
      newErrors.title = "Event title must be at least 3 characters";
    }
    
    if (!form.date) {
      newErrors.date = "Event date is required";
    } else {
      const selectedDate = new Date(form.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.date = "Event date cannot be in the past";
      }
    }
    
    if (!form.description.trim()) {
      newErrors.description = "Event description is required";
    } else if (form.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }
    
    if (!form.location.trim()) {
      newErrors.location = "Event location is required";
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
      await createEvent(form);
      setSuccess(true);
      
      // Redirect after showing success message
      setTimeout(() => {
        navigate("/events");
      }, 2000);
    } catch (error) {
      console.error("Failed to create event:", error);
      let message = "Failed to create event";
      
      if (error.response?.status === 403) {
        message = "Access denied. Please ensure you're logged in with admin privileges.";
      } else if (error.response?.status === 401) {
        message = "Please log in to create events.";
      } else if (error.response?.data) {
        message = typeof error.response.data === 'string' ? error.response.data : "Failed to create event";
      } else if (error.message) {
        message = error.message;
      }
      
      setErrors({ submit: message });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/events");
  };

  if (success) {
    return (
      <div className="form-container">
        <div className="form-wrapper">
          <div className="form-header">
            <h2>Event Created Successfully!</h2>
            <p>Your event has been created and is now live</p>
          </div>
          <div className="form-body">
            <div className="form-success">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 11l3 3L22 4"></path>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
              </svg>
              Event "{form.title}" has been created successfully! Redirecting to events page...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <div className="form-header">
          <h2>Create New Event</h2>
          <p>Fill in the details below to create your event</p>
        </div>
        
        <div className="form-body">
          {errors.submit && (
            <div className="form-error-message">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
              {errors.submit}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label className="form-label required">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14,2 14,8 20,8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10,9 9,9 8,9"></polyline>
                </svg>
                Event Title
              </label>
              <input 
                type="text" 
                className={`form-input ${errors.title ? 'error' : ''}`}
                placeholder="Enter event title" 
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })} 
                disabled={loading}
              />
              {errors.title && <div className="form-error">{errors.title}</div>}
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label required">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  Event Date
                </label>
                <input 
                  type="date" 
                  className={`form-input ${errors.date ? 'error' : ''}`}
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })} 
                  disabled={loading}
                />
                {errors.date && <div className="form-error">{errors.date}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7z"></path>
                  </svg>
                  Event Type
                </label>
                <select 
                  className="form-input form-select"
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })} 
                  disabled={loading}
                >
                  <option value="conference">Conference</option>
                  <option value="workshop">Workshop</option>
                  <option value="masterclass">Masterclass</option>
                  <option value="seminar">Seminar</option>
                  <option value="webinar">Webinar</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label required">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                Event Location
              </label>
              <input 
                type="text" 
                className={`form-input ${errors.location ? 'error' : ''}`}
                placeholder="e.g., Virtual Event, New York, Online" 
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })} 
                disabled={loading}
              />
              {errors.location && <div className="form-error">{errors.location}</div>}
            </div>

            <div className="form-group">
              <label className="form-label required">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14,2 14,8 20,8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>
                Event Description
              </label>
              <textarea 
                className={`form-input form-textarea ${errors.description ? 'error' : ''}`}
                placeholder="Describe your event, what attendees can expect, and any important details" 
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                disabled={loading}
              />
              {errors.description && <div className="form-error">{errors.description}</div>}
              <div className="form-help">Minimum 10 characters required</div>
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                className="form-cancel"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="form-submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="loading-spinner"></div>
                    Creating Event...
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 11l3 3L22 4"></path>
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                    </svg>
                    Create Event
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;