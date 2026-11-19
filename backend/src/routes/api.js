const express = require("express");
const { checkHealth } = require("../controllers/healthController");
const { handleContact } = require("../controllers/contactController");
const { validateContact } = require("../middleware/validate");
const { contactLimiter } = require("../middleware/rateLimiter");

const router = express.Router();

// GET /api/health
router.get("/health", checkHealth);

// POST /api/contact
router.post("/contact", contactLimiter, validateContact, handleContact);

module.exports = router;
