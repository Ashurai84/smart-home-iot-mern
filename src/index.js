const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Environment Variables
const PORT = process.env.PORT || 5001;
const DB_URL = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;

// MongoDB Connection
mongoose
  .connect(DB_URL + DB_NAME)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err.message));




  // Health Check  for api 
app.get("/api/health", (req, res) => {
  res.json({ message: "Smart Home API is running" });
});








//////////==================//////////////////////////

// Routes
const routes = require("./routes");
app.use("/api", routes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});
// Error Handler
app.use((err, req, res, next) => {
  res.status(500).json({ success: false, message: err.message });
});
// Start Server
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});