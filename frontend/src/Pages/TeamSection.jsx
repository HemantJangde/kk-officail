import React, { useEffect, useState } from "react";
import axios from "axios";
import { Facebook, Twitter, Loader, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TeamSection() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState(null);
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/team`);
        const allTeam = res.data?.team || [];

        const sortedTeam = allTeam.sort(
          (a, b) =>
            new Date(b.createdAt || b._id.substring(0, 8) * 1000) -
            new Date(a.createdAt || a._id.substring(0, 8) * 1000)
        );

        setTeam(sortedTeam.slice(0, 3));
      } catch (error) {
        console.error("Error fetching team:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-orange-500 font-medium mb-2">Meet Our Team</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Meet the Faces <br />
            <span className="text-orange-500">Behind the Structures</span>
          </h2>
        </div>

        {/* Team Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader className="animate-spin text-orange-500" size={32} />
          </div>
        ) : team.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <div
                key={i}
                onClick={() => setSelectedMember(member)}
                className="bg-white shadow-md rounded-2xl overflow-hidden border border-gray-100 group hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                {/* Image */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-l to-white from-[#0C226B] w-4/3 right-0"></div>
                  <img
                    src={member.image || "https://via.placeholder.com/400x400"}
                    alt={member.name}
                    className="w-full h-80 object-cover relative z-10"
                  />
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
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No team members available.</p>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => (window.location.href = "/allteam")}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold transition-all flex items-center justify-center gap-2 mx-auto"
          >
            View All
            <span className="bg-[#0C226B] rounded-full w-6 h-6 flex items-center justify-center text-white font-bold">
              +
            </span>
          </button>
        </div>
      </div>

      {/* 🧩 Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 relative p-8 border border-gray-100"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-orange-500"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Image */}
              <img
                src={
                  selectedMember.image || "https://via.placeholder.com/400x400"
                }
                alt={selectedMember.name}
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4 border-orange-500 shadow-md"
              />

              {/* Info */}
              <h3 className="text-xl font-bold text-[#0C226B] text-center">
                {selectedMember.name}
              </h3>
              <p className="text-center text-gray-500">{selectedMember.role}</p>

              <p className="text-center text-gray-600 mt-3 leading-relaxed">
                {selectedMember.description ||
                  "This team member plays a vital role in our success."}
              </p>

              {/* Social */}
              <div className="flex justify-center gap-4 mt-6">
                {[Facebook, Twitter].map((Icon, j) => (
                  <div
                    key={j}
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-orange-500 flex items-center justify-center transition-all"
                  >
                    <Icon className="w-5 h-5 text-gray-600 group-hover:text-white" />
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
