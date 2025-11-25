// src/Pages/ProjectDetails.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import useScrollReveal from "../Hooks/useScrollReveal";


export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
 const sectionRef = useScrollReveal();
  useEffect(() => {
    const fetchProject = async () => {
  try {
    const res = await axios.get(`https://kk-officail.onrender.com/api/projects`);
    const allProjects = res.data.projects || [];

    const found = allProjects.find((p) => p._id === id);

    setProject(found);
  } catch (error) {
    console.error("Error fetching project:", error);
  } finally {
    setLoading(false);
  }
};

    fetchProject();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-96 bg-[#081A51] text-white">
        <Loader className="animate-spin text-orange-500" size={36} />
      </div>
    );

  if (!project)
    return <p className="text-center text-white">Project not found.</p>;

  return (
    <section 
    ref={sectionRef}
    className="bg-[#081A51] mt-10 text-white py-20 min-h-screen px-4">
      <div className="max-w-6xl mx-auto">

        {/* Main Image */}
        <div
          className="h-80 md:h-110 bg-cover bg-center rounded-2xl shadow-lg"
          style={{ backgroundImage: `url(${project.image})` }}
        ></div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mt-8">
          {project.title}
        </h1>

        {/* Dynamic Info */}
        <div className="grid md:grid-cols-2 gap-6 text-lg mt-6">
          <p><strong className="text-orange-500">📍 Location:</strong> {project.location}</p>
          <p><strong className="text-orange-500">📐 Area:</strong> {project.area}</p>
          <p><strong className="text-orange-500">⏱ Duration:</strong> {project.duration}</p>
          <p><strong className="text-orange-500">📅 Year:</strong> {project.year}</p>
          <p><strong className="text-orange-500">🏗 Type:</strong> {project.type}</p>
        </div>

        {/* Description */}
        <p className="text-gray-300 mt-6 leading-relaxed">{project.desc}</p>
        

        {/* ⭐ Dummy Static Content Section */}
        <div className="mt-10 bg-[#0C226B] p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl mb-3 font-bold text-orange-500">Additional Project Insights</h2>

        <p className="text-gray-300 text-lg mt-6 leading-relaxed">
  This <span className="text-orange-500 font-semibold">{project.type}</span> project, 
  located in <span className="text-orange-500 font-semibold">{project.location}</span>,  
  spans an area of <span className="text-orange-500 font-semibold">{project.area}</span>.  
  It was constructed in the year 
  <span className="text-orange-500 font-semibold"> {project.year}</span> and completed within  
  <span className="text-orange-500 font-semibold"> {project.duration}</span>.  
  The overall build reflects premium quality and attention to detail.
</p>
<br />

          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>High-grade materials were used throughout construction.</li>
            <li>Engineered for long-lasting structure and modern design.</li>
            <li>Built with eco-friendly and sustainable practices.</li>
            <li>Client-focused interior planning and execution.</li>
          </ul>
        </div>

      </div>
    </section>
  );
}
