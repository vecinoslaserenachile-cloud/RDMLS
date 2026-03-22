import https from 'https';

const email = 'Vecinoslaserenachile@gmail.com';
const key = 'bb53aaa5c29acc38c183291529a1dd8937d18';
const zoneId = '49e6a7bb7a7fadbd88cf42f9a4b7f184';
const projectTarget = 'vecinos-la-serena.pages.dev';

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
        console.log("Obteniendo registros de vecinosmart.cl...");
        const records = await request('GET', `/client/v4/zones/${zoneId}/dns_records`);
        
        for (const record of records.result || []) {
            if (record.name === 'vecinosmart.cl' || record.name === 'www.vecinosmart.cl') {
                console.log(`Borrando registro existente: ${record.type} ${record.name} -> ${record.content}`);
                await request('DELETE', `/client/v4/zones/${zoneId}/dns_records/${record.id}`);
            }
        }
        
        console.log("Creando CNAME @ => " + projectTarget);
        const resRoot = await request('POST', `/client/v4/zones/${zoneId}/dns_records`, {
            type: 'CNAME',
            name: '@',
            content: projectTarget,
            proxied: true
        });
        console.log("Root result:", resRoot.success);

        console.log("Creando CNAME www => vecinosmart.cl");
        const resWww = await request('POST', `/client/v4/zones/${zoneId}/dns_records`, {
            type: 'CNAME',
            name: 'www',
            content: 'vecinosmart.cl',
            proxied: true
        });
        console.log("WWW result:", resWww.success);
        
        console.log("Done");
    } catch (e) {
        console.error(e);
    }
})();
