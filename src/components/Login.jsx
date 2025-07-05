import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext.jsx";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { checkAuth } = useAuth();
  const [signupMessage, setSignupMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://travel-backend-1-s4yu.onrender.com/api/v1/users/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      setMessage("Login successful!");
      await checkAuth();
      navigate("/");
      // You can redirect or navigate here using react-router
    } catch (err) {
      setMessage("Invalid credentials");
    }
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://travel-backend-1-s4yu.onrender.com/api/v1/users/register",
        signupData
      );
      setSignupMessage("Account created successfully! Please login.");
    } catch (err) {
      setSignupMessage("Email already exists or error occurred");
    }
  };
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url("https://images.pexels.com/photos/731217/pexels-photo-731217.jpeg")`,
      }}
    >
      <div className="w-full max-w-5xl bg-white/70 dark:bg-gray-700 backdrop-blur-md shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
        {/* Login Section */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            Login
          </h2>
          <p className="text-gray-600 dark:text-gray-200 mb-6">
            Welcome back! Please enter your details.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 dark:text-gray-100 font-medium"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 mt-1 dark:bg-gray-400 dark:placeholder-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 dark:text-gray-100 font-medium"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 mt-1 dark:bg-gray-400 dark:placeholder-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your password"
              />
            </div>

            <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
              Login
            </button>
            <p className="text-sm text-red-600">{message}</p>
          </form>
        </div>

        {/* Signup Section */}
        <div className="w-full md:w-1/2 bg-transparent p-8">
          <h2
            className="text-3xl font-bold dark:text-blue-600

           text-blue-800 mb-4"
          >
            Sign Up
          </h2>
          <p className="text-blue-700 dark:text-blue-500 mb-6">
            New here? Create an account to get started.
          </p>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-blue-800 dark:text-blue-600 font-medium"
              >
                Full Name
              </label>
              <input
                type="text"
                value={signupData.name}
                onChange={(e) =>
                  setSignupData({ ...signupData, name: e.target.value })
                }
                id="name"
                className="w-full px-4 py-2 mt-1 dark:bg-gray-400 dark:placeholder-gray-700 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label
                htmlFor="signup-email"
                className="block text-blue-800 dark:text-blue-600 font-medium"
              >
                Email
              </label>
              <input
                type="email"
                id="signup-email"
                value={signupData.email}
                onChange={(e) =>
                  setSignupData({ ...signupData, email: e.target.value })
                }
                className="w-full px-4 py-2 mt-1 dark:bg-gray-400 dark:placeholder-gray-700 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="signup-password"
                className="block text-blue-800 dark:text-blue-600 font-medium"
              >
                Password
              </label>
              <input
                type="password"
                id="signup-password"
                value={signupData.password}
                onChange={(e) =>
                  setSignupData({ ...signupData, password: e.target.value })
                }
                className="w-full px-4 py-2 mt-1 dark:bg-gray-400 dark:placeholder-gray-700 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Create a password"
              />
            </div>

            <button
              disabled={
                !signupData.name || !signupData.email || !signupData.password
              }
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
            <p className="text-sm text-green-600">{signupMessage}</p>
          </form>
        </div>
      </div>
    </div>
  );
}
