const fs = require('fs');
let c = fs.readFileSync('./src/App.jsx', 'utf8');

// Fix duplicate padding
c = c.replace(
  "                padding: '0.35rem 0.6rem', \n                padding: '0.35rem 0.6rem', \r\n",
  "                padding: '0.35rem 0.6rem', \r\n"
);

const lines = c.split('\n');
console.log('Lines around 1298-1315:');
for(let i=1297; i<1315; i++){
  console.log((i+1)+':', (lines[i]||'').substring(0,80));
}

fs.writeFileSync('./src/App.jsx', c);
console.log('Done. Size:', c.length);
