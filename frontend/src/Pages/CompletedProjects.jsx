import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapPin, Ruler, Clock, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import useScrollReveal from "../Hooks/useScrollReveal";

export default function CompletedProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const sectionRef = useScrollReveal();
  const headerRef = useScrollReveal();
  const listRef = useScrollReveal();
  const buttonRef = useScrollReveal(); // ✅ FIXED

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`https://kk-officail.onrender.com/api/projects`);
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

  const limitedProjects = projects.slice(0, 2);

  return (
    <section ref={sectionRef} className="bg-[#081A51] py-20 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <div ref={headerRef} className="opacity-0 translate-y-8 transition-all duration-700 text-center mb-16">
          <p className="text-orange-500 font-medium mb-2">— Recent Projects</p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Our <span className="text-orange-500">Completed Projects</span>
          </h2>
        </div>

        {/* Project List */}
        {limitedProjects.length === 0 ? (
          <p className="text-center text-gray-400">No projects found.</p>
        ) : (
          <div ref={listRef} className="opacity-0 translate-y-8 transition-all duration-700 space-y-12">
            {limitedProjects.map((project, index) => (
              <div
                key={project._id}
                className={`flex flex-col md:flex-row ${index % 2 === 1 ? "md:flex-row-reverse" : ""} items-center bg-[#0C226B] rounded-3xl overflow-hidden shadow-lg transition-all hover:-translate-y-2`}
              >
                <div
                  className="w-full md:w-1/2 h-72 md:h-80 bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${project.image || "https://via.placeholder.com/600x400"})` }}
                >
                  <div className="absolute bottom-4 left-4 flex gap-2 text-xs">
                    <span className="bg-[#0C226B]/70 px-3 py-1 rounded-full text-white border border-white/20">{project.year}</span>
                    <span className="bg-[#0C226B]/70 px-3 py-1 rounded-full text-white border border-white/20">{project.type}</span>
                  </div>
                </div>

                <div className="w-full md:w-1/2 p-6 md:p-8">
                  <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.desc}</p>
                  <ul className="space-y-2 text-sm text-gray-200 mb-4">
                    <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-orange-500" />Location: {project.location}</li>
                    <li className="flex items-center gap-2"><Ruler className="w-4 h-4 text-orange-500" />Total Area: {project.area}</li>
                    <li className="flex items-center gap-2"><Clock className="w-4 h-4 text-orange-500" />Duration: {project.duration}</li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View More Button */}
        <div ref={buttonRef} className="opacity-0 translate-y-8 transition-all duration-700 mt-12 flex justify-center">
          <Link to="/projects">
            <button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 py-3 text-sm font-semibold transition-all">
              View All Projects
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
}
