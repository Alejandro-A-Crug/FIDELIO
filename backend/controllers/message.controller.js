import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js"
import { getReceiverSocketId, io } from "../socket/socket.js";

//enviar mensajes
export const sendMessage = async (req,res) => {
    try {
        //se saca todo lo necesario, mensaje, imagen, id del receptor y emisor
        const {message, image} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;
        // se busca a que se encuentre una conversacion y si no hay, se crea 
        let conversation = await Conversation.findOne({
            participants: {$all: [senderId, receiverId]},
        });

        if(!conversation) {
            conversation = await Conversation.create({
                participants:  [senderId, receiverId],
            })
        }
        //usando el modelo de mongoDB se crea un nuevo mensaje y se mete en la base de datos 
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
            image,
        })

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }
        //se guarda la conversación y el mensaje 
        await Promise.all([conversation.save(), newMessage.save()]);
        //funcionalidad en vivo, se emite un nuevo mensaje
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }


        res.status(201).json(newMessage); 
        

    } catch (error) {
        console.log("error in sendMessage controller", error.message);
        res.status(500).json({error: "internal server error"});
    }
};
//recibir mensajes 
export const getMessages = async(req,res) => {
    try {
        //se obtienen los parametros
        const {id:userToChatId}= req.params;
        const senderId = req.user._id;
        // se busca la conversacion con el sender id y el user to chatID, se rellena con los mensajes
        const conversation = await Conversation.findOne({
            participants: {$all: [senderId, userToChatId]},
        }).populate("messages");
        //si no hay conversacion, se devuelve un array
        if(!conversation) return res.status(200).json([]);

        //los mensajes son iguales a los mensajes dentro de la conversacion 
        const messages = conversation.messages;
        //se envían los mensajes 
        res.status(200).json(messages);
        
    } catch (error) {
        console.log("error in sendMessage controller", error.message);
        res.status(500).json({error: "internal server error"});
    }
}