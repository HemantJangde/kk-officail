import React, { useEffect, useState } from "react";
import { WifiCog, UserCog, Toilet, ScanFace, Ghost } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import ServicesSection from "./ServicesSection";
import SetUpSection from "./SetUpSection";
import CompletedProjects from "./CompletedProjects";
import WhyChooseUs from "./WhyChooseUs";
import ContactUs from "./ContactUs";
import TeamSection from "./TeamSection";
import TestimonialsSection from "./TestimonialsSection";
import BlogSection from "./BlogSection";
import FAQSection from "./FAQSection";
import NewsletterSection from "./NewsletterSection";
import ReviewSection from "./ReviewSection";
import ReviewForm from "./ReviewForm";

const Home = () => {
  const icons = [WifiCog, UserCog, Toilet, ScanFace, Ghost];
  const [currentIcon, setCurrentIcon] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Rotate icons smoothly
    const iconInterval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % icons.length);
    }, 700);

    // Simulate content loading (e.g., data fetching)
    const timer = setTimeout(() => setLoading(false), 3000);

    return () => {
      clearInterval(iconInterval);
      clearTimeout(timer);
    };
  }, []);

  if (loading) {
    const Icon = icons[currentIcon];
    return (
      <motion.div
        className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-white via-[#fafafa] to-[#f5f5f5] z-[9999] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Background shimmer glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#0C226B]/25 via-[#ff6726]/35 to-[#0C226B]/25"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundSize: "300% 300%",
            filter: "blur(40px)",
          }}
        ></motion.div>

        {/* Rotating Icon Transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIcon}
            initial={{ opacity: 0, scale: 0.7, rotate: -15 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 15 }}
            transition={{ duration: 0.1 }}
            className="relative mb-4"
          >
            <Icon className="w-14 h-14 text-orange-500 drop-shadow-lg" />
          </motion.div>
        </AnimatePresence>

     
      </motion.div>
    );
  }

  return (
    <>
      <HeroSection className="mt-30" />
      <AboutSection />
      <ServicesSection />
      <SetUpSection />
      <CompletedProjects />
      <WhyChooseUs />
      <ContactUs />
      <TeamSection />
      <TestimonialsSection />
      {/* <ReviewForm/> */}
      <BlogSection />
      <FAQSection />
      <NewsletterSection />
      {/* <ReviewSection/> */}
    </>
  );
};

export default Home;
