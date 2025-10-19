import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // ✅ loading state
  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // start loading
    setMessage("");

    try {
      const res = await axios.post(`/api/admin/login`, { email, password });
      if (res.data.success) {
        localStorage.setItem("isAdmin", res.data.token);
        setMessage("✅ Login successful!");
        navigate("/admin/dashboard");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Login failed");
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg"
        />
        <button
          type="submit"
          disabled={loading} // disable button during loading
          className={`w-full bg-orange-500 py-3 text-white rounded-lg flex justify-center items-center gap-2 hover:bg-orange-600 ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <span className="loader border-white border-t-white w-5 h-5 rounded-full animate-spin"></span>
          ) : (
            "Login"
          )}
        </button>

        <p
          className="mt-4 text-center text-sm cursor-pointer text-blue-500"
          onClick={() => navigate("/admin/forgot-password")}
        >
          Forgot Password?
        </p>

        {message && <p className="text-center mt-4 text-sm">{message}</p>}
      </form>
    </div>
  );
}
