const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/database");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/incidents", require("./routes/incidentRoutes"));

app.get("/", (req, res) => {
  res.send("Incident Management API");
});

app.listen(process.env.PORT || 3000, () =>
  console.log("Server running on port 3000")
);
