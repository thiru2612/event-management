// // src/components/EventList.jsx
// import React from "react";
// import { rsvpToEvent } from "../api";
// import "./EventList.css";

// export default function EventList({ events = [], onRefresh }) {
//   const handleRSVP = async (id) => {
//     const attendee = prompt("Enter your name to RSVP:");
//     if (!attendee) return;
//     try {
//       await rsvpToEvent(id, attendee);
//       alert(`RSVP confirmed for ${attendee}`);
//       if (onRefresh) onRefresh();
//     } catch (e) {
//       alert("RSVP failed: " + (e?.response?.data?.message || e.message));
//     }
//   };

//   return (
//     <div className="events-grid">
//       {events.length === 0 ? (
//         <div className="empty">No upcoming events.</div>
//       ) : (
//         events.map((ev) => (
//           <article key={ev.id} className="card">
//             <h3>{ev.title}</h3>
//             <p className="small">{ev.description}</p>
//             <p className="muted">Date: {new Date(ev.dateTime).toLocaleString()}</p>
//             <p className="muted">Organizer: {ev.organizerName}</p>
//             <div className="card-actions">
//               <a href={ev.eventLink} className="link" target="_blank" rel="noreferrer">Join</a>
//               <button className="btn primary small" onClick={() => handleRSVP(ev.id)}>RSVP</button>
//             </div>
//             <div className="attendees">Attendees: {ev.attendees?.length || 0}</div>
//           </article>
//         ))
//       )}
//     </div>
//   );
// }
