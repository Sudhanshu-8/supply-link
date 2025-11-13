const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: "" },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  unit: { type: String, default: "piece" }, // piece, kg, liter, etc.
  stock: { type: Number, default: 0 },
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  images: [{ type: String }],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Product", productSchema);



