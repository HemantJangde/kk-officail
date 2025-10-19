import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader, Plus, Trash2, Pencil, UploadCloud } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

export default function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    title: "",
    desc: "",
    location: "",
    area: "",
    duration: "",
    year: "",
    type: "",
    image: null,
  });
  const [editProject, setEditProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`/api/projects`);
      setProjects(res.data.projects || []);
    } catch {
      toast.error("Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => formData.append(key, form[key]));

      const res = await axios.post(
        `${API_BASE}/api/projects`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data.success) {
        setProjects((prev) => [...prev, res.data.project]);
        toast.success("✅ Project added!");
        setForm({
          title: "",
          desc: "",
          location: "",
          area: "",
          duration: "",
          year: "",
          type: "",
          image: null,
        });
        setPreview(null);
      }
    } catch {
      toast.error("❌ Failed to add project.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    try {
      await axios.delete(`/api/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p._id !== id));
      toast.success("🗑️ Project deleted!");
    } catch {
      toast.error("❌ Failed to delete project.");
    }
  };

  const handleEditSave = async () => {
    setUploading(true);
    try {
      const formData = new FormData();
      Object.keys(editProject).forEach((key) =>
        formData.append(key, editProject[key])
      );

      const res = await axios.put(
        `/api/projects/${editProject._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data.success && res.data.project) {
        setProjects((prev) =>
          prev.map((p) =>
            p._id === res.data.project._id ? res.data.project : p
          )
        );
        toast.success("✅ Project updated!");
        setEditProject(null);
      }
    } catch {
      toast.error("❌ Failed to update project.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8 relative"
    >
      {uploading && (
        <div className="fixed inset-0 bg-black/40 flex flex-col items-center justify-center z-50">
          <Loader size={40} className="animate-spin text-orange-500 mb-3" />
          <p className="text-white text-sm">Uploading, please wait...</p>
        </div>
      )}

      <h2 className="text-2xl font-bold text-white/80">Manage Projects</h2>

      {/* 🟠 Add Project Form */}
      <form
        onSubmit={handleAdd}
        className="bg-[#0C226B]/10 p-6 rounded-xl grid md:grid-cols-2 gap-4"
      >
        {/* Title */}
        <input
          type="text"
          placeholder="Project Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-orange-500"
        />

        {/* Location */}
        <input
          type="text"
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          className="border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-orange-500"
        />

        {/* Description */}
        <textarea
          placeholder="Description"
          rows="3"
          value={form.desc}
          onChange={(e) => setForm({ ...form, desc: e.target.value })}
          className="border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-orange-500 md:col-span-2"
        />

        {/* Area */}
        <input
          type="number"
          placeholder="Area (sq.ft)"
          value={form.area}
          onChange={(e) => setForm({ ...form, area: e.target.value })}
          className="border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-orange-500"
        />

        {/* Duration */}
        <select
          value={form.duration}
          onChange={(e) => setForm({ ...form, duration: e.target.value })}
          className="border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-orange-500"
        >
          <option value="">Select Duration</option>
          <option>1 Month</option>
          <option>3 Months</option>
          <option>6 Months</option>
          <option>1 Year</option>
          <option>2 Years</option>
          <option>3 </option>
          <option>4 Years</option>
          <option>5 Year</option>
          <option>6 Years</option>
          <option>7 Years</option>
          <option>8 Year</option>
          <option>9 Year</option>
          <option>10 Year</option>
        </select>

        {/* Year */}
        <select
          value={form.year}
          onChange={(e) => setForm({ ...form, year: e.target.value })}
          className="border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-orange-500"
        >
          <option value="">Select Year</option>
          {Array.from({ length: 10 }, (_, i) => {
            const y = new Date().getFullYear() - i;
            return (
              <option key={y} value={y}>
                {y}
              </option>
            );
          })}
        </select>

        {/* Type */}
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-orange-500"
        >
          <option value="">Select Type</option>
          <option>Residential</option>
          <option>Commercial</option>
          <option>Industrial</option>
          <option>Infrastructure</option>
          <option>Renovation</option>
        </select>

        {/* Image Upload */}
        <div className="col-span-full flex flex-col items-center border-2 border-inset border-orange-400 rounded-lg p-4 cursor-pointer hover:bg-orange-50/40 transition">
          <label className="cursor-pointer flex flex-col items-center gap-2">
            <UploadCloud size={28} className="text-orange-500" />
            <span className="text-sm text-gray-700">Upload Image</span>
            <input type="file" hidden onChange={handleImageChange} />
          </label>
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-3 w-32 h-32 object-cover rounded-lg"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition flex items-center justify-center gap-2 col-span-full"
        >
          <Plus size={18} /> Add Project
        </button>
      </form>

      {/* 🟢 Project List */}
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <Loader className="animate-spin text-orange-500" size={32} />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <motion.div
              key={p._id}
              whileHover={{ scale: 1.03 }}
              className="bg-white/20 rounded-xl shadow-md p-4 border border-gray-100"
            >
              <img
                src={p.image || "https://via.placeholder.com/300"}
                alt={p.title}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <h3 className="font-semibold text-gray-100">{p.title}</h3>
              <p className="text-sm text-gray-300 mb-2">{p.location}</p>
              <p className="text-xs text-gray-400">{p.year}</p>

              <div className="flex gap-3 mt-3">
                <button
                  onClick={() => setEditProject(p)}
                  className="text-orange-500 hover:text-orange-600 flex items-center gap-1 text-sm"
                >
                  <Pencil size={16} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="text-red-500 hover:text-red-700 flex items-center gap-1 text-sm"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* 🟣 Edit Modal */}
      <AnimatePresence>
        {editProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="bg-[#0C226B] text-white rounded-2xl p-6 w-full max-w-2xl shadow-xl space-y-4"
            >
              <h3 className="text-xl font-bold text-orange-400 mb-4 text-center">
                ✏️ Edit Project Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Title */}
                <div className="flex flex-col">
                  <label className="text-sm text-orange-300 mb-1">Title</label>
                  <input
                    type="text"
                    value={editProject.title || ""}
                    onChange={(e) =>
                      setEditProject({ ...editProject, title: e.target.value })
                    }
                    className="bg-white/10 border border-orange-400/40 text-white rounded-lg p-2 text-sm focus:ring-2 focus:ring-orange-400"
                  />
                </div>

                {/* Location */}
                <div className="flex flex-col">
                  <label className="text-sm text-orange-300 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={editProject.location || ""}
                    onChange={(e) =>
                      setEditProject({
                        ...editProject,
                        location: e.target.value,
                      })
                    }
                    className="bg-white/10 border border-orange-400/40 text-white rounded-lg p-2 text-sm focus:ring-2 focus:ring-orange-400"
                  />
                </div>

                {/* Description */}
                <div className="col-span-full flex flex-col">
                  <label className="text-sm text-orange-300 mb-1">
                    Description
                  </label>
                  <textarea
                    rows="3"
                    value={editProject.desc || ""}
                    onChange={(e) =>
                      setEditProject({ ...editProject, desc: e.target.value })
                    }
                    className="bg-white/10 border border-orange-400/40 text-white rounded-lg p-2 text-sm focus:ring-2 focus:ring-orange-400"
                  />
                </div>

                {/* Area */}
                <div className="flex flex-col">
                  <label className="text-sm text-orange-300 mb-1">
                    Area (sq.ft)
                  </label>
                  <input
                    type="number"
                    value={editProject.area || ""}
                    onChange={(e) =>
                      setEditProject({ ...editProject, area: e.target.value })
                    }
                    className="bg-white/10 border border-orange-400/40 text-white rounded-lg p-2 text-sm focus:ring-2 focus:ring-orange-400"
                  />
                </div>

                {/* Duration */}
                <div className="flex flex-col">
                  <label className="text-sm text-orange-300 mb-1">
                    Duration
                  </label>
                  <select
                    value={editProject.duration || ""}
                    onChange={(e) =>
                      setEditProject({
                        ...editProject,
                        duration: e.target.value,
                      })
                    }
                    className="bg-white/10 border border-orange-400/40 text-white rounded-lg p-2 text-sm focus:ring-2 focus:ring-orange-400"
                  >
                    <option value="">Select Duration</option>
                  
          <option>1 Month</option>
          <option>3 Months</option>
          <option>6 Months</option>
          <option>1 Year</option>
          <option>2 Years</option>
          <option>3 years</option>
          <option>4 Years</option>
          <option>5 Year</option>
          <option>6 Years</option>
          <option>7 Years</option>
          <option>8 Year</option>
          <option>9 Year</option>
          <option>10 Year</option>
                  </select>
                </div>

                {/* Year */}
                <div className="flex flex-col">
                  <label className="text-sm text-orange-300 mb-1">Year</label>
                  <select
                    value={editProject.year || ""}
                    onChange={(e) =>
                      setEditProject({ ...editProject, year: e.target.value })
                    }
                    className="bg-white/10 border border-orange-400/40 text-white rounded-lg p-2 text-sm focus:ring-2 focus:ring-orange-400"
                  >
                    <option value="">Select Year</option>
                    {Array.from({ length: 10 }, (_, i) => {
                      const y = new Date().getFullYear() - i;
                      return (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {/* Type */}
                <div className="flex flex-col">
                  <label className="text-sm text-orange-300 mb-1">Type</label>
                  <select
                    value={editProject.type || ""}
                    onChange={(e) =>
                      setEditProject({ ...editProject, type: e.target.value })
                    }
                    className="bg-white/10 border border-orange-400/40 text-white rounded-lg p-2 text-sm focus:ring-2 focus:ring-orange-400"
                  >
                    <option value="">Select Type</option>
                    <option>Residential</option>
                    <option>Commercial</option>
                    <option>Industrial</option>
                    <option>Infrastructure</option>
                    <option>Renovation</option>
                  </select>
                </div>

                {/* Image Upload */}
                <div className="flex flex-col">
                  <label className="text-sm text-orange-300 mb-2">
                    Upload Image
                  </label>

                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-orange-400 rounded-lg p-4 bg-white/5 hover:bg-white/10 transition cursor-pointer">
                    <label
                      htmlFor="editImageUpload"
                      className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2 transition"
                    >
                      <UploadCloud size={16} /> Choose Image
                    </label>

                    <input
                      id="editImageUpload"
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) =>
                        setEditProject({
                          ...editProject,
                          image: e.target.files[0],
                          preview: URL.createObjectURL(e.target.files[0]),
                        })
                      }
                    />

                    {editProject.preview ? (
                      <img
                        src={editProject.preview}
                        alt="Preview"
                        className="mt-3 w-32 h-32 object-cover rounded-lg border border-orange-400/30"
                      />
                    ) : editProject.image &&
                      typeof editProject.image === "string" ? (
                      <img
                        src={editProject.image}
                        alt="Existing"
                        className="mt-3 w-32 h-32 object-cover rounded-lg border border-orange-400/30"
                      />
                    ) : (
                      <p className="text-xs text-gray-300 mt-2">
                        No image selected
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setEditProject(null)}
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-600 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditSave}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg transition"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
