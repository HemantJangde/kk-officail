import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import jcb from "../assets/jcb.png"; // ensure this is a transparent PNG

const steps = [
  {
    step: "STEP 1",
    title: "Consultation & Planning",
    desc: "We begin by understanding your vision and inspecting the project site to assess feasibility, design preferences, and material requirements. This helps us create a clear plan before we start building.",
  },
  {
    step: "STEP 2",
    title: "Design & Construction",
    desc: "Our experienced engineers and architects craft detailed designs while our skilled workforce ensures every structure is built with precision, safety, and adherence to industry standards.",
  },
  {
    step: "STEP 3",
    title: "Final Inspection & Handover",
    desc: "After construction, we conduct a full quality check and safety inspection. Once everything meets our standards, we hand over the completed project—on time and ready for use.",
  },
];

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

export default function SetUpSection() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <motion.div
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariant}
        initial="show"
        whileInView="show"
      >
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-12"
          variants={fadeUpVariant}
        >
          <div className="text-center md:text-left">
            <p className="text-blue-900 font-medium mb-2">-- How We Work</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-950 leading-tight">
              How We <span className="text-orange-500">Get It Done</span>
            </h2>
          </div>

          <button className="mt-6 md:mt-0 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full text-sm font-semibold flex items-center gap-2 transition-all mx-auto md:mx-0">
            Learn More
            <span className="bg-blue-900 text-white rounded-full p-1">
              <ChevronRight className="w-4 h-4" />
            </span>
          </button>
        </motion.div>

        {/* Steps */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative mb-20"
          variants={containerVariant}
        >
          {steps.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeUpVariant}
              whileHover={{
                y: -8,
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
              }}
              transition={{ duration: 0.3 }}
              className="relative bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8 text-left transition-transform max-w-md mx-auto"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-blue-900 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {item.step}
                </span>
                {index > 0 && (
                  <span className="text-orange-500">
                    <ChevronRight className="w-5 h-5" />
                  </span>
                )}
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Floating Excavator Image */}
      <motion.img
        src={jcb}
        alt="Excavator"
        className="absolute bottom-0 right-0 sm:right-10 w-40 sm:w-56 md:w-64 lg:w-72 xl:w-80 object-contain pointer-events-none"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
    </section>
  );
}
