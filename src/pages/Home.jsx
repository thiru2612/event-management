// src/pages/Home.jsx
import React from "react";
import "../styles/Home.css";

const Home = () => (
  <div className="home">
    <section className="hero">
      <div className="overlay">
        <h1>Enhance Your Virtual & Hybrid Event Experience</h1>
        <p>
          Event2Way helps you host, manage, and join engaging virtual and hybrid events with ease.  
          Connect with your audience anywhere in the world.
        </p>
        <button className="cta-btn">Learn More</button>
      </div>
    </section>

    <section className="about">
      <h2>Our Services</h2>
      <div className="cards">
        <div className="card">
          <h3>Townhall</h3>
          <p>Seamless streaming for global collaboration and open communication.</p>
        </div>
        <div className="card">
          <h3>Product Launch</h3>
          <p>Deliver exciting launches with high-quality, interactive broadcasts.</p>
        </div>
        <div className="card">
          <h3>Press Conference</h3>
          <p>Spread your message effectively with professional live events.</p>
        </div>
      </div>
    </section>
  </div>
);

export default Home;