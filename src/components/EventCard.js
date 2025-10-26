// import React from "react";
// import "../styles/EventCard.css";

// const EventCard = ({ event, onRSVP, isAuthenticated }) => {
//   return (
//     <div className="event-card">
//       <h3>🎉 {event.title}</h3>
//       <p>{event.description}</p>
//       <p><strong>Date:</strong> {new Date(event.dateTime).toLocaleString()}</p>
//       <p><strong>Organizer:</strong> {event.organizerName}</p>
//       <a href={event.eventLink} target="_blank" rel="noopener noreferrer">Join Event</a>
//       <p><strong>Attendees:</strong> {event.attendees?.length || 0}</p>
//       {isAuthenticated && <button onClick={() => onRSVP(event.id)}>RSVP</button>}
//     </div>
//   );
// };

// export default EventCard;