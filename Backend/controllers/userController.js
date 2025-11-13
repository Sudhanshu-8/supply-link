const User = require("../models/User");

// Get all users (admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const { search, role } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } }
      ];
    }

    if (role) {
      query.role = role;
    }

    const users = await User.find(query)
      .select("-password")
      .sort({ createdAt: -1 });

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user statistics
exports.getUserStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const vendors = await User.countDocuments({ role: "vendor" });
    const suppliers = await User.countDocuments({ role: "supplier" });
    const admins = await User.countDocuments({ role: "admin" });

    res.json({
      totalUsers,
      vendors,
      suppliers,
      admins
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



