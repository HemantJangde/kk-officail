// src/Pages/AllProjects.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapPin, Ruler, Clock, Loader, Search, X } from "lucide-react";
import { CometCard } from "../Component/ui/comet-card.jsx";
import useScrollReveal from "../Hooks/useScrollReveal";
import { useNavigate } from "react-router-dom";


export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
const navigate = useNavigate();

  // ✅ Scroll Reveal Refs
  const sectionRef = useScrollReveal();
  const headerRef = useScrollReveal();
  const filterRef = useScrollReveal();
  const gridRef = useScrollReveal();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`https://kk-officail.onrender.com/api/projects`);
        setProjects(res.data.projects || []);
        setFilteredProjects(res.data.projects || []);
      } catch (err) {
        console.error("Error loading projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // ✅ Filter Logic
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

  if (loading)
    return (
      <div className="flex justify-center items-center h-96 bg-[#081A51] text-white">
        <Loader className="animate-spin text-orange-500" size={36} />
      </div>
    );

  return (
    <section ref={sectionRef} className="bg-[#081A51] text-white py-20 min-h-screen reveal-section mt-10">

      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div
          ref={headerRef}
          className="opacity-0 translate-y-8 transition-all duration-700 text-center mb-12"
        >
          <p className="text-orange-500 font-medium mb-2">— All Projects</p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Explore <span className="text-orange-500">Our Work</span>
          </h2>
        </div>

        {/* Search + Filter */}
        <div
          ref={filterRef}
          className="opacity-0 translate-y-8 transition-all duration-700 flex flex-col md:flex-row items-center justify-around gap-4 mb-12"
        >
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by title, location or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0C226B] border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
            />
          </div>

        
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <p className="text-center text-gray-400">No matching projects found.</p>
        ) : (
          <div
            ref={gridRef}
            className="opacity-0 translate-y-8 transition-all duration-700 grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project) => (
              <div
                key={project._id}
              onClick={() => navigate(`/project/${project._id}`)}

                className="bg-[#0C226B] rounded-2xl overflow-hidden shadow-lg cursor-pointer hover:-translate-y-2 transition-all"
              >
                <CometCard>
                  <div
                    className="h-56 bg-cover bg-center relative"
                    style={{
                      backgroundImage: `url(${project.image || "https://via.placeholder.com/600x400"})`,
                    }}
                  >
                    <div className="absolute bottom-3 left-3 flex gap-2 text-xs">
                      <span className="bg-[#081A51]/70 px-3 py-1 rounded-full border border-white/20">
                        {project.year}
                      </span>
                      <span className="bg-[#081A51]/70 px-3 py-1 rounded-full border border-white/20">
                        {project.type}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-300 text-sm mb-4">
                      {project.desc?.slice(0, 100)}...
                    </p>
                  </div>
                </CometCard>
              </div>
            ))}
          </div>
        )}
      </div>

      
     
    </section>
  );
}
