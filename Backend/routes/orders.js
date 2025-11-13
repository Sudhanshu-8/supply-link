const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
  cancelOrder
} = require("../controllers/orderController");
const { authenticate, authorize } = require("../middleware/auth");

// All routes require authentication
router.use(authenticate);

router.post("/", authorize("vendor", "admin"), createOrder);
router.get("/", getOrders);
router.get("/:id", getOrder);
router.put("/:id/status", authorize("supplier", "admin"), updateOrderStatus);
router.put("/:id/cancel", authorize("vendor", "admin"), cancelOrder);

module.exports = router;



