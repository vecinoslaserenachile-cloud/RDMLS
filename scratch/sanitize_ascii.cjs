const fs = require('fs');
const path = 'src/pages/HubDashboard.jsx';
let content = fs.readFileSync(path, 'utf8');

// Replace all non-ASCII characters in comments or text to avoid esbuild confusion
content = content.replace(/Ã“/g, 'O');
content = content.replace(/Ã/g, 'A');
content = content.replace(/ó/g, 'o');
content = content.replace(/á/g, 'a');
content = content.replace(/é/g, 'e');
content = content.replace(/í/g, 'i');
content = content.replace(/ú/g, 'u');
content = content.replace(/ñ/g, 'n');
content = content.replace(/Ñ/g, 'N');

fs.writeFileSync(path, content, 'utf8');
console.log('Sanitized HubDashboard.jsx (ASCII only)');
