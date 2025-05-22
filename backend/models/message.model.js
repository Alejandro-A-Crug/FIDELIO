import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    message: {
        type: String,
    },
    image: {
        type: String, // this will be a URL or base64 string
    }
}, { timestamps: true });


const Message = mongoose.model("Message", messageSchema);

export default Message;