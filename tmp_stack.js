import fs from 'fs';
const path = 'c:\\Users\\estud\\APP_LS_SEGURA\\src\\pages\\HubDashboard.jsx';
const content = fs.readFileSync(path, 'utf8');

let stack = [];
let re = /<(div|header|section|footer|motion\.div)|<\/(div|header|section|footer|motion\.div)>/g;
let match;

while ((match = re.exec(content)) !== null) {
    let tag = match[0];
    if (tag.startsWith('</')) {
        if (stack.length === 0) {
            console.log(`EXTRA CLOSE TAG at position ${match.index}: ${tag}`);
        } else {
            stack.pop();
        }
    } else {
        if (!tag.endsWith('/>')) {
            stack.push({tag, pos: match.index});
        }
    }
}

console.log(`Unclosed tags: ${stack.length}`);
stack.forEach(s => {
    const line = content.substring(0, s.pos).split('\n').length;
    console.log(`Unclosed ${s.tag} at line ${line}`);
});
