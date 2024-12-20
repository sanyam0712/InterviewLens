import React, { useEffect, useRef, useState } from "react";
import "./InterviewPage.css";
import questionDB from "../../assets/database.js";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useLocation } from "react-router-dom";

const InterviewPage = ({ profileId, numQuestions }) => {
  const location = useLocation();
  // const { profileId, numQuestions } = location.state || {};
  const [startPopup, setStartPopup] = useState(true);
  const [popup, setPopup] = useState(false);
  const [questionList, setQuestionList] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResult, setUserResult] = useState([]);
  const [output, setOutput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [timer, setTimer] = useState(null);
  const [cameraOn, setCameraOn] = useState(false);
  const videoRef = useRef(null);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    console.log(profileId);
    const profile = questionDB.find((p) => p.id === profileId);
    if (profile) {
      const shuffledQuestions = profile.Questions.sort(
        () => 0.5 - Math.random()
      ).slice(0, numQuestions);
      setQuestionList(shuffledQuestions);
    }
  }, [profileId, numQuestions]);

  useEffect(() => {
    if (cameraOn) {
      const startCamera = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error("Error accessing camera:", error);
        }
      };
      startCamera();
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    }
  }, [cameraOn]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const askQuestion = () => {
    if (currentQuestionIndex < questionList.length) {
      const question = questionList[currentQuestionIndex];
      const utterance = new SpeechSynthesisUtterance(question);
      speechSynthesis.speak(utterance);

      utterance.onend = () => {
        SpeechRecognition.startListening({ continuous: true });
        setIsListening(true);
        startInactivityTimer();
      };
    } else {
      setPopup(true);
    }
  };

  const generateStory = async () => {
    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      let prompt = `You are evaluating a user's response to an interview question. 
      Here is the question: "${questionList[currentQuestionIndex]}"
      And here is the user's response: "${transcript}"
      Please assess the response based on the following criteria:
      1. Relevance: Does the answer address the question?
      2. Accuracy: Is the information in the response factually correct?
      3. Completeness: Does the answer cover key points that are expected for this role?

      Based on these factors, provide a score between 0 and 100, where 100 is a perfect answer and 0 means no relevance or correctness. Output the score as a number only, without any additional comments or explanation. Example: 85`;

      const result = await model.generateContent(prompt);
      const resultText = await result.response.text();
      setOutput(resultText);
      setUserResult((prevResults) => [...prevResults, Number(resultText)]);
      resetTranscript();
      setIsListening(false);
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } catch (error) {
      console.error("Error generating text:", error);
    }
  };

  const startInactivityTimer = () => {
    if (timer) {
      clearTimeout(timer);
    }

    const newTimer = setTimeout(() => {
      setIsListening(false);
      SpeechRecognition.stopListening();
      generateStory();
    }, 6000);

    setTimer(newTimer);
  };

  useEffect(() => {
    if (startPopup) return;
    if (!isListening) {
      askQuestion();
    }
  }, [currentQuestionIndex, startPopup]);

  useEffect(() => {
    if (isListening) {
      startInactivityTimer();
    }
  }, [transcript]);

  return (
    <div className="interview-page">
      {startPopup ? (
        <div className="popup">
          <h2>Welcome to the Interview</h2>
          <button onClick={() => setStartPopup(false)}>
            Let's Get Started
          </button>
        </div>
      ) : (
        <div className="interview-body">
          <div className="interview-parts">
            <div className="interview-right">
              <h1>{listening ? "Listening..." : "Please Speak"}</h1>
              <p>{`profile id: ${
                questionDB.find((p) => p.id === profileId).profile
              }`}</p>
              <p>Question: {questionList[currentQuestionIndex]}</p>
              <div>
                <p>Microphone: {listening ? "on" : "off"}</p>
                <p>{transcript}</p>
                <p>{`You are ${output}% correct`}</p>
              </div>
              <button onClick={() => setCameraOn((prev) => !prev)}>
                {cameraOn ? "Turn Off Camera" : "Turn On Camera"}
              </button>

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
          
          <div className="camera-div">
            {cameraOn && <video style={{ width: "300px", height: "200px", borderRadius: "10px" }}  ref={videoRef} autoPlay playsInline />}
          </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewPage;

const ResultPOPup = ({ result }) => {
  let totalScore = result.reduce((acc, curr) => acc + curr, 0);
  let averageScore = totalScore / result.length;
  return (
    <div className="resultpopup">Your result is {averageScore.toFixed(2)}%</div>
  );
};
