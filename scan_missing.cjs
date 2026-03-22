const fs = require('fs');
const c = fs.readFileSync('src/pages/HubDashboard.jsx', 'utf8');

// All imported names (both default and destructured)
const importedNames = new Set();

// Default imports: import X from '...'
const defImport = /^import\s+(\w+)\s+from/gm;
let m;
while ((m = defImport.exec(c)) !== null) importedNames.add(m[1]);

// Destructured imports: import { X, Y as Z } from 'lucide...'
const destrImport = /import\s*\{([^}]+)\}\s*from/g;
while ((m = destrImport.exec(c)) !== null) {
    m[1].split(',').forEach(s => {
        const parts = s.trim().split(/\s+as\s+/);
        importedNames.add((parts[1] || parts[0]).trim());
    });
}

// Self-closing JSX: <ComponentName /> or <ComponentName prop
const jsxSelfClose = /<([A-Z][a-zA-Z0-9]+)[\s/>]/g;
const used = new Set();
while ((m = jsxSelfClose.exec(c)) !== null) used.add(m[1]);

// Known builtins not needing import
const builtins = new Set(['React','AnimatePresence','Navigate','QRCodeSVG',
    'DeviceIcon','IconCmp','AppCard','GoreDashboard']);

const missing = [...used].filter(u => !importedNames.has(u) && !builtins.has(u));
if (missing.length === 0) {
    console.log('✅ ALL OK - No missing imports found!');
} else {
    console.log('❌ MISSING COMPONENTS:');
    missing.forEach(n => console.log(' •', n));
}
console.log('\n📦 Total imported:', importedNames.size);
console.log('🔍 Total JSX components used:', used.size);
