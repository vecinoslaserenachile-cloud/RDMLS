const fs = require('fs');
const content = fs.readFileSync('src/pages/HubDashboard.jsx', 'utf8');
const lines = content.split('\n');

let balance = 0;
let stack = [];

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let pos = 0;
    while (true) {
        let openIdx = line.indexOf('<div', pos);
        let closeIdx = line.indexOf('</div>', pos);
        
        if (openIdx === -1 && closeIdx === -1) break;
        
        if (openIdx !== -1 && (closeIdx === -1 || openIdx < closeIdx)) {
            // Check for self-closing
            let endTagIdx = line.indexOf('>', openIdx);
            if (endTagIdx !== -1 && line.charAt(endTagIdx - 1) === '/') {
                // Self-closing, ignore
            } else {
                balance++;
                stack.push(i + 1);
            }
            pos = openIdx + 4;
        } else {
            balance--;
            stack.pop();
            pos = closeIdx + 6;
        }
    }
}

console.log(`Final balance: ${balance}`);
console.log(`Unclosed divs started at lines: ${stack.slice(-30).join(', ')}`);
