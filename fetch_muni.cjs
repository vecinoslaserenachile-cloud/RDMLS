const https = require('https');
https.get('https://es.wikipedia.org/w/api.php?action=query&titles=Ilustre_Municipalidad_de_La_Serena&prop=pageimages&format=json&pithumbsize=800', { headers: { 'User-Agent': 'Bot' } }, r => {
  let d=''; r.on('data', c=>d+=c); r.on('end', () => console.log(JSON.stringify(JSON.parse(d))));
});
