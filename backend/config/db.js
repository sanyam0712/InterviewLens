import mongoose from 'mongoose';

export const connectDB = async()=>{
    await mongoose.connect(`${process.env.MONGODB_URI}`).then((success)=>{
        console.log("Successfully connected");
    }).catch((error)=>{
        console.log(`Find error while connecting with mongoDB with error = ${error}`);
    })
}
