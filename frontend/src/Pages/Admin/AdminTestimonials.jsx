import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Edit3, PlusCircle, Loader2 } from "lucide-react";
import StarRatingInput from "../StarRatingInput";


export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    title: "",
    feedback: "",
    rating: 5,
    image: null,
  });
  const [editingId, setEditingId] = useState(null);

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get(`/api/testimonials`);
      setTestimonials(res.data);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleRatingChange = (e) => {
    setFormData((prev) => ({ ...prev, rating: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("role", formData.role);
      data.append("title", formData.title);
      data.append("feedback", formData.feedback);
      data.append("rating", formData.rating);
      if (formData.image) data.append("image", formData.image);

      if (editingId) {
        await axios.put(`/api/testimonials/${editingId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post(`/api/testimonials`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setFormData({
        name: "",
        role: "",
        title: "",
        feedback: "",
        rating: 5,
        image: null,
      });
      setEditingId(null);
      fetchTestimonials();
    } catch (error) {
      console.error("Error saving testimonial:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (t) => {
    setEditingId(t._id);
    setFormData({
      name: t.name,
      role: t.role,
      title: t.title,
      feedback: t.feedback,
      rating: t.rating,
      image: null,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      await axios.delete(`/api/testimonials/${id}`);
      fetchTestimonials();
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    }
  };

  return (
    <section className="min-h-screen bg-[#0C226B]/10/10 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-orange-500">
     Testimonials
        </h2>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#122C7E]/20 p-6 rounded-2xl shadow-lg space-y-4"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Client Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="p-3 rounded-md bg-[#0C226B]/10 text-white placeholder-gray-300 outline-none"
            />
            <input
              type="text"
              name="role"
              placeholder="Client Role"
              value={formData.role}
              onChange={handleChange}
              className="p-3 rounded-md bg-[#0C226B]/10 text-white placeholder-gray-300 outline-none"
            />
            <input
              type="text"
              name="title"
              placeholder="Review Title"
              value={formData.title}
              onChange={handleChange}
              required
              className="p-3 rounded-md bg-[#0C226B]/10 text-white placeholder-gray-300 outline-none"
            />
            <div>
              <label className="text-sm text-gray-300">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm mt-2 bg-[#0C226B]/10 p-2 rounded-md"
              />
            </div>
          </div>

          <textarea
            name="feedback"
            placeholder="Feedback"
            rows="3"
            value={formData.feedback}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-md bg-[#0C226B]/10 text-white placeholder-gray-300 outline-none resize-none"
          ></textarea>

          <div className="flex flex-col items-center">
            <StarRatingInput
              value={formData.rating}
              onChange={handleRatingChange}
            />
            <p className="text-sm mt-1 text-gray-300">{formData.rating} / 5</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-md transition-all duration-300 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Saving...
              </>
            ) : editingId ? (
              <>
                <Edit3 className="w-5 h-5" /> Update Review
              </>
            ) : (
              <>
                <PlusCircle className="w-5 h-5" /> Add Review
              </>
            )}
          </button>
        </form>

        {/* Testimonials List */}
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t._id}
              className="bg-[#122C7E]/50 p-5 rounded-xl shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{t.name}</h3>
                    <p className="text-sm text-gray-300">{t.role}</p>
                  </div>
                </div>
                <h4 className="font-semibold text-orange-400 mb-2">
                  {t.title}
                </h4>
                <p className="text-gray-300 text-sm">{t.feedback}</p>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => handleEdit(t)}
                  className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-md"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(t._id)}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
