// src/Pages/AllServices.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search, Loader } from "lucide-react";
import { CometCard } from "../Component/ui/comet-card.jsx";
import useScrollReveal from "../Hooks/useScrollReveal";
import { useNavigate } from "react-router-dom";

export default function AllServices() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");

  // Scroll Reveal
  const sectionRef = useScrollReveal();
  const headerRef = useScrollReveal();
  const filterRef = useScrollReveal();
  const gridRef = useScrollReveal();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get("https://kk-officail.onrender.com/api/services");
        const srv = res.data.services || res.data; // depending on API shape
        setServices(srv);
        setFilteredServices(srv);
      } catch (err) {
        console.error("Error loading services:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  // Filter logic
  useEffect(() => {
    let filtered = services;

    if (filterType !== "All") {
      filtered = filtered.filter(
        (s) =>
          s.type &&
          s.type.toLowerCase() === filterType.toLowerCase()
      );
    }

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (s) =>
          (s.title && s.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (s.desc && s.desc.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredServices(filtered);
  }, [searchTerm, filterType, services]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 bg-white text-orange-600">
        <Loader className="animate-spin text-orange-500" size={36} />
      </div>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="bg-white text-gray-800 py-20 min-h-screen reveal-section mt-5"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div
          ref={headerRef}
          className="opacity-0 translate-y-8 transition-all duration-700 text-center mb-12"
        >
          <p className="text-orange-600 font-medium mb-2">— Our Services</p>
          <h2 className="text-3xl md:text-4xl font-bold">
            What We <span className="text-orange-600">Offer</span>
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
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-orange-300 rounded-full py-2.5 pl-10 pr-4 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              />
            </div>

        
          </div>

        {/* Services Grid */}
        {filteredServices.length === 0 ? (
          <p className="text-center text-gray-500">
            No matching services found.
          </p>
        ) : (
       <div
  ref={gridRef}
  className="opacity-0 translate-y-8 transition-all duration-700 
             grid sm:grid-cols-2 lg:grid-cols-3 gap-10"
>
  {filteredServices.map((service) => (
    <div
    
      key={service._id || service.id}
      onClick={() => navigate(`/service/${service._id || service.id}`)}
      className="bg-white rounded-2xl overflow-hidden shadow-lg border border-orange-200 
                 hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer"
    >
      {/* Service Image */}
      <div
        className="h-52 bg-cover bg-center"
        style={{
          backgroundImage: `url(${service.image || "https://via.placeholder.com/600x400"})`,
        }}
      ></div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {service.title}
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {service.desc?.slice(0, 90)}...
        </p>

        <button className="mt-2 text-orange-600 font-medium hover:text-orange-500">
          Read More →
        </button>
      </div>
    </div>
  ))}
</div>

        )}
      </div>
    </section>
  );
}
