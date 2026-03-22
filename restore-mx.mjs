import https from 'https';

const email = 'Vecinoslaserenachile@gmail.com';
const key = 'bb53aaa5c29acc38c183291529a1dd8937d18';
const zoneId = '49e6a7bb7a7fadbd88cf42f9a4b7f184';

function request(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.cloudflare.com',
      port: 443,
      path: path,
      method: method,
      headers: {
        'X-Auth-Email': email,
        'X-Auth-Key': key,
        'Content-Type': 'application/json'
      }
    };
    
    let stringData;
    if (data) {
        stringData = JSON.stringify(data);
        options.headers['Content-Length'] = stringData.length;
    }

    const req = https.request(options, res => {
      let body = '';
      res.on('data', d => { body += d; });
      res.on('end', () => { 
        try {
           resolve(JSON.parse(body));
        } catch(e) {
           reject(e);
        }
      });
    });

    req.on('error', reject);
    if (stringData) req.write(stringData);
    req.end();
  });
}

(async () => {
    try {
        console.log("Restaurando MX 1");
        await request('POST', `/client/v4/zones/${zoneId}/dns_records`, { type: 'MX', name: '@', content: 'mx.zoho.com', priority: 10 });
        
        console.log("Restaurando MX 2");
        await request('POST', `/client/v4/zones/${zoneId}/dns_records`, { type: 'MX', name: '@', content: 'mx2.zoho.com', priority: 20 });
        
        console.log("Restaurando MX 3");
        await request('POST', `/client/v4/zones/${zoneId}/dns_records`, { type: 'MX', name: '@', content: 'mx3.zoho.com', priority: 50 });
        
        console.log("Restaurando TXT zoho");
        await request('POST', `/client/v4/zones/${zoneId}/dns_records`, { type: 'TXT', name: '@', content: "zoho-verification=zb76535142.zmverify.zoho.com" });
        
        console.log("Restaurando TXT spf");
        await request('POST', `/client/v4/zones/${zoneId}/dns_records`, { type: 'TXT', name: '@', content: "v=spf1 include:zohomail.com ~all" });
        
        console.log("Restauracion completa");
    } catch (e) {
        console.error(e);
    }
})();
