/* 
  Exporting a middleware function for validating incident data 
  before it reaches the controller (used in routes).
  Middlewares in Express run between the request and the actual logic (controller).
*/
module.exports = (req, res, next) => {
  /* 
    Extracting required fields from the request body.
    These are the inputs that the frontend sends while creating or updating an incident.
  */
  const { type, incidentStartDate, incidentEndDate, description } = req.body;

  // Creating an empty object to store all validation error messages
  let errors = {};

  /* 
    Checking if the 'type' field is missing or empty.
    trim() removes extra spaces before or after the text.
  */
  if (!type || type.trim() === "")
    errors.type = "Incident type is required";

  // Checking if the 'incidentStartDate' field is missing
  if (!incidentStartDate)
    errors.incidentStartDate = "Start date is required";

  /* 
    Checking if the 'description' field is missing or empty.
    Description helps understand what the incident is about.
  */
  if (!description || description.trim() === "")
    errors.description = "Description is required";

  /* 
    If both start and end dates are provided, 
    we check that the end date is not earlier than the start date.
  */
  if (incidentStartDate && incidentEndDate) {
    const start = new Date(incidentStartDate);
    const end = new Date(incidentEndDate);

    // If the end date is before the start date, we store an error message
    if (end < start) {
      errors.date = "End date cannot be before start date";
    }
  }

  /* 
    If there are any validation errors (errors object not empty),
    we stop the request here and send a 400 (Bad Request) response with all error details.
  */
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation errors",
      errors
    });
  }

  /* 
    If no validation errors are found,
    we call next() to pass control to the next middleware or controller function.
  */
  next();
};
