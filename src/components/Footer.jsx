// src/components/Footer.jsx
import React from "react";

const Footer = () => (
  <footer style={{
    background: "var(--gray-900)",
    color: "var(--gray-300)",
    textAlign: "center",
    padding: "2rem 1rem",
    marginTop: "auto",
    borderTop: "1px solid var(--gray-800)",
  }}>
    <div style={{
      maxWidth: "1200px",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      alignItems: "center"
    }}>
      <div style={{
        fontSize: "1.25rem",
        fontWeight: "700",
        background: "linear-gradient(135deg, var(--primary-color), var(--secondary-color))",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text"
      }}>
        Event2Way
      </div>
      
      <div style={{
        display: "flex",
        gap: "2rem",
        fontSize: "0.875rem",
        flexWrap: "wrap",
        justifyContent: "center"
      }}>
        <span>Privacy Policy</span>
        <span>Terms of Service</span>
        <span>Support</span>
        <span>Contact</span>
      </div>
      
      <div style={{
        fontSize: "0.75rem",
        color: "var(--gray-500)",
        borderTop: "1px solid var(--gray-800)",
        paddingTop: "1rem",
        width: "100%"
      }}>
        © 2024 Event2Way. All rights reserved. Built with modern web technologies.
      </div>
    </div>
  </footer>
);

export default Footer;