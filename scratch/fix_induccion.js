import fs from 'fs';

const filePath = 'c:/Users/estud/APP_LS_SEGURA/src/pages/Induccion26.jsx';
let content = fs.readFileSync(filePath, 'utf8');

// Fix common mojibake and update 2026 to 2025
const replacements = [
    { from: /2026/g, to: '2025' },
    { from: /BETA26/g, to: 'BETA25' },
    { from: /beta26/g, to: 'beta25' },
    { from: /ÔöÇ/g, to: '—' },
    { from: /ÔöÇÔöÇ/g, to: '——' },
    { from: /┬í/g, to: '¡' },
    { from: /├ô/g, to: 'Ó' },
    { from: /├ë/g, to: 'É' },
    { from: /├ì/g, to: 'Í' },
    { from: /├á/g, to: 'á' },
    { from: /├⌐/g, to: 'é' },
    { from: /├¡/g, to: 'í' },
    { from: /├│/g, to: 'ó' },
    { from: /├║/g, to: 'ú' },
    { from: /├▒/g, to: 'ñ' },
    { from: /ÔÇö/g, to: '—' },
    { from: /ÔØô/g, to: '❓' },
    { from: /­ƒôä/g, to: '📄' },
    { from: /­ƒÅå/g, to: '🏆' },
    { from: /ÔÅ▒´©Å/g, to: '⏱️' },
    { from: /­ƒô╗/g, to: '📺' },
    { from: /­ƒÄô/g, to: '🎓' },
    { from: /­ƒû¿´©Å/g, to: '🖨️' },
    { from: /­ƒÜº/g, to: '🚧' }
];

replacements.forEach(r => {
    content = content.replace(r.from, r.to);
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('Induccion26.jsx fixed and updated to 2025.');
