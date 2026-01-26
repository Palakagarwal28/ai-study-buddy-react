import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await res.json();

      console.log("LOGIN RESPONSE 👉", data);

      if (!res.ok) {
        throw new Error(data.detail || "Login failed");
      }

      if (!data.access_token) {
        throw new Error("Token not returned by backend");
      }

      // SAVE TOKEN
      localStorage.setItem("token", data.access_token);

      console.log("TOKEN SAVED:", localStorage.getItem("token"));

      // HARD REDIRECT
      navigate("/app/summary", { replace: true });

    } catch (err) {
      console.error("LOGIN ERROR:", err);
      setError(err.message || "Server error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center text-slate-800">
          AI Study Buddy
        </h1>

        <p className="text-center text-slate-500 mt-2">
          Welcome back 👋
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Sign up
          </span>
        </p>

      </div>
    </div>
  );
}



