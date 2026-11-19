const dotenv = require("dotenv");
const path = require("path");

// Load .env
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const env = {
  PORT: parseInt(process.env.PORT, 10) || 5000,
  NODE_ENV: process.env.NODE_ENV || "development",
  FRONTEND_ORIGIN: process.env.FRONTEND_ORIGIN || "http://localhost:3000",
  EMAIL: {
    HOST: process.env.EMAIL_HOST || "",
    PORT: parseInt(process.env.EMAIL_PORT, 10) || 587,
    SECURE: process.env.EMAIL_SECURE === "true",
    USER: process.env.EMAIL_USER || "",
    PASSWORD: process.env.EMAIL_PASSWORD || "",
    FROM: process.env.EMAIL_FROM || "Sri Simbha Ad Solutions <enquiries@srisimbha.com>",
    RECEIVER: process.env.ENQUIRY_RECEIVER || "srisimbhaadsolutions.info@gmail.com",
  },
};

module.exports = env;
