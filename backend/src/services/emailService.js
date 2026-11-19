const nodemailer = require("nodemailer");
const env = require("../config/env");

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  const { HOST, PORT, SECURE, USER, PASSWORD } = env.EMAIL;

  if (HOST && USER && PASSWORD) {
    transporter = nodemailer.createTransport({
      host: HOST,
      port: PORT,
      secure: SECURE,
      auth: {
        user: USER,
        pass: PASSWORD,
      },
    });
  }

  return transporter;
}

/**
 * Send campaign enquiry notification email.
 */
async function sendEnquiryNotification(contact) {
  const mailClient = getTransporter();
  const receiver = env.EMAIL.RECEIVER;

  const subject = `[New Enquiry] ${contact.service} - ${contact.name}`;
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #081329; color: #FFFFFF; padding: 20px; }
          .card { background-color: #101F42; border: 1px solid rgba(232, 184, 63, 0.3); border-radius: 12px; padding: 24px; max-width: 600px; margin: 0 auto; }
          .header { border-bottom: 2px solid #FFC928; padding-bottom: 12px; margin-bottom: 20px; }
          .badge { background: #FFC928; color: #081329; font-weight: bold; padding: 4px 10px; border-radius: 6px; font-size: 12px; }
          .field { margin-bottom: 14px; }
          .label { font-size: 12px; color: #B9C1D0; text-transform: uppercase; letter-spacing: 1px; }
          .value { font-size: 16px; color: #FFFFFF; font-weight: 500; margin-top: 2px; }
          .msg-box { background: rgba(8, 19, 41, 0.6); border-left: 3px solid #FFC928; padding: 12px; border-radius: 4px; margin-top: 6px; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <span class="badge">SRI SIMBHA AD SOLUTIONS</span>
            <h2 style="color: #FFC928; margin: 10px 0 0 0;">New Campaign Enquiry</h2>
          </div>
          <div class="field">
            <div class="label">Client Name</div>
            <div class="value">${contact.name}</div>
          </div>
          <div class="field">
            <div class="label">Contact Phone</div>
            <div class="value"><a href="tel:${contact.phone}" style="color: #FFC928;">${contact.phone}</a></div>
          </div>
          <div class="field">
            <div class="label">Email Address</div>
            <div class="value"><a href="mailto:${contact.email}" style="color: #FFC928;">${contact.email}</a></div>
          </div>
          <div class="field">
            <div class="label">Company / Organization</div>
            <div class="value">${contact.company}</div>
          </div>
          <div class="field">
            <div class="label">Selected Service</div>
            <div class="value" style="color: #FFC928;">${contact.service}</div>
          </div>
          <div class="field">
            <div class="label">Project Details / Message</div>
            <div class="msg-box">${contact.message}</div>
          </div>
          <div style="margin-top: 24px; font-size: 11px; color: #8A99B5; border-top: 1px solid rgba(232,184,63,0.2); padding-top: 12px;">
            Submitted on ${new Date(contact.submittedAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
          </div>
        </div>
      </body>
    </html>
  `;

  if (!mailClient) {
    // In dev / unconfigured environments, log safely to console
    console.log(
      `[EmailService: Simulated Dispatch] To: ${receiver} | Subject: ${subject} | Name: ${contact.name}`
    );
    return {
      simulated: true,
      messageId: `simulated-${Date.now()}`,
    };
  }

  const info = await mailClient.sendMail({
    from: env.EMAIL.FROM,
    to: receiver,
    replyTo: contact.email,
    subject,
    html: htmlContent,
    text: `New Enquiry from ${contact.name}\nPhone: ${contact.phone}\nEmail: ${contact.email}\nCompany: ${contact.company}\nService: ${contact.service}\nMessage: ${contact.message}`,
  });

  return info;
}

module.exports = {
  sendEnquiryNotification,
};
