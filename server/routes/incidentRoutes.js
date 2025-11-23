// Importing express, a Node.js framework used to create web servers and APIs easily
const express = require("express");

// Creating a new router object using express.Router()
// This helps in organizing routes in separate files instead of one big server file
const router = express.Router();

// Importing the middleware that validates incident data before creating or updating it
const validateIncident = require("../middleware/validateIncident");

/* 
  Importing all the controller functions that handle 
  the main logic for each route (create, read, update, close).
  These functions are defined in the "incidentController" file.
*/
const {
  createIncident,
  getAllIncidents,
  getIncidentById,
  updateIncident,
  closeIncident
} = require("../controllers/incidentController");

/* 
  ==========================
  CREATE INCIDENT ROUTE
  ==========================
*/
/* 
  POST request to "/"
  - Runs the 'validateIncident' middleware first to check input data.
  - Then calls 'createIncident' controller to add a new incident to the database.
*/
router.post("/", validateIncident, createIncident);

/* 
  ==========================
  READ INCIDENT ROUTES
  ==========================
*/
/* 
  GET request to "/"
  - Calls 'getAllIncidents' controller to fetch all incidents from the database.
*/
router.get("/", getAllIncidents);

/* 
  GET request to "/:id"
  - ':id' is a route parameter (dynamic value like /12345).
  - Calls 'getIncidentById' controller to fetch one specific incident using its ID.
*/
router.get("/:id", getIncidentById);

/* 
  ==========================
  UPDATE INCIDENT ROUTES
  ==========================
*/
/* 
  PUT request to "/:id"
  - Used when updating all or most of an incident’s data.
  - Runs 'validateIncident' middleware first to ensure input validity.
  - Then calls 'updateIncident' controller to update the record.
*/
router.put("/:id", validateIncident, updateIncident);

/* 
  PATCH request to "/:id"
  - Used when updating only a few fields of an incident (partial update).
  - Works the same way as PUT but allows smaller changes.
*/
router.patch("/:id", validateIncident, updateIncident);

/* 
  ==========================
  CLOSE INCIDENT ROUTE
  ==========================
*/
/* 
  PATCH request to "/:id/close"
  - Used to mark an incident as "closed".
  - Calls 'closeIncident' controller to update its status and end date.
*/
router.patch("/:id/close", closeIncident);

/* 
  Exporting the router so it can be imported in the main server file (app.js or server.js)
  and used as part of the API routes.
*/
module.exports = router;
