const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'SmartTV.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. REUBICAR CONTROLES A LA CABECERA
const headerControlsStart = '          <div style={{ display: \'flex\', gap: \'15px\', alignItems: \'center\' }}>';
const newHeaderControls = `          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', background: 'rgba(0,0,0,0.2)', padding: '2px 8px', borderRadius: '20px', marginRight: '10px' }}>
             <button 
                 onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
                 style={{ background: 'transparent', border: 'none', color: isMuted ? '#ef4444' : '#10b981', cursor: 'pointer', padding: '2px', display: 'flex', alignItems: 'center' }}
                 title={isMuted ? "Activar Audio" : "Silenciar"}
             >
                 {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
             </button>
             <div style={{ width: '1px', height: '12px', background: 'rgba(255,255,255,0.1)' }}></div>
             <button 
                 onClick={(e) => { e.stopPropagation(); setCurrentChannelIdx(prev => (prev === 0 ? CHANNELS.length - 1 : prev - 1)); }}
                 style={{ background: 'transparent', border: 'none', color: '#38bdf8', cursor: 'pointer', fontSize: '0.6rem', fontWeight: 'bold', padding: '0 4px' }}
             >
                 CH-
             </button>
             <button 
                 onClick={(e) => { e.stopPropagation(); setCurrentChannelIdx(prev => (prev === CHANNELS.length - 1 ? 0 : prev + 1)); }}
                 style={{ background: 'transparent', border: 'none', color: '#38bdf8', cursor: 'pointer', fontSize: '0.6rem', fontWeight: 'bold', padding: '0 4px' }}
             >
                 CH+
             </button>
          </div>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>`;

if (content.indexOf(headerControlsStart) !== -1) {
    content = content.replace(headerControlsStart, newHeaderControls);
}

// 2. ELIMINAR LOS BOTONES ABSOLUTOS QUE TAPAN EL VIDEO
const absoluteButtonsStart = '        {/* Botón de Sonido Flotante - Única área con puntero */}';
const absoluteButtonsEnd = '        </div>';

const startIdx = content.indexOf(absoluteButtonsStart);
if (startIdx !== -1) {
    const endIdx = content.indexOf(absoluteButtonsEnd, startIdx) + absoluteButtonsEnd.length;
    content = content.substring(0, startIdx) + '        <div style={{ pointerEvents: "auto" }}></div>' + content.substring(endIdx);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ SmartTV.jsx controls repositioned to header.');
