import React, { useEffect, useState } from "react";
import "./InterviewPage.css";
import questionDB from '../../assets/database.js';
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { GoogleGenerativeAI } from "@google/generative-ai";

import Result from "../Result/Result";

const InterviewPage = ({ profileId }) => {
  const [popup, setPopup] = useState(false);
  const [questionList, setQuestionList] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [userResult, setuserResult] = useState([]);
  const [output, setOutput] = useState("");
  const [numQuestions, setNumQuestions] = useState(3); // Number of questions to ask
  const [questionAsked, setQuestionAsked] = useState(false); // Flag to check if question is asked
  
  // Get questions based on profile ID
  useEffect(() => {
    const profile = questionDB.find((p) => p.id === profileId);
    if (profile) {
      // Randomize the question list and slice according to the numQuestions variable
      const shuffledQuestions = profile.Questions.sort(() => 0.5 - Math.random()).slice(0, numQuestions);
      setQuestionList(shuffledQuestions);
    }
  }, [profileId, numQuestions]);

  // code for API start ------------->>>>>>>>>>>
  const generateStory = async () => {
    console.log("Generating answer evaluation...");

    try {
      const genAI = new GoogleGenerativeAI(
        "AIzaSyDAVQ1TO1kkbDFxMVrTXLm8NTF1s_qWUAg"
      );
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      let prompt =
        "this is question: " +
        questionList[currentQuestionIndex] +
        " and user answer: " +
        transcript +
        " please give me the percentage of answer correctness as per the question and give me answer example output: 80 (no need to tell me anything else)";
      const result = await model.generateContent(prompt);

      const resultText = result.response.text();
      setOutput(resultText);
      setuserResult((prevResults) => [...prevResults, Number(resultText)]);
    } catch (error) {
      console.error("Error generating text:", error);
    }
  };
  // code for API end ------------->>>>>>>>>>>

  // code for speech to text start ------------->>>>>>>>>>>
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  
  useEffect(()=>{
    console.log(listening);
    
  },[listening])


  useEffect(() => {
    if (!listening && questionAsked) {
      // Automatically move to next question after user finishes answering
      console.log("i am here"+ listening + " "+ questionAsked);
      
      generateStory();
      if (currentQuestionIndex < numQuestions - 1) {
        setTimeout(() => {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          resetTranscript();
        }, 10000); // Show "Thank you" for 10 seconds before moving to the next question
      } else {
        setPopup(true);
      }
    }
  }, [ listening, currentQuestionIndex, numQuestions, resetTranscript]);

  const handleStartInterview = () => {
    console.log("i am up from down"+ listening + " "+ questionAsked);
    SpeechRecognition.startListening();
    setQuestionAsked(true);
    console.log("i am down"+ listening + " "+ questionAsked);
  };

  return (
    <div className="interview-page">
      <div className="interview-body">
        <h1>{listening ? "Listening..." : "Please Speak"}</h1>
        <p>Question: {questionList[currentQuestionIndex]}</p>
        <div>
          <p>Microphone: {listening ? "on" : "off"}</p>
          <button onClick={handleStartInterview}>Start</button>
          <button onClick={SpeechRecognition.stopListening}>Stop</button>
          <p>{transcript}</p>
          <p>{`You are ${output}% correct`}</p>
        </div>
        {popup ? (
          <ResultPOPup result={userResult} />
        ) : (
          <button
            onClick={() => {
              setPopup(true);
            }}
          >
            End Test
          </button>
        )}
      </div>
    </div>
  );
};

export default InterviewPage;

const ResultPOPup = ({ result }) => {
  let totalScore = result.reduce((acc, curr) => acc + curr, 0);
  let averageScore = totalScore / result.length;
  return <div className="resultpopup">Your result is {averageScore.toFixed(2)}%</div>;
};
