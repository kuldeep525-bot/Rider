import { User } from "../Models/user.model.js";
import bcyrpt from "bcrypt";
import * as z from "zod";

export const signup = async (req, res) => {
  //we recive data to the postman
  console.log(req.body);
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
