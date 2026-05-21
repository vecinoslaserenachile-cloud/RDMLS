const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

const missingImports = [];

walkDir(srcDir, (filePath) => {
    if (!filePath.endsWith('.jsx') && !filePath.endsWith('.js')) return;

    const content = fs.readFileSync(filePath, 'utf8');
    // Check if it has <Shield or <Shield size=...
    if (/<Shield(\s|>)/.test(content)) {
        // check if imported
        if (!/import\s+{[^}]*\bShield\b[^}]*}\s+from\s+['"]lucide-react['"]/.test(content)) {
            missingImports.push(filePath);
        }
    }
});

console.log(JSON.stringify(missingImports, null, 2));
