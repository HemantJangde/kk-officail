import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import Gallery from "../models/Gallery.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Upload Image
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "gallery",
    });

    const newImage = await Gallery.create({
      imageUrl: result.secure_url,
      publicId: result.public_id,
      title: req.body.title || "",
    });

    res.status(201).json(newImage);
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error });
  }
});

// Fetch All Images
router.get("/", async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: "Error fetching images", error });
  }
});

// Delete Image
router.delete("/:id", async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) return res.status(404).json({ message: "Image not found" });

    await cloudinary.uploader.destroy(image.publicId);
    await image.deleteOne();

    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting image", error });
  }
});

export default router;
