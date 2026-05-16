const fs = require('fs');
const content = fs.readFileSync('src/pages/HubDashboard.jsx', 'utf8');
const lines = content.split('\n');

let stack = [];
lines.forEach((line, i) => {
    const opens = (line.match(/<div(?![^>]*\/>)/g) || []);
    const closes = (line.match(/<\/div>/g) || []);
    
    opens.forEach(() => stack.push(i + 1));
    closes.forEach(() => {
        if (stack.length > 0) stack.pop();
    });
    
    if (i === 3160) {
        console.log('Stack at line 3161:', stack);
    }
});
