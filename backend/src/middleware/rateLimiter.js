const rateLimit = require("express-rate-limit");

/**
 * Rate limiter for contact enquiry submissions.
 * Allows 15 requests per 15 minutes per IP.
 */
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Too many enquiries submitted from this IP. Please try again after 15 minutes.",
  },
});

/**
 * General API rate limiter.
 * 120 requests per minute per IP.
 */
const generalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Rate limit exceeded. Please slow down your requests.",
  },
});

module.exports = {
  contactLimiter,
  generalLimiter,
};
