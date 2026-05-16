const fs = require('fs');
const path = 'src/pages/HubDashboard.jsx';
let content = fs.readFileSync(path, 'utf8');

// Remove my temporary comments
content = content.replace(/\/\* TEMPORARY COMMENT FOR BUILD DEBUG\r?\n\*\/\r?\n/g, '');

// Replace suspicions slashes in text
content = content.replace('IA / NOV 2025', 'IA - NOV 2025');

fs.writeFileSync(path, content, 'utf8');
console.log('Uncommented and cleaned HubDashboard.jsx');
