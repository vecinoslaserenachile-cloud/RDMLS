import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, Pause, Award, CheckCircle, Shield, Globe, Radio,
  Volume2, VolumeX, ArrowRight, QrCode, AlertTriangle,
  Landmark, Cpu, ShieldAlert, Activity, Castle, Compass,
  FileText, FilePlus, Images, Languages, ChevronLeft, ChevronRight, X,
  ShieldCheck, Camera, User, Database, Bot, Sparkles, Send, Loader2, X as XIcon
} from 'lucide-react';
import { useLocation } from 'react-router-dom';
import IdentityGate from '../components/IdentityGate';
import MicroTutorialVLS from '../components/MicroTutorialVLS';
import { db } from '../utils/firebase';
import { collection, addDoc } from 'firebase/firestore';
import ReactMarkdown from 'react-markdown';
import { GoogleGenerativeAI } from "@google/generative-ai";

// --- COMPONENTE ASISTENTE SMART ---
const SmartAssistantInduccion = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
      { role: 'model', text: '¡Hola! Soy **Serenito 3D**, tu tutor virtual de la **Academia Smart IMLS**. ¿Tienes dudas sobre la inducción, la Radio Digital o cómo obtener tu diploma?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
  
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
  
    useEffect(() => {
      scrollToBottom();
    }, [messages, isOpen]);
  
    const handleSend = async () => {
      if (!input.trim()) return;
  
      const userMsg = input;
      setInput('');
      setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
      setIsLoading(true);
  
      try {
        const ai = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "AIzaSyBK4-Rf1QLNBKwhJ3BtpxRsn25e7Zlq3Rs");
        const model = ai.getGenerativeModel({ 
          model: "gemini-2.0-flash-exp",
          systemInstruction: "Eres Serenito 3D, el Asistente Virtual de la Ilustre Municipalidad de La Serena. Ayuda a los funcionarios en su inducción 2025. Sé amable y profesional."
        });
  
        const result = await model.generateContent({
          contents: [
            ...messages.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
            { role: 'user', parts: [{ text: userMsg }] }
          ]
        });
  
        setMessages(prev => [...prev, { role: 'model', text: result.response.text() }]);
      } catch (error) {
        setMessages(prev => [...prev, { role: 'model', text: "Lo siento, tuve un problema técnico. ¿Puedes repetir?" }]);
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          style={{ position:'fixed', bottom:'20px', right:'20px', zIndex:100000, background:'#C5A065', color:'#000', border:'none', borderRadius:'50%', width:'60px', height:'60px', cursor:'pointer', boxShadow:'0 5px 20px rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center' }}
        >
          <Sparkles size={30} />
        </button>
  
        {isOpen && (
          <div style={{ position:'fixed', bottom:'90px', right:'20px', zIndex:100000, width:'350px', height:'450px', background:'#0F0201', border:'1px solid #C5A065', borderRadius:'20px', display:'flex', flexDirection:'column', overflow:'hidden', boxShadow:'0 20px 50px rgba(0,0,0,0.8)' }}>
            <div style={{ padding:'1rem', background:'#1A0403', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'1px solid rgba(197,160,101,0.2)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                <img src="/serenito_3d_avatar_premium_1774312066289.png" style={{ width:'40px', height:'40px', borderRadius:'50%', border:'2px solid #C5A065' }} />
                <span style={{ fontWeight:'900', color:'white', fontSize:'0.9rem' }}>SERENITO 3D</span>
              </div>
              <button onClick={()=>setIsOpen(false)} style={{ background:'transparent', border:'none', color:'#64748b', cursor:'pointer' }}><XIcon size={20}/></button>
            </div>
            <div style={{ flex:1, overflowY:'auto', padding:'1rem', display:'flex', flexDirection:'column', gap:'10px' }}>
              {messages.map((m,i)=>(
                <div key={i} style={{ alignSelf: m.role==='user'?'flex-end':'flex-start', background: m.role==='user'?'#C5A065':'rgba(255,255,255,0.05)', padding:'0.8rem', borderRadius:'15px', maxWidth:'80%', color:m.role==='user'?'#000':'white', fontSize:'0.85rem' }}>
                  <ReactMarkdown>{m.text}</ReactMarkdown>
                </div>
              ))}
              {isLoading && <Loader2 className="animate-spin" size={16} color="#C5A065" />}
              <div ref={messagesEndRef} />
            </div>
            <div style={{ padding:'1rem', background:'#1A0403', borderTop:'1px solid rgba(197,160,101,0.2)', display:'flex', gap:'10px' }}>
                <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleSend()} style={{ flex:1, background:'rgba(255,255,255,0.05)', border:'1px solid rgba(197,160,101,0.2)', borderRadius:'10px', padding:'0.5rem', color:'white', outline:'none' }} placeholder="Pregunta algo..." />
                <button onClick={handleSend} style={{ background:'#C5A065', border:'none', borderRadius:'10px', width:'40px', height:'40px', display:'flex', alignItems:'center', justifyContent:'center', color:'black', cursor:'pointer' }}><Send size={18}/></button>
            </div>
          </div>
        )}
      </>
    );
};

// ── COLORES IMLS ──────────────────────────────────────────────────────
const C = {
  red:    '#8B0000', // Rojo Corporativo La Serena
  redLgt: '#D32F2F', 
  redDk:  '#3E0000',
  gold:   '#C5A065',
  goldBrd:'rgba(197,160,101,0.4)',
  dark:   '#120101',
  glass:  'rgba(255,255,255,0.05)',
  glassBrd:'rgba(255,255,255,0.12)',
  goldDim:'rgba(197,160,101,0.15)',
};

// ── RADIO RDMLS ───────────────────────────────────────────────────────
// RDMLS Radio Digital Municipal La Serena - transmisión oficial
const RADIO_STREAMS = [
  'https://stream.zeno.fm/nn1ne0t8df8uv', // Zeno oficial
  'https://rdmls.cl:8590/stream',         // Stream directo IMLS
  'https://streaming.laserena.cl:8590/stream',
];

// ── EFECTOS DE SONIDO E-LEARNING (Sintetizador Web Audio API) ─────────
const playSound = (type) => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const masterGain = ctx.createGain();
    masterGain.connect(ctx.destination);

    if (type === 'pop') {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.1);
      masterGain.gain.setValueAtTime(0.3, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      osc.connect(masterGain);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.1);
    } else if (type === 'correct') {
      // E-learning ding (A5 -> C#6)
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime); 
      osc.frequency.setValueAtTime(1108.73, ctx.currentTime + 0.08); 
      masterGain.gain.setValueAtTime(0.2, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
      osc.connect(masterGain);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.4);
    } else if (type === 'wrong') {
      // E-learning bump
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.2);
      masterGain.gain.setValueAtTime(0.2, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      osc.connect(masterGain);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.2);
    } else if (type === 'success') {
      // Fanfarria de Diploma (Acorde C mayor alzado)
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'sine';
        o.frequency.value = freq;
        g.gain.setValueAtTime(0, ctx.currentTime);
        g.gain.linearRampToValueAtTime(0.2, ctx.currentTime + i * 0.15 + 0.1);
        g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.15 + 1.2);
        o.connect(g);
        g.connect(ctx.destination);
        o.start(ctx.currentTime + i * 0.15);
        o.stop(ctx.currentTime + i * 0.15 + 1.5);
      });
    }
  } catch (err) {
    console.warn('Audio interactivo no disponible.', err);
  }
};

// Enlaces RAW directos a GitHub (Versiones optimizadas para Office Viewer — Rama Main)
const RAW_PPTX_A = 'https://raw.githubusercontent.com/vecinoslaserenachile-cloud/portal-induccion-imls/main/cosas/La_Serena_Municipal_2025.pptx';
const RAW_PPTX_B = 'https://raw.githubusercontent.com/vecinoslaserenachile-cloud/portal-induccion-imls/main/cosas/La%20Serena%20entorno%20municipal.pptx';
const VIEWER_A = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(RAW_PPTX_A)}`;
const VIEWER_B = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(RAW_PPTX_B)}`;

// ── GALERÍA DE IMÁGENES INSTITUCIONALES ─────────────────────────
// Assets fotográficos reales de alta definición de La Serena (Estables - Sin fallo de Red)
const GALERIA = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Faro_Monumental_de_La_Serena._09.12.2022.jpg/960px-Faro_Monumental_de_La_Serena._09.12.2022.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Av._del_Mar%2C_La_Serena-Chile.JPG/960px-Av._del_Mar%2C_La_Serena-Chile.JPG',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Portada_2015_5.jpg/960px-Portada_2015_5.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Plaza_de_Armas_La_Serena.JPG/960px-Plaza_de_Armas_La_Serena.JPG',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Avenida_Francisco_de_Aguirre.jpg/960px-Avenida_Francisco_de_Aguirre.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Recova_La_Serena.JPG/960px-Recova_La_Serena.JPG'
];

// ── PREGUNTAS TRIVIA ──────────────────────────────────────────────────
const QUESTIONS = [
  { q: "¿Cuál es la misión principal de la Radio Digital Municipal RDMLS?",
    opts: ["Entretenimiento comercial regional","Conectar a la comunidad con la gestión municipal","Competir con radios privadas"],
    ans: 1, explanation: "La RDMLS es el canal oficial de comunicación digital de la IMLS, sin fines comerciales." },
  { q: "¿Mediante qué instrumento se formalizan las decisiones municipales?",
    opts: ["Correos internos","Decretos Alcaldicios","WhatsApp institucional"],
    ans: 1, explanation: "Los Decretos Alcaldicios garantizan transparencia, legalidad y trazabilidad en todos los procesos." },
  { q: "¿Qué protocolo establece la Ley Karin (21.643)?",
    opts: ["Uso de equipos informáticos","Prevención del acoso laboral y sexual","Horario de transmisión radial"],
    ans: 1, explanation: "La Ley Karin impone tolerancia cero al acoso. Un solo acto grave es suficiente para denunciar." },
  { q: "¿Quién autoriza las vocerías públicas del municipio?",
    opts: ["Cualquier funcionario","Alcaldía y Comunicaciones","Cada dirección de forma independiente"],
    ans: 1, explanation: "Toda vocería debe contar con visto bueno del Departamento de Comunicaciones e Innovación Digital y Alcaldía." },
  { q: "Ante sismo de gran magnitud en La Serena, el protocolo de evacuación indica:",
    opts: ["Permanecer en las instalaciones","Acudir al municipio más cercano","Dirigirse a Cota 30 (Av. Cisternas)"],
    ans: 2, explanation: "La Serena es ciudad costera. El protocolo establece evacuar a Cota 30 ante riesgo de tsunami." },
];

// ── MÓDULOS DE LA MALLA ───────────────────────────────────────────────
const MODULOS = [
  { id:'adn', icon:'🏛️', label:'ADN Municipal 2025', desc:'Misión, Visión y 5 Valores',
    img: 'https://raw.githubusercontent.com/vecinoslaserenachile-cloud/juego-serenito/main/memorial/cuturrufo/municipalidad_serena_frontis.png',
    content:[
      { k:'Misión',  v:'Servicios municipales cercanos, amables y de calidad para mejorar la vida de los vecinos.' },
      { k:'Visión',  v:'Municipio moderno, creíble, transparente e informado. Líder en gestión Smart Comuna.' },
      { k:'Valores', v:'Transparencia · Compromiso · Respeto & Solidaridad · Ética & Probidad · Inclusión.' },
    ],
    quiz:{ q:'¿Cuál es la misión central de la IMLS?', opts:['Maximizar ingresos tributarios','Servicios cercanos y de calidad para los vecinos','Gestionar concesiones privadas'], ans:1, exp:'La misión es clara: servicio cercano, amable y de calidad a cada vecino de La Serena.' }},

  { id:'gestion', icon:'⚙️', label:'Cerebro DAF/SECPLAN', desc:'Decreto 1730 · Gestión y Planificación',
    img: '/smart_city_serena_2025_png_1774894743323.png',
    content:[
      { k:'Decreto 1730', v:'Regula la estructura orgánica de la Ilustre Municipalidad de La Serena.' },
      { k:'SECPLAN',      v:'Planificación Comunal, Presupuesto e Inversión Pública.' },
      { k:'DAF',          v:'Finanzas, Recaudación, Modernización y TICs.' },
    ],
    quiz:{ q:'¿Qué unidad gestiona la Planificación Comunal y el Presupuesto?', opts:['DAF','SECPLAN','Alcaldía'], ans:1, exp:'SECPLAN (Secretaría Comunal de Planificación) articula el presupuesto y la inversión pública.' }},

  { id:'karin', icon:'🛡️', label:'Ley Karin 21.643', desc:'Protocolo de Prevención y Denuncia',
    img: '/smart_city_serena_2025_png_1774894743323.png',
    content:[
      { k:'Objetivo',  v:'Prevenir, investigar y sancionar el acoso laboral, sexual y la violencia en el trabajo.' },
      { k:'Protocolo', v:'Mecanismo interno confidencial de investigación. Tolerancia cero. Un acto basta.' },
      { k:'Denuncia',  v:'denuncias@laserena.cl · Intranet Municipal (Canal Confidencial).' },
    ],
    quiz:{ q:'¿Cuántos actos de acoso se necesitan para activar la Ley Karin?', opts:['Tres o más','Dos comprobados','Un solo acto grave es suficiente'], ans:2, exp:'La Ley Karin establece tolerancia cero: un único acto grave ya activa el protocolo de investigación.' }},

  { id:'riesgos', icon:'🚨', label:'Prevención Ley 16.744', desc:'Seguridad y Plan de Emergencias',
    img: '/smart_city_serena_2025_png_1774894743323.png',
    content:[
      { k:'Seguro',  v:'Seguro social obligatorio contra accidentes del trabajo y enfermedades profesionales.' },
      { k:'Acción',  v:'Ante accidente: informar a jefatura directa y acudir al centro de salud en convenio.' },
      { k:'Comité',  v:'Comité Paritario activo. Evacuación a Cota 30 (Av. Cisternas) ante riesgo de tsunami.' },
    ],
    quiz:{ q:'Ante un sismo fuerte en La Serena, ¿cuál es la zona de evacuación correcta?', opts:['Permanecer en el edificio','Cota 30, Av. Cisternas','Plaza de Armas'], ans:1, exp:'La Cota 30 (Av. Cisternas) es la zona segura ante tsunami. Es la ruta oficial del Plan de Evacuación Municipal.' }},

  { id:'patrimonio', icon:'⚜️', label:'Historia Local', desc:'Patrimonio de La Serena',
    img: '/faro_monumental_premium_png_1774894700995.png',
    content:[
      { k:'Faro',     v:'Ícono nacional y monumental de la bahía serenense.' },
      { k:'Iglesias', v:'Ciudad de los campanarios. Riqueza arquitectónica y religiosa única.' },
      { k:'La Recova',v:'El mercado artesanal e histórico más emblemático del norte de Chile.' },
    ],
    quiz:{ q:'¿Qué monumento es el ícono absoluto del patrimonio arquitectónico de La Serena a nivel nacional?', opts:['El Reloj Monumental','El Faro Monumental','La Recova Norte'], ans:1, exp:'El Faro Monumental de La Serena, declarado Monumento Nacional, es el emblema que nos proyecta hacia el turismo nacional e internacional.' }},

  { id:'turismo', icon:'🤝', label:'Atención Pública', desc:'Empatía y Resolución Ciudadana',
    img: '/smart_city_serena_2025_png_1774894743323.png',
    content:[
      { k:'Empatía',   v:'Escucha activa ante vecinos exaltados o frustrados.' },
      { k:'Rapidez',   v:'Resolución ágil usando tecnologías como "Smart Comuna".' },
      { k:'Lenguaje',  v:'Uso de un lenguaje sencillo, claro y cálido.' },
    ],
    quiz:{ q:'Frente a un ciudadano exaltado buscando solucionar un trámite en la IMLS, la mejor respuesta es:', opts:['Derivarlo de inmediato a otro piso','Aplicar escucha activa, empathizar y guiarlo de manera paciente al canal oficial','Pedirle que vuelva mañana cuando esté calmado'], ans:1, exp:'La Vocación de Servicio Público exige calidez y empatía. Derivarlo correctamente o usar las plataformas (como RDMLS) disminuye su frustración.' }},

  { id:'l_en', icon:'🌎', label:'English Bridge', desc:'Atención a Turistas Global', isLang:true,
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Recova_La_Serena.JPG/960px-Recova_La_Serena.JPG',
    quiz:{ q:'When a foreign tourist asks "Where is the municipality?", the correct answer is:', opts:['"I don\'t know"','"Municipality is at Prat 451, downtown"','"Please wait"'], ans:1, exp:'Knowing key addresses in English helps welcome international tourists and investors to La Serena.' }},

  { id:'l_mp', icon:'🏔️', label:'Mapuzungun', desc:'Raíces de Pueblos Originarios', isLang:true,
    img: GALERIA[1],
    quiz:{ q:'¿Qué significa "Küme mongen" en Mapuzungun?', opts:['Buenos días','Buen vivir / Vida en equilibrio','Gracias'], ans:1, exp:'"Küme mongen" es el concepto del buen vivir en la cosmovisión Mapuche, base de muchas políticas de inclusión.' }},

  { id:'l_cr', icon:'🤝', label:'Kreyòl', desc:'Integración Comunidad Migrante', isLang:true,
    img: GALERIA[3],
    quiz:{ q:'¿Cómo se dice "Buenos días" en Kreyòl haitiano?', opts:['Bonjou','Bonswa','Mèsi'], ans:0, exp:'"Bonjou" es el saludo matutino en Kreyòl. Conocerlo mejora la atención a la comunidad haitiana de La Serena.' }},

  { id:'l_zh', icon:'🏮', label:'Chino Mandarín', desc:'Diplomacia e Inversión Global', isLang:true,
    img: GALERIA[4],
    quiz:{ q:'¿Cómo se dice "Municipalidad" en chino mandarín (pinyin)?', opts:['Shìzhèngfǔ (市政府)','Xuéxiào (学校)','Yīyuàn (医院)'], ans:0, exp:'Shìzhèngfǔ (市政府) es "gobierno municipal" en mandarín. Clave para recibir delegaciones de ciudades hermanas.' }},

  { id:'pptx_a', icon:'📄', label:'La Serena Municipal 2025', desc:'Inducción Institucional V.V.', isPPTX:true, src:VIEWER_A, rawRef:RAW_PPTX_A },
  { id:'pptx_b', icon:'📋', label:'Entorno Municipal',       desc:'Resumen Ejecutivo de Gestión', isPPTX:true, src:VIEWER_B, rawRef:RAW_PPTX_B },
  { id:'galeria', icon:'🖼️', label:'Galería IMLS',           desc:'Registro Visual Oficial',    isGallery:true },
];

// ── ESTILOS COMPARTIDOS ───────────────────────────────────────────────
const glassCard = {
  background: C.glass,
  backdropFilter: 'blur(30px)',
  WebkitBackdropFilter: 'blur(30px)',
  borderRadius: '24px',
  border: `1px solid ${C.glassBrd}`,
  // Efecto biselado 3D (Bisel superior claro, sombras profundas)
  boxShadow: `
    0 25px 50px -12px rgba(0, 0, 0, 0.6),
    inset 0 1px 1px rgba(255, 255, 255, 0.2),
    inset 0 -1px 1px rgba(0, 0, 0, 0.3)
  `,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'visible' // Permitir que el texto respire
};

const goldBtn = {
  background: `linear-gradient(135deg, ${C.gold} 0%, #d4b07a 50%, ${C.gold} 100%)`,
  color: '#000',
  border: 'none',
  borderRadius: '14px',
  padding: '14px 28px',
  fontWeight: '900',
  fontSize: '0.95rem',
  letterSpacing: '2px',
  cursor: 'pointer',
  boxShadow: `0 4px 20px rgba(197,160,101,0.4), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -2px 0 rgba(0,0,0,0.2)`,
  transition: 'all 0.2s',
};

const pageBase = {
  minHeight: '100vh',
  // Efecto de luz natural: un foco de luz roja intensa que cae desde arriba al centro
  background: `radial-gradient(circle at 50% -20%, #CD1C18 0%, #7B0D0B 45%, #1A0201 90%)`,
  display: 'flex', 
  flexDirection: 'column', 
  alignItems: 'center', 
  justifyContent: 'flex-start',
  fontFamily: "'Inter', 'Segoe UI', Roboto, sans-serif",
  color: 'white', 
  padding: '10px', 
  overflowX: 'hidden', 
  overflowY: 'auto'
};

// ══════════════════════════════════════════════════════════════════════
const AIGenerativeImage = ({ src, alt, style, wrapperStyle, onClick, onMouseEnter, onMouseLeave }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', ...wrapperStyle }} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {!loaded && !error && (
        <div style={{ position: 'absolute', inset: 0, background: '#111', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <div style={{ width: 24, height: 24, border: '2px solid transparent', borderTopColor: '#C5A065', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
          <span style={{ color: '#C5A065', fontSize: '0.6rem', fontWeight: '900', letterSpacing: '2px', textTransform: 'uppercase' }}>Generando IA...</span>
        </div>
      )}
      {error && (
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #020617 0%, #000 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', zIndex: 10 }}>
          <img src="/serenito_3d_fixing_error_png_1774895062783.png" alt="Error" style={{ height: '60px', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.2))' }} />
          <div style={{ textAlign: 'center' }}>
            <span style={{ color: '#ef4444', fontSize: '0.6rem', fontWeight: '900', letterSpacing: '2px', textTransform: 'uppercase', display: 'block' }}>SISTEMA EN REESTABLECIMIENTO</span>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.5rem', fontWeight: '600' }}>Buscando señal de IMLS_CLOUD_BACKUP...</span>
          </div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        style={{ ...style, width:'100%', height:'100%', objectFit: style.objectFit || 'cover', opacity: loaded ? (style.opacity || 1) : 0, transition: 'opacity 0.4s ease-in' }}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
      <style dangerouslySetInnerHTML={{__html: `@keyframes spin { 100% { transform: rotate(360deg); } }`}}/>
    </div>
  );
};

export default function Aprende({ isRDMLS = false }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const audioRef = useRef(null);

  const location = useLocation();
  const [userData, setUserData] = useState(() => {
    const s = localStorage.getItem('imls_user_2025');
    return s ? JSON.parse(s) : { nombres:'', apellidos:'', area:'', calidad:'Planta' };
  });

  const [step, setStep]               = useState('registro');
  const [showTutorial, setShowTutorial] = useState(true);
  
  // LOGICA PARA FORZAR REGISTRO SI SE SALTA
  useEffect(() => {
    const q = new URLSearchParams(location.search);
    if (q.get('mode') === 'registro' || q.get('force') === '1') {
      setStep('registro');
    }
  }, [location.search]);

  const [isPlaying, setIsPlaying]     = useState(false);
  const [openMod, setOpenMod]         = useState(null);   // módulo activo en modal
  const [completed, setCompleted]     = useState([]);
  const [galleryIdx, setGalleryIdx]   = useState(0);
  // Trivia
  const [triviaStep, setTriviaStep]   = useState(0);
  const [answered, setAnswered]       = useState(false);
  const [lastCorrect, setLastCorrect] = useState(false);
  const [score, setScore]             = useState(0);
  const [modQuiz, setModQuiz]         = useState({ answer: null, showFeedback: false }); // Quiz dentro del modal
  const [showFullGate, setShowFullGate] = useState(false); // Para el IdentityGate biométrico
  const [showAdminMode, setShowAdminMode] = useState(false); // VLS 2025: Vista Administrativa TICs

  useEffect(() => {
    document.title = 'IMLS · Academia Smart 2025';
    // Crear audio con múltiples fuentes para mayor compatibilidad
    const audio = new Audio();
    audio.preload = 'none';
    // Añadir múltiples sources como fallback
    RADIO_STREAMS.forEach(url => {
      const source = document.createElement('source');
      source.src = url;
      source.type = 'audio/mpeg';
      audio.appendChild(source);
    });
    audio.onerror = () => { setIsPlaying(false); };
    audioRef.current = audio;
    if (step === 'dashboard') {
      audio.load();
      audio.play().then(() => setIsPlaying(true)).catch(() => { setIsPlaying(false); });
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, [step]);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.load();
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          setIsPlaying(false);
          console.warn('RDMLS stream no disponible en este momento.');
        });
    }
  };

  const handleLogin = () => {
    if (!userData.nombres || !userData.rut) { 
      playSound('wrong');
      alert('Ingresa tu nombre y RUT'); 
      return; 
    }
    playSound('success');
    localStorage.setItem('imls_user_2025', JSON.stringify(userData));
    setStep('dashboard');
  };

  const closeModal = () => {
    playSound('pop');
    setOpenMod(null);
    setModQuiz({ answer: null, showFeedback: false });
  };

  const openModal = (m) => {
    playSound('pop');
    setOpenMod(m);
  };

  const validateMod = (id) => {
    if (!completed.includes(id)) {
      playSound('success');
      setCompleted(p => [...p, id]);
    } else {
      playSound('pop');
    }
    closeModal();
  };

  const handleModQuizAnswer = (idx) => {
    if (modQuiz.showFeedback) return;
    const isCorrect = idx === openMod.quiz.ans;
    playSound(isCorrect ? 'correct' : 'wrong');
    setModQuiz({ answer: idx, showFeedback: true });
  };

  const handleAnswer = (idx) => {
    if (answered) return;
    setAnswered(true);
    const correct = QUESTIONS[triviaStep].ans === idx;
    playSound(correct ? 'correct' : 'wrong');
    setLastCorrect(correct);
    if (correct) setScore(s => s + 100);
  };

  const nextTrivia = () => {
    if (triviaStep < QUESTIONS.length - 1) {
      playSound('pop');
      setTriviaStep(prev => prev + 1);
      setAnswered(false);
    } else {
      playSound('success');
      setStep('diploma-form');
    }
  };

  const progress = Math.round((completed.length / MODULOS.length) * 100);

  // ── PANTALLA: REGISTRO ────────────────────────────────────────────
  if (step === 'registro') return (
    <div style={{ ...pageBase, padding: isMobile ? '10px' : '0', position:'relative', justifyContent:'center' }}>
      <div style={{ position:'absolute', top:'20px', left:'20px', display:'flex', alignItems:'center', gap:'10px', opacity:0.6 }}>
        <img src="/escudo.png" alt="IMLS" style={{ height:'30px' }}/>
        <div style={{ fontSize:'0.5rem', fontWeight:'900', letterSpacing:'2px' }}>RDMLS · V2.6_PREMIUM</div>
      </div>
      
      <motion.div 
        initial={{ opacity:0, scale:0.95 }} 
        animate={{ opacity:1, scale:1 }}
        style={{ 
          width:'100%', 
          maxWidth:'1100px', 
          display:'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          gap: '0', 
          alignItems:'stretch', 
          justifyContent:'center',
          minHeight: isMobile ? 'auto' : '650px',
          background:'#000',
          borderRadius: '40px',
          overflow: 'hidden',
          boxShadow: '0 50px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)'
        }}>
        
        {/* LADO IZQUIERDO: VISUAL HERO */}
        <div style={{ 
          flex: 1.2, 
          position:'relative', 
          background:'linear-gradient(135deg, #2D0604 0%, #000 100%)',
          display:'flex',
          flexDirection:'column',
          justifyContent:'flex-end',
          padding: isMobile ? '3rem 2rem' : '4rem',
          overflow:'hidden'
        }}>
          {/* Fondo de red neuronal / Smart City */}
          <div style={{ position:'absolute', inset:0, opacity:0.15, background:'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }}></div>
          <div style={{ position:'absolute', top:'-10%', right:'-10%', width:'300px', height:'300px', background:'radial-gradient(circle, #CD1C18 0%, transparent 70%)', opacity:0.2, filter:'blur(60px)' }}></div>
          
          <div style={{ position:'relative', zIndex:10 }}>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <img src="/escudo.png" alt="IMLS" style={{ height:'60px', marginBottom:'2rem', filter:'drop-shadow(0 0 20px rgba(197,160,101,0.5))' }}/>
              <h1 style={{ fontSize: isMobile ? '2.5rem' : '4.5rem', fontWeight:'900', fontStyle:'italic', textTransform:'uppercase', lineHeight:0.9, margin:0, letterSpacing:'-2px' }}>
                Academia<br/><span style={{ color:C.gold }}>Smart 2025</span>
              </h1>
              <p style={{ color:'#94a3b8', fontSize: '0.9rem', letterSpacing:'1px', marginTop:'1.5rem', maxWidth:'300px', lineHeight:1.6 }}>
                Portal unificado de inducción y formación continua para funcionarios de excelencia.
              </p>
            </motion.div>

            <div style={{ marginTop:'3rem', display:'flex', gap:'1rem' }}>
              <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.05)', borderRadius:'15px', padding:'15px', flex:1 }}>
                <ShieldCheck size={20} color={C.gold} style={{ marginBottom:'8px' }}/>
                <div style={{ fontSize:'0.6rem', color:'#64748b', fontWeight:'900', letterSpacing:'1px' }}>ACCESO SEGURO</div>
                <div style={{ fontSize:'0.75rem', color:'white', fontWeight:'700' }}>Auth AES-256</div>
              </div>
              <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.05)', borderRadius:'15px', padding:'15px', flex:1 }}>
                <Award size={20} color={C.gold} style={{ marginBottom:'8px' }}/>
                <div style={{ fontSize:'0.6rem', color:'#64748b', fontWeight:'900', letterSpacing:'1px' }}>CERTIFICACIÓN</div>
                <div style={{ fontSize:'0.75rem', color:'white', fontWeight:'700' }}>Validez IMLS</div>
              </div>
            </div>
          </div>

          {/* SERENITO 3D HUMANIZED - Regla #3 */}
          <motion.img 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type:'spring', damping:20, delay:0.4 }}
            src="/serenito_3d_humanized_2025_1774875415876.png" 
            alt="Serenito 3D" 
            style={{ 
              position:'absolute', 
              bottom: isMobile ? '-20px' : '-50px', 
              right: isMobile ? '-20px' : '-40px', 
              height: isMobile ? '200px' : '450px',
              objectFit:'contain',
              filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.9))'
            }} 
          />
        </div>

        {/* LADO DERECHO: FORMULARIO */}
        <div style={{ 
          flex: 1, 
          background:'#0A0A0A', 
          padding: isMobile ? '2.5rem' : '4rem',
          display:'flex',
          flexDirection:'column',
          justifyContent:'center'
        }}>
          <div style={{ marginBottom:'2.5rem' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight:'900', textTransform:'uppercase', fontStyle:'italic', margin:0, color:'white' }}>
              Identificación
            </h2>
            <div style={{ height:'4px', width:'40px', background:C.gold, marginTop:'10px', borderRadius:'2px' }}></div>
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
              <div>
                <label style={{ display:'block', fontSize:'0.65rem', color:'#64748b', letterSpacing:'2px', marginBottom:'8px', fontWeight:'700' }}>NOMBRES</label>
                <input
                  value={userData.nombres || ''}
                  onChange={e => setUserData({ ...userData, nombres: e.target.value })}
                  placeholder="Ej: Rodrigo"
                  style={{ width:'100%', background:'rgba(255,255,255,0.03)', border:`1px solid ${C.glassBrd}`, borderRadius:'22px', padding:'20px 24px', color:'white', fontSize:'1.1rem', lineHeight:'1.4', outline:'none', boxSizing:'border-box', transition:'border-color 0.3s' }}
                  onFocus={e => e.target.style.borderColor = C.gold}
                  onBlur={e => e.target.style.borderColor = C.glassBrd}
                />
              </div>
              <div>
                <label style={{ display:'block', fontSize:'0.65rem', color:'#64748b', letterSpacing:'2px', marginBottom:'8px', fontWeight:'700' }}>APELLIDOS</label>
                <input
                  value={userData.apellidos || ''}
                  onChange={e => setUserData({ ...userData, apellidos: e.target.value })}
                  placeholder="Ej: Silva"
                  style={{ width:'100%', background:'rgba(255,255,255,0.03)', border:`1px solid ${C.glassBrd}`, borderRadius:'16px', padding:'16px', color:'white', fontSize:'0.95rem', outline:'none', boxSizing:'border-box', transition:'border-color 0.3s' }}
                  onFocus={e => e.target.style.borderColor = C.gold}
                  onBlur={e => e.target.style.borderColor = C.glassBrd}
                />
              </div>
            </div>

            <div>
              <label style={{ display:'block', fontSize:'0.65rem', color:'#64748b', letterSpacing:'2px', marginBottom:'8px', fontWeight:'700' }}>RUT INSTITUCIONAL</label>
              <div style={{ position:'relative' }}>
                <input
                  value={userData.rut || ''}
                  onChange={e => setUserData({ ...userData, rut: e.target.value.toUpperCase() })}
                  placeholder="12.345.678-9"
                  style={{ width:'100%', background:'rgba(255,255,255,0.03)', border:`1px solid ${C.glassBrd}`, borderRadius:'22px', padding:'20px 24px 20px 50px', color:'white', fontSize:'1.1rem', lineHeight:'1.4', outline:'none', boxSizing:'border-box', fontWeight:'700' }}
                  onFocus={e => e.target.style.borderColor = C.gold}
                  onBlur={e => e.target.style.borderColor = C.glassBrd}
                />
                <User size={20} color={C.gold} style={{ position:'absolute', left:'18px', top:'50%', transform:'translateY(-50%)' }}/>
              </div>
            </div>

            <div>
              <label style={{ display:'block', fontSize:'0.65rem', color:'#64748b', letterSpacing:'2px', marginBottom:'8px', fontWeight:'700' }}>DIRECCIÓN / DEPARTAMENTO</label>
              <select 
                value={userData.area} 
                onChange={e => setUserData({ ...userData, area: e.target.value })}
                style={{ width:'100%', background:'#111', border:`1px solid ${C.glassBrd}`, borderRadius:'22px', padding:'20px', color:'white', fontSize:'1.1rem', lineHeight:'1.4', outline:'none', cursor:'pointer' }}
              >
                <option value="">Seleccione su unidad...</option>
                <option>Alcaldía / Gabinete</option>
                <option>Admin. Municipal</option>
                <option>SECPLAN / Proyectos</option>
                <option>DAF / Finanzas</option>
                <option>DIDECO / Social</option>
                <option>Comunicaciones / RDMLS</option>
                <option>Gestión de Personas (RRHH)</option>
                <option>Seguridad Ciudadana 1420</option>
                <option>Innovación / TICs</option>
                <option>Jurídica / Control</option>
                <option>Tránsito / DOM</option>
                <option>Otra Dirección</option>
              </select>
            </div>

            <div style={{ display:'flex', alignItems:'center', gap:'10px', marginTop:'1rem' }}>
              <input type="checkbox" id="terms" style={{ accentColor:C.gold }} />
              <label htmlFor="terms" style={{ fontSize:'0.7rem', color:'#64748b' }}>Declaro que la información es fidedigna y autorizo la verificación institucional.</label>
            </div>

            <div style={{ display:'flex', gap:'1rem', marginTop:'1rem' }}>
              <button 
                onClick={handleLogin} 
                style={{ ...goldBtn, flex:1, padding:'20px', fontSize:'1rem', display:'flex', alignItems:'center', justifyContent:'center', gap:'12px' }}
              >
                ACCESO SIMPLE <ArrowRight size={20}/>
              </button>
              
              <button 
                onClick={() => setShowFullGate(true)}
                style={{ ...goldBtn, flex:1, background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color:'white', border:'none', padding:'20px', fontSize:'1rem', display:'flex', alignItems:'center', justifyContent:'center', gap:'12px' }}
              >
                <Camera size={20}/> BIOMETRÍA
              </button>
            </div>

            <button 
              onClick={() => window.location.href = '/'}
              style={{ background:'transparent', border:'none', color:'#475569', fontSize:'0.75rem', fontWeight:'700', cursor:'pointer', textTransform:'uppercase', letterSpacing:'1px', marginTop:'1rem' }}
            >
              Cancelar y Salir
            </button>
          </div>
        </div>
      </motion.div>
      
      {/* Sello de Seguridad */}
      <div style={{ marginTop:'2rem', display:'flex', alignItems:'center', gap:'1rem', color:'#334155', fontSize:'0.7rem', fontWeight:'800', letterSpacing:'2px' }}>
        <ShieldCheck size={16}/> PROTOCOLO DE IDENTIDAD VLS-SECURE
      </div>
    </div>
  );


  // ── PANTALLA: TRIVIA ──────────────────────────────────────────────
  if (step === 'trivia') {
    const q = QUESTIONS[triviaStep];
    return (
      <div style={pageBase}>
        <motion.div initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }} style={{ width:'100%', maxWidth:'700px', margin:'auto', display:'flex', flexDirection:'column', gap:'1.5rem' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <span style={{ color:C.gold, fontWeight:'900', fontSize:'0.75rem', letterSpacing:'4px' }}>VALIDACIÓN · {triviaStep+1} DE {QUESTIONS.length}</span>
            <span style={{ color:'#475569', fontSize:'0.8rem' }}>Score: {score} pts</span>
          </div>
          <div style={{ ...glassCard, padding:'2.5rem' }}>
            <p style={{ fontSize:'1.3rem', fontWeight:'700', lineHeight:1.5, color:'white', marginBottom:'2rem' }}>{q.q}</p>
            <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
              {q.opts.map((o, i) => {
                let bg = C.glass, brd = C.glassBrd, col = 'white';
                if (answered) {
                  if (i === q.ans) { bg='rgba(34,197,94,0.15)'; brd='rgba(34,197,94,0.5)'; col='#4ade80'; }
                  else if (i !== q.ans && answered) { bg='rgba(239,68,68,0.1)'; brd='rgba(239,68,68,0.3)'; col='#f87171'; }
                }
                return (
                  <button key={i} onClick={() => handleAnswer(i)} style={{
                    background:bg, border:`2px solid ${brd}`, borderRadius:'14px', padding:'14px 18px',
                    color:col, fontWeight:'600', fontSize:'0.95rem', textAlign:'left', cursor:'pointer',
                    transition:'all 0.2s', boxShadow:'inset 0 1px 0 rgba(255,255,255,0.05)',
                  }}>{o}</button>
                );
              })}
            </div>
            {answered && (
              <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
                style={{ background: lastCorrect ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', border:`1px solid ${lastCorrect ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`, borderRadius:'12px', padding:'14px 18px', marginTop:'1rem', fontSize:'0.85rem', color:'#94a3b8', lineHeight:1.7 }}>
                <span style={{ fontWeight:'800', color: lastCorrect ? '#4ade80' : '#f87171' }}>{lastCorrect ? '✓ CORRECTO · ' : '✗ INCORRECTO · '}</span>
                {q.explanation}
              </motion.div>
            )}
          </div>
          {answered && (
            <motion.button initial={{ opacity:0 }} animate={{ opacity:1 }} onClick={nextTrivia} style={{ ...goldBtn, alignSelf:'flex-end' }}>
              {triviaStep < QUESTIONS.length-1 ? 'SIGUIENTE →' : 'VER MI DIPLOMA →'}
            </motion.button>
          )}
        </motion.div>
      </div>
    );
  }

  // ── PANTALLA: DIPLOMA FORM ────────────────────────────────────────
  if (step === 'diploma-form') return (
    <div style={pageBase}>
      <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} style={{ ...glassCard, width:'100%', maxWidth:'600px', padding:'2.5rem', margin:'auto', display:'flex', flexDirection:'column', gap:'1.5rem' }}>
        <div style={{ textAlign:'center' }}>
          <div style={{ fontSize:'3rem', marginBottom:'0.5rem' }}>🏆</div>
          <h2 style={{ fontSize:'1.8rem', fontWeight:'900', color:C.gold, marginBottom:'0.5rem' }}>¡TRIVIA COMPLETADA!</h2>
          <p style={{ color:'#94a3b8', fontSize:'0.9rem' }}>Score final: <strong style={{ color:C.gold }}>{score} pts</strong> · Completa tus datos para tu diploma</p>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
          {[
            { label:'NOMBRE(S)', key:'nombres', placeholder:'Sus nombres' },
            { label:'APELLIDO(S)', key:'apellidos', placeholder:'Sus apellidos' },
          ].map(({ label, key, placeholder }) => (
            <div key={key}>
              <label style={{ display:'block', fontSize:'0.6rem', color:'#64748b', letterSpacing:'3px', marginBottom:'6px' }}>{label}</label>
              <input value={userData[key] || ''} onChange={e => setUserData({ ...userData, [key]: e.target.value })} placeholder={placeholder}
                style={{ width:'100%', background:'rgba(0,0,0,0.4)', border:`1.5px solid ${C.goldBrd}`, borderRadius:'12px', padding:'12px', color:'white', fontSize:'1rem', outline:'none', boxSizing:'border-box' }}/>
            </div>
          ))}
          <div>
            <label style={{ display:'block', fontSize:'0.6rem', color:'#64748b', letterSpacing:'3px', marginBottom:'6px' }}>CALIDAD JURÍDICA</label>
            <select value={userData.calidad} onChange={e => setUserData({ ...userData, calidad: e.target.value })}
              style={{ width:'100%', background:'rgba(0,0,0,0.4)', border:`1.5px solid ${C.goldBrd}`, borderRadius:'12px', padding:'12px', color:'white', fontSize:'0.9rem', outline:'none' }}>
              {['Planta','Contrata','Honorarios','Código del Trabajo'].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <button onClick={async () => {
            if (!userData.nombres || !userData.apellidos) { 
              playSound('wrong');
              alert('Completa tu nombre y apellido'); 
              return; 
            }
            playSound('success');
            setStep('diploma');
            try { await addDoc(collection(db, 'induccion_certificados_2025'), { ...userData, fecha: new Date().toISOString(), score, domain:'IMLS' }); }
            catch(e) { console.error(e); }
          }} style={{ ...goldBtn, width:'100%', marginTop:'0.5rem' }}>GENERAR CERTIFICADO OFICIAL 🎓</button>
        </div>
      </motion.div>
    </div>
  );

  // ── PANTALLA: DIPLOMA ─────────────────────────────────────────────
  if (step === 'diploma') return (
    <div style={{ minHeight:'100vh', background:'#0f0f0f', display:'flex', flexDirection:'column', alignItems:'center', fontFamily:"'Segoe UI', Roboto, sans-serif", padding:'2rem', overflowY:'auto' }}>
      <motion.div initial={{ y:40, opacity:0 }} animate={{ y:0, opacity:1 }}
        style={{ width:'100%', maxWidth:'900px', background:'white', borderRadius:'16px', padding:'clamp(2rem,5vw,4rem)', border:'20px double #C5A065', position:'relative', overflow:'hidden', boxShadow:'0 40px 80px rgba(0,0,0,0.8)', color:'#1a1a1a' }}>
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', opacity:0.04, pointerEvents:'none' }}>
          <img src="/escudo.png" alt="" style={{ height:'600px' }}/>
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'2rem', borderBottom:'3px solid rgba(197,160,101,0.2)', paddingBottom:'1.5rem' }}>
          <img src="/escudo.png" alt="IMLS" style={{ height:'70px' }}/>
          <div style={{ textAlign:'right' }}>
            <div style={{ color:C.gold, fontWeight:'900', fontSize:'0.8rem', letterSpacing:'3px' }}>ACADEMIA SMART IMLS</div>
            <div style={{ color:'#94a3b8', fontSize:'0.65rem', letterSpacing:'4px', marginTop:'4px' }}>LA SERENA · CHILE · 2025</div>
          </div>
        </div>
        <div style={{ textAlign:'center' }}>
          <h1 style={{ fontSize:'clamp(2.5rem,8vw,5rem)', fontWeight:'900', fontFamily:'Georgia, serif', letterSpacing:'0.1em', margin:'0 0 0.5rem', color:'#111' }}>CERTIFICADO</h1>
          <p style={{ color:'#888', fontStyle:'italic', fontSize:'1rem', marginBottom:'2rem', fontFamily:'Georgia, serif' }}>De Aprobación · Inducción Institucional RDMLS 2025</p>
          <p style={{ fontSize:'0.7rem', color:'#aaa', letterSpacing:'3px', marginBottom:'1rem' }}>OTORGADO A:</p>
          <h2 style={{ fontSize:'clamp(1.8rem,5vw,3.5rem)', fontWeight:'900', color:C.gold, margin:'0 0 1rem', letterSpacing:'-1px' }}>
            {userData.nombres} {userData.apellidos}
          </h2>
          <p style={{ fontWeight:'700', color:'#555', letterSpacing:'3px', fontSize:'0.8rem', marginBottom:'2rem' }}>
            {userData.calidad?.toUpperCase()} · {userData.area?.toUpperCase()}
          </p>
          <p style={{ fontFamily:'Georgia, serif', fontStyle:'italic', fontSize:'1rem', color:'#444', maxWidth:'600px', margin:'0 auto 2.5rem', lineHeight:1.7 }}>
            "Por haber completado con éxito el proceso de inducción institucional de la Ilustre Municipalidad de La Serena, adhiriendo a los valores, protocolos y misión de la Academia Smart IMLS 2025."
          </p>
          <div style={{ display:'flex', justifyContent:'space-around', alignItems:'flex-end', borderTop:'2px solid rgba(197,160,101,0.2)', paddingTop:'1.5rem' }}>
            <div style={{ textAlign:'center' }}><div style={{ fontStyle:'italic', color:'#ccc', fontSize:'1.5rem', fontFamily:'Georgia, serif', marginBottom:'8px' }}>Firma Digital RDMLS</div><div style={{ borderTop:'2px solid #ddd', paddingTop:'8px', fontSize:'0.6rem', letterSpacing:'2px', color:'#999' }}>DIRECCIÓN DE COMUNICACIONES</div></div>
            <div style={{ textAlign:'center' }}><div style={{ color:C.gold, fontWeight:'900', fontSize:'1rem', marginBottom:'6px' }}>RDMLS-IMLS-2025</div><QrCode size={44} color="#ccc"/><div style={{ fontSize:'0.55rem', color:'#bbb', letterSpacing:'1px', marginTop:'4px' }}>rdmls.cl · academia</div></div>
            <div style={{ textAlign:'center' }}><div style={{ fontStyle:'italic', color:'#ccc', fontSize:'1.5rem', fontFamily:'Georgia, serif', marginBottom:'8px' }}>Firma Alcaldía</div><div style={{ borderTop:'2px solid #ddd', paddingTop:'8px', fontSize:'0.6rem', letterSpacing:'2px', color:'#999' }}>ADMINISTRACIÓN MUNICIPAL</div></div>
          </div>
        </div>
      </motion.div>
      <div style={{ display:'flex', gap:'1rem', marginTop:'2rem' }}>
        <button onClick={() => { playSound('pop'); window.print(); }} style={{ ...goldBtn }}>IMPRIMIR DIPLOMA 🖨️</button>
        <button onClick={() => { playSound('pop'); setStep('dashboard'); }} style={{ ...goldBtn, background:'rgba(255,255,255,0.1)', color:'white', boxShadow:'none' }}>VOLVER AL CENTRO</button>
      </div>
    </div>
  );

  // ── PANTALLA: DASHBOARD ───────────────────────────────────────────
  return (
    <div style={{ ...pageBase, padding:'1rem', alignItems:'stretch' }}>
      <div style={{ width:'100%', maxWidth:'1400px', margin:'0 auto', display:'flex', flexDirection:'column', height:'100%', minHeight:'100vh' }}>

        {/* HEADER */}
        <div style={{ 
          display:'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent:'space-between', 
          alignItems: isMobile ? 'center' : 'flex-end', 
          padding: isMobile ? '0.8rem 0' : '1rem 0', 
          borderBottom:`1px solid ${C.glassBrd}`, 
          marginBottom:'1.2rem',
          textAlign: isMobile ? 'center' : 'left',
          gap: isMobile ? '1rem' : '0'
        }}>
          <div>
            <h1 style={{ fontSize: isMobile ? '1.5rem' : 'clamp(1.8rem,4vw,2.8rem)', fontWeight:'900', fontStyle:'italic', textTransform:'uppercase', margin:0, lineHeight:1 }}>Centro de Mando</h1>
            <p style={{ color:C.gold, fontWeight:'700', textTransform:'uppercase', fontSize: isMobile ? '0.55rem' : '0.65rem', letterSpacing:'4px', margin:'4px 0 0' }}>Malla Curricular IMLS · Academia Smart 2025</p>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'12px', width: isMobile ? '100%' : 'auto', justifyContent: isMobile ? 'center' : 'flex-end' }}>
            <button onClick={toggleAudio} style={{
              display:'flex', alignItems:'center', gap:'8px', padding: isMobile ? '6px 12px' : '8px 16px',
              background: isPlaying ? C.goldDim : C.glass,
              border: `1px solid ${isPlaying ? C.gold : C.glassBrd}`,
              borderRadius:'999px', color: isPlaying ? C.gold : 'rgba(255,255,255,0.3)',
              fontSize: isMobile ? '0.6rem' : '0.75rem', fontWeight:'700', letterSpacing:'2px', cursor:'pointer',
              boxShadow:'inset 0 1px 0 rgba(255,255,255,0.08)',
              backdropFilter:'blur(20px)',
            }}>
              {isPlaying ? <Radio size={isMobile ? 14 : 18} className="animate-pulse"/> : <Radio size={isMobile ? 14 : 18}/>}
              {isPlaying ? 'RDMLS FM' : 'RADIO OFF'}
            </button>
            <button onClick={() => { playSound('pop'); setShowAdminMode(true); }} style={{ background:'transparent', border:'none', cursor:'pointer' }}>
              <div style={{ background:C.gold, padding: isMobile ? '6px' : '10px', borderRadius:'14px', boxShadow:`0 4px 20px rgba(197,160,101,0.4), inset 0 1px 0 rgba(255,255,255,0.4)`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Cpu size={isMobile ? 20 : 28} color="black"/>
              </div>
            </button>
          </div>
        </div>

        {/* GRID DE MÓDULOS */}
        <div style={{ display:'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(200px, 1fr))', gap: isMobile ? '10px' : '15px', flex:1, overflow:'auto', paddingBottom:'1.5rem' }}>
          {MODULOS.map(m => (
            <button key={m.id} onClick={() => openModal(m)} style={{
              ...glassCard,
              padding:'1.5rem 1rem',
              display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'10px',
              textAlign:'center', cursor:'pointer', border:`1px solid ${completed.includes(m.id) ? 'rgba(34,197,94,0.3)' : C.glassBrd}`,
              opacity: completed.includes(m.id) ? 0.6 : 1,
              transition:'all 0.25s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.transform = 'translateY(-4px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = completed.includes(m.id) ? 'rgba(34,197,94,0.3)' : C.glassBrd; e.currentTarget.style.transform = 'translateY(0)'; }}>
              {/* Bevel highlight */}
              <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)' }}></div>
              <span style={{ fontSize:'2rem' }}>{m.icon}</span>
              <div>
                <div style={{ fontWeight:'900', fontSize:'0.85rem', textTransform:'uppercase', fontStyle:'italic', color:'white', lineHeight:1.2, marginBottom:'4px' }}>{m.label}</div>
                <div style={{ fontSize:'0.65rem', color:'rgba(255,255,255,0.3)', letterSpacing:'1px' }}>{m.desc}</div>
              </div>
              {completed.includes(m.id) && <CheckCircle size={16} color="#4ade80"/>}
            </button>
          ))}
        </div>

        {/* FOOTER STATUS */}
        <div style={{
          ...glassCard,
          background:`linear-gradient(135deg, ${C.gold} 0%, #d4b07a 100%)`,
          padding: isMobile ? '1rem 1.2rem' : '1.2rem 2rem',
          display:'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          alignItems:'center', 
          justifyContent:'space-between',
          marginTop:'1rem', 
          color:'black',
          gap: isMobile ? '1rem' : '0',
          boxShadow:`0 -4px 30px rgba(197,160,101,0.3), inset 0 1px 0 rgba(255,255,255,0.5)`,
        }}>
          <div style={{ display:'flex', alignItems:'center', gap: isMobile ? '0.8rem' : '1rem', width: isMobile ? '100%' : 'auto' }}>
            <div style={{ width: isMobile ? 44 : 56, height: isMobile ? 44 : 56, borderRadius:'50%', background:'rgba(0,0,0,0.6)', border:'2px solid rgba(255,255,255,0.2)', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'900', fontSize: isMobile ? '0.9rem' : '1.2rem', color:C.gold }}>{progress}%</div>
            <div>
              <div style={{ fontWeight:'900', fontSize: isMobile ? '1rem' : '1.3rem', fontStyle:'italic', textTransform:'uppercase', lineHeight:1 }}>Status Global</div>
              <div style={{ fontSize: isMobile ? '0.5rem' : '0.6rem', letterSpacing:'3px', opacity:0.6 }}>{userData.nombres?.toUpperCase() || 'FUNCIONARIO'} · IMLS 2025</div>
            </div>
          </div>
          <div style={{ display:'flex', gap:'10px', width: isMobile ? '100' : 'auto', justifyContent: isMobile ? 'space-between' : 'flex-end' }}>
            <button onClick={() => { playSound('pop'); setTriviaStep(0); setAnswered(false); setScore(0); setStep('trivia'); }} style={{ ...goldBtn, background:'rgba(0,0,0,0.7)', color:'white', boxShadow:'none', border:'1px solid rgba(255,255,255,0.1)', flex: isMobile ? 1 : 'none', fontSize: isMobile ? '0.7rem' : '0.85rem' }}>EVALUACIÓN FINAL →</button>
            <button onClick={() => { playSound('wrong'); localStorage.removeItem('imls_user_2025'); window.location.reload(); }} style={{ background:'rgba(0,0,0,0.3)', border:'1px solid rgba(0,0,0,0.2)', borderRadius:'12px', padding:'10px 14px', cursor:'pointer', color:'black' }}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg></button>
          </div>
        </div>
      </div>

      {/* ── MODAL DE MÓDULO ── */}
      <AnimatePresence>
        {openMod && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            onClick={e => { if(e.target === e.currentTarget) closeModal(); }}
            style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.85)', backdropFilter:'blur(12px)', display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem', zIndex:200000 }}>
            <motion.div initial={{ scale:0.92, y:20 }} animate={{ scale:1, y:0 }} exit={{ scale:0.95 }}
              style={{ ...glassCard, width:'100%', maxWidth:'900px', maxHeight:'90vh', display:'flex', flexDirection:'column', overflow:'hidden' }}>
              
              {/* Modal Header */}
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'1.2rem 1.5rem', borderBottom:`1px solid ${C.glassBrd}`, background:'rgba(0,0,0,0.3)', position:'relative' }}>
                <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:`linear-gradient(90deg, transparent, ${C.gold}80, transparent)` }}></div>
                <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
                  <div style={{ background:C.goldDim, border:`1px solid ${C.goldBrd}`, borderRadius:'12px', padding:'10px' }}>
                    <span style={{ fontSize:'1.5rem' }}>{openMod.icon}</span>
                  </div>
                  <div>
                    <span style={{ display:'block', color:C.gold, fontSize:'0.6rem', letterSpacing:'4px', fontWeight:'700' }}>MÓDULO INTERACTIVO</span>
                    <span style={{ fontWeight:'900', fontSize:'1.3rem', fontStyle:'italic', textTransform:'uppercase' }}>{openMod.label}</span>
                  </div>
                </div>
                <button onClick={closeModal} style={{ background:'rgba(255,255,255,0.05)', border:`1px solid ${C.glassBrd}`, borderRadius:'10px', padding:'8px', cursor:'pointer', color:'rgba(255,255,255,0.4)' }}>
                  <X size={20}/>
                </button>
              </div>

              {/* Modal Body */}
              <div style={{ display:'flex', flexDirection: isMobile ? 'column' : 'row', flex:1, overflow: isMobile ? 'auto' : 'hidden', minHeight: isMobile ? 'unset' : '400px' }}>
                {/* Imagen contextual */}
                {openMod.img && (
                  <div style={{ width: isMobile ? '100%' : '40%', height: isMobile ? '180px' : 'auto', position:'relative', overflow:'hidden', flexShrink:0 }}>
                    <AIGenerativeImage src={openMod.img} alt={openMod.label} style={{ objectFit:'cover', opacity:0.8 }} />
                    <div style={{ position:'absolute', inset:0, background: isMobile ? 'linear-gradient(to bottom, transparent, #0F0201)' : 'linear-gradient(to right, transparent 60%, #0F0201)', pointerEvents:'none' }}></div>
                  </div>
                )}

                {/* Contenido */}
                <div style={{ flex:1, padding:'1.5rem', overflow:'auto', display:'flex', flexDirection:'column', gap:'1rem' }}>

                  {/* PPTX Viewer con Fallback */}
                  {openMod.isPPTX && (
                    <div style={{ flex:1, display:'flex', flexDirection:'column', gap:'1rem' }}>
                      {/* Alerta de si Office demora */}
                      <div style={{ ...glassCard, padding:'0.7rem 1rem', display:'flex', alignItems:'center', gap:'12px', background:'rgba(250,204,21,0.05)' }}>
                        <AlertTriangle size={18} color="#C5A065"/>
                        <p style={{ color:'#C5A065', fontSize:'0.7rem', fontWeight:'600', margin:0 }}>
                          Cargando visor oficial... Si detecta un error de Microsoft, use el botón para descargar.
                        </p>
                      </div>

                      <iframe 
                        src={openMod.src}
                        style={{ flex:1, width:'100%', minHeight:'480px', border:'none', borderRadius:'12px', background:'#fff' }} 
                        allowFullScreen
                      ></iframe>

                      <div style={{ display:'flex', gap:'10px' }}>
                        <button onClick={() => { playSound('pop'); window.open(openMod.rawRef, '_blank'); }} style={{ ...goldBtn, flex:1, fontSize:'0.75rem' }}>
                          ⬇️ DESCARGAR PPTX
                        </button>
                        <button onClick={() => setStep('dashboard')} style={{ ...goldBtn, flex:1, background:'rgba(255,255,255,0.1)', color:'white', fontSize:'0.75rem' }}>
                          ENTENDIDO
                        </button>
                      </div>
                      
                      {/* Resumen Visual */}
                      <div style={{ marginTop:'0.5rem' }}>
                         <p style={{ fontSize:'0.65rem', color:'rgba(255,255,255,0.3)', textTransform:'uppercase', letterSpacing:'2px' }}>Resumen Visual Institucional</p>
                         <div style={{ display:'flex', gap:'8px', overflowX:'auto', paddingBottom:'10px' }}>
                           {GALERIA.map((img, i) => (
                             <AIGenerativeImage key={i} src={img} alt="slide" wrapperStyle={{ width:'80px', height:'50px', borderRadius:'6px', flexShrink:0, cursor:'pointer' }} style={{ borderRadius:'6px', opacity:0.6 }} onClick={() => window.open(img, '_blank')} />
                           ))}
                         </div>
                      </div>
                    </div>
                  )}

                  {/* Galería */}
                  {openMod.isGallery && (
                    <>
                      <p style={{ color:C.gold, fontWeight:'700', fontSize:'0.7rem', letterSpacing:'3px' }}>REGISTRO VISUAL INSTITUCIONAL</p>
                      <div style={{ flex:1, position:'relative', borderRadius:'16px', overflow:'hidden', minHeight:'280px' }}>
                        <AIGenerativeImage src={GALERIA[galleryIdx]} alt="Galeria Institucional" style={{ objectFit:'cover' }} />
                        <div style={{ position:'absolute', bottom:'1rem', left:'50%', transform:'translateX(-50%)', background:'rgba(0,0,0,0.7)', padding:'4px 14px', borderRadius:'999px', fontSize:'0.75rem', color:'white' }}>{galleryIdx+1} / {GALERIA.length}</div>
                      </div>
                      <div style={{ display:'flex', gap:'10px' }}>
                        <button onClick={() => setGalleryIdx(i => i > 0 ? i-1 : GALERIA.length-1)} style={{ ...goldBtn, flex:1 }}>← ANTERIOR</button>
                        <button onClick={() => setGalleryIdx(i => i < GALERIA.length-1 ? i+1 : 0)} style={{ ...goldBtn, flex:1 }}>SIGUIENTE →</button>
                      </div>
                    </>
                  )}

                  {/* Idiomas */}
                  {openMod.isLang && (
                    <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'1rem', textAlign:'center' }}>
                      <span style={{ fontSize:'4rem' }}>{openMod.icon}</span>
                      <h3 style={{ fontSize:'1.5rem', fontWeight:'900', color:C.gold }}>{openMod.label}</h3>
                      <p style={{ color:'#94a3b8', fontSize:'0.9rem', lineHeight:1.7 }}>Módulo de capacitación intercultural en desarrollo. Integra frases clave para la atención de ciudadanos en este idioma.</p>
                    </div>
                  )}

                  {/* Contenido estándar */}
                  {openMod.content && openMod.content.map(({ k, v }) => (
                    <div key={k} style={{ ...glassCard, padding:'1rem 1.2rem', borderLeft:`3px solid ${C.gold}`, borderRadius:'12px' }}>
                      <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:`linear-gradient(90deg, ${C.gold}60, transparent)` }}></div>
                      <span style={{ display:'block', fontSize:'0.6rem', fontWeight:'900', letterSpacing:'3px', color:C.gold, marginBottom:'6px' }}>{k}</span>
                      <p style={{ fontSize:'1rem', fontWeight:'600', color:'white', fontStyle:'italic', lineHeight:1.6, margin:0 }}>"{v}"</p>
                    </div>
                  ))}

                  {/* QUIZ INTERACTIVO INLINE */}
                  {openMod.quiz && (
                    <div style={{ marginTop:'1.5rem', borderTop:`1px solid ${C.glassBrd}`, paddingTop:'1.5rem' }}>
                      <p style={{ color:C.gold, fontWeight:'900', fontSize:'0.75rem', letterSpacing:'3px', marginBottom:'1rem' }}>CUESTIONARIO DE VALIDACIÓN</p>
                      <p style={{ fontSize:'1.1rem', fontWeight:'700', marginBottom:'1.5rem', color:'white' }}>{openMod.quiz.q}</p>
                      <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
                        {openMod.quiz.opts.map((o, i) => {
                           let bg = 'rgba(255,255,255,0.05)', b = C.glassBrd;
                           if (modQuiz.showFeedback) {
                             if (i === openMod.quiz.ans) { bg = 'rgba(34,197,94,0.15)'; b = '#22c55e80'; }
                             else if (i === modQuiz.answer) { bg = 'rgba(239,68,68,0.15)'; b = '#ef444480'; }
                           }
                           return (
                             <button key={i} onClick={() => handleModQuizAnswer(i)} style={{
                               background: bg, border: `1px solid ${b}`, borderRadius: '12px', padding: '12px 16px',
                               color: 'white', fontWeight: '600', textAlign: 'left', cursor: modQuiz.showFeedback ? 'default' : 'pointer', fontSize:'0.9rem'
                             }}>{o}</button>
                           );
                        })}
                      </div>
                      {modQuiz.showFeedback && (
                        <div style={{ marginTop:'1rem', padding:'1rem', borderRadius:'12px', background: modQuiz.answer === openMod.quiz.ans ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${modQuiz.answer === openMod.quiz.ans ? '#22c55e40' : '#ef444440'}`, color:'#94a3b8', fontSize:'0.85rem' }}>
                          <span style={{ fontWeight:'900', color: modQuiz.answer === openMod.quiz.ans ? '#4ade80' : '#f87171', marginRight:'8px' }}>
                            {modQuiz.answer === openMod.quiz.ans ? 'CORRECTO' : 'REINTENTAR'}
                          </span>
                          {modQuiz.answer === openMod.quiz.ans ? openMod.quiz.exp : 'Vuelve a leer el contenido y selecciona la respuesta correcta.'}
                        </div>
                      )}
                    </div>
                  )}

                  {!openMod.quiz && !openMod.isPPTX && !openMod.isGallery && !openMod.isLang &&  !openMod.content && (
                    <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', gap:'1rem' }}>
                      <span style={{ fontSize:'3rem' }}>{openMod.icon}</span>
                      <p style={{ color:'#64748b', fontSize:'0.9rem' }}>Contenido de este módulo disponible en la sección Recursos.</p>
                    </div>
                  )}

                  <div style={{ marginTop:'2rem' }}>
                    {openMod.quiz ? (
                      <button 
                        disabled={!modQuiz.showFeedback || modQuiz.answer !== openMod.quiz.ans}
                        onClick={() => validateMod(openMod.id)} 
                        style={{ ...goldBtn, width:'100%', opacity: (!modQuiz.showFeedback || modQuiz.answer !== openMod.quiz.ans) ? 0.4 : 1, cursor: (!modQuiz.showFeedback || modQuiz.answer !== openMod.quiz.ans) ? 'not-allowed' : 'pointer' }}
                      >
                        {completed.includes(openMod.id) ? '✓ MÓDULO COMPLETADO' : 'VALIDAR Y CONTINUAR →'}
                      </button>
                    ) : (
                      <button onClick={() => validateMod(openMod.id)} style={{ ...goldBtn, width:'100%' }}>
                        {completed.includes(openMod.id) ? '✓ MÓDULO COMPLETADO' : 'VALIDAR MÓDULO →'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showFullGate && (
          <IdentityGate 
            onClose={() => setShowFullGate(false)} 
            onVerified={(mode) => {
               setUserData(p => ({ ...p, nombres: 'Funcionario', apellidos: 'Verificado', area: mode === 'institution' ? 'Institucional' : 'Ciudadano' }));
               setStep('dashboard');
               setShowFullGate(false);
            }} 
          />
        )}
      </AnimatePresence>

      {/* ── MODO ADMINISTRADOR: PRESENTACIÓN TICs Y ARQUITECTURA ── */}
      <AnimatePresence>
        {showAdminMode && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.95)', backdropFilter:'blur(20px)', display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem', zIndex:200000, overflow:'hidden' }}>
            <motion.div initial={{ scale:0.92, y:20 }} animate={{ scale:1, y:0 }} exit={{ scale:0.95 }}
              style={{ ...glassCard, width:'100%', maxWidth:'1000px', maxHeight:'95vh', display:'flex', flexDirection:'column', overflow:'hidden', border:`1px solid ${C.gold}`, boxShadow:`0 0 100px rgba(197,160,101,0.2)` }}>
              
              {/* Header TICs */}
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'1.5rem', borderBottom:`1px solid ${C.glassBrd}`, background:'rgba(0,0,0,0.5)' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'15px' }}>
                  <div style={{ background:C.gold, borderRadius:'12px', padding:'10px' }}>
                    <Cpu size={28} color="black" />
                  </div>
                  <div>
                    <span style={{ display:'block', color:C.gold, fontSize:'0.7rem', letterSpacing:'5px', fontWeight:'900', textTransform:'uppercase' }}>Presentación Institucional TICs</span>
                    <span style={{ fontWeight:'900', fontSize:'1.5rem', fontStyle:'italic', textTransform:'uppercase' }}>ARQUITECTURA VLS 2025</span>
                  </div>
                </div>
                <button onClick={() => setShowAdminMode(false)} style={{ background:'transparent', border:`1px solid ${C.glassBrd}`, borderRadius:'10px', padding:'10px', cursor:'pointer', color:'white' }}>
                  <X size={24}/>
                </button>
              </div>

              {/* Body */}
              <div style={{ flex:1, overflowY:'auto', padding:'2rem', display:'flex', flexDirection:'column', gap:'2rem' }}>
                <p style={{ color:'#94a3b8', fontSize:'1.1rem', lineHeight:1.7, margin:0, fontWeight:'600' }}>
                  Esta plataforma no es un sistema estático; es el <span style={{ color:C.gold, fontWeight:'900' }}>Ecosistema Digital 2025</span> para la IMLS. Desarrollado con tecnología Edge, inteligencia artificial cognitiva y un frontend de ultra-desempeño diseñado para escalar en toda la red municipal de La Serena.
                </p>

                {/* Stack Tags */}
                <div style={{ display:'flex', gap:'15px', flexWrap:'wrap' }}>
                   {['React 19 Hooks', 'Cloudflare Pages (Edge)', 'Gemini Flash AI', 'Cloudflare D1 (SQL Serverless)', 'Vite.js Build'].map(t => (
                     <div key={t} style={{ background:'rgba(255,255,255,0.05)', border:`1px solid ${C.glassBrd}`, borderRadius:'8px', padding:'8px 16px', fontSize:'0.85rem', color:'white', fontWeight:'700', letterSpacing:'1px' }}>
                        {t}
                     </div>
                   ))}
                </div>

                {/* ANIMACIÓN: Flujo de Datos Interactiva */}
                <div style={{ background:'rgba(0,0,0,0.4)', borderRadius:'20px', border:`1px solid ${C.glassBrd}`, padding:'2rem', display:'flex', flexDirection:'column', alignItems:'center', position:'relative', overflow:'hidden' }}>
                    <div style={{ color:C.gold, fontSize:'0.7rem', letterSpacing:'4px', fontWeight:'900', textTransform:'uppercase', marginBottom:'2rem', alignSelf:'flex-start' }}>FLUJO DE MICROSERVICIOS Y TELEMETRÍA MÓVIL</div>
                    
                    <div style={{ display:'flex', flexDirection: isMobile ? 'column' : 'row', alignItems:'center', justifyContent:'space-between', width:'100%', maxWidth:'800px', position:'relative' }}>
                        
                        {/* Línea de conexión de fondo */}
                        {!isMobile && <div style={{ position:'absolute', top:'50%', left:'5%', right:'5%', height:'2px', background:'rgba(197,160,101,0.2)', zIndex:0 }}></div>}
                        
                        {/* Componentes de la Arquitectura */}
                        {[
                          { id: 1, label: "Funcionario", icon: <User size={isMobile ? 24 : 32} color={C.gold}/>, detail: "Interfaz Móvil / Desktop" },
                          { id: 2, label: "Red Global (Edge)", icon: <Globe size={isMobile ? 24 : 32} color={C.gold}/>, detail: "Cloudflare Routing" },
                          { id: 3, label: "IA Cognitiva", icon: <Bot size={isMobile ? 24 : 32} color={C.gold}/>, detail: "Gemini / Faro AI" },
                          { id: 4, label: "DB Serverless", icon: <Database size={isMobile ? 24 : 32} color={C.gold}/>, detail: "SQL + D1 Storage" },
                        ].map((node, i) => (
                           <div key={node.id} style={{ display:'flex', flexDirection:'column', alignItems:'center', zIndex:1, background:'#050505', padding:'10px', borderRadius:'10px', margin: isMobile ? '10px 0' : '0' }}>
                              <motion.div 
                                animate={{ y: [0, -10, 0], boxShadow: [`0 0 0px ${C.goldDim}`, `0 0 30px ${C.gold}`, `0 0 0px ${C.goldDim}`] }}
                                transition={{ repeat: Infinity, duration: 3, delay: i * 0.5 }}
                                style={{ width:'80px', height:'80px', borderRadius:'50%', background:'rgba(255,255,255,0.03)', border:`2px solid ${C.gold}`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'15px', position:'relative' }}
                              >
                                {node.icon}
                                {/* Pulso de transmisión */}
                                <motion.div animate={{ scale:[1,2.5], opacity:[0.8,0] }} transition={{ repeat:Infinity, duration:2, delay: i*0.8 }} style={{ position:'absolute', inset:0, border:`1px solid ${C.gold}`, borderRadius:'50%' }}></motion.div>
                              </motion.div>
                              <div style={{ fontWeight:'900', color:'white', fontSize:'1.1rem', marginBottom:'5px', textTransform:'uppercase', letterSpacing:'1px' }}>{node.label}</div>
                              <div style={{ fontSize:'0.7rem', color:'#64748b', letterSpacing:'1px' }}>{node.detail}</div>
                           </div>
                        ))}
                    </div>
                </div>

                {/* Detalles Operativos */}
                <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap:'2rem' }}>
                    <div>
                        <h4 style={{ color:C.gold, fontSize:'0.85rem', textTransform:'uppercase', letterSpacing:'2px', marginBottom:'10px' }}>Ventaja Financiera TICs</h4>
                        <p style={{ color:'#94a3b8', fontSize:'0.95rem', lineHeight:1.6, margin:0 }}>Al emplear Edge Computing, el costo del servidor físico desaparece. Operativo 24/7 sin dependencias de hardware interno sujeto a cortes eléctricos del municipio.</p>
                    </div>
                    <div>
                        <h4 style={{ color:C.gold, fontSize:'0.85rem', textTransform:'uppercase', letterSpacing:'2px', marginBottom:'10px' }}>Seguridad e Integridad</h4>
                        <p style={{ color:'#94a3b8', fontSize:'0.95rem', lineHeight:1.6, margin:0 }}>Inyección de IA a nivel perimetral. Cada ciudadano/funcionario está protegido por JWT + Biometría (WebAuthn). Las bases de datos nunca exponen IPs públicas.</p>
                    </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <SmartAssistantInduccion />
      
      {isRDMLS && (
        <a 
          href="https://rdmls.cl" 
          style={{ position:'fixed', bottom:'20px', left:'20px', background:'#fbbf24', color:'black', padding:'10px 20px', borderRadius:'30px', fontWeight:'900', textDecoration:'none', zIndex:10000, boxShadow:'0 5px 20px rgba(251,191,36,0.3)', display:'flex', alignItems:'center', gap:'10px' }}
        >
          <ChevronLeft size={20}/> VOLVER A RADIO
        </a>
      )}

      <MicroTutorialVLS section="induccion" isOpen={showTutorial} onFinish={() => setShowTutorial(false)} />
    </div>
  );
}
