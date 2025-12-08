const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.routes");
const deviceRoutes = require("./device.routes");
const logRoutes = require("./log.routes");

router.use("/auth", authRoutes);
router.use("/devices", deviceRoutes);
router.use("/logs", logRoutes);

module.exports = router;