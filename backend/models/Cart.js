const mongoose = require("mongoose");

const cartSchema = {
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  products: {
    type: Array,
    required: true,
  },
};

module.exports = mongoose.model("Cart", cartSchema);
