const fs = require('fs');
const filePath = 'src/pages/HubDashboard.jsx';
const content = fs.readFileSync(filePath, 'utf8');

let inString = null;
let stringStart = -1;

for (let i = 0; i < content.length; i++) {
    const char = content[i];
    if (inString) {
        if (char === '\\') { i++; continue; }
        if (char === inString) { inString = null; }
        continue;
    }
    if (char === "'" || char === '"' || char === "`") {
        inString = char;
        stringStart = i;
    }
}

if (inString) {
    console.log(`Unclosed string '${inString}' started at char ${stringStart}`);
    const snippet = content.substring(stringStart, stringStart + 20);
    console.log("Snippet (hex):");
    for (let j = 0; j < snippet.length; j++) {
        console.log(`${snippet[j]} : ${snippet.charCodeAt(j).toString(16)}`);
    }
}
