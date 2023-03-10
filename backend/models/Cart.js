const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    productTitle: {
      type: String,
      required: true,
      ref: "Product",
    },
    productImages: {
      type: Array,
      required: true,
      ref: "Product",
    },
    productPrice: {
      type: Number,
      required: true,
      ref: "Product",
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
