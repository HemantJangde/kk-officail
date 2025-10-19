import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../../Component/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconHome2,
  IconLogout,
  IconUsers,
  IconTool,
  IconReportAnalytics,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "../../lib/utlis";
import { Outlet, useNavigate } from "react-router-dom"; // ✅ Added
import toast from "react-hot-toast";

export default function SidebarDemo() {
  const navigate = useNavigate(); // ✅ navigation hook

  const links = [
    {
      label: "Dashboard",
      href: "/admin/dashboard",
      icon: (
        <IconHome2 className="h-5 w-5 shrink-0 text-white dark:text-gray-200" />
      ),
    },
    {
      label: "Contact ",
      href: "/admin/dashboard/contacts",
      icon: (
        <IconUserBolt className="h-5 w-5 shrink-0 text-white dark:text-gray-200" />
      ),
    },
    {
      label: "Projects",
      href: "/admin/dashboard/projects",
      icon: (
        <IconSettings className="h-5 w-5 shrink-0 text-white dark:text-gray-200" />
      ),
    },
    {
      label: " Team",
      href: "/admin/dashboard/team",
      icon: (
        <IconUsers className="h-5 w-5 shrink-0 text-white dark:text-gray-200" />
      ),
    },
    {
      label: "Services",
      href: "/admin/dashboard/services",
      icon: (
        <IconTool className="h-5 w-5 shrink-0 text-white dark:text-gray-200" />
      ),
    },
    {
      label: "Review",
      href: "/admin/dashboard/review",
      icon: (
        <IconReportAnalytics className="h-5 w-5 shrink-0 text-white dark:text-gray-200" />
      ),
    },
  ];

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    // localStorage.removeItem("isAdmin");
    // window.location.href = "/admin/login"; // redirect
   localStorage.removeItem("isAdmin");
   console.log("logout button");
   
  toast.success("Logged out successfully!");
  navigate("/admin/login", { replace: true });

  };

  return (
    <div
      className={cn(
        "flex w-full flex-1 flex-col md:flex-row overflow-hidden transition-all duration-500 ease-in-out min-h-screen",
        "backdrop-blur-2xl bg-gradient-to-br from-[#0B1A44]/90 to-[#142B6F]/80 text-white"
      )}
    >
      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-8 text-white p-4">
          <div className="flex flex-col overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}

            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => navigate(link.href)} // ✅ dynamic navigation
                  className="flex items-center gap-3 px-4 py-2 rounded-lg text-white hover:bg-orange-500 hover:text-white transition-all duration-300"
                >
                  {link.icon}
                  {open && <span>{link.label}</span>}
                </button>
              ))}
            </div>
          </div>
          {/* jangdeh77@gmail.com */}

          {/* Bottom Avatar + Logout */}
          <div className="flex flex-col gap-2 border-t border-white/20 pt-4">
             < IconLogout
                    className="h-5 w-5 ml-4 shrink-0 text-red-500 cursor-pointer"
                    onClick={handleLogout}
                  >Logout</IconLogout>
          </div>
        </SidebarBody>

  
      </Sidebar>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <Outlet /> {/* ✅ This renders the selected route */}
      </main>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-orange-500 p-3 text-white shadow-lg md:hidden"
      >
        {open ? <IconArrowLeft size={20} /> : <IconBrandTabler size={20} />}
      </button>
    </div>
  );
}

// ✅ Logo (Full)
export const Logo = () => (
  <a
    href="#"
    className="flex items-center space-x-2 py-1 text-sm font-semibold text-white"
  >
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="whitespace-pre text-lg"
    ></motion.span>
  </a>
);

// ✅ Logo Icon (Compact)
export const LogoIcon = () => (
  <a href="#" className="flex items-center py-1"></a>
);

