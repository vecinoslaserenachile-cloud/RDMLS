const fs = require('fs');
const path = require('path');

function getAllFiles(dir, ext) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
            results = results.concat(getAllFiles(filePath, ext));
        } else if (file.endsWith(ext)) {
            results.push(filePath);
        }
    });
    return results;
}

const srcDir = path.join(__dirname, 'src');
const files = getAllFiles(srcDir, '.jsx');

const broken = [];
files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const usesMusic = /\bMusic\b/.test(content);
    const importsMusic = /import[^;]*Music[^;]*from\s+['"]lucide-react['"]/s.test(content);
    if (usesMusic && !importsMusic) {
        // Show which line uses Music
        const lines = content.split('\n');
        const musicLines = lines.map((l, i) => ({n: i+1, l})).filter(({l}) => /\bMusic\b/.test(l));
        broken.push({ file: file.replace(__dirname, ''), lines: musicLines.map(x => `L${x.n}: ${x.l.trim()}`) });
    }
});

if (broken.length === 0) {
    console.log('✅ No broken Music imports found!');
} else {
    console.log('❌ Files with Music but no lucide-react import:');
    broken.forEach(b => {
        console.log('\n📄 ' + b.file);
        b.lines.forEach(l => console.log('   ' + l));
    });
}
