const express = require("express");
const router = express.Router();

const User = require("../models/User");

// GET all users
router.get("/", async (req, res) => {
try {
const users = await User.find();
res.json(users);
} catch (error) {
res.status(500).json({ message: error.message });
}
});

// CREATE user
router.post("/", async (req, res) => {
try {
const { name, email, technology } = req.body;


const newUser = new User({
  name,
  email,
  technology,
});

const savedUser = await newUser.save();

res.status(201).json(savedUser);


} catch (error) {
console.log("POST ERROR:", error);
res.status(500).json({ message: error.message });
}
});

module.exports = router;
