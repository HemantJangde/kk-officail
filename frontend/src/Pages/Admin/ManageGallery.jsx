import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Upload } from "lucide-react";

const ManageGallery = () => {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    const res = await axios.get(`https://kk-officail.onrender.com/api/gallery`);
    setImages(res.data);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select an image.");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);

    setLoading(true);
    await axios.post(`https://kk-officail.onrender.com/api/gallery/upload`, formData);
    setLoading(false);
    setFile(null);
    setTitle("");
    fetchImages();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;
    await axios.delete(`https://kk-officail.onrender.com/api/gallery/${id}`);
    fetchImages();
  };

  return (
    <div className="p-6 ">
      <h2 className="text-2xl text-white font-semibold mb-6">Manage Gallery</h2>

      <form
        onSubmit={handleUpload}
        className="flex flex-col sm:flex-row items-center gap-4 mb-8"
      >
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="border border-rose-50 text-white rounded-lg p-2 w-full sm:w-auto"
        />
        <input
          type="text"
          placeholder="Image title (optional)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border text-white rounded-lg p-2 flex-1"
        />
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Upload size={18} />
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img) => (
          <div
            key={img._id}
            className="relative group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition"
          >
            <img
              src={img.imageUrl}
              alt={img.title}
              className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex justify-center items-center">
              <button
                onClick={() => handleDelete(img._id)}
                className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition"
              >
                <Trash2 size={18} />
              </button>
            </div>
            {img.title && (
              <p className="absolute bottom-2 left-2 text-white text-sm bg-black/50 px-2 py-1 rounded">
                {img.title}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageGallery;
