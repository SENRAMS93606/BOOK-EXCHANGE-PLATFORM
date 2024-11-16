const express = require("express");
const cors = require("cors");
const MongoStore = require("connect-mongo");
const connectDB = require("./db"); // Import the connection function
const authRoutes = require("../routes/authRoutes");
const bookRoutes = require("../routes/bookRoutes");
const session = require("express-session");
const crypto = require("crypto");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

// Generate a random secret key
const secretKey = crypto.randomBytes(32).toString("hex");

// Connect to MongoDB
connectDB();
app.use(bodyParser.json());
// Middleware
app.use(
  cors({
    origin: "http://127.0.0.1:5173", // Allow specific origin
    credentials: true, // Allow credentials
  })
);
// app.use(express.json()); // Parse JSON request bodies

// Set up session middleware
app.use(
  session({
    secret: secretKey, // Use the generated secret key
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI, // Use the MongoDB URI from the environment variable
    }),
    cookie: {
      secure: false, // Set to true if using HTTPS
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

// Sample route for testing
app.get("/", (req, res) => {
  res.send("Welcome to the Book Exchange API!");
});
const PORT = process.env.PORT || 4000;
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
