import express from "express";
import { signup } from "../controllers/user.controller.js";
import { body } from "express-validator";
const router = express.Router();

//define routes
router.post(
  "/signup",
  [
    body("email").isEmail().withMessage("Invalid email"),

    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("first name must be at least 3 character long"),

    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be atleast 8 character long"),
  ],
  signup
);

export default router;
