const fs = require('fs');
const content = fs.readFileSync('src/pages/HubDashboard.jsx', 'utf8');
let counts = { "'": 0, '"': 0, '`': 0 };
for (let char of content) {
    if (counts[char] !== undefined) counts[char]++;
}
console.log(counts);
