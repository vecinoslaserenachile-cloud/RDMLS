const fs = require('fs');
const content = fs.readFileSync('src/pages/HubDashboard.jsx', 'utf8');

let divOpen = 0;
let divClose = 0;
let mainOpen = 0;
let mainClose = 0;

let i = 0;
while (i < content.length) {
    if (content.substring(i, i+4) === '<div') { divOpen++; i+=4; }
    else if (content.substring(i, i+6) === '</div>') { divClose++; i+=6; }
    else if (content.substring(i, i+5) === '<main') { mainOpen++; i+=5; }
    else if (content.substring(i, i+7) === '</main>') { mainClose++; i+=7; }
    else i++;
}

console.log(`Divs: ${divOpen} open, ${divClose} close (Diff: ${divOpen - divClose})`);
console.log(`Main: ${mainOpen} open, ${mainClose} close (Diff: ${mainOpen - mainClose})`);
