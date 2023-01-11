const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

// Get all products
router.get("/", async (req, res) => {

  try {
    const projects = await Product.find().sort({
      createdAt: -1,
    });

    res.status(200).json(projects);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get product of current user
router.get("/my-products", protect, async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get products by id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById({ _id: req.params.id });

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add product
router.post("/new-product", protect, async (req, res) => {
  const { title, price, description, category, images } = req.body;

  if (!title || !price || !description || !category) {
    return res
      .status(500)
      .json({ message: "Please provide all the required fields" });
  }

  if (!req.user) {
    return res
      .status(400)
      .json({ message: "Please login before adding product" });
  }

  try {
    const product = await Product.create({
      seller: req.user.id,
      title,
      price,
      description,
      category,
      images,
    });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update product
// Add product
router.put("/update-product/:id", protect, async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({ message: "Product not found." });
  }

  if (!req.user) {
    return res
      .status(400)
      .json({ message: "Please login before updating product" });
  }

  if (product.seller.toString() !== req.user.id) {
    return res.status(400).json({ message: "Seller not authorized" });
  }

  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete product
router.delete("/delete-product/:id", protect, async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({ message: "Product not found." });
  }

  if (!req.user) {
    return res
      .status(400)
      .json({ message: "Please login before updating product" });
  }

  if (product.seller.toString() !== req.user.id) {
    return res.status(400).json({ message: "Seller not authorized" });
  }

  try {
    const deleted = await Product.findByIdAndDelete(id);
    res.status(200).json({ id: deleted._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
