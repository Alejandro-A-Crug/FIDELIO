import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getusersSidebar } from "../controllers/user.controller.js";


const router = express.Router();



router.get("/",protectRoute ,getusersSidebar);

export default router