const fs = require('fs');
const content = fs.readFileSync('src/pages/HubDashboard.jsx', 'utf8');

let inString = false;
let stringChar = '';
let inComment = false;
let inBlockComment = false;

for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const nextChar = content[i+1];
    const prevChar = content[i-1];
    
    if (inComment) {
        if (char === '\n') inComment = false;
        continue;
    }
    if (inBlockComment) {
        if (char === '*' && nextChar === '/') {
            inBlockComment = false;
            i++;
        }
        continue;
    }
    if (inString) {
        if (char === stringChar && content[i-1] !== '\\') {
            inString = false;
        }
        continue;
    }
    
    if (char === '/' && nextChar === '/') {
        inComment = true;
        i++;
        continue;
    }
    if (char === '/' && nextChar === '*') {
        inBlockComment = true;
        i++;
        continue;
    }
    if (char === "'" || char === '"' || char === '`') {
        inString = true;
        stringChar = char;
        continue;
    }
    
    if (char === '/') {
        if (prevChar === '<') {
            // Closing tag </
        } else if (nextChar === '>') {
            // Self-closing tag />
        } else {
            const line = content.substring(0, i).split('\n').length;
            console.log(`${line}: STRAY SLASH: ${content.substring(i-20, i+20).replace(/\n/g, ' ')}`);
        }
    }
}
