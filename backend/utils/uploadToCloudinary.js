// utils/uploadToCloudinary.js
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

export const uploadToCloudinary = async (filePath, folderName = "uploads") => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folderName,
      resource_type: "image",
    });

    // Remove local file after upload
    fs.unlinkSync(filePath);
    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    throw new Error("Image upload failed");
  }
};
