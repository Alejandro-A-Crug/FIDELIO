import mongoose from "mongoose";
//esquema para mongoDB
const userSchema = new mongoose.Schema({
    fullName: {
        type:String,
        required:true,
    },
    username: {
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    gender:{
        type:String,
        default:"",
    },
    profilePic:{
        type:String,
        default:"",
    }
},{timestamps: true})

const User = mongoose.model("User", userSchema);

export default User;