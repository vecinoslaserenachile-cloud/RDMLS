import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Radio, MapPin, Share2, Download, Music, Users, 
  Globe, Shield, TrendingUp, Cpu, FileText, Phone,
  MessageCircle, Link as LinkIcon, CheckCircle, 
  AlertCircle, Send, Loader, ChevronRight, X
} from 'lucide-react';

const ADMIN_WA = '56956020690'; // WhatsApp administrador ARCHI

// ── ARCHI Campaign Page ─────────────────────────────────────
// NO FIREBASE: Usa Cloudflare D1 via API Workers
// ────────────────────────────────────────────────────────────

const ArchiCampaign = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isArchiRoute, setIsArchiRoute] = useState(false);
  const [news, setNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);

  // Formulario de registro
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    radio_station: '',
    ideas: ''
  });
  const [formStatus, setFormStatus] = useState('idle'); // idle | loading | success | error
  const [formMessage, setFormMessage] = useState('');
  const [waLink, setWaLink] = useState(null);          // enlace WhatsApp post-registro

  // Widget flotante WhatsApp
  const [waOpen, setWaOpen] = useState(false);
  const [waPulse, setWaPulse] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);

    // Detectar ruta /archi
    const path = window.location.pathname.toLowerCase();
    const host = window.location.hostname.toLowerCase();
    if (path.includes('/archi') || host.includes('archi')) {
      setIsArchiRoute(true);
    }

    // Cargar noticias desde D1 (no Firebase)
    fetchNews();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchNews = async () => {
    setLoadingNews(true);
    try {
      const res = await fetch('/api/archi-news?limit=9');
      if (!res.ok) throw new Error('Error al cargar noticias');
      const data = await res.json();
      if (data.success) setNews(data.data || []);
    } catch (err) {
      console.warn('[ArchiCampaign] No se pudieron cargar noticias:', err);
      setNews([]);
    } finally {
      setLoadingNews(false);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('loading');
    setFormMessage('');
    setWaLink(null);

    try {
      const res = await fetch('/api/archi-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success) {
        setFormStatus('success');
        setFormMessage(data.message || '¡Registro exitoso! Bienvenido/a a la Lista Nueva Energía.');
        setWaLink(data.waLink || null);
        setFormData({ name: '', email: '', phone: '', radio_station: '', ideas: '' });
        // Abrir WhatsApp automáticamente después de 1.2 segundos
        if (data.waLink) {
          setTimeout(() => {
            window.open(data.waLink, '_blank');
          }, 1200);
        }
      } else {
        setFormStatus('error');
        setFormMessage(data.error || 'No se pudo completar el registro. Intenta nuevamente.');
      }
    } catch (err) {
      setFormStatus('error');
      setFormMessage('Error de conexión. Verifica tu internet e inténtalo de nuevo.');
    }
  };

  // Construir URL de WhatsApp directo para el widget flotante
  const buildWaDirectUrl = () => {
    const msg = encodeURIComponent('Hola, me interesa la Lista Nueva Energía ARCHI 📻. Quiero saber más información.');
    return `https://wa.me/${ADMIN_WA}?text=${msg}`;
  };

  // ── DATOS ──────────────────────────────────────────────────

  const team = [
    { role: "Presidenta Nacional",        name: "Solange Gómez Jelves",    firstName: "Solange",      region: "Coquimbo",    regionFull: "IV Región de Coquimbo",          color: "#fbbf24", emoji: "🏔️", img: "/archi-media/fotos/archi_foto_solange_1779330163090.png" },
    { role: "1ª Vicepresidenta",          name: "Ximena Callejón Ortiz",   firstName: "Ximena",       region: "RM",          regionFull: "Región Metropolitana",           color: "#60a5fa", emoji: "🏙️", img: "/archi-media/fotos/archi_foto_ximena_1779330177245.png" },
    { role: "2º Vicepresidente",          name: "Xavier Araya Cortés",     firstName: "Xavier",       region: "Arica",       regionFull: "XV Región de Arica y Parinacota", color: "#34d399", emoji: "🌵", img: "/archi-media/fotos/archi_foto_xavier_1779330190353.png" },
    { role: "3ª Vicepresidenta · Tesorera", name: "Elicena Gómez",         firstName: "Elicena",      region: "O'Higgins",   regionFull: "VI Región del Libertador",        color: "#f87171", emoji: "🌾", img: "/archi-media/fotos/archi_foto_elicena_1779330203942.png" },
    { role: "Secretaria Nacional",        name: "María Graciela Fuentes",  firstName: "María Graciela",region: "Ñuble",       regionFull: "XVI Región de Ñuble",            color: "#a78bfa", emoji: "🌳", img: "/archi-media/fotos/archi_foto_mariagraciela_1779330242250.png" },
    { role: "Director",                   name: "Rodrigo Jofré",           firstName: "Rodrigo",      region: "RM",          regionFull: "Región Metropolitana",           color: "#60a5fa", emoji: "🏙️", img: "/archi-media/fotos/archi_foto_rodrigo_1779330256262.png" },
    { role: "Director",                   name: "Fernando Zambra",         firstName: "Fernando",     region: "Coquimbo",    regionFull: "IV Región de Coquimbo",          color: "#fbbf24", emoji: "🔭", img: "/archi-media/fotos/archi_foto_fernando_1779330269366.png" },
    { role: "Director",                   name: "René Venegas",            firstName: "René",         region: "Magallanes",  regionFull: "XII Región de Magallanes",       color: "#38bdf8", emoji: "🧊", img: "/archi-media/fotos/archi_foto_rene_1779330281806.png" }
  ];

  // Cobertura territorial extendida (de norte a sur)
  const territorios = [
    { zona: "Norte Grande", regiones: ["Arica y Parinacota (XV)", "Tarapacá (I)", "Antofagasta (II)"], rep: "Xavier",      active: true  },
    { zona: "Norte Chico",  regiones: ["Atacama (III)", "Coquimbo (IV)"],                              rep: "Solange · Fernando", active: true  },
    { zona: "Zona Central", regiones: ["Valparaíso (V)", "Metropolitana (RM)", "O'Higgins (VI)"],      rep: "Ximena · Rodrigo · Elicena", active: true },
    { zona: "Sur",          regiones: ["Maule (VII)", "Ñuble (XVI)", "Biobío (VIII)"],                 rep: "María Graciela",  active: true  },
    { zona: "La Araucanía", regiones: ["La Araucanía (IX)"],                                          rep: "Red ARCHI Sur",   active: false },
    { zona: "Los Lagos",    regiones: ["Los Ríos (XIV)", "Los Lagos (X)"],                            rep: "Red ARCHI Sur",   active: false },
    { zona: "Austral",      regiones: ["Aysén (XI)", "Magallanes (XII)"],                             rep: "René",            active: true  },
  ];

  const pillars = [
    {
      title: "Soberanía Digital y Código Abierto",
      desc: "Fin a la dependencia. Entregaremos a las emisoras locales herramientas multiplataforma de código abierto (open source) para streaming y publicidad autoadministrable, sin pagar licencias abusivas.",
      img: "/archi-media/3d/pillar1.png",
      icon: Cpu
    },
    {
      title: "OIPP y Equidad Territorial",
      desc: "Creación del Observatorio de Inversión Pública (OIPP). Exigiremos al Estado el cumplimiento del artículo 4° de la Ley 19.733 (Ley de Prensa), asegurando que el 40% del avisaje estatal se destine mayoritariamente a medios regionales, garantizando una verdadera integración nacional.",
      img: "/archi-media/3d/pillar2.png",
      icon: Shield
    },
    {
      title: "El Motor Económico de las Regiones",
      desc: "Efecto Multiplicador y Drive-to-Store. La radio es la inversión transaccional más rentable del retail local, liquidando inventarios y movilizando la \"Economía Naranja\" con una agilidad que el algoritmo digital no posee.",
      img: "/archi-media/3d/pillar3.png",
      icon: TrendingUp
    },
    {
      title: "Escudo Civil y Resiliencia Analógica",
      desc: "La única red a prueba de apagones. La radio es la infraestructura crítica de seguridad nacional que salva vidas en emergencias y opera como amortiguador psicológico frente al pánico. Al pautar en radios, el Estado subsidia nuestra red de emergencia.",
      img: "/archi-media/3d/pillar4.png",
      icon: Radio
    }
  ];

  // ── ESTILOS COMUNES ────────────────────────────────────────

  const inputStyle = {
    padding: '14px 16px',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.15)',
    background: 'rgba(255,255,255,0.04)',
    color: 'white',
    outline: 'none',
    width: '100%',
    fontSize: '0.95rem',
    fontFamily: '"Outfit", sans-serif',
    transition: 'border-color 0.2s ease',
    boxSizing: 'border-box',
  };

  const sectionLabel = {
    display: 'inline-flex', alignItems: 'center', gap: '8px',
    background: 'rgba(251, 191, 36, 0.1)', padding: '8px 16px',
    borderRadius: '20px', border: '1px solid rgba(251, 191, 36, 0.3)',
    color: '#fbbf24', fontWeight: 900, fontSize: '0.75rem',
    letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '1rem'
  };

  // ── RENDER ─────────────────────────────────────────────────

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100080, background: '#070f20',
      display: 'block', overflowY: 'auto', paddingBottom: isMobile ? '80px' : '40px',
      fontFamily: '"Outfit", sans-serif', color: 'white', scrollBehavior: 'smooth'
    }}>

      {/* ── HEADER ── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 100, background: 'rgba(7, 15, 32, 0.92)',
        backdropFilter: 'blur(20px)', padding: isMobile ? '1rem' : '1.2rem 2.5rem',
        display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between',
        alignItems: 'center', borderBottom: '1px solid rgba(251, 191, 36, 0.2)', gap: '15px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '15px' }}>
          <div style={{ background: 'linear-gradient(135deg, #fbbf24, #b45309)', padding: isMobile ? '6px' : '10px', borderRadius: '12px', boxShadow: '0 0 20px rgba(251, 191, 36, 0.4)' }}>
            <Radio size={isMobile ? 18 : 24} color="#0f172a" />
          </div>
          <div>
            <h1 style={{ color: 'white', fontSize: isMobile ? '1rem' : '1.4rem', fontWeight: '900', textTransform: 'uppercase', margin: 0, letterSpacing: '-0.5px' }}>
              ARCHI <span style={{ color: '#fbbf24' }}>NACIONAL</span>
            </h1>
            <div style={{ display: 'flex', gap: isMobile ? '5px' : '15px', color: '#fbbf24', fontSize: isMobile ? '0.6rem' : '0.85rem', fontWeight: 'bold', alignItems: 'center' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>📡 ELECCIONES 2026</span>
              <span style={{ opacity: 0.5 }}>|</span>
              <span style={{ color: '#ef4444' }}>SOLANGE GÓMEZ</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {isArchiRoute && (
            <>
              <a href="/archi-media/estatutos.pdf" target="_blank" rel="noreferrer"
                style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', padding: '8px 12px', borderRadius: '10px', fontSize: '0.7rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none' }}>
                <FileText size={14} /> ESTATUTOS
              </a>
              <a href="/archi-media/manifiesto_completo.pdf" target="_blank" rel="noreferrer"
                style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', padding: '8px 12px', borderRadius: '10px', fontSize: '0.7rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none' }}>
                <Download size={14} /> MANIFIESTO
              </a>
              <a href="https://wa.me/56956020690" target="_blank" rel="noreferrer"
                style={{ background: '#25D366', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '10px', fontSize: '0.7rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none' }}>
                <Phone size={14} /> +56956020690
              </a>
            </>
          )}
          <button
            onClick={() => {
              if (navigator.share) navigator.share({ title: 'Solange Gómez: Presidenta ARCHI', text: 'Únete a la Lista Nueva Energía.', url: 'https://radiovecinos.cl/archi' });
            }}
            style={{ background: 'rgba(251, 191, 36, 0.1)', color: '#fbbf24', border: '1px solid rgba(251, 191, 36, 0.5)', padding: '8px 12px', borderRadius: '10px', fontSize: '0.7rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Share2 size={14} /> COMPARTIR
          </button>
        </div>
      </header>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', minHeight: isMobile ? 'auto' : '80vh', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 70% 50%, rgba(251, 191, 36, 0.15) 0%, transparent 60%)', zIndex: 0 }} />
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: isMobile ? '3rem 1.5rem' : '5rem', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '4rem', alignItems: 'center', position: 'relative', zIndex: 10 }}>
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <h2 style={{ color: 'white', fontSize: isMobile ? '3rem' : '4.5rem', fontWeight: 900, lineHeight: 1, marginBottom: '1.5rem' }}>
              ARCHI de todo Chile: <br />
              <span style={{ background: 'linear-gradient(to right, #fbbf24, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Inyectemos Nueva Energía.
              </span>
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1.2rem', lineHeight: 1.6, marginBottom: '2.5rem', fontWeight: 500, borderLeft: '4px solid #fbbf24', paddingLeft: '1rem' }}>
              Solange Gómez Jelves – Primera Mujer Presidenta Nacional en 90 años de historia.
            </p>
            <button
              onClick={() => document.getElementById('registro-cta').scrollIntoView({ behavior: 'smooth' })}
              style={{ background: 'linear-gradient(135deg, #fbbf24, #b45309)', color: '#0f172a', padding: '1.2rem 2.5rem', borderRadius: '15px', fontWeight: 900, fontSize: '1.1rem', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '10px', boxShadow: '0 10px 30px rgba(251, 191, 36, 0.3)', transition: 'transform 0.3s ease' }}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              Súmate a la Verdadera Independencia <TrendingUp size={20} />
            </button>

            {/* ── TIRA DE NOMBRES DE PILA ── */}
            <div style={{ marginTop: '2rem', overflow: 'hidden', width: '100%' }}>
              <div style={{ fontSize: '0.72rem', color: 'rgba(251,191,36,0.55)', letterSpacing: '2px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '6px' }}>
                📻 DIRECTORIO · LISTA NUEVA ENERGÍA
              </div>
              <div style={{ display: 'flex', gap: '0', overflow: 'hidden', maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)' }}>
                <motion.div
                  animate={{ x: ['0%', '-50%'] }}
                  transition={{ x: { repeat: Infinity, repeatType: 'loop', duration: 18, ease: 'linear' } }}
                  style={{ display: 'flex', gap: '8px', flexShrink: 0, minWidth: 'max-content' }}
                >
                  {[...team, ...team].map((m, i) => (
                    <span key={i} style={{
                      background: `rgba(${m.color === '#fbbf24' ? '251,191,36' : m.color === '#60a5fa' ? '96,165,250' : m.color === '#34d399' ? '52,211,153' : m.color === '#f87171' ? '248,113,113' : m.color === '#a78bfa' ? '167,139,250' : '56,189,248'}, 0.12)`,
                      border: `1px solid ${m.color}40`,
                      color: m.color,
                      padding: '5px 14px',
                      borderRadius: '20px',
                      fontSize: '0.78rem',
                      fontWeight: 900,
                      whiteSpace: 'nowrap',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      flexShrink: 0
                    }}>
                      {m.emoji} {m.firstName}
                    </span>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '30px', padding: '20px', backdropFilter: 'blur(10px)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', maxWidth: '500px', width: '100%' }}>
              <img src="/archi-media/3d/hero.png" alt="ARCHI Nueva Energía" style={{ width: '100%', borderRadius: '20px', objectFit: 'cover' }} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MESA DIRECTIVA + COBERTURA TERRITORIAL ── */}
      <section style={{ padding: isMobile ? '4rem 1.5rem' : '6rem 3rem', background: '#0a1226', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("/assets/mapa-chile-lineas.svg")', backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', opacity: 0.04, pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1300px', margin: '0 auto', position: 'relative', zIndex: 10 }}>

          {/* Título sección */}
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div style={{ ...sectionLabel, margin: '0 auto 1rem' }}><Users size={16} /> DIRECTORIO NACIONAL</div>
            <h3 style={{ color: 'white', fontSize: isMobile ? '2rem' : '2.8rem', fontWeight: 900, margin: 0, lineHeight: 1.1 }}>
              Un Directorio con <span style={{ color: '#fbbf24' }}>Cobertura Real</span><br/>
              <span style={{ fontSize: isMobile ? '1.1rem' : '1.4rem', color: '#94a3b8', fontWeight: 500 }}>De Arica a Magallanes — de nombre a nombre</span>
            </h3>
          </div>

          {/* Layout: tarjetas directivos + mapa territorial */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.1fr 0.9fr', gap: '3rem', alignItems: 'start' }}>

            {/* Columna izquierda: tarjetas directivos por nombre de pila */}
            <div>
              <div style={{ fontSize: '0.7rem', color: '#fbbf24', fontWeight: 900, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '24px', height: '2px', background: '#fbbf24', display: 'inline-block' }}/> LISTA NUEVA ENERGÍA · DIRECTORIO EJECUTIVO
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '1rem' }}>
                {team.map((member, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.07 }}
                    whileHover={{ y: -5, boxShadow: `0 12px 32px ${member.color}20` }}
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      backdropFilter: 'blur(20px)',
                      border: `1px solid ${member.color}25`,
                      borderLeft: `3px solid ${member.color}`,
                      borderRadius: '16px',
                      padding: '1.2rem 1.4rem',
                      transition: 'all 0.3s ease',
                      cursor: 'default',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    {/* Glow de fondo */}
                    <div style={{ position: 'absolute', top: 0, right: 0, width: '60px', height: '60px', background: `radial-gradient(circle, ${member.color}15, transparent)`, pointerEvents: 'none' }} />

                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
                      {/* Foto recortada */}
                      {member.img ? (
                        <img src={member.img} alt={member.firstName} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${member.color}`, boxShadow: `0 0 10px ${member.color}40` }} />
                      ) : (
                        <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: `${member.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', border: `2px solid ${member.color}` }}>{member.emoji}</div>
                      )}

                      <div>
                        {/* Nombre de pila — protagonista */}
                        <div style={{ fontSize: isMobile ? '1.6rem' : '1.8rem', fontWeight: 900, color: member.color, lineHeight: 1, marginBottom: '4px', fontFamily: '"Outfit", sans-serif' }}>
                          {member.firstName}
                        </div>

                        {/* Apellido en gris */}
                        <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 500 }}>
                          {member.name.replace(member.firstName, '').trim()}
                        </div>
                      </div>
                    </div>

                    {/* Cargo */}
                    <div style={{ fontSize: '0.65rem', color: member.color, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                      {member.role}
                    </div>

                    {/* Región */}
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: `${member.color}10`, padding: '4px 10px', borderRadius: '20px', fontSize: '0.7rem', color: '#94a3b8', border: `1px solid ${member.color}20` }}>
                      <MapPin size={11} color={member.color} /> {member.regionFull}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Columna derecha: mapa de cobertura territorial */}
            <div>
              <div style={{ fontSize: '0.7rem', color: '#fbbf24', fontWeight: 900, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '24px', height: '2px', background: '#fbbf24', display: 'inline-block' }}/> RED TERRITORIAL · CHILE COMPLETO
              </div>

              {/* Barra de progreso de cobertura */}
              <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '16px', padding: '1.2rem 1.4rem', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ color: 'white', fontWeight: 900, fontSize: '0.85rem' }}>Cobertura Nacional Directa</span>
                  <span style={{ color: '#fbbf24', fontWeight: 900, fontSize: '1.1rem' }}>71%</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '4px', height: '6px', overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '71%' }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    style={{ height: '100%', background: 'linear-gradient(to right, #fbbf24, #f59e0b)', borderRadius: '4px' }}
                  />
                </div>
                <div style={{ color: '#64748b', fontSize: '0.65rem', marginTop: '6px' }}>5 de 7 zonas con representación directa en el directorio</div>
              </div>

              {/* Lista de territorios de norte a sur */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {territorios.map((t, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.07 }}
                    style={{
                      background: t.active ? 'rgba(251,191,36,0.04)' : 'rgba(255,255,255,0.01)',
                      border: `1px solid ${t.active ? 'rgba(251,191,36,0.2)' : 'rgba(255,255,255,0.04)'}`,
                      borderRadius: '12px',
                      padding: '10px 14px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                    }}
                  >
                    {/* Indicador activo */}
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: t.active ? '#fbbf24' : 'rgba(255,255,255,0.15)', flexShrink: 0, marginTop: '5px', boxShadow: t.active ? '0 0 8px #fbbf24' : 'none', animation: t.active ? 'archiPing 2s infinite' : 'none' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px', flexWrap: 'wrap' }}>
                        <span style={{ color: t.active ? 'white' : '#475569', fontWeight: 900, fontSize: '0.85rem' }}>{t.zona}</span>
                        {t.active && (
                          <span style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24', padding: '2px 8px', borderRadius: '8px', fontSize: '0.6rem', fontWeight: 900, letterSpacing: '0.5px' }}>
                            📛 {t.rep}
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: '#475569', lineHeight: 1.5 }}>
                        {t.regiones.join(' · ')}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Nota pie */}
              <div style={{ marginTop: '1.5rem', background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.15)', borderRadius: '12px', padding: '12px 16px' }}>
                <p style={{ color: '#94a3b8', fontSize: '0.75rem', margin: 0, lineHeight: 1.6 }}>
                  🗺️ <strong style={{ color: '#fbbf24' }}>Solange, Ximena, Xavier, Elicena, María Graciela, Rodrigo, Fernando y René</strong> — ocho nombres, ocho regiones distintas, una sola voz: la radio regional independiente de todo Chile.
                </p>
              </div>

              <style>{`@keyframes archiPing { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(1.3)} }`}</style>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4 PILARES ── */}
      <section style={{ padding: isMobile ? '4rem 0' : '6rem 0', background: '#070f20' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <div style={{ ...sectionLabel, margin: '0 auto 1rem' }}><Globe size={16} /> PROPUESTAS</div>
            <h3 style={{ color: 'white', fontSize: isMobile ? '2rem' : '2.5rem', fontWeight: 900, margin: 0 }}>
              EJES <span style={{ color: '#fbbf24' }}>PROGRAMÁTICOS</span>
            </h3>
          </div>
          {pillars.map((pillar, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={idx} style={{ display: 'flex', flexDirection: isMobile ? 'column' : (isEven ? 'row' : 'row-reverse'), alignItems: 'center', gap: '4rem', marginBottom: idx === pillars.length - 1 ? 0 : '6rem' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(251, 191, 36, 0.1)', padding: '8px 15px', borderRadius: '15px', border: '1px solid rgba(251, 191, 36, 0.3)', marginBottom: '1.5rem' }}>
                    <pillar.icon size={20} color="#fbbf24" />
                    <span style={{ color: '#fbbf24', fontWeight: 900, fontSize: '0.8rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Pilar {idx + 1}</span>
                  </div>
                  <h4 style={{ color: 'white', fontSize: isMobile ? '2rem' : '2.5rem', fontWeight: 900, lineHeight: 1.1, margin: '0 0 1.5rem 0' }}>
                    {pillar.title}
                  </h4>
                  <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: 1.7, margin: 0 }}>
                    {pillar.desc}
                  </p>
                </div>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                  <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '30px', padding: '15px', backdropFilter: 'blur(20px)', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', width: '100%', maxWidth: '450px' }}>
                    <img src={pillar.img} alt={pillar.title} style={{ width: '100%', borderRadius: '20px', display: 'block', objectFit: 'cover' }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── ÚLTIMAS NOTICIAS (D1) ── */}
      <section style={{ padding: isMobile ? '4rem 1.5rem' : '6rem 5.5rem', background: '#0a1226', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{ ...sectionLabel, margin: '0 auto 1rem' }}><Radio size={16} /> EN GIRA</div>
            <h3 style={{ color: 'white', fontSize: isMobile ? '2rem' : '2.5rem', fontWeight: 900, margin: 0 }}>
              Últimas <span style={{ color: '#fbbf24' }}>Noticias</span> de la Gira
            </h3>
          </div>

          {loadingNews ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
              <Loader size={32} style={{ animation: 'spin 1s linear infinite', marginBottom: '1rem' }} />
              <p>Cargando noticias...</p>
            </div>
          ) : news.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b', background: 'rgba(255,255,255,0.02)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <Radio size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
              <p style={{ margin: 0, fontSize: '1.1rem' }}>Las noticias de la gira aparecerán aquí pronto.</p>
              <p style={{ margin: '8px 0 0', fontSize: '0.85rem', opacity: 0.6 }}>El administrador puede publicar noticias desde /archi-admin</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
              {news.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease' }}
                  whileHover={{ y: -6, borderColor: 'rgba(251,191,36,0.2)' }}
                >
                  {item.image_url && (
                    <img src={item.image_url} alt={item.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                  )}
                  {!item.image_url && (
                    <div style={{ height: '8px', background: 'linear-gradient(90deg, #fbbf24, #b45309)' }} />
                  )}
                  <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                      <span style={{ background: 'rgba(251,191,36,0.1)', color: '#fbbf24', fontSize: '0.7rem', fontWeight: 900, padding: '3px 10px', borderRadius: '20px', border: '1px solid rgba(251,191,36,0.3)', textTransform: 'uppercase' }}>
                        {item.category || 'Campaña'}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: '#64748b', marginLeft: 'auto' }}>
                        {item.created_at ? new Date(item.created_at).toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Reciente'}
                      </span>
                    </div>
                    <h4 style={{ color: 'white', fontSize: '1.15rem', fontWeight: 900, margin: '0 0 10px 0', lineHeight: 1.3 }}>
                      {item.title}
                    </h4>
                    <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6, margin: '0 0 20px 0', flex: 1 }}>
                      {item.content.length > 180 ? item.content.substring(0, 180) + '...' : item.content}
                    </p>
                    <div style={{ display: 'flex', gap: '10px', marginTop: 'auto', paddingTop: '15px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                      <button
                        onClick={() => window.open(`https://wa.me/?text=📻 *${encodeURIComponent(item.title)}*%0A${encodeURIComponent(item.content.substring(0, 100))}...%0AVisita: https://radiovecinos.cl/archi`, '_blank')}
                        style={{ flex: 1, background: '#25D366', color: 'white', border: 'none', padding: '10px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 'bold', fontSize: '0.85rem', fontFamily: '"Outfit", sans-serif' }}>
                        <MessageCircle size={16} /> WhatsApp
                      </button>
                      <button
                        onClick={() => {
                          if (navigator.share) {
                            navigator.share({ title: item.title, text: item.content.substring(0, 100), url: 'https://radiovecinos.cl/archi' });
                          } else {
                            navigator.clipboard.writeText('https://radiovecinos.cl/archi');
                          }
                        }}
                        style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 14px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Share2 size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── REGISTRO D1 (NO FIREBASE) ── */}
      <footer id="registro-cta" style={{ background: '#040914', padding: isMobile ? '4rem 1.5rem' : '6rem 5.5rem', borderTop: '1px solid rgba(251, 191, 36, 0.2)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(251,191,36,0.06) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ ...sectionLabel, margin: '0 auto 1.5rem' }}><Send size={16} /> ÚNETE</div>
            <h2 style={{ color: 'white', fontSize: isMobile ? '2.2rem' : '3.5rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '1rem' }}>
              El futuro de la radio nos pertenece. <br />
              <span style={{ background: 'linear-gradient(to right, #fbbf24, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Comparte tu idea y súmate.
              </span>
            </h2>
            <p style={{ color: '#64748b', fontSize: '1rem' }}>
              Tu registro queda guardado en nuestra base de datos. Te contactaremos para la gira más cercana a tu región.
            </p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '30px', padding: isMobile ? '2rem' : '3.5rem' }}>
            <AnimatePresence mode="wait">
              {formStatus === 'success' ? (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '2.5rem 0' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(34, 197, 94, 0.1)', border: '2px solid #22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                    <CheckCircle size={40} color="#22c55e" />
                  </div>
                  <h3 style={{ color: 'white', fontSize: '1.8rem', fontWeight: 900, margin: '0 0 0.5rem' }}>¡Bienvenido/a a la Lista!</h3>
                  <p style={{ color: '#94a3b8', fontSize: '1.05rem', margin: '0 0 2rem', lineHeight: 1.6 }}>{formMessage}</p>

                  {/* ── BOTÓN WHATSAPP POST-REGISTRO ── */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', maxWidth: '380px', margin: '0 auto 2rem' }}>
                    <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0 }}>📲 WhatsApp se abrió automáticamente. Si no ocurrió, haz clic aquí:</p>
                    <a
                      href={waLink || buildWaDirectUrl()}
                      target="_blank"
                      rel="noreferrer"
                      style={{ width: '100%', background: '#25D366', color: 'white', border: 'none', padding: '15px 24px', borderRadius: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontWeight: 900, fontSize: '1rem', fontFamily: '"Outfit", sans-serif', textDecoration: 'none', boxShadow: '0 8px 25px rgba(37, 211, 102, 0.35)' }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      Confirmar por WhatsApp al +56 956 020 690
                    </a>
                  </div>

                  <button
                    onClick={() => { setFormStatus('idle'); setWaLink(null); }}
                    style={{ background: 'rgba(255,255,255,0.04)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 24px', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem', fontFamily: '"Outfit", sans-serif' }}>
                    Registrar otra persona
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleFormSubmit} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1.2rem' }}>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.5px' }}>NOMBRE Y APELLIDOS *</label>
                    <input
                      type="text" name="name" value={formData.name} onChange={handleFormChange}
                      placeholder="Ej: María González Reyes" required
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = 'rgba(251,191,36,0.5)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.5px' }}>CORREO ELECTRÓNICO *</label>
                    <input
                      type="email" name="email" value={formData.email} onChange={handleFormChange}
                      placeholder="tu@correo.cl" required
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = 'rgba(251,191,36,0.5)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.5px' }}>TELÉFONO / WHATSAPP</label>
                    <input
                      type="tel" name="phone" value={formData.phone} onChange={handleFormChange}
                      placeholder="+56 9 XXXX XXXX"
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = 'rgba(251,191,36,0.5)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.5px' }}>EMISORA Y FRECUENCIA (opcional)</label>
                    <input
                      type="text" name="radio_station" value={formData.radio_station} onChange={handleFormChange}
                      placeholder="Ej: Radio Serena 92.1 FM"
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = 'rgba(251,191,36,0.5)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', gridColumn: isMobile ? '1' : '1 / -1' }}>
                    <label style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.5px' }}>TU IDEA PARA LA RADIO REGIONAL (opcional)</label>
                    <textarea
                      name="ideas" value={formData.ideas} onChange={handleFormChange}
                      placeholder="¿Qué propuesta tienes para fortalecer la radio regional en Chile? Tu voz importa..."
                      rows={4}
                      style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }}
                      onFocus={e => e.target.style.borderColor = 'rgba(251,191,36,0.5)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
                    />
                  </div>

                  {formStatus === 'error' && (
                    <div style={{ gridColumn: isMobile ? '1' : '1 / -1', display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '12px', padding: '12px 16px' }}>
                      <AlertCircle size={18} color="#ef4444" style={{ flexShrink: 0 }} />
                      <span style={{ color: '#fca5a5', fontSize: '0.9rem' }}>{formMessage}</span>
                    </div>
                  )}

                  <div style={{ gridColumn: isMobile ? '1' : '1 / -1' }}>
                    <button
                      type="submit"
                      disabled={formStatus === 'loading'}
                      style={{ width: '100%', background: formStatus === 'loading' ? 'rgba(251,191,36,0.4)' : 'linear-gradient(135deg, #fbbf24, #b45309)', color: '#0f172a', padding: '1.1rem', borderRadius: '14px', fontSize: '1.1rem', fontWeight: 900, border: 'none', cursor: formStatus === 'loading' ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: '0 10px 30px rgba(251, 191, 36, 0.3)', transition: 'all 0.3s ease', fontFamily: '"Outfit", sans-serif' }}>
                      {formStatus === 'loading' ? (
                        <><Loader size={20} style={{ animation: 'spin 1s linear infinite' }} /> Registrando...</>
                      ) : (
                        <><Send size={20} /> QUIERO SUMARME A LA LISTA NUEVA ENERGÍA</>
                      )}
                    </button>
                  </div>

                  <p style={{ gridColumn: isMobile ? '1' : '1 / -1', color: '#475569', fontSize: '0.75rem', textAlign: 'center', margin: 0, lineHeight: 1.5 }}>
                    🔒 Tus datos se guardan de forma segura en nuestra base de datos interna. No compartimos tu información con terceros.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
            <p style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '2px', margin: 0, textTransform: 'uppercase' }}>
              © 2026 LISTA NUEVA ENERGÍA - LA VOZ DE LAS REGIONES
            </p>
          </div>
        </div>
      </footer>

      {/* ── WIDGET FLOTANTE WHATSAPP ── */}
      <div style={{ position: 'fixed', bottom: isMobile ? '90px' : '30px', right: '24px', zIndex: 999999, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>

        {/* Popup de mensaje */}
        <AnimatePresence>
          {waOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 10 }}
              style={{ background: 'white', borderRadius: '16px', padding: '18px 20px', boxShadow: '0 20px 60px rgba(0,0,0,0.4)', maxWidth: '280px', position: 'relative' }}
            >
              <button
                onClick={() => setWaOpen(false)}
                style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '2px' }}>
                <X size={16} />
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #fbbf24, #b45309)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Radio size={20} color="white" />
                </div>
                <div>
                  <div style={{ fontWeight: 900, fontSize: '0.9rem', color: '#0f172a', fontFamily: '"Outfit", sans-serif' }}>ARCHI Nueva Energía</div>
                  <div style={{ fontSize: '0.72rem', color: '#22c55e', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                    En línea
                  </div>
                </div>
              </div>
              <div style={{ background: '#f0f9ff', borderRadius: '12px', padding: '12px 14px', marginBottom: '14px' }}>
                <p style={{ margin: 0, fontSize: '0.88rem', color: '#1e293b', lineHeight: 1.5, fontFamily: '"Outfit", sans-serif' }}>
                  👋 ¡Hola! Soy parte del equipo de la <strong>Lista Nueva Energía</strong>. ¿Tienes preguntas o quieres sumarte a la gira? Escríbenos directamente.
                </p>
              </div>
              <a
                href={buildWaDirectUrl()}
                target="_blank"
                rel="noreferrer"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#25D366', color: 'white', borderRadius: '12px', padding: '12px', fontWeight: 900, fontSize: '0.9rem', textDecoration: 'none', fontFamily: '"Outfit", sans-serif', boxShadow: '0 4px 15px rgba(37,211,102,0.35)' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Abrir WhatsApp
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Botón burbuja */}
        <motion.button
          onClick={() => { setWaOpen(!waOpen); setWaPulse(false); }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#25D366', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 30px rgba(37, 211, 102, 0.5)', position: 'relative' }}
        >
          {waPulse && (
            <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'rgba(37,211,102,0.4)', animation: 'waPulse 2s ease-out infinite' }} />
          )}
          {waOpen
            ? <X size={24} color="white" />
            : <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          }
        </motion.button>
      </div>

      {/* ── CSS KEYFRAMES ── */}
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes waPulse { 0% { transform: scale(1); opacity: 0.8; } 100% { transform: scale(2.2); opacity: 0; } }
      `}</style>
    </div>
  );
};

export default ArchiCampaign;
