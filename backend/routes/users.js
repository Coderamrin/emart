const express = require("express");
const User = require("../models/User");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { protect } = require("../middleware/authMiddleware");

router.get("/", async (req, res) => {
  res.send("User route");
});

// register users
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill all the field" });
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    const user = await User.create({ name, email, password: hashPassword });

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: genToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please Fill all the fields" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  try {
    if (user && (await bcrypt.compare(password, user.password))) {
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: genToken(user._id),
      });
    } else {
      res.status(404).json({ message: "User name or Email is not valid" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// edit user
router.put("/edit", protect, async (req, res) => {
  try {
    const updated = await User.findOneAndUpdate(
      { _id: req.user._id },
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// generate token
const genToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = router;
