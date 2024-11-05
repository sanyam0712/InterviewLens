import React, { useEffect, useState } from "react";
import "./InterviewPage.css";
import questionDB from "../../assets/database.js";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { GoogleGenerativeAI } from "@google/generative-ai";

// what i want to do (instructions)
// - interview page call with a parameters profile ID(profileId) and number of questions (numQuestions) - DONE
// - when user enter in interview page a popup was come witha button let's started - DONE
// - question one display on screen ans computer will speak the question after the computer speaking was end
//  -
// - the screen show listening on and start taking input from user if computer not get any new input from user then it will assumed that user done wit speaking.
// - when user done with speaking then computer sends the collected user input and the question to the gemini AI API and and gemini will return the percentage depends upon answer accuracy and length of answer.
// - the API result will stored in a list and again start with the next question
// - when the all the question are asked then a thank you window will show with a button "Show Result" to show result
// - after ckicking on the Show Result the result page will show with there result.



const InterviewPage = ({ profileId, numQuestions }) => {
  const [startPopup, setStartPopup] = useState(true);
  const [popup, setPopup] = useState(false);
  const [questionList, setQuestionList] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResult, setUserResult] = useState([]);
  const [output, setOutput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [timer, setTimer] = useState(null);

  // Get questions based on profile ID
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

  // Handle question asking and listening
  useEffect(() => {
    if (startPopup) return; // Don't do anything if the popup is still open

    if (currentQuestionIndex < questionList.length) {
      if (!isListening) {
        generateStory();
        
        setTimeout(() => {
          
          setCurrentQuestionIndex(currentQuestionIndex + 1); 
        }, 4000);
      }
    } else {
      setPopup(true); // Show the results popup
    }
  }, [isListening]);

  useEffect(() => {
    console.log("hello " + currentQuestionIndex);
    askQuestion(currentQuestionIndex);
  
  }, [currentQuestionIndex])
  

  // Function to ask a question and start listening
  const askQuestion = () => {
    if (currentQuestionIndex >= 0 && currentQuestionIndex < questionList.length) {
      const question = questionList[currentQuestionIndex];
      console.log(`Asking question: ${question}`);

      // Speak the question using the Web Speech API
      const utterance = new SpeechSynthesisUtterance(questionList[currentQuestionIndex]);
      speechSynthesis.speak(utterance);

      SpeechRecognition.startListening({ continuous: true });
      setIsListening(true);
      // Start the inactivity timer
      startInactivityTimer();
    }
  };

  // Function to generate story and get the result from AI
  const generateStory = async () => {
    console.log("Generating answer evaluation...");

    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      let prompt =
        "this is question: " +
        questionList[currentQuestionIndex] +
        " and user answer: " +
        transcript +
        " please give me the percentage of answer correctness as per the question and give me answer example output: 80 (no need to tell me anything else)";
      const result = await model.generateContent(prompt);
      console.log(prompt);

      const resultText = result.response.text();
      setOutput(resultText);
      setUserResult((prevResults) => [...prevResults, Number(resultText)]);
      resetTranscript(); // Reset the transcript for the next question
      console.log("Generating answer done");
      

    } catch (error) {
      console.error("Error generating text:", error);
    }
  };

  // Function to start the inactivity timer
  const startInactivityTimer = () => {
    if (timer) {
      clearTimeout(timer); // Clear any existing timer
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












