import { useState } from "react";
import toast from "react-hot-toast";
import { Phone, MapPin, LucideYoutube } from "lucide-react";
import useScrollReveal from "../Hooks/useScrollReveal";
import emailjs from "@emailjs/browser";

const socialLinks = [
  { Icon: LucideYoutube, url: "https://youtube.com/@kkconatruction?si=LwMQQZ6nUOsupFhu" },
];

export default function ContactUs() {
  const sectionRef = useScrollReveal();
  const headerRef = useScrollReveal();
  const formRef = useScrollReveal();
  const infoRef = useScrollReveal();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  // ✅ Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

    const templateParams = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    };
  // ✅ Form Submission Handler 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

        try {
      await emailjs.send(
        "service_0k2cc5j",       // Your EmailJS service ID
        "template_qcrg1uf",      // Your EmailJS template ID
        templateParams,
        "RWyzUTs_BYw3BRzxq"      // Your EmailJS public key
      );

      toast.success("Message sent successfully! 🚀");
      setFormData({ name: "", email: "", phone: "", message: "" });

    } catch (error) {
      toast.error("Failed to send message ❌");
      console.error("EmailJS error:", error);

    } finally {
      setLoading(false);
    }
    
    try {
      const res = await fetch(`https://kk-officail.onrender.com/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Message sent successfully! 🚀");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        // toast.error(data.message || "Failed to send message ❌");
      }
    } catch (err) {
      // toast.error("Server error. Try again later ⚠️");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-gray-50 mt-10 reveal" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12 reveal" ref={headerRef}>
          <p className="text-orange-500 font-medium mb-2">Contact Us</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Have a Project Idea? <span className="text-orange-500">Let's Talk!</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            ref={formRef}
            className="reveal md:col-span-2 bg-white rounded-2xl shadow-md p-8 space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@gmail.com"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter Phone Number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Your Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter here..."
                required
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full md:w-auto ${
                loading ? "bg-orange-300" : "bg-orange-500 hover:bg-orange-600"
              } text-white px-6 py-3 rounded-full font-semibold transition-all`}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>

          {/* Contact Info */}
          <div
            className="reveal bg-[#0C226B] text-white rounded-2xl p-8 flex flex-col justify-between"
            ref={infoRef}
          >
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Address</h3>
                <p className="text-gray-300">
                  Umarpoti, Main Road, Newai,<br /> Bhilai, Chhattisgarh 490006
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Contact</h3>
                <p className="text-gray-300 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-orange-500" /> +91 83191 82281
                </p>
                <p className="text-gray-300 flex items-center gap-2">
                kkconstruction881@gmail.com
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Open Time</h3>
                <p className="text-gray-300">Everyday : 8:00am - 10:00pm</p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-3">Stay Connected</h3>
              <div className="flex gap-4">
                {socialLinks.map(({ Icon, url }, i) => (
                  <a
                    key={i}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <div className="bg-orange-500 group-hover:bg-orange-600 w-10 h-10 rounded-full flex items-center justify-center transition-all">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
