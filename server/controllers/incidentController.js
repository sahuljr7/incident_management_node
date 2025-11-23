// Importing the Incident model which represents the "Incident" collection in MongoDB
const Incident = require("../models/Incident");

/* 
  ==========================
  CREATE INCIDENT
  ==========================
*/
exports.createIncident = async (req, res) => {
  try {
    /* 
      Creating a new incident document in the database.
      req.body contains all the data sent from the frontend (like title, description, etc.)
    */
    const incident = await Incident.create(req.body);

    // Sending a success response with status 201 (Created)
    res.status(201).json({ success: true, data: incident });
  } catch (error) {
    /* 
      If something goes wrong while creating the incident (like missing fields),
      sending back an error response with a 400 (Bad Request) status.
    */
    res.status(400).json({
      success: false,
      message: "Failed to create incident",
      error: error.message
    });
  }
};

/* 
  ==========================
  GET ALL INCIDENTS
  ==========================
*/
exports.getAllIncidents = async (req, res) => {
  try {
    /* 
      Finding all incidents in the database.
      Sorting them by createdAt in descending order (-1 means newest first).
    */
    const incidents = await Incident.find().sort({ createdAt: -1 });

    // Sending the list of all incidents with a success status
    res.status(200).json({ success: true, data: incidents });
  } catch (error) {
    /* 
      If fetching fails (like database issues),
      sending a 500 (Internal Server Error) response.
    */
    res.status(500).json({
      success: false,
      message: "Failed to fetch incidents",
      error: error.message
    });
  }
};

/* 
  ==========================
  GET ONE INCIDENT BY ID
  ==========================
*/
exports.getIncidentById = async (req, res) => {
  try {
    /* 
      Finding a single incident by its ID, which is taken from the URL parameter (req.params.id).
      Example: /api/incidents/1234 -> "1234" is the ID.
    */
    const incident = await Incident.findById(req.params.id);

    // If no incident found, sending a 404 (Not Found) response
    if (!incident)
      return res.status(404).json({ success: false, message: "Incident not found" });

    // Sending the found incident data as a success response
    res.status(200).json({ success: true, data: incident });
  } catch (error) {
    /* 
      If something goes wrong (like invalid ID format),
      sending a 500 (Internal Server Error) response.
    */
    res.status(500).json({
      success: false,
      message: "Failed to fetch incident",
      error: error.message
    });
  }
};

/* 
  ==========================
  UPDATE INCIDENT
  ==========================
*/
exports.updateIncident = async (req, res) => {
  try {
    /* 
      Finding the incident by ID first before updating.
      If it doesn’t exist, sending a 404 response.
    */
    const incident = await Incident.findById(req.params.id);
    if (!incident)
      return res.status(404).json({ success: false, message: "Incident not found" });

    /* 
      Updating only the fields that are provided in the request body.
      Looping through the keys in req.body and replacing the existing values.
    */
    Object.keys(req.body).forEach(k => (incident[k] = req.body[k]));

    // Updating the "updatedAt" timestamp manually
    incident.updatedAt = Date.now();

    /* 
      Saving the updated incident back into the database 
      and sending the updated data in the response.
    */
    const updated = await incident.save();
    res.status(200).json({ success: true, message: "Incident updated", data: updated });
  } catch (error) {
    /* 
      Handling validation or database errors.
      Sending 400 (Bad Request) with error details.
    */
    res.status(400).json({
      success: false,
      message: "Failed to update incident",
      error: error.message
    });
  }
};

/* 
  ==========================
  CLOSE INCIDENT
  ==========================
*/
exports.closeIncident = async (req, res) => {
  try {
    /* 
      Finding the incident by its ID first.
      If it doesn’t exist, sending a 404 response.
    */
    const incident = await Incident.findById(req.params.id);
    if (!incident)
      return res.status(404).json({ success: false, message: "Incident not found" });

    /* 
      Marking the incident as "closed" and recording its end date.
      If the frontend sends a custom end date, using that; otherwise, using the current date.
    */
    incident.status = "closed";
    incident.incidentEndDate = req.body.incidentEndDate || new Date();
    incident.updatedAt = Date.now();

    /* 
      Saving the updated (closed) incident back to the database
      and sending a confirmation response.
    */
    const updated = await incident.save();
    res.status(200).json({ success: true, message: "Incident closed", data: updated });
  } catch (error) {
    /* 
      If closing fails (due to validation or database issue),
      sending a 400 (Bad Request) response with error details.
    */
    res.status(400).json({
      success: false,
      message: "Failed to close incident",
      error: error.message
    });
  }
};
