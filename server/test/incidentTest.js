require("dotenv").config();
const connectDB = require("../config/database");
const Incident = require("../models/Incident");

connectDB();

async function createSample() {
  try {
    const inc = await Incident.create({
      type: "Test Incident",
      incidentStartDate: new Date(),
      description: "Testing DB",
      remarks: "OK"
    });

    console.log("Sample Created:", inc);
    process.exit();
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

createSample();
