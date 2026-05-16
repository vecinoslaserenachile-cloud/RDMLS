const fs = require('fs');
const content = fs.readFileSync('src/pages/HubDashboard.jsx', 'utf8');

let pos = content.indexOf('Line 1814:'); // No, the file doesn't have "Line 1814:"
// I'll search for "page-container trencadis-guell"
let idx = content.indexOf('page-container trencadis-guell');
console.log(`Found at index ${idx}`);
let line = content.substring(0, idx).split('\n').length;
console.log(`Line: ${line}`);
let tagStart = content.lastIndexOf('<div', idx);
let tagEnd = content.indexOf('>', tagStart);
let tagContent = content.substring(tagStart, tagEnd + 1);
console.log(`Tag: ${tagContent}`);
console.log(`Last char before >: ${content.charAt(tagEnd - 1)}`);
