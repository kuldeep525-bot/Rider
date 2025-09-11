import express from "express";
import { login, logout, signup } from "../controllers/user.controller.js";
const router = express.Router();

//define routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

export default router;
