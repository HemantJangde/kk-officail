import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Pencil, Trash2, X, Loader, Upload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

export default function ManageServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false); // ✅ overlay loading state
  const [modalOpen, setModalOpen] = useState(false);
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    icon: "",
    image: null,
  });

  // ✅ Fetch All Services
  const fetchServices = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/services`);
      setServices(res.data?.services || []);
    } catch (error) {
      console.error("Error fetching services:", error);
      toast.error("Failed to fetch services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // ✅ Input Handlers
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) =>
    setFormData({ ...formData, image: e.target.files[0] });

  // ✅ Add / Update Service
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true); // show overlay loader

    const data = new FormData();
    data.append("title", formData.title);
    data.append("desc", formData.desc);
    data.append("icon", formData.icon);
    if (formData.image) data.append("image", formData.image);

    try {
      if (editingService) {
        await axios.put(
          `${API_BASE}/api/services/${editingService._id}`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("Service updated successfully!");
      } else {
        await axios.post(`${API_BASE}/api/services`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Service added successfully!");
      }

      setModalOpen(false);
      setEditingService(null);
      setFormData({ title: "", desc: "", icon: "", image: null });
      fetchServices();
    } catch (error) {
      console.error("Error saving service:", error);
      toast.error("Failed to save service");
    } finally {
      setUploading(false); // hide overlay
    }
  };

  // ✅ Delete Service
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        setUploading(true);
        await axios.delete(`${API_BASE}/api/services/${id}`);
        toast.success("Service deleted successfully!");
        fetchServices();
      } catch (error) {
        toast.error("Failed to delete service");
      } finally {
        setUploading(false);
      }
    }
  };

  // ✅ Edit Modal
  const openEditModal = (service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      desc: service.desc,
      icon: service.icon,
      image: null,
    });
    setModalOpen(true);
  };

  // ✅ Initial Page Loading
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
        <Loader className="animate-spin text-orange-500" size={40} />
        <p className="mt-4 text-gray-600 text-lg font-medium">
          Loading Services...
        </p>
      </div>
    );
  }

  return (
    <section className="p-6 w-full bg-gray-50/20  min-h-screen relative overflow-hidden">
      {/* ✅ Animated Full-Page Overlay for Submitting/Deleting */}
      <AnimatePresence>
        {uploading && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-md flex flex-col items-center justify-center z-[999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Loader className="animate-spin text-orange-400 mb-3" size={48} />
            <p className="text-white text-sm font-medium">
              Processing... Please wait
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto bg-white/10 shadow-md rounded-2xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#0C226B]">Manage Services</h2>
          <button
            onClick={() => {
              setEditingService(null);
              setFormData({ title: "", desc: "", icon: "", image: null });
              setModalOpen(true);
            }}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg shadow transition"
          >
            <Plus size={18} /> Add Service
          </button>
        </div>

        {/* Services Table */}
        {services.length === 0 ? (
          <p className="text-center text-gray-200 ">No services found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border border-gray-100 rounded-lg overflow-hidden">
              <thead className="bg-[#0C226B] text-white">
                <tr>
                  <th className="p-3">Title</th>
                  <th className="p-3">Description</th>
                  <th className="p-3">Icon</th>
                  <th className="p-3">Image</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr
                    key={service._id}
                    className="border-b hover:bg-gray-50/20 transition"
                  >
                    <td className="p-3 font-medium text-gray-800">
                      {service.title}
                    </td>
                    <td className="p-3 text-gray-600 truncate max-w-xs">
                      {service.desc}
                    </td>
                    <td className="p-3 text-center">{service.icon}</td>
                    <td className="p-3">
                      {service.image ? (
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      ) : (
                        <span className="text-gray-400">No image</span>
                      )}
                    </td>
                    <td className="p-3 text-center flex justify-center gap-3">
                      <button
                        onClick={() => openEditModal(service)}
                        className="p-2 text-blue-600 hover:text-blue-800 transition"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(service._id)}
                        className="p-2 text-red-500 hover:text-red-700 transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ✅ Add / Edit Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/20 flex justify-center items-center z-50 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white/90 backdrop-blur-md p-6 rounded-2xl max-w-lg w-full shadow-2xl relative border border-white/30"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-orange-500"
              >
                <X size={24} />
              </button>

              <h3 className="text-xl font-bold text-[#0C226B] mb-4">
                {editingService ? "Edit Service" : "Add New Service"}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full border text-[#0C226B] border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                />
                <textarea
  name="desc"
  placeholder="Enter detailed description"
  value={formData.desc}
  onChange={handleChange}
  rows={5}
  required
  className="w-full border text-[#0C226B] border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none resize-none"
></textarea>

                <input
                  type="text"
                  name="icon"
                  placeholder="Icon (optional - e.g. Building2)"
                  value={formData.icon}
                  onChange={handleChange}
                  className="w-full border text-[#0C226B] border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                />

                <label className="flex items-center gap-2 cursor-pointer border border-dashed border-gray-400 rounded-lg p-3 hover:border-orange-500 transition">
                  <Upload className="text-orange-500" size={20} />
                  <span className="text-gray-600">
                    {formData.image ? formData.image.name : "Choose an image"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>

                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-lg py-2 font-semibold transition"
                >
                  {editingService ? "Update Service" : "Add Service"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
