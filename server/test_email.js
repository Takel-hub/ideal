require('dotenv').config();
const nodemailer = require('nodemailer');

const port = parseInt(process.env.SMTP_PORT || '587');
console.log(`Testing connection to ${process.env.SMTP_HOST} on port ${port} as ${process.env.SMTP_USER}...`);

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: port,
    secure: port === 465, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

transporter.verify(function (error, success) {
    if (error) {
        console.error("❌ SMTP Verification Failed:");
        console.error(error);
    } else {
        console.log("✅ SMTP Server is ready to take our messages");
    }
});
