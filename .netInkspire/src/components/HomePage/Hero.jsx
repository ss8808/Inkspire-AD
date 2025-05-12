import React from 'react';
import './Hero.css';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Welcome to <span className="highlight">Inkspire</span></h1>
        <p>Discover your next great read from a curated library</p>
        <div className="hero-buttons">
          <button className="primary-button">Browse Books</button>
          <button className="secondary-button" onClick={() => navigate('/register')}>
            Register Now
          </button>
        </div>
      </div>

      <div className="features">
        {['Fast Delivery', 'Curated Selection', 'Member Discounts', 'Archived Editions'].map((feature, index) => (
          <div className="feature-card" key={index}>
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
