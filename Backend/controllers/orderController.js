const Order = require("../models/Order");
const Product = require("../models/Product");

// Create order (vendor only)
exports.createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, notes } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "Order items are required" });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product || !product.isActive) {
        return res.status(400).json({ error: `Product ${item.productId} not found` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ error: `Insufficient stock for ${product.name}` });
      }

      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
        supplier: product.supplier
      });

      // Update product stock
      product.stock -= item.quantity;
      await product.save();
    }

    const order = new Order({
      vendor: req.user._id,
      items: orderItems,
      totalAmount,
      shippingAddress: shippingAddress || {},
      notes,
      status: "pending"
    });

    await order.save();
    const populated = await Order.findById(order._id)
      .populate("vendor", "name email")
      .populate("items.product", "name description")
      .populate("items.supplier", "name email");

    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all orders (vendor sees their orders, supplier sees orders for their products)
exports.getOrders = async (req, res) => {
  try {
    let query = {};

    if (req.user.role === "vendor") {
      query.vendor = req.user._id;
    } else if (req.user.role === "supplier") {
      query["items.supplier"] = req.user._id;
    }
    // Admin sees all orders

    const orders = await Order.find(query)
      .populate("vendor", "name email")
      .populate("items.product", "name description")
      .populate("items.supplier", "name email")
      .sort({ orderDate: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single order
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("vendor", "name email")
      .populate("items.product", "name description images")
      .populate("items.supplier", "name email");

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Check authorization
    if (
      req.user.role !== "admin" &&
      order.vendor._id.toString() !== req.user._id.toString() &&
      !order.items.some(item => item.supplier._id.toString() === req.user._id.toString())
    ) {
      return res.status(403).json({ error: "Not authorized" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update order status (supplier/admin)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Check authorization
    if (req.user.role !== "admin") {
      const isSupplier = order.items.some(item => item.supplier.toString() === req.user._id.toString());
      if (!isSupplier) {
        return res.status(403).json({ error: "Not authorized" });
      }
    }

    order.status = status;
    if (status === "delivered") {
      order.deliveryDate = Date.now();
    }
    await order.save();

    const populated = await Order.findById(order._id)
      .populate("vendor", "name email")
      .populate("items.product", "name description")
      .populate("items.supplier", "name email");

    res.json(populated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cancel order (vendor only)
exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (order.vendor.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ error: "Not authorized" });
    }

    if (["delivered", "cancelled"].includes(order.status)) {
      return res.status(400).json({ error: "Cannot cancel this order" });
    }

    // Restore stock
    for (const item of order.items) {
      const product = await Product.findById(item.product);
      if (product) {
        product.stock += item.quantity;
        await product.save();
      }
    }

    order.status = "cancelled";
    await order.save();

    res.json({ message: "Order cancelled successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



