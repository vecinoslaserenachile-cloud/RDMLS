import React, { useState, useEffect, useRef } from 'react';
import { 
  X as CloseIcon, Search, Filter, Save, FileText, Download, Play, 
  Target, Activity, Users, Shield, Share2, Printer, 
  MapPin, Brain, Sparkles, Youtube, BarChart3, PieChart, 
  TrendingUp, AlertTriangle, CheckCircle2, MoreHorizontal,
  Plus, Database, Layers, Radar, HelpCircle, Zap, Mail,
  ShieldAlert, Instagram, Music
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const KPIBox = ({ title, value, sub, color = "#00F0FF" }) => (
  <div style={{
    background: 'linear-gradient(180deg, #111 0%, #050505 100%)',
    border: `1px solid ${color}`,
    borderRadius: '16px',
    padding: '1.5rem',
    flex: 1,
    minWidth: '200px',
    textAlign: 'center',
    boxShadow: `0 8px 25px ${color}20`,
    position: 'relative',
    overflow: 'hidden'
  }}>
    <div style={{ color: '#94A3B8', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>{title}</div>
    <div style={{ color: 'white', fontSize: '2.5rem', fontWeight: 900, textShadow: `0 0 15px ${color}60` }}>{value}</div>
    <div style={{ color: color, fontSize: '0.75rem', fontWeight: 'bold', marginTop: '0.5rem' }}>{sub}</div>
    <div style={{ position: 'absolute', top: 0, right: 0, width: '40px', height: '40px', background: `radial-gradient(circle at top right, ${color}30, transparent)`, pointerEvents: 'none' }}></div>
  </div>
);

const SentinelApex = ({ onClose }) => {
  const [goal, setGoal] = useState("Red Vecinos La Serena");
  const [isScanning, setIsScanning] = useState(false);
  const [activeTab, setActiveTab] = useState('estrategia');
  const [data, setData] = useState([]);
  const [metrics, setMetrics] = useState({ menciones: '1.2K', alcance: '124K', engagement: '12K', favorabilidad: '82%' });
  const [reportText, setReportText] = useState("");
  const [sources, setSources] = useState([]);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [audioResult, setAudioResult] = useState(null);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setMetrics({ menciones: '1.5K', alcance: '1.2M', engagement: '24K', favorabilidad: '85%' });
    }, 2500);
  };

  const generateReport = () => {
    setReportText(`INFORME DE INTELIGENCIA SENTINEL - ${goal.toUpperCase()}\nFECHA: ${new Date().toLocaleDateString()}\n====================================================\nRESUMEN: El ecosistema presenta alta actividad positiva en temas de Seguridad y Turismo.`);
  };

  const handleAudioSummary = () => {
    setIsGeneratingAudio(true);
    setAudioResult(null);
    setTimeout(() => {
        setIsGeneratingAudio(false);
        setAudioResult({
            transcript: "¡Wena po! Aquí te traigo el resumen al tiro. Tenemos harta actividad en las redes sobre la seguridad en la Serena bajando un 15%, cachái? La gente está súper prendida con el nuevo Faro Smart y dicen que la cuestión está filete. El Sentinel detectó que el ambiente está piola pero hay que estar ojo al charqui con el tema de las luminarias en el sector centro. ¡Eso sería todo, nos vemos pronto!",
            duration: "01:24",
            speaker: "VLS AI - Voz Chilena Premium"
        });
    }, 3000);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000000, background: '#020617', display: 'flex', color: 'white', fontFamily: "'Montserrat', sans-serif" }}>
      {/* SIDEBAR */}
      <div style={{ width: '320px', background: '#050505', borderRight: '1px solid #222', display: 'flex', flexDirection: 'column' }}>
        <div style={{ height: '220px', background: 'radial-gradient(circle at bottom, #111e36 0%, #000 80%)', position: 'relative', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', borderBottom: '2px solid #00F0FF' }}>
           <div style={{ position: 'absolute', bottom: '10px', width: '100%', textAlign: 'center', color: '#00F0FF', fontWeight: 900, fontSize: '1.2rem', letterSpacing: '4px', zIndex: 11 }}>SENTINEL APEX</div>
           <Radar size={80} color="#00F0FF" className={isScanning ? "animate-spin" : ""} style={{ marginBottom: '50px' }} />
        </div>

        <div style={{ padding: '2rem', flex: 1 }}>
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', color: '#94A3B8', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Objetivo</label>
            <input type="text" value={goal} onChange={e => setGoal(e.target.value)} style={{ width: '100%', background: '#111', border: '1px solid #333', borderRadius: '12px', padding: '1rem', color: 'white', fontWeight: 'bold' }} />
          </div>
          <button onClick={handleScan} style={{ width: '100%', background: 'linear-gradient(90deg, #00F0FF, #0055FF)', color: 'white', border: 'none', borderRadius: '12px', padding: '1.2rem', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem' }}>
            <Radar size={20} /> SCAN NETWORK
          </button>
        </div>
        <div style={{ padding: '1.5rem', textAlign: 'center' }}>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#64748B', cursor: 'pointer' }}><CloseIcon size={32} /></button>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ height: '80px', borderBottom: '1px solid #222', display: 'flex', alignItems: 'center', padding: '0 3rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 900 }}>🛡️ SENTINEL MONITOR: <span style={{ color: '#00F0FF' }}>{goal}</span></h1>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '2rem 3rem' }}>
          <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <KPIBox title="Menciones" value={metrics.menciones} sub="Impactos" color="#00F0FF" />
            <KPIBox title="Alcance" value={metrics.alcance} sub="Potencial" color="#A855F7" />
            <KPIBox title="Engagement" value={metrics.engagement} sub="Interacciones" color="#22C55E" />
          </div>

          <div style={{ display: 'flex', gap: '2rem', borderBottom: '1px solid #222', marginBottom: '2rem' }}>
            {['estrategia', 'socialhub', 'listening', 'reporte'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '1rem', background: 'none', border: 'none', borderBottom: activeTab === tab ? '3px solid #00F0FF' : 'none', color: activeTab === tab ? '#00F0FF' : '#555', fontWeight: 'bold', cursor: 'pointer', textTransform: 'uppercase' }}>
                {tab === 'listening' ? 'Smart Listening 🎧' : tab}
              </button>
            ))}
          </div>

          {activeTab === 'estrategia' && (
             <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem' }}>
                <div style={{ background: 'rgba(0,0,0,0.5)', borderRadius: '24px', padding: '2rem', border: '1px solid #222' }}>
                   <h3 style={{ marginTop: 0, marginBottom: '2rem' }}>ECOSISTEMA VLS</h3>
                   <div style={{ height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                      <div style={{ width: '280px', height: '280px', borderRadius: '50%', border: '15px solid rgba(0, 240, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                         <div style={{ width: '200px', height: '200px', borderRadius: '50%', border: '25px solid rgba(168, 85, 247, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ width: '120px', height: '120px', borderRadius: '50%', border: '20px solid rgba(34, 197, 94, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                               <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'cyan', boxShadow: '0 0 20px cyan' }}></div>
                            </div>
                         </div>
                         <div style={{ position: 'absolute', top: '20px', right: '20px', background: 'cyan', color: 'black', padding: '4px 10px', borderRadius: '10px', fontSize: '0.7rem', fontWeight: 'bold' }}>COMUNA 45%</div>
                      </div>
                   </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                   <div style={{ background: 'rgba(0,0,0,0.5)', borderRadius: '24px', padding: '2rem', border: '1px solid #222' }}>
                      <h3 style={{ marginTop: 0, marginBottom: '1.5rem' }}>MATRIZ DE TEMAS (Treemap)</h3>
                      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gridTemplateRows: '1fr 1fr', gap: '10px', height: '200px' }}>
                         <div style={{ gridRow: 'span 2', background: 'rgba(0, 240, 255, 0.2)', border: '1px solid cyan', borderRadius: '12px', padding: '15px' }}>SEGURIDAD</div>
                         <div style={{ background: 'rgba(168, 85, 247, 0.2)', border: '1px solid #A855F7', borderRadius: '12px', padding: '10px' }}>TURISMO</div>
                         <div style={{ background: 'rgba(34, 197, 94, 0.2)', border: '1px solid #22C55E', borderRadius: '12px', padding: '10px' }}>OBRAS</div>
                      </div>
                   </div>
                </div>
             </div>
          )}

          {activeTab === 'listening' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                 {/* Sources Column */}
                 <div style={{ background: 'rgba(15, 23, 42, 0.5)', borderRadius: '24px', padding: '2rem', border: '1px solid #1e40af' }}>
                    <h3 style={{ marginTop: 0, color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Database size={20} /> FUENTES TECNITAS (NotebookLM-Style)
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Arrastra tus reportes (.pdf, .txt, .mp3) para que la IA los analice.</p>
                    
                    <div style={{ border: '2px dashed #1e40af', borderRadius: '15px', padding: '3rem', textAlign: 'center', background: 'rgba(30, 58, 138, 0.1)', marginBottom: '1.5rem' }}>
                        <Plus size={48} color="#1e40af" style={{ opacity: 0.5, marginBottom: '1rem' }} />
                        <div style={{ fontSize: '0.9rem', color: '#60a5fa' }}>Agregar Fuentes de Inteligencia</div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {['Reporte_Vecinal_Marzo.pdf', 'Minutos_Concejo_VLS.docx', 'Video_Faro_IA.mp4'].map((file, i) => (
                            <div key={i} style={{ background: '#0f172a', padding: '10px 15px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8rem', border: '1px solid #1e293b' }}>
                                <FileText size={16} color="#3b82f6" /> {file}
                            </div>
                        ))}
                    </div>
                 </div>

                 {/* Audio Control Column */}
                 <div style={{ background: 'rgba(15, 23, 42, 0.8)', borderRadius: '24px', padding: '2rem', border: '1px solid #00F0FF', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                    <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'linear-gradient(45deg, #1e3a8a, #00F0FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', boxShadow: '0 0 40px rgba(0, 240, 255, 0.3)' }}>
                        <Brain size={60} color="white" className={isGeneratingAudio ? "animate-pulse" : ""} />
                    </div>
                    
                    <h3 style={{ margin: '0 0 1rem 0' }}>REDI RADIO VLS: SMART SUMMARY</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '2rem' }}>Generar resumen de audio con estilo chileno auténtico y análisis profundo.</p>

                    <button 
                        onClick={handleAudioSummary}
                        disabled={isGeneratingAudio}
                        style={{ background: '#00F0FF', color: '#000', border: 'none', padding: '15px 40px', borderRadius: '50px', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 10px 20px rgba(0, 240, 255, 0.2)' }}
                    >
                        {isGeneratingAudio ? "PENSANDO COMO CHILENO..." : "GENERAR RESUMEN CL"} <Zap size={18} fill="black" />
                    </button>

                    {audioResult && (
                        <div style={{ marginTop: '2rem', background: '#000', padding: '1.5rem', borderRadius: '15px', width: '100%', border: '1px solid #334155' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                                <div style={{ background: '#22c55e', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Play size={20} color="white" />
                                </div>
                                <div style={{ textAlign: 'left' }}>
                                    <div style={{ fontSize: '0.8rem', color: '#22c55e', fontWeight: 'bold' }}>LISTO PARA ESCUCHAR</div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{audioResult.speaker} ({audioResult.duration})</div>
                                </div>
                            </div>
                            <p style={{ fontSize: '0.85rem', color: '#94a3b8', fontStyle: 'italic', textAlign: 'left', lineHeight: '1.4' }}>
                                "{audioResult.transcript}"
                            </p>
                        </div>
                    )}
                 </div>
              </div>
          )}
          
          {activeTab === 'socialhub' && (
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                <div style={{ background: '#111', padding: '2rem', borderRadius: '24px', border: '1px solid #333' }}>
                   <h3 style={{ color: '#e1306c' }}><Instagram /> Instagram</h3>
                   <p>Trending: #LaSerenaSmart</p>
                </div>
                <div style={{ background: '#111', padding: '2rem', borderRadius: '24px', border: '1px solid #333' }}>
                   <h3 style={{ color: '#fff' }}><Music /> TikTok</h3>
                   <p>Vistas: 124K</p>
                </div>
                <div style={{ background: '#111', padding: '2rem', borderRadius: '24px', border: '1px solid #333' }}>
                   <h3 style={{ color: '#ff0000' }}><Youtube /> YouTube</h3>
                   <p>Live: Sesión Concejo</p>
                </div>
             </div>
          )}

          {activeTab === 'tactico' && (
             <div style={{ height: '500px', borderRadius: '24px', overflow: 'hidden' }}>
                <MapContainer center={[-29.9027, -71.2519]} zoom={13} style={{ height: '100%' }}>
                   <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
                </MapContainer>
             </div>
          )}

          {activeTab === 'reporte' && (
             <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <button onClick={generateReport} style={{ background: 'cyan', color: 'black', padding: '1rem', borderRadius: '12px', fontWeight: 'bold', border: 'none' }}>GENERAR REPORTE</button>
                <textarea value={reportText} style={{ height: '300px', background: '#000', border: '1px solid #333', color: 'cyan', padding: '1rem', borderRadius: '12px' }} readOnly />
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SentinelApex;
