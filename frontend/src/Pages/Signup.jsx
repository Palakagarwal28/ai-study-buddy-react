import React from "react";
import { useNavigate } from "react-router-dom";
export default function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Create your account
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Start learning smarter 🚀
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5">
          
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Create a password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Signup Button */}
          <button
            type="button"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          Already have an account?{" "}
          <span
          onClick={() => navigate("/login")}
          className="text-blue-500 cursor-pointer hover:underline"
          >
         Login
        </span>
       </div>

      </div>
    </div>
  );
}
