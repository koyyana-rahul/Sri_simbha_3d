const app = require("./app");
const env = require("./config/env");

const server = app.listen(env.PORT, () => {
  console.log(`[Sri Simbha API] Server running on port ${env.PORT} (${env.NODE_ENV})`);
  console.log(`[Sri Simbha API] Health check: http://localhost:${env.PORT}/api/health`);
});

// Graceful shutdown handling
process.on("SIGTERM", () => {
  console.log("SIGTERM received, closing HTTP server...");
  server.close(() => {
    console.log("HTTP server closed.");
  });
});

process.on("SIGINT", () => {
  console.log("SIGINT received, closing HTTP server...");
  server.close(() => {
    console.log("HTTP server closed.");
  });
});
