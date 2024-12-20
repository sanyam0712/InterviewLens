// Home.js
import React from 'react';
import './Navbar2.css';

function NavBar2() {
  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="logo">InterviewLens</div>
        <div className="nav-buttons">
          <button>Topics</button>
          <button>Login</button>
        </div>
      </nav>

      <header className="hero">
        <h1>Welcome to InterviewLens</h1>
        <p>Your AI-powered interview preparation platform.</p>
        <button className="start-btn">Start Interview</button>
      </header>

      <section className="features">
        <h2>Core Features</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <h3>AI-driven Mock Interviews</h3>
            <p>Simulate real interview experiences with AI-generated questions and feedback.</p>
          </div>
          <div className="feature-card">
            <h3>Job-specific Interview Questions</h3>
            <p>Get tailored questions based on your selected job role and expertise level.</p>
          </div>
          <div className="feature-card">
            <h3>Facial Expression Analysis</h3>
            <p>Advanced AI evaluates your facial expressions to assess confidence and presence.</p>
          </div>
          <div className="feature-card">
            <h3>Performance Reports</h3>
            <p>Receive comprehensive reports on your answers, highlighting strengths and areas for improvement.</p>
          </div>
          <div className="feature-card">
            <h3>Real-time Feedback</h3>
            <p>Instant AI feedback on your responses for continuous learning and better preparation.</p>
          </div>
          <div className="feature-card">
            <h3>Personalized Study Plans</h3>
            <p>Create custom study plans based on your progress and learning needs.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>Learn more about our mission and team dedicated to improving your interview skills.</p>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: contact@interviewlens.com</p>
        </div>
      </footer>
    </div>
  );
}

export default NavBar2;