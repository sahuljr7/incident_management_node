const express = require("express");
const router = express.Router();
const validateIncident = require("../middleware/validateIncident");

const {
  createIncident,
  getAllIncidents,
  getIncidentById,
  updateIncident,
  closeIncident
} = require("../controllers/incidentController");

// CREATE
router.post("/", validateIncident, createIncident);

// READ
router.get("/", getAllIncidents);
router.get("/:id", getIncidentById);

// UPDATE
router.put("/:id", validateIncident, updateIncident);
router.patch("/:id", validateIncident, updateIncident);

// CLOSE
router.patch("/:id/close", closeIncident);

module.exports = router;
