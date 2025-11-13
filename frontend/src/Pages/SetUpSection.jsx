import { ChevronRight } from "lucide-react";
import jcb from "../assets/jcb.png";
import useScrollReveal from "../Hooks/useScrollReveal";

const steps = [
  {
    step: "STEP 1",
    title: "Consultation & Planning",
    desc: "We begin by understanding your vision and inspecting the project site to assess feasibility, design preferences, and material requirements.",
  },
  {
    step: "STEP 2",
    title: "Design & Construction",
    desc: "Our experienced engineers and architects craft designs while our workforce ensures safe, precision-built structures.",
  },
  {
    step: "STEP 3",
    title: "Final Inspection & Handover",
    desc: "We perform a quality and safety inspection, ensuring the project is ready to use before handover.",
  },
];

export default function SetUpSection() {
  const sectionRef = useScrollReveal();
  const headerRef = useScrollReveal();
  const stepsRef = useScrollReveal();

  return (
    <section
      ref={sectionRef}
      className="relative py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div
          ref={headerRef}
          className="opacity-0 translate-y-8 transition-all duration-700 flex flex-col md:flex-row md:items-center md:justify-between mb-12"
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
        </div>

        {/* Steps Grid */}
        <div
          ref={stepsRef}
          className="opacity-0 translate-y-8 transition-all duration-700 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative mb-20"
        >
          {steps.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8 text-left max-w-md mx-auto transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
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
            </div>
          ))}
        </div>
      </div>

      {/* Floating Excavator */}
      <img
        src={jcb}
        alt="Excavator"
        className="absolute bottom-0 right-0 sm:right-10 w-40 sm:w-56 md:w-64 lg:w-72 xl:w-80 object-contain pointer-events-none animate-bounce-slow"
      />
    </section>
  );
}
