// import React, { useEffect, useRef, useState } from "react";
// import LocomotiveScroll from "locomotive-scroll";
// import { gsap, Power3 } from "gsap";
// import "./Navbar.css";
// import "locomotive-scroll/src/locomotive-scroll.scss";
// import InterviewPage from "../../pages/InterviewPage/InterviewPage";

// // Modal component
// const Modal = ({ isOpen, onClose }) => {
//   const modalRef = useRef(null);
//   const [selection, setSelection] = useState(1);

//   useEffect(() => {
//     if (isOpen) {
//       // Animate modal entrance
//       gsap.fromTo(
//         modalRef.current,
//         { scale: 0, opacity: 0 },
//         { scale: 1, opacity: 1, duration: 0.5, ease: Power3.easeOut }
//       );
//     }
//   }, [isOpen]);

//   const handleOptionSelect = (option, index) => {
//     alert(`You selected ${option}`);
//     setSelection(index);
//     onClose(); // Close the modal after selection
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="modal-overlay">
//       <div className="modal" ref={modalRef}>
//         <h2>Select an Option</h2>
//         <ul>
//           {[
//             "Front-end Developer",
//             "Back-end Developer",
//             "Full-stack Developer",
//             "Data Scientist",
//             "DevOps Engineer",
//             "Database Administrator",
//           ].map((option, index) => (
//             <li key={index} onClick={() => handleOptionSelect(option, index)}>
//               {option}
//             </li>
//           ))}
//         </ul>
//         <button onClick={onClose}>Close</button>
//         <button onClick={<InterviewPage numQuestions={3} profileId={selection}/>}>Start Interview Now</button>
//       </div>
//     </div>
//   );
// };

// function Navbar() {
//   const scrollRef = useRef(null);
//   const miniCircleRef = useRef(null);
//   const [isModalOpen, setModalOpen] = useState(false);

//   useEffect(() => {
//     const scroll = new LocomotiveScroll({
//       el: scrollRef.current,
//       smooth: true,
//       multiplier: 0.7,
//     });

//     firstPageAnim();

//     return () => {
//       if (scroll) scroll.destroy();
//     };
//   }, []);

//   function firstPageAnim() {
//     var tl = gsap.timeline();

//     tl.from("av", {
//       y: "-10",
//       opacity: 0,
//       duration: 1.5,
//       ease: Power3.easeInOut,
//     }).to(".boundingelem", {
//       y: 0,
//       ease: Power3.easeInOut,
//       duration: 2,
//       delay: -1,
//       stagger: 0.2,
//     });
//   }

//   useEffect(() => {
//     const handleMouseMove = (dets) => {
//       if (miniCircleRef.current) {
//         miniCircleRef.current.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
//       }
//     };

//     window.addEventListener("mousemove", handleMouseMove);
//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//     };
//   }, []);

//   return (
//     <div data-scroll-container ref={scrollRef}>
//       <div id="minicircle" ref={miniCircleRef}></div>
//       <div id="main" data-scroll-section>
//         <div id="hero">
//           <div id="nav">
//             <a href="#">HOME</a>
//             <button onClick={() => setModalOpen(true)} className="topic-button">
//               TOPIC
//             </button>
//             <h4>ABOUT</h4>
//           </div>

//           <div id="heading">
//             <div className="bounding">
//               <h1 className="boundingelem">interview</h1>
//             </div>
//             <div id="blocktext">
//               <div className="bounding">
//                 <h1 id="secondheading" className="boundingelem">
//                   lense
//                 </h1>
//               </div>
//               <h5>interview prep made simple</h5>
//             </div>
//           </div>
//           <div className="heroft">
//             <div>ai integrated</div>
//             <div>ready to use</div>
//           </div>
//         </div>

//         <div id="second">
//           <div className="elem">
//             <img
//               src="https://www.shutterstock.com/shutterstock/photos/2479873253/display_1500/stock-vector-bullseye-icon-ideal-for-target-and-accuracy-themes-2479873253.jpg"
//               alt=""
//             />
//             <h1>accurate</h1>
//             <h6>2022</h6>
//           </div>
//           <div className="elem">
//             <img
//               src="https://www.shutterstock.com/image-photo/relevant-word-written-wooden-cube-260nw-578764762.jpg"
//               alt=""
//             />
//             <h1>relevant topic</h1>
//             <h6>2022</h6>
//           </div>
//           <div className="elem">
//             <img
//               src="https://img.freepik.com/free-vector/ai-technology-microchip-background-vector-digital-transformation-concept_53876-117808.jpg?t=st=1730062046~exp=1730065646~hmac=3f892ef81c99bb3cb3178da9b581e2de72928c8c359d6a8923eb5d8b7c2b3f2c&w=996"
//               alt=""
//             />
//             <h1>ai integrated</h1>
//             <h6>2022</h6>
//           </div>
//         </div>
//       </div>
//       <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
//     </div>
//   );
// }

// export default Navbar;
