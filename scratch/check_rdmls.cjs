const fs = require('fs');
const content = fs.readFileSync('src/pages/HubDashboard.jsx', 'utf8');

const start = content.indexOf('if (isRDMLS) {');
const end = content.indexOf('return (', content.indexOf('return (', start) + 1); // skip first return
const actualEnd = content.indexOf(');', end); // closing the RDMLS return

const rdmlsCode = content.substring(start, actualEnd + 2);

let open = (rdmlsCode.match(/<div/g) || []).length;
let close = (rdmlsCode.match(/<\/div>/g) || []).length;
console.log(`RDMLS Branch Divs: ${open} open, ${close} close (Diff: ${open - close})`);
