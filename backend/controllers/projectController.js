// backend/controllers/projectController.js
import Project from "../models/Project.js";
import cloudinary from "../config/cloudinary.js";

// ✅ Get all projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, projects });
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Add new project
export const addProject = async (req, res) => {
  try {
    const { title, desc, location, area, duration, year, type } = req.body;

    let imageUrl = "";
    if (req.file) {
      imageUrl = req.file.path; // ✅ multer-storage-cloudinary gives secure URL in .path
    }

    const project = await Project.create({
      title,
      desc,
      location,
      area,
      duration,
      year,
      type,
      image: imageUrl,
    });

    res.status(201).json({ success: true, project });
  } catch (err) {
    console.error("Error adding project:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Update project
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = req.file.path; // ✅ new Cloudinary URL
    }

    const updated = await Project.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json({ success: true, project: updated });
  } catch (err) {
    console.error("Error updating project:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Delete project
export const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Project deleted" });
  } catch (err) {
    console.error("Error deleting project:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
