import XLSX from 'xlsx';
import { readFileSync } from 'fs';

function readExcel(filePath, label) {
  console.log('\n========== ' + label + ' ==========');
  try {
    const wb = XLSX.readFile(filePath);
    console.log('Hojas:', wb.SheetNames);
    
    for (const sheetName of wb.SheetNames.slice(0, 2)) {
      const ws = wb.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
      console.log('\n-- Hoja: ' + sheetName + ' | Total filas: ' + data.length);
      console.log('Columnas:', JSON.stringify(data[0]));
      console.log('Fila 2:', JSON.stringify(data[1]));
      console.log('Fila 3:', JSON.stringify(data[2]));
    }
  } catch (e) {
    console.log('ERROR:', e.message);
  }
}

readExcel('public/archi-media/audio/Padron Electoral Archi 2026 RG.xlsx', 'PADRON ARCHI 2026');
readExcel('public/archi-media/audio/Listado Radios 2025 Subtel Version RG.xlsx', 'SUBTEL 2025');
