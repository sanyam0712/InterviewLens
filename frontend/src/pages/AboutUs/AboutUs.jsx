import React from 'react';
import './AboutUs.css';

function AboutUs() {
  return (
    <div className="about-container">
      <nav className="navbar">
        <div className="logo">InterviewLens</div>
      </nav>

      <header className="about-hero">
        <h1>About Us</h1>
        <p>Your journey to interview success starts here.</p>
      </header>

      <section className="about-content">
        <h2>Who We Are</h2>
        <p>
          InterviewLens is an innovative platform designed to transform how job seekers prepare for interviews. Our mission is to leverage cutting-edge AI technologies to create realistic and personalized interview experiences.
        </p>

        <h2>Our Vision</h2>
        <p>
          We envision a world where every candidate feels confident and prepared for any interview. Our AI-driven tools provide tailored mock interviews, real-time feedback, and performance analytics to boost your success.
        </p>

        <h2>Meet Our Team</h2>
        <p>
          Our team consists of AI experts, career coaches, and tech enthusiasts committed to helping you shine in your next job interview.
        </p>
      </section>

      <footer className="footer">
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: contact@interviewlens.com</p>
        </div>
      </footer>
    </div>
  );
}

export default AboutUs;