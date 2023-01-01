const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

// Get all products
router.get("/", async (req, res) => {
  try {
    const projects = await Product.find();

    res.status(200).json(projects);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get products by id
router.get("/:id", async (req, res) => {
  try {
    const project = await Product.findById({ _id: req.params.id });

    res.status(200).json(project);
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

// Add product
router.post("/new-product", async (req, res) => {
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
// Delete product

module.exports = router;
