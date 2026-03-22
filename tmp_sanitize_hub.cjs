const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'HubDashboard.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// ELIMINAR EL INTERVALO DE ROTACIÓN PARA EVITAR CRUCES
const startMark = '// Intervalo de rotación inteligente';
const endMark = '// Re-inicia el timer al cambiar de idioma para dar ventana de 15s al usuario';

const startIdx = content.indexOf(startMark);
const endIdx = content.indexOf(endMark);

if (startIdx !== -1 && endIdx !== -1) {
    const fullBlockEnd = content.indexOf('}, [lang]);', endIdx) + 11;
    const blockToDelete = content.substring(startIdx, fullBlockEnd);
    content = content.replace(blockToDelete, '// Sincronización 100% coherente con el idioma global (sin rotación indeseada)');
    console.log('✅ Intervalo de rotación eliminado.');
} else {
    console.log('❌ No se encontró el bloque del intervalo.');
}

// CORREGIR GRATING LABELS (Eliminar "label" y dejar solo "flag" para diseño limpio)
content = content.replace(/label: ".*?", /g, '');

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ HubDashboard.jsx saneado.');
