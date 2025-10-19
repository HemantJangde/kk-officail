import React, { useState } from "react";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import HandShake from "../assets/handshake.jpg";
import hook from "../assets/hook.png";
import { BackgroundLines } from "../Component/ui/background-lines";
import { CardBody, CardContainer, CardItem } from "../Component/ui/3d-card";

const containerVariant = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.25, ease: "easeOut" },
  },
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function AboutSection() {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <section className="relative w-full md:h-210 h-270 py-20 bg-white overflow-hidden px-4 sm:px-8">
      <BackgroundLines>
        <motion.div
          className="w-full flex flex-col items-center justify-center text-center lg:text-left"
          variants={containerVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Header & Button Row */}
          <motion.div
            className="w-full lg:w-[85%] flex flex-col lg:flex-row items-center lg:items-end justify-between gap-4 mb-6"
            variants={fadeUpVariant}
          >
            {/* Header Text */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-orange-500 tracking-wide">
                — Who We Are
              </p>

              <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight text-blue-900">
                <span className="text-orange-500">Crafting Excellence</span>{" "}
                <br className="hidden sm:block" />
                in Every Project
              </h1>
            </div>

            {/* Button Right-Aligned */}
            <div className="flex items-center justify-center lg:justify-end gap-3">
              <button className="bg-orange-500 text-white font-semibold px-5 py-2 sm:px-6 sm:py-2 rounded-full flex items-center gap-2 shadow hover:bg-orange-600 transition text-sm sm:text-base">
                Learn More
              </button>
              <div className="bg-blue-900 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-white">
                <Plus size={18} />
              </div>
            </div>
          </motion.div>

          {/* Description Paragraph */}
          <motion.p
            className="text-gray-600 text-sm sm:text-base max-w-md sm:max-w-xl mx-auto lg:mx-0 leading-relaxed mb-12"
            variants={fadeUpVariant}
          >
            We are a trusted construction company dedicated to delivering
            high-quality projects built on integrity, innovation, and
            craftsmanship. Our team combines years of expertise with modern
            technology to turn every vision into a lasting reality.
          </motion.p>

          {/* Lower Section */}
          <motion.div
            className="flex flex-col lg:flex-row items-center justify-center gap-8 sm:gap-10 w-full"
            variants={containerVariant}
          >
            {/* Left Image (3D Card) */}
            <CardContainer className="inter-var w-full max-w-[22rem] sm:max-w-[28rem] md:max-w-[30rem]">
              <CardBody className="bg-gray-50 relative group/card border border-black/10 w-full rounded-xl">
                <CardItem translateZ="100" className="w-full rounded-2xl">
                  <img
                    src={HandShake}
                    alt="Business handshake"
                    onLoad={() => setImgLoaded(true)}
                    className={`w-full h-56 sm:h-72 md:h-80 object-cover rounded-2xl transition-opacity duration-500 ${
                      imgLoaded ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </CardItem>
              </CardBody>
            </CardContainer>

            {/* Mission Card */}
            <motion.div
              className="relative bg-blue-900 text-white rounded-2xl p-5 sm:p-6 w-full max-w-[22rem] sm:max-w-[28rem] md:max-w-[30rem] flex flex-col justify-between min-h-[200px] sm:min-h-[260px] md:min-h-[300px]"
              variants={fadeUpVariant}
            >
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Our mission is to build strong foundations—both in structures
                and in relationships. We aim to deliver reliable, sustainable,
                and innovative solutions that exceed client expectations and
                stand the test of time.
              </p>

              <div className="flex items-center justify-between mt-5">
                <p className="text-orange-400 font-semibold text-sm sm:text-base">
                  Our Mission
                </p>
                <div className="bg-orange-500 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-white">
                  <Plus size={18} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Floating Hook Animation */}
        <motion.img
          src={hook}
          alt="Crane Hook"
          className="absolute top-5 left-4 sm:top-10 sm:left-12 w-10 sm:w-14 md:w-20 h-auto object-contain"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </BackgroundLines>
    </section>
  );
}
