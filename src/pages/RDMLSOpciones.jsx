import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Radio, Mic, Wifi, Globe, Shield, Zap, ArrowLeft, ChevronRight,
  FileText, Map, Activity, BarChart3, Smartphone,
  Volume2, Award, Users, Clock, Music, Headphones, Signal,
  UserCheck, Eye, List
} from 'lucide-react';
import { db } from '../utils/firebase';
import { collection, addDoc, getDocs, serverTimestamp, orderBy, query, limit } from 'firebase/firestore';

/* ─── PIN ─── */
const PIN = '2026';
const ADMIN_PIN = '8590'; // PIN especial para ver el registro de accesos

/* ─── DATA ─── */
const FEATURES = [
  {
    id: 'stream',
    icon: Signal,
    color: '#f97316',
    label: 'STREAMING PROFESIONAL',
    subtitle: 'Emisión Digital 24/7',
    items: [
      'Señal principal: az11.yesstreaming.net puerto 8590',
      'Protocolo Icecast2 / Shoutcast con redundancia',
      'Bitrate 128 kbps MP3 para máxima compatibilidad',
      'Latencia menor a 3 segundos en dispositivos móviles',
      'Soporte simultáneo para miles de oyentes conectados',
      'Monitoreo automático y reconexión en caso de corte'
    ]
  },
  {
    id: 'player',
    icon: Headphones,
    color: '#38bdf8',
    label: 'REPRODUCTOR AVANZADO',
    subtitle: 'Experiencia de Escucha Premium',
    items: [
      'Ecualizador multi-preset: Normal, Claro, Grave y V-90s',
      'VU Meters analógicos visualizando el nivel en tiempo real',
      'Visualizador de espectro de frecuencias en canvas HTML5',
      'Control de volumen con perilla analógica interactiva',
      'Modo silencio/mute con ganancia por Web Audio API',
      'Dial de frecuencias estilo receptor de radio AM/FM'
    ]
  },
  {
    id: 'pwa',
    icon: Smartphone,
    color: '#a855f7',
    label: 'APP INSTALABLE (PWA)',
    subtitle: 'Radio en Tu Dispositivo',
    items: [
      'Instalable como App nativa en Android, iOS y escritorio',
      'Funciona sin depender de App Store ni Google Play',
      'Icono en pantalla de inicio con splash screen institucional',
      'Notificaciones push para avisos y emergencias municipales',
      'Caché inteligente para carga instantánea en redes lentas',
      'Acceso offline al catálogo de programación y noticias'
    ]
  },
  {
    id: 'broadcast',
    icon: Mic,
    color: '#10b981',
    label: 'CABINA VIRTUAL',
    subtitle: 'Herramientas del Locutor',
    items: [
      'Panel de administración accesible desde cualquier dispositivo',
      'Gestión de noticias, marquees y cintillos informativos',
      'Carga de metadatos del programa en emisión (Now Playing)',
      'Panel de emergencias para difusión urgente de alertas',
      'Registro de audiencia y estadísticas de escucha',
      'Integración con redes sociales para difusión automática'
    ]
  },
  {
    id: 'clock',
    icon: Clock,
    color: '#fde047',
    label: 'HORASERENA · RELOJ OFICIAL',
    subtitle: 'La Hora de La Serena',
    items: [
      'Reloj digital oficial sincronizado con hora de Chile/Santiago',
      'Display estilo LCD retro con modo 12h y 24h configurable',
      'Visible en el header institucional con temperatura en tiempo real',
      'Temperatura actualizada desde sensores Open-Meteo La Serena',
      'Widget draggable con temas de color personalizables',
      'Persistencia de preferencias en almacenamiento local del usuario'
    ]
  },
  {
    id: 'identity',
    icon: Award,
    color: '#C5A065',
    label: 'IDENTIDAD INSTITUCIONAL',
    subtitle: 'Marca Municipal Oficial',
    items: [
      'Paleta cromática oficial: rojo borgota, dorado y negro institucionales',
      'Escudo de la I. Municipalidad de La Serena integrado en todo el portal',
      'Favicon y splash screen propios de la emisora',
      'Títulos y metadatos SEO institucionales en todas las páginas',
      'Diseño "zero-distraction" enfocado en la escucha y la información',
      'Total separación visual del portal ciudadano VLS (vecinoslaserena.cl)'
    ]
  }
];

const TECH_STACK = [
  { label: 'Web Audio API', desc: 'Cadena de audio digital con EQ y análisis de espectro en tiempo real', icon: Volume2 },
  { label: 'React 18 + Vite', desc: 'SPA de carga ultra rápida con lazy loading de módulos pesados', icon: Zap },
  { label: 'Icecast2 / az11', desc: 'Servidor de streaming profesional con soporte multi-oyente masivo', icon: Radio },
  { label: 'Firebase Hosting', desc: 'CDN de Google con 99.9% de disponibilidad y HTTPS automático', icon: Globe },
  { label: 'Cloudflare Pages', desc: 'Distribución edge global con Workers como capa de redundancia', icon: Shield },
  { label: 'PWA + Service Worker', desc: 'Instalación nativa sin tiendas de apps y funcionalidad offline', icon: Smartphone },
  { label: 'Open-Meteo API', desc: 'Datos meteorológicos en tiempo real para La Serena (lat -29.9027)', icon: Activity },
  { label: 'Canvas + requestAnimationFrame', desc: 'Visualizador de espectro de 60fps sin dependencias externas', icon: BarChart3 },
];

const LEGAL_BASIS = [
  {
    num: 'DFL Nº 1/2004',
    title: 'Ley General de Telecomunicaciones',
    desc: 'Regula las telecomunicaciones en Chile. El streaming por internet complementa la señal FM oficial 100.1 MHz sin requerir concesión adicional, al operar sobre infraestructura de datos.'
  },
  {
    num: 'Ley 19.733',
    title: 'Libertades de Opinión e Información',
    desc: 'Garantiza el derecho a informar a través de medios de comunicación social. La radio municipal es un medio oficial habilitado por esta ley para la expresión institucional del municipio.'
  },
  {
    num: 'Ley 21.180',
    title: 'Transformación Digital del Estado',
    desc: 'Obliga a los organismos públicos a digitalizar sus servicios. La versión streaming de la radio municipal da cumplimiento a este mandato expandiendo el alcance de la señal RF a internet.'
  },
  {
    num: 'Ley 19.880',
    title: 'Procedimientos Administrativos',
    desc: 'Las notificaciones y avisos de procedimientos municipales pueden difundirse por la radio digital como canal oficial de comunicación con la ciudadanía.'
  },
  {
    num: 'D.S. Nº 102/2020',
    title: 'Radiodifusión Comunitaria',
    desc: 'Marco regulatorio para emisoras de servicio público. La RDMLS opera en el espíritu de este decreto, priorizando el interés comunitario y la información de utilidad pública.'
  },
  {
    num: 'Ley 20.416',
    title: 'Estatuto Pymes / Comercio Local',
    desc: 'La radio municipal como canal de difusión legítimo para el comercio local y las iniciativas económicas de la comuna de La Serena.'
  },
  {
    num: 'Ley 19.799',
    title: 'Documentos Electrónicos',
    desc: 'Respalda la validez legal de contenidos y comunicaciones generados y difundidos a través del portal digital oficial rdmls.cl.'
  },
];

const ROAD_PHASES = [
  {
    fase: 'FASE 1 · FUNDACIÓN', label: 'Señal Digital Institucional', status: 'ACTIVO', color: '#10b981',
    items: [
      'Dominios rdmls.cl y laserena-d1263.web.app activos con HTTPS',
      'Stream Icecast en az11.yesstreaming.net:8590/radio.mp3 operativo 24/7',
      'Reproductor web con dial, EQ 4 presets y VU Meters',
      'Reloj oficial HoraSerena con temperatura en tiempo real',
      'PWA instalable con icono en pantalla de inicio'
    ]
  },
  {
    fase: 'FASE 2 · CONTENIDO', label: 'Grilla y Gestión Editorial', status: 'ACTIVO', color: '#10b981',
    items: [
      'Sistema de noticias institucionales con panel de administración',
      'Marquee de cintillo informativo editable en tiempo real',
      'Integración con prensa municipal y redes sociales IMLS',
      'Panel de emergencias para avisos urgentes a la ciudadanía',
      'Backoffice de radio accesible desde móvil para locutores'
    ]
  },
  {
    fase: 'FASE 3 · AUDIENCIA', label: 'Interacción Ciudadana', status: 'EN DESARROLLO', color: '#f59e0b',
    items: [
      'Contador de oyentes simultáneos en tiempo real',
      'Sistema de peticiones musicales y mensajes al aire',
      'Chat en vivo durante emisiones especiales (concejo, eventos)',
      'Sistema de encuestas y votaciones ciudadanas online',
      'App nativa Android/iOS con notificaciones push para programas'
    ]
  },
  {
    fase: 'FASE 4 · ARCHIVO', label: 'Biblioteca Sonora Municipal', status: 'PLANIFICADO', color: '#64748b',
    items: [
      'Grabación y archivo de toda la programación emitida',
      'Podcast on-demand de programas municipales destacados',
      'Buscador de noticias y emisiones históricas por fecha o tema',
      'Fonoteca digital del patrimonio sonoro de La Serena',
      'Integración con el sistema de gestión documental IMLS'
    ]
  },
  {
    fase: 'FASE 5 · IA', label: 'Radio Inteligente Aumentada', status: 'PLANIFICADO', color: '#64748b',
    items: [
      'DJ Virtual con IA para locución institucional automatizada',
      'Reconocimiento de voz para transcripción y subtitulado en vivo',
      'Resumen automático de noticias del Concejo Municipal',
      'Generación de boletines informativos con IA generativa',
      'Análisis semántico de contenido para cumplimiento editorial'
    ]
  }
];

/* ─────────────────────────── COMPONENTE ─────────────────────────── */
export default function RDMLSOpciones() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('funciones');
  const [visible, setVisible] = useState(false);

  // GATE STATE
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem('rdmls_opciones_ok') === 'true');
  const [isAdmin, setIsAdmin]   = useState(() => sessionStorage.getItem('rdmls_opciones_admin') === 'true');
  const [nombre, setNombre]     = useState('');
  const [cargo, setCargo]       = useState('');
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [shake, setShake]       = useState(false);
  const [loading, setLoading]   = useState(false);

  // ACCESS LOG
  const [accessLog, setAccessLog] = useState([]);
  const [loadingLog, setLoadingLog] = useState(false);

  const handleGate = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) { setPinError('Ingresa tu nombre'); return; }
    if (!cargo.trim())  { setPinError('Ingresa tu cargo o departamento'); return; }
    if (!pinInput)      { setPinError('Ingresa el código'); return; }

    if (pinInput === ADMIN_PIN) {
      // Admin: log + mostrar registro
      setLoading(true);
      try {
        await addDoc(collection(db, 'rdmls_opciones_log'), {
          nombre: nombre.trim(), cargo: cargo.trim(),
          ts: serverTimestamp(), tipo: 'admin',
          ua: navigator.userAgent.slice(0,80)
        });
      } catch(_) {}
      sessionStorage.setItem('rdmls_opciones_ok', 'true');
      sessionStorage.setItem('rdmls_opciones_admin', 'true');
      setIsAdmin(true); setUnlocked(true); setLoading(false);
      return;
    }

    if (pinInput === PIN) {
      setLoading(true);
      try {
        await addDoc(collection(db, 'rdmls_opciones_log'), {
          nombre: nombre.trim(), cargo: cargo.trim(),
          ts: serverTimestamp(), tipo: 'usuario',
          ua: navigator.userAgent.slice(0,80)
        });
      } catch(_) {}
      sessionStorage.setItem('rdmls_opciones_ok', 'true');
      setUnlocked(true); setLoading(false);
      return;
    }

    setPinError('Código incorrecto'); setShake(true); setPinInput('');
    setTimeout(() => { setPinError(''); setShake(false); }, 1600);
  };

  const fetchLog = async () => {
    setLoadingLog(true);
    try {
      const snap = await getDocs(query(collection(db,'rdmls_opciones_log'), orderBy('ts','desc'), limit(50)));
      setAccessLog(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch(e) { console.error(e); }
    setLoadingLog(false);
  };

  useEffect(() => {
    document.title = unlocked ? 'RDMLS · Documentación Técnica' : 'RDMLS · Acceso Restringido';
    if (unlocked) setTimeout(() => setVisible(true), 80);
    if (unlocked && isAdmin) fetchLog();
  }, [unlocked, isAdmin]);

  /* ── GATE SCREEN ── */
  if (!unlocked) return (
    <div style={{
      minHeight:'100vh', background:'radial-gradient(ellipse at center,#1a0800 0%,#050810 100%)',
      display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
      fontFamily:"'Segoe UI',Roboto,sans-serif", padding:'2rem'
    }}>
      <div style={{fontSize:'3rem',marginBottom:'0.8rem'}}>📻</div>
      <img src="/escudo.png" alt="IMLS" style={{height:'55px',marginBottom:'0.8rem',filter:'drop-shadow(0 0 18px rgba(249,115,22,0.5))'}}/>
      <h1 style={{color:'#f97316',fontSize:'1rem',fontWeight:'900',letterSpacing:'3px',margin:'0 0 0.2rem',textAlign:'center'}}>
        RDMLS · DOCUMENTACIÓN INTERNA
      </h1>
      <p style={{color:'#475569',fontSize:'0.7rem',marginBottom:'2rem',textAlign:'center'}}>
        Solo personal autorizado · I. Municipalidad de La Serena
      </p>
      <form onSubmit={handleGate} style={{display:'flex',flexDirection:'column',gap:'0.8rem',width:'100%',maxWidth:'340px'}}>
        <div style={{
          background: pinError ? 'rgba(239,68,68,0.07)':'rgba(249,115,22,0.05)',
          border:`2px solid ${pinError ? '#ef4444':'rgba(249,115,22,0.3)'}`,
          borderRadius:'16px', padding:'1.4rem 1.5rem',
          animation: shake ? 'shake 0.4s ease':'none', display:'flex', flexDirection:'column', gap:'0.7rem'
        }}>
          <div style={{fontSize:'0.58rem',color:'#64748b',letterSpacing:'2px',textAlign:'center',marginBottom:'0.2rem'}}>IDENTIFICACIÓN + CÓDIGO DE ACCESO</div>
          <input placeholder="Tu nombre completo" value={nombre} onChange={e=>setNombre(e.target.value)}
            style={{background:'rgba(0,0,0,0.4)',border:'1.5px solid rgba(249,115,22,0.25)',borderRadius:'10px',
              padding:'10px 14px',color:'white',fontSize:'0.85rem',outline:'none',width:'100%',boxSizing:'border-box'}}/>
          <input placeholder="Cargo / Departamento" value={cargo} onChange={e=>setCargo(e.target.value)}
            style={{background:'rgba(0,0,0,0.4)',border:'1.5px solid rgba(249,115,22,0.25)',borderRadius:'10px',
              padding:'10px 14px',color:'white',fontSize:'0.85rem',outline:'none',width:'100%',boxSizing:'border-box'}}/>
          <input type="password" inputMode="numeric" maxLength={6} placeholder="Código" value={pinInput}
            onChange={e=>setPinInput(e.target.value.replace(/\D/g,''))}
            style={{background:'rgba(0,0,0,0.5)',border:`1.5px solid ${pinError?'#ef4444':'rgba(249,115,22,0.3)'}`,
              borderRadius:'10px',padding:'10px 14px',color:'white',fontSize:'1.5rem',
              fontFamily:'"Courier New",monospace',textAlign:'center',letterSpacing:'6px',outline:'none',width:'100%',boxSizing:'border-box'}}/>
          {pinError && <div style={{color:'#ef4444',fontSize:'0.72rem',textAlign:'center'}}>{pinError}</div>}
        </div>
        <button type="submit" disabled={loading} style={{
          background:'linear-gradient(135deg,#f97316,#c2410c)',border:'none',borderRadius:'12px',
          padding:'12px',color:'white',fontWeight:'900',fontSize:'0.85rem',letterSpacing:'2px',cursor:'pointer'
        }}>
          {loading ? 'REGISTRANDO...' : '🔐 AUTORIZAR INGRESO'}
        </button>
        <button type="button" onClick={()=>navigate('/')} style={{
          background:'none',border:'none',color:'#475569',cursor:'pointer',fontSize:'0.72rem',textDecoration:'underline',textAlign:'center'
        }}>← Volver a la Radio RDMLS</button>
      </form>
      <style>{`@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-8px)}75%{transform:translateX(8px)}}`}</style>
    </div>
  );

  /* ── MAIN PAGE ── */
  const TABS = [
    { id: 'funciones',  label: 'Funciones',  icon: Radio },
    { id: 'tecnologia', label: 'Tecnología', icon: Zap },
    { id: 'legal',      label: 'Base Legal', icon: FileText },
    { id: 'ruta',       label: 'Hoja de Ruta', icon: Map },
    ...(isAdmin ? [{ id: 'accesos', label: 'Registro Accesos', icon: List }] : [])
  ];


  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0d0200 0%, #180800 40%, #0d0200 100%)',
      color: 'white', fontFamily: "'Segoe UI', Roboto, sans-serif", overflowX: 'hidden'
    }}>

      {/* ── HEADER ── */}
      <header style={{
        background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(20px)',
        borderBottom: '2px solid rgba(249,115,22,0.4)', padding: '0.9rem 1.5rem',
        display: 'flex', alignItems: 'center', gap: '1rem',
        position: 'sticky', top: 0, zIndex: 100
      }}>
        <button onClick={() => navigate('/')} style={{
          background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.3)',
          color: '#f97316', borderRadius: '50%', width: '38px', height: '38px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
        }}>
          <ArrowLeft size={16} />
        </button>
        <img src="/escudo.png" alt="IMLS" style={{ height: '34px' }} />
        <div>
          <div style={{ fontSize: '1rem', fontWeight: '900', color: '#f97316', letterSpacing: '2px', lineHeight: 1 }}>
            RADIO DIGITAL MUNICIPAL LA SERENA
          </div>
          <div style={{ fontSize: '0.6rem', color: '#64748b', letterSpacing: '1px' }}>
            RDMLS · DOCUMENTACIÓN TÉCNICA E INSTITUCIONAL · IMLS 2026
          </div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '6px', alignItems: 'center' }}>
          <div style={{
            background: 'linear-gradient(135deg,#f97316,#c2410c)', borderRadius: '20px',
            padding: '4px 12px', fontSize: '0.65rem', fontWeight: '900', letterSpacing: '2px'
          }}>100.1 FM</div>
          <div style={{
            background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.3)',
            borderRadius: '20px', padding: '4px 12px', fontSize: '0.65rem', fontWeight: '700', color: '#fb923c'
          }}>RDMLS.CL</div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section style={{
        textAlign: 'center', padding: '3.5rem 1.5rem 2.5rem',
        background: 'radial-gradient(ellipse at top, rgba(249,115,22,0.12) 0%, transparent 65%)',
        borderBottom: '1px solid rgba(249,115,22,0.12)',
        opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)',
        transition: 'all 0.8s ease'
      }}>
        <div style={{ fontSize: '3.5rem', marginBottom: '0.8rem', filter: 'drop-shadow(0 0 24px rgba(249,115,22,0.5))' }}>📻</div>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.3)',
          borderRadius: '50px', padding: '5px 16px', fontSize: '0.65rem',
          color: '#f97316', letterSpacing: '3px', fontWeight: '700', marginBottom: '1.2rem'
        }}>
          <Signal size={10} /> EN LÍNEA · 24/7 · AZ11 STREAMING
        </div>
        <h1 style={{
          fontSize: 'clamp(1.8rem, 5vw, 3.2rem)', fontWeight: '900',
          background: 'linear-gradient(135deg, #ffffff 0%, #f97316 50%, #fbbf24 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          margin: '0 0 1rem', lineHeight: 1.1
        }}>
          Radio Digital Municipal<br />La Serena — RDMLS
        </h1>
        <p style={{
          fontSize: 'clamp(0.85rem, 2vw, 1rem)', color: '#94a3b8',
          maxWidth: '640px', margin: '0 auto 2rem', lineHeight: 1.7
        }}>
          La emisora digital oficial de la Ilustre Municipalidad de La Serena.
          Streaming profesional, sin publicidad comercial, al servicio permanente
          de la comunidad serenense a través de rdmls.cl, con señal FM 100.1 MHz como simulcast.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {[
            { icon: Wifi, label: 'Stream 24/7' },
            { icon: Users, label: 'Público y gratuito' },
            { icon: Shield, label: 'Sin publicidad' },
            { icon: Globe, label: 'Alcance mundial' },
            { icon: Music, label: 'FM 100.1 Simulcast' }
          ].map(({ icon: Icon, label }) => (
            <div key={label} style={{
              display: 'flex', alignItems: 'center', gap: '5px',
              background: 'rgba(249,115,22,0.06)', border: '1px solid rgba(249,115,22,0.2)',
              borderRadius: '50px', padding: '5px 14px', fontSize: '0.72rem', color: '#cbd5e1'
            }}>
              <Icon size={11} color="#f97316" />{label}
            </div>
          ))}
        </div>
      </section>

      {/* ── TABS ── */}
      <div style={{
        display: 'flex', justifyContent: 'center', gap: '4px',
        padding: '1.2rem 1rem', background: 'rgba(0,0,0,0.4)', flexWrap: 'wrap'
      }}>
        {TABS.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setActiveTab(id)} style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '9px 20px', borderRadius: '10px',
            border: `2px solid ${activeTab === id ? '#f97316' : 'rgba(255,255,255,0.08)'}`,
            background: activeTab === id ? 'rgba(249,115,22,0.15)' : 'transparent',
            color: activeTab === id ? '#f97316' : '#64748b',
            cursor: 'pointer', fontSize: '0.78rem',
            fontWeight: activeTab === id ? '700' : '400',
            transition: 'all 0.2s', letterSpacing: '0.5px'
          }}>
            <Icon size={13} />{label}
          </button>
        ))}
      </div>

      {/* ── CONTENT ── */}
      <main style={{ padding: '1.5rem 1.5rem 5rem', maxWidth: '1100px', margin: '0 auto' }}>

        {/* TAB: FUNCIONES */}
        {activeTab === 'funciones' && (
          <div>
            <h2 style={{ textAlign: 'center', color: '#f97316', fontSize: '1.3rem', marginBottom: '0.4rem', letterSpacing: '2px' }}>
              MÓDULOS Y FUNCIONALIDADES
            </h2>
            <p style={{ textAlign: 'center', color: '#475569', marginBottom: '2rem', fontSize: '0.85rem' }}>
              Todo lo que hace funcionar la Radio Digital Municipal de La Serena
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '1.2rem' }}>
              {FEATURES.map((f) => (
                <div key={f.id} style={{
                  background: 'rgba(255,255,255,0.02)', border: `1px solid ${f.color}25`,
                  borderRadius: '18px', padding: '1.8rem', position: 'relative', overflow: 'hidden'
                }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg,${f.color},transparent)` }} />
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '12px',
                    background: `${f.color}18`, border: `1.5px solid ${f.color}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.9rem'
                  }}>
                    <f.icon size={22} color={f.color} />
                  </div>
                  <div style={{ fontSize: '0.58rem', color: f.color, letterSpacing: '2px', fontWeight: '800', marginBottom: '3px' }}>
                    {f.label}
                  </div>
                  <h3 style={{ fontSize: '1rem', margin: '0 0 0.9rem', color: 'white', fontWeight: '700' }}>{f.subtitle}</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '7px' }}>
                    {f.items.map((item, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '7px', fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.4 }}>
                        <ChevronRight size={11} color={f.color} style={{ marginTop: '3px', flexShrink: 0 }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: TECNOLOGIA */}
        {activeTab === 'tecnologia' && (
          <div>
            <h2 style={{ textAlign: 'center', color: '#f97316', fontSize: '1.3rem', marginBottom: '0.4rem', letterSpacing: '2px' }}>
              ARQUITECTURA TÉCNICA
            </h2>
            <p style={{ textAlign: 'center', color: '#475569', marginBottom: '2rem', fontSize: '0.85rem' }}>
              Stack de radio digital de nivel profesional · 100% código abierto
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {TECH_STACK.map(({ label, desc, icon: Icon }) => (
                <div key={label} style={{
                  background: 'rgba(249,115,22,0.04)', border: '1px solid rgba(249,115,22,0.15)',
                  borderRadius: '14px', padding: '1.3rem', display: 'flex', gap: '1rem', alignItems: 'flex-start'
                }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '10px',
                    background: 'rgba(249,115,22,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                  }}>
                    <Icon size={18} color="#f97316" />
                  </div>
                  <div>
                    <div style={{ fontWeight: '700', color: 'white', marginBottom: '3px', fontSize: '0.88rem' }}>{label}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.5 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Diagrama de flujo */}
            <div style={{
              background: 'rgba(249,115,22,0.05)', border: '1px solid rgba(249,115,22,0.25)',
              borderRadius: '18px', padding: '1.8rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.2rem' }}>
                <BarChart3 size={18} color="#f97316" />
                <h3 style={{ margin: 0, color: '#f97316', fontSize: '0.95rem', letterSpacing: '1px', fontWeight: '800' }}>
                  FLUJO DE LA SEÑAL DIGITAL
                </h3>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
                {[
                  { label: 'Cabina FM\n100.1 MHz', bg: '#7f1d1d', border: '#ef4444' },
                  { label: '→', bg: 'transparent', border: 'transparent', small: true },
                  { label: 'Transcodificador\nIcecast2', bg: '#431407', border: '#f97316' },
                  { label: '→', bg: 'transparent', border: 'transparent', small: true },
                  { label: 'az11.yes\n:8590/radio.mp3', bg: '#1c1917', border: '#f59e0b' },
                  { label: '→', bg: 'transparent', border: 'transparent', small: true },
                  { label: 'CDN\nFirebase+CF', bg: '#0c1a2e', border: '#38bdf8' },
                  { label: '→', bg: 'transparent', border: 'transparent', small: true },
                  { label: 'rdmls.cl\nNavegador/PWA', bg: '#0f2d1f', border: '#10b981' }
                ].map((step, i) => (
                  step.small ? (
                    <span key={i} style={{ color: '#f97316', fontSize: '1.4rem', fontWeight: '300' }}>→</span>
                  ) : (
                    <div key={i} style={{
                      background: step.bg, border: `1.5px solid ${step.border}`,
                      borderRadius: '10px', padding: '10px 14px', fontSize: '0.7rem',
                      color: 'white', textAlign: 'center', lineHeight: 1.4, minWidth: '90px', fontWeight: '600'
                    }}>
                      {step.label}
                    </div>
                  )
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
                {[
                  { title: 'Latencia', val: '< 3 segundos', desc: 'Desde cabina hasta oyente en todo el mundo' },
                  { title: 'Bitrate', val: '128 kbps MP3', desc: 'Calidad de audio FM en internet' },
                  { title: 'Disponibilidad', val: '99.9% uptime', desc: 'Firebase + Cloudflare redundancia dual' },
                  { title: 'Oyentes', val: 'Ilimitados', desc: 'Servidor Icecast sin cuota de conexiones' }
                ].map(({ title, val, desc }) => (
                  <div key={title} style={{
                    background: 'rgba(0,0,0,0.3)', borderRadius: '12px', padding: '1rem', textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '0.6rem', color: '#64748b', letterSpacing: '1px', marginBottom: '4px' }}>{title}</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '900', color: '#f97316', marginBottom: '4px' }}>{val}</div>
                    <div style={{ fontSize: '0.68rem', color: '#475569' }}>{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB: LEGAL */}
        {activeTab === 'legal' && (
          <div>
            <h2 style={{ textAlign: 'center', color: '#f97316', fontSize: '1.3rem', marginBottom: '0.4rem', letterSpacing: '2px' }}>
              FUNDAMENTO LEGAL
            </h2>
            <p style={{ textAlign: 'center', color: '#475569', marginBottom: '2rem', fontSize: '0.85rem' }}>
              Marco normativo que habilita la operación de la Radio Digital Municipal
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {LEGAL_BASIS.map(({ num, title, desc }) => (
                <div key={num} style={{
                  background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(249,115,22,0.12)',
                  borderLeft: '4px solid #f97316', borderRadius: '0 14px 14px 0',
                  padding: '1.3rem 1.5rem', display: 'flex', alignItems: 'flex-start', gap: '1.5rem'
                }}>
                  <div style={{
                    background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.3)',
                    borderRadius: '8px', padding: '5px 10px', fontSize: '0.65rem',
                    fontWeight: '900', color: '#f97316', letterSpacing: '0.5px', whiteSpace: 'nowrap', flexShrink: 0
                  }}>{num}</div>
                  <div>
                    <div style={{ fontWeight: '700', color: 'white', marginBottom: '4px', fontSize: '0.9rem' }}>{title}</div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.6 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{
              marginTop: '2rem', background: 'rgba(249,115,22,0.06)',
              border: '1px solid rgba(249,115,22,0.2)', borderRadius: '16px',
              padding: '1.5rem', textAlign: 'center'
            }}>
              <Radio size={24} color="#f97316" style={{ marginBottom: '8px' }} />
              <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: 0, lineHeight: 1.7 }}>
                La <strong style={{ color: '#f97316' }}>Radio Digital Municipal La Serena (RDMLS)</strong> opera como
                servicio público de radiodifusión al amparo de la legislación chilena vigente, con plena autonomía editorial
                para informar a la ciudadanía sobre asuntos de interés público comunal, regional y nacional.
                Su señal digital en rdmls.cl extiende el alcance de la frecuencia FM 100.1 MHz sin restricciones geográficas.
              </p>
            </div>
          </div>
        )}

        {/* TAB: HOJA DE RUTA */}
        {activeTab === 'ruta' && (
          <div>
            <h2 style={{ textAlign: 'center', color: '#f97316', fontSize: '1.3rem', marginBottom: '0.4rem', letterSpacing: '2px' }}>
              HOJA DE RUTA RDMLS
            </h2>
            <p style={{ textAlign: 'center', color: '#475569', marginBottom: '2.5rem', fontSize: '0.85rem' }}>
              Plan estratégico de desarrollo de la Radio Digital Municipal · 2026–2028
            </p>
            <div style={{ position: 'relative', paddingLeft: '2.2rem' }}>
              <div style={{
                position: 'absolute', left: '10px', top: 0, bottom: 0, width: '2px',
                background: 'linear-gradient(to bottom, #f97316, rgba(249,115,22,0.1))'
              }} />
              {ROAD_PHASES.map(({ fase, label, status, color, items }) => (
                <div key={fase} style={{ marginBottom: '2.5rem', position: 'relative' }}>
                  <div style={{
                    position: 'absolute', left: '-2.2rem', top: '6px',
                    width: '22px', height: '22px', borderRadius: '50%',
                    background: `${color}25`, border: `2px solid ${color}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: color }} />
                  </div>
                  <div style={{
                    background: 'rgba(255,255,255,0.02)', border: `1px solid ${color}20`,
                    borderRadius: '16px', padding: '1.4rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem', flexWrap: 'wrap' }}>
                      <span style={{
                        fontSize: '0.58rem', fontWeight: '900', color: '#f97316',
                        letterSpacing: '1.5px', background: 'rgba(249,115,22,0.1)',
                        padding: '3px 8px', borderRadius: '5px'
                      }}>{fase}</span>
                      <span style={{ fontWeight: '700', color: 'white', fontSize: '0.95rem' }}>{label}</span>
                      <span style={{
                        fontSize: '0.58rem', fontWeight: '700', color, background: `${color}18`,
                        padding: '3px 10px', borderRadius: '20px', border: `1px solid ${color}40`, marginLeft: 'auto'
                      }}>{status}</span>
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {items.map((item, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '7px', fontSize: '0.8rem', color: '#94a3b8' }}>
                          <ChevronRight size={11} color={color} style={{ marginTop: '3px', flexShrink: 0 }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* TAB: REGISTRO DE ACCESOS (solo admin) */}
        {activeTab === 'accesos' && isAdmin && (
          <div>
            <h2 style={{textAlign:'center',color:'#f97316',fontSize:'1.3rem',marginBottom:'0.4rem',letterSpacing:'2px'}}>
              REGISTRO DE ACCESOS
            </h2>
            <p style={{textAlign:'center',color:'#475569',marginBottom:'1.5rem',fontSize:'0.82rem'}}>
              Historial de personas que han ingresado a esta sección
            </p>
            <button onClick={fetchLog} style={{
              display:'block',margin:'0 auto 1.5rem',background:'rgba(249,115,22,0.15)',
              border:'1px solid rgba(249,115,22,0.3)',borderRadius:'10px',padding:'8px 20px',
              color:'#f97316',cursor:'pointer',fontSize:'0.8rem',fontWeight:'700'
            }}>↻ Actualizar Registro</button>
            {loadingLog ? (
              <p style={{textAlign:'center',color:'#475569'}}>Cargando...</p>
            ) : accessLog.length === 0 ? (
              <p style={{textAlign:'center',color:'#475569'}}>Sin registros aún.</p>
            ) : (
              <div style={{display:'flex',flexDirection:'column',gap:'0.7rem'}}>
                {accessLog.map((log, i) => {
                  const ts = log.ts?.toDate ? log.ts.toDate() : null;
                  const dateStr = ts ? ts.toLocaleString('es-CL',{timeZone:'America/Santiago'}) : '—';
                  return (
                    <div key={log.id} style={{
                      background: log.tipo==='admin' ? 'rgba(249,115,22,0.07)':'rgba(255,255,255,0.02)',
                      border:`1px solid ${log.tipo==='admin'?'rgba(249,115,22,0.25)':'rgba(255,255,255,0.06)'}`,
                      borderRadius:'12px', padding:'1rem 1.2rem',
                      display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:'1rem', flexWrap:'wrap'
                    }}>
                      <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                        <div style={{
                          width:'36px',height:'36px',borderRadius:'50%',flexShrink:0,
                          background: log.tipo==='admin'?'rgba(249,115,22,0.2)':'rgba(100,116,139,0.15)',
                          border:`1.5px solid ${log.tipo==='admin'?'#f97316':'#475569'}`,
                          display:'flex',alignItems:'center',justifyContent:'center',
                          fontSize:'1rem'
                        }}>{log.tipo==='admin'?'🛡️':'👤'}</div>
                        <div>
                          <div style={{fontWeight:'700',color:'white',fontSize:'0.9rem'}}>{log.nombre}</div>
                          <div style={{fontSize:'0.72rem',color:'#94a3b8'}}>{log.cargo}</div>
                        </div>
                      </div>
                      <div style={{textAlign:'right'}}>
                        <div style={{fontSize:'0.72rem',color:'#f97316',fontWeight:'600'}}>{dateStr}</div>
                        <div style={{
                          display:'inline-block',fontSize:'0.55rem',fontWeight:'800',letterSpacing:'1px',
                          background: log.tipo==='admin'?'rgba(249,115,22,0.2)':'rgba(100,116,139,0.15)',
                          color: log.tipo==='admin'?'#f97316':'#64748b',
                          padding:'2px 8px',borderRadius:'4px',marginTop:'4px'
                        }}>{log.tipo?.toUpperCase()}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer style={{
        background:'rgba(0,0,0,0.6)',borderTop:'1px solid rgba(249,115,22,0.15)',
        padding:'1.5rem 2rem',textAlign:'center'
      }}>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'8px',marginBottom:'6px'}}>
          <img src="/escudo.png" alt="IMLS" style={{height:'20px',opacity:0.6}}/>
          <span style={{color:'#475569',fontSize:'0.75rem'}}>
            © 2026 I. Municipalidad de La Serena · RDMLS · Radio Digital Municipal · rdmls.cl
          </span>
        </div>
        <p style={{color:'#1e293b',fontSize:'0.65rem',margin:0}}>
          Documento de uso interno · Departamento de Comunicaciones e Innovación Digital IMLS
        </p>
      </footer>
    </div>
  );
}
