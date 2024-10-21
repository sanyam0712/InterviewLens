import userModel from "../models/userModel.js";

const addScoreData = async (req, res) => {
    const { email, newScore } = req.body; // Assuming newScore contains 'score'

    try {
        // Find the user by email
        const user = await userModel.findOne({ email });
        console.log(email+ "email");
        
        
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        user.scoreData.push({
            score: newScore.score  
        });

        await user.save();

        res.json({
            success: true,
            message: "Score data added successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                jobProfile: user.jobProfile,
                scoreData: user.scoreData 
            }
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export { addScoreData };
