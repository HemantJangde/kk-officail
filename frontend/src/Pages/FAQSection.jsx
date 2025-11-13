import { useState } from "react";
import { Plus, Minus, MessageSquare, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useScrollReveal from "../Hooks/useScrollReveal";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What services does your company provide?",
      answer:
        "We offer a wide range of construction services including residential, commercial, and industrial projects — from design to completion.",
    },
    {
      question: "Are there any hidden costs?",
      answer:
        "No hidden fees. We maintain full transparency throughout every stage of the project, ensuring clients know exactly where their investment goes.",
    },
    {
      question: "How is the project cost determined?",
      answer:
        "Project cost is based on factors such as materials, labor, design complexity, and timelines — all discussed upfront during consultation.",
    },
    {
      question: "How can I track the progress of my project?",
      answer:
        "We provide regular updates and client access to project management tools so you can monitor progress in real time.",
    },
    {
      question: "Do you provide free consultations or quotes?",
      answer:
        "Yes! We offer free initial consultations and quotes to help clients plan their construction efficiently.",
    },
    {
      question: "What types of projects do you specialize in?",
      answer:
        "We specialize in residential, commercial, and infrastructure construction with a focus on innovation and sustainability.",
    },
  ];

  // Scroll reveal refs
  const sectionRef = useScrollReveal(); // section reveal
  const faqRefs = faqs.map(() => useScrollReveal({ delay: 100 })); // FAQ cards
  const contactRefs = [useScrollReveal({ delay: 200 }), useScrollReveal({ delay: 300 })]; // Right-side boxes

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gray-50 text-[#0C226B] overflow-hidden reveal"
    >
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-10 items-start">
        {/* Left: FAQ Accordion */}
        <div className="md:col-span-2">
          <p className="text-orange-500 font-medium mb-2">FAQs</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-10">
            Questions? <span className="text-orange-500">Look here.</span>
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                ref={faqRefs[index]}
                className={`rounded-2xl p-5 transition-all duration-300 cursor-pointer reveal ${
                  openIndex === index
                    ? "bg-[#0C226B] text-white shadow-lg"
                    : "bg-white text-[#0C226B] shadow-sm hover:shadow-md"
                }`}
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              >
                <div className="flex justify-between items-center w-full text-left font-semibold text-lg">
                  {faq.question}
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-orange-500" />
                  ) : (
                    <Plus className="w-5 h-5 text-orange-500" />
                  )}
                </div>

                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.p
                      key="answer"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="mt-3 text-sm text-gray-200 md:text-gray-300 leading-relaxed"
                    >
                      {faq.answer}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Contact Info */}
        <div className="space-y-6 md:col-span-1">
          <div
            ref={contactRefs[0]}
            className="bg-[#0C226B] text-white p-8 rounded-2xl shadow-md reveal"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-orange-500 p-3 rounded-full">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-xl">
                You have different questions?
              </h3>
            </div>
            <p className="text-sm mb-6 opacity-80">
              Our team is ready to assist with all your queries and ensure a
              quick response.
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-medium">
              Contact Us
            </button>
          </div>

          <div
            ref={contactRefs[1]}
            className="bg-white shadow-md p-6 rounded-2xl text-center reveal"
          >
            <div className="flex flex-col items-center">
              <Phone className="w-8 h-8 text-orange-500 mb-3" />
              <p className="text-sm text-gray-500">Your Comfort, Our Priority</p>
              <h3 className="font-bold text-2xl text-[#0C226B]">24/7 Service</h3>
              <p className="text-gray-500 text-sm">+91 83191 82281</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
