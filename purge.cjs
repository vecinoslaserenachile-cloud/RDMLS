const https = require('https');
const data = JSON.stringify({ purge_everything: true });
const options = {
  hostname: 'api.cloudflare.com',
  port: 443,
  path: '/client/v4/zones/a36cadf3f840eef0aedfb60c4d661049/purge_cache',
  method: 'POST',
  headers: {
    'Authorization': 'Bearer cfut_IO7lBqotktDoHFN9EAyvc08DOyD6EzADi2HpvXcV9e988754',
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};
const req = https.request(options, (res) => {
  res.on('data', d => process.stdout.write(d));
});
req.write(data);
req.end();
