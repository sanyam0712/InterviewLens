import { exec } from 'child_process';

export const startEmotionAnalysis = (req, res) => {
    exec('python3 emotion_analyzer.py', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing Python script: ${error}`);
            res.status(500).json({ error: "Failed to start emotion analysis." });
            return;
        }
        try {
            const data = JSON.parse(stdout);
            res.json(data);
        } catch (parseError) {
            console.error(`Error parsing Python output: ${parseError}`);
            res.status(500).json({ error: "Error parsing emotion analysis results." });
        }
    });
};
