import express from "express";
import {
  submitContact,
  getAllContacts,
  deleteContact,
} from "../controllers/contactController.js";

const router = express.Router();

// 🧾 Public route (used by frontend Contact page)
router.post("/contact", submitContact);

// 🧩 Admin routes (used inside dashboard)
router.get("/all", getAllContacts);      // View all submitted contacts
router.delete("/:id", deleteContact);    // Delete a specific contact

router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json({ success: true, contacts });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch contacts" });
  }
});

export default router;
