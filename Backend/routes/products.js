const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  comparePrices,
  getSupplierProducts
} = require("../controllers/productController");
const { authenticate, authorize } = require("../middleware/auth");

// Public routes
router.get("/", getAllProducts);
router.get("/compare", comparePrices);
// These routes must come before /:id to avoid route conflicts
router.get("/supplier", authenticate, getSupplierProducts); // Get current supplier's products
router.get("/supplier/:supplierId", getSupplierProducts);
router.get("/:id", getProduct);

// Protected routes
router.post("/", authenticate, authorize("supplier", "admin"), createProduct);
router.put("/:id", authenticate, authorize("supplier", "admin"), updateProduct);
router.delete("/:id", authenticate, authorize("supplier", "admin"), deleteProduct);

module.exports = router;

