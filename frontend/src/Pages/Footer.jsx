import { Facebook, Twitter, Linkedin, Instagram, Send, MessageCircle, LucideYoutube } from "lucide-react";
import logo from "../assets/KKlogo2.jpg";
const socialLinks = [
    { Icon: Facebook, url: "https://www.facebook.com/share/1CTPxjQDWR/" },  
   
    { Icon: Instagram, url: "https://www.instagram.com/kk_construction_1?igsh=MTZyeGtvZmt1N3gweg==" }, { Icon: LucideYoutube, url: "https://youtube.com/@kkconatruction?si=LwMQQZ6nUOsupFhu" },
  ];
export default function Footer() {
  // Replace this number with KK Construction’s WhatsApp business number
  const whatsappNumber = "8319182281"; // Example: 91 for India + number
  const message = "Hello KK Construction! I’d like to know more about your services.";

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <footer className="bg-[#0C226B] text-white pt-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 border-b border-white/20 pb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center md:text-left">
            Let’s <span className="text-orange-500">Connect</span> with us
          </h2>
          <button
            onClick={handleWhatsAppClick}
            className="mt-6 md:mt-0 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-medium transition-all duration-300"
          >
            Chat on WhatsApp
          </button>
        </div>

        {/* Middle Section */}
        <div className="grid md:grid-cols-4 gap-10 pb-10 border-b border-white/10">
          {/* Logo + Description */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="KK Construction Logo" className="bg-orange-500 w-10 h-10 rounded-full" />
              <h3 className="font-bold text-2xl">
                KK Construction<span className="text-orange-500"></span>
              </h3>
            </div>
            <p className="text-sm text-gray-300 mb-6 leading-relaxed">
              KK Construction is a trusted name in civil and architectural design, specializing
              in commercial and residential projects. With decades of experience, our goal is
              to deliver reliable, aesthetic, and durable infrastructure that stands the test of time.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ Icon, url }, i) => (
        <a
          key={i}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="group"
        >
          <div className="bg-orange-500 group-hover:bg-orange-600 w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer">
            <Icon className="w-5 h-5 text-white" />
          </div>
        </a>
      ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="/about" className="hover:text-orange-400">About Us</a></li>
              <li><a href="/projects" className="hover:text-orange-400">Our Projects</a></li>
              <li><a href="/services" className="hover:text-orange-400">Our Services</a></li>
              <li><a href="/testimonials" className="hover:text-orange-400">Testimonials</a></li>
              <li><a href="/contact" className="hover:text-orange-400">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>📞 +91 83191 82281</li>
              <li>✉️ kkconstruction881@gmail.com</li>
              <li> Umarpoti, Main Road, Newai, <br />   Bhilai, Chhattisgarh </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Get the latest updates</h4>
            <p className="text-sm text-gray-300 mb-3">
              Subscribe to our newsletter to receive our latest construction insights.
            </p>
            <div className="relative">
              <input
                type="email"
                placeholder="Email address"
                className="w-full rounded-full bg-white/10 text-white px-4 py-3 text-sm placeholder-gray-400 focus:outline-none"
              />
              <button className="absolute right-1 top-1 bg-orange-500 hover:bg-orange-600 p-2 rounded-full">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex flex-col md:flex-row px-10 justify-between items-center text-sm bg-orange-600 w-full text py-6">
        <p>© 2025 KK Construction. All Rights Reserved.</p>
        <div className="flex space-x-4 mt-3 md:mt-0">
          <a href="#" className="hover:underline">Terms & Conditions</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 z-50 flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </footer>
  );
}
