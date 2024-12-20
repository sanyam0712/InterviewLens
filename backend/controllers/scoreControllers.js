import userModel from "../models/userModel.js";

// Add or append score data
const addScoreData = async (req, res) => {
  const { email, newScore } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const { jobProfile, totalScore, rating, questions } = newScore;

    // Validate score data
    if (
      !jobProfile || 
      totalScore == null || 
      rating == null || 
      !Array.isArray(questions) || 
      questions.length === 0
    ) {
      return res.status(400).json({ success: false, message: "Invalid score data" });
    }

    // Validate questions
    const isValidQuestions = questions.every(
      ({ questionText, score, rating }) =>
        questionText && score != null && rating != null && rating >= 0 && rating <= 3
    );

    if (!isValidQuestions) {
      return res.status(400).json({ success: false, message: "Invalid questions data" });
    }

    // Append new score
    user.scoreData.push({ jobProfile, totalScore, rating, questions });

    await user.save();

    res.status(200).json({
      success: true,
      message: "Score data added successfully",
      scoreData: user.scoreData, // Return all previous + current scores
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


const getAllScores = async (req, res) => {
    const { email } = req.params;
  
    // Validate email format
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }
  
    try {
      const user = await userModel.findOne({ email });
  
      if (!user || !Array.isArray(user.scoreData) || user.scoreData.length === 0) {
        return res.status(404).json({ success: false, message: "No score data found" });
      }
  
      res.status(200).json({
        success: true,
        message: "All score data retrieved successfully",
        scoreData: user.scoreData,
      });
    } catch (error) {
      console.error("Error fetching score data:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  
export { addScoreData,getAllScores  };
