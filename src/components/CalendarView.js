// // src/components/CalendarView.jsx
// import React, { useEffect, useState } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import { getEvents } from "../api";
// import "./CalendarView.css";

// const CalendarView = ({ events: propEvents = [] }) => {
//   const [events, setEvents] = useState(propEvents);
//   const [selectedDateEvents, setSelectedDateEvents] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(null);

//   useEffect(() => {
//     if (!propEvents || propEvents.length === 0) {
//       getEvents().then((res) => setEvents(res.data || []));
//     } else {
//       setEvents(propEvents);
//     }
//   }, [propEvents]);

//   const getTileClassName = ({ date }) => {
//     const today = new Date();
//     const eventOnDate = events.find(
//       (e) => new Date(e.dateTime).toDateString() === date.toDateString()
//     );
//     if (eventOnDate) {
//       const eventDate = new Date(eventOnDate.dateTime);
//       if (eventDate < today) return "event-day-past";
//       else return "event-day-upcoming";
//     }
//     return "";
//   };

//   const handleDateClick = (date) => {
//     setSelectedDate(date);
//     const dayEvents = events.filter(
//       (e) => new Date(e.dateTime).toDateString() === date.toDateString()
//     );
//     setSelectedDateEvents(dayEvents);
//   };

//   return (
//     <div className="calendar-container">
//       <h3>Event Calendar</h3>
//       <Calendar onClickDay={handleDateClick} tileClassName={getTileClassName} />
//       <div className="test-word">Event</div>

//       {selectedDate && (
//         <div className="selected-date-header">📅 {selectedDate.toDateString()}</div>
//       )}

//       {selectedDateEvents.length > 0 ? (
//         <div className="event-list">
//           {selectedDateEvents.map((event) => (
//             <div key={event.id} className="event-card">
//               <h4>{event.title}</h4>
//               <p className="desc">{event.description}</p>
//               <p><strong>Time:</strong> {new Date(event.dateTime).toLocaleString()}</p>
//               <a href={event.eventLink} target="_blank" rel="noreferrer" className="join">Join Event</a>
//             </div>
//           ))}
//         </div>
//       ) : selectedDate ? (
//         <p className="no-event-msg">No events planned for this date.</p>
//       ) : null}
//     </div>
//   );
// };

// export default CalendarView;