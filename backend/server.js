const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Db Config
const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.DB_URL);

    console.log("DB connnected successfully");
  } catch (error) {
    console.log({ message: error.message });
  }
};
 
connectDB();

app.get("/", (req, res) => {
  res.send("hello world");
});

// server initialization
const userRoutes = require("./routes/users");
app.use("/api/user", userRoutes);
 
app.listen("5000", () => {
  console.log("app running on port 5k");
});
