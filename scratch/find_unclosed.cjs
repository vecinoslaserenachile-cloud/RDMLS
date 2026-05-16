const fs = require('fs');
const content = fs.readFileSync('src/pages/HubDashboard.jsx', 'utf8');

let stack = [];
let inString = null;
let inComment = null;

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
        continue;
    }

    if (char === '{') {
        stack.push({ type: '{', pos: i, line: content.substring(0, i).split('\n').length });
    }
    if (char === '}') {
        if (stack.length > 0 && stack[stack.length - 1].type === '{') {
            stack.pop();
        } else {
            console.log(`Extra } at char ${i} (Line ${content.substring(0, i).split('\n').length})`);
        }
    }
    if (char === '(') {
        stack.push({ type: '(', pos: i, line: content.substring(0, i).split('\n').length });
    }
    if (char === ')') {
        if (stack.length > 0 && stack[stack.length - 1].type === '(') {
            stack.pop();
        } else {
            console.log(`Extra ) at char ${i} (Line ${content.substring(0, i).split('\n').length})`);
        }
    }
}

console.log("Unclosed items in stack:", stack);
