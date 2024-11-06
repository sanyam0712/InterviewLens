import express from 'express';
import { startEmotionAnalysis } from '../controllers/emotionController.js';

const router = express.Router();

// Route to start emotion analysis
router.get('/start-analysis', startEmotionAnalysis);

export default router;
