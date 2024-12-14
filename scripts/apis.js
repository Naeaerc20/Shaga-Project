const axios = require('axios');

async function playSpin(uid, bearerToken, userAgent) {
  const url = "https://api-iowa.shaga.xyz/quests/spin";

  const headers = {
    'authorization': `Bearer ${bearerToken}`,
    'user-agent': userAgent,
    'content-type': 'application/json'
  };

  const payload = { uid };

  const response = await axios.post(url, payload, { headers });
  return response.data;
}

module.exports = { playSpin };
