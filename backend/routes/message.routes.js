import express from "express";
import { sendMessage, getMessages } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";
import rateLimit from "express-rate-limit";

const router = express.Router();

//ratelimiter desde el backend en caso de uso de postman
const messageRateLimiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 5, 
  message: {
    status: 429,
    message: "Too many messages sent. Please wait a moment before trying again.",
  },
  keyGenerator: (req) => req.user?.id || req.ip, 
});

//aqui ambas partes, recibir y obtener estan protegidas por el middleware
router.get("/:id", protectRoute,getMessages);
router.post("/send/:id", protectRoute,messageRateLimiter,sendMessage);


export default router;