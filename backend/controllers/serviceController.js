import Service from "../models/Service.js";

// ✅ Get All Services
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json({ services });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Add New Service
export const addService = async (req, res) => {
  try {
    const { title, desc, icon } = req.body;
    const imageUrl = req.file ? req.file.path : "";

    const newService = await Service.create({
      title,
      desc,
      icon,
      image: imageUrl,
    });

    res.status(201).json({ message: "Service added", service: newService });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update Service
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, desc, icon } = req.body;
    const imageUrl = req.file ? req.file.path : undefined;

    const updatedService = await Service.findByIdAndUpdate(
      id,
      {
        title,
        desc,
        icon,
        ...(imageUrl && { image: imageUrl }),
      },
      { new: true }
    );

    res.status(200).json({ message: "Service updated", service: updatedService });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete Service
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    await Service.findByIdAndDelete(id);
    res.status(200).json({ message: "Service deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
