"use client";

import Image from "next/image";
import { useState } from "react";
import RegisterImage from "@/public/images/register.webp"; // Adjust the path as necessary

const Register = () => {
    const [role, setRole] = useState("User"); // Default role

    const roles = ["Admin", "Organizer", "User"]; // Available roles
  

    return (
        <div>
            <div className="flex min-h-screen bg-[#1b1b1b]">
      {/* Left Section: Full-Screen Image */}
      <div className="w-1/2 h-screen relative">
        <Image
          src={RegisterImage} // Replace with your image path
          alt="Registration Background"
          className="object-cover w-full h-full"
          width={500}
          height={500}
        />
      </div>

      {/* Right Section: Registration Form */}
      <div className="w-1/2 flex items-center justify-center bg-[#383B39]">
        <div className="w-full max-w-md p-8 bg-[#1b1b1b] shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold text-red-600 mb-6">Register</h2>
          <form>
            {/* Name Input */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                className="w-full mt-2 p-3 bg-[#383B39] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="w-full mt-2 p-3 bg-[#383B39] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                className="w-full mt-2 p-3 bg-[#383B39] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            {/* Role Selection */}
            <div className="mb-4">
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-300"
              >
                Role
              </label>
              <select
                id="role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full mt-2 p-3 bg-[#383B39] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                {roles.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {/* Phone Number Input */}
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-300"
              >
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+8801234567890" // Example format for Bangladesh
                className="w-full mt-2 p-3 bg-[#383B39] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            {/* Address Input */}
            <div className="mb-6">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-300"
              >
                Address
              </label>
              <textarea
                id="address"
                name="address"
                placeholder="Enter your address..."
                rows={3}
                className="w-full mt-2 p-3 bg-[#383B39] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 resize-none"
              ></textarea>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full py-3 bg-red-600 text-white font-bold rounded-md hover:bg-red-700 transition duration-200"
            >
              Register
            </button>

            {/* Login Link */}
            <p className="mt-4 text-center text-sm text-gray-400">
              Already have an account?{" "}
              <a href="/login" className="text-red-600 hover:underline">
                Login here.
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
        </div>
    );
};

export default Register;