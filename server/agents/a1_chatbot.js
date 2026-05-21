const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const { sendEmail } = require('./a6_email'); // Import the Email Agent for alerts

// Initialize Gemini
// Defaults to a placeholder if key is missing to prevent crash on startup, 
// but handleChat will check for it.
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "missing_key");

async function handleChat(message) {
    console.log("A1: Processing message with Gemini...", message);

    if (!process.env.GEMINI_API_KEY) {
        console.warn("A1 Warning: No Gemini API Key found. Returning mock response.");
        return {
            response: "Jag körs i 'Simulation Mode' just nu eftersom min Gemini-hjärna saknar en API-nyckel. Men jag kan fortfarande boka tider! Vill du boka ett hembesök?",
            choices: ['Ja, boka hembesök', 'Nej tack']
        };
    }

    try {
        // Use 'gemini-flash-latest' which works while billing quota propagates
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const systemPrompt = `
        Du är Hans Nilsson, en vänlig och kunnig solcellsexpert från Takel.se.
        Ditt mål är att boka hembesök.
        Svara kort, koncist och alltid på svenska.
        Var hjälpsam men styr alltid samtalet mot att boka ett möte.

        **Dina Kunskapsområden:**
        Du svarar ENDAST på frågor om Takel, solceller, batterier, elbilsladdare, Grönt Teknikavdrag och besparingar.
        Om någon frågar om något annat (t.ex. recept, sport, politik), svara vänligt att du bara kan hjälpa till med solenergi.

        **Jämförelser (Battle Cards):**
        Om kunden jämför med andra, använd dessa argument:
        1. **Varför Takel AB?**
           - Vi är lokala i Stockholm (snabb service, personligt bemötande).
           - Vi har egna installatörer (ingen underentreprenad).
           - Vi har 30 års garanti på paneler.
           - Vi har över 100 nöjda kunder och 5/5 i betyg.
        
        2. **Varför Growatt (Växelriktare)?**
           - Världens största tillverkare av växelriktare för villor.
           - Extremt driftsäkra och tysta.
           - Bra app för övervakning.
           - 10 års garanti som standard.

        3. **Varför Aiko (Solpaneler)?**
           - Världsledande effektivitet (över 23%).
           - Prisbelönt design (Red Dot Award), helsvarta och snygga ("All Black").
           - Bättre skuggtolerans än vanliga paneler.
           - Glas-glas moduler för extrem hållbarhet.

        Användarens meddelande: ${message}
        `;

        const result = await model.generateContent(systemPrompt);
        const response = await result.response;
        const text = response.text();

        console.log("A1: Gemini Response:", text);

        return {
            response: text,
            choices: []
        };

    } catch (error) {
        console.error("A1 CRITICAL Error calling Gemini:", error.message, error);
        
        // Automatically alert the admin via the Email Agent!
        try {
            await sendEmail(
                'hej@takel.se',
                '🚨 Larm: Fel på Takel-chatboten',
                `<p>Chatboten kunde inte svara en kund på grund av ett API-fel mot Google Gemini.</p>
                 <p><strong>Felmeddelande:</strong> ${error.message}</p>
                 <p><strong>Stack:</strong> ${error.stack}</p>
                 <p><small>Detta är ett automatiskt larm från systemet.</small></p>`
            );
        } catch(e) {
            console.error("Could not send alert email:", e);
        }

        // Return a friendly, non-technical fallback response to the customer
        return {
            response: `Ursäkta, min AI-hjärna har just nu en tillfällig kafferast på grund av mycket hög trafik på servrarna. Men jag kan fortfarande hjälpa dig att boka in ett hembesök! Vill du göra det?`,
            choices: ['Ja, boka hembesök', 'Nej tack']
        };
    }
}

module.exports = { handleChat };
