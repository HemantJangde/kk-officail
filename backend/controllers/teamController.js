import Team from "../models/Team.js";

// ✅ GET all team members
export const getTeam = async (req, res) => {
  try {
    const team = await Team.find();
    res.status(200).json({ team });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ ADD team member
export const addTeamMember = async (req, res) => {
  try {
    const { name, role, facebook, twitter } = req.body;
    const imageUrl = req.file ? req.file.path : ""; // ✅ Cloudinary auto returns the image URL

    const member = await Team.create({
      name,
      role,
      facebook,
      twitter,
      image: imageUrl,
    });

    res.status(201).json({ message: "Member added", member });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ UPDATE team member
export const updateTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, facebook, twitter } = req.body;
    const imageUrl = req.file ? req.file.path : undefined;

    const updated = await Team.findByIdAndUpdate(
      id,
      {
        name,
        role,
        facebook,
        twitter,
        ...(imageUrl && { image: imageUrl }),
      },
      { new: true }
    );

    res.status(200).json({ message: "Member updated", updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ DELETE team member
export const deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    await Team.findByIdAndDelete(id);
    res.status(200).json({ message: "Member deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
