const mongoose = require("mongoose");

const logSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    device: { type: mongoose.Schema.Types.ObjectId, ref: "Device", required: true },
    action: { type: String, required: true },
    details: { type: Object, default: {} },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Log", logSchema);