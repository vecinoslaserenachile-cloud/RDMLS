const fs = require('fs');
const path = require('path');

const filePath = 'src/pages/HubDashboard.jsx';
const content = fs.readFileSync(filePath, 'utf8');

let openBraces = 0;
let openParens = 0;
let openBrackets = 0;
let inString = null;

for (let i = 0; i < content.length; i++) {
    const char = content[i];
    if (inString) {
        if (char === '\\') { i++; continue; }
        if (char === inString) { inString = null; }
        continue;
    }
    if (char === "'" || char === '"' || char === "`") {
        inString = char;
        continue;
    }
    if (char === '{') openBraces++;
    if (char === '}') openBraces--;
    if (char === '(') openParens++;
    if (char === ')') openParens--;
    if (char === '[') openBrackets++;
    if (char === ']') openBrackets--;
    
    if (openBraces < 0 || openParens < 0 || openBrackets < 0) {
        console.log(`Mismatch at char ${i}: ${char} (Line ${content.substring(0, i).split('\n').length})`);
        // Print context
        console.log(content.substring(i - 50, i + 50));
        break;
    }
}
console.log(`Final counts: Braces: ${openBraces}, Parens: ${openParens}, Brackets: ${openBrackets}`);
if (inString) console.log(`Unclosed string: ${inString}`);
