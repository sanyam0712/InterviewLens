const handlespeech = (text)=>{
    const value = new SpeechSynthesisUtterance(text);
     window.speechSynthesis.speak(value);
     return true;
  }


  const generateStory = async (question) => {
    console.log("Generating answer evaluation...");

    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      let prompt =
        "this is question: " +
        question +
        " and user answer: " +
        transcript +
        " please give me the percentage of answer correctness as per the question and give me answer example output: 80 (no need to tell me anything else)";
      const result = await model.generateContent(prompt);

      const resultText = result.response.text();
      
      console.log("Generating answer done");
      return Number(resultText);
    } catch (error) {
      console.error("Error generating text:", error);
    }
  };

  export {handlespeech, generateStory};