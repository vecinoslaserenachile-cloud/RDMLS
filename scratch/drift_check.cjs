const fs = require('fs');
const content = fs.readFileSync('src/pages/HubDashboard.jsx', 'utf8');
const lines = content.split('\n');

let balance = 0;
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let lineOpen = (line.match(/<div/g) || []).length;
    let lineClose = (line.match(/<\/div>/g) || []).length;
    balance += (lineOpen - lineClose);
    if (balance !== 0) {
        // console.log(`Line ${i + 1}: Balance ${balance}`);
    }
}
console.log(`Final balance: ${balance}`);
