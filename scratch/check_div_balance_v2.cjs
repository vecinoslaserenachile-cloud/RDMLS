const fs = require('fs');
const content = fs.readFileSync('src/pages/HubDashboard.jsx', 'utf8');
const lines = content.split('\n');

let balance = 0;
lines.forEach((line, i) => {
    // Match <div ... > but not <div ... />
    const opens = (line.match(/<div(?![^>]*\/>)/g) || []).length;
    // Match </div>
    const closes = (line.match(/<\/div>/g) || []).length;
    
    balance += opens - closes;
    if (i % 100 === 0) {
        console.log(`Line ${i}: Balance ${balance}`);
    }
});
console.log(`Final balance: ${balance}`);
