import mongoose from 'mongoose';
import 'dotenv/config'

export const connectDB = async()=>{
    await mongoose.connect(`${process.env.MONGODB_URI}`,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000,
    }).then((success)=>{
        console.log("Successfully connected");
    }).catch((error)=>{
        console.log(`Find error while connecting with mongoDB with error = ${error}`);
    })
}
