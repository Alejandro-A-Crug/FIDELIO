import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenSetCookie from "../utils/genWebToken.js";
export const signup = async (req,res) =>{
    try {
        const {fullName, username, password, confirmPassword}= req.body;

        if(password !== confirmPassword){
            return res.status(400).json({error: "Passwords do not match"})
        }

        const user = await User.findOne({username})

        if(user){
            return res.status(400).json({error: "Someone like that already exists"})
        }

        //HASH PASSWORD
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        //avatar
        const pfp = 'https://avatar.iran.liara.run/public';


        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            profilePic: pfp,
        })

        if(newUser){
            //Generating JWT
         
        await newUser.save();
        generateTokenSetCookie(newUser._id, res);
        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic:newUser.profilePic,
        })
        } else {
            return res.status(400).json({error: "Invalid user data"})
        }
    } catch (error) {
        console.log("error in signup controller", error.message);
        res.status(500).json({error: "internal server error"});
    }
}

export const login = async(req,res) =>{
    try {
        const {username, password} = req.body;
        const user= await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if(!user || !isPasswordCorrect){
            return res.status(400).json({error: "Invalid credentials"});
        }

        generateTokenSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        })
    } catch (error) {
        console.log("error in login controller", error.message);
        res.status(500).json({error: "internal server error"}); 
    }
}

export const logout = (req,res) =>{
    try {
        res.cookie("jwt", "", {maxAge : 0});
        res.status(200).json({message: "Logged out succesfully!"}); 
    } catch (error) {
        console.log("error in logout controller", error.message);
        res.status(500).json({error: "internal server error"}); 
    }
}