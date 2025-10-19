import React, { useEffect, useState } from "react";
import axios from "axios";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // ✅ import navigation

export default function TestimonialsSection() {
  const navigate = useNavigate(); // ✅ navigation hook
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    axios
      .get('/api/testimonials')
      .then((res) => setTestimonials(res.data))
      .catch((err) => console.error("Error fetching testimonials:", err));
  }, []);

  const repeatedTestimonials = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
    ...testimonials,
  ];

  return (
    <section className="py-16 md:py-24 bg-[#0C226B] text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
        {/* Section Heading */}
        <p className="text-orange-500 font-medium mb-3 text-sm md:text-base">
          Testimonials
        </p>
        <h2 className="text-2xl md:text-4xl font-bold mb-6 md:mb-10 leading-tight">
          Experience Shared by <br />
          <span className="text-orange-500">Our Clients</span>
        </h2>

      

        {/* Infinite Moving Wrapper */}
        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex gap-6 md:gap-8"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          >
            {repeatedTestimonials.map((t, i) => (
              <div
                key={i}
                className="bg-[#122C7E] rounded-2xl p-5 md:p-6 flex-shrink-0 shadow-lg hover:shadow-xl transition-all duration-300
                  min-w-[250px] sm:min-w-[280px] md:min-w-[320px] max-w-[320px] text-left"
              >
                {/* Rating */}
                <div className="flex items-center mb-3">
                  {[...Array(t.rating || 5)].map((_, idx) => (
                    <Star
                      key={idx}
                      className="w-4 h-4 md:w-5 md:h-5 text-orange-500 fill-orange-500"
                    />
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-base md:text-lg font-semibold mb-2 line-clamp-1">
                  {t.title}
                </h3>

                {/* Feedback */}
                <p className="text-gray-300 text-xs md:text-sm mb-5 md:mb-6 line-clamp-3 leading-relaxed">
                  {t.feedback}
                </p>

                {/* User Info */}
                <div className="flex items-center gap-3 md:gap-4">
                  <img
                    src={t.image}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover "
                  />
                  <div>
                    <p className="font-semibold text-sm md:text-base text-white">
                      {t.name}
                    </p>
                    <p className="text-xs md:text-sm text-gray-300">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
        {/* Small Button to Navigate to Review Form */}
        <button
          onClick={() => navigate("/review")}
          className="mt-30 bg-orange-500  hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm md:text-base transition-all duration-300"
        >
          Submit Your Review
        </button>
      </div>
      
    </section>
  );
}
