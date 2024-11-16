const express = require("express");
const ExchangeRequest = require("../models/ExchangeRequest");
const router = express.Router();

// Create a new exchange request
router.post("/", async (req, res) => {
  try {
    const newRequest = new ExchangeRequest(req.body);
    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all exchange requests
router.get("/", async (req, res) => {
  try {
    const requests = await ExchangeRequest.find();
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
