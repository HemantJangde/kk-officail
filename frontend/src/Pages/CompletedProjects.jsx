import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapPin, Ruler, Clock, Loader } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom"; // ✅ Add navigation hook

// ✅ Motion variants
const containerVariant = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.25, ease: "easeOut" },
  },
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function CompletedProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // ✅ For redirect
const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

  // ✅ Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/projects`);
        setProjects(res.data.projects || []);
      } catch (err) {
        console.error("Error loading projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-96 bg-[#081A51] text-white">
        <Loader className="animate-spin text-orange-500" size={36} />
      </div>
    );

  // ✅ Show only 2 projects on homepage
  const limitedProjects = projects.slice(0, 2);

  return (
    <section className="bg-[#081A51] py-20 text-white overflow-hidden">
      <motion.div
        className="max-w-6xl mx-auto px-4"
        variants={containerVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Header */}
        <motion.div className="text-center mb-16" variants={fadeUpVariant}>
          <p className="text-orange-500 font-medium mb-2">— Recent Projects</p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Our <span className="text-orange-500">Completed Projects</span>
          </h2>
        </motion.div>

        {/* ✅ Projects */}
        {limitedProjects.length === 0 ? (
          <p className="text-center text-gray-400">No projects found.</p>
        ) : (
          <motion.div className="space-y-12" variants={containerVariant}>
            {limitedProjects.map((project, index) => (
              <motion.div
                key={project._id}
                variants={fadeUpVariant}
                whileHover={{ y: -5 }}
                className={`flex flex-col md:flex-row ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                } items-center bg-[#0C226B] rounded-3xl overflow-hidden shadow-lg transition-transform`}
              >
                {/* Image */}
                <div
                  className="w-full md:w-1/2 h-72 md:h-80 bg-cover bg-center relative"
                  style={{
                    backgroundImage: `url(${
                      project.image || "https://via.placeholder.com/600x400"
                    })`,
                  }}
                >
                  <div className="absolute bottom-4 left-4 flex gap-2 text-xs">
                    <span className="bg-[#0C226B]/70 px-3 py-1 rounded-full text-white border border-white/20">
                      {project.year}
                    </span>
                    <span className="bg-[#0C226B]/70 px-3 py-1 rounded-full text-white border border-white/20">
                      {project.type}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full md:w-1/2 p-6 md:p-8">
                  <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.desc}</p>
                  <ul className="space-y-2 text-sm text-gray-200 mb-4">
                    <li className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-orange-500" />
                      <span>Location: {project.location}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Ruler className="w-4 h-4 text-orange-500" />
                      <span>Total Area: {project.area}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-orange-500" />
                      <span>Duration: {project.duration}</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* ✅ View All Projects Button */}
        <motion.div className="mt-12 flex justify-center" variants={fadeUpVariant}>
       
       <Link to="/projects" className="hover:text-orange-500 transition">
                    
                 <button
           
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 py-3 text-sm font-semibold transition-all"
          >
            View All Projects
          </button>
             </Link>  
        </motion.div>
      </motion.div>
    </section>
  );
}
