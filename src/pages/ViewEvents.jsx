// src/pages/ViewEvents.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getEvents } from "../api";
import "../styles/Events.css";

const ViewEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const response = await getEvents();
      setEvents(response.data);
    } catch (error) {
      console.error("Failed to load events:", error);
      // Fallback to static events if API fails
      setEvents([
        { id: 1, title: "Tech Innovation Summit", date: "2025-11-10", description: "Explore future tech trends." },
        { id: 2, title: "AI Connect 2025", date: "2025-12-02", description: "AI-driven networking conference." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="events-page">
        <h2>Loading Events...</h2>
      </div>
    );
  }

  return (
    <div className="events-page">
      <h2>Upcoming Events</h2>
      <div className="event-grid">
        {events.map((e) => (
          <div className="event-card" key={e.id}>
            <h3>{e.title}</h3>
            <p>{e.description}</p>
            <p><strong>Date:</strong> {e.date}</p>
            <p><strong>Location:</strong> {e.location}</p>
            <Link to={`/participate/${e.id}`} className="btn">Participate</Link>
          </div>
        ))}
      </div>
      {events.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "2rem" }}>No events available at the moment.</p>
      )}
    </div>
  );
};

export default ViewEvents;