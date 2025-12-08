const mongoose = require("mongoose");

const deviceSchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    type: { type: String, required: true, enum: ["light", "ac", "fan", "sensor", "tv", "door"] },
    room: { type: String, required: true, trim: true },
    status: { type: Boolean, default: false },
    settings: { type: Object, default: {} },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Device", deviceSchema);