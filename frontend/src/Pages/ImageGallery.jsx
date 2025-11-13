import React, { useEffect, useState } from "react";
import useScrollReveal from "../Hooks/useScrollReveal";
import axios from "axios";

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useScrollReveal();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(`https://kk-officail.onrender.com/api/gallery`);
        console.log("res",res);
        
        setImages(res.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [images]);

  if (loading) {
    return (
      <section ref={sectionRef} className="px-4 py-20 bg-gray-50 text-center">
        <div className="text-gray-500 text-lg animate-pulse">Loading gallery...</div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="px-4 py-10 mt-20 bg-gray-50">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Image Gallery
      </h2>
      {images.length === 0 ? (
        <p className="text-center text-gray-500">No images uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {images.map((img, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group"
            >
              <img
                src={img.imageUrl}
                alt={img.title || `Gallery ${index + 1}`}
                className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-lg font-medium">
                  {img.title || "View Image"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ImageGallery;
