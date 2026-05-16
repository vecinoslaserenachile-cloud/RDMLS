const fs = require('fs');
const content = fs.readFileSync('src/pages/HubDashboard.jsx', 'utf8');
const lines = content.split('\n');

let stack = [];
let inStyle = false;
let currentTagLine = 0;

lines.forEach((line, i) => {
    let l = line.trim();
    
    // Check for div opens
    const opens = (line.match(/<div(?![^>]*\/>)/g) || []);
    opens.forEach(() => {
        // Only push if it doesn't close on the SAME line
        if (!line.includes('/>')) {
             stack.push({ line: i + 1, text: line.trim() });
        }
    });

    // Check for multi-line self-closing ends
    if (line.includes('/>') && !line.includes('<div')) {
        // If the LATEST stack item was a div opened without a closing >
        // then this might be its self-closure.
        // But in JSX, a div can only be self-closed if it starts with <div ... />
        // If it starts with <div and ends with /> many lines later, it's still a self-closing div.
        
        // Wait! Let's check for </div> specifically
    }

    const closes = (line.match(/<\/div>/g) || []);
    closes.forEach(() => {
        if (stack.length > 0) stack.pop();
    });
});

console.log('Unclosed divs:', stack);
