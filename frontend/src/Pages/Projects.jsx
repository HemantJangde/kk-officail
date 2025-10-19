import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapPin, Ruler, Clock, Loader, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CometCard } from "../Component/ui/comet-card.jsx";

export default function AllProjects() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading1, setloading1] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  
const API_BASE = import.meta.env.VITE_API_BASE_URL || "";
console.log("✅ API Base:", import.meta.env.VITE_API_BASE_URL);

  // ✅ Motion variants
  const containerVariant = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, ease: "easeOut" },
    },
  };

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // ✅ Fetch all projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/projects`);
        setProjects(res.data.projects || []);
        setFilteredProjects(res.data.projects || []);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setloading1(false);
      }
    };
    fetchProjects();
  }, []);

  // ✅ Filter logic
  useEffect(() => {
    let filtered = projects;

    if (filterType !== "All") {
      filtered = filtered.filter(
        (p) => p.type?.toLowerCase() === filterType.toLowerCase()
      );
    }

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (p) =>
          p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.desc?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProjects(filtered);
  }, [searchTerm, filterType, projects]);

  if (loading1)
    return (
      <div className="flex justify-center items-center h-96 bg-[#081A51] text-white">
        <Loader className="animate-spin text-orange-500" size={36} />
      </div>
    );

  return (
    <section className="bg-[#081A51] text-white py-20 min-h-screen mt-10">
     
      <motion.div
        className="max-w-7xl mx-auto px-4"
        variants={containerVariant}
        initial="hidden"
        animate="show"
      >
        {/* Header */}
        <motion.div className="text-center mb-10" variants={fadeUpVariant}>
          <p className="text-orange-500 font-medium mb-2">— All Projects</p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Explore <span className="text-orange-500">Our Work</span>
          </h2>
        </motion.div>

        {/* ✅ Search + Filter Bar */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12"
          variants={fadeUpVariant}
        >
          {/* Search */}
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by title, location, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0C226B] border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
            />
          </div>

          {/* Filter Dropdown */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-[#0C226B] border border-white/10 rounded-full py-2.5 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
          >
            <option value="All">All Types</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
          </select>
        </motion.div>

        {/* ✅ Projects Grid */}
        {filteredProjects.length === 0 ? (
          <p className="text-center text-gray-400">No matching projects found.</p>
        ) : (
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariant}
          >
      
            {filteredProjects.map((project) => (
              <motion.div
                key={project._id}
                variants={fadeUpVariant}
                whileHover={{ y: -5, scale: 1.02 }}
               onClick={() => setSelectedProject(project)}
                className="bg-[#0C226B] rounded-2xl overflow-hidden shadow-lg transition-transform"
              >
                    <CometCard>
                {/* Project Image */}
                <div

                  className="h-56 bg-cover bg-center relative"
                  style={{
                    backgroundImage: `url(${
                      project.image || "https://via.placeholder.com/600x400"
                    })`,
                  }}
                >
                  <div className="absolute bottom-3 left-3 flex gap-2 text-xs">
                    <span className="bg-[#081A51]/70 px-3 py-1 rounded-full text-white border border-white/20">
                      {project.year}
                    </span>
                    <span className="bg-[#081A51]/70 px-3 py-1 rounded-full text-white border border-white/20">
                      {project.type}
                    </span>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4">
                    {project.desc?.length > 100
                      ? project.desc.slice(0, 100) + "..."
                      : project.desc}
                  </p>

                  <ul className="space-y-2 text-sm text-gray-200 mb-4">
                    <li className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-orange-500" />
                      <span>{project.location}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Ruler className="w-4 h-4 text-orange-500" />
                      <span>{project.area}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-orange-500" />
                      <span>{project.duration}</span>
                    </li>
                  </ul>
 <button
                    onClick={() => setSelectedProject(project)}
                    className="text-sm text-orange-500 font-medium hover:underline"
                  >
                    Learn more →
                  </button>
                </div>
                  </CometCard>
                  
              </motion.div> 
            ))}
          
          </motion.div>
        )}
      </motion.div>

      {/* ✅ Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#0C226B] rounded-2xl max-w-3xl w-full text-white shadow-xl overflow-hidden relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-gray-300 hover:text-orange-500 transition"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Modal Image */}
              <div
                className="h-64 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${
                    selectedProject.image ||
                    "https://via.placeholder.com/800x500"
                  })`,
                }}
              ></div>

              {/* Modal Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">
                  {selectedProject.title}
                </h3>
                <p className="text-gray-300 mb-4">{selectedProject.desc}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-200">
                  <p>
                    <strong className="text-orange-500">📍 Location:</strong>{" "}
                    {selectedProject.location}
                  </p>
                  <p>
                    <strong className="text-orange-500">📐 Area:</strong>{" "}
                    {selectedProject.area}
                  </p>
                  <p>
                    <strong className="text-orange-500">⏱ Duration:</strong>{" "}
                    {selectedProject.duration}
                  </p>
                  <p>
                    <strong className="text-orange-500">📅 Year:</strong>{" "}
                    {selectedProject.year}
                  </p>
                  <p>
                    <strong className="text-orange-500">🏗 Type:</strong>{" "}
                    {selectedProject.type}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
