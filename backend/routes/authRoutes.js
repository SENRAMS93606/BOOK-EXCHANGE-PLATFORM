const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../src/models/User");
const router = express.Router();
require("dotenv").config(); // Load environment variables from .env file
const nodemailer = require("nodemailer");
const crypto = require("crypto");

// Request password reset
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = await bcrypt.hash(resetToken, 10);
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Display the reset token to the user
    res
      .status(200)
      .json({ message: "Password reset token generated", resetToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Reset password
router.post("/reset-password", async (req, res) => {
  try {
    const { token, password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: { $exists: true },
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const isMatch = await bcrypt.compare(token, user.resetPasswordToken);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Hash the new password and save it
    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Register a new user
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password and security answer
    const hashedPassword = await bcrypt.hash(password, 10);
    // const hashedSecurityAnswer = await bcrypt.hash(securityAnswer, 10);

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: savedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login a user
router.post("/login", async (req, res) => {
  console.log("Login route called"); // Debugging statement
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    req.session.user = user;
    console.log("Session after login:", req.session); // Debugging statement
    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Fetch user from session
router.get("/me", (req, res) => {
  if (req.session.user) {
    res.status(200).json({ user: req.session.user });
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

module.exports = router;
