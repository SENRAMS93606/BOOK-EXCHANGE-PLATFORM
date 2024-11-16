const mongoose = require("mongoose");

const exchangeRequestSchema = new mongoose.Schema({
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  bookOffered: {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: String,
    condition: String,
    status: { type: String, default: "Available" },
  },
  bookRequested: {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: String,
    condition: String,
  },
  deliveryMethod: { type: String, required: true },
  exchangeDuration: { type: Number, required: true },
  location: String,
  message: String,
  status: { type: String, default: "Pending" },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ExchangeRequest", exchangeRequestSchema);
