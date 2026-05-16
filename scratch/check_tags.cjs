const fs = require('fs');
const content = fs.readFileSync('src/pages/HubDashboard.jsx', 'utf8');

let tags = [];
let i = 0;
while (i < content.length) {
    if (content[i] === '<') {
        let start = i;
        i++;
        if (content[i] === '!' || content[i] === '?') continue; // Skip comments/etc
        let isClosing = content[i] === '/';
        if (isClosing) i++;
        
        let tagName = "";
        while (i < content.length && /[a-zA-Z0-9]/.test(content[i])) {
            tagName += content[i];
            i++;
        }
        
        if (tagName) {
            // Find end of tag
            let selfClosing = false;
            while (i < content.length && content[i] !== '>') {
                if (content[i] === '/' && content[i+1] === '>') {
                    selfClosing = true;
                    i++;
                    break;
                }
                i++;
            }
            
            if (!selfClosing) {
                if (isClosing) {
                    if (tags.length > 0 && tags[tags.length - 1] === tagName) {
                        tags.pop();
                    } else {
                        console.log(`Mismatch: found </${tagName}> at Line ${content.substring(0, start).split('\n').length}, expected </${tags[tags.length-1]}>`);
                    }
                } else {
                    tags.push(tagName);
                }
            }
        }
    }
    i++;
}

console.log("Remaining tags:", tags);
