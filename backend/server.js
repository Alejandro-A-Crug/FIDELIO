import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongo from "../db/connectToMongo.js";
import { app, server } from "./socket/socket.js";


const PORT = process.env.PORT || 5000;

import cors from "cors";

app.use(cors({
  origin: "http://localhost:3000", // tu frontend
  credentials: true, // 👈 habilita envío de cookies
}));


app.use(express.json());
app.use(cookieParser());


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
