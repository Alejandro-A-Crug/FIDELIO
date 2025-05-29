import { Server } from "socket.io";
import http from 'http';
import express from 'express';

const app = express();
//aqui se crea el server y se permite el uso de cors 
const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin:["http://localhost:3000"],
        methods:["GET","POST"]
    }
});

//se mapea y se obtiene id de usuario con id de socket
const userSocketMap = {};
//se obtiene el socketid del receptor
export const getReceiverSocketId = (receiverId) =>{
    return userSocketMap[receiverId];
}
//se notifica al sistema de que alguien se ha unido 
io.on('connection',(socket)=>{
    console.log("a user has connected", socket.id);
    //se obtiene el user id desde ,a query del handshake
    const userId = socket.handshake.query.userId
    //si no hay ningun user id se selecciona el socket id
    if(userId != "undefined") userSocketMap[userId] = socket.id
    //el user socketmap es para emitir a los usuarios que estan en linea
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    //si se desconecta se borra el id del mapa 
    socket.on("disconnect", () =>{
         console.log("a user has disconnected", socket.id);
         delete userSocketMap[userId];
         io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
})

export {app, io, server}