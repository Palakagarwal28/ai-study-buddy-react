import React from "react";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-slate-800">
          AI Study Buddy
        </h1>
        <p className="text-center text-slate-500 mt-2">
          Welcome back 👋
        </p>

        {/* Form */}
        <form className="mt-8 space-y-5">
          
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-slate-500 mt-6">
          Don’t have an account?{" "}
          <span className="text-blue-500 hover:underline cursor-pointer">
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}

