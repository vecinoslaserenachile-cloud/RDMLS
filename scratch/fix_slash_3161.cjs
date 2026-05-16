const fs = require('fs');
const path = 'src/pages/HubDashboard.jsx';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split(/\r?\n/);

lines[3160] = lines[3160].replace('IA / NOV 2025', 'IA - NOV 2025');

fs.writeFileSync(path, lines.join('\n'), 'utf8');
console.log('Fixed line 3161');
