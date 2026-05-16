const fs = require('fs');
const content = fs.readFileSync('src/pages/HubDashboard.jsx', 'utf8');

const startMain = content.indexOf('<main');
const endMain = content.indexOf('</main>', startMain);
const mainContent = content.substring(startMain, endMain + 7);

let balance = 0;
let i = 0;
while (i < mainContent.length) {
    if (mainContent.substring(i, i+4) === '<div') {
        balance++;
        i += 4;
    } else if (mainContent.substring(i, i+6) === '</div>') {
        balance--;
        i += 6;
    } else {
        i++;
    }
}
console.log("Balance inside <main>:", balance);
