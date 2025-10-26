// // src/components/CreateEventForm.jsx
// import React, { useState } from "react";
// import { createEvent } from "../api";
// import "./CreateEventForm.css";

// export default function CreateEventForm({ onCreated }) {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [dateTime, setDateTime] = useState("");
//   const [organizerName, setOrganizerName] = useState("");
//   const [eventLink, setEventLink] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const event = { title, description, dateTime, organizerName, eventLink };
//       await createEvent(event);
//       alert("Event created");
//       setTitle(""); setDescription(""); setDateTime(""); setOrganizerName(""); setEventLink("");
//       if (onCreated) onCreated();
//     } catch (err) {
//       alert("Failed: " + (err?.response?.data?.message || err.message));
//     }
//   };

//   return (
//     <form className="create-event" onSubmit={handleSubmit}>
//       <input placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} required />
//       <textarea placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)} required />
//       <input type="datetime-local" value={dateTime} onChange={(e)=>setDateTime(e.target.value)} required />
//       <input placeholder="Organizer name" value={organizerName} onChange={(e)=>setOrganizerName(e.target.value)} />
//       <input placeholder="Event link" value={eventLink} onChange={(e)=>setEventLink(e.target.value)} />
//       <div style={{ display:"flex", gap:8 }}>
//         <button className="btn primary" type="submit">Create Event</button>
//       </div>
//     </form>
//   );
// }