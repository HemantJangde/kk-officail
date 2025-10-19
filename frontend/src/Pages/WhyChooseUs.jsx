import { motion } from "framer-motion";
import { Cpu, UserCog, Clock, Award, Play } from "lucide-react";
import planing from "../assets/planing.jpg";

// ✅ Shared animation variants
const containerVariant = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.25, ease: "easeOut" },
  },
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const features = [
  {
    icon: <Cpu className="w-6 h-6 text-orange-500" />,
    title: "Advanced Technology",
    desc: "We use cutting-edge tools and smart planning to ensure efficiency and precision in every project.",
  },
  {
    icon: <UserCog className="w-6 h-6 text-orange-500" />,
    title: "Expert Team",
    desc: "Our engineers and designers bring years of proven experience to deliver top-quality construction work.",
  },
  {
    icon: <Clock className="w-6 h-6 text-orange-500" />,
    title: "On-Time Delivery",
    desc: "Timely execution is our priority, ensuring every project is completed within the committed schedule.",
  },
  {
    icon: <Award className="w-6 h-6 text-orange-500" />,
    title: "Award Winning",
    desc: "Recognized for excellence, our projects consistently meet the highest industry standards.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-20 bg-white overflow-hidden">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12"
        variants={containerVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }} // ✅ triggers once when scrolled into view
      >
        {/* Header Section */}
        <motion.div variants={fadeUpVariant} className="text-center md:text-left mb-12">
          <p className="text-orange-500 font-medium mb-2 uppercase tracking-wide">
            Why Choose Us
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-snug">
            Building Trust, <br />
            <span className="text-orange-500">Delivering Excellence</span>
          </h2>

          {/* Button */}
          <motion.div
            variants={fadeUpVariant}
            className="flex justify-center md:justify-start mt-6"
          >
            <button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 py-3 text-sm sm:text-base font-semibold flex items-center gap-2 transition-all">
              Learn More
              <span className="bg-blue-900 text-white rounded-full p-1">
                <Play className="w-4 h-4" />
              </span>
            </button>
          </motion.div>
        </motion.div>

        {/* Image + Content Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 lg:gap-16">
          {/* Left: Image */}
          <motion.div
            variants={fadeUpVariant}
            className="w-full md:w-1/2 h-auto md:h-[420px] flex justify-center"
          >
            <img
              src={planing}
              alt="Planning process"
              className="w-full h-[260px] sm:h-[340px] md:h-full rounded-2xl object-cover shadow-xl"
            />
          </motion.div>

          {/* Right: Features Card */}
          <motion.div
            variants={fadeUpVariant}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="w-full md:w-1/2 bg-[#0C226B] rounded-2xl text-white p-6 sm:p-8 shadow-xl h-auto md:h-[420px] flex flex-col justify-center"
          >
            <motion.div
              variants={containerVariant}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {features.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeUpVariant}
                  className="flex gap-3 sm:gap-4 items-start"
                >
                  <div>{item.icon}</div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
