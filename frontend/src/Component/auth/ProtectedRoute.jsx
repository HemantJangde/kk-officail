import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("isAdmin"); // ✅ check token

  if (!token) {
    // if no token, redirect to login
    return <Navigate to="/admin/login" replace />;
  }

  return children; // token exists → allow access

//   const token = localStorage.getItem("isAdmin");
// if (!token) {
//   return <Navigate to="/admin/login" replace />;
// }
}
