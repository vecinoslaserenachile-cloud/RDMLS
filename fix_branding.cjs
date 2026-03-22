const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'src', 'App.jsx');
let app = fs.readFileSync(appPath, 'utf8');

// Robust RDMLS detection
app = app.replace("const isRDMLS = _host.includes('rdmls') || _host.includes('entrevecinas');", "const isRDMLS = _host.includes('rdmls') || _host.includes('radiovecino') || _host.includes('entrevecinas');");

// Fix the header Branding logic - ensure it's absolutely correct
const rdmlsBranding = `RADIO DIGITAL MUNICIPAL LA SERENA`;
const vlsBranding = `www.vecinoslaserena.cl`;

// Check if we already have the ternary
if (app.includes("isRDMLS ? (")) {
    app = app.replace(/{isRDMLS \? \(.*?\n\s+<>\n\s+<img.*?\n\s+RADIO DIGITAL MUNICIPAL LA SERENA\n\s+<\/>\n\s+\) : \(.*?\n\s+<>\n\s+<img.*?\n\s+www.vecinoslaserena.cl\n\s+<\/>\n\s+\)}/s, 
    `{isRDMLS ? (
                <>
                  <img src="/rdmls-logo.png" style={{ height: '24px', marginRight: '6px' }} alt="RDMLS" />
                  RADIO DIGITAL MUNICIPAL LA SERENA
                </>
              ) : (
                <>
                  <img src="/vls-logo-premium.png" style={{ height: '24px', marginRight: '6px', filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.3))' }} alt="VLS Logo" />
                  www.vecinoslaserena.cl
                </>
              )}`);
}

fs.writeFileSync(appPath, app);

// Fast Fix for TV volume/fullscreen
const tvPath = path.join(__dirname, 'src', 'components', 'SmartTV.jsx');
let tv = fs.readFileSync(tvPath, 'utf8');
tv = tv.replace("const [isMuted, setIsMuted] = useState(true);", "const [isMuted, setIsMuted] = useState(false);"); 
// Fullscreen within environment:
tv = tv.replace("setIsFullScreen(!isFullScreen); setIsExpanded(true);", "setIsFullScreen(!isFullScreen); setIsExpanded(!isFullScreen);");
fs.writeFileSync(tvPath, tv);

console.log('✅ App branding and TV volume fixed.');
