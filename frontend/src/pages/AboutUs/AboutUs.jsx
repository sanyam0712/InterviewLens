import React, { useState } from "react";
import "./AboutUs.css";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate()
  return (
    <div onClick={navigate("/")} className="about-us-wrapper">
      <nav className="navbar">
        <div className="logo" onClick={() => navigate("/")}>InterviewLens</div>
      </nav>
      <h1 className="about-us-title">About Us</h1>
      <div className="about-us-container">
        <p>
          Welcome to the InterviewLens - your ultimate destination for mastering
          the art of interviews in today's competitive job market. Our platform
          is designed to empower users by providing a realistic, supportive, and
          interactive environment where they can enhance their interview skills,
          build confidence, and achieve their career aspirations.
        </p>
        <p>
          At its core, InterviewLens simulates real-life interview scenarios
          tailored to the user's chosen profession. By selecting a predefined
          role, users engage in role-specific mock interviews, complete with
          audio-driven questions and recorded vocal responses. This immersive
          experience replicates the pressure and formality of actual interviews,
          helping users become familiar with high-stakes environments.
        </p>
        <p>
          What sets us apart is our integration of cutting-edge AI technologies.
          Using tools like GEMINI for evaluating responses and DeepFace for
          analyzing emotions, we provide users with comprehensive feedback on
          their performance. From assessing verbal accuracy to gauging emotional
          composure, our feedback offers actionable insights that help users
          refine their communication skills and bolster their confidence.
        </p>
        <p>
          Our platform goes beyond traditional interview preparation by
          incorporating real-time data analysis and intuitive user interfaces.
          We record and evaluate both verbal and non-verbal cues, providing
          users with a holistic understanding of their strengths and areas for
          improvement. Whether it's building poise under pressure or fine-tuning
          technical responses, we guide users every step of the way.
        </p>
        <p>
          Built with usability, scalability, and security in mind, the Mock
          Interviewing Website caters to a diverse audience, from students
          embarking on their professional journeys to seasoned professionals
          seeking to refine their skills. With robust security measures and a
          commitment to user privacy, we ensure a safe and reliable environment
          for all.
        </p>
        <p>
          Join us in transforming interview preparation into a comprehensive and
          confidence-building experience. Let's work together to unlock your
          full potential and pave the way for success in your career.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
