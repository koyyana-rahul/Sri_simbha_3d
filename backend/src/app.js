const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const env = require("./config/env");
const apiRoutes = require("./routes/api");
const errorHandler = require("./middleware/errorHandler");
const { generalLimiter } = require("./middleware/rateLimiter");

const app = express();

// Security headers
app.use(helmet());

// CORS configuration
const allowedOrigins = [
  env.FRONTEND_ORIGIN,
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://simbha.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1 || env.NODE_ENV === "development") {
        return callback(null, true);
      }
      return callback(new Error("CORS policy violation: origin not allowed"));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Body parsing with safe size limit
app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ extended: true, limit: "50kb" }));

// General rate limiting
app.use("/api", generalLimiter);

// API routes
app.use("/api", apiRoutes);

// Root informational endpoint
app.get("/", (req, res) => {
  res.json({
    name: "Sri Simbha Ad Solutions API",
    tagline: "We Don't Just Show Ads. We Command Attention.",
    health: "/api/health",
    contact: "POST /api/contact",
  });
});

// Central error handler
app.use(errorHandler);

module.exports = app;
