import React, { useState } from "react";
import { motion } from "framer-motion";
import TeamImage from "../assets/team.jpg";
import { Cover } from "../Component/ui/cover";

export default function HeroSection() {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Animation Variants
  const containerVariant = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.25, ease: "easeOut" },
    },
  };

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const imageVariant = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const statsVariant = {
    hidden: { opacity: 0, x: 40 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <section className="relative mt-15 w-full h-240 bg-white flex flex-col justify-center overflow-hidden py-16 px-4 sm:px-8 lg:px-16">
      {/* Blue Background */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-[#0a2253]" />

      {/* Floating Accent */}
      <motion.div
        className="absolute bottom-1/3 left-[8%] text-orange-500 text-4xl sm:text-5xl"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <span>✦</span>
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-12"
        variants={containerVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.3}} // animates every scroll up/down
      >
        {/* Text Section */}
        <motion.div className="text-center md:text-left" variants={fadeUpVariant}>
          <motion.p
            className="text-sm text-gray-500 font-medium mb-2"
            variants={fadeUpVariant}
          >
            — Award-Winning Construction Excellence
          </motion.p>

          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
            variants={fadeUpVariant}
          >
            Where <span className="text-[#102c6f]">Innovation</span> Drives <br />

           <Cover><span className="text-[#ff6726]">Structural Perfection</span></Cover> 
          </motion.h1>

          <motion.div
            className="mt-6 flex flex-col md:flex-row gap-3 items-center md:items-start"
            variants={fadeUpVariant}
          >
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              {[
                "General Construction Services",
                "Concrete Work",
                "Design and Planning",
                "Civil Works",
                "Pre-Construction",
              ].map((item, index) => (
                <motion.span
                  key={index}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-xs sm:text-sm font-medium cursor-pointer transition"
                  variants={fadeUpVariant}
                >
                  {item}
                </motion.span>
              ))}
            </div>

            <motion.p
              className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto md:mx-0"
              variants={fadeUpVariant}
            >
              We specialize in transforming ideas into solid structures through
              expert craftsmanship, modern techniques, and a commitment to
              quality. From design to delivery, our team ensures precision,
              durability, and excellence in every project we undertake.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Image + Stats */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10"
          variants={containerVariant}
        >
          {/* Left - Image with Branded Skeleton */}
          <motion.div className="relative w-full md:w-2/3" variants={imageVariant}>
            {/* Skeleton Loader (Brand Colors + Shimmer Effect) */}
            {!imageLoaded && (
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#0C226B]/30 via-[#ff6726]/40 to-[#0C226B]/30 animate-pulse"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              ></motion.div>
            )}

            <motion.img
              src={TeamImage}
              alt="Construction Team"
              onLoad={() => setImageLoaded(true)}
              initial={{ opacity: 0 }}
              animate={{ opacity: imageLoaded ? 1 : 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="rounded-2xl w-full h-64 sm:h-80 md:h-[420px] object-cover shadow-xl"
            />
          </motion.div>

          {/* Right - Stats Box */}
          <motion.div
            className="bg-[#ff6726] text-white p-6 sm:p-8 rounded-2xl shadow-lg w-full md:w-1/3 space-y-4 md:-mt-10"
            variants={statsVariant}
          >
            <div>
              <p className="text-3xl sm:text-4xl font-bold">640+</p>
              <p className="text-xs sm:text-sm uppercase tracking-wide">
                Projects Completed
              </p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold">25+</p>
              <p className="text-xs sm:text-sm uppercase tracking-wide">
                Years of Experience
              </p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold">450+</p>
              <p className="text-xs sm:text-sm uppercase tracking-wide">
                Happy Customers
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
