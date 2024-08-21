import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

connectDB();

app.get("/",(req,res)=>{
    console.log("hello");
    res.send("hello it is working");
})

app.listen(port,()=>{
    console.log(`Server starting on http://localhost:${port}`)
})