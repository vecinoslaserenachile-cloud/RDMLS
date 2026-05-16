const fs = require('fs');
const content = fs.readFileSync('src/pages/HubDashboard.jsx', 'utf8');
const lines = content.split('\n');

let balance = 0;
let maxBalance = 0;
let maxLine = 0;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let lineOpen = (line.match(/<div/g) || []).length;
    let lineClose = (line.match(/<\/div>/g) || []).length;
    balance += (lineOpen - lineClose);
    if (balance > maxBalance) {
        maxBalance = balance;
        maxLine = i + 1;
    }
}
console.log(`Max Balance: ${maxBalance} at line ${maxLine}`);
console.log(`Final balance: ${balance}`);
