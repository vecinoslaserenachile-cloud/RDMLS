const fs = require('fs');
const code = fs.readFileSync('c:/Users/estud/APP_LS_SEGURA/src/pages/HubDashboard.jsx', 'utf8');
let inJsx = false;
let lines = code.split('\n');

// A very simple regex-based tag counter (not perfect, but good enough for this file)
let tags = [];
for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    
    // ignore comments roughly
    if (line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*')) continue;
    
    let regex = /<\/?([a-zA-Z0-9]+)(>|\s+[^>]*>)/g;
    let match;
    while ((match = regex.exec(line)) !== null) {
        let full = match[0];
        let tag = match[1];
        if (full.endsWith('/>')) continue; // Self-closing
        if (full.startsWith('</')) {
            tags.push({ type: 'close', name: tag, line: i + 1 });
        } else {
            tags.push({ type: 'open', name: tag, line: i + 1 });
        }
    }
    
    // Also track <> and </>
    let fragRegex = /<\/?\>/g;
    let fm;
    while ((fm = fragRegex.exec(line)) !== null) {
        let f = fm[0];
        if (f === '</>') tags.push({ type: 'close', name: 'Fragment', line: i + 1 });
        else if (f === '<>') tags.push({ type: 'open', name: 'Fragment', line: i + 1 });
    }
}

let stack = [];
for (let t of tags) {
    if (t.type === 'open') {
        stack.push(t);
    } else {
        if (stack.length === 0) {
            console.log('Unmatched closing tag', t);
            break;
        }
        let last = stack[stack.length - 1];
        if (last.name === t.name) {
            stack.pop();
        } else {
            console.log(`Mismatch! Expected closing for ${last.name} (from line ${last.line}), but found closing for ${t.name} at line ${t.line}`);
            break;
        }
    }
}
if (stack.length > 0) {
    console.log('Still open at EOF:', stack.map(s => s.name + ':' + s.line).join(', '));
} else {
    console.log('All tags matched properly via regex.');
}
