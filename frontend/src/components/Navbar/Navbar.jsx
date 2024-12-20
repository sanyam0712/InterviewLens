import React, { useEffect, useRef, useState } from "react";
import { gsap, Power3 } from "gsap";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

// Modal component
const Modal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);
  const [selection, setSelection] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        modalRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: Power3.easeOut }
      );
    }
  }, [isOpen]);

  const handleOptionSelect = (option, index) => {
    setSelection(index+1);
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
        <h2>Select an Option</h2>
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
              style={selection-1 === index ? { backgroundColor: "green" } : {}}
              onClick={() => handleOptionSelect(option, index)}
            >
              {option}
            </li>
          ))}
        </ul>
        <div className="action-button">
        <button onClick={onClose}>Close</button>
        <button onClick={startInterview}>Next</button>
        </div>
        
      </div>
    </div>
  );
};

function Navbar() {
  const miniCircleRef = useRef(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    firstPageAnim();
  }, []);

  function firstPageAnim() {
    const tl = gsap.timeline();
    tl.to(".boundingelem", {
      y: 0,
      ease: Power3.easeInOut,
      duration: 2,
      delay: -1,
      stagger: 0.2,
    });
  }

  useEffect(() => {
    const handleMouseMove = (dets) => {
      if (miniCircleRef.current) {
        miniCircleRef.current.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div>
      <div id="minicircle" ref={miniCircleRef}></div>
      <div id="main">
        <div id="hero">
          <div id="nav">
            <a href="#">HOME</a>
            <button onClick={() => setModalOpen(true)} className="topic-button">
              TOPIC
            </button>
            <h4>ABOUT</h4>
          </div>

          <div id="heading">
            <div className="bounding">
              <h1 className="boundingelem">interview</h1>
            </div>
            <div id="blocktext">
              <div className="bounding">
                <h1 id="secondheading" className="boundingelem">
                  lense
                </h1>
              </div>
              {/* <h5>interview prep made simple</h5> */}
            </div>
          </div>
          <div className="heroft">
            {/* <div>ai integrated</div>
            <div>ready to use</div> */}
          </div>
        </div>

        <div id="second">
          <div className="elem">
            <img
              src="https://www.shutterstock.com/shutterstock/photos/2479873253/display_1500/stock-vector-bullseye-icon-ideal-for-target-and-accuracy-themes-2479873253.jpg"
              alt=""
            />
            <h1>accurate</h1>
            <h6>2022</h6>
          </div>
          <div className="elem">
            <img
              src="https://www.shutterstock.com/image-photo/relevant-word-written-wooden-cube-260nw-578764762.jpg"
              alt=""
            />
            <h1>relevant topic</h1>
            <h6>2022</h6>
          </div>
          <div className="elem">
            <img
              src="https://img.freepik.com/free-vector/ai-technology-microchip-background-vector-digital-transformation-concept_53876-117808.jpg"
              alt=""
            />
            <h1>ai integrated</h1>
            <h6>2022</h6>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

export default Navbar;
