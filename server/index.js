const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

// Import Agents
const A1 = require('./agents/a1_chatbot');
const A3 = require('./agents/a3_calendar');
const A6 = require('./agents/a6_email');

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database Setup (SQLite)
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false
});

// Basic Route
app.get('/', (req, res) => {
    res.json({ message: 'Takel Agent Server is running! 🚀' });
});

// --- Agent Routes ---

// A1: Chatbot Endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message, history } = req.body;
        const result = await A1.handleChat(message, history);
        res.json({ ...result, agent: "A1" });
    } catch (error) {
        console.error("Chat Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// A3: Calendar Availability
app.get('/api/calendar/slots', async (req, res) => {
    try {
        const { timeOfDay, date, startDate, endDate } = req.query;
        const slots = await A3.getAvailableSlots({ timeOfDay, date, startDate, endDate });
        res.json({ slots });
    } catch (error) {
        console.error("Calendar Error:", error);
        res.status(500).json({ error: "Failed to fetch slots" });
    }
});

// A3: Book Slot
app.post('/api/calendar/book', async (req, res) => {
    try {
        const { summary, description, startTime } = req.body;
        // Map frontend body to what bookSlot expects
        const customerDetails = {
            name: summary.replace('Hembesök: ', ''),
            address: description.split('Adress: ')[1] || 'Unknown',
            phone: description.split('Tel: ')[0].replace('Tel: ', '').trim(),
            email: 'unknown@example.com', // Frontend doesn't send email in this body, but description has it
            gdprConsent: true, // Implicitly true if they reached this stage
            timestamp: new Date().toISOString()
        };

        // Save to File (Data Persistence)
        const fs = require('fs');
        const path = require('path');
        const leadsFile = path.join(__dirname, 'data', 'leads.json');

        let leads = [];
        if (fs.existsSync(leadsFile)) {
            try {
                const fileContent = fs.readFileSync(leadsFile, 'utf8');
                leads = JSON.parse(fileContent);
            } catch (e) {
                console.error("Error reading leads file:", e);
            }
        }

        leads.push({ ...customerDetails, startTime });

        fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2));

        // Pass startTime directly as the slotId/time
        const result = await A3.bookSlot(startTime, customerDetails);
        res.json(result);
    } catch (error) {
        console.error("Booking Error:", error);
        res.status(500).json({ error: "Failed to book slot" });
    }
});

// A6: Email Endpoint
app.post('/api/email/send', async (req, res) => {
    try {
        const { to, subject, body } = req.body;
        await A6.sendEmail(to, subject, body);
        res.json({ success: true, message: "Email sent" });
    } catch (error) {
        console.error("Email Error:", error);
        res.status(500).json({ error: "Failed to send email" });
    }
});

// Quote Endpoint
app.post('/api/quote', async (req, res) => {
    try {
        const { name, phone, email, address, consumption, gdprConsent } = req.body;

        // Save to File (Data Persistence)
        const fs = require('fs');
        const path = require('path');
        const leadsFile = path.join(__dirname, 'data', 'leads.json');

        let leads = [];
        if (fs.existsSync(leadsFile)) {
            try {
                const fileContent = fs.readFileSync(leadsFile, 'utf8');
                leads = JSON.parse(fileContent);
            } catch (e) {
                console.error("Error reading leads file:", e);
            }
        }

        const newLead = {
            type: 'quote_request',
            name,
            phone,
            email,
            address, // Object with street, zip, city
            consumption,
            gdprConsent,
            timestamp: new Date().toISOString()
        };

        leads.push(newLead);
        fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2));

        // Send Email
        // 1. Send Admin Email (Data View)
        const adminBody = `
            <h3>Ny Offertförfrågan</h3>
            <p><strong>Namn:</strong> ${name}</p>
            <p><strong>Telefon:</strong> ${phone}</p>
            <p><strong>E-post:</strong> ${email}</p>
            <p><strong>Adress:</strong> ${address.street}, ${address.zip} ${address.city}</p>
            <p><strong>Förbrukning:</strong> ${consumption}</p>
            <p><strong>GDPR Godkänd:</strong> ${gdprConsent ? 'Ja' : 'Nej'}</p>
            <br>
            <p><small>Inkom: ${new Date().toLocaleString('sv-SE')}</small></p>
        `;
        await A6.sendEmail(['hej@takel.se'], `Ny Offertförfrågan: ${name}`, adminBody);

        // 2. Send Customer Email (Personal)
        const customerBody = `
            <p>Hej ${name.split(' ')[0]}!</p>
            <p>Tack för att du hör av dig till oss på Takel.</p>
            <p>Vi har tagit emot din offertförfrågan och jag kommer att titta på dina förutsättningar så snart som möjligt.</p>
            <p>Jag återkommer till dig inom kort!</p>
            <br>
            <p>Med vänlig hälsning,</p>
            <p>Hans Nilsson</p>
            <p><strong>Takel AB</strong></p>
            <p>070-870 42 33</p>
        `;
        await A6.sendEmail([email], 'Vi har mottagit din förfrågan - Takel.se', customerBody);

        res.json({ success: true, message: "Quote request received" });
    } catch (error) {
        console.error("Error processing quote:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Callback Request Endpoint
app.post('/api/callback', async (req, res) => {
    try {
        const { name, phone } = req.body;

        const emailBody = `
            <h3>Ny begäran om uppringning</h3>
            <p><strong>Namn:</strong> ${name}</p>
            <p><strong>Telefon:</strong> ${phone}</p>
            <p><small>Inkom via Chatbot: ${new Date().toLocaleString('sv-SE')}</small></p>
        `;

        await A6.sendEmail(['hej@takel.se'], `Ring upp: ${name}`, emailBody);

        res.json({ success: true });
    } catch (error) {
        console.error("Error processing callback:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
