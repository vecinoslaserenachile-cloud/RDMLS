const fs = require('fs');
const content = fs.readFileSync('src/pages/HubDashboard.jsx', 'utf8');
const lines = content.split('\n');

let balance = 0;
lines.forEach((line, i) => {
    const open = (line.match(/<div(?!ide)/g) || []).length;
    const close = (line.match(/<\/div>/g) || []).length;
    balance += open - close;
    if (i % 100 === 0) {
        console.log(`Line ${i}: Balance ${balance}`);
    }
});
console.log(`Final balance: ${balance}`);
