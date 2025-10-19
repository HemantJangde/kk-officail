"use client";

import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { cn } from "../../lib/utlis.js";

// 🧠 Sidebar context for shared state
const SidebarContext = createContext(undefined);

// ✅ Custom hook for using the sidebar context safely
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

// ✅ Sidebar Provider
export const SidebarProvider = ({ children, open: openProp, setOpen: setOpenProp, animate = true }) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

// ✅ Sidebar wrapper
export const Sidebar = ({ children, open, setOpen, animate }) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

// ✅ Main Sidebar Body
export const SidebarBody = (props) => (
  <>
    <DesktopSidebar {...props} />
    <MobileSidebar {...props} />
  </>
);

// ✅ Desktop Sidebar (for large screens)
export const DesktopSidebar = ({ className, children, ...props }) => {
  const { open, setOpen, animate } = useSidebar();

  return (
    <motion.div
      className={cn(
        "hidden md:flex md:flex-col h-full py-4 bg-white/10 backdrop-blur-md border-r border-white/20 shadow-sm",
        className
      )}
      animate={{
        width: animate ? (open ? "240px" : "72px") : "240px",
      }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// ✅ Mobile Sidebar (drawer-style for small screens)
export const MobileSidebar = ({ className, children, ...props }) => {
  const { open, setOpen } = useSidebar();

  return (
    <div
      className={cn(
        "flex md:hidden items-center justify-between px-4 py-3 bg-white/10 backdrop-blur-md border-b border-white/20",
        className
      )}
      {...props}
    >
      <div className="flex justify-end w-full">
        <IconMenu2
          className="text-gray-800 dark:text-gray-100 cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={cn(
              "fixed inset-0 z-50 flex flex-col justify-between bg-white/70 dark:bg-neutral-900/90 backdrop-blur-xl p-8 shadow-2xl",
              className
            )}
          >
            {/* Close Button */}
            <div
              className="absolute right-8 top-8 text-gray-800 dark:text-gray-100 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <IconX size={24} />
            </div>

            {/* Sidebar Content */}
            <div className="flex-1 overflow-y-auto mt-10">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ✅ Sidebar Link Item
export const SidebarLink = ({ link, className, ...props }) => {
  const { open, animate } = useSidebar();

  return (
    <a
      href={link.href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md group transition-all duration-200 hover:bg-orange-500/30",
        "text-gray-800 dark:text-gray-200",
        className
      )}
      {...props}
    >
      {link.icon}
      <motion.span
        animate={{
          opacity: animate ? (open ? 1 : 0) : 1,
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
        }}
        transition={{ duration: 0.2 }}
        className="text-sm font-medium whitespace-nowrap group-hover:translate-x-1 transition-transform duration-150"
      >
        {link.label}
      </motion.span>
    </a>
  );
};
