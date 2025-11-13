import { Mail } from "lucide-react";
import jcb from "../assets/newsletter.jpg";
import hook from "../assets/hook.png";
import useScrollReveal from "../Hooks/useScrollReveal";

export default function NewsletterSection() {
  // Scroll reveal refs
  const sectionRef = useScrollReveal(); // Section
  const textRef = useScrollReveal({ delay: 100 }); // Left text + form
  const imageRef = useScrollReveal({ delay: 200 }); // Right image

  return (
    <section
      ref={sectionRef}
      className="relative bg-white py-20 overflow-hidden reveal"
    >
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT: Text + Form */}
        <div
          ref={textRef}
          className="relative z-10 text-center md:text-left reveal opacity-0 translate-y-8 transition-all duration-700"
        >
          <p className="text-sm uppercase tracking-wider text-[#0C226B] mb-3">
            — Our Newsletter
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0C226B] leading-snug">
            Join Our Newsletter for{" "}
            <span className="text-orange-500">
              Exclusive Deals & Construction Insights!
            </span>
          </h2>

          <form className="flex flex-col sm:flex-row justify-center md:justify-start items-center gap-4 mt-6">
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-3 w-full sm:w-auto shadow-sm">
              <Mail className="text-[#0C226B] w-5 h-5 mr-2 flex-shrink-0" />
              <input
                type="email"
                placeholder="Enter Email Address"
                className="bg-transparent border-none outline-none text-gray-800 placeholder-gray-400 text-sm sm:text-base flex-1 w-full sm:w-64"
              />
            </div>

            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full transition-all shadow-md w-full sm:w-auto"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* RIGHT: Images */}
        <div
          ref={imageRef}
          className="relative flex justify-center md:justify-end items-center reveal opacity-0 translate-y-8 transition-all duration-700"
        >
          {/* Crane Hook */}
          {/* Uncomment if you want hook */}
          {/* <img src={hook} alt="Hook" className="absolute top-0 left-0 w-16 sm:w-24" /> */}

          {/* Excavator */}
          <img
            src={jcb}
            alt="Excavator"
            className="w-56 sm:w-72 md:w-96 object-contain relative z-0"
          />
        </div>
      </div>
    </section>
  );
}
