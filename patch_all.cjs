const fs = require('fs');
const path = require('path');

const fixChars = (filePath) => {
    let content = fs.readFileSync(filePath, 'utf8');
    const mapping = {
        'Ã³': 'ó', 'Ã¡': 'á', 'Ã©': 'é', 'Ã': 'í', 'Ãº': 'ú', 'Ã±': 'ñ', 'Â¿': '¿',
        'í“': 'Ó', 'í ': 'Á', 'í‰': 'É', 'í ': 'Í', 'íš': 'Ú', 'í‘': 'Ñ',
        'Â°': '°', 'Âµ': 'µ', 'â€¢': '•', 'Â': ''
    };
    for (const [key, value] of Object.entries(mapping)) {
        content = content.split(key).join(value);
    }
    fs.writeFileSync(filePath, content);
};

// 1. Fix Hub
const hubPath = path.join(__dirname, 'src', 'pages', 'HubDashboard.jsx');
fixChars(hubPath);

// Add apps to Hub
let hub = fs.readFileSync(hubPath, 'utf8');
if (!hub.includes("'enfermeria-smart'")) {
    hub = hub.replace("id: 'servicios-médicos'", "id: 'salud-vecinal'"); // standardize
    // Insert after salud-vecinal in some array if possible, or just push to participacionCiudadana
    hub = hub.replace("id: 'almanaque-2026', title: 'Vecinos del Mundo'", "id: 'almanaque-mundial', title: 'Portal Vecinos del Mundo'");
}
// Add Enfermeria to participacionCiudadana for visibility
if (!hub.includes("id: 'enfermeria-smart'")) {
    hub = hub.replace("active: true\n        }\n    ];", "active: true\n        },\n        {\n            id: 'enfermeria-smart', title: 'Enfermería & Salud VLS', subtitle: 'Inyectables, Curaciones y Cuidados a Domicilio',\n            icon: Heart, color: '#10b981', isEvent: 'open-enfermeria-smart', active: true\n        }\n    ];");
}
fs.writeFileSync(hubPath, hub);

// 2. Fix App.jsx
const appPath = path.join(__dirname, 'src', 'App.jsx');
fixChars(appPath);
let app = fs.readFileSync(appPath, 'utf8');

// Imports
if (!app.includes("import SmartEnfermeria")) {
    app = app.replace("import PianoCompita", "import SmartEnfermeria from './components/SmartEnfermeria';\nimport PianoCompita");
}

// State
if (!app.includes("showEnfermeria")) {
    app = app.replace("const [showDonRadios, setShowDonRadios] = useState(false);", "const [showDonRadios, setShowDonRadios] = useState(false);\n  const [showEnfermeria, setShowEnfermeria] = useState(false);");
}

// Listener
if (!app.includes("'open-enfermeria-smart'")) {
    app = app.replace("window.addEventListener('open-lean-master',", "window.addEventListener('open-enfermeria-smart', () => setShowEnfermeria(true));\n    window.addEventListener('open-almanaque-mundial', () => setShowEmbajadas(true));\n    window.addEventListener('open-lean-master',");
}

// Render
if (!app.includes("<SmartEnfermeria")) {
    app = app.replace("{showDonRadios && <DonRadios onClose={() => setShowDonRadios(false)} />}", "{showDonRadios && <DonRadios onClose={() => setShowDonRadios(false)} />}\n      {showEnfermeria && <SmartEnfermeria onClose={() => setShowEnfermeria(false)} />}\n      {showEmbajadas && <EmbajadasConsulados onClose={() => setShowEmbajadas(false)} />}");
}

fs.writeFileSync(appPath, app);

// 3. Radio Player AI DJ
const radioPath = path.join(__dirname, 'src', 'components', 'RadioPlayer.jsx');
let radio = fs.readFileSync(radioPath, 'utf8');

if (!radio.includes("BROADCAST_NEWS")) {
    const djLogic = `
    const [djMessage, setDjMessage] = useState("");
    const [isDjTalking, setIsDjTalking] = useState(false);

    useEffect(() => {
        const djInterval = setInterval(() => {
            if (isPlaying && !isDjTalking && Math.random() > 0.7) {
                const news = [
                    "Reporte VLS: Los vecinos de La Serena destacan la nueva iluminación en el centro.",
                    "Clima Smart: Tarde despejada en la Avenida del Mar, ideal para una caminata.",
                    "Noticia Radar: Smart Citizens reporta alta participación en la última consulta.",
                    "Aviso VLS: Recuerden que el Bus del Tiempo sale cada 15 minutos desde el Faro."
                ];
                const msg = news[Math.floor(Math.random() * news.length)];
                injectAIDJ(msg);
            }
        }, 60000);
        return () => clearInterval(djInterval);
    }, [isPlaying, isDjTalking]);

    const injectAIDJ = (msg) => {
        setIsDjTalking(true);
        setDjMessage(msg);
        
        // Lower volume
        if (audioRef.current) audioRef.current.volume = 0.2;
        
        const utt = new SpeechSynthesisUtterance(msg);
        utt.rate = 0.9;
        utt.pitch = 1.1;
        utt.onend = () => {
            if (audioRef.current) audioRef.current.volume = 1.0;
            setIsDjTalking(false);
            setDjMessage("");
        };
        window.speechSynthesis.speak(utt);
    };
    `;

    // Insert logic
    radio = radio.replace("const audioRef = useRef(null);", "const audioRef = useRef(null);\n" + djLogic);
    
    // UI for DJ
    radio = radio.replace("{/* Player Principal */}", `{isDjTalking && (
                <div style={{ background: 'rgba(16,185,129,0.9)', color: 'white', padding: '10px 20px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', animation: 'pulse 2s infinite' }}>
                    🎙️ IA DJ: {djMessage}
                </div>
            )}\n            {/* Player Principal */}`);
}

fs.writeFileSync(radioPath, radio);

console.log('🚀 All patches applied. Hub, App and Radio ready.');
