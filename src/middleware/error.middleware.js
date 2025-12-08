const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Server Error";

  res.status(statusCode).json({
    success: false,
    message: message,
  });
};

const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found - " + req.originalUrl,
  });
};

module.exports = { errorHandler, notFound };