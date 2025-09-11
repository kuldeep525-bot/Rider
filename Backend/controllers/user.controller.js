import { User } from "../Models/user.model.js";
import bcyrpt from "bcrypt";
import * as z from "zod";
import jwt from "jsonwebtoken";
import { jwt_user_passowrd } from "../config.js";

export const signup = async (req, res) => {
  //we recive data to the postman
  const { firstname, lastname, email, password } = req.body;

  //validation for data
  const userSchema = z.object({
    firstname: z
      .string()
      .min(4, { message: "first name must be atleast 4 character long" }),
    lastname: z
      .string()
      .min(4, { message: "last name must be atleast 4 character long" }),
    email: z.string().email(),
    password: z.string().min(8, { message: "passowrd must 8 character long" }),
  });

  const validateDate = userSchema.safeParse(req.body);

  if (!validateDate.success) {
    return res
      .status(400)
      .json({ errors: validateDate.error.issues.map((err) => err.message) });
  }
  //existing user
  try {
    const ExistingUser = await User.findOne({ email: email });

    if (ExistingUser) {
      return res.status(400).json({ errors: "User already exists" });
    }

    //for secure passowrd in database
    const hashPassword = await bcyrpt.hash(password, 10);

    //if user not signup then create a new user and signup it
    const NewUser = new User({
      firstname,
      lastname,
      email,
      password: hashPassword,
    });
    //save in database
    await NewUser.save();
    res.status(201).json({ message: "Signup succeeded", NewUser });
  } catch (error) {
    res.status(500).json({ errors: "Error in signup" });
    console.log("Error in signup", error);
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
    const isCorrectPassword = await bcyrpt.compare(password, user.password);

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
