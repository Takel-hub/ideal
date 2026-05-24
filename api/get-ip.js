import axios from 'axios';

export default async function handler(req, res) {
  if (!process.env.FIXIE_URL) {
    return res.status(200).json({ error: 'FIXIE_URL is not set in Vercel Environment Variables.' });
  }

  try {
    const url = require('url');
    const fixieUrl = url.parse(process.env.FIXIE_URL);
    const fixieAuth = fixieUrl.auth.split(':');

    const response = await axios.get('http://api.ipify.org?format=json', {
      proxy: {
        protocol: 'http',
        host: fixieUrl.hostname,
        port: fixieUrl.port,
        auth: {
          username: fixieAuth[0],
          password: fixieAuth[1]
        }
      }
    });
    
    return res.status(200).json({ 
      success: true, 
      fixie_ip: response.data.ip,
      message: 'Detta är din Fixie IP! Kopiera in denna i Growatt.'
    });
  } catch (error) {
    return res.status(200).json({ error: error.message });
  }
}
