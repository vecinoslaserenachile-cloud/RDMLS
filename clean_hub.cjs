const fs = require('fs');
const p = 'src/pages/HubDashboard.jsx';
let s = fs.readFileSync(p, 'utf8');

// Clean up previous bloated '||' chains
s = s.replace(/\|\| '[^']*' \|\| '[^']*' \|\| '[^']*'/g, '');
s = s.replace(/\|\| '[^']*' \|\| '[^']*'/g, '');

// Apply clean fallbacks
const rules = {
    saludTitle: 'Smart Salud',
    saludSub: 'Agendamiento',
    kioskoTitle: 'Kiosko',
    kioskoSub: 'Noticias',
    airportTitle: 'Aeropuerto',
    airportSub: 'Vuelos en vivo',
    visionTitle: 'Visión',
    visionSub: 'Reportes',
    broadcasterTitle: 'Estudio VLS',
    broadcasterSub: 'Streaming',
    memoryTitle: 'Memoria',
    memorySub: 'Historia',
    auditoriaTitle: 'Auditoría',
    auditoriaSub: 'Gobierno Abierto',
    parlamentoTitle: 'Parlamento',
    parlamentoSub: 'Debate',
    projectTitle: 'Proyecto',
    projectSub: 'Información',
    cdlsTitle: 'CDLS',
    cdlsSub: 'Pasión Granate',
    musicTitle: 'Música',
    musicSub: 'Estudio IA',
    retroTitle: 'Televisor',
    retroSub: 'Canales 80s',
    vhsTitle: 'Videoclub',
    vhsSub: 'Películas VHS',
    faritoTitle: 'Navegador',
    faritoSub: 'Faro',
    glosarioTitle: 'Glosario',
    glosarioSub: 'Términos'
};

for (const [key, val] of Object.entries(rules)) {
    const regex = new RegExp(`t\\.${key}`, 'g');
    s = s.replace(regex, `t.${key} || '${val}'`);
}

fs.writeFileSync(p, s);
console.log('HubDashboard fixed');
