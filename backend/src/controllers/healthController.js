/**
 * Health check endpoint.
 * GET /api/health
 */
function checkHealth(req, res) {
  res.status(200).json({
    status: "ok",
    service: "Sri Simbha Ad Solutions API",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
}

module.exports = {
  checkHealth,
};
