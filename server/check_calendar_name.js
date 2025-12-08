const { google } = require('googleapis');
require('dotenv').config();

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3001/oauth2callback'
);

if (process.env.GOOGLE_REFRESH_TOKEN) {
    oauth2Client.setCredentials({
        refresh_token: process.env.GOOGLE_REFRESH_TOKEN
    });
} else {
    console.error("No Refresh Token found in .env");
    process.exit(1);
}

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

async function checkName() {
    try {
        const res = await calendar.calendars.get({ calendarId: 'primary' });
        console.log("CALENDAR_NAME_FOUND: " + res.data.summary);
    } catch (error) {
        console.error("Error fetching calendar:", error.message);
    }
}

checkName();
