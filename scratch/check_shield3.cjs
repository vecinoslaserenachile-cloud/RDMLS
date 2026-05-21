const fs = require('fs');
const path = require('path');

function search(dir) {
    fs.readdirSync(dir).forEach(f => {
        const p = path.join(dir, f);
        if (fs.statSync(p).isDirectory()) {
            if (f !== 'node_modules' && f !== '.git') search(p);
        } else if (p.endsWith('.jsx') || p.endsWith('.tsx') || p.endsWith('.js') || p.endsWith('.ts')) {
            const c = fs.readFileSync(p, 'utf-8');
            // Check if 'Shield' is used as a word anywhere
            if (/\bShield\b/.test(c)) {
                const importRegex = /import\s+[\s\S]*?from\s+['"]lucide-react['"]/g;
                let hasImport = false;
                let m;
                while ((m = importRegex.exec(c)) !== null) {
                    const words = m[0].split(/[\s,{}]/);
                    if (words.includes('Shield')) {
                        hasImport = true;
                        break;
                    }
                }
                
                // also check if they imported it differently, e.g. import { Shield as ...
                if (!hasImport) {
                    console.log('Missing import in: ' + p);
                }
            }
        }
    });
}
search('src');
