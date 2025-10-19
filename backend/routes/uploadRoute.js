import express from "express";
import upload from "../config/multer.js";

const router = express.Router();

// 🧪 Test single image upload
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const imageUrl = req.file.path;
    res.status(200).json({
      success: true,
      message: "✅ Image uploaded successfully!",
      imageUrl,
    });
  } catch (error) {
    console.error("❌ Upload error:", error);
    res.status(500).json({
      success: false,
      message: "Upload failed!",
      error: error.message,
    });
  }
});

export default router;
