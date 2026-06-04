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

const shieldTypes = ['Shield', 'ShieldAlert', 'ShieldCheck'];
const broken = [];

files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    shieldTypes.forEach(shield => {
        // Look for `<Shield `, `<Shield/>`, `<Shield\n` or similar JSX tags
        const usesRegex = new RegExp(`<${shield}\\b`);
        const usesShield = usesRegex.test(content);
        
        if (usesShield) {
            // Check if it is imported
            // Regex to check if the specific shield is imported from lucide-react in this file
            const importRegex = new RegExp(`import\\s+\\{[^}]*\\b${shield}\\b[^}]*\\}\\s+from\\s+['"]lucide-react['"]`, 's');
            const importsShield = importRegex.test(content);
            
            if (!importsShield) {
                const lines = content.split('\n');
                const matchedLines = lines
                    .map((l, i) => ({n: i+1, l}))
                    .filter(({l}) => usesRegex.test(l));
                
                broken.push({
                    file: file.replace(__dirname, ''),
                    shield,
                    lines: matchedLines.map(x => `L${x.n}: ${x.l.trim()}`)
                });
            }
        }
    });
});

if (broken.length === 0) {
    console.log('✅ No broken Shield imports found!');
} else {
    console.log('❌ Files with Shield icons but no matching lucide-react import:');
    broken.forEach(b => {
        console.log(`\n📄 ${b.file} (Icon: ${b.shield})`);
        b.lines.forEach(l => console.log('   ' + l));
    });
}
