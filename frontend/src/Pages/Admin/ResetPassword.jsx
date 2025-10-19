import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/admin/reset-password`, { email, otp, newPassword });
      setMessage(res.data.message);
      navigate("/admin/login");
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Reset failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleReset} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
        <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full p-3 mb-4 border rounded-lg" />
        <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full p-3 mb-4 border rounded-lg" />
        <button type="submit" className="w-full bg-orange-500 py-3 text-white rounded-lg hover:bg-orange-600">Reset Password</button>
        {message && <p className="text-center mt-4 text-sm">{message}</p>}
      </form>
    </div>
  );
}
