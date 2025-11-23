// Importing mongoose, which helps in creating and managing MongoDB schemas and models easily
const mongoose = require("mongoose");

/* 
  Creating a new schema (blueprint) for "Incident".
  A schema defines the structure of the data we want to store in the MongoDB collection.
*/
const incidentSchema = new mongoose.Schema({
  /* 
    'type' represents the kind of incident (e.g., "Network issue", "Power failure", etc.).
    It must always be provided (required: true).
  */
  type: { type: String, required: true },

  /* 
    'incidentStartDate' is the date and time when the incident started.
    This field is required since every incident must have a start time.
  */
  incidentStartDate: { type: Date, required: true },

  /* 
    'incidentEndDate' is optional and stores when the incident ended.
    It can be left empty if the incident is still open.
  */
  incidentEndDate: { type: Date },

  /* 
    'description' provides more details about what the incident is.
    This is required to help understand the issue clearly.
  */
  description: { type: String, required: true },

  /* 
    'remarks' is optional — it can hold additional notes or comments by the user or admin.
  */
  remarks: { type: String },

  /* 
    'status' shows whether the incident is still active or closed.
    - enum means it can only take specific values: "open" or "closed".
    - default means that if no status is provided, it will automatically be set to "open".
  */
  status: {
    type: String,
    enum: ["open", "closed"],
    default: "open"
  },

  /* 
    'createdAt' stores the timestamp of when the incident was created.
    It automatically takes the current date and time using Date.now.
  */
  createdAt: { type: Date, default: Date.now },

  /* 
    'updatedAt' keeps track of the last time the incident was modified.
    Also initialized with the current date when created.
  */
  updatedAt: { type: Date, default: Date.now }
});

/* 
  Exporting the schema as a model named "Incident".
  - The model connects this schema with the "incidents" collection in MongoDB.
  - It allows performing operations like find(), create(), update(), and delete() on that collection.
*/
module.exports = mongoose.model("Incident", incidentSchema);
