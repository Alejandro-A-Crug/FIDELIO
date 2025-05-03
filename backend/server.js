import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongo from "../db/connectToMongo.js";

const app= express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)


/*app.get("/", (req, res)=>{
    //root http://localhost:5000/
    res.send("Yor doing good lad!!!")
})*/



app.listen(PORT, () => {
    connectToMongo();
    console.log(`Server running on port ${PORT}`)

});
