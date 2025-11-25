import React, { useEffect, useState } from "react";
import axios from "axios";
import { Users, Mail, FileText, Hammer, Star, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function DashboardHome() {
  const [stats, setStats] = useState({
    projects: 0,
    services: 0,
    team: 0,
    messages: 0,
    testimonials: 0,
    avgRating: 0,
    totalImages: 0,
  });

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);

      const [
        projectsRes,
        servicesRes,
        teamRes,
        contactsRes,
        testimonialsRes,
        galleryRes,
      ] = await Promise.all([
        axios.get(`https://kk-officail.onrender.com/api/projects`),
        axios.get(`https://kk-officail.onrender.com/api/services`),
        axios.get(`https://kk-officail.onrender.com/api/team`),
        axios.get(`https://kk-officail.onrender.com/api/all`),
        axios.get(`https://kk-officail.onrender.com/api/testimonials`),
        axios.get(`https://kk-officail.onrender.com/api/gallery`), // change to your deployed link if hosted
      ]);

      const testimonials = testimonialsRes.data || [];
      const totalTestimonials = testimonials.length;
      const avgRating =
        totalTestimonials === 0
          ? 0
          : (
              testimonials.reduce((sum, t) => sum + Number(t.rating || 0), 0) /
              totalTestimonials
            ).toFixed(1);

      const galleryData = Array.isArray(galleryRes.data) ? galleryRes.data : [];
      const totalImages = galleryData.length;

      setStats({
        projects: projectsRes.data?.projects?.length || 0,
        services: servicesRes.data?.services?.length || 0,
        team: teamRes.data?.team?.length || 0,
        messages: contactsRes.data?.data?.length || 0,
        testimonials: totalTestimonials,
        avgRating,
        totalImages,
      });
    } catch (err) {
      console.error("Dashboard stats fetch error:", err);
      toast.error("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-[#0C226B] via-[#132d82] to-[#1c3e9d] flex flex-col items-center justify-center text-white z-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
          className="w-14 h-14 border-4 border-orange-400 border-t-transparent rounded-full mb-4"
        />
        <p className="text-lg font-semibold tracking-wide">
          Loading Dashboard...
        </p>
      </div>
    );
  }

  const cardData = [
    {
      label: "Total Projects",
      value: stats.projects,
      icon: <FileText size={28} />,
      color: "from-orange-400/20 to-orange-100/10",
      link: "/admin/dashboard/projects",
    },
    {
      label: "Total Services",
      value: stats.services,
      icon: <Hammer size={28} />,
      color: "from-yellow-400/20 to-yellow-100/10",
      link: "/admin/dashboard/services",
    },
    {
      label: "Team Members",
      value: stats.team,
      icon: <Users size={28} />,
      color: "from-blue-400/20 to-blue-100/10",
      link: "/admin/dashboard/team",
    },
    {
      label: "Messages",
      value: stats.messages,
      icon: <Mail size={28} />,
      color: "from-pink-400/20 to-pink-100/10",
      link: "/admin/dashboard/contacts",
    },
    {
      label: "Gallery Images",
      value: stats.totalImages,
      icon: <ImageIcon size={28} />,
      color: "from-green-400/20 to-green-100/10",
      link: "/admin/dashboard/MangeGallery",
    },
    {
      label: "Total Testimonials",
      value: stats.testimonials,
      icon: <Star size={28} />,
      color: "from-yellow-400/20 to-yellow-100/10",
      link: "/admin/dashboard/review",
    },
    {
      label: "Average Rating",
      value: stats.avgRating,
      icon: <Star size={28} />,
      color: "from-yellow-400/20 to-yellow-100/10",
      link: "/admin/dashboard/review",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient from-[#0C226B] via-[#1a2e75] to-[#263b8c] p-4 sm:p-6 md:p-10 relative overflow-hidden">
      {/* Floating Background Shapes */}
      <motion.div
        className="absolute -top-10 right-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl"
        animate={{ y: [0, 30, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 left-10 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl"
        animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 space-y-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg text-center md:text-left"
        >
          Admin Dashboard Overview
        </motion.h2>

        {/* Responsive Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-6">
          {cardData.map((item, i) => (
            <motion.div
              key={i}
              onClick={() => navigate(item.link)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`cursor-pointer bg-gradient-to-br ${item.color} 
                          p-6 sm:p-8 rounded-2xl shadow-xl border border-white/10 
                          backdrop-blur-md hover:shadow-2xl transition-all duration-300`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm sm:text-base text-white">
                    {item.label}
                  </p>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                    {item.value}
                  </h3>
                </div>
                <div className="bg-white/10 text-orange-400 p-3 sm:p-4 rounded-xl">
                  {item.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
