const https = require('https');
const PROJECT_ID = 'i6dkdu7j';
const DATASET = 'production';
const API_VERSION = '2024-03-01';
const SANITY_API_URL = `https://${PROJECT_ID}.apicdn.sanity.io/v${API_VERSION}/data/query/${DATASET}`;

const query = `*[_type == "villa" && defined(videoMux)] { name, "videoMuxPlaybackId": videoMux.asset->playbackId }`;
const url = `${SANITY_API_URL}?query=${encodeURIComponent(query)}`;

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log(data);
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});
