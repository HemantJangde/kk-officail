import { useState } from "react";
import { Plus } from "lucide-react";
import { CardBody, CardContainer, CardItem } from "../Component/ui/3d-card";
import HandShake from "../assets/handshake.jpeg";
import hook from "../assets/hook.png";
import useScrollReveal from "../Hooks/useScrollReveal";

export default function AboutSection() {
  const [imgLoaded, setImgLoaded] = useState(false);

  // Scroll reveal refs
  const sectionRef = useScrollReveal();
  const headerRef = useScrollReveal({ delay: 100 });
  const textRef = useScrollReveal({ delay: 200 });
  const imageRef = useScrollReveal({ delay: 300 });
  const missionRef = useScrollReveal({ delay: 400 });

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 bg-white px-4 sm:px-8 reveal"
      aria-label="About our construction company"
    >
      <div className="w-full flex flex-col items-center text-center lg:text-left max-w-6xl mx-auto">

        {/* Header Section */}
        <div
          ref={headerRef}
          className="opacity-0 translate-y-8 transition-all duration-700 reveal"
        >
          <div className="w-full flex flex-col lg:flex-row items-center lg:items-end justify-between gap-3 mb-6">
            <div className="space-y-4">
              <p className="text-sm font-medium text-orange-500 tracking-wide">
                — Who We Are
              </p>

              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight text-blue-900">
                <span className="text-orange-500">Crafting Excellence</span>
                <br className="hidden sm:block" />
                in Every Project
              </h2>
            </div>

            <div className="flex items-center justify-center lg:justify-end gap-3">
              <button
                className="bg-orange-500 text-white font-semibold px-5 py-2 sm:px-6 sm:py-2 rounded-full flex items-center gap-2 shadow hover:bg-orange-600 transition text-sm sm:text-base"
              >
                Learn More
              </button>
              <div className="bg-blue-900 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-white">
                <Plus size={18} />
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p
          ref={textRef}
          className="opacity-0 translate-y-8 transition-all duration-700 reveal text-gray-600 mt-4 text-sm sm:text-base max-w-md sm:max-w-xl mx-auto lg:mx-0 leading-relaxed mb-12"
        >
          We are a trusted construction company dedicated to delivering high-quality
          projects built on integrity, innovation, and craftsmanship. Our team combines
          years of expertise with modern technology to turn every vision into a lasting reality.
        </p>

        {/* Image + Mission Row */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 sm:gap-10 w-full">

          {/* Image */}
          <div
            ref={imageRef}
            className="opacity-0 translate-y-8 transition-all duration-700 reveal"
          >
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
          </div>

          {/* Mission Box */}
          <div
            ref={missionRef}
            className="opacity-0 translate-y-8 transition-all duration-700 reveal bg-blue-900 text-white rounded-2xl p-5 sm:p-6 w-full max-w-[22rem] sm:max-w-[28rem] md:max-w-[30rem] flex flex-col justify-between min-h-[200px] sm:min-h-[260px] md:min-h-[300px]"
          >
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Our mission is to build strong foundations—both in structures and in relationships.
              We deliver reliable, sustainable, and innovative solutions that exceed client expectations.
            </p>

            <div className="flex items-center justify-between mt-5">
              <p className="text-orange-400 font-semibold text-sm sm:text-base">
                Our Mission
              </p>
              <div className="bg-orange-500 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-white">
                <Plus size={18} />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Floating Hook */}
      <img
        src={hook}
        alt="Construction crane hook"
        className="absolute top-5 left-4 sm:top-10 sm:left-12 w-10 sm:w-14 md:w-20 h-auto object-contain opacity-80"
      />
    </section>
  );
}
