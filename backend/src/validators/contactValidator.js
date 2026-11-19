/**
 * Contact enquiry validation and sanitization.
 */

// Email regex matching RFC 5322 standard simplification
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

// Phone regex allowing country code, digits, dashes, spaces
const PHONE_REGEX = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,16}$/;

function sanitizeString(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/[<>]/g, "") // strip html brackets
    .trim();
}

function validateContactInput(body) {
  const errors = [];

  const rawName = body?.name;
  const rawEmail = body?.email;
  const rawPhone = body?.phone;
  const rawCompany = body?.company;
  const rawService = body?.service;
  const rawMessage = body?.message;
  const honeypot = body?.honeypot;

  // Spam detection via honeypot
  if (honeypot && typeof honeypot === "string" && honeypot.trim().length > 0) {
    return {
      isValid: false,
      isSpam: true,
      errors: ["Spam submission detected."],
      sanitized: null,
    };
  }

  // Name validation
  const name = sanitizeString(rawName);
  if (!name || name.length < 2) {
    errors.push("Full name must be at least 2 characters long.");
  } else if (name.length > 100) {
    errors.push("Full name cannot exceed 100 characters.");
  }

  // Email validation
  const email = sanitizeString(rawEmail).toLowerCase();
  if (!email || !EMAIL_REGEX.test(email)) {
    errors.push("A valid email address is required.");
  }

  // Phone validation
  const phone = sanitizeString(rawPhone);
  if (!phone || !PHONE_REGEX.test(phone)) {
    errors.push("A valid phone number (10+ digits) is required.");
  }

  // Service validation
  const service = sanitizeString(rawService);
  if (!service || service.length < 2) {
    errors.push("Please select a primary advertising service.");
  }

  // Optional company
  const company = sanitizeString(rawCompany);
  if (company && company.length > 120) {
    errors.push("Company name cannot exceed 120 characters.");
  }

  // Optional message
  const message = sanitizeString(rawMessage);
  if (message && message.length > 3000) {
    errors.push("Message cannot exceed 3000 characters.");
  }

  return {
    isValid: errors.length === 0,
    isSpam: false,
    errors,
    sanitized: {
      name,
      email,
      phone,
      company: company || "Not specified",
      service,
      message: message || "No additional message provided.",
      submittedAt: new Date().toISOString(),
    },
  };
}

module.exports = {
  validateContactInput,
  sanitizeString,
};
