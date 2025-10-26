// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CreateEvent from "./pages/CreateEvent";
import ViewEvents from "./pages/ViewEvents";
import Participate from "./pages/Participate";
import "./styles/Global.css";

const App = () => {
  const [user, setUser] = React.useState(null);
  const [userRole, setUserRole] = React.useState(localStorage.getItem("role") || "user");

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      setUser(JSON.parse(userData));
      setUserRole(JSON.parse(userData).role || "user");
    }
  }, []);

  const handleLogin = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("role", userData.role || "user");
    setUser(userData);
    setUserRole(userData.role || "user");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    setUser(null);
    setUserRole("user");
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} onLogin={handleLogin} />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          {userRole === "admin" && <Route path="/create-event" element={<CreateEvent />} />}
          <Route path="/events" element={<ViewEvents />} />
          <Route path="/participate/:id" element={<Participate />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;