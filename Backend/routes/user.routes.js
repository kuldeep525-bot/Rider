import express from "express";
import { signup } from "../controllers/user.controller.js";
const router = express.Router();

//define routes
router.post("/signup", signup);

export default router;
