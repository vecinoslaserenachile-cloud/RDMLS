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
        else console.log(`Extra closure at line ${i + 1}`);
    });
    
    if (i === 3170) {
        console.log('Stack at line 3171:', stack);
    }
});

console.log('Unclosed divs (starting lines):', stack);
