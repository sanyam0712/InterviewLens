import React, { useState } from "react";
import "./Result.css";
import { useLocation } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const questionData = location.state?.questionData;
  const [faqs, setFaqs] = useState(questionData);
  console.log(faqs);
  const toggleFAQ = (index) => {
    setFaqs(
      faqs.map((faq, i) => {
        if (i === index) {
          faq.open = !faq.open;
        } else {
          faq.open = false;
        }

        return faq;
      })
    );
  };

  return (
    <div className="result">
      <h1>50% answers are correct</h1>
      <div className="answers-result">
        <div className="answer-details">
          {faqs.map((faq, index) => (
            <FAQ faq={faq} index={index} key={index} toggleFAQ={toggleFAQ} />
          ))}
        </div>
      </div>
    </div>
  );
};

const FAQ = ({ faq, index, toggleFAQ }) => {
  return (
    <div
      className={"faq " + (faq.open ? "open" : "")}
      key={index}
      onClick={() => toggleFAQ(index)}
    >
      <div className="faq-question">
        <div>{faq.question}</div>
        <div>{faq.score}</div>
        <div>{faq.rating}</div>
      </div>
      <div className="faq-answer"><div><b>Your Answer: </b>{faq.answer}</div>
      <div><b>Suggestion: </b> {faq.suggest}</div></div>
    </div>
  );
};

export default Result;
