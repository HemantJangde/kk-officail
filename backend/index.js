// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Allow frontend (adjust port if needed)
app.use(
  cors()
);

app.use(express.json());

// ✅ Connect to MongoDB
connectDB();

// ✅ Routes
app.use("/api/admin", adminRoutes);
app.use("/api", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/services", serviceRoutes);

app.use("/api/testimonials", testimonialRoutes);
// ✅ Root route
app.get("/", (req, res) => {
  res.send("🏗️ Construction Site Backend is Live!");
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
