/* 
  Importing the required dependencies for our server:
  - express: to create and manage the web server and routes
  - cors: to allow requests from different origins (like frontend apps)
  - body-parser: to parse incoming JSON request bodies
  - dotenv: to load environment variables from the .env file
*/
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/database");

/* 
  Loading environment variables from the .env file
  (like PORT and MONGO_URI) into process.env.
*/
dotenv.config();

/* 
  Connecting to the MongoDB database.
  This must happen before starting the server so that 
  the API can interact with the database properly.
*/
connectDB();

/* 
  Creating an instance of the Express application.
  'app' will be used to define routes and middleware.
*/
const app = express();

/* 
  Using CORS middleware to enable Cross-Origin Resource Sharing.
  This allows frontend applications (like React or Angular) hosted 
  on different domains or ports to communicate with this API.
*/
app.use(cors());

/* 
  Using bodyParser to parse incoming request bodies as JSON.
  This means we can access request data using req.body easily.
*/
app.use(bodyParser.json());

/* 
  ==========================
  ROUTES
  ==========================
*/
/* 
  Mounting the incident-related routes under the "/api/incidents" path.
  This means all routes in 'incidentRoutes.js' will start with /api/incidents.
*/
app.use("/api/incidents", require("./routes/incidentRoutes"));

/* 
  Defining a simple GET route for the root URL ("/").
  This route just responds with a message to confirm the API is running.
*/
app.get("/", (req, res) => {
  res.send("Incident Management API");
});

/* 
  Starting the server and making it listen on a port.
  - process.env.PORT is used if provided in the .env file
  - otherwise, it defaults to port 3000
  Once started, it logs a confirmation message in the console.
*/
app.listen(process.env.PORT || 3000, () =>
  console.log("Server running on port 3000")
);
