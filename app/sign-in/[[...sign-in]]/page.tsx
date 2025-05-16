"use client";

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import LoginImage from '@/public/images/login.webp'; // Adjust the path as necessary

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const auth = getAuth();
 // @ts-expect-error:mylifemyrules
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect or do something after successful login
      alert("Login successful!");
      // You could use router.push("/dashboard") if using Next.js router
    } catch (err) {
      // @ts-expect-error:mylifemyrules
      setError(err.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[700px] bg-[#1b1b1b]">
      {/* Left Section: Full-Screen Image */}
      <div className="w-1/2 h-[700px] relative">
        <Image
          src={LoginImage}
          alt="Background"
          fill={true}
          className="object-cover"
        />
      </div>

      {/* Right Section: Login Form */}
      <div className="w-1/2 flex items-center justify-center bg-[#1b1b1b]">
        <div className="w-full max-w-md p-8 bg-[#383737] shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold text-red-600 mb-6">Login</h2>
          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 p-3 bg-[#1b1b1b] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-2 p-3 bg-[#1b1b1b] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
            </div>

            {/* Show error if any */}
            {error && (
              <p className="mb-4 text-red-500 text-center">{error}</p>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-red-600 text-white font-bold rounded-md hover:bg-red-700 transition duration-200 disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* Sign Up Link */}
            <p className="mt-4 text-center text-sm text-gray-400">
              Dont have an account?{' '}
              <Link href="/sign-up" className="text-red-600 hover:underline">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
