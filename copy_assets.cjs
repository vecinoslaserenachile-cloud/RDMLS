const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\estud\\APP_LS_SEGURA\\entrevecinas.cltano Sin logo\\PDFs sin marcas tano';
const destDir = 'C:\\Users\\estud\\APP_LS_SEGURA\\public\\media\\tano';

const files = fs.readdirSync(srcDir);

for (const file of files) {
    if (file.startsWith('ev_')) {
        const destFile = file.replace(/^ev_/, '');
        const srcPath = path.join(srcDir, file);
        const destPath = path.join(destDir, destFile);
        
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied ${file} to ${destFile}`);
    }
}
