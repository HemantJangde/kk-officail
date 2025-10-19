import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Loader2, Upload } from "lucide-react";
import StarRatingInput from "./StarRatingInput";

export default function ReviewForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    role: "Happy client",
    title: "",
    feedback: "",
    rating: 5,
    image: null, // file upload
  });
  const [loading, setLoading] = useState(false);

  // ✅ Handle text input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle file upload
  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  // ✅ Handle star rating change
  const handleRatingChange = (e) => {
    setFormData((prev) => ({ ...prev, rating: e.target.value }));
  };

  // ✅ Handle form submit
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

      await axios.post(`/api/testimonials`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.error("Error submitting review:", error);
      setLoading(false);
    }
  };

  // ✅ Loading screen
  if (loading) {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-[#0C226B] text-white">
        <Loader2 className="w-10 h-10 mb-4 animate-spin text-orange-500" />
        <p className="text-lg font-medium">Submitting your review...</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen mt-20 flex items-center justify-center bg-[#0C226B] text-white px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-[#122C7E] p-8 rounded-2xl shadow-lg w-full max-w-lg space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-orange-500">
         Review
        </h2>

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-md bg-[#0C226B] text-white placeholder-gray-300 outline-none"
        />

        {/* Role */}
        {/* <input
          type="text"
          name="role"
          placeholder="Your Role (e.g., Client, Partner)"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-3 rounded-md bg-[#0C226B] text-white placeholder-gray-300 outline-none"
        /> */}

        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Review Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-md bg-[#0C226B] text-white placeholder-gray-300 outline-none"
        />

        {/* Feedback */}
        <textarea
          name="feedback"
          placeholder="Your Feedback"
          rows="4"
          value={formData.feedback}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-md bg-[#0C226B] text-white placeholder-gray-300 outline-none resize-none"
        ></textarea>

        {/* File Upload */}
        <div className="flex items-center justify-between gap-3 bg-[#0C226B] rounded-md p-3">
          <label
            htmlFor="image"
            className="flex items-center gap-2 cursor-pointer text-sm text-gray-300 hover:text-orange-400 transition"
          >
            <Upload className="w-4 h-4" />
            Upload Profile Image
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          {formData.image && (
            <span className="text-xs text-gray-300 truncate w-32 text-right">
              {formData.image.name}
            </span>
          )}
        </div>

        {/* Star Rating */}
        <div className="flex flex-col items-center">
          <StarRatingInput
            value={formData.rating}
            onChange={handleRatingChange}
          />
          <p className="text-sm mt-1 text-gray-300">{formData.rating} / 5</p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-md transition-all duration-300"
        >
          Submit Review
        </button>
      </form>
    </section>
  );
}
