const mongoose = require("mongoose");

const deviceSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    room: { type: String, required: true },
    status: { type: Boolean, default: false },
    temperature: { type: Number, default: 24 }, // For AC devices
    mode: { type: String, default: "cool" }, // For AC devices
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Device", deviceSchema);