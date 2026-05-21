import https from 'https';

const email = 'Vecinoslaserenachile@gmail.com';
const key = 'bb53aaa5c29acc38c183291529a1dd8937d18';
const accountId = 'f106b65228e370b7be63060b3ac84dee';
const projectName = 'vecinos-la-serena';

function getPagesDomains() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.cloudflare.com',
      port: 443,
      path: `/client/v4/accounts/${accountId}/pages/projects/${projectName}/domains`,
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
  console.log(`=== Pages Domains for project: ${projectName} ===`);
  try {
    const domains = await getPagesDomains();
    domains.forEach(d => {
      console.log(`- Domain: ${d.name}`);
      console.log(`  Status: ${d.status}`);
      console.log(`  Validation: ${JSON.stringify(d.validation_data)}`);
    });
  } catch (e) {
    console.error(`Error fetching pages domains:`, e.message);
  }
}

run();
