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

    let foundPos = -1;
    if (nextOpen !== -1 && (nextClose === -1 || nextOpen < nextClose)) {
        foundPos = nextOpen;
        if (getLineNumber(foundPos) >= 4245) break;
        let tagEnd = content.indexOf('>', nextOpen);
        if (tagEnd !== -1) {
            if (content.charAt(tagEnd - 1) === '/') {
                pos = tagEnd + 1;
            } else {
                balance++;
                stack.push({ line: getLineNumber(nextOpen) });
                pos = nextOpen + 4;
            }
        } else {
            pos = nextOpen + 4;
        }
    } else {
        foundPos = nextClose;
        if (getLineNumber(foundPos) >= 4245) break;
        balance--;
        stack.pop();
        pos = nextClose + 6;
    }
}

console.log(`Stack before line 4245:`, stack);
