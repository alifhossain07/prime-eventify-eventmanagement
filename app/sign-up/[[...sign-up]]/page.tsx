"use client";

import Image from "next/image";
import { useState } from "react";
import RegisterImage from "@/public/images/register.webp"; // Adjust the path as necessary
import Link from "next/link";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
  const [role, setRole] = useState("User"); // Default role
  const roles = ["Admin", "Organizer", "User"]; // Available roles
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
// @ts-expect-error:mylifemyrules
  async function registerUser(email, password, name, role, phone, address) {
    const auth = getAuth();

    try {
      // 1. Register user with Firebase Auth (frontend)
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Send user info with role to your backend to save in MongoDB
      const response = await fetch("http://localhost:5000/saveUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firebaseUid: user.uid,
          email,
          name,
          role,
          phone,
          address,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save user info");
      }

      return await response.json();
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  }
// @ts-expect-error:mylifemyrules
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Extract form values
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const phone = formData.get("phone");
    const address = formData.get("address");

    if (!name || !email || !password) {
      setError("Name, Email, and Password are required.");
      setLoading(false);
      return;
    }

    try {
      // eslint-disable-next-line
      const result = await registerUser(email, password, name, role, phone, address);
      setSuccess("Registration successful! You can now log in.");
      e.target.reset();
      setRole("User"); // reset role to default
    } catch (err) {
      // @ts-expect-error:mylifemyrules
      setError(err.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[700px] bg-[#1b1b1b]">
      {/* Left Section: Full-Screen Image */}
      <div className="w-1/2 h-[700px] relative">
        <Image
          src={RegisterImage}
          alt="Registration Background"
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Right Section: Registration Form */}
      <div className="w-1/2 flex items-center justify-center bg-[#383B39]">
        <div className="w-10/12 mx-auto  p-8 bg-[#1b1b1b] shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">
            Register
          </h2>

          {error && (
            <p className="mb-4 text-red-500 font-semibold text-center">{error}</p>
          )}
          {success && (
            <p className="mb-4 text-green-500 font-semibold text-center">{success}</p>
          )}

          <form onSubmit={handleSubmit}>
            {/* Left Column */}
            <div className="flex  gap-6">
              <div className="w-full md:w-1/2">
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
                    required
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
                    required
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
                    required
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="w-full md:w-1/2">
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
                    placeholder="+8801234567890"
                    className="w-full mt-2 p-3 bg-[#383B39] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>

                {/* Address Input */}
                <div className="">
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
              </div>
            </div>

            {/* Register Button (Full Width) */}
            <div className="w-full mt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-red-600 text-white font-bold rounded-md hover:bg-red-700 transition duration-200 disabled:opacity-50"
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </div>
          </form>

          <h1 className="text-white mt-3 text-center">
            Already Have an Account?{" "}
            <Link className="text-red-500" href="/sign-in">
              Log In
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Register;
