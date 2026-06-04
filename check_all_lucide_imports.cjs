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
    
    // Find all JSX tags that start with an uppercase letter, representing a component
    // We match `<IconName` where IconName starts with an uppercase letter
    const jsxTagRegex = /<([A-Z][a-zA-Z0-9]*)\b/g;
    let match;
    const componentsUsed = new Set();
    
    while ((match = jsxTagRegex.exec(content)) !== null) {
        componentsUsed.add(match[1]);
    }
    
    // We also check any references in objects like `icon: IconName` or `iconName: 'IconName'`
    // but the ReferenceError typically only triggers on undeclared variables (like `icon: Users` or `<Users />`).
    // A React component like `const MartinSecurityShield = lazy(...)` is declared, but Lucide icons must be imported.
    // Let's filter components that are likely Lucide icons (starts with capital letter, and we check if it is imported)
    
    // Let's parse all imported variables from 'lucide-react' in this file
    const lucideImportRegex = /import\s+\{([^}]+)\}\s+from\s+['"]lucide-react['"]/g;
    const lucideImports = new Set();
    let importMatch;
    
    while ((importMatch = lucideImportRegex.exec(content)) !== null) {
        const importsList = importMatch[1].split(',').map(x => x.trim().split(/\s+as\s+/)[0].trim());
        importsList.forEach(x => {
            if (x) lucideImports.add(x);
        });
    }
    
    // Check if the component is declared in the file itself (e.g. const Component = ...)
    // or imported from another file (e.g. import Component from ...)
    componentsUsed.forEach(comp => {
        // Skip common HTML/React/Motion components
        if (['Fragment', 'Canvas', 'Html', 'OrbitControls', 'Stars', 'Float', 'FullCalendar', 'CommentSection', 'OldTVModal', 'VhsTVModal', 'RetroArcadeLobby', 'RadioBackofficeModal', 'NewsDetailModal', 'VLSInduccion', 'Induccion25', 'Aprende'].includes(comp)) return;
        
        // Skip standard motions or local components
        if (comp.startsWith('motion') || comp.endsWith('VLS') || comp.endsWith('Portal') || comp.endsWith('Modal') || comp.endsWith('Panel') || comp.endsWith('Dashboard') || comp.endsWith('View') || comp.endsWith('Card') || comp.endsWith('Button') || comp.endsWith('Widget') || comp.endsWith('List') || comp.endsWith('Tab') || comp.endsWith('Grid') || comp.endsWith('Header') || comp.endsWith('Footer') || comp.endsWith('Layout') || comp.endsWith('Section') || comp.endsWith('Slider') || comp.endsWith('Icon')) return;
        
        // Check if the component is declared in the file
        const isDeclaredLocally = new RegExp(`(?:const|let|var|function|class)\\s+${comp}\\b`).test(content);
        const isImported = new RegExp(`import\\s+.*\\b${comp}\\b.*\\s+from\\s+`).test(content);
        
        if (!isDeclaredLocally && !isImported) {
            // It's a potential Lucide icon used but not imported/defined!
            // Let's check if it fits the typical Lucide icon name (e.g., standard PascalCase names)
            // standard HTML elements are lowercase, so comp must be PascalCase
            const lines = content.split('\n');
            const matchedLines = lines
                .map((l, i) => ({n: i+1, l}))
                .filter(({l}) => new RegExp(`<${comp}\\b`).test(l));
                
            broken.push({
                file: file.replace(__dirname, ''),
                component: comp,
                lines: matchedLines.map(x => `L${x.n}: ${x.l.trim()}`)
            });
        }
    });
});

if (broken.length === 0) {
    console.log('✅ No broken imports found!');
} else {
    console.log('❌ Potential undeclared components / Lucide icons:');
    broken.forEach(b => {
        console.log(`\n📄 ${b.file} (Undeclared: ${b.component})`);
        b.lines.forEach(l => console.log('   ' + l));
    });
}
