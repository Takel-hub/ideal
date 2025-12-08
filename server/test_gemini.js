const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function listModels() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        // There isn't a direct "listModels" on the client instance in some versions, 
        // but let's try to just generate content with a fallback to see the error details 
        // or if we can find a working one.

        // Actually, the proper way to list models is via the API, but the SDK might not expose it easily in all versions.
        // Let's try a simple generation with 'gemini-pro' again but log everything.

        console.log("Testing gemini-pro...");
        const modelPro = genAI.getGenerativeModel({ model: "gemini-pro" });
        await modelPro.generateContent("Hello");
        console.log("Success with gemini-pro");

    } catch (error) {
        console.error("Error with gemini-pro:", error.message);
    }

    try {
        console.log("Testing gemini-1.5-flash...");
        const modelFlash = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        await modelFlash.generateContent("Hello");
        console.log("Success with gemini-1.5-flash");
    } catch (error) {
        console.error("Error with gemini-1.5-flash:", error.message);
    }
}

listModels();
