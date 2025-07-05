import React, { useState } from "react";
import axios from "axios";
export default function Contact() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    try {
      const res = await axios.post(
        "https://travel-backend-1-s4yu.onrender.com/api/v1/review",
        formData
      );

      if (res.data.success) {
        setSuccess("✅ Thank you! We've received your message.");
        setFormData({
          fullname: "",
          email: "",
          phoneNumber: "",
          message: "",
        });
      } else {
        setError("⚠️ Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("🚫 Error submitting form. Please try again.");
    }
  };

  return (
    <div className="w-full min-h-[700px] bg-white dark:bg-gray-900 px-4 md:px-12 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto">
        {/* Left Side - Contact Info */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h1 className="text-3xl sm:text-4xl text-gray-800 dark:text-white font-extrabold tracking-tight">
            Get in touch:
          </h1>
          <p className="text-normal text-lg sm:text-xl font-medium dark:text-gray-200 text-gray-600 mt-2">
            Fill in the form to start a conversation
          </p>

          <div className="flex items-center mt-8 dark:text-gray-200 text-gray-600">
            {/* Location icon */}
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              className="w-8 h-8 dark:text-gray-300 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <div className="ml-4 font-semibold w-40">Bumped Travels, India</div>
          </div>

          <div className="flex items-center mt-4 dark:text-gray-200 text-gray-600">
            {/* Phone icon */}
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              className="w-8 h-8 dark:text-gray-300 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <div className="ml-4 font-semibold w-40">+91 9876543210</div>
          </div>

          <div className="flex items-center mt-4 dark:text-gray-200 text-gray-600">
            {/* Email icon */}
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              className="w-8 h-8 dark:text-gray-300 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <div className="ml-4 font-semibold w-40">
              contact@bumpedtravels.com
            </div>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md "
        >
          <div className="flex flex-col mb-4">
            <label htmlFor="name" className="hidden">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              id="name"
              placeholder="Full Name"
              className="py-3 px-4 rounded-lg border dark:bg-gray-400 dark:text-black
               border-gray-400 focus:border-blue-500 outline-none  placeholder-gray-500 
             dark:placeholder-gray-700 "
            />
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="hidden">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="py-3 px-4 rounded-lg  dark:bg-gray-400 dark:text-black border border-gray-400 focus:border-blue-500 outline-none  placeholder-gray-500 
             dark:placeholder-gray-700 "
            />
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="tel" className="hidden">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              id="tel"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              className="py-3 px-4 rounded-lg  dark:bg-gray-400 dark:text-black border border-gray-400 focus:border-blue-500 outline-none  placeholder-gray-500 
             dark:placeholder-gray-700 "
            />
          </div>

          {/* Query Textarea */}
          <div className="flex flex-col mb-4">
            <label htmlFor="query" className="hidden">
              Your Query
            </label>
            <textarea
              name="message"
              id="query"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message / Query"
              className="py-3 px-4 rounded-lg  dark:bg-gray-400 dark:text-black border border-gray-400 focus:border-blue-500 outline-none resize-none  placeholder-gray-500 
             dark:placeholder-gray-700 "
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-700 w-full text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-600 transition-all"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
