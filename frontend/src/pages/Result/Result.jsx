import React, { useEffect, useState, useCallback } from "react";
import "./Result.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Result = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const [scores, setScores] = useState([]);
  const questionData = location.state?.questionData || [];
  const emotion = location.state?.emotion || "";
  const [faqs, setFaqs] = useState(questionData);
  
  // Memoized fetchScore function to prevent redefinition on every render
  const fetchScore = useCallback(async () => {
    try {
      const response = await fetch(
        "https://interview-lens.vercel.app/api/user/scores/sarthak@gmail.com"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setScores(data.scoreData);
    } catch (error) {
      console.error(error);
    }
  }, []); // Empty dependency array ensures this is only created once

  useEffect(() => {
    fetchScore();
  }, [fetchScore]); // Now only triggers when fetchScore changes (never in this case)

  useEffect(() => {
    if (!faqs.length || !isLoggedIn) {
      navigate("/");
    }
  }, [faqs, isLoggedIn, navigate]);

  const average =
    faqs.reduce((acc, curr) => acc + (curr.score || 0), 0) / faqs.length || 0;

  const toggleFAQ = (index, section) => {
    if (section === "faqs") {
      setFaqs((prevFaqs) =>
        prevFaqs.map((faq, i) => 
          i === index ? { ...faq, open: !faq.open } : faq
        )
      );
    } else if (section === "scores") {
      setScores((prevScores) =>
        prevScores.map((score, i) => 
          i === index ? { ...score, open: !score.open } : score
        )
      );
    }
  };

  return (
    <div className="result">
      <nav className="navbar">
        <div className="logo" onClick={() => navigate("/")}>InterviewLens</div>
      </nav>
      <h1>{average.toFixed(2)}% answers are correct</h1>
      <h1>You are looking {emotion}</h1>
      <div className="answers-result">
        <div className="answer-section">
          <h2>Answer Details</h2>
          {faqs.map((faq, index) => (
            <FAQ
              faq={faq}
              index={index}
              key={`faq-${index}`}
              toggleFAQ={() => toggleFAQ(index, "faqs")}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const FAQ = ({ faq, toggleFAQ }) => (
  <div
    className={`faq ${faq.open ? "open" : ""}`}
    onClick={toggleFAQ}
  >
    <div className="faq-question">
      <div>{faq.question}</div>
      <div>Score: {faq.score}</div>
      <div>Rating: {faq.rating}</div>
    </div>
    {faq.open && (
      <div className="faq-answer">
        <div>
          <b>Your Answer:</b> {faq.answer}
        </div>
        <div>
          <b>Suggestion:</b> {faq.suggest}
        </div>
      </div>
    )}
  </div>
);

export default Result;
