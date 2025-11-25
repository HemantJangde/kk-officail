// src/Pages/ServiceDetails.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";

import useScrollReveal from "../Hooks/useScrollReveal";

export default function ServiceDetails() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const sectionRef = useScrollReveal();

 useEffect(() => {
  const fetchService = async () => {
    try {
      const res = await axios.get("https://kk-officail.onrender.com/api/services");
      const allServices = res.data.services || [];

      const found = allServices.find((s) => s._id === id);

      setService(found);
    } catch (error) {
      console.error("Error fetching service:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchService();
}, [id]);


  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 bg-white text-orange-600">
        <Loader className="animate-spin text-orange-500" size={36} />
      </div>
    );
  }

  if (!service) {
    return <p className="text-center text-gray-800 mt-20">Service not found</p>;
  }

  return (
    <section
    ref={sectionRef}
    className="bg-white text-gray-800 py-20 pt-30 min-h-screen px-4">
      <div className="max-w-5xl mx-auto">
        <div
          className="h-80 bg-cover bg-center rounded-xl shadow-lg border border-orange-200"
          style={{ backgroundImage: `url(${service.image})` }}
        ></div>

        <h1 className="text-4xl font-bold mt-8 text-orange-600">
          {service.title}
        </h1>

        <p className="text-gray-700 text-lg mt-4 leading-relaxed">
          {service.desc}
        </p>

        <div className="mt-6 text-gray-600">
          {/* Some dummy static + dynamic content */}
          <p>
            At **{service.title}**, we combine expertise and dedication to provide
            top-quality services. Our process involves careful planning,
            professional execution, and the use of premium materials to ensure
            long-lasting results.
          </p>
          <p className="mt-4">
            Whether you are looking to <span className="font-semibold text-orange-600">build</span>,{" "}
            <span className="font-semibold text-orange-600">design</span>, or{" "}
            <span className="font-semibold text-orange-600">renovate</span>, our team
            tailors solutions to meet your vision and budget.
          </p>
        </div>

        <button
          onClick={() => window.history.back()}
          className="mt-8 px-6 py-3 bg-orange-600 text-white rounded-full hover:bg-orange-500 transition"
        >
          ← Back to Services
        </button>
      </div>
    </section>
  );
}
