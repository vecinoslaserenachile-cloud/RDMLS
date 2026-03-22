import https from 'https';

const data = JSON.stringify({ name: "vecinosmart.cl" });

const options = {
  hostname: 'api.cloudflare.com',
  port: 443,
  path: '/client/v4/accounts/f106b65228e370b7be63060b3ac84dee/pages/projects/vecinos-la-serena/domains',
  method: 'POST',
  headers: {
    'X-Auth-Email': 'Vecinoslaserenachile@gmail.com',
    'X-Auth-Key': 'bb53aaa5c29acc38c183291529a1dd8937d18',
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`);
  res.on('data', d => {
    process.stdout.write(d);
  });
});

req.on('error', error => {
  console.error(error);
});

req.write(data);
req.end();

const data2 = JSON.stringify({ name: "www.vecinosmart.cl" });

const options2 = { ...options, headers: { ...options.headers, 'Content-Length': data2.length } };

const req2 = https.request(options2, res => {
  console.log(`statusCode: ${res.statusCode}`);
  res.on('data', d => {
    process.stdout.write(d);
  });
});

req2.on('error', error => {
  console.error(error);
});

req2.write(data2);
req2.end();
