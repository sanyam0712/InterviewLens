import express from 'express'
import { login, registerUser, updateJobProfile } from '../controllers/userControllers.js';
import { addScoreData,getAllScores } from '../controllers/scoreControllers.js';

const userRouter = express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/login',login);
userRouter.put('/update-jobprofile', updateJobProfile);
userRouter.put('/add-score-data', addScoreData);
userRouter.get('/scores/:email', getAllScores);

export default userRouter;