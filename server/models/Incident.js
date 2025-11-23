const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema({
  type: { type: String, required: true },
  incidentStartDate: { type: Date, required: true },
  incidentEndDate: { type: Date },
  description: { type: String, required: true },
  remarks: { type: String },
  status: {
    type: String,
    enum: ["open", "closed"],
    default: "open"
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Incident", incidentSchema);
