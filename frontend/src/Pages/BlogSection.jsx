import { Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { PinContainer } from "../Component/ui/3d-pin";

import blog1 from "../assets/blog1.webp";
import blog2 from "../assets/blog2.webp";
import blog3 from "../assets/blog3.png";

export default function BlogSection() {
  const blogs = [
    {
      title: "How Technology is Revolutionizing Construction",
      category: "Construction Trends",
      date: "March 17, 2025",
      image: blog1,
      excerpt:
        "Discover how innovative tools and automation are transforming the construction industry for better speed, safety, and efficiency.",
    },
    {
      title: "5 Essential Steps for a Successful Construction Project",
      category: "Project Management",
      date: "March 16, 2025",
      image: blog2,
      excerpt:
        "Learn the key steps that ensure your construction projects are delivered on time, on budget, and up to quality standards.",
    },
    {
      title: "Site Safety Tips: Ensuring a Smooth Construction Process",
      category: "Safety & Compliance",
      date: "March 15, 2025",
      image: blog3,
      excerpt:
        "Safety first! Explore essential safety practices that keep workers protected and sites running smoothly.",
    },
  ];

  const containerVariant = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, ease: "easeOut" },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="py-20 bg-white text-[#0C226B] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center mb-12 text-center md:text-left"
        >
          <div>
            <p className="text-orange-500 font-medium mb-2">News & Blogs</p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Our Latest <span className="text-orange-500">News & Blogs</span>
            </h2>
          </div>

          {/* Button (hidden on desktop if not needed) */}
          {/* <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-full font-medium mt-6 md:mt-0 hover:bg-orange-600 transition-all"
          >
            View All Blogs <ArrowRight className="w-4 h-4" />
          </motion.button> */}
        </motion.div>

        {/* ✅ Desktop Layout (3D Pin Container style) */}
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="hidden md:flex justify-center mt-70 ml-93 pt-2 "
          // hidden md:flex justify-center ml-80 mt-51 pt-2
        >
          {blogs.map((blog, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ y: -6, scale: 1.02 }}
              className="w-[300px] mr-20"
            >
              <PinContainer title={blog.title} className="h-full   overflow-hidden">
                <div className="relative">
                  <motion.img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <span className="absolute bottom-0 left-0 bg-[#0C226B] text-white text-xs px-3 py-1 rounded-tr-xl">
                    {blog.category}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 text-gray-500 text-xs mb-2">
                    <Calendar className="w-4 h-4 text-orange-500" />
                    {blog.date}
                  </div>

                  <h3 className="text-lg font-semibold leading-snug mb-1">
                    {blog.title}
                  </h3>
                </div>
              </PinContainer>
            </motion.div>
          ))}
        </motion.div>

        {/* ✅ Mobile Layout (clean blog card style) */}
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:hidden gap-8 mt-10"
        >
          {blogs.map((blog, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ scale: 1.02 }}
              className="rounded-2xl overflow-hidden shadow-md border border-gray-100 bg-white group"
            >
              <div className="relative overflow-hidden">
                <motion.img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute bottom-0 left-0 bg-[#0C226B] text-white text-xs px-3 py-1 rounded-tr-xl">
                  {blog.category}
                </span>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                  <Calendar className="w-4 h-4 text-orange-500" />
                  {blog.date}
                </div>

                <h3 className="text-lg font-bold mb-2 leading-snug">
                  {blog.title}
                </h3>

                <p className="text-gray-500 text-sm mb-4 line-clamp-3">
                  {blog.excerpt}
                </p>

                <motion.a
                  href="#"
                  whileHover={{ x: 4 }}
                  className="text-orange-500 font-medium text-sm flex items-center gap-1 transition-all"
                >
                  Read More <ArrowRight className="w-4 h-4" />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
