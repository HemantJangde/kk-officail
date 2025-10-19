import express from "express";
import upload from "../middleware/multer.js";
import {
  getAllServices,
  addService,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";

const router = express.Router();

router.get("/", getAllServices);
router.post("/", upload.single("image"), addService);
router.put("/:id", upload.single("image"), updateService);
router.delete("/:id", deleteService);

export default router;
