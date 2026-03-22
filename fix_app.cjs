const fs = require('fs');
let s = fs.readFileSync('src/App.jsx', 'utf-8');
const startMatch = '{/* Cartel Temporal Terremoto */}';
const targetIndex = s.indexOf(startMatch);
if (targetIndex !== -1) {
   const endIndex = s.indexOf('{/* Top Header */}', targetIndex);
   if (endIndex !== -1) {
       s = s.slice(0, targetIndex) + s.slice(endIndex);
       fs.writeFileSync('src/App.jsx', s);
       console.log('Banner removed successfully');
   }
}
