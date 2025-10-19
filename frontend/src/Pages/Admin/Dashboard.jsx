import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
// import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import SidebarDemo from "./Sidebar";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      navigate("/admin/login"); // redirect if not logged in
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen  text-gray-800 bg-blue-600/10">
      {/* Sidebar */}
      <SidebarDemo />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        <Topbar />

        <main className="p-6 overflow-y-auto ">
          <Outlet /> {/* Nested Routes (Dashboard pages) */}
        </main>
      </div>
    </div>
  );
}
