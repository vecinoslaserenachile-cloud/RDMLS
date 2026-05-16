const fs = require('fs');
const content = fs.readFileSync('src/pages/HubDashboard.jsx', 'utf8');

let pos = 0;
let stack = [];
let balance = 0;

function getLineNumber(p) {
    return content.substring(0, p).split('\n').length;
}

while (pos < content.length) {
    let nextOpen = content.indexOf('<div', pos);
    let nextClose = content.indexOf('</div>', pos);

    if (nextOpen === -1 && nextClose === -1) break;

    if (nextOpen !== -1 && (nextClose === -1 || nextOpen < nextClose)) {
        // Found an open tag
        let tagEnd = content.indexOf('>', nextOpen);
        if (tagEnd !== -1) {
            if (content.charAt(tagEnd - 1) === '/') {
                // Self-closing
                pos = tagEnd + 1;
            } else {
                balance++;
                stack.push({ line: getLineNumber(nextOpen), type: 'div' });
                pos = nextOpen + 4;
            }
        } else {
            pos = nextOpen + 4;
        }
    } else {
        // Found a close tag
        balance--;
        stack.pop();
        pos = nextClose + 6;
    }
}

console.log(`Final balance: ${balance}`);
if (stack.length > 0) {
    console.log(`Still open:`, stack.slice(-20));
}
