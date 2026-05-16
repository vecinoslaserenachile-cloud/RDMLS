const fs = require('fs');
const path = require('path');

const filePath = 'src/pages/HubDashboard.jsx';
const content = fs.readFileSync(filePath, 'utf8');

try {
    // We can't easily parse JSX with raw Node, but we can do basic brace/quote matching
    let openBraces = 0;
    let openParens = 0;
    let openBrackets = 0;
    let inString = null; // ' or " or `
    
    for (let i = 0; i < content.length; i++) {
        const char = content[i];
        const nextChar = content[i+1];
        
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
        
        if (openBraces < 0) { console.log(`Brace mismatch at char ${i}`); break; }
        if (openParens < 0) { console.log(`Paren mismatch at char ${i}`); break; }
        if (openBrackets < 0) { console.log(`Bracket mismatch at char ${i}`); break; }
    }
    
    console.log(`Final counts: Braces: ${openBraces}, Parens: ${openParens}, Brackets: ${openBrackets}`);
    if (inString) console.log(`Unclosed string: ${inString}`);

} catch (e) {
    console.error(e);
}
