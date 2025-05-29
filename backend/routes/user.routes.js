import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getusersSidebar } from "../controllers/user.controller.js";


const router = express.Router();
//se protege la ruta ara obtener los usuarios 
router.get("/",protectRoute ,getusersSidebar);

export default router