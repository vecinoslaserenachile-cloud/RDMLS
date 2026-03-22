import https from 'https';

const options = {
  hostname: 'api.cloudflare.com',
  port: 443,
  path: '/client/v4/zones',
  method: 'GET',
  headers: {
    'X-Auth-Email': 'Vecinoslaserenachile@gmail.com',
    'X-Auth-Key': 'bb53aaa5c29acc38c183291529a1dd8937d18',
    'Content-Type': 'application/json'
  }
};

const req = https.request(options, res => {
  let body = '';
  res.on('data', d => {
    body += d;
  });
  
  res.on('end', () => {
      const data = JSON.parse(body);
      data.result.forEach(z => {
          console.log(`${z.name} -> ${z.id}`);
      });
  });
});

req.on('error', error => {
  console.error(error);
});

req.end();
