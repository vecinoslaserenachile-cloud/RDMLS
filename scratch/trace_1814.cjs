const fs = require('fs');
const content = fs.readFileSync('src/pages/HubDashboard.jsx', 'utf8');

let pos = 0;
let stack = [];

function getLineNumber(p) {
    return content.substring(0, p).split('\n').length;
}

const tags = ['div', 'main', 'section', 'footer', 'header', 'React.Fragment'];

while (pos < content.length) {
    let nextOpen = -1;
    let nextClose = -1;
    let foundTag = null;

    for (const tag of tags) {
        let o = content.indexOf('<' + tag, pos);
        let c = content.indexOf('</' + tag + '>', pos);
        
        if (o !== -1 && (nextOpen === -1 || o < nextOpen)) {
            nextOpen = o;
            foundTag = tag;
        }
        if (c !== -1 && (nextClose === -1 || c < nextClose)) {
            nextClose = c;
        }
    }

    if (nextOpen === -1 && nextClose === -1) break;

    if (nextOpen !== -1 && (nextClose === -1 || nextOpen < nextClose)) {
        let tagEnd = content.indexOf('>', nextOpen);
        if (tagEnd !== -1 && content.charAt(tagEnd - 1) === '/') {
            pos = tagEnd + 1;
        } else {
            let line = getLineNumber(nextOpen);
            if (line === 1814) console.log(`PUSH 1814`);
            stack.push({ tag: foundTag, line: line });
            pos = nextOpen + 1;
        }
    } else {
        let opener = stack.pop();
        let line = getLineNumber(nextClose);
        if (opener && opener.line === 1814) console.log(`POP 1814 at line ${line}`);
        pos = nextClose + 1;
    }
}
