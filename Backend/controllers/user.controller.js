import { User } from "../Models/user.model.js";
import bcrypt from "bcrypt";
import * as z from "zod";
import jwt from "jsonwebtoken";
import { jwt_user_passowrd } from "../config.js";
import { sendotpMail } from "../Utils/Mail.js";

export const signup = async (req, res) => {
  const { firstname, lastname, email, password, mobile, role } = req.body;

  // zod schema
  const userSchema = z.object({
    firstname: z
      .string()
      .min(4, { message: "First name must be at least 4 characters long" }),
    lastname: z
      .string()
      .min(4, { message: "Last name must be at least 4 characters long" }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    mobile: z
      .string()
      .length(10, { message: "Mobile number must be exactly 10 digits" }),
  });

  const validateData = userSchema.safeParse(req.body);
  if (!validateData.success) {
    return res.status(400).json({
      errors: validateData.error.issues.map((err) => err.message),
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ errors: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashPassword,
      mobile,
      role,
    });

    await newUser.save();
    return res.status(201).json({ message: "Signup succeeded", user: newUser });
  } catch (error) {
    console.error("Error in signup:", error);
    return res.status(500).json({ errors: error.message });
  }
};

export const login = async (req, res) => {
  const NODE_ENV = "development";
  const { email, password } = req.body;

  // Check if the password is provided
  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }

  // Check if the user exists in the database
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(403).json({ error: "Invalid Credentials" });
    }
    // Compare the provided password with the hash password stored in the database
    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      return res.status(403).json({ error: "Invalid Credentials" });
    }
    // Generate a token to authenticate
    const token = jwt.sign(
      {
        id: user._id,
      },
      jwt_user_passowrd,
      { expiresIn: "1d" }
    );

    const cookiesOption = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: "Strict",
    };

    // Store token in cookies
    res.cookie("jwt", token, cookiesOption);

    // If all checks pass, return a success message
    return res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    console.error("Error in login:", error);
    return res.status(500).json({ error: "Error in login" });
  }
};

export const logout = async (req, res) => {
  try {
    // Check if the jwt cookie is present
    if (!req.cookies.jwt) {
      return res.status(401).json({ errors: "Kindly login first" });
    }

    // Clear the jwt cookie
    res.clearCookie("jwt");
    res.status(200).json({ message: "logout successfully." });
  } catch (error) {
    res.status(500).json({ error: "error in logout" });
    console.log("error in logout", error);
  }
};

//OTP SEND CONTROLLER
//1. OTP generator

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist." });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    user.resetOTP = otp;
    user.OTPExpire = Date.now() + 5 * 60 * 1000;
    user.OTPVerfiy = false;
    await user.save();
    await sendotpMail(email, otp);
    return res.status(200).json({ message: "otp send successfuly" });
  } catch (error) {
    return res.status(400).json(`send otp error ${error}`);
  }
};

//otp verify

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.resetOTP != otp || user.OTPExpire < Date.now()) {
      return res.status(400).json({ message: "invalid/expired OTP" });
    }
    user.OTPVerfiy = true;
    user.resetOTP = undefined;
    user.OTPExpire = undefined;
    await user.save();
    return res.status(200).json({ message: "otp verify successfuly" });
  } catch (error) {
    return res.status(400).json({ message: `verify OTP ${error}` });
  }
};

//reset password

export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });

    if (!user || !user.OTPVerfiy) {
      return res.status(400).json({ message: "OTP verification required" });
    }
    const hashPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashPassword;
    user.OTPVerfiy = false;
    await user.save();
    return res.status(200).json({ message: "password reset successfully" });
  } catch (error) {
    return res.status(400).json({ message: `reset password error ${error}` });
  }
};
