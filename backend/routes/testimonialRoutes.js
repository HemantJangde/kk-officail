import express from "express";
import Testimonial from "../models/Testimonial.js";
import upload from "../middleware/multer.js"; // ✅ Your multer setup
import cloudinary from "../config/cloudinary.js"; // ✅ Your cloudinary setup

const router = express.Router();

// ✅ Get all testimonials
router.get("/", async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Add new testimonial with image upload
router.post("/", upload.single("image"), async (req, res) => {
  try {
    let imageUrl = "";

    // If user uploads an image, upload to Cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "testimonials",
      });
      imageUrl = result.secure_url;
    }

    // Create new testimonial with form data
    const testimonial = new Testimonial({
      name: req.body.name,
      role: req.body.role,
      title: req.body.title,
      feedback: req.body.feedback,
      rating: req.body.rating,
      image: imageUrl, // ✅ Store Cloudinary URL
    });

    await testimonial.save();

    res.status(201).json({
      message: "✅ Testimonial added successfully!",
      testimonial,
    });
  } catch (error) {
    res.status(400).json({
      message: "❌ Failed to add testimonial",
      error: error.message,
    });
  }
});
// ✅ Update testimonial
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    let imageUrl = req.body.image;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "testimonials",
      });
      imageUrl = result.secure_url;
    }

    const updated = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { ...req.body, image: imageUrl },
      { new: true }
    );

    res.status(200).json({ message: "✅ Testimonial updated", updated });
  } catch (error) {
    res.status(400).json({ message: "❌ Failed to update testimonial", error: error.message });
  }
});

// ✅ Delete testimonial
router.delete("/:id", async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "✅ Testimonial deleted" });
  } catch (error) {
    res.status(400).json({ message: "❌ Failed to delete testimonial", error: error.message });
  }
});


export default router;
