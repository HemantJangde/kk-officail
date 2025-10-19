import React, { useState } from "react";
import axios from "axios";

export default function UploadTest() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [loading, setLoading] = useState(false);
const API_BASE = import.meta.env.VITE_API_BASE_URL || "";
  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // local preview
    }
  };

  // Upload to backend
  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE}/api/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadedUrl(res.data.imageUrl);
    } catch (err) {
      console.error(err);
      alert("Upload failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">🧪 Cloudinary Upload Test</h2>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full mb-4 border border-gray-300 p-2 rounded-lg"
        />

        {preview && (
          <div className="mb-4">
            <p className="text-gray-600 mb-2">Preview:</p>
            <img
              src={preview}
              alt="preview"
              className="w-48 h-48 object-cover rounded-lg mx-auto border"
            />
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload Image"}
        </button>

        {uploadedUrl && (
          <div className="mt-6">
            <p className="font-semibold text-green-700">✅ Uploaded Successfully!</p>
            <a
              href={uploadedUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline break-all"
            >
              {uploadedUrl}
            </a>
            <div className="mt-3">
              <img
                src={uploadedUrl}
                alt="uploaded"
                className="w-48 h-48 object-cover rounded-lg mx-auto border"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
