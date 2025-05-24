"use client";

import Image from "next/image";
import { useState } from "react";
import RegisterImage from "@/public/images/register.webp";
import Link from "next/link";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const Register = () => {
  const [role, setRole] = useState("User");
  const roles = ["Admin", "Organizer", "User"];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function registerUser(email: string, password: string, name: string, role: string, phone: string, address: string) {
    const auth = getAuth();

    try {
      // Register user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send user info to backend
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
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.target);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const phone = formData.get("phone") as string;
    const address = formData.get("address") as string;

    if (!name || !email || !password) {
      setError("Name, Email, and Password are required.");
      setLoading(false);
      return;
    }

    try {
      await registerUser(email, password, name, role, phone, address);
      e.target.reset();
      setRole("User");

      Swal.fire({
        icon: "success",
        title: "Registration and login sucessful!",
        text: "You can now log in with your credentials.",
        confirmButtonText: "Go to Homepage",
      }).then(() => {
        router.push("/");
      });
    }
     //eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (err: any) {
      setError(err.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[700px] bg-[#1b1b1b]">
      <div className="w-1/2 h-[700px] relative">
        <Image
          src={RegisterImage}
          alt="Registration Background"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="w-1/2 flex items-center justify-center bg-[#383B39]">
        <div className="w-10/12 mx-auto p-8 bg-[#1b1b1b] shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">
            Register
          </h2>

          {error && (
            <p className="mb-4 text-red-500 font-semibold text-center">{error}</p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="flex gap-6">
              <div className="w-full md:w-1/2">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300">
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

                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">
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

                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300">
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

              <div className="w-full md:w-1/2">
                <div className="mb-4">
                  <label htmlFor="role" className="block text-sm font-medium text-gray-300">
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
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
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

                <div className="">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-300">
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
