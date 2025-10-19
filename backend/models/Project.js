// backend/models/Project.js
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: String,
    desc: String,
    location: String,
    area: String,
    duration: String,
    year: String,
    type: String,
    image: String,
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
