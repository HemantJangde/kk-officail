import React, { useEffect, useState } from "react";
import axios from "axios";
import { Facebook, Twitter, Loader, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
export default function AllTeam() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState(null);
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "";


  useEffect(() => {
    const fetchAllTeam = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/team`);
        const allTeam = res.data?.team || [];

        const sortedTeam = allTeam.sort(
          (a, b) =>
            new Date(b.createdAt || b._id.substring(0, 8) * 1000) -
            new Date(a.createdAt || a._id.substring(0, 8) * 1000)
        );
        setTeam(sortedTeam);
      } catch (error) {
        console.error("Error fetching all team:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllTeam();
  }, []);

  return (
    <section className="py-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-orange-500 font-medium mb-2">Our Complete Team</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Meet Everyone Behind <br />
            <span className="text-orange-500">Our Success</span>
          </h2>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader className="animate-spin text-orange-500" size={32} />
          </div>
        ) : team.length > 0 ? (
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {team.map((member, i) => (
             
              <motion.div
                key={i}
                whileHover={{ y: -6, scale: 1.02 }}
                onClick={() => setSelectedMember(member)}
                className="bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-xl cursor-pointer transition-all duration-300 group"
              >

                {/* Image */}
                <div className="relative">
                  <img
                    src={member.image || "https://via.placeholder.com/400x400"}
                    alt={member.name}
                    className="w-full h-80 object-cover rounded-t-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C226B]/60 to-transparent opacity-0 group-hover:opacity-100 transition-all rounded-t-2xl"></div>
                </div>

                {/* Info */}
                <div className="p-6 text-center">
                  <h3 className="text-lg font-bold text-[#0C226B]">
                    {member.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">{member.role}</p>

                  <div className="flex justify-center gap-4">
                    {[Facebook, Twitter].map((Icon, j) => (
                      <div
                        key={j}
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-orange-500 flex items-center justify-center transition-all"
                      >
                        <Icon className="w-4 h-4 text-gray-600 group-hover:text-white" />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-center text-gray-500">No team members available.</p>
        )}
      </div>

      {/* ✅ Transparent Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            className="fixed inset-0 bg-transparent flex justify-center items-center z-50 backdrop-blur-[2px] p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white/90 backdrop-blur-md rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden relative border border-white/30"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-orange-500 transition"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Modal Content */}
              <div className="grid md:grid-cols-2">
                <div
                  className="h-80 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${
                      selectedMember.image ||
                      "https://via.placeholder.com/500x400"
                    })`,
                  }}
                ></div>

                <div className="p-6 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-[#0C226B] mb-2">
                    {selectedMember.name}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    {selectedMember.role}
                  </p>

                  <p className="text-gray-700 leading-relaxed text-sm mb-4">
                    {selectedMember.desc ||
                      "This team member is an essential part of our company, contributing expertise and passion to every project."}
                  </p>

                  <div className="flex gap-4">
                    {[Facebook, Twitter].map((Icon, j) => (
                      <div
                        key={j}
                        className="w-10 h-10 rounded-full bg-gray-100 hover:bg-orange-500 flex items-center justify-center transition-all"
                      >
                        <Icon className="w-5 h-5 text-gray-600 group-hover:text-white" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
