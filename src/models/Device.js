const mongoose = require("mongoose");

const deviceSchema = mongoose.Schema(
  {
    name: { type: String, required: true }, 
    type: { type: String, required: true }, //  "light", "ac"
    room: { type: String, required: true },
    status: { type: String, default: "off" },
    temperature: { type: Number }, // Only for AC devices
    mode: { type: String }, // Only for AC devices
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Device", deviceSchema);