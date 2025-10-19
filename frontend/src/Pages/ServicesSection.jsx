import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Animation variants
const containerVariant = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.25, ease: "easeOut" },
  },
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export default function ServicesSection() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);


  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`/api/services`);

        // Correct extraction of data
        const all = Array.isArray(res.data)
          ? res.data
          : res.data.services || [];

        if (!Array.isArray(all) || all.length === 0) {
          console.warn("⚠️ No services found in response");
          setServices([]);
          return;
        }

        // Sort newest first and limit to 3
        const sorted = [...all].sort(
          (a, b) =>
            new Date(b.createdAt || b._id.substring(0, 8) * 1000) -
            new Date(a.createdAt || a._id.substring(0, 8) * 1000)
        );
        setServices(sorted.slice(0, 3));
      } catch (err) {
        console.error("❌ Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <section className="py-16 bg-gray-50 text-center mt-10 overflow-hidden">
      <motion.div
        className="max-w-6xl mx-auto px-4"
        variants={containerVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Section Header */}
        <motion.p
          className="text-orange-500 font-medium mb-2"
          variants={fadeUpVariant}
        >
          Our Services
        </motion.p>
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-12"
          variants={fadeUpVariant}
        >
          Services That Fit <span className="text-orange-500">Your Needs</span>
        </motion.h2>

        {/* Loader */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader className="animate-spin text-orange-500" size={32} />
          </div>
        ) : services.length > 0 ? (
          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariant}
          >
            {services.map((service, index) => (
              <motion.div
                key={service._id || index}
                variants={fadeUpVariant}
                whileHover={{ y: -5 }}
                className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100 cursor-pointer"
                onClick={() => setSelectedService(service)}
              >
                {/* Image */}
                <div
                  className="h-40 bg-cover bg-center relative"
                  style={{
                    backgroundImage: `url(${
                      service.image || "https://via.placeholder.com/400x300"
                    })`,
                  }}
                >
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#0C226B] p-4 rounded-full">
                    <span className="text-white text-sm font-semibold">
                      {service.icon || "🏗️"}
                    </span>
                  </div>
                </div>

                {/* Text */}
                <div className="pt-10 pb-6 px-6">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">
                    {service.title || "Untitled Service"}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    {service.desc || "No description provided."}
                  </p>
                  <button className="text-sm text-orange-500 font-medium flex items-center justify-center gap-1 hover:underline">
                    Learn more →
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-center text-gray-500">No services available.</p>
        )}

        {/* View All Button */}
        <motion.div
          className="mt-12 flex justify-center"
          variants={fadeUpVariant}
        >
          <a
            href="/allservices"
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 py-3 text-sm font-semibold transition-all"
          >
            View All Services
          </a>
        </motion.div>
      </motion.div>

      {/* ✅ Transparent Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            className="fixed inset-0 bg-black/20 flex justify-center items-center z-50 backdrop-blur-sm p-4"
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
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-orange-500 transition"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="grid md:grid-cols-2">
                <div
                  className="h-80 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${
                      selectedService.image ||
                      "https://via.placeholder.com/500x400"
                    })`,
                  }}
                ></div>

                <div className="p-6 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-[#0C226B] mb-2">
                    {selectedService.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    {selectedService.desc}
                  </p>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {selectedService.details ||
                      "This service is crafted with precision, ensuring quality and satisfaction in every project we handle."}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
