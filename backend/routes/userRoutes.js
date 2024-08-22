import express from 'express'
import { login, registerUser, updateJobProfile } from '../controllers/userControllers.js';

const userRouter = express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/login',login);
userRouter.put('/update-jobprofile', updateJobProfile);

export default userRouter