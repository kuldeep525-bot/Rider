import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ServerUrl } from "../App";

function Login() {
  const primaryColor = "#ff4d2d";
  const hoveColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";
  const [showpassowrd, setshowpassword] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassoword] = useState("");
  const navigate = useNavigate();

  const handlelogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${ServerUrl}/users/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log(result);
      alert("login successfully:");
      navigate("/");
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
          Login your account to get started with delicious food deliceries
        </p>

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
            placeholder="Enter your email "
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

        {/* forgot password */}

        <div
          className="text-right mb-4 text-[#ff4d2d]  font-medium hover:text-gray-800 duration-200 hover:underline cursor-pointer"
          onClick={() => navigate("/forgot-passowrd")}
        >
          Forgot password
        </div>

        <button
          className={`w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer `}
          onClick={handlelogin}
        >
          Login
        </button>
        <button className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-400 cursor-pointer hover:bg-gray-100">
          <FcGoogle size={20} />
          <span>login with Google</span>
        </button>
        <p
          className="text-center mt-6 cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          Want to create a new account ?{" "}
          <span className="text-[#ff4d2d]">Sign up</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
