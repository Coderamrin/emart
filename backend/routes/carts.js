const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// get all cart
router.get("/", async (req, res) => {
  try {
    const carts = await Cart.find().sort({
      createdAt: -1,
    });

    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get cart by user id
router.get("/find/:id", async (req, res) => {
  try {
    const carts = await Cart.find({ user: req.params.id }).sort({
      createdAt: -1,
    });

    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// add to cart
router.post("/add", protect, async (req, res) => {
  // check if product already exist.
  const product = await Product.findOne({ _id: req.body.productId });

  const { title, images, price } = product;
  const { quantity } = req.body;

  const isCartExist = await Cart.findOne({ productId: req.body.productId });

  if (isCartExist) {
    const updated = await Cart.findOneAndUpdate(
      { productId: req.body.productId },
      { quantity },
      {
        new: true,
      }
    );

    return res.status(200).json(updated);
  }

  try {
    const cart = await Cart.create({
      user: req.user.id,
      productId: req.body.productId,
      productTitle: title,
      productImages: images,
      productPrice: price,
    });

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// update cart
router.put("/update/:id", protect, async (req, res) => {
  const cart = await Cart.findOne({ _id: req.params.id });

  const { quantity } = req.body;

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  try {
    const updated = await Cart.findOneAndUpdate(
      { _id: req.params.id },
      { quantity },
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

    return res.status(200).json({ id: deleted._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
