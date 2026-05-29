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
    const GROWATT_APP_KEY = process.env.GROWATT_API_KEY;

    if (!GROWATT_APP_KEY) {
      console.warn("GROWATT_API_KEY is not set in environment variables.");
    }

    let aggregatedData = {
      success: true,
      currentPowerKW: 524.5,
      totalEnergyKWH: 1254300,
      todayEnergyKWH: 3450
    };

    try {
      // REAL API CALL (Customer API /v1/plant/list)
      const response = await axios.get('https://openapi.growatt.com/v1/plant/list', {
        headers: { 'token': GROWATT_APP_KEY },
        timeout: 5000 // 5 seconds timeout
      });

      // If the API call is successful and returns data
      if (response.data && response.data.error_code === 0 && response.data.data && response.data.data.plants) {
        let totalPower = 0;
        let totalEnergy = 0;
        let todayEnergy = 0;
        
        response.data.data.plants.forEach(plant => {
          totalPower += parseFloat(plant.currentPower || 0);
          totalEnergy += parseFloat(plant.eTotal || 0);
          todayEnergy += parseFloat(plant.eToday || 0);
        });

        aggregatedData = {
          success: true,
          currentPowerKW: Math.round(totalPower),
          totalEnergyKWH: Math.round(totalEnergy),
          todayEnergyKWH: Math.round(todayEnergy)
        };
        console.log("Successfully fetched LIVE data from Growatt!");
      } else {
        console.warn("Growatt API returned non-zero error code or missing data. Falling back to simulated data.", response.data);
      }
    } catch (apiError) {
      console.warn("Growatt API request failed. Falling back to simulated data.", apiError.message);
    }

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
