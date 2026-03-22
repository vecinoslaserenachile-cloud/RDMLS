const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'App.jsx');
let content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

// Line 920 (0-indexed: 919) is "         </div>" — the closing of the banner div
// Line 921 (0-indexed: 920) is "                padding: '0.35rem 0.6rem', " — orphaned CSS

// Find the exact line numbers (0-indexed)
let bannerDivCloseIdx = -1;
let orphanedCSSIdx = -1;

for (let i = 900; i < 940; i++) {
    const stripped = (lines[i] || '').trimEnd();
    if (stripped === '         </div>' && bannerDivCloseIdx === -1) {
        // Check next line is orphaned CSS
        const nextLine = (lines[i+1] || '').trimEnd();
        if (nextLine.includes("padding: '0.35rem 0.6rem'")) {
            bannerDivCloseIdx = i;
            orphanedCSSIdx = i + 1;
            break;
        }
    }
}

console.log('Banner </div> at line:', bannerDivCloseIdx + 1);
console.log('Orphaned CSS at line:', orphanedCSSIdx + 1);

if (bannerDivCloseIdx === -1) {
    console.error('Could not find the broken section');
    process.exit(1);
}

// Insert the missing header opening between the banner close and the orphaned CSS
const headerOpening = [
    '         </div>',
    '       )}',
    '',
    '      {/* Top Header — Branding dinámico según dominio */}',
    '      <header className="app-header glass-panel" style={{',
    '        width: \'100%\',',
    '        borderBottom: isRDMLS ? \'3px solid #f59e0b\' : \'1px solid rgba(255,255,255,0.05)\',',
    '        background: isRDMLS ? \'rgba(80, 5, 5, 0.97)\' : \'rgba(15, 23, 42, 0.95)\',',
    '        padding: \'0 0.5rem\',',
    '        display: \'flex\',',
    '        alignItems: \'center\',',
    '        justifyContent: \'space-between\',',
    '        boxSizing: \'border-box\'',
    '      }}>',
    '        <div style={{ display: \'flex\', alignItems: \'center\', gap: \'0.25rem\', overflow: \'hidden\', flexShrink: 1 }}>',
    '          <button onClick={() => navigate(\'/\')} className="btn-glass" style={{ padding: \'0.35rem\', borderRadius: \'50%\', display: \'flex\', alignItems: \'center\', justifyContent: \'center\', background: \'rgba(255,255,255,0.1)\', flexShrink: 0 }} title="Inicio">',
    '            <Home size={16} color="white" />',
    '          </button>',
    '          {location.pathname !== \'/\' && (',
    '            <button',
    '              onClick={() => navigate(-1)}',
    '              className="btn-glass"',
    '              style={{',
    "                padding: '0.35rem 0.6rem', "
];

// Remove the old banner close line and insert our reconstruction
// Lines before bannerDivCloseIdx + our new header + lines from orphanedCSSIdx onwards
const newLines = [
    ...lines.slice(0, bannerDivCloseIdx), // everything before banner close
    ...headerOpening,                      // new header opening
    ...lines.slice(orphanedCSSIdx)          // from the orphaned CSS onwards (which becomes the button's style continuation)
];

// Fix the title line to show RDMLS branding
const titleLineIdx = newLines.findIndex(l => l.includes('www.vecinoslaserena.cl') && !l.includes('mailto'));
if (titleLineIdx !== -1) {
    newLines[titleLineIdx] = "            {isRDMLS ? 'RADIO DIGITAL MUNICIPAL LA SERENA' : 'www.vecinoslaserena.cl'}";
    console.log('✅ Fixed title branding at line:', titleLineIdx + 1);
}

// Add </header> closing — find where </div> (header nav) closes and where the main starts
const mainIdx = newLines.findIndex(l => l.includes('<main className="page-content container'));
if (mainIdx !== -1) {
    // Insert </header> just before <main>
    newLines.splice(mainIdx, 0, '      </header>');
    console.log('✅ Added </header> before <main> at line:', mainIdx + 1);
}

const result = newLines.join('\n');
fs.writeFileSync(filePath, result);
console.log('');
console.log('✅ App.jsx header reconstructed! Final size:', result.length, 'bytes');
