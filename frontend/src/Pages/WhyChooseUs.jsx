import { useRef } from "react";
import { Cpu, UserCog, Clock, Award, Play } from "lucide-react";
import useScrollReveal from "../Hooks/useScrollReveal";
import planing from "../assets/planing.jpeg";

export default function WhyChooseUs() {
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

  // Scroll reveal refs
  const sectionRef = useScrollReveal(); // Section
  const headerRef = useScrollReveal({ delay: 100 }); // Header
  const imageRef = useScrollReveal({ delay: 200 }); // Image
  const cardRef = useScrollReveal({ delay: 300 }); // Features card
  const featureRefs = features.map(() => useScrollReveal({ delay: 400 })); // Individual features

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 bg-white overflow-hidden reveal">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">

        {/* Header */}
        <div
          ref={headerRef}
          className="reveal opacity-0 translate-y-8 transition-all duration-700 text-center md:text-left mb-12"
        >
          <p className="text-orange-500 font-medium mb-2 uppercase tracking-wide">
            Why Choose Us
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-snug">
            Building Trust, <br />
            <span className="text-orange-500">Delivering Excellence</span>
          </h2>

          <div className="flex justify-center md:justify-start mt-6">
            <button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 py-3 text-sm sm:text-base font-semibold flex items-center gap-2 transition-all">
              Learn More
              <span className="bg-blue-900 text-white rounded-full p-1">
                <Play className="w-4 h-4" />
              </span>
            </button>
          </div>
        </div>

        {/* Image + Features */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 lg:gap-16">
          
          {/* Image */}
          <div
            ref={imageRef}
            className="reveal opacity-0 translate-y-8 transition-all duration-700 w-full md:w-1/2"
          >
            <img
              src={planing}
              alt="Planning process"
              className="w-full h-[260px] sm:h-[340px] md:h-[420px] rounded-2xl object-cover shadow-xl"
            />
          </div>

          {/* Features Card */}
          <div
            ref={cardRef}
            className="reveal opacity-0 h-106 translate-y-8 transition-all duration-700 w-full md:w-1/2 bg-[#0C226B] rounded-2xl text-white p-6 sm:p-8 shadow-xl flex flex-col justify-center"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((item, index) => (
                <div
                  key={index}
                  ref={featureRefs[index]}
                  className="reveal opacity-0 translate-y-8 transition-all duration-700 flex gap-3 sm:gap-4 items-start"
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
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
