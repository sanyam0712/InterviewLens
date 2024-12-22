import React, { useEffect, useState } from "react";
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
  console.log(questionData);
  
  useEffect(() => {
    const fetchScore = async () => {
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
    };
    fetchScore();
  }, []);

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
        prevFaqs.map((faq, i) => ({
          ...faq,
          open: i === index ? !faq.open : faq.open,
        }))
      );
    } else if (section === "scores") {
      setScores((prevScores) =>
        prevScores.map((score, i) => ({
          ...score,
          open: i === index ? !score.open : score.open,
        }))
      );
    }
  };

  return (
    <div className="result">
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
        {/* <div className="answer-section">
          <h2>Previous Play</h2>
          {scores.map((score, index) => (
            <div
              className={`faq ${score.open ? "open" : ""}`}
              onClick={() => toggleFAQ(index, "scores")}
              key={`score-${index}`}
            >
              <div className="faq-question">
                <div>Job Profile: {score.jobProfile}</div>
                <div>Score: {score.totalScore}</div>
                <div>Rating: {score.rating}</div>
              </div>
              {score.open &&
                score.questions.map((question, i) => (
                  <div className="faq-answer" key={`question-${i}`}>
                    <div>
                      <b>Question:</b> {question.questionText}
                    </div>
                    <div>
                      <b>Suggestion:</b> {question.score}
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div> */}
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
