import React from "react";
import { Calendar, ArrowRight } from "lucide-react";
import useScrollReveal from "../Hooks/useScrollReveal";

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

  // Section reveal
  const sectionRef = useScrollReveal();

  return (
    <section ref={sectionRef} className="py-20 bg-white text-[#0C226B] reveal">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-orange-500 font-medium mb-2">News & Blogs</p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Our Latest <span className="text-orange-500">News & Blogs</span>
          </h2>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {blogs.map((blog, i) => {
            const cardRef = useScrollReveal({ delay: i * 100 }); // Each card has its own reveal
            return (
              <div
                key={i}
                ref={cardRef}
                className="rounded-2xl overflow-hidden shadow-md border border-gray-100 bg-white group cursor-pointer transition-all duration-300 reveal"
              >
                <div className="relative overflow-hidden">
                  <img
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

                  <h3 className="text-lg font-bold mb-2 leading-snug">{blog.title}</h3>

                  <p className="text-gray-500 text-sm mb-4 line-clamp-3">{blog.excerpt}</p>

                  <a
                    href="#"
                    className="text-orange-500 font-medium text-sm flex items-center gap-1 transition-all"
                  >
                    Read More <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
