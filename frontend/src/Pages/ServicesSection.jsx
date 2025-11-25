import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader, X } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useScrollReveal from "../Hooks/useScrollReveal";

export default function ServicesSection() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);

  const revealRef = useScrollReveal(); // ✅ Scroll animation ref
   const gridRef = useScrollReveal()
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`https://kk-officail.onrender.com/api/services`);
        const all = Array.isArray(res.data) ? res.data : res.data.services || [];

        const sorted = [...all].sort((a, b) =>
          new Date(b.createdAt || b._id?.substring(0, 8) * 1000) -
          new Date(a.createdAt || a._id?.substring(0, 8) * 1000)
        );

        setServices(sorted.slice(0, 3));
      } catch (err) {
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <section ref={revealRef} className="py-16 bg-gray-50 text-center mt-10 overflow-hidden">
      <motion.div
        className="max-w-6xl mx-auto px-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >

        {/* Section Header */}
        <p className="text-orange-500 font-medium mb-2">Our Services</p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          Services That Fit <span className="text-orange-500">Your Needs</span>
        </h2>

        {/* Loader */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader className="animate-spin text-orange-500" size={32} />
          </div>
        ) : (
          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
            transition={{ staggerChildren: 0.25 }}
               ref={gridRef}
          >
            {services.map((service) => (
              <motion.div
                key={service._id}
                className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100 cursor-pointer hover:shadow-xl transition"
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
                }}
                whileHover={{ scale: 1.03 }}
                onClick={() => setSelectedService(service)}
              >
                <div
                  className="h-40 bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${service.image || "https://via.placeholder.com/400x300"})` }}
                >
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#0C226B] p-4 rounded-full">
                    <span className="text-white text-sm font-semibold">{service.icon || "🏗️"}</span>
                  </div>
                </div>

                <div className="pt-10 pb-6 px-6">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">{service.title || "Untitled Service"}</h3>
                  <p className="text-gray-500 text-sm mb-4">{service.desc || "No description provided."}</p>
                  <button className="text-sm text-orange-500 font-medium hover:underline">Learn more →</button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Button */}
        <div className="mt-12 flex justify-center">
          <Link
            to="/allservices"
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 py-3 text-sm font-semibold transition"
          >
          View  All service
          </Link>
        </div>
      </motion.div>

      {/* Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl relative border border-white/30">
            <button onClick={() => setSelectedService(null)} className="absolute top-4 right-4 text-gray-600 hover:text-orange-500">
              <X className="w-6 h-6" />
            </button>

            <div className="grid md:grid-cols-2">
              <div
                className="h-80 bg-cover bg-center"
                style={{ backgroundImage: `url(${selectedService.image || "https://via.placeholder.com/500x400"})` }}
              />
              <div className="p-6 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-[#0C226B] mb-2">{selectedService.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{selectedService.desc}</p>
                <p className="text-gray-700 leading-relaxed text-sm">
                  {selectedService.details || "This service ensures excellence in every project."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
