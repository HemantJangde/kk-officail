import React, { useState } from "react";
import TeamImage from "../assets/team.jpeg";
import { Cover } from "../Component/ui/cover";
import AnimatedCounter from "../Component/AnimatedCounter";
import useScrollReveal from "../Hooks/useScrollReveal";

export default function HeroSection() {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Scroll reveal refs
  const sectionRef = useScrollReveal();
  const headerRef = useScrollReveal({ delay: 100 });
  const servicesRef = useScrollReveal({ delay: 200 });
  const imageRef = useScrollReveal({ delay: 300 });
  const statsRef = useScrollReveal({ delay: 400 });

  const services = [
    "General Construction Services",
    "Concrete Work",
    "Design and Planning",
    "Civil Works",
    "Pre-Construction",
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 md:mt-10 px-4 sm:px-8 lg:px-16 bg-white reveal"
      aria-label="Construction Services Hero Section"
    >
      {/* Background Accent */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-[#0a2253]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-12">

        {/* Heading + Text */}
        <div ref={headerRef} className="opacity-0 translate-y-8 transition-all duration-700 reveal">
          <p className="text-sm text-gray-500 font-medium mb-2">
            — Award-Winning Construction Excellence
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Where <span className="text-[#102c6f]">Innovation</span> Drives <br />
            <Cover>
              <span className="text-[#ff6726]">Structural Perfection</span>
            </Cover>
          </h1>
        </div>

        {/* Services + Description */}
        <div ref={servicesRef} className="opacity-0 translate-y-8 transition-all duration-700 reveal mt-6 flex flex-col md:flex-row gap-3 items-center md:items-start">
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            {services.map((item, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-xs sm:text-sm font-medium cursor-pointer transition"
              >
                {item}
              </span>
            ))}
          </div>
          <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto md:mx-0 mt-4 md:mt-0">
            We specialize in transforming ideas into solid structures through
            expert craftsmanship and a commitment to quality.
          </p>
        </div>

        {/* Image + Stats */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10">

          {/* Image */}
          <div ref={imageRef} className="opacity-0 translate-y-8 transition-all duration-700 reveal relative w-full md:w-2/3">
            {!imageLoaded && (
              <div className="absolute inset-0 rounded-2xl bg-gray-200 animate-pulse"></div>
            )}
            <img
              src={TeamImage}
              alt="Construction team working"
              onLoad={() => setImageLoaded(true)}
              className="rounded-2xl w-full h-64 sm:h-80 md:h-[420px] object-cover shadow-xl"
            />
          </div>

          {/* Stats Box */}
          <div ref={statsRef} className="opacity-0 translate-y-8 transition-all duration-700 reveal bg-[#ff6726] text-white p-6 sm:p-8 rounded-2xl shadow-lg w-full md:w-1/3 space-y-4 md:-mt-10">
            <div>
              <p className="text-3xl sm:text-4xl font-bold">
                <AnimatedCounter to={640} />+
              </p>
              <p className="text-xs sm:text-sm uppercase tracking-wide">
                Projects Completed
              </p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold">
                <AnimatedCounter to={25} />+
              </p>
              <p className="text-xs sm:text-sm uppercase tracking-wide">
                Years of Experience
              </p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold">
                <AnimatedCounter to={450} />+
              </p>
              <p className="text-xs sm:text-sm uppercase tracking-wide">
                Happy Customers
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
