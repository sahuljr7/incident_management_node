const Incident = require("../models/Incident");

// CREATE
exports.createIncident = async (req, res) => {
  try {
    const incident = await Incident.create(req.body);
    res.status(201).json({ success: true, data: incident });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create incident",
      error: error.message
    });
  }
};

// GET ALL
exports.getAllIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: incidents });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch incidents",
      error: error.message
    });
  }
};

// GET ONE
exports.getIncidentById = async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident)
      return res.status(404).json({ success: false, message: "Incident not found" });

    res.status(200).json({ success: true, data: incident });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch incident",
      error: error.message
    });
  }
};

// UPDATE
exports.updateIncident = async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident)
      return res.status(404).json({ success: false, message: "Incident not found" });

    Object.keys(req.body).forEach(k => (incident[k] = req.body[k]));
    incident.updatedAt = Date.now();

    const updated = await incident.save();
    res.status(200).json({ success: true, message: "Incident updated", data: updated });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update incident",
      error: error.message
    });
  }
};

// CLOSE INCIDENT
exports.closeIncident = async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident)
      return res.status(404).json({ success: false, message: "Incident not found" });

    incident.status = "closed";
    incident.incidentEndDate = req.body.incidentEndDate || new Date();
    incident.updatedAt = Date.now();

    const updated = await incident.save();
    res.status(200).json({ success: true, message: "Incident closed", data: updated });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to close incident",
      error: error.message
    });
  }
};
