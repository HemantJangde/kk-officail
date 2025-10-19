import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Phone,
  Mail,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Menu,
  X,
  Youtube,
} from "lucide-react";
import Logo from "../assets/KKlogo2.jpg";
const socialLinks = [
    { Icon: Facebook, url: "https://www.facebook.com/share/1CTPxjQDWR/" },  
   
    { Icon: Instagram, url: "https://www.instagram.com/kk_construction_1?igsh=MTZyeGtvZmt1N3gweg==" }, { Icon: Youtube, url: "https://youtube.com/@kkconatruction?si=LwMQQZ6nUOsupFhu" },
  ];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [showTopBar, setShowTopBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();
  // ===== Scroll Behavior =====
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide top bar after scrolling 50px
      setShowTopBar(currentScrollY <= 50);

      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`w-full bg-white fixed top-0 left-0 z-50 transition-transform duration-500 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* ===== Top Contact Bar ===== */}
      {showTopBar && (
        <div className="hidden md:flex justify-between items-center px-6 text-sm text-white bg-orange-500 relative transition-all duration-500">
          {/* Center contact info */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-6 py-2">
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-white" />
              <span>+91 83191 82281</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-white" />
              <span>kkconstruction881@gmail.com</span>
            </div>
          </div>

          {/* Right social icons */}
          <div className="flex items-center gap-3 ml-auto mt-3 text-gray-600">
            {socialLinks.map(({ Icon, url }, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-orange-200 transition"
              >
                <Icon size={18} className="cursor-pointer mb-1" />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* ===== Main Navbar ===== */}
      <nav className="flex justify-between items-center px-6 py-3 mt-1 h-16 shadow-md">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src={Logo}
            alt="KK Construction"
            className="h-14 w-14 object-cover rounded-full"
          />
          <h2 className="text-lg font-semibold text-gray-800">
            KK Construction
          </h2>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <li>
            <Link to="/" className="hover:text-orange-500 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/feature" className="hover:text-orange-500 transition">
              About
            </Link>
          </li>
          <li>
            <Link
              to="/allservices"
              className="hover:text-orange-500 transition"
            >
              Services
            </Link>
          </li>
          <li>
            <Link to="/projects" className="hover:text-orange-500 transition">
              Projects
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-orange-500 transition">
              Contact
            </Link>
          </li>
        </ul>

        {/* CTA Button */}
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="hidden md:block bg-orange-500 text-white px-5 py-2 rounded-full hover:bg-orange-600 transition"
        >
          Login
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* ===== Mobile Menu ===== */}
      {menuOpen && (
        <div className="md:hidden bg-white px-6 pb-4 flex flex-col gap-4 shadow-lg">
          {[
            { label: "Home", to: "/" },
            { label: "About Us", to: "/feature" },
            { label: "Services", to: "/allservices" },
            { label: "Projects", to: "/projects" },
            { label: "Contact Us", to: "/contact" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              className="hover:text-orange-500 transition"
            >
              {item.label}
            </Link>
          ))}

          <button
            onClick={() => navigate("/admin/dashboard")}
            className="bg-orange-500 text-white px-5 py-2 rounded-full hover:bg-orange-600 transition mt-2"
          >
            Login
          </button>
        </div>
      )}
    </header>
  );
}
