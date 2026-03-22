const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'App.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Fix Imports
if (!content.includes('VLSConsoleSound')) {
    content = content.replace(
        "import DeBonoThinkingHats from './components/DeBonoThinkingHats.jsx';",
        "import DeBonoThinkingHats from './components/DeBonoThinkingHats.jsx';\nimport VLSConsoleSound from './components/VLSConsoleSound.jsx';\nimport DronDrigo from './components/DronDrigo.jsx';"
    );
}

// 2. Fix useEffects
if (!content.includes('setShowAlert(false)')) {
    const useEffectEnd = content.indexOf('}, []);', content.indexOf('setAuthInitialized(true);'));
    if (useEffectEnd !== -1) {
        const insertPos = useEffectEnd + 7;
        const newLogic = `\n\n  useEffect(() => {\n    if (showAlert) {\n      const timer = setTimeout(() => setShowAlert(false), 10000);\n      return () => clearTimeout(timer);\n    }\n  }, [showAlert]);\n\n  useEffect(() => {\n    const handleOpenDron = () => setShowDronDrigo(true);\n    window.addEventListener('open-dron-drigo', handleOpenDron);\n    return () => window.removeEventListener('open-dron-drigo', handleOpenDron);\n  }, []);`;
        content = content.slice(0, insertPos) + newLogic + content.slice(insertPos);
    }
}

// 3. Fix Rendering (DronDrigo)
if (!content.includes('<DronDrigo')) {
    content = content.replace(
        "{showIntercom && <RadioIntercom onClose={() => setShowIntercom(false)} />}",
        "{showIntercom && <RadioIntercom onClose={() => setShowIntercom(false)} />}\n           {showDronDrigo && <DronDrigo onClose={() => setShowDronDrigo(false)} />}"
    );
}

// 4. Fix VLSConsoleSound and Banner
if (!content.includes('<VLSConsoleSound')) {
    content = content.replace(
        "<FloatingActionPanel />",
        `<FloatingActionPanel />\n\n       <VLSConsoleSound \n          onOpenRadio={() => setShowRadioMaster(true)} \n          onOpenTV={() => setShowRetroTV(true)}\n          onClose={() => {}}\n       />\n\n       {/* Banner Temporal Auto-Dismiss (10s) */}\n       {showAlert && (\n         <div className="animate-slide-up" style={{ \n            position: 'fixed', top: 'env(safe-area-inset-top, 0)', left: 0, right: 0, \n            zIndex: 999999, background: 'linear-gradient(90deg, #ef4444, #b91c1c)', \n            color: 'white', padding: '0.8rem', textAlign: 'center', \n            boxShadow: '0 4px 20px rgba(239, 68, 68, 0.5)', borderBottom: '2px solid #fca5a5', \n            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' \n         }}>\n           <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>\n             <ShieldAlert size={20} color="#fca5a5" className="animate-pulse" /> \n             ALERTA VECINAL: TUVIMOS UN TERREMOTO DIGITAL\n           </div>\n           <span style={{ fontSize: '0.85rem', opacity: 0.9 }}>\n             Estamos poniendo de pie la casa nuevamente. Disculpe las intermitencias mientras estabilizamos <strong>vecinoslaserena.cl</strong>. Su paciencia reconstruye nuestra comuna. 🚧🏗️\n           </span>\n         </div>\n       )}`
    );
}

// 5. Update Logo Header
content = content.replace(
    /www\.vecinoslaserena\.cl/g,
    "www.vecinoslaserena.cl" // Keep text
);
content = content.replace(
    /<img src="\/escudo\.png" style={{ height: '20px', marginRight: '6px' }} alt="" \/>/g,
    `<img src="/vls-logo-premium.png" style={{ height: '26px', marginRight: '8px', filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.4))' }} alt="VLS Logo" />`
);

fs.writeFileSync(filePath, content);
console.log("App.jsx updated successfully.");
