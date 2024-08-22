import mongoose from "mongoose";

const userSchema  = new mongoose.Schema({
    name:{
        type:String,
        require:true,

    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    jobProfile:{
        type:String,
        require:true
    }
},{minimize:false})

const userModel = mongoose.models.user || mongoose.model("userModel", userSchema);
export default userModel;