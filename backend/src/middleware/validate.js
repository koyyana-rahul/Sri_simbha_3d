const { validateContactInput } = require("../validators/contactValidator");

/**
 * Request validation middleware for contact enquiries.
 */
function validateContact(req, res, next) {
  const result = validateContactInput(req.body);

  if (result.isSpam) {
    // Silently return success to discard bot spam
    return res.status(200).json({
      success: true,
      message: "Thank you for contacting Sri Simbha Ad Solutions.",
    });
  }

  if (!result.isValid) {
    return res.status(400).json({
      success: false,
      error: result.errors[0],
      errors: result.errors,
    });
  }

  req.sanitizedContact = result.sanitized;
  next();
}

module.exports = {
  validateContact,
};
