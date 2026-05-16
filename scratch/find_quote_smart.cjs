const fs = require('fs');
const content = fs.readFileSync('src/pages/HubDashboard.jsx', 'utf8');

let inString = null;
let inComment = null; // 'line' or 'block'

for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const nextChar = content[i+1];

    if (inComment === 'line') {
        if (char === '\n') inComment = null;
        continue;
    }
    if (inComment === 'block') {
        if (char === '*' && nextChar === '/') {
            inComment = null;
            i++;
        }
        continue;
    }

    if (inString) {
        if (char === '\\') { i++; continue; }
        if (char === inString) { inString = null; }
        continue;
    }

    if (char === '/' && nextChar === '/') {
        inComment = 'line';
        i++;
        continue;
    }
    if (char === '/' && nextChar === '*') {
        inComment = 'block';
        i++;
        continue;
    }

    if (char === "'" || char === '"' || char === "`") {
        inString = char;
        stringStart = i;
    }
}

if (inString) {
    const line = content.substring(0, stringStart).split('\n').length;
    console.log(`Unclosed string '${inString}' started at char ${stringStart} (Line ${line})`);
    console.log("Context:");
    console.log(content.substring(stringStart - 100, stringStart + 100));
} else {
    console.log("No unclosed strings (outside comments) found.");
}
