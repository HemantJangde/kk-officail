import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import axios from "axios";
import useScrollReveal from "../Hooks/useScrollReveal";

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useScrollReveal();
    const gridRef = useScrollReveal();
  

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(`https://kk-officail.onrender.com/api/gallery`);
        setImages(res.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  if (loading) {
    return (
      <section ref={sectionRef} className="px-4 mt-20 py-20 bg-gray-50 text-center">
        <div className="text-gray-500 text-lg animate-pulse">Loading gallery...</div>
      </section>
    );
  }

  if (images.length === 0) {
    return (
      <section ref={sectionRef} className="px-4 py-20 bg-gray-50 text-center">
        <p className="text-gray-500">No images uploaded yet.</p>
      </section>
    );
  }

  // Breakpoints for responsive Masonry
  const breakpointColumnsObj = {
    default: 4,
    1280: 3,
    768: 2,
    500: 1,
  };

  return (
    <section ref={sectionRef} className="px-4 py-10 mt-10 bg-gray-50">
      <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">
        {/* Image Gallery */}
      </h3>

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex w-auto -ml-4"
        columnClassName="pl-4 bg-clip-padding"
         
      >
        {images.map((img, index) => (
          <div
            key={index}
            className="mb-4 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
          >
            <img
              src={img.imageUrl}
              alt={img.title || `Gallery ${index + 1}`}
              className="w-full h-auto object-cover transition-transform duration-500 transform group-hover:scale-105"
              loading="lazy"
            />
            {img.title && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-center py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {img.title}
              </div>
            )}
          </div>
        ))}
      </Masonry>
    </section>
  );
};

export default ImageGallery;
