import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NavBar2.css";

const NavBar2 = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const roles = [
    "Front-end Developer",
    "Back-end Developer",
    "Full-stack Developer",
    "Data Scientist",
    "DevOps Engineer",
    "Database Administrator"
  ];

  const handleOptionChange = (index) => {
    setSelectedRole(index + 1);
  };

  const startInterview = () => {
    if (selectedRole) {
      navigate("/interview", {
        state: { profileId: selectedRole, numQuestions: 3 },
      });
      closeModal();
    } else {
      alert("Please select a role.");
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-items">
        <a href="#home" className="nav-link">Home</a>
        <a href="#about" className="nav-link">About Us</a>
      </div>
      <button className="button" onClick={openModal}>Start Interview</button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Select an Interview Type</h2>
            <div className="options">
              {roles.map((role, index) => (
                <label key={index} className="option-label">
                  <input
                    type="radio"
                    value={index + 1}
                    checked={selectedRole === index + 1}
                    onChange={() => handleOptionChange(index)}
                  />
                  {role}
                </label>
              ))}
            </div>
            <button className="start-button" onClick={startInterview}>Start Interview</button>
            <button className="close-button" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar2;
