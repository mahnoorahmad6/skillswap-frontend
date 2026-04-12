import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import './Dashboard.css'; 
import Navbar from '../components/Navbar';
function Home() {
  const user = useSelector((state) => state.user?.currentUser);

  return (
   
     <div className="dashboard-container">
      <Navbar></Navbar>

      {/* --- 2. Hero Section --- */}
      <header className="hero-section">
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
            <p>Trade your math tutoring for guitar lessons. Pure value exchange.</p>
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

      {/* Footer Info */}
      <footer className="footer-section">
        <p>© 2026 Skill Swap | All Knowledge is Shared.</p>
      </footer>
    </div>
  );
}

export default Home;