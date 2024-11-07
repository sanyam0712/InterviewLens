import React, { useEffect, useState } from "react";
import "./InterviewPage.css";
import questionDB from "../../assets/database.js";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useLocation } from "react-router-dom";


// what i want to do (instructions)
// - interview page call with a parameters profile ID(profileId) and number of questions (numQuestions) - DONE
// - when user enter in interview page a popup was come witha button let's started - DONE
// - question one display on screen ans computer will speak the question after the computer speaking was end
// -
// - the screen show listening on and start taking input from user if computer not get any new input from user then it will assumed that user done wit speaking.
// - when user done with speaking then computer sends the collected user input and the question to the gemini AI API and and gemini will return the percentage depends upon answer accuracy and length of answer.
// - the API result will stored in a list and again start with the next question
// - when the all the question are asked then a thank you window will show with a button "Show Result" to show result
// - after ckicking on the Show Result the result page will show with there result.



const InterviewPage = () => {
  const location = useLocation();
  const { profileId, numQuestions } = location.state || {};
  const [startPopup, setStartPopup] = useState(true);
  const [popup, setPopup] = useState(false);
  const [questionList, setQuestionList] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResult, setUserResult] = useState([]);
  const [output, setOutput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    const profile = questionDB.find((p) => p.id === profileId);
    if (profile) {
      const shuffledQuestions = profile.Questions.sort(() => 0.5 - Math.random()).slice(0, numQuestions);
      setQuestionList(shuffledQuestions);
    }
  }, [profileId, numQuestions]);

  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  useEffect(() => {
    if (startPopup) return;

    if (currentQuestionIndex < questionList.length) {
      if (!isListening) {
        generateStory();
        
        setTimeout(() => {
          
          setCurrentQuestionIndex(currentQuestionIndex + 1); 
        }, 4000);
      }
    } else {
      setPopup(true); 
    }
  }, [isListening]);

  useEffect(() => {
    console.log("hello " + currentQuestionIndex);
    askQuestion(currentQuestionIndex);
  
  }, [currentQuestionIndex])
  

  const askQuestion = () => {
    if (currentQuestionIndex >= 0 && currentQuestionIndex < questionList.length) {
      const question = questionList[currentQuestionIndex];
      console.log(`Asking question: ${question}`);

      const utterance = new SpeechSynthesisUtterance(questionList[currentQuestionIndex]);
      speechSynthesis.speak(utterance);

      SpeechRecognition.startListening({ continuous: true });
      setIsListening(true);
      startInactivityTimer();
    }
  };

  const generateStory = async () => {
    console.log("Generating answer evaluation...");

    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      let prompt =
  `You are evaluating a user's response to an interview question. 
  Here is the question: "${questionList[currentQuestionIndex]}"
  And here is the user's response: "${transcript}"
  Please assess the response based on the following criteria:
  1. Relevance: Does the answer address the question?
  2. Accuracy: Is the information in the response factually correct?
  3. Completeness: Does the answer cover key points that are expected for this role?

  Based on these factors, provide a score between 0 and 100, where 100 is a perfect answer and 0 means no relevance or correctness. Output the score as a number only, without any additional comments or explanation. Example: 85`

      const result = await model.generateContent(prompt);
      console.log(prompt);

      const resultText = result.response.text();
      setOutput(resultText);
      setUserResult((prevResults) => [...prevResults, Number(resultText)]);
      resetTranscript(); 
      console.log("Generating answer done");
      

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
      SpeechRecognition.stopListening(); // Stop listening after 10 seconds of inactivity
      
    }, 6000); // 10 seconds

    setTimer(newTimer);
  };

  // Effect to monitor changes in transcript and reset the timer
  useEffect(() => {
    if (isListening) {
 startInactivityTimer(); // Reset the timer on every transcript update
    }
  }, [transcript]);

  return (
    <div className="interview-page">
      {startPopup ? (
        <div className="popup">
          <h2>Welcome to the Interview</h2>
          <button onClick={() => { setStartPopup(false); askQuestion(); console.log(currentQuestionIndex);
           }}>
            Let's Get Started
          </button>
        </div>
      ) : (
        <div className="interview-body">
          <h1>{listening ? "Listening..." : "Please Speak"}</h1>
          <p >{`profile id:  ${
            questionDB.find((p) => p.id === profileId).profile
          }`}</p>
          <p>Question: {questionList[currentQuestionIndex]}</p>
          <div>
            <p>Microphone: {listening ? "on" : "off"}</p>
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