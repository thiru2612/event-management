// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const scrollToServices = () => {
    document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Transform Your Event Experience</h1>
          <p>
            Create, manage, and participate in engaging virtual and hybrid events. 
            Connect with your audience anywhere in the world with our comprehensive event platform.
          </p>
          <button className="cta-btn" onClick={scrollToServices}>
            Discover More
          </button>
        </div>
      </section>

      <section id="services" className="services-section">
        <div className="services-header">
          <h2>Our Event Solutions</h2>
          <p>
            From intimate meetings to large-scale conferences, we provide the tools 
            and platform to make your events memorable and impactful.
          </p>
        </div>
        
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3>Town Hall Meetings</h3>
            <p>Host transparent, engaging town halls with interactive Q&A sessions, polls, and seamless streaming for global participation.</p>
          </div>
          
          <div className="service-card">
            <div className="service-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
            </div>
            <h3>Product Launches</h3>
            <p>Create buzz with professional product launches featuring high-quality broadcasts, interactive demos, and real-time audience engagement.</p>
          </div>
          
          <div className="service-card">
            <div className="service-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                <path d="M2 2l7.586 7.586"></path>
                <circle cx="11" cy="11" r="2"></circle>
              </svg>
            </div>
            <h3>Press Conferences</h3>
            <p>Deliver your message to the world with professional press conferences, media kits, and comprehensive coverage tools.</p>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-number">10K+</span>
            <span className="stat-label">Events Hosted</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">500K+</span>
            <span className="stat-label">Participants</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">99.9%</span>
            <span className="stat-label">Uptime</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Support</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;