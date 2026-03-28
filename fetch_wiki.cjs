const https = require('https');
const pages = ['Faro_Monumental_de_La_Serena', 'Avenida_del_Mar_(La_Serena)', 'Estadio_La_Portada', 'Plaza_de_Armas_de_La_Serena', 'Avenida_Francisco_de_Aguirre', 'La_Recova'];

Promise.all(pages.map(p => new Promise(res => {
  https.get(`https://es.wikipedia.org/w/api.php?action=query&titles=${p}&prop=pageimages&format=json&pithumbsize=800`, { headers: { 'User-Agent': 'AntigravityBot/1.0 (test@example.com)' } }, r => {
    let d=''; r.on('data', c => d+=c); r.on('end', () => res(JSON.parse(d)));
  });
}))).then(r => console.log(JSON.stringify(r.map(x => Object.values(x.query.pages)[0].thumbnail ? Object.values(x.query.pages)[0].thumbnail.source : null), null, 2)));
