const fs = require('fs');
const content = fs.readFileSync('src/pages/HubDashboard.jsx', 'utf8');
const lines = content.split('\n');

let balance = 0;
lines.forEach((line, i) => {
    // Ignore string literals
    let clean = line.replace(/'[^']*'/g, "''").replace(/"[^"]*"/g, '""');
    const opens = (clean.match(/\{/g) || []).length;
    const closes = (clean.match(/\}/g) || []).length;
    balance += opens - closes;
});

console.log('Final brace balance:', balance);
