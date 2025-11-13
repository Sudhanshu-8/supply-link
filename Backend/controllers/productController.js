const Product = require("../models/Product");

// Get all products (with optional filters)
exports.getAllProducts = async (req, res) => {
  try {
    const { category, search, supplier } = req.query;
    const query = { isActive: true };

    if (category) query.category = category;
    if (supplier) query.supplier = supplier;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    const products = await Product.find(query)
      .populate("supplier", "name email")
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single product
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("supplier", "name email");
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create product (supplier only)
exports.createProduct = async (req, res) => {
  try {
    const product = new Product({
      ...req.body,
      supplier: req.user._id
    });
    await product.save();
    const populated = await Product.findById(product._id).populate("supplier", "name email");
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update product (supplier only)
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (product.supplier.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ error: "Not authorized" });
    }

    Object.assign(product, req.body);
    product.updatedAt = Date.now();
    await product.save();
    const populated = await Product.findById(product._id).populate("supplier", "name email");
    res.json(populated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete product (supplier/admin only)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (product.supplier.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ error: "Not authorized" });
    }

    product.isActive = false;
    await product.save();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Compare prices for a product name
exports.comparePrices = async (req, res) => {
  try {
    const { productName } = req.query;
    if (!productName) {
      return res.status(400).json({ error: "Product name is required" });
    }

    const products = await Product.find({
      name: { $regex: productName, $options: "i" },
      isActive: true
    })
      .populate("supplier", "name email")
      .sort({ price: 1 }); // Sort by price ascending

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get products by supplier
exports.getSupplierProducts = async (req, res) => {
  try {
    const supplierId = req.params.supplierId === "me" || !req.params.supplierId
      ? req.user?._id
      : req.params.supplierId;

    if (!supplierId) {
      return res.status(400).json({ error: "Supplier ID is required" });
    }

    const normalizedId = supplierId.toString();
    const products = await Product.find({ supplier: normalizedId })
      .populate("supplier", "name email role")
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    console.error("getSupplierProducts error:", error);
    res.status(500).json({ error: error.message || "Failed to fetch supplier products" });
  }
};

