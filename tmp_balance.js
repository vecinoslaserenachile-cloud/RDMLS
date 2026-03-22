import fs from 'fs';
const path = 'c:\\Users\\estud\\APP_LS_SEGURA\\src\\pages\\HubDashboard.jsx';
const lines = fs.readFileSync(path, 'utf8').split('\n');

let balance = 0;
lines.forEach((line, i) => {
    const opens = (line.match(/<[a-zA-Z][^>]*[^\/]>|<[a-zA-Z][^>]*$/g) || []).length;
    const closes = (line.match(/<\/[a-zA-Z][^>]*>/g) || []).length;
    balance += opens - closes;
    if (balance < 0) {
        console.log(`NEGATIVE BALANCE at line ${i + 1}: ${line.trim()}`);
        balance = 0; // reset for next check
    }
});
console.log(`Final balance: ${balance}`);
