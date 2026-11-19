const { sendEnquiryNotification } = require("../services/emailService");

/**
 * Handles customer contact enquiries.
 * POST /api/contact
 */
async function handleContact(req, res, next) {
  try {
    const contact = req.sanitizedContact;

    // Send email notification
    await sendEnquiryNotification(contact);

    return res.status(201).json({
      success: true,
      message: "Thank you for reaching out! We have received your campaign enquiry and will contact you shortly.",
      data: {
        name: contact.name,
        service: contact.service,
        submittedAt: contact.submittedAt,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  handleContact,
};
