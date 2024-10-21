import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'
import userModel from '../models/userModel.js';
import 'dotenv/config'

const login = async(req, res)=>{
    const {email,password} = req.body;
    console.log(email+ "email");
    try {
        const user = await userModel.findOne({email});
        if(!user){
            res.status(400).json({success:false, message:"user not found please check your email"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        

        if(!isMatch){
            res.status(400).json({success:false,message:"Wrong Email id"});
        }
        const token = createToken(user._id);
        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                jobProfile: user.jobProfile,
                scoreData: user.scoreData || []
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
    

}


const createToken = (id) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET environment variable is not set');
    }
    return jwt.sign({ id }, secret, {
        expiresIn: '1h' 
    });
}

const registerUser = async (req, res)=>{
    console.log("hello i am here");
    
    const { name, password, email, jobProfile, scoreData = [] } = req.body;
    try {
        const exist = await userModel.findOne({email});
        if(exist){
            return res.json({success:false, message:"Email already exist"});
        }
        if (!validator.isEmail(email)) {
            return res.json({success:false, message:"Please enter a valid email address"});
        }
        if (password.length<8) {
            return res.json({success:false,message:"Password too short"});
        }

        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name,
            email,
            password: encryptedPassword,
            jobProfile,
            scoreData
        })
        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                jobProfile: user.jobProfile,
                scoreData: user.scoreData || []
            }
        });

        
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
        
    }
}

const updateJobProfile= async (req,res)=>{
    const {email, newJobProfile} = req.body;
    try {
        const user = await userModel.findOne({email});
        if(!user){
            res.status(400).json({success:false, message:"user not found please check your email"});
        }


    user.jobProfile = newJobProfile;
        await user.save();
        res.json({
            success: true,
            message: "Job profile updated successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                jobProfile: user.jobProfile,
                scoreData: user.scoreData || []
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}


export {registerUser, login,updateJobProfile}