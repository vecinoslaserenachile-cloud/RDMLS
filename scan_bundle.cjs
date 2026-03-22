const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist', 'assets');
const files = fs.readdirSync(distDir).filter(f => f.endsWith('.js'));

files.forEach(f => {
    const c = fs.readFileSync(path.join(distDir, f), 'utf8');
    
    // Find all occurrences of "Music" that could be a variable reference (not in strings)
    // Simple heuristic: look for patterns like "icon:Music" or ",Music," or "(Music)"
    const patterns = [
        /icon:\s*Music/g,
        /Music\s*\)/g,
        /\(Music/g,
        /,Music,/g,
        /icon:t\.Music/g,
        /\bMusics\b/g
    ];
    
    patterns.forEach(re => {
        let m;
        while ((m = re.exec(c)) !== null) {
            const ctx = c.slice(Math.max(0, m.index - 150), m.index + 150);
            console.log('FILE:', f, 'MATCH:', m[0]);
            console.log('CTX:', ctx);
            console.log('---');
        }
    });
});

console.log('Done scanning', files.length, 'files');
