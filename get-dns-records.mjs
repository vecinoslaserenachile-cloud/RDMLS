import https from 'https';

const email = 'Vecinoslaserenachile@gmail.com';
const key = 'bb53aaa5c29acc38c183291529a1dd8937d18';

function getRecords(zoneName, zoneId) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.cloudflare.com',
      port: 443,
      path: `/client/v4/zones/${zoneId}/dns_records`,
      method: 'GET',
      headers: {
        'X-Auth-Email': email,
        'X-Auth-Key': key,
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, res => {
      let body = '';
      res.on('data', d => { body += d; });
      res.on('end', () => {
        try {
          const data = JSON.parse(body);
          resolve(data.result || []);
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', error => { reject(error); });
    req.end();
  });
}

async function run() {
  const targets = [
    { name: 'puertasmart.cl', id: '3100aec6d90deaf1a5c81fd9b81f401c' },
    { name: 'vecinosmart.cl', id: '49e6a7bb7a7fadbd88cf42f9a4b7f184' }
  ];

  for (const t of targets) {
    console.log(`=== DNS Records for ${t.name} ===`);
    try {
      const records = await getRecords(t.name, t.id);
      records.forEach(r => {
        console.log(`[${r.type}] ${r.name} -> ${r.content} (Proxied: ${r.proxied}, ID: ${r.id})`);
      });
    } catch (e) {
      console.error(`Error fetching records for ${t.name}:`, e.message);
    }
    console.log();
  }
}

run();
