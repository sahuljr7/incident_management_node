module.exports = (req, res, next) => {
  const { type, incidentStartDate, incidentEndDate, description } = req.body;

  let errors = {};

  if (!type || type.trim() === "")
    errors.type = "Incident type is required";

  if (!incidentStartDate)
    errors.incidentStartDate = "Start date is required";

  if (!description || description.trim() === "")
    errors.description = "Description is required";

  if (incidentStartDate && incidentEndDate) {
    const start = new Date(incidentStartDate);
    const end = new Date(incidentEndDate);

    if (end < start) {
      errors.date = "End date cannot be before start date";
    }
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation errors",
      errors
    });
  }

  next();
};
