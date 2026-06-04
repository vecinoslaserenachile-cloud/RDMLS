import React, { useState, useEffect, useRef } from 'react';
import { 
  X as CloseIcon, Search, Filter, Save, FileText, Download, Play, Pause,
  Target, Activity, Users, Shield, Share2, Printer, 
  MapPin, Brain, Sparkles, Youtube, BarChart3, PieChart, 
  TrendingUp, AlertTriangle, CheckCircle2, MoreHorizontal,
  Plus, Database, Layers, Radar, HelpCircle, Zap, Mail,
  ShieldAlert, Instagram, Music, Facebook, Smile, MessageCircle, Volume2, Twitter, Radio
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default marker icons for React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Initial mock data for social tracking
const initialFacebookPosts = [
  {
    id: 'fb-1',
    author: "Ilustre Municipalidad de La Serena",
    handle: "@MuniLaSerena",
    time: "Hace 2 horas",
    avatar: "IMLS",
    text: "📣 Vecino y vecina: Recuerda que puedes realizar tu trámite de Permiso de Circulación 100% online y de forma segura. ¡Evita filas! Tu aporte financia más obras en nuestra comuna. 🚗✨ #LaSerena",
    likes: 580,
    shares: 112,
    comments: [
      { id: 'fb-c1', author: "Carmen Gloria", handle: "@carmen_gloria", text: "Excelente servicio online, me demoré 5 minutos en pagar." },
      { id: 'fb-c2', author: "Raúl P.", handle: "@raul_p", text: "¡Súper expedito! Gracias por habilitar WebPay." }
    ]
  },
  {
    id: 'fb-2',
    author: "Seguridad Ciudadana La Serena",
    handle: "@SeguridadVLS",
    time: "Hace 5 horas",
    avatar: "SC",
    text: "🚨 OPERATIVO IN SITU: En conjunto con Carabineros de Chile, realizamos patrullaje preventivo en el sector de La Pampa. Mantengamos nuestra Serena segura. Reporta emergencias al 1420. 🛡️🚶‍♂️",
    likes: 290,
    shares: 45,
    comments: [
      { id: 'fb-c3', author: "Marta E.", handle: "@marta_e", text: "Excelente iniciativa, se les ve harto por acá. Sigan así!" },
      { id: 'fb-c4', author: "Jorge Valdivia", handle: "@jorge_v", text: "Falta más iluminación en el pasaje Los Gladiolos, por favor." }
    ]
  }
];

const initialTwitterPosts = [
  {
    id: 'tw-1',
    author: "Juan Gómez",
    handle: "@LaSerena_Vecino",
    time: "Hace 45 min",
    avatar: "JG",
    text: "Ojo, luminaria apagada en sector Larraín Alcalde con Huanhualí. Es un peligro para los que volvemos del trabajo de noche. @munilaserena ayuda por favor!",
    likes: 24,
    shares: 8,
    comments: [
      { id: 'tw-c1', author: "Municipalidad La Serena", handle: "@munilaserena", text: "Hola Juan, tomamos nota para derivar el reporte a Alumbrado Público hoy mismo." },
      { id: 'tw-c2', author: "Carlos V.", handle: "@coke_vls", text: "Lleva un par de días así, ojalá lo arreglen rápido." }
    ]
  },
  {
    id: 'tw-2',
    author: "Andrea Soto",
    handle: "@Andrea_Serena",
    time: "Hace 3 horas",
    avatar: "AS",
    text: "Felicitaciones por la feria de emprendedores en la Plaza de Armas. Muy ordenada y con excelente seguridad. Apoyemos el comercio local! 👏🍲🛍️",
    likes: 142,
    shares: 34,
    comments: [
      { id: 'tw-c3', author: "Serenito", handle: "@serenito_vls", text: "¡Muchas gracias Andrea! Cuidamos cada espacio para que las familias disfruten tranquilas." }
    ]
  }
];

const initialInstagramPosts = [
  {
    id: 'ig-1',
    author: "Turismo La Serena",
    handle: "@turismolaserena",
    time: "Hace 2 horas",
    avatar: "TLS",
    text: "Avenida del Mar se prepara para recibir a miles de visitantes este invierno. Monitoreo constante con el Faro Inteligente. 🌴☀️🌊 #LaSerena #TurismoSeguro #FaroMonumental",
    likes: 342,
    comments: [
      { id: 'ig-c1', author: "valeska.perez", handle: "@valeska", text: "Me encanta ir a caminar por allá los fines de semana!" },
      { id: 'ig-c2', author: "claudio_viajes", handle: "@claudio", text: "Excelente la seguridad en el sector de las letras de La Serena." }
    ]
  }
];

const initialTikTokPosts = [
  {
    id: 'tk-1',
    author: "Serenito Seguridad",
    handle: "@serenito_vls",
    time: "Hace 1 día",
    avatar: "SS",
    text: "¡Haciendo patrullaje inteligente con la comunidad! Reporta en la Ventanilla Única y cuidémonos entre todos. 🛡️🚶‍♂️ #SmartCity #LaSerena #SeguridadVecinal",
    likes: 1250,
    comments: [
      { id: 'tk-c1', author: "pipe.rojas", handle: "@pipe", text: "Aguante el Serenito, gran ayuda para la comuna!" },
      { id: 'tk-c2', author: "antonia_l", handle: "@antonia", text: "El avatar en 3D quedó genial, muy institucional y tierno." }
    ]
  }
];

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
    overflow: 'hidden',
    transition: 'all 0.3s ease'
  }} className="hover:translate-y-[-2px] hover:shadow-lg">
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
  const [metrics, setMetrics] = useState({ menciones: 1200, alcance: 124000, engagement: 12000 });
  const [reportText, setReportText] = useState("");
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [audioResult, setAudioResult] = useState(null);

  // States for campaign audio playback
  const [playingCamp, setPlayingCamp] = useState(null); // 'permisos', 'ingles', 'live', or null
  const [isCampPlaying, setIsCampPlaying] = useState(false);
  const [campProgress, setCampProgress] = useState(0);
  const [campDuration, setCampDuration] = useState(0);
  const [campCurrentTime, setCampCurrentTime] = useState(0);
  const campAudioRef = useRef(null);

  // States for social feeds
  const [socialPlatform, setSocialPlatform] = useState('facebook');
  const [socialPosts, setSocialPosts] = useState([]);
  const [loadingSocial, setLoadingSocial] = useState(false);
  const [likedPosts, setLikedPosts] = useState({});
  const [expandedComments, setExpandedComments] = useState({});
  
  // Resizing state
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch / Sync Social Media tracking data
  useEffect(() => {
    setLoadingSocial(true);
    const timer = setTimeout(() => {
      let fetchedData = [];
      if (socialPlatform === 'twitter') {
        fetchedData = [...initialTwitterPosts];
      } else if (socialPlatform === 'facebook') {
        fetchedData = [...initialFacebookPosts];
      } else if (socialPlatform === 'instagram') {
        fetchedData = [...initialInstagramPosts];
      } else if (socialPlatform === 'tiktok') {
        fetchedData = [...initialTikTokPosts];
      }
      setSocialPosts(fetchedData);
      setLoadingSocial(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [socialPlatform]);

  const handleScan = () => {
    setIsScanning(true);
    setMetrics({ menciones: 0, alcance: 0, engagement: 0 });
    
    setTimeout(() => {
      setIsScanning(false);
      
      let mencionesTarget = 1500;
      let alcanceTarget = 1240000;
      let engagementTarget = 24000;
      
      let duration = 1500; // 1.5 seconds count up
      let startTime = null;
      
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        
        setMetrics({
          menciones: Math.floor(progress * mencionesTarget),
          alcance: Math.floor(progress * alcanceTarget),
          engagement: Math.floor(progress * engagementTarget)
        });
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }, 2000);
  };

  const playCampaignAudio = (id, src) => {
    if (!campAudioRef.current) return;
    
    if (playingCamp === id) {
      if (isCampPlaying) {
        campAudioRef.current.pause();
        setIsCampPlaying(false);
      } else {
        campAudioRef.current.play().catch(() => {});
        setIsCampPlaying(true);
      }
    } else {
      setPlayingCamp(id);
      setCampProgress(0);
      setCampCurrentTime(0);
      setCampDuration(0);
      campAudioRef.current.src = src;
      campAudioRef.current.load();
      campAudioRef.current.play()
        .then(() => setIsCampPlaying(true))
        .catch((e) => {
          console.error("Audio playback error:", e);
          setIsCampPlaying(false);
        });
    }
  };

  const handleSeek = (e, id) => {
    if (playingCamp !== id || !campAudioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = clickX / width;
    if (campAudioRef.current.duration) {
      campAudioRef.current.currentTime = percentage * campAudioRef.current.duration;
      setCampProgress(percentage * 100);
      setCampCurrentTime(campAudioRef.current.currentTime);
    }
  };

  const handleAudioSummary = () => {
    setIsGeneratingAudio(true);
    setTimeout(() => {
      setIsGeneratingAudio(false);
      setAudioResult({
        transcript: "¡Estimados vecinos! Sentinel Apex reporta altos índices de participación ciudadana en el portal. Las menciones territoriales indican preocupación por alumbrado en Av. Larraín Alcalde, y una gran recepción a las postulaciones de Talleres de Inglés e-Learning. El ecosistema se mantiene estable y seguro.",
        duration: "00:48",
        speaker: "VLS AI - Voz Municipal Premium"
      });
    }, 2500);
  };

  const handleGenerateReport = () => {
    setIsGeneratingReport(true);
    setReportText("");
    setTimeout(() => {
      setIsGeneratingReport(false);
      setReportText(`=======================================================
REPORTE OFICIAL SENTINEL APEX: INTELIGENCIA DE ESCUCHA SOCIAL
=======================================================
Fecha de Generación: ${new Date().toLocaleDateString()}
Objetivo: ${goal}
Estado Ecosistema: ESTABLE (Favorabilidad 85%)

1. SÍNTESIS DE MONITOREO
-------------------------------------------------------
- Total Menciones Detectadas: 1.5K impactos territoriales.
- Alcance Neto Estimado: 1.24M impresiones en plataformas digitales.
- Tasa de Engagement: 12% (nivel de interacción destacado).

2. DESGLOSE DE TEMAS DE INTERÉS VECINAL
-------------------------------------------------------
A. Seguridad Ciudadana (68% de relevancia):
   - Reporte activo de baches y luminarias en el cuadrante Av. Larraín Alcalde con Huanhualí.
   - Percepción muy favorable del patrullaje in situ y la labor de "Serenito" en el sector de La Pampa.

B. Turismo Municipal (18% de relevancia):
   - Alta difusión de actividades invernales y seguridad en la Avenida del Mar apoyada por el Faro Monumental.

C. Obras y Emprendimiento (14% de relevancia):
   - Muy buena recepción al despliegue de las ferias de emprendimiento local en la Plaza de Armas.

3. DESPLIEGUE DE CAMPAÑAS RADIALES
-------------------------------------------------------
- Campaña 1: Permisos de Circulación 2026 (Spot Institucional en reproducción)
- Campaña 2: Talleres de Inglés E-Learning (Acceso digital en inducción previa)

Reporte consolidado para la toma de decisiones territoriales de la Ilustre Municipalidad de La Serena.
=======================================================`);
    }, 1500);
  };

  const handleLikePost = (postId) => {
    setLikedPosts(prev => {
      const isLiked = !prev[postId];
      setSocialPosts(currentPosts => currentPosts.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            likes: isLiked ? p.likes + 1 : p.likes - 1
          };
        }
        return p;
      }));
      return {
        ...prev,
        [postId]: isLiked
      };
    });
  };

  const toggleComments = (postId) => {
    setExpandedComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const formatK = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds) || timeInSeconds === 0) return "0:00";
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const mapMarkers = [
    { id: 1, title: "Faro Monumental (C5)", pos: [-29.9027, -71.2519], desc: "Nodo principal de seguridad urbana y visualización satelital." },
    { id: 2, title: "Edificio Consistorial", pos: [-29.9015, -71.2492], desc: "Centro de operaciones y despacho administrativo municipal." },
    { id: 3, title: "Estación de Patrullaje Drones", pos: [-29.9001, -71.2555], desc: "Monitoreo preventivo aéreo en el borde costero." },
    { id: 4, title: "Antena Transmisora RDMLS", pos: [-29.9100, -71.2400], desc: "Difusión de la señal de Radio Digital Municipal La Serena." }
  ];

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000000, background: '#020617', display: 'flex', color: 'white', fontFamily: "'Montserrat', sans-serif" }}>
      
      {/* Dynamic styles injection for animated sound waveform */}
      <style>{`
        @keyframes wave-bounce {
          0%, 100% { transform: scaleY(0.15); }
          50% { transform: scaleY(1); }
        }
        .wave-bar {
          width: 3px;
          height: 24px;
          background-color: #00F0FF;
          border-radius: 2px;
          transform-origin: bottom;
          transition: transform 0.2s ease;
        }
        .wave-active {
          animation: wave-bounce 1s ease-in-out infinite;
        }
        .wave-active:nth-child(2) { animation-delay: 0.1s; }
        .wave-active:nth-child(3) { animation-delay: 0.25s; }
        .wave-active:nth-child(4) { animation-delay: 0.4s; }
        .wave-active:nth-child(5) { animation-delay: 0.15s; }
        .wave-active:nth-child(6) { animation-delay: 0.3s; }
        .wave-active:nth-child(7) { animation-delay: 0.2s; }
        .wave-active:nth-child(8) { animation-delay: 0.05s; }
        .wave-active:nth-child(9) { animation-delay: 0.35s; }
        .wave-active:nth-child(10) { animation-delay: 0.12s; }
        .wave-active:nth-child(11) { animation-delay: 0.22s; }
        .wave-active:nth-child(12) { animation-delay: 0.08s; }
      `}</style>

      {/* Sidebar Panel */}
      <div style={{ width: '320px', background: '#050505', borderRight: '1px solid #222', display: 'flex', flexDirection: 'column' }}>
        <div style={{ height: '220px', background: 'radial-gradient(circle at bottom, #111e36 0%, #000 80%)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderBottom: '2px solid #00F0FF' }}>
           <div style={{ position: 'absolute', bottom: '15px', width: '100%', textAlign: 'center', color: '#00F0FF', fontWeight: 900, fontSize: '1.2rem', letterSpacing: '4px', zIndex: 11 }}>SENTINEL APEX</div>
           
           {/* Modern Humanized 3D Character (Serenito in 3D style badge) */}
           <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', border: '3px solid #00F0FF', boxShadow: '0 0 20px rgba(0, 240, 255, 0.4)', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '15px', transition: 'all 0.3s ease' }} className="hover:scale-105">
             <img src="/serenito_security_guard_close_up_1773392164475.png" alt="Serenito 3D" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
           </div>
        </div>
        
        <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', color: '#94A3B8', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.5px' }}>Objetivo Territorial</label>
            <input type="text" value={goal} onChange={e => setGoal(e.target.value)} style={{ width: '100%', background: '#111', border: '1px solid #333', borderRadius: '12px', padding: '1rem', color: 'white', fontWeight: 'bold', fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.3s' }} className="focus:border-cyan-500" />
          </div>
          
          <button 
            onClick={handleScan} 
            disabled={isScanning}
            style={{ width: '100%', background: isScanning ? '#222' : 'linear-gradient(90deg, #00F0FF, #0055FF)', color: isScanning ? '#666' : 'white', border: 'none', borderRadius: '12px', padding: '1.2rem', fontWeight: 900, cursor: isScanning ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem', boxShadow: isScanning ? 'none' : '0 4px 15px rgba(0, 240, 255, 0.25)', transition: 'all 0.3s ease' }}
            className="hover:opacity-90"
          >
            <Radar size={20} className={isScanning ? "animate-spin" : ""} style={{ color: isScanning ? '#555' : 'white' }} /> 
            {isScanning ? "ESCANEANDO RED..." : "SCAN NETWORK"}
          </button>

          {isScanning && (
            <div style={{ width: '100%', background: '#111', height: '6px', borderRadius: '3px', overflow: 'hidden', position: 'relative' }}>
              <div style={{ position: 'absolute', height: '100%', background: '#00F0FF', borderRadius: '3px', animation: 'pulse 1s infinite', width: '100%' }}></div>
            </div>
          )}
        </div>
        
        {/* Sidebar Close Button */}
        <div style={{ padding: '1.5rem', textAlign: 'center', borderTop: '1px solid #111' }}>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#64748B', cursor: 'pointer', transition: 'color 0.3s' }} className="hover:text-red-500" title="Cerrar Sentinel Monitor">
            <CloseIcon size={32} />
          </button>
        </div>
      </div>

      {/* Main Monitoring Screen */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        
        {/* Top Header */}
        <div style={{ height: '80px', borderBottom: '1px solid #222', display: 'flex', alignItems: 'center', justifySelf: 'stretch', padding: '0 3rem', background: '#030712', justifyContent: 'space-between' }}>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '0.5rem', letterSpacing: '0.5px' }}>
            🛡️ SENTINEL MONITOR: <span style={{ color: '#00F0FF', textShadow: '0 0 10px rgba(0, 240, 255, 0.3)' }}>{goal}</span>
          </h1>
          <div style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid #22c55e', color: '#22c55e', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', background: '#22c55e', borderRadius: '50%', display: 'inline-block', animation: 'pulse 1.5s infinite' }}></span>
            SISTEMA ACTIVO
          </div>
        </div>

        {/* Outer Scroll Container */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '2.5rem 3rem', background: 'linear-gradient(180deg, #090d16 0%, #020617 100%)' }}>
          
          {/* KPI Dashboard */}
          <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
            <KPIBox title="Menciones Detectadas" value={formatK(metrics.menciones)} sub="Impactos Registrados" color="#00F0FF" />
            <KPIBox title="Alcance Potencial" value={formatK(metrics.alcance)} sub="Visualizaciones Estimadas" color="#A855F7" />
            <KPIBox title="Engagement Ciudadano" value={formatK(metrics.engagement)} sub="Interacciones Activas" color="#22C55E" />
          </div>

          {/* Navigation Tab Bar */}
          <div style={{ display: 'flex', gap: '1.5rem', borderBottom: '1px solid #222', marginBottom: '2rem', overflowX: 'auto', whiteSpace: 'nowrap' }} className="no-scrollbar">
            {[
              { id: 'estrategia', label: 'Estrategia Territorial' },
              { id: 'socialhub', label: 'Social Hub Feed' },
              { id: 'listening', label: 'Smart Listening 🎧' },
              { id: 'tactico', label: 'Mapa Táctico 🗺️' },
              { id: 'reporte', label: 'Generar Reporte' }
            ].map(tab => (
              <button 
                key={tab.id} 
                onClick={() => setActiveTab(tab.id)} 
                style={{ 
                  padding: '1rem 0.5rem', 
                  background: 'none', 
                  border: 'none', 
                  borderBottom: activeTab === tab.id ? '3px solid #00F0FF' : '3px solid transparent', 
                  color: activeTab === tab.id ? '#00F0FF' : '#64748b', 
                  fontWeight: 'bold', 
                  fontSize: '0.9rem',
                  cursor: 'pointer', 
                  textTransform: 'uppercase', 
                  letterSpacing: '1px',
                  transition: 'all 0.3s ease'
                }}
                className="hover:text-white"
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: ESTRATEGIA (Ecosistema & Treemap Matriz de Temas) */}
          {activeTab === 'estrategia' && (
             <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr', gap: '2rem' }}>
                
                {/* Concentric Circle Ecosistema VLS */}
                <div style={{ background: 'rgba(5, 5, 5, 0.7)', borderRadius: '24px', padding: '2rem', border: '1px solid #222', display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative' }}>
                   <h3 style={{ marginTop: 0, fontSize: '1.1rem', fontWeight: '900', letterSpacing: '1.5px', color: '#94a3b8' }}>ECOSISTEMA VLS</h3>
                   
                   <div style={{ position: 'relative', height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                     {/* Outer Ring */}
                     <div style={{
                       position: 'absolute',
                       width: '260px',
                       height: '260px',
                       borderRadius: '50%',
                       border: '2px solid rgba(0, 240, 255, 0.1)',
                       background: 'rgba(0, 240, 255, 0.01)',
                       display: 'flex',
                       justifyContent: 'center',
                       alignItems: 'center',
                       boxShadow: '0 0 40px rgba(0, 240, 255, 0.02)'
                     }}>
                       {/* Middle Ring */}
                       <div style={{
                         width: '200px',
                         height: '200px',
                         borderRadius: '50%',
                         border: '2px solid rgba(168, 85, 247, 0.15)',
                         background: 'rgba(168, 85, 247, 0.02)',
                         display: 'flex',
                         justifyContent: 'center',
                         alignItems: 'center'
                       }}>
                         {/* Inner Ring */}
                         <div style={{
                           width: '140px',
                           height: '140px',
                           borderRadius: '50%',
                           border: '2px solid rgba(34, 197, 94, 0.15)',
                           background: 'rgba(34, 197, 94, 0.02)',
                           display: 'flex',
                           justifyContent: 'center',
                           alignItems: 'center'
                         }}>
                           {/* Center Solid Orb */}
                           <div style={{
                             width: '70px',
                             height: '70px',
                             borderRadius: '50%',
                             background: 'radial-gradient(circle, #00f0ff 0%, #0055ff 100%)',
                             boxShadow: '0 0 25px rgba(0, 240, 255, 0.6)',
                             display: 'flex',
                             justifyContent: 'center',
                             alignItems: 'center'
                           }}>
                             <Radar size={28} color="#000" />
                           </div>
                         </div>
                       </div>
                     </div>
                     
                     {/* Concentric Pill Badge */}
                     <div style={{
                       position: 'absolute',
                       top: '25px',
                       right: '35px',
                       background: '#00F0FF',
                       color: '#000',
                       fontSize: '0.75rem',
                       fontWeight: '900',
                       padding: '5px 14px',
                       borderRadius: '20px',
                       boxShadow: '0 0 15px rgba(0, 240, 255, 0.5)',
                       letterSpacing: '0.5px'
                     }}>
                       COMUNA 45%
                     </div>
                   </div>
                   
                   <p style={{ color: '#64748b', fontSize: '0.8rem', textAlign: 'center', margin: 0 }}>
                     * Representación concéntrica de alcance e impacto territorial por cuadrantes municipales.
                   </p>
                </div>

                {/* Theme Matriz de Temas (Treemap) */}
                <div style={{ background: 'rgba(5, 5, 5, 0.7)', borderRadius: '24px', padding: '2rem', border: '1px solid #222', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                   <h3 style={{ marginTop: 0, fontSize: '1.1rem', fontWeight: '900', letterSpacing: '1.5px', color: '#94a3b8' }}>MATRIZ DE TEMAS (Treemap)</h3>
                   
                   <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '1rem', height: '300px' }}>
                     {/* SEGURIDAD */}
                     <div style={{
                       border: '1px solid #00F0FF',
                       background: 'rgba(0, 240, 255, 0.04)',
                       borderRadius: '16px',
                       padding: '1.5rem',
                       position: 'relative',
                       display: 'flex',
                       flexDirection: 'column',
                       justifyContent: 'space-between',
                       cursor: 'pointer',
                       transition: 'all 0.3s ease',
                       boxShadow: 'inset 0 0 20px rgba(0, 240, 255, 0.05)'
                     }} className="hover:scale-[1.02] hover:bg-cyan-950/20">
                       <span style={{ fontSize: '0.9rem', fontWeight: '900', color: '#00F0FF', letterSpacing: '1px' }}>SEGURIDAD</span>
                       <div style={{ alignSelf: 'flex-end', fontSize: '2.5rem', fontWeight: '900', color: 'white' }}>68%</div>
                     </div>
                     
                     <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: '1rem' }}>
                       {/* TURISMO */}
                       <div style={{
                         border: '1px solid #A855F7',
                         background: 'rgba(168, 85, 247, 0.04)',
                         borderRadius: '16px',
                         padding: '1rem',
                         display: 'flex',
                         flexDirection: 'column',
                         justifyContent: 'space-between',
                         cursor: 'pointer',
                         transition: 'all 0.3s ease',
                         boxShadow: 'inset 0 0 15px rgba(168, 85, 247, 0.05)'
                       }} className="hover:scale-[1.02] hover:bg-purple-950/20">
                         <span style={{ fontSize: '0.8rem', fontWeight: '900', color: '#A855F7', letterSpacing: '1px' }}>TURISMO</span>
                         <div style={{ alignSelf: 'flex-end', fontSize: '1.5rem', fontWeight: '900', color: 'white' }}>18%</div>
                       </div>
                       
                       {/* OBRAS */}
                       <div style={{
                         border: '1px solid #22C55E',
                         background: 'rgba(34, 197, 94, 0.04)',
                         borderRadius: '16px',
                         padding: '1rem',
                         display: 'flex',
                         flexDirection: 'column',
                         justifyContent: 'space-between',
                         cursor: 'pointer',
                         transition: 'all 0.3s ease',
                         boxShadow: 'inset 0 0 15px rgba(34, 197, 94, 0.05)'
                       }} className="hover:scale-[1.02] hover:bg-green-950/20">
                         <span style={{ fontSize: '0.8rem', fontWeight: '900', color: '#22C55E', letterSpacing: '1px' }}>OBRAS</span>
                         <div style={{ alignSelf: 'flex-end', fontSize: '1.5rem', fontWeight: '900', color: 'white' }}>14%</div>
                       </div>
                     </div>
                   </div>
                   
                   <p style={{ color: '#64748b', fontSize: '0.8rem', margin: 0 }}>
                     * Clasificación por algoritmos de procesamiento lingüístico de reportes ciudadanos de La Serena.
                   </p>
                </div>

             </div>
          )}

          {/* TAB 2: SOCIAL HUB FEED */}
          {activeTab === 'socialhub' && (
             <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'minmax(250px, 1fr) 2.5fr', gap: '2rem' }}>
                {/* Platform Selector buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                   {[
                      { id: 'facebook', name: 'Facebook', icon: <Facebook size={16} />, color: '#1877F2' },
                      { id: 'twitter', name: 'Twitter (X)', icon: <Twitter size={16} />, color: '#1DA1F2' },
                      { id: 'instagram', name: 'Instagram', icon: <Instagram size={16} />, color: '#E1306C' },
                      { id: 'tiktok', name: 'TikTok', icon: <Music size={16} />, color: '#00F0FF' }
                   ].map(p => (
                      <button 
                        key={p.id} 
                        onClick={() => setSocialPlatform(p.id)} 
                        style={{ 
                          padding: '1rem', 
                          borderRadius: '12px', 
                          background: socialPlatform === p.id ? p.color : 'rgba(255,255,255,0.03)', 
                          color: socialPlatform === p.id ? '#000' : 'white', 
                          fontWeight: '800',
                          border: 'none', 
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.8rem',
                          boxShadow: socialPlatform === p.id ? `0 4px 15px ${p.color}40` : 'none',
                          transition: 'all 0.3s ease'
                        }}
                        className="hover:scale-[1.02]"
                      >
                         {p.icon}
                         {p.name}
                      </button>
                   ))}
                </div>
                
                {/* Social Posts Display Feed */}
                <div style={{ background: 'rgba(5, 5, 5, 0.7)', borderRadius: '24px', padding: '2rem', border: '1px solid #222', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                   <h3 style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '1.1rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Activity size={18} /> Rastreador Social: {socialPlatform}
                   </h3>
                   
                   {loadingSocial ? (
                     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '3rem', gap: '1rem', color: '#64748b' }}>
                       <Radar size={40} className="animate-spin text-cyan-500" />
                       <span>Procesando fuentes de red...</span>
                     </div>
                   ) : (
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                       {socialPosts.map(post => (
                         <div key={post.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid #222', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                           
                           {/* User Profile Info Header */}
                           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                             <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                               <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#222', border: '1px solid #444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#00F0FF' }}>
                                 {post.avatar}
                               </div>
                               <div>
                                 <div style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>{post.author}</div>
                                 <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{post.handle} • {post.time}</div>
                               </div>
                             </div>
                             <MoreHorizontal size={18} style={{ color: '#64748b', cursor: 'pointer' }} />
                           </div>

                           {/* Content Text */}
                           <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.5', color: '#e2e8f0' }}>{post.text}</p>

                           {/* Interactive Counters */}
                           <div style={{ display: 'flex', gap: '2rem', borderTop: '1px solid #111', paddingTop: '0.8rem', fontSize: '0.8rem', color: '#64748b' }}>
                             <button 
                               onClick={() => handleLikePost(post.id)}
                               style={{ background: 'none', border: 'none', color: likedPosts[post.id] ? '#ef4444' : '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 'bold' }}
                             >
                               <Smile size={16} /> Me gusta ({post.likes})
                             </button>
                             <button 
                               onClick={() => toggleComments(post.id)}
                               style={{ background: 'none', border: 'none', color: expandedComments[post.id] ? '#00F0FF' : '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 'bold' }}
                             >
                               <MessageCircle size={16} /> Comentarios ({post.comments?.length || 0})
                             </button>
                           </div>

                           {/* Nested Citizen Comments Section */}
                           {expandedComments[post.id] && post.comments && (
                             <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', borderLeft: '2px solid #333', paddingLeft: '1rem', marginTop: '0.5rem', background: 'rgba(0,0,0,0.1)', padding: '10px 15px', borderRadius: '8px' }}>
                               {post.comments.map(c => (
                                 <div key={c.id} style={{ fontSize: '0.85rem' }}>
                                   <span style={{ fontWeight: 'bold', color: '#00F0FF', marginRight: '6px' }}>{c.author}</span>
                                   <span style={{ color: '#cbd5e1' }}>{c.text}</span>
                                 </div>
                               ))}
                             </div>
                           )}

                         </div>
                       ))}
                     </div>
                   )}
                </div>
             </div>
          )}

          {/* TAB 3: SMART LISTENING & RADIO CAMPAIGNS */}
          {activeTab === 'listening' && (
             <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr', gap: '2rem' }}>
                   
                   {/* Technical Sources Card */}
                   <div style={{ background: 'rgba(5, 5, 5, 0.7)', borderRadius: '24px', padding: '2rem', border: '1px solid #1e40af' }}>
                      <h3 style={{ marginTop: 0, color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem' }}>
                        <Database size={18} /> FUENTES TÉCNICAS ACTIVAS
                      </h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem', fontSize: '0.85rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #111', paddingBottom: '6px' }}>
                          <span style={{ color: '#64748b' }}>Streaming IP (RDMLS)</span>
                          <span style={{ color: '#22c55e', fontWeight: 'bold' }}>CONECTADO</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #111', paddingBottom: '6px' }}>
                          <span style={{ color: '#64748b' }}>Detector de Silencio</span>
                          <span style={{ color: '#22c55e', fontWeight: 'bold' }}>STANDBY</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #111', paddingBottom: '6px' }}>
                          <span style={{ color: '#64748b' }}>Módulo de Transcripción (AI)</span>
                          <span style={{ color: '#a855f7', fontWeight: 'bold' }}>ESCUCHANDO</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px' }}>
                          <span style={{ color: '#64748b' }}>Filtro de Ruido de Banda</span>
                          <span style={{ color: '#22c55e', fontWeight: 'bold' }}>ACTIVO</span>
                        </div>
                      </div>
                   </div>

                   {/* AI Radio Summary Card */}
                   <div style={{ background: 'rgba(5, 5, 5, 0.8)', borderRadius: '24px', padding: '2rem', border: '1px solid #00F0FF', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <h3 style={{ margin: 0, color: '#00F0FF', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem' }}>
                        <Brain size={18} /> RESUMEN DE MONITOREO IA
                      </h3>
                      <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: '1.4', margin: 0 }}>
                        Genera un extracto de voz de la actividad municipal registrada en las últimas 24 horas mediante inteligencia sintética de voz.
                      </p>
                      
                      <button 
                        onClick={handleAudioSummary} 
                        disabled={isGeneratingAudio}
                        style={{ background: '#00F0FF', color: '#000', padding: '12px 24px', borderRadius: '12px', border: 'none', fontWeight: 'bold', cursor: isGeneratingAudio ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: 'auto', transition: 'all 0.3s ease' }}
                        className="hover:opacity-90"
                      >
                        <Sparkles size={16} /> 
                        {isGeneratingAudio ? "SINTETIZANDO VOZ..." : "SINTETIZAR INFORME"}
                      </button>

                      {audioResult && (
                        <div style={{ background: 'rgba(0, 240, 255, 0.05)', border: '1px solid rgba(0, 240, 255, 0.2)', padding: '12px', borderRadius: '12px', marginTop: '10px' }}>
                          <div style={{ fontSize: '0.75rem', color: '#00F0FF', fontWeight: 'bold', marginBottom: '4px' }}>
                            {audioResult.speaker} ({audioResult.duration})
                          </div>
                          <div style={{ fontSize: '0.8rem', color: '#cbd5e1', fontStyle: 'italic', lineHeight: '1.4' }}>
                            "{audioResult.transcript}"
                          </div>
                        </div>
                      )}
                   </div>
                </div>

                {/* Campaign Image/Audio Section */}
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '2.5rem', borderRadius: '32px', border: '1px solid rgba(252, 211, 77, 0.2)' }}>
                   <h3 style={{ color: '#fcd34d', margin: '0 0 1.5rem 0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.2rem' }}>
                      <Radio size={22} /> Campañas Radiales Municipales
                   </h3>
                   
                   <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '2rem' }}>
                      
                      {/* Campaign 1: Permisos de Circulacion */}
                      <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid #333', padding: '20px', borderRadius: '24px', display: 'flex', gap: '1.2rem', alignItems: 'center', position: 'relative' }}>
                         <div style={{ width: '80px', height: '80px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0, boxShadow: '0 4px 10px rgba(0,0,0,0.5)', border: '1px solid #444' }}>
                           <img src="/music/portada_es_amor_por_la_serena.png" alt="Portada Permisos" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                         </div>
                         <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                           <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 'bold', color: 'white' }}>Permisos de Circulación 2026</h4>
                           <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Ilustre Municipalidad de La Serena</span>
                           
                           {/* Media Controls */}
                           <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginTop: '8px' }}>
                             <button 
                               onClick={() => playCampaignAudio('permisos', '/music/es_amor_por_la_serena.mp3')}
                               style={{ background: '#00f0ff', color: 'black', border: 'none', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s ease' }}
                               className="hover:scale-105"
                             >
                               {playingCamp === 'permisos' && isCampPlaying ? <Pause size={14} /> : <Play size={14} />}
                             </button>

                             {/* Interactive Progress Bar */}
                             <div 
                               onClick={(e) => handleSeek(e, 'permisos')}
                               style={{ flex: 1, height: '6px', background: '#222', borderRadius: '3px', position: 'relative', cursor: playingCamp === 'permisos' ? 'pointer' : 'default' }}
                             >
                               <div style={{ width: `${playingCamp === 'permisos' ? campProgress : 0}%`, height: '100%', background: '#00F0FF', borderRadius: '3px' }} />
                             </div>
                             
                             <span style={{ fontSize: '0.7rem', color: '#64748b' }}>
                               {playingCamp === 'permisos' ? `${formatTime(campCurrentTime)} / ${formatTime(campDuration)}` : '0:00 / 2:58'}
                             </span>
                           </div>

                           {/* Audio visualizer bar animation */}
                           <div style={{ marginTop: '8px', height: '24px', display: 'flex', alignItems: 'flex-end', gap: '2px' }}>
                             {Array.from({ length: 12 }).map((_, i) => (
                               <div 
                                 key={i} 
                                 className={`wave-bar ${playingCamp === 'permisos' && isCampPlaying ? 'wave-active' : ''}`}
                                 style={{
                                   height: '100%',
                                   width: '3px',
                                   backgroundColor: '#00F0FF',
                                   borderRadius: '1.5px',
                                   transformOrigin: 'bottom',
                                   transform: playingCamp === 'permisos' && isCampPlaying ? 'scaleY(1)' : 'scaleY(0.15)'
                                 }}
                               />
                             ))}
                           </div>
                         </div>
                      </div>

                      {/* Campaign 2: Talleres de Inglés */}
                      <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid #333', padding: '20px', borderRadius: '24px', display: 'flex', gap: '1.2rem', alignItems: 'center', position: 'relative' }}>
                         <div style={{ width: '80px', height: '80px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0, boxShadow: '0 4px 10px rgba(0,0,0,0.5)', border: '1px solid #444' }}>
                           <img src="/music/portada_eres_Serena.png" alt="Portada Inglés" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                         </div>
                         <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                           <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 'bold', color: 'white' }}>Talleres de Inglés E-Learning</h4>
                           <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Ilustre Municipalidad de La Serena</span>
                           
                           {/* Media Controls */}
                           <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginTop: '8px' }}>
                             <button 
                               onClick={() => playCampaignAudio('ingles', '/music/eres_serena.mp3')}
                               style={{ background: '#f59e0b', color: 'black', border: 'none', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s ease' }}
                               className="hover:scale-105"
                             >
                               {playingCamp === 'ingles' && isCampPlaying ? <Pause size={14} /> : <Play size={14} />}
                             </button>

                             {/* Interactive Progress Bar */}
                             <div 
                               onClick={(e) => handleSeek(e, 'ingles')}
                               style={{ flex: 1, height: '6px', background: '#222', borderRadius: '3px', position: 'relative', cursor: playingCamp === 'ingles' ? 'pointer' : 'default' }}
                             >
                               <div style={{ width: `${playingCamp === 'ingles' ? campProgress : 0}%`, height: '100%', background: '#f59e0b', borderRadius: '3px' }} />
                             </div>
                             
                             <span style={{ fontSize: '0.7rem', color: '#64748b' }}>
                               {playingCamp === 'ingles' ? `${formatTime(campCurrentTime)} / ${formatTime(campDuration)}` : '0:00 / 2:56'}
                             </span>
                           </div>

                           {/* Audio visualizer bar animation */}
                           <div style={{ marginTop: '8px', height: '24px', display: 'flex', alignItems: 'flex-end', gap: '2px' }}>
                             {Array.from({ length: 12 }).map((_, i) => (
                               <div 
                                 key={i} 
                                 className={`wave-bar ${playingCamp === 'ingles' && isCampPlaying ? 'wave-active' : ''}`}
                                 style={{
                                   height: '100%',
                                   width: '3px',
                                   backgroundColor: '#f59e0b',
                                   borderRadius: '1.5px',
                                   transformOrigin: 'bottom',
                                   transform: playingCamp === 'ingles' && isCampPlaying ? 'scaleY(1)' : 'scaleY(0.15)'
                                 }}
                               />
                             ))}
                           </div>
                         </div>
                      </div>

                   </div>
                </div>

                {/* HTML5 Audio Node */}
                <audio 
                  ref={campAudioRef} 
                  onTimeUpdate={() => { 
                    if (campAudioRef.current) {
                      setCampCurrentTime(campAudioRef.current.currentTime);
                      setCampProgress(campAudioRef.current.duration ? (campAudioRef.current.currentTime / campAudioRef.current.duration) * 100 : 0);
                    } 
                  }} 
                  onLoadedMetadata={() => {
                    if (campAudioRef.current) {
                      setCampDuration(campAudioRef.current.duration);
                    }
                  }}
                  onEnded={() => { 
                    setPlayingCamp(null); 
                    setIsCampPlaying(false);
                    setCampProgress(0);
                  }} 
                />
             </div>
          )}

          {/* TAB 4: MAPA TÁCTICO */}
          {activeTab === 'tactico' && (
             <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
               <div style={{ height: '500px', borderRadius: '24px', overflow: 'hidden', border: '1px solid #222', position: 'relative' }}>
                  <MapContainer center={[-29.9027, -71.2519]} zoom={14} style={{ height: '100%', width: '100%' }}>
                     <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" attribution='&copy; <a href="https://carto.com/">CARTO</a>' />
                     {mapMarkers.map(m => (
                        <Marker key={m.id} position={m.pos}>
                           <Popup>
                             <div style={{ color: '#000', fontFamily: 'sans-serif', padding: '5px' }}>
                               <strong style={{ fontSize: '0.95rem' }}>{m.title}</strong>
                               <p style={{ margin: '5px 0 0 0', fontSize: '0.8rem', lineHeight: '1.3' }}>{m.desc}</p>
                             </div>
                           </Popup>
                        </Marker>
                     ))}
                  </MapContainer>
               </div>
               <div style={{ color: '#64748b', fontSize: '0.8rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                 <span>📍 <strong>Faro Monumental:</strong> -29.9027, -71.2519</span>
                 <span>📍 <strong>Consistorial:</strong> -29.9015, -71.2492</span>
                 <span>📍 <strong>Estación Drones:</strong> -29.9001, -71.2555</span>
                 <span>📍 <strong>Antena Transmisora:</strong> -29.9100, -71.2400</span>
               </div>
             </div>
          )}

          {/* TAB 5: GENERAR REPORTE */}
          {activeTab === 'reporte' && (
             <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <button 
                  onClick={handleGenerateReport} 
                  disabled={isGeneratingReport}
                  style={{ background: '#00F0FF', color: 'black', padding: '1rem', borderRadius: '12px', border: 'none', fontWeight: 'bold', fontSize: '1rem', cursor: isGeneratingReport ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.3s ease' }}
                  className="hover:scale-[1.01]"
                >
                  <FileText size={18} />
                  {isGeneratingReport ? "SINTETIZANDO METRICAS..." : "GENERAR REPORTE DE INTELIGENCIA DE ESCUCHA"}
                </button>
                
                {isGeneratingReport ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4rem', gap: '1rem', color: '#64748b' }}>
                    <div style={{ width: '40px', height: '40px', border: '3px solid #00F0FF', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                    <span>IA extrayendo menciones y alcances municipales...</span>
                  </div>
                ) : reportText && (
                  <textarea 
                    value={reportText} 
                    style={{ height: '350px', background: '#000', border: '1px solid #00F0FF', color: '#00F0FF', padding: '1.5rem', borderRadius: '16px', fontFamily: 'monospace', fontSize: '0.85rem', lineHeight: '1.4', outline: 'none' }} 
                    readOnly 
                  />
                )}
             </div>
          )}
        </div>
      </div>

      {/* Floating Radio Live buttons (Bottom Right) to match layout of screenshot */}
      <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', zIndex: 10000000 }}>
        {/* Live player indicator */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <button 
            onClick={() => {
              setActiveTab('listening');
              if (playingCamp !== 'permisos') {
                playCampaignAudio('permisos', '/music/es_amor_por_la_serena.mp3');
              }
            }}
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: '#ef4444',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(239, 68, 68, 0.6)',
              position: 'relative',
              transition: 'all 0.3s ease'
            }}
            className="hover:scale-110"
            title="Lanzar Smart Listening"
          >
            <Radio size={24} className={isCampPlaying ? "animate-pulse" : ""} />
            <span style={{
              position: 'absolute',
              inset: '-4px',
              borderRadius: '50%',
              border: '2px solid #ef4444',
              animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
              opacity: isCampPlaying ? 0.8 : 0,
              pointerEvents: 'none'
            }} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <button 
            onClick={() => {
              if (playingCamp === 'live') {
                if (isCampPlaying) {
                  campAudioRef.current.pause();
                  setIsCampPlaying(false);
                } else {
                  campAudioRef.current.play().catch(() => {});
                  setIsCampPlaying(true);
                }
              } else {
                setPlayingCamp('live');
                setCampProgress(0);
                if (campAudioRef.current) {
                  campAudioRef.current.src = '/music/himno_la_serena_jazz.mp3';
                  campAudioRef.current.load();
                  campAudioRef.current.play().then(() => setIsCampPlaying(true)).catch(() => {});
                }
              }
            }}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: '#ef4444',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(239, 68, 68, 0.4)',
              transition: 'all 0.3s ease'
            }}
            className="hover:scale-110"
            title="Streaming en vivo RDMLS"
          >
            <span style={{ fontSize: '0.85rem', fontWeight: '900' }}>11</span>
          </button>
          <span style={{ fontSize: '0.65rem', color: '#ef4444', fontWeight: '900', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>• EN VIVO</span>
        </div>
      </div>

    </div>
  );
};

export default SentinelApex;
