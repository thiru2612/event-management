// src/pages/Participate.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { registerParticipant, getEvent } from "../api";
import "../styles/Form.css";

const Participate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    
    if (!token || !userData) {
      alert("Please login to participate in events");
      navigate("/");
      return;
    }
    
    setUser(JSON.parse(userData));
    loadEvent();
  }, [id, navigate]);

  const loadEvent = async () => {
    try {
      const response = await getEvent(id);
      setEvent(response.data);
    } catch (error) {
      console.error("Failed to load event:", error);
      // Fallback event data for demo
      setEvent({
        id: parseInt(id),
        title: "Tech Innovation Summit 2024",
        description: "Join industry leaders as we explore the latest technological innovations shaping our future. Network with professionals and discover cutting-edge solutions.",
        date: "2024-12-15",
        location: "Virtual Event",
        type: "conference"
      });
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleParticipate = async () => {
    if (!user) {
      setError("Please login to participate");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      await registerParticipant({
        eventId: parseInt(id),
        userId: user.id,
        name: user.name,
        email: user.email
      });
      setSuccess(true);
      
      // Redirect after showing success message
      setTimeout(() => {
        navigate("/events");
      }, 3000);
    } catch (error) {
      console.error("Participation failed:", error);
      const message = error?.response?.data || "Failed to register for event";
      setError(typeof message === 'string' ? message : "Failed to register for event");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="form-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <h3>Loading...</h3>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="form-container">
        <div className="form-wrapper">
          <div className="form-header">
            <h2>Registration Successful!</h2>
            <p>You're all set for the event</p>
          </div>
          <div className="form-body">
            <div className="form-success">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 11l3 3L22 4"></path>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
              </svg>
              Successfully registered for "{event?.title}"! You'll receive a confirmation email shortly. Redirecting to events page...
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
          <h2>Join Event</h2>
          <p>Confirm your participation in this exciting event</p>
        </div>
        
        <div className="form-body">
          {event && (
            <div style={{ 
              background: 'var(--gray-50)', 
              padding: '1.5rem', 
              borderRadius: 'var(--radius-lg)', 
              marginBottom: '2rem',
              border: '1px solid var(--gray-200)'
            }}>
              <h3 style={{ 
                color: 'var(--gray-900)', 
                marginBottom: '1rem', 
                fontSize: '1.25rem',
                fontWeight: '600'
              }}>
                {event.title}
              </h3>
              
              <div style={{ 
                display: 'grid', 
                gap: '1rem', 
                fontSize: '0.875rem',
                color: 'var(--gray-600)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <strong>Date:</strong> {formatDate(event.date)}
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <strong>Location:</strong> {event.location}
                </div>
                
                {event.type && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7z"></path>
                    </svg>
                    <strong>Type:</strong> {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </div>
                )}
              </div>
              
              <div style={{ 
                marginTop: '1rem', 
                padding: '1rem', 
                background: 'var(--white)', 
                borderRadius: 'var(--radius)', 
                border: '1px solid var(--gray-200)'
              }}>
                <p style={{ 
                  color: 'var(--gray-700)', 
                  lineHeight: '1.6',
                  margin: '0'
                }}>
                  {event.description}
                </p>
              </div>
            </div>
          )}
          
          <div style={{
            background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
            color: 'white',
            padding: '1.5rem',
            borderRadius: 'var(--radius-lg)',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span style={{ fontWeight: '600', fontSize: '1.125rem' }}>Welcome, {user.name}!</span>
            </div>
            <p style={{ opacity: '0.9', fontSize: '0.875rem', margin: '0' }}>
              Thank you for your interest in this event. Click below to confirm your participation.
            </p>
          </div>
          
          {error && (
            <div className="form-error-message">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
              {error}
            </div>
          )}
          
          <div className="form-actions">
            <button 
              type="button" 
              className="form-cancel"
              onClick={() => navigate("/events")}
              disabled={loading}
            >
              Back to Events
            </button>
            <button 
              className="form-submit"
              onClick={handleParticipate}
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="loading-spinner"></div>
                  Registering...
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 11l3 3L22 4"></path>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                  </svg>
                  Confirm Participation
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Participate;