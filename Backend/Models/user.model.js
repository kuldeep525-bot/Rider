import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First name must be at least 3 character long"],
    },
    lastname: {
      type: String,
      minlength: [3, "First name must be at least 3 character long"],
    },
  },

  email: {
    type: String,
    required: true,
    unquie: true,
    minlength: [5, "Email atleast 5 character long"],
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "password atleast 8 character long"],
    select: false,
  },

  sockedId: {
    type: String,
  },
});

export const User = mongoose.model("User", userSchema);
