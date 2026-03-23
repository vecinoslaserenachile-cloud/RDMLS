const fs = require('fs');
const file = 'src/pages/Serenamet.jsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/^[ ]*\d+:[ ]?/gm, '');
fs.writeFileSync(file, content);
console.log('Fixed Serenamet.jsx');
