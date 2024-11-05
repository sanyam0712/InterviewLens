import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoutes.js';
import emotionRouter from './routes/emotionRoutes.js';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/emotion", emotionRouter);

connectDB();

app.get("/", (req, res) => {
    res.send("Hello, the server is running!");
});

app.listen(port, () => {
    console.log(`Server starting on http://localhost:${port}`);
});

export default app;
