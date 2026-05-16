const fs = require('fs');
const content = fs.readFileSync('src/pages/HubDashboard.jsx', 'utf8');

let idx = -1;
while ((idx = content.indexOf('page-container trencadis-guell', idx + 1)) !== -1) {
    let line = content.substring(0, idx).split('\n').length;
    let tagStart = content.lastIndexOf('<div', idx);
    let tagEnd = content.indexOf('>', tagStart);
    let tagContent = content.substring(tagStart, tagEnd + 1);
    console.log(`Line: ${line}, Tag: ${tagContent}`);
}
