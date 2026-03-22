const fs = require('fs');
const path = require('path');

const targetFile = path.resolve('c:/Users/estud/APP_LS_SEGURA/src/pages/HubDashboard.jsx');
let content = fs.readFileSync(targetFile, 'utf8');

const oldLineStart = "{ icon: Zap, color: '#38bdf8', text: \"[Aviso Bah";
const newLine = "        { icon: Zap, color: '#38bdf8', text: \"[Aviso Bahía] Mar picado. Evite acercarse a las rocas en Punta de Teatinos y Arrayán Costero. En El Faro precaución por fuerte oleaje.\" },";

// Find lines containing icon: Zap and [Aviso Bah
const lines = content.split('\n');
const result = lines.map(line => {
    if (line.includes('icon: Zap') && line.includes('[Aviso Bah')) {
        return newLine;
    }
    return line;
});

fs.writeFileSync(targetFile, result.join('\n'), 'utf8');
console.log('HubDashboard updated with Bahia warning.');
