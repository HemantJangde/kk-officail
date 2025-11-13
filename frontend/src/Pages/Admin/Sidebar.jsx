import React, { useState, useEffect } from "react";
import { Home, Users, FileText, LogOut, Folder, Mail, Star, Menu, Image } from "lucide-react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const navLinks = [
  { name: "Dashboard", icon: <Home />, path: "/admin/dashboard" },
  { name: "Contacts", icon: <Mail />, path: "/admin/dashboard/contacts" },
  { name: "Projects", icon: <Folder />, path: "/admin/dashboard/projects" },
  { name: "Team", icon: <Users />, path: "/admin/dashboard/team" },
  { name: "Services", icon: <FileText />, path: "/admin/dashboard/services" },
  { name: "Gallery", icon: <Image />, path: "/admin/dashboard/MangeGallery" },

  { name: "Reviews", icon: <Star />, path: "/admin/dashboard/review" },


];


export default function AdminNavbarLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check for admin authentication
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) navigate("/admin/login", { replace: true });
  }, [navigate]);

  const activeLink = navLinks.find(link => location.pathname.startsWith(link.path))?.name || "Dashboard";

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    toast.success("Logged out successfully!");
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-700">
      {/* Top Navbar */}
      <nav className="flex justify-between items-center p-4  text-white shadow-lg relative">
        {/* Left: Logo / Title */}
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold">Admin</h1>
        </div>

        {/* Center: Links (hidden on mobile) */}
        <ul className="hidden md:flex items-center gap-4">
          {navLinks.map(link => (
            <li key={link.name}>
              <Link
                to={link.path}
                className={`flex items-center gap-1 px-3 py-2 rounded-md hover:bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-700 transition ${
                  activeLink === link.name ? " font-bold" : ""
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Right: Menu & Profile */}
        <div className="flex items-center gap-4">
          <button className="md:hidden p-2 rounded  " onClick={() => setMenuOpen(!menuOpen)}>
            <Menu size={24} />
          </button>
         
          <button
            onClick={handleLogout}
            className="hidden md:flex items-center gap-1 px-3 py-2 bg-red-600 rounded hover:bg-red-700 transition"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <ul className="absolute top-full left-0 w-full bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-700 text-white flex flex-col md:hidden shadow-lg z-20">
            {navLinks.map(link => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={`flex items-center gap-2 px-4 py-3 hover:bg-gray-800 transition ${
                    activeLink === link.name ? " font-bold" : ""
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.icon} <span>{link.name}</span>
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-3 text-red-400 hover:text-red-600 transition"
              >
                <LogOut /> Logout
              </button>
            </li>
          </ul>
        )}
      </nav>

      {/* Content */}
      <main className="">
           <Outlet />
       
      </main>
    </div>
  );
}
