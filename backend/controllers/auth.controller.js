import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenSetCookie from "../utils/genWebToken.js";
export const signup = async (req,res) =>{
    try {
        const {fullName, username, password, confirmPassword, gender}= req.body;

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
        // depends on gender const pfp = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(username)}`;

     let pfp;

            if(gender === "Male"){
                pfp = `https://avatar.iran.liara.run/public/boy`;
            } else if(gender === "Female"){
                pfp = `https://avatar.iran.liara.run/public/girl`;
            } else {
                pfp = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(username)}`;
            }

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            profilePic: pfp,
            gender,
        })

        if(newUser){
        await newUser.save();
        generateTokenSetCookie(newUser._id, res);
        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic:newUser.profilePic,
            gender:newUser.gender,
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

export const deleteUser = async (req, res) => {
  try {
    const userId = req.user._id; // Viene del middleware de autenticación

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Limpiar cookie
    res.cookie("jwt", "", { maxAge: 0 });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log("Error in deleteUser controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
