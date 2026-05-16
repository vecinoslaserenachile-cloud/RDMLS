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
    const line = content.substring(0, stringStart).split('\n').length;
    console.log(`Unclosed string '${inString}' started at char ${stringStart} (Line ${line})`);
    console.log("Context:");
    console.log(content.substring(stringStart - 100, stringStart + 100));
} else {
    console.log("No unclosed strings found.");
}
