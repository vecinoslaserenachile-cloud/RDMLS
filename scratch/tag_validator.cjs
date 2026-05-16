const fs = require('fs');
const file = process.argv[2] || 'src/pages/HubDashboard.jsx';
const content = fs.readFileSync(file, 'utf8');

let pos = 0;
let stack = [];

function getLineNumber(p) {
    return content.substring(0, p).split('\n').length;
}

const tags = ['div', 'main', 'section', 'footer', 'header', 'React.Fragment', 'aside', 'article', 'button', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'ul', 'li', 'nav'];

while (pos < content.length) {
    let nextOpen = -1;
    let nextClose = -1;
    let foundTag = null;

    for (const tag of tags) {
        let o = content.indexOf('<' + tag, pos);
        let c = content.indexOf('</' + tag + '>', pos);
        
        if (o !== -1 && (nextOpen === -1 || o < nextOpen)) {
            // Check if it's really a tag (e.g. <div or <div )
            let charAfter = content.charAt(o + tag.length + 1);
            if (charAfter === ' ' || charAfter === '>' || charAfter === '/') {
                nextOpen = o;
                foundTag = tag;
            }
        }
        if (c !== -1 && (nextClose === -1 || c < nextClose)) {
            nextClose = c;
        }
    }

    if (nextOpen === -1 && nextClose === -1) break;

    if (nextOpen !== -1 && (nextClose === -1 || nextOpen < nextClose)) {
        // Open
        let tagEnd = content.indexOf('>', nextOpen);
        if (tagEnd !== -1 && content.charAt(tagEnd - 1) === '/') {
            // Self-closing
            pos = tagEnd + 1;
        } else {
            stack.push({ tag: foundTag, line: getLineNumber(nextOpen) });
            pos = nextOpen + 1;
        }
    } else {
        // Close
        let cEnd = content.indexOf('>', nextClose);
        let cTag = content.substring(nextClose + 2, cEnd).split(' ')[0];
        let opener = stack.pop();
        if (!opener || opener.tag !== cTag) {
            console.log(`MISMATCH AT LINE ${getLineNumber(nextClose)}: Found </${cTag}> but expected </${opener ? opener.tag : 'NONE'}> (opened at line ${opener ? opener.line : '??'})`);
        }
        pos = nextClose + 1;
    }
}

console.log(`Final stack:`, stack);
