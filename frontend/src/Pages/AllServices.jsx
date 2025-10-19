// src/Pages/AllServices.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function AllServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);
const API_BASE = import.meta.env.VITE_API_BASE_URL || "";
console.log("api base",API_BASE);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get('/api/services');
        setServices(res.data.services || []);
      } catch (err) {
        console.error("Error fetching all services:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <section className="py-20 bg-gray-50 text-center overflow-hidden mt-10">
   
      <motion.div
        className="max-w-6xl mx-auto px-4"
        initial="show"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.2 } } }}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-12"
          variants={fadeUp}
        >
          All <span className="text-orange-500">Services</span>
        </motion.h2>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader className="animate-spin text-orange-500" size={32} />
          </div>
        ) : services.length > 0 ? (
          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={{ show: { transition: { staggerChildren: 0.15 } } }}
          >
            {services.map((service) => (
              <motion.div
                key={service._id}
                variants={fadeUp}
                whileHover={{ y: -5 }}
                className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100 cursor-pointer"
                onClick={() => setSelectedService(service)}
              >
                <div
                  className="h-40 bg-cover bg-center relative"
                  style={{
                    backgroundImage: `url(${service.image})`,
                  }}
                ></div>
                <div className="pt-6 pb-6 px-6">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-3">
                    {service.desc}
                  </p>
                  {/* <button className="text-sm text-orange-500 font-medium hover:underline">
                    Learn more →
                  </button> */}
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-gray-500">No services available.</p>
        )}
      </motion.div>

      {/* ✅ Transparent Modal (same design) */}
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
