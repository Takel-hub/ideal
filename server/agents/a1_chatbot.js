const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

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
        // Use the available Gemini 2.0 Flash model
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

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
            // Gemini doesn't give "choices" natively, so we infer them or let the frontend handle it
            choices: []
        };

    } catch (error) {
        console.error("A1 Error calling Gemini:", error);
        return {
            response: "Oj, jag tappade tanken lite (API Error). Men jag vill gärna komma och titta på ditt tak! Ska vi boka in det?",
            choices: ['Ja, boka hembesök']
        };
    }
}

module.exports = { handleChat };
