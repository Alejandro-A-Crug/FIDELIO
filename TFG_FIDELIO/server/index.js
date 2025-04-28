const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require("socket.io");
const { RateLimiterMemory } = require('rate-limiter-flexible');
const Joi = require('joi');

const rateLimiter = new RateLimiterMemory({
    points: 5,      
    duration: 10,    
    blockDuration:30,
});

//Esto es para Validar datos
const joinRoomProcedure = Joi.object({
    
    username: Joi.string().alphanum().min(3).max(20).required(),
    room: Joi.string().alphanum().min(3).max(20).required()
})


app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
});

const users = {}; // socket.id => username

io.on("connection", (socket) => {
   
      //Comprobamos que el usuario se conecta desde nuestra consola
    console.log('User connected:', socket.id);

    //Nos unimos a una habitación
    socket.on("join_room", (data) => {
        //Comprobamos y la validación en JOI es correcta
        const { error, value } = joinRoomProcedure.validate(data);
        if (error) {
            socket.emit("notif", {
                author: "Admin",
                message: "Datos inválidos. Asegúrate de que el nombre y la sala sean válidos.", 
                //Notificación al front-end negativa
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            });
            console.log("Admin has listened")
        } else 
        {
            console.log("validation test has been succesful!")
        const { room, username } = value; 
        socket.emit("notif", {
            author: "Admin",
            message: "OK", // notificación al front-end positiva
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          });
          //nos unimos finalmente a la sala 
        users[socket.id] = username;
        socket.join(room);
        //se nos notifica para comprobar a que sala se une el usuario 
        console.log(`User ${username} with ID ${socket.id} joined room ${room}`);
        //El sistema a los demás usuarios sobre nuestra llegada
        socket.to(room).emit("receive_message", {
            author: "Admin",
            message: `${username} has joined the chat.`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        });
        }
    });
   

    //Enviamos un mensaje 
    socket.on("send_message", async (data, callback) => {
        try {
            //consume un crédito del ratelimiter de los 5 que tiene
            await rateLimiter.consume(socket.id, 1);
            //envía el mensaje
            socket.to(data.room).emit("receive_message", data);
            //muestra que el proceso fué exitoso
            callback({ success: true }); 
            console.log("2")
        } catch (err) {
            //Nos envía un mensaje para notificar que estamos yendo muy rápido
            console.log("err")
            socket.emit("receive_message", {
                author: "Admin",
                message: "You're sending messages too fast. Please wait a moment.",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            });
            //el proceso de enviar el mensaje no fue exitoso
            callback({ success: false }); 
        }
    });
    
    socket.on("leave_chat", ({ room, username }) => {
        console.log("Admin received")
        socket.to(room).emit("receive_message", {
            author: "Admin",
            message: `${username} has left the chat.`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        });
        socket.leave(room);
        delete users[socket.id];
    });
    
    socket.on("disconnect", () => {
        const username = users[socket.id];
        if (username) {
            
            console.log(`User ${username} disconnected`);
            delete users[socket.id];
            
        } else {
        delete users[socket.id];
        console.log("Disconnection test was succesful")
        }
    });
});



server.listen(3001, () => {
    console.log("FUNCIONA");
});
