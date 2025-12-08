const express = require("express");
const Log = require("../models/Log");
const auth = require("../middleware/auth");

const router = express.Router();

// GET /api/logs - Get all logs for user
router.get("/", auth, async (req, res) => {
  try {
    console.log("GET /api/logs - User:", req.userId);
    
    let logs = await Log.find({ user: req.userId })
      .populate("device", "name type")
      .sort({ createdAt: -1 });
    
    console.log("Logs found:", logs.length);
    res.send({ success: true, logs });
  } catch (err) {
    console.log("GET /api/logs ERROR:", err.message);
    res.status(500).send({ success: false, message: "Server error" });
  }
});

// GET /api/logs/:deviceId - Get logs for specific device
router.get("/:deviceId", auth, async (req, res) => {
  try {
    console.log("GET /api/logs/:deviceId - Device:", req.params.deviceId);
    
    let logs = await Log.find({ 
      user: req.userId, 
      device: req.params.deviceId 
    }).sort({ createdAt: -1 });
    
    console.log("Logs found:", logs.length);
    res.send({ success: true, logs });
  } catch (err) {
    console.log("GET /api/logs/:deviceId ERROR:", err.message);
    res.status(500).send({ success: false, message: "Server error" });
  }
});

module.exports = router;