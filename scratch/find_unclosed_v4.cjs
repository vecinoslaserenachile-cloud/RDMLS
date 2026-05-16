const fs = require('fs');
const content = fs.readFileSync('src/pages/HubDashboard.jsx', 'utf8');

const tags = [];
// Multi-line regex for tags
const regex = /<(\/)?([a-zA-Z0-9.]+)([\s\S]*?)(\/)?>/g;
let match;

while ((match = regex.exec(content)) !== null) {
    const isClose = !!match[1];
    const tagName = match[2];
    const attributes = match[3];
    const isSelfClosing = !!match[4] || attributes.trim().endsWith('/') || ['img', 'input', 'br', 'hr', 'link', 'meta'].includes(tagName.toLowerCase());
    const index = match.index;
    const line = content.substring(0, index).split('\n').length;

    // Filter out comments and non-tags
    if (tagName.startsWith('!') || tagName.startsWith('?')) continue;

    if (isSelfClosing && !isClose) {
        continue;
    }

    if (isClose) {
        if (tags.length === 0) {
            console.log(`Extra close tag </${tagName}> at line ${line}`);
        } else {
            const last = tags.pop();
            if (last.name !== tagName) {
                console.log(`Mismatch: <${last.name}> at line ${last.line} closed by </${tagName}> at line ${line}`);
            }
        }
    } else {
        tags.push({ name: tagName, line });
    }
}

console.log('--- Unclosed tags at end ---');
tags.forEach(t => console.log(`<${t.name}> at line ${t.line}`));
