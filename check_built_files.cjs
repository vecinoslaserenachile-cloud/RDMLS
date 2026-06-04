const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'dist', 'assets');
if (!fs.existsSync(assetsDir)) {
    console.log('❌ dist/assets directory does not exist!');
    process.exit(1);
}

const files = fs.readdirSync(assetsDir).filter(f => f.endsWith('.js'));
const matches = [];

files.forEach(file => {
    const filePath = path.join(assetsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Look for exact matches of "Shield" or "ShieldCheck" or "ShieldAlert"
    // that might be used as undefined variables
    if (content.includes('Shield')) {
        matches.push({ file, size: content.length });
    }
});

if (matches.length === 0) {
    console.log('✅ No references to "Shield" found in built assets!');
} else {
    console.log('🔍 Files in dist/assets/ containing "Shield":');
    matches.forEach(m => {
        console.log(`📄 ${m.file} (Size: ${m.size} bytes)`);
        // Let's print some lines around "Shield"
        const filePath = path.join(assetsDir, m.file);
        const content = fs.readFileSync(filePath, 'utf8');
        
        let idx = content.indexOf('Shield');
        while (idx !== -1) {
            const start = Math.max(0, idx - 100);
            const end = Math.min(content.length, idx + 100);
            console.log(`   Snippet: ... ${content.substring(start, end).replace(/\n/g, ' ')} ...`);
            idx = content.indexOf('Shield', idx + 1);
        }
    });
}
