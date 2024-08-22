import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'
import userModel from '../models/userModel.js';
import 'dotenv/config'

const login = async(req, res)=>{
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if(!user){
            res.status(400).json({success:false, message:"user not found please check your email"});
        }
        console.log('Request body:', req.body);
        console.log('User found:', user);

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
                jobProfile: user.jobProfile
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
    

}


const createToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET);
}

const registerUser = async (req, res)=>{
    console.log("hello i am here");
    
    const {name, password, email, jobProfile} = req.body;
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
            jobProfile
        })
        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({success:true, token})
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
        
    }
}
export {registerUser, login}