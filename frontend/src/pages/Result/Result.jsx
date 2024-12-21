import React, { useEffect, useState } from "react";
import "./Result.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Result = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  
  const questionData = location.state?.questionData || [];
  const [faqs, setFaqs] = useState(questionData);

  useEffect(() => {
    if (!faqs.length || !isLoggedIn) {
      navigate("/");
    }
  }, [faqs, isLoggedIn, navigate]);

  const average = faqs.reduce((acc, curr) => acc + curr.score, 0) / faqs.length || 0;

  const toggleFAQ = (index) => {
    setFaqs((prevFaqs) =>
      prevFaqs.map((faq, i) => ({
        ...faq,
        open: i === index ? !faq.open : faq.open,
      }))
    );
  };

  return (
    <div className="result">
      <h1>{average.toFixed(2)}% answers are correct</h1>
      <div className="answers-result">
        <AnswerSection
          title="Answer Details"
          faqs={faqs}
          toggleFAQ={toggleFAQ}
        />
        <AnswerSection
          title="Previous Play"
          faqs={faqs}
          toggleFAQ={toggleFAQ}
        />
      </div>
    </div>
  );
};

const AnswerSection = ({ title, faqs, toggleFAQ }) => (
  <div className="answer-section">
    <h2>{title}</h2>
    {faqs.map((faq, index) => (
      <FAQ faq={faq} index={index} key={index} toggleFAQ={toggleFAQ} />
    ))}
  </div>
);

const FAQ = ({ faq, index, toggleFAQ }) => (
  <div
    className={`faq ${faq.open ? "open" : ""}`}
    onClick={() => toggleFAQ(index)}
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
