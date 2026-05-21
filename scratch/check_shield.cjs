const fs = require('fs');
const path = require('path');

function search(dir) {
    fs.readdirSync(dir).forEach(f => {
        const p = path.join(dir, f);
        if (fs.statSync(p).isDirectory()) {
            if (f !== 'node_modules' && f !== '.git') search(p);
        } else if (p.endsWith('.jsx') || p.endsWith('.tsx')) {
            const c = fs.readFileSync(p, 'utf-8');
            if (c.includes('<Shield ') || c.includes('<Shield>')) {
                const importRegex = /import\s+[\s\S]*?from\s+['"]lucide-react['"]/g;
                let hasImport = false;
                let m;
                while ((m = importRegex.exec(c)) !== null) {
                    // Check if Shield is imported exactly as "Shield"
                    // split by non-word chars and check
                    const words = m[0].split(/[\s,{}]/);
                    if (words.includes('Shield')) {
                        hasImport = true;
                        break;
                    }
                }
                if (!hasImport) {
                    console.log('Missing import in: ' + p);
                }
            }
        }
    });
}
search('src');
