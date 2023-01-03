const express = require("express");
const Cart = require("../models/Cart");

const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// get all cart
router.get("/", async (req, res) => {
  try {
    const carts = await Cart.find();

    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get cart by user id

// add to cart
router.post("/add", protect, async (req, res) => {
  // check if product already exist.

  const isCartExist = await Cart.findOne({ productId: req.body.productId });

  if (isCartExist) {
    const updated = await Cart.findOneAndUpdate(
      { productId: req.body.productId },
      req.body,
      {
        new: true,
      }
    );

    return res.status(200).json(updated);
  }

  try {
    const cart = await Cart.create({
      user: req.user.id,
      ...req.body,
    });

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// update cart
router.put("/update/:id", protect, async (req, res) => {
  const cart = await Cart.findOne({ _id: req.params.id });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  try {
    const updated = await Cart.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );

    return res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete cart
router.delete("/delete/:id", protect, async (req, res) => {
  const cart = await Cart.findOne({ _id: req.params.id });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  try {
    const deleted = await Cart.findOneAndDelete({ _id: req.params.id });

    return res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
