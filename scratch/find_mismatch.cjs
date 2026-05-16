const fs = require('fs');
const content = fs.readFileSync('src/pages/HubDashboard.jsx', 'utf8');

const tags = [];
const regex = /<(\/)?([a-zA-Z0-9.]+)([\s\S]*?)(\/)?>/g;
let match;

while ((match = regex.exec(content)) !== null) {
    const isClose = !!match[1];
    const tagName = match[2];
    const attributes = match[3];
    const isSelfClosing = !!match[4] || attributes.trim().endsWith('/') || ['img', 'input', 'br', 'hr', 'link', 'meta'].includes(tagName.toLowerCase());
    const index = match.index;
    const line = content.substring(0, index).split('\n').length;

    if (tagName.startsWith('!') || tagName.startsWith('?')) continue;
    if (isSelfClosing && !isClose) continue;

    if (isClose) {
        if (tags.length === 0) {
            // Extra close tag
        } else {
            const last = tags.pop();
            if (last.name !== tagName) {
                if (line > 2004) {
                    console.log(`Mismatch at line ${line}: <${last.name}> (from ${last.line}) closed by </${tagName}>`);
                }
            }
        }
    } else {
        tags.push({ name: tagName, line });
    }
}
