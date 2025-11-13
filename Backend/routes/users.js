const express = require("express");
const router = express.Router();
const { getAllUsers, getUserStats } = require("../controllers/userController");
const { authenticate, authorize } = require("../middleware/auth");

// All routes require authentication and admin role
router.use(authenticate);
router.use(authorize("admin"));

router.get("/", getAllUsers);
router.get("/stats", getUserStats);

module.exports = router;



