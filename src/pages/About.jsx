import React from 'react';
import { Link } from "react-router-dom";
import './Dashboard.css'; 

function About() {
  return (
    <div className="dashboard-container">
      {/* Navigation - keeping it consistent with home */}
      <nav className="nav-bar">
        <div className="nav-logo">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            SkillSwap<span>.</span>
          </Link>
        </div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about" className="active-link">About</Link>
          <Link to="/search">Services</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </nav>

      {/* --- Page Header --- */}
      <header className="dashboard-header text-center">
        <h1 className="dashboard-title">Our Mission</h1>
        <p className="hero-subtitle">
          Revolutionizing how campus communities share knowledge through direct human connection.
        </p>
      </header>

      {/* --- Main Story Section --- */}
      <section className="about-snippet" style={{ marginBottom: '40px' }}>
        <div className="about-card">
          <h2>The Core Idea</h2>
          <p>
            We believe that education should be accessible to everyone. 
            Skill Swap was born from a simple idea: <strong>everyone is an expert at something.</strong> 
            Whether you are a coding prodigy, a master chef, or a guitar enthusiast, 
            you have value to offer. Our mission is to unlock the hidden knowledge 
            within our campus community by facilitating fair, friendly, and free 
            exchanges of expertise.
          </p>
        </div>
      </section>

      {/* --- Values Grid (3-Column) --- */}
      <div className="dashboard-grid">
        <div className="card card-secondary">
          <div className="card-icon">💡</div>
          <div className="card-text">
            <h3>Knowledge is Currency</h3>
            <p>We believe learning shouldn't always have a price tag. Your time is the only investment needed.</p>
          </div>
        </div>

        <div className="card card-secondary">
          <div className="card-icon">🤝</div>
          <div className="card-text">
            <h3>Community First</h3>
            <p>Skill Swap strengthens campus bonds by connecting people who might never have met otherwise.</p>
          </div>
        </div>
      </div>

      {/* --- Call to Action Section --- */}
      <section style={{ marginTop: '60px', textAlign: 'center' }}>
        <Link to="/search" className="card card-primary" style={{ display: 'inline-flex', maxWidth: '400px', margin: '0 auto' }}>
          <div className="card-content text-center">
            <h2>Ready to Swap?</h2>
            <p>Join the movement and start teaching or learning today.</p>
          </div>
        </Link>
      </section>

      {/* --- Simple Team Footer --- */}
      <footer className="footer-section">
        <div className="footer-content">
          <p>© 2026 Skill Swap. Built by students, for students.</p>
        </div>
      </footer>
    </div>
  );
}

export default About;