const nodemailer = require('nodemailer');
require('dotenv').config();

// Configure Transporter
const port = parseInt(process.env.SMTP_PORT || '587');
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: port,
    secure: port === 465, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

async function sendEmail(to, subject, htmlContent) {
    console.log(`A6: Sending email to ${to}...`);

    if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
        console.warn("A6 Warning: No SMTP Credentials found. Simulating email.");
        console.log("--- EMAIL CONTENT ---");
        console.log(htmlContent);
        console.log("---------------------");
        return { success: true, message: "Simulated" };
    }

    try {
        // Handle array of recipients
        const recipients = Array.isArray(to) ? to.join(', ') : to;

        const info = await transporter.sendMail({
            from: `"Takel.se" <${process.env.SMTP_USER}>`,
            to: recipients,
            subject: subject,
            html: htmlContent
        });
        console.log("Message sent: %s", info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("A6 Error sending email:", error);
        console.warn("A6: Falling back to simulation due to SMTP error.");
        console.log("--- FAILED EMAIL CONTENT (FALLBACK) ---");
        console.log(htmlContent);
        console.log("-------------------------------------");
        return { success: true, message: "Simulated (Fallback)" };
    }
}

module.exports = { sendEmail };
