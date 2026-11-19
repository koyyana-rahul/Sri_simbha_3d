const env = require("../config/env");

/**
 * Central error handling middleware.
 */
function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const isDev = env.NODE_ENV === "development";

  console.error(`[API Error] ${req.method} ${req.originalUrl}:`, err.message);
  if (isDev && err.stack) {
    console.error(err.stack);
  }

  res.status(statusCode).json({
    success: false,
    error: err.message || "Internal server error occurred.",
    ...(isDev ? { stack: err.stack } : {}),
  });
}

module.exports = errorHandler;
