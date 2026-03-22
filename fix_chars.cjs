const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'HubDashboard.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const mapping = {
    'Ã³': 'ó',
    'Ã¡': 'á',
    'Ã©': 'é',
    'Ã': 'í', // common for í
    'Ãº': 'ú',
    'Ã±': 'ñ',
    'Â¿': '¿',
    'í“': 'Ó',
    'í': 'Á',
    'í‰': 'É',
    'í': 'Í',
    'íš': 'Ú',
    'í‘': 'Ñ',
    'Â°': '°',
    'Âµ': 'µ',
    'ðŸŒ¤': '🌦️',
    'ðŸŒŠ': '🌊',
    'âœ✨': '✨',
    'ðŸ›°': '🛰️',
    'ðŸ“¡': '📡',
    'â–▶': '▶',
    'â€¢': '•',
    'VERSÍ“N': 'VERSIÓN',
    'RESTAURACÍ“N': 'RESTAURACIÓN',
    'única': 'Única',
    'Â': '' // sometimes orphan
};

for (const [key, value] of Object.entries(mapping)) {
    content = content.split(key).join(value);
}

// Specific fix for the "Inducci'on" etc
content = content.replace(/InducciÃ³n/g, 'Inducción');
content = content.replace(/GestiÃ³n/g, 'Gestión');
content = content.replace(/InnovaciÃ³n/g, 'Innovación');
content = content.replace(/AtenciÃ³n/g, 'Atención');
content = content.replace(/PronÃ³stico/g, 'Pronóstico');
content = content.replace(/Pleamar/g, 'Pleamar'); // already fine usually
content = content.replace(/Única/g, 'Única');

fs.writeFileSync(filePath, content);
console.log('✅ HubDashboard.jsx characters fixed.');
