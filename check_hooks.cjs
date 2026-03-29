const fs = require('fs');
const path = require('path');

function checkFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    let hasReturn = false;
    let errors = [];

    lines.forEach((line, index) => {
        const trimmed = line.trim();
        
        // Detect an early return that looks like a component guard
        if (trimmed.startsWith('if') && trimmed.includes('return') && !trimmed.includes('useEffect')) {
            // Check if it's a simple one-liner return or a block
            if (trimmed.includes('return <') || trimmed.includes('return null')) {
                hasReturn = true;
            }
        }

        // Detect hooks
        if (trimmed.match(/useState|useEffect|useRef|useMemo|useCallback|useContext|useReducer|useLayoutEffect|useFrame|useThree|useGLTF|useTexture/)) {
            if (hasReturn) {
                errors.push(`Line ${index + 1}: Hook called after potential early return: "${trimmed}"`);
            }
            
            // Detect hook in if/map/loop
            if (trimmed.match(/^(if|for|while|\.map|\.forEach)/) || (line.includes('?') && line.includes('use'))) {
                // This regex is imperfect but might catch "if (...) { use... }" or similar
                if (line.match(/(if|for|while|map|forEach).*(use[A-Z][a-zA-Z]+)/)) {
                   errors.push(`Line ${index + 1}: Hook called inside conditional/loop: "${trimmed}"`);
                }
            }
        }
    });

    return errors;
}

const srcDir = path.join(__dirname, 'src');
const files = [];

function getFiles(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            getFiles(fullPath);
        } else if (file.endsWith('.jsx')) {
            files.push(fullPath);
        }
    });
}

getFiles(srcDir);

files.forEach(file => {
    const errors = checkFile(file);
    if (errors.length > 0) {
        console.log(`\nFILE: ${file}`);
        errors.forEach(err => console.log(`  ${err}`));
    }
});
