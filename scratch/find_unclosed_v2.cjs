const fs = require('fs');
const content = fs.readFileSync('src/pages/HubDashboard.jsx', 'utf8');

const tags = [];
const regex = /<\/?([a-zA-Z0-9.]+)/g;
let match;

while ((match = regex.exec(content)) !== null) {
    const tagName = match[1];
    const isClose = match[0].startsWith('</');
    const index = match.index;
    const line = content.substring(0, index).split('\n').length;

    if (tagName === 'img' || tagName === 'input' || tagName === 'br' || tagName === 'hr' || tagName === 'BitacoraC5') {
        // Self-closing potential (simplified)
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
        // Check for self-closing in the tag itself (e.g. <div />)
        const endOfTag = content.indexOf('>', index);
        if (content.substring(index, endOfTag).endsWith('/')) {
            continue;
        }
        tags.push({ name: tagName, line });
    }
}

console.log('Unclosed tags at end:');
tags.forEach(t => console.log(`<${t.name}> at line ${t.line}`));
