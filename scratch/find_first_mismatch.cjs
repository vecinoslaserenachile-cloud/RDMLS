const fs = require('fs');
const content = fs.readFileSync('src/pages/HubDashboard.jsx', 'utf8');
const lines = content.split('\n');

let inString = null;
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (let j = 0; j < line.length; j++) {
        const char = line[j];
        if (inString) {
            if (char === '\\') { j++; continue; }
            if (char === inString) { inString = null; }
            continue;
        }
        if (char === "'" || char === '"' || char === "`") {
            inString = char;
        }
    }
    if (inString) {
        console.log(`First mismatch at Line ${i + 1}: ${line.trim()}`);
        process.exit();
    }
}
