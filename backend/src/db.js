const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from .env file

const uri = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the application if unable to connect
  }
};

module.exports = connectDB; // Export the connectDB function
