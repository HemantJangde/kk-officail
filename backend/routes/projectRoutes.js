import express from "express";
import {
  getAllProjects,
  addProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import upload from "../middleware/multer.js"; // ✅ import multer

const router = express.Router();

router.get("/", getAllProjects);

// ✅ attach the upload middleware
router.post("/", upload.single("image"), addProject);
router.put("/:id", upload.single("image"), updateProject);

router.delete("/:id", deleteProject);

export default router;
