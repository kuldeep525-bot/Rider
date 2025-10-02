import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ServerUrl } from "../App";

function Signup() {
  const primaryColor = "#ff4d2d";
  const hoveColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";
  const [showpassowrd, setshowpassword] = useState(false);
  const [role, setrole] = useState("user");
  const [firstName, setfirstname] = useState("");
  const [lastName, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassoword] = useState("");
  const [mobile, setmobile] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${ServerUrl}/users/signup`,
        {
             firstname: firstName, 
    lastname: lastName, 
          email,
          password,
          mobile,
          role,
        },
        { withCredentials: true }
      );
      console.log(result);
         alert("signup successfully:")
      navigate("/login"); 
    } catch (error) {
       alert(error.response?.data || error.message);
      //  alert(error.response?.data?.message || "Signup failed");
    }
  };
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border=[1px]`}
        style={{
          border: `1px solid ${borderColor}`,
        }}
      >
        <h1
          className={`text-3xl font-bold mb-4`}
          style={{ color: primaryColor }}
        >
          RIDER
        </h1>
        <p className="text-gray-600 mb-8">
          Create your account to get started with delicious food deliceries
        </p>

        {/* input first name */}

        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="block text-gray-700 font-medium mb-1"
          >
            FIRST NAME
          </label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
            placeholder="Enter your First Name"
            style={{
              border: `1px solid ${borderColor}`,
            }}
            onChange={(e) => setfirstname(e.target.value)}
            value={firstName}
          />
        </div>
        {/* input last name */}
        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="block text-gray-700 font-medium mb-1"
          >
            LAST NAME
          </label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
            placeholder="Enter your Last Name"
            style={{
              border: `1px solid ${borderColor}`,
            }}
            onChange={(e) => setlastname(e.target.value)}
            value={lastName}
          />
        </div>
        {/* input email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-1"
          >
            Email
          </label>
          <input
            type="email"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
            placeholder="Enter your email"
            style={{
              border: `1px solid ${borderColor}`,
            }}
            onChange={(e) => setemail(e.target.value)}
            value={email}
          />
        </div>

            {/* input password */}

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-1"
          >
            PASSWORD
          </label>
          <div className="relative">
            <input
              type={`${showpassowrd ? "text" : "password"}`}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
              placeholder="Enter your Password"
              style={{
                border: `1px solid ${borderColor}`,
              }}
              onChange={(e) => setpassoword(e.target.value)}
              value={password}
            />

            <button
              className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
              onClick={() => {
                setshowpassword((prev) => !prev);
              }}
            >
              {!showpassowrd ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>
        </div>

        {/* input mobile */}

        <div className="mb-4">
          <label
            htmlFor="mobile"
            className="block text-gray-700 font-medium mb-1"
          >
            MOBILE
          </label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
            placeholder="Enter your Mobile Number"
            style={{
              border: `1px solid ${borderColor}`,
            }}
            onChange={(e) => setmobile(e.target.value)}
            value={mobile}
          />
        </div>

        

        {/* role */}

        <div className="mb-4">
          <label
            htmlFor="role"
            className="block text-gray-700 font-medium mb-1"
          >
            ROLE
          </label>
          <div className="flex gap-2">
            {["user", "owner", "deliveryBoy"].map((r) => {
              return (
                <button
                key={r}
                  className={`flex-1 border rounded-lg px-3 py-2 text-center font-medium transition-colors cursor-pointer hover:bg-[#e64323] `}
                  onClick={() => setrole(r)}
                  style={
                    role == r
                      ? { backgroundColor: primaryColor, color: "white" }
                      : { border: `1px solid ${primaryColor}`, color: "black" }
                  }
                >
                  {r}
                </button>
              );
            })}
          </div>
        </div>

        <button
          className={`w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer `}
          onClick={handleSignup}
        >
          Signup
        </button>
        <button className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-400 cursor-pointer hover:bg-gray-100">
          <FcGoogle size={20} />
          <span>Sign up with Google</span>
        </button>
        <p
          className="text-center mt-6 cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Already have an account ?{" "}
          <span className="text-[#ff4d2d]">Sign In</span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
