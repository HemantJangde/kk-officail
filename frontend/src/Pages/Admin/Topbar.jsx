import React from "react";
import { Bell } from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex justify-between items-center bg-white/10 shadow px-6 py-3">
      <h1 className="text-lg font-semibold text-[#0C226B]">
        Welcome, Admin 👋
      </h1>

      <div className="flex items-center gap-4">
        <Bell className="text-orange-500 cursor-pointer" />
        <img
          src="https://ui-avatars.com/api/?name=Admin"
          alt="Admin"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </header>
  );
}
