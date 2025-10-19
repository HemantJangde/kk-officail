import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2, PlusCircle, Loader, Upload } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function ManageTeam() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState({
    name: "",
    role: "",
    image: "",
    facebook: "",
    twitter: "",
  });

  // ✅ Fetch all team members
  const fetchTeam = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/team`);
      setTeam(res.data.team);
    } catch (error) {
      toast.error("Failed to fetch team members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  // ✅ Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Handle image upload + preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file });
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    } else {
      setPreview(null);
    }
  };

  // ✅ Add or Update member (with full page loader)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("role", form.role);
      formData.append("facebook", form.facebook);
      formData.append("twitter", form.twitter);
      if (form.image instanceof File) {
        formData.append("image", form.image);
      }

      if (editingMember) {
        await axios.put(
          `/api/team/${editingMember._id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("Team member updated!");
      } else {
        await axios.post(`/api/team`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Team member added!");
      }

      setModalOpen(false);
      setEditingMember(null);
      setForm({ name: "", role: "", image: "", facebook: "", twitter: "" });
      setPreview(null);
      await fetchTeam();
    } catch (error) {
      toast.error("Failed to save member");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete member (also shows full-page loader)
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;
    setLoading(true);
    try {
      await axios.delete(`/api/team/${id}`);
      toast.success("Team member deleted!");
      await fetchTeam();
    } catch {
      toast.error("Failed to delete member");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Open edit modal
  const handleEdit = (member) => {
    setEditingMember(member);
    setForm({
      name: member.name,
      role: member.role,
      image: member.image,
      facebook: member.facebook,
      twitter: member.twitter,
    });
    setPreview(member.image);
    setModalOpen(true);
  };

  // ✅ Full Page Loader
  if (loading) {
    return (
      <div className="fixed inset-0 bg-white/90 flex flex-col items-center justify-center z-50 backdrop-blur-sm">
        <Loader className="animate-spin text-orange-500 mb-4" size={48} />
        <p className="text-gray-700 font-medium text-lg">Please wait...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white/80">Manage Team</h2>
        <button
          onClick={() => {
            setModalOpen(true);
            setEditingMember(null);
            setForm({ name: "", role: "", image: "", facebook: "", twitter: "" });
            setPreview(null);
          }}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition"
        >
          <PlusCircle size={18} />
          Add Member
        </button>
      </div>

      {/* Team Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {team.map((member) => (
          <motion.div
            key={member._id}
            whileHover={{ scale: 1.02 }}
            className="bg-white/20 p-4 rounded-xl shadow hover:shadow-lg transition"
          >
            <img
              src={member.image || "https://via.placeholder.com/300"}
              alt={member.name}
              className="w-full h-60 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold text-white">{member.name}</h3>
            <p className="text-sm text-white/70 mb-2">{member.role}</p>

            <div className="flex justify-end gap-3 mt-3">
              <button
                onClick={() => handleEdit(member)}
                className="text-orange-400 text-bold hover:text-orange-600"
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={() => handleDelete(member._id)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/70  flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white/80 rounded-xl  shadow-lg p-6 w-full max-w-lg"
          >
            <h3 className="text-xl font-bold text-[#0C226B] mb-4">
              {editingMember ? "Edit Member" : "Add New Member"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name & Role */}
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                required
                className="w-full text-[#0C226B] border rounded-md p-2"
              />
              <input
                type="text"
                name="role"
                value={form.role}
                onChange={handleChange}
                placeholder="Role"
                required
                className="w-full text-[#0C226B] border rounded-md p-2"
              />

              {/* 🔸 New Image Upload Layout */}
             {/* 🔸 Image Upload with Button and Preview */}
<div className="flex flex-col items-center justify-center border-2 border-dashed border-orange-400 rounded-lg p-4 text-center transition hover:bg-orange-50">
  {preview ? (
    <img
      src={preview}
      alt="Preview"
      className="w-32 h-32 object-cover rounded-lg mb-3"
    />
  ) : (
    <Upload className="text-orange-400 mb-2" size={36} />
  )}

  <label
    htmlFor="imageUpload"
    className="flex items-center gap-2 px-3 py-2 bg-orange-500 text-white text-sm rounded-md cursor-pointer hover:bg-orange-600 transition"
  >
    <Upload size={16} />
    {preview ? "Change Image" : "Upload Image"}
  </label>

  <input
    id="imageUpload"
    type="file"
    accept="image/*"
    onChange={handleImageChange}
    className="hidden "
  />
</div>


              {/* Socials */}
              <input
                type="text"
                name="facebook"
                value={form.facebook}
                onChange={handleChange}
                placeholder="Facebook URL"
                className="w-full border text-[#0C226B] rounded-md p-2"
              />
              <input
                type="text"
                name="twitter"
                value={form.twitter}
                onChange={handleChange}
                placeholder="Twitter URL"
                className="w-full text-[#0C226B] border rounded-md p-2"
              />

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md"
                >
                  {editingMember ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
