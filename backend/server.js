import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongo from "../db/connectToMongo.js";
import { app, server } from "./socket/socket.js";

//esto es el servidor, se importa la app y el server del socket
const PORT = process.env.PORT || 5000;

import cors from "cors";

app.use(cors({
  origin: "http://localhost:3000", // tu frontend
  credentials: true, // habilita envío de cookies
}));

//se aceptan y usan las cookies
app.use(express.json());
app.use(cookieParser());

//las rutas en la pagina web son llevadas a un archivo con las otras rutas
app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)


/*app.get("/", (req, res)=>{
    //root http://localhost:5000/
    res.send("Yor doing good lad!!!")
})*/



server.listen(PORT, () => {
    connectToMongo();
    console.log(`Server running on port ${PORT}`)

});
