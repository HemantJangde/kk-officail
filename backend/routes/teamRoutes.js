import express from "express";
import upload from "../middleware/multer.js";
import {
  getTeam,
  addTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from "../controllers/teamController.js";

const router = express.Router();

router.get("/", getTeam);
router.post("/", upload.single("image"), addTeamMember);
router.put("/:id", upload.single("image"), updateTeamMember);
router.delete("/:id", deleteTeamMember);

export default router;
