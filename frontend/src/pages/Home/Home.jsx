import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { gsap, Power3 } from "gsap";
import InterviewPage from "../InterviewPage/InterviewPage";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../app/authSlice.js";

function Home() {
  const [isModalOpen, setModalOpen] = useState(false);
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="logo">InterviewLens</div>
        <div className="nav-buttons">
          <button onClick={() => setModalOpen(true)}>Topics</button>
          {isLoggedIn ? (
            <>
              <button
                onClick={()=>dispatch(logout())}
              >
                Logout
              </button>
              <p>Hello, {user.name}</p>
            </>
          ) : (
            <button
              onClick={()=>navigate("/login")}
            >
              Login
            </button>
          )}
        </div>
      </nav>

      <header className="hero">
        <h1>Welcome to InterviewLens</h1>
        <p>Your AI-powered interview preparation platform.</p>
        <button className="start-btn" onClick={() => setModalOpen(true)}>
          Start Interview
        </button>
      </header>

      <section className="features">
        <h2>Core Features</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <h3>AI-driven Mock Interviews</h3>
            <p>
              Simulate real interview experiences with AI-generated questions
              and feedback.
            </p>
          </div>
          <div className="feature-card">
            <h3>Job-specific Interview Questions</h3>
            <p>
              Get tailored questions based on your selected job role and
              expertise level.
            </p>
          </div>
          <div className="feature-card">
            <h3>Facial Expression Analysis</h3>
            <p>
              Advanced AI evaluates your facial expressions to assess confidence
              and presence.
            </p>
          </div>
          <div className="feature-card">
            <h3>Performance Reports</h3>
            <p>
              Receive comprehensive reports on your answers, highlighting
              strengths and areas for improvement.
            </p>
          </div>
          <div className="feature-card">
            <h3>Real-time Feedback</h3>
            <p>
              Instant AI feedback on your responses for continuous learning and
              better preparation.
            </p>
          </div>
          <div className="feature-card">
            <h3>Personalized Study Plans</h3>
            <p>
              Create custom study plans based on your progress and learning
              needs.
            </p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>
            Learn more about our mission and team dedicated to improving your
            interview skills.
          </p>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: contact@interviewlens.com</p>
        </div>
      </footer>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

export default Home;

const Modal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);
  const [selection, setSelection] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        modalRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "power3.out" }
      );
    }
  }, [isOpen]);

  const handleOptionSelect = (option, index) => {
    setSelection(index + 1);
  };

  const startInterview = () => {
    if (selection) {
      navigate("/interview", {
        state: { profileId: selection, numQuestions: 3 },
      });
    } else {
      alert("Please select a role.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal" ref={modalRef}>
        <h2>Select a Role</h2>
        <ul>
          {[
            "Front-end Developer",
            "Back-end Developer",
            "Full-stack Developer",
            "Data Scientist",
            "DevOps Engineer",
            "Database Administrator",
          ].map((option, index) => (
            <li
              key={index}
              style={
                selection - 1 === index
                  ? { backgroundColor: "#4CAF50", color: "#fff" }
                  : { backgroundColor: "#555", color: "#fff" }
              }
              onClick={() => handleOptionSelect(option, index)}
            >
              {option}
            </li>
          ))}
        </ul>
        <div className="action-buttons">
          <button className="close-btn" onClick={onClose}>
            Close
          </button>
          <button className="next-btn" onClick={startInterview}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
