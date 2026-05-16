const fs = require('fs');
const content = fs.readFileSync('src/pages/HubDashboard.jsx', 'utf8');

let inString = false;
let quoteChar = '';
let inComment = false;
let inMulticomment = false;

for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const next = content[i + 1];

    if (inComment) {
        if (char === '\n') inComment = false;
        continue;
    }
    if (inMulticomment) {
        if (char === '*' && next === '/') {
            inMulticomment = false;
            i++;
        }
        continue;
    }

    if (inString) {
        if (char === quoteChar && content[i-1] !== '\\') {
            inString = false;
        }
        continue;
    }

    if (char === '/' && next === '/') {
        inComment = true;
        i++;
        continue;
    }
    if (char === '/' && next === '*') {
        inMulticomment = true;
        i++;
        continue;
    }

    if (char === "'" || char === '"' || char === '`') {
        inString = true;
        quoteChar = char;
        continue;
    }
}

if (inString) console.log('Unclosed string: ' + quoteChar);
if (inMulticomment) console.log('Unclosed multi-comment');
else console.log('Strings and comments balanced');
