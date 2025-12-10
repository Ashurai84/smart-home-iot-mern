const express = require("express");
const Device = require("../models/Device");
const Log = require("../models/Log");
const auth = require("../middleware/auth");

const router = express.Router();

// GET /api/devices - All devices
router.get("/", auth, async (req, res) => {
  try {
    console.log("GET /api/devices - User:", req.userId);
    
    const devices = await Device.find({ user: req.userId });
    console.log("Devices found:", devices.length);
    res.send({ success: true, devices });
  } catch (err) {
    console.log("GET /api/devices ERROR:", err.message);
    res.status(500).send({ success: false, message: "Server error" });
  }
});

// POST /api/devices - Create device
router.post("/", auth, async (req, res) => {
  try {
    console.log("POST /api/devices - Name:", req.body.name);
    
    const device = { ...req.body, user: req.userId };
    
    // Add temperature and mode only for AC devices
    if (device.type === "ac") {
      device.temperature = device.temperature || 24;
      device.mode = device.mode || "cool";
    }
    
    const newDevice = await Device.create(device);

    console.log("Device created:", newDevice.name);
    res.status(201).send({ success: true, message: "Device created", device: newDevice });
  } catch (err) {
    console.log("POST /api/devices ERROR:", err.message);
    res.status(500).send({ success: false, message: "Server error" });
  }
});

// PATCH /api/devices/:id/toggle
router.patch("/:id/toggle", auth, async (req, res) => {
  try {
    console.log("PATCH /api/devices/:id/toggle - ID:", req.params.id);
    
    const device = await Device.findOne({ _id: req.params.id, user: req.userId });

    if (!device) {
      console.log("Device not found:", req.params.id);
      return res.status(404).send({ success: false, message: "Device not found" });
    }

    device.status = device.status === "on" ? "off" : "on";
    await device.save();

    await Log.create({
      user: req.userId,
      device: device._id,
      action: device.status === "on" ? "TURN_ON" : "TURN_OFF",
    });

    console.log("Device toggled:", device.name, "Status:", device.status);
    res.send({ success: true, device });
  } catch (err) {
    console.log("TOGGLE ERROR:", err.message);
    res.status(500).send({ success: false, message: "Server error" });
  }
});

// PATCH /api/devices/:id/ac-settings - Update AC temperature and mode
router.patch("/:id/ac-settings", auth, async (req, res) => {
  try {
    console.log("PATCH /api/devices/:id/ac-settings - ID:", req.params.id);
    
    const device = await Device.findOne({ _id: req.params.id, user: req.userId });

    if (!device) {
      console.log("Device not found:", req.params.id);
      return res.status(404).send({ success: false, message: "Device not found" });
    }

    if (device.type !== "ac") {
      console.log("Not an AC device:", device.type);
      return res.status(400).send({ success: false, message: "This is not an AC device" });
    }

    if (device.status === "off") {
      console.log("AC is OFF, cannot change settings");
      return res.status(400).send({ success: false, message: "Turn on the AC first to change settings" });
    }

    const { temperature, mode } = req.body;

    if (temperature) device.temperature = temperature;
    if (mode) device.mode = mode;

    await device.save();

    await Log.create({
      user: req.userId,
      device: device._id,
      action: "AC_SETTINGS_CHANGED",
      details: { temperature, mode },
    });

    console.log("AC settings updated:", device.name, "Temp:", temperature, "Mode:", mode);
    res.send({ success: true, device });
  } catch (err) {
    console.log("AC SETTINGS ERROR:", err.message);
    res.status(500).send({ success: false, message: "Server error" });
  }
});

// DELETE /api/devices/:id
router.delete("/:id", auth, async (req, res) => {
  try {
    console.log("DELETE /api/devices/:id - ID:", req.params.id);
    
    const deleted = await Device.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });

    if (!deleted) {
      console.log("Device not found:", req.params.id);
      return res.status(404).send({ success: false, message: "Device not found" });
    }

    console.log("Device deleted:", deleted.name);
    res.send({ success: true, message: "Device deleted" });
  } catch (err) {
    console.log("DELETE ERROR:", err.message);
    res.status(500).send({ success: false, message: "Server error" });
  }
});

module.exports = router;
 