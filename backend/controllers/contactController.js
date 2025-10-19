import Contact from "../models/Contact.js";
import { sendAdminNotification } from "../utils/emailService.js";

export const submitContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "All required fields must be filled." });
    }

    // Save in MongoDB
    const contact = await Contact.create({ name, email, phone, message });

    // Send email notification to admin
    await sendAdminNotification(contact);

    res.status(201).json({
      success: true,
      message: "Form submitted successfully. Admin will be notified via email.",
      data: contact,
    });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({ success: false, message: "Failed to submit contact form." });
  }
};



// 📬 Get all contact submissions (Admin)
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, data: contacts });
  } catch (err) {
    console.error("Fetch contacts error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch contacts." });
  }
};

// 🗑️ Delete a contact submission (Admin)
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: "Contact not found." });
    }
    res.json({ success: true, message: "Deleted successfully." });
  } catch (err) {
    console.error("Delete contact error:", err);
    res.status(500).json({ success: false, message: "Failed to delete contact." });
  }
};