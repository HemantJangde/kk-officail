import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, default:'client'},
  image: { type: String },
  facebook: { type: String },
  twitter: { type: String },
});

export default mongoose.model("Team", teamSchema);
