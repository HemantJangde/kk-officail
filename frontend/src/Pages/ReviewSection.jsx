import React, { useState } from "react";
import { Star, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import jcb from "../assets/newsletter.jpg";

export default function ReviewSection() {
  const [rating, setRating] = useState(0);
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    review: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.review || rating === 0) {
      alert("Please fill out all fields and select a rating.");
      return;
    }

    // Simulate submission (can later integrate API)
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: "", review: "" });
    setRating(0);
  };

  return (
    <section className="relative bg-gradient-to-br from-white to-gray-50 py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT SECTION */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left"
        >
          <p className="text-sm uppercase tracking-wider text-[#0C226B] mb-3">
            — Leave a Review
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0C226B] leading-snug">
            Tell Us About Your{" "}
            <span className="text-orange-500">Construction Experience</span>
          </h2>

          <p className="text-gray-600 mb-6 max-w-md mx-auto md:mx-0">
            Your feedback helps us improve and inspire trust in future clients.
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 bg-white shadow-lg rounded-2xl p-6 border border-gray-100"
          >
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="bg-gray-50 rounded-xl px-4 py-3 w-full shadow-sm outline-none text-gray-800 placeholder-gray-400 text-sm sm:text-base focus:ring-2 focus:ring-orange-400"
            />

            {/* Rating */}
            <div className="flex items-center gap-2 justify-center md:justify-start">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  className={`w-7 h-7 cursor-pointer transition-all ${
                    (hover || rating) >= star
                      ? "text-yellow-400 scale-110"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>

            <textarea
              rows="4"
              placeholder="Write your review..."
              value={formData.review}
              onChange={(e) =>
                setFormData({ ...formData, review: e.target.value })
              }
              className="bg-gray-50 rounded-xl px-4 py-3 w-full shadow-sm outline-none text-gray-800 placeholder-gray-400 text-sm sm:text-base resize-none focus:ring-2 focus:ring-orange-400"
            ></textarea>

            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full transition-all shadow-md w-full sm:w-auto mx-auto md:mx-0"
            >
              Submit Review
            </motion.button>
          </form>

          {/* Success Message */}
          <AnimatePresence>
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="mt-4 flex items-center gap-2 text-green-600 font-semibold text-sm"
              >
                <CheckCircle2 className="w-5 h-5" />
                Thank you for your review! 🎉
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* RIGHT SECTION: Image + Overlay */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative flex justify-center md:justify-end items-center"
        >
          <div className="relative">
            <img
              src={jcb}
              alt="Construction Review"
              className="w-72 md:w-96 object-contain rounded-2xl shadow-2xl"
            />

            {/* Floating Card Animation */}
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-md p-4 border"
            >
              <p className="text-[#0C226B] font-semibold">4.9 ⭐ Rating</p>
              <p className="text-gray-500 text-sm">from happy clients</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
