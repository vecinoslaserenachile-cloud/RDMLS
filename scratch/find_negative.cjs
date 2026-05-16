const fs = require('fs');
const content = fs.readFileSync('src/pages/HubDashboard.jsx', 'utf8');

let pos = 0;
let balance = 0;

function getLineNumber(p) {
    return content.substring(0, p).split('\n').length;
}

while (pos < content.length) {
    let nextOpen = content.indexOf('<div', pos);
    let nextClose = content.indexOf('</div>', pos);

    if (nextOpen === -1 && nextClose === -1) break;

    if (nextOpen !== -1 && (nextClose === -1 || nextOpen < nextClose)) {
        let tagEnd = content.indexOf('>', nextOpen);
        if (tagEnd !== -1) {
            if (content.charAt(tagEnd - 1) === '/') {
                pos = tagEnd + 1;
            } else {
                balance++;
                pos = nextOpen + 4;
            }
        } else {
            pos = nextOpen + 4;
        }
    } else {
        balance--;
        if (balance < 0) {
            console.log(`Balance went negative at line ${getLineNumber(nextClose)}`);
            process.exit();
        }
        pos = nextClose + 6;
    }
}
