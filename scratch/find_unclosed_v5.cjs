const fs = require('fs');
let content = fs.readFileSync('src/pages/HubDashboard.jsx', 'utf8');

// Replace arrows to avoid breaking tag regex
content = content.replace(/=>/g, 'ARROW');

const tags = [];
// Regex that handles tags, even with newlines
const regex = /<(\/)?([a-zA-Z0-9.]+)([\s\S]*?)(\/)?>/g;
let match;

while ((match = regex.exec(content)) !== null) {
    const isClose = !!match[1];
    const tagName = match[2];
    const attributes = match[3];
    const isSelfClosing = !!match[4] || ['img', 'input', 'br', 'hr', 'link', 'meta'].includes(tagName.toLowerCase());
    
    // Check if attributes contains a '>' that is NOT part of a self-closing tag end
    // (This is still tricky, but better)
    
    const index = match.index;
    const line = content.substring(0, index).split('\n').length;

    if (tagName.startsWith('!') || tagName.startsWith('?')) continue;
    if (isSelfClosing && !isClose) continue;

    if (isClose) {
        if (tags.length > 0) {
            const last = tags.pop();
            if (last.name !== tagName) {
                console.log(`Mismatch line ${line}: <${last.name}> (from ${last.line}) closed by </${tagName}>`);
            }
        }
    } else {
        tags.push({ name: tagName, line });
    }
}

console.log('--- Unclosed tags ---');
tags.forEach(t => console.log(`<${t.name}> at line ${t.line}`));
