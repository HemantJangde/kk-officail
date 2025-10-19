// createAdmin.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Admin from "./models/Admin.js";
import connectDB from "./config/db.js";

dotenv.config();
await connectDB();

const createAdmin = async () => {
  const email = "admin@example.com";
  const password = "Admin@123 "; // plain password


  // const email = "jangdeh77@gmail.com";
  // const password = "new@123 "; // plain password

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const admin = new Admin({ email, password: hashedPassword });
  await admin.save();
  console.log("✅ Admin created:", email);
  process.exit();
};

createAdmin();
