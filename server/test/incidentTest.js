/* 
  Loading environment variables from the .env file.
  This lets us safely use sensitive data like database URLs without hardcoding them.
*/
require("dotenv").config();

// Importing the function that connects our app to the MongoDB database
const connectDB = require("../config/database");

// Importing the Incident model so we can create a sample record in the database
const Incident = require("../models/Incident");

// Calling the function to connect to the MongoDB database
connectDB();

/* 
  Creating an asynchronous function to insert a sample "Incident" document into the database.
  Using async/await because database operations take time (they are asynchronous).
*/
async function createSample() {
  try {
    /* 
      Creating a new incident record using the Incident model.
      Providing sample data for testing database connectivity.
    */
    const inc = await Incident.create({
      type: "Test Incident",                // The type or name of the incident
      incidentStartDate: new Date(),        // Using the current date and time as start date
      description: "Testing DB",            // Short description for testing
      remarks: "OK"                         // Optional remarks
    });

    /* 
      Logging the created incident object to confirm successful creation.
      Then, gracefully exiting the process.
    */
    console.log("Sample Created:", inc);
    process.exit();
  } catch (err) {
    /* 
      If any error occurs during the process (like DB not connected or validation issue),
      logging the error and exiting the process with a failure code (1).
    */
    console.error("Error:", err);
    process.exit(1);
  }
}

// Calling the function to run the sample creation process
createSample();
