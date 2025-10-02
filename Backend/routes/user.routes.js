import express from "express";
import {
  login,
  logout,
  resetPassword,
  sendOtp,
  signup,
  verifyOtp,
} from "../controllers/user.controller.js";
const router = express.Router();

//define routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.post("/sendOtp", sendOtp);
router.post("/verfiyOtp", verifyOtp);
router.post("/resetPassword", resetPassword);

export default router;
