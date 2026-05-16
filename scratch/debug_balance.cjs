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
                // Self-closing
            } else {
                balance++;
                stack.push({ line: i + 1, content: line.trim().substring(0, 50) });
            }
            pos = openIdx + 4;
        } else {
            balance--;
            stack.pop();
            pos = closeIdx + 6;
        }
    }
    if (i + 1 === 4081) {
        console.log(`At line 4081, balance is ${balance}`);
        console.log(`Open divs:`, stack);
    }
}
