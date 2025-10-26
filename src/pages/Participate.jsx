// src/pages/Participate.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { registerParticipant, getEvent } from "../api";

const Participate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

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
      alert("Failed to load event details");
    }
  };

  const handleParticipate = async () => {
    if (!user) {
      alert("Please login to participate");
      return;
    }

    setLoading(true);
    try {
      await registerParticipant({
        eventId: parseInt(id),
        userId: user.id,
        name: user.name,
        email: user.email
      });
      alert("Successfully registered for the event!");
      navigate("/events");
    } catch (error) {
      console.error("Participation failed:", error);
      const message = error?.response?.data || "Failed to register for event";
      alert(typeof message === 'string' ? message : "Failed to register for event");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "4rem", padding: "2rem" }}>
      <h2>Participate in Event {event ? `"${event.title}"` : `#${id}`}</h2>
      {event && (
        <div style={{ marginBottom: "2rem" }}>
          <p><strong>Description:</strong> {event.description}</p>
          <p><strong>Date:</strong> {event.date}</p>
          <p><strong>Location:</strong> {event.location}</p>
        </div>
      )}
      <p>Hello {user.name}, thank you for showing interest! Please confirm your participation below.</p>
      <button 
        onClick={handleParticipate}
        disabled={loading}
        style={{
          background: loading ? "#ccc" : "#003366", 
          color: "white", 
          padding: "12px 24px", 
          borderRadius: "6px", 
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
          fontSize: "16px"
        }}
      >
        {loading ? "Registering..." : "Confirm Participation"}
      </button>
    </div>
  );
};

export default Participate;