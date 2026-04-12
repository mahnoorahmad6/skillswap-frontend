import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import './Dashboard.css'; 

function Home() {
  const user = useSelector((state) => state.user?.currentUser);

  return (
    <div className="dashboard-container">
      
      {/* --- 1. Navigation Bar --- */}
      <nav className="nav-bar">
        <div className="nav-logo">SkillSwap<span>.</span></div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/search">Services</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </nav>

      {/* --- 2. Hero Section --- */}
      <header className="dashboard-header hero-section">
        <h1 className="dashboard-title">Master New Skills, <br/><br/><br/>Without Spending a Cent.</h1>
        <p className="hero-subtitle">
          The world’s first community-driven barter system for knowledge. 
          Teach what you know, learn what you don't.
        </p>
        
        <Link to="/search" className="card card-primary hero-cta">
          <div className="card-content">
            <h2>Start Swapping Now</h2>
            <p>Join 2,000+ students sharing skills today.</p>
          </div>
        </Link>
      </header>

      {/* --- 3. 3-Column Features Section --- */}
      <section className="features-grid">
        <div className="card card-secondary">
          <div className="card-icon">🧠</div>
          <div className="card-text">
            <h3>Learn Anything</h3>
            <p>From Python coding to pottery—find an expert for any niche.</p>
          </div>
        </div>

        <div className="card card-secondary">
          <div className="card-icon">🤝</div>
          <div className="card-text">
            <h3>Direct Barter</h3>
            <p>Trade one hour of your math tutoring for one hour of guitar lessons.</p>
          </div>
        </div>

        <div className="card card-secondary">
          <div className="card-icon">📈</div>
          <div className="card-text">
            <h3>Build Portfolio</h3>
            <p>Gain real-world experience and endorsements from your peers.</p>
          </div>
        </div>
      </section>


      {/* --- 5. Footer --- */}
      <footer className="footer-section">
        <div className="footer-content">
          <p>© 2026 Skill Swap Inc. | Made for the community.</p>
          <div className="social-links">
            <span>Twitter</span> • <span>LinkedIn</span> • <span>Instagram</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default Home;