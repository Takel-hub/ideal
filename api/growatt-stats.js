import axios from 'axios';

// Simple in-memory cache for Vercel Serverless
// Note: In Vercel, memory cache might be cleared between cold starts, 
// but it's sufficient to prevent spamming during high traffic spikes on a single instance.
let cache = {
  data: null,
  timestamp: null
};

// 2 hours cache (in milliseconds)
const CACHE_DURATION = 2 * 60 * 60 * 1000; 

export default async function handler(req, res) {
  // CORS Headers for safety
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Check cache
  if (cache.data && cache.timestamp && (Date.now() - cache.timestamp < CACHE_DURATION)) {
    console.log("Returning cached Growatt data");
    return res.status(200).json(cache.data);
  }

  try {
    const GROWATT_APP_KEY = process.env.GROWATT_API_KEY || '00k14k9biwhvmc9678e412i40hhov7ai';


    // TODO: When AppSecret is provided by the user, we will construct the signature here
    // const timestamp = Date.now();
    // const signature = generateGrowattSignature(GROWATT_APP_KEY, APP_SECRET, timestamp);

    /* 
    // REAL API CALL (Commented out until we have AppSecret and URL)
    const response = await axios.get('https://openapi.growatt.com/v1/plant/list', {
      headers: { 'token': GROWATT_APP_KEY }
    });
    */

    // Simulated API Call for now (Takes 1.5s to simulate network)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulated data based on 100+ customers
    const aggregatedData = {
      success: true,
      currentPowerKW: 524.5, // Just nu: 524 kW
      totalEnergyKWH: 1254300, // Totalt: 1 254 300 kWh
      todayEnergyKWH: 3450 // Idag: 3 450 kWh
    };

    // Update Cache
    cache = {
      data: aggregatedData,
      timestamp: Date.now()
    };

    console.log("Fetched new data from Growatt");
    return res.status(200).json(aggregatedData);

  } catch (error) {
    console.error("Growatt API Error:", error.message);
    
    // Fallback to cache if request fails
    if (cache.data) {
      return res.status(200).json(cache.data);
    }
    
    return res.status(500).json({ error: 'Failed to fetch Growatt data', message: error.message });
  }
}
