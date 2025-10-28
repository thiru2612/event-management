// src/api.js
import axios from "axios";

// const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8080/api";
const API_BASE = "https://8080-ecbdadcdaceeacdfbfebadcadedeffceaaecaa.premiumproject.examly.io/api";

const instance = axios.create({
  baseURL: API_BASE,
  timeout: 5000,
});

// attach token if present
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getEvents = (params = {}) => {
  const queryParams = new URLSearchParams();
  if (params.page !== undefined) queryParams.append('page', params.page);
  if (params.size !== undefined) queryParams.append('size', params.size);
  if (params.sortBy) queryParams.append('sortBy', params.sortBy);
  if (params.sortDir) queryParams.append('sortDir', params.sortDir);
  if (params.type) queryParams.append('type', params.type);
  
  const queryString = queryParams.toString();
  return instance.get(`/events${queryString ? '?' + queryString : ''}`);
};
export const getEvent = (id) => instance.get(`/events/${id}`);
export const createEvent = (event) => instance.post("/events", event);
export const rsvpToEvent = (id, attendee) =>
  instance.post(`/events/${id}/rsvp`, null, { params: { attendee } });

// users & auth
export const registerUser = (user) => instance.post("/users", user);
export const login = (creds) => axios.post(`${API_BASE}/auth/login`, creds); // auth endpoint may be unsecured
export const getUsers = () => instance.get("/users");

// feedback / participants
export const submitFeedback = (feedback) => instance.post("/feedback", feedback);
export const registerParticipant = (participant) => instance.post("/participants", participant);

export default instance;