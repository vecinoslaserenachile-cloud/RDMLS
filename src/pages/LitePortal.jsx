import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, MapPin, Radio, Eye, Newspaper, Shield, Heart, 
  Trash2, Lightbulb, CloudSun, Calendar, Phone, Info,
  Search, Book, Gift, Home, Car, Utensils, Award, 
  Zap, Camera, Briefcase, GraduationCap, Building2,
  Anchor, Ship, Gem, Music, Tv, Lock, Globe, MessageSquare, 
  AlertTriangle, Hammer, Droplets, Leaf, Recycle, Wind,
  Baby, Accessibility, HeartPulse, Stethoscope, HelpingHand,
  Microscope, Library, Trophy, Map, Tent, TreePine, Warehouse,
  HardHat, Factory, Store, ShoppingBag, CreditCard, Landmark,
  Scale, Key, Fingerprint, History, Ghost, Boxes, User,
  Gamepad2, Sparkles, Rocket, Landmark as Monument, Palmtree, ListChecks,
  Play, Pause, Volume2, SkipForward, SkipBack, Mic, Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function LitePortal() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState({ name: 'RDMLS (EN VIVO)', src: 'https://az11.yesstreaming.net:8590/radio.mp3', isLive: true });
  const audioRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const vecinalSongs = [
    { name: 'Himno La Serena (Jazz)', src: '/music/himno_la_serena_jazz.mp3' },
    { name: 'Linda Provinciana', src: '/music/linda_provinciana.mp3' },
    { name: 'Eres Serena', src: '/music/eres_serena.mp3' },
    { name: 'Vals Mis Recuerdos', src: '/music/vals_mis_recuerdos.mp3' },
    { name: 'Serenito Rap', src: '/music/serenito_rap.mp3' }
  ];

  const handlePlay = (track) => {
    setCurrentTrack(track);
    if (audioRef.current) {
      audioRef.current.src = track.src;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleRadio = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // 60+ Módulos categorizados para ComunaSmart Mosaico Guell Style
  const allModules = [
    // --- SMART CITIZENS ---
    { id: 'reportes', name: 'Reportes', icon: MessageSquare, color: '#ef4444', action: () => window.dispatchEvent(new CustomEvent('open-auditoria')) },
    { id: 'radio', name: 'Radio VLS', icon: Radio, color: '#3b82f6', action: () => handlePlay({ name: 'RDMLS (EN VIVO)', src: 'https://az11.yesstreaming.net:8590/radio.mp3', isLive: true }) },
    { id: 'mapa', name: 'Mapa VLS', icon: MapPin, color: '#10b981', action: () => window.dispatchEvent(new CustomEvent('open-distances')) },
    { id: 'camaras', name: 'Cámaras', icon: Camera, color: '#f59e0b', action: () => window.dispatchEvent(new CustomEvent('open-social-vision')) },
    { id: 'centinel', name: 'Centinel', icon: Eye, color: '#6366f1' },
    { id: 'asistente', name: 'Faro IA', icon: Zap, color: '#8b5cf6', action: () => window.dispatchEvent(new CustomEvent('open-faro')) },
    { id: 'noticias', name: 'Noticias', icon: Newspaper, color: '#ef4444', action: () => navigate('/noticias') },
    { id: 'seguridad', name: 'Seguridad', icon: Shield, color: '#0f172a' },
    { id: 'salud', name: 'Salud', icon: HeartPulse, color: '#ec4899' },
    { id: 'aseo', name: 'Aseo', icon: Trash2, color: '#ca8a04' },
    { id: 'luz', name: 'Alumbrado', icon: Lightbulb, color: '#eab308' },
    { id: 'clima', name: 'Clima', icon: CloudSun, color: '#0ea5e9' },
    // --- SMART ADMINISTRATION ---
    { id: 'elearning', name: 'E-Learning', icon: GraduationCap, color: '#10b981' },
    { id: 'rrhh', name: 'Recursos H', icon: Briefcase, color: '#475569' },
    { id: 'firmas', name: 'Firmas', icon: Key, color: '#4f46e5' },
    { id: 'pagos', name: 'Pagos', icon: CreditCard, color: '#059669' },
    { id: 'transparencia', name: 'Transparencia', icon: Scale, color: '#334155' },
    { id: 'catastro', name: 'Catastro', icon: Building2, color: '#1e40af' },
    // --- SMART EVENTS ---
    { id: 'eventos', name: 'Eventos', icon: Calendar, color: '#d946ef' },
    { id: 'protocolo', name: 'Protocolo', icon: Users, color: '#f59e0b' },
    { id: 'precedencia', name: 'Precedencia', icon: Award, color: '#a16207' },
    { id: '1demayo', name: '1 de Mayo', icon: Calendar, color: '#d97706', action: () => navigate('/1demayo') },
    { id: 'tv', name: 'VLS TV', icon: Tv, color: '#ef4444' },
    // --- SMART LISTENING ---
    { id: 'social', name: 'Escucha', icon: MessageSquare, color: '#38bdf8' },
    { id: 'faro-vids', name: 'Faro Vids', icon: Eye, color: '#6366f1' },
    // --- HISTORIA & 3D ---
    { id: 'walk3d', name: 'Paseo 3D', icon: History, color: '#92400e', action: () => window.dispatchEvent(new CustomEvent('open-3d-walk')) },
    { id: 'farino3d', name: 'Fariño 3D', icon: Ghost, color: '#ec4899', action: () => window.open('https://studio.tripo3d.ai/3d-model/47f3a48d-8ae8-47fc-b259-dfccb6922ce1', '_blank') },
    { id: 'joako3d', name: 'Joako 3D', icon: User, color: '#38bdf8', action: () => window.open('https://www.hitem3d.ai/share/3d-models-generator/a/7PR9D304', '_blank') },
    { id: 'arcade', name: 'Arcade', icon: Gamepad2, color: '#f97316' },
    // --- OTROS 60+ ---
    { id: 'agua', name: 'Agua', icon: Droplets, color: '#06b6d4' },
    { id: 'verde', name: 'VLS Verde', icon: Leaf, color: '#15803d' },
    { id: 'recicla', name: 'Reciclaje', icon: Recycle, color: '#16a34a' },
    { id: 'aire', name: 'Calidad Aire', icon: Wind, color: '#38bdf8' },
    { id: 'ninos', name: 'Infancia', icon: Baby, color: '#fb7185' },
    { id: 'inclusion', name: 'Inclusión', icon: Accessibility, color: '#818cf8' },
    { id: 'mayores', name: 'Dorados', icon: HelpingHand, color: '#94a3b8' },
    { id: 'lab', name: 'Lab VLS', icon: Microscope, color: '#0d9488' },
    { id: 'playa', name: 'Playas', icon: Tent, color: '#0284c7' },
    { id: 'naturaleza', name: 'Reservas', icon: TreePine, color: '#064e3b' },
    { id: 'museo', name: 'Museo', icon: Landmark, color: '#451a03' },
    { id: 'obras', name: 'Obras', icon: HardHat, color: '#c2410c' },
    { id: 'ferias', name: 'Ferias', icon: Utensils, color: '#b45309' },
    { id: 'pymes', name: 'Pymes', icon: Store, color: '#0369a1' },
    { id: 'transito', name: 'Tránsito', icon: Car, color: '#334155' },
    { id: 'vivienda', name: 'Vivienda', icon: Home, color: '#166534' },
    { id: 'puerto', name: 'Puerto', icon: Ship, color: '#1d4ed8' },
    { id: 'nautico', name: 'Náutico', icon: Anchor, color: '#0369a1' },
    { id: 'tesoros', name: 'Tesoros', icon: Gem, color: '#f59e0b' },
    { id: 'musica', name: 'Música', icon: Music, color: '#7c3aed' },
    { id: 'estadios', name: 'Estadios', icon: Boxes, color: '#15803d' },
    { id: 'juntas', name: 'Juntas', icon: Users, color: '#1e293b' },
    { id: 'emergencias', name: 'S.O.S', icon: Phone, color: '#dc2626' },
    { id: 'biblioteca', name: 'Biblioteca', icon: Library, color: '#2563eb' },
    { id: 'ranking', name: 'Ranking', icon: ListChecks, color: '#f59e0b' },
    { id: 'identidad', name: 'Identidad', icon: Fingerprint, color: '#1e1b4b' },
    { id: 'turismo', name: 'Turismo', icon: Map, color: '#059669' },
    { id: 'educacion', name: 'Escuelas', icon: GraduationCap, color: '#10b981' },
    { id: 'alerta', name: 'Alerta', icon: AlertTriangle, color: '#ef4444' },
    { id: 'recompensa', name: 'Canjes', icon: Gift, color: '#db2777' },
    { id: 'ayuda', name: 'Soporte', icon: Info, color: '#64748b' },
    { id: 'park', name: 'Parques', icon: TreePine, color: '#16a34a' },
    { id: 'monumentos', name: 'Monumentos', icon: Monument, color: '#451a03' },
    { id: 'playa-cam', name: 'Playa Cam', icon: Camera, color: '#0ea5e9' },
    { id: 'clima-radar', name: 'Radar', icon: CloudSun, color: '#f59e0b' },
    { id: 'palma', name: 'Áreas V.', icon: Palmtree, color: '#15803d' }
  ];

  const featured = allModules.filter(m => ['reportes', 'radio', 'mapa', 'asistente', 'salud', 'noticias'].includes(m.id));

  return (
    <div style={{ minHeight: '100vh', background: '#020617', color: '#ffffff', paddingBottom: '120px', fontFamily: "'Outfit', sans-serif" }}>
      <audio ref={audioRef} src={currentTrack.src} />
      
      {/* HEADER INSTITUCIONAL */}
      <header style={{ 
        background: 'rgba(15, 23, 42, 0.9)', 
        backdropFilter: 'blur(20px)',
        padding: '1.5rem 2rem', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img src="/escudo_municipal.png" alt="Escudo" style={{ height: '40px' }} />
          <div style={{ width: '1px', height: '30px', background: 'rgba(255,255,255,0.2)' }} />
          <div>
            <h1 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 900, color: '#ffffff', letterSpacing: '2px' }}>VLS <span style={{ color: '#ef4444' }}>LITE</span></h1>
            <p style={{ margin: 0, fontSize: '0.6rem', color: '#94a3b8', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Portal de Contingencia Municipal</p>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '1.2rem', fontWeight: 900 }}>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
          <div style={{ fontSize: '0.6rem', color: '#facc15', fontWeight: 'bold' }}>MODO EMERGENCIA v4.5</div>
        </div>
      </header>

      <main style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* RADIO DE EMERGENCIA (Solicitud de Usuario) */}
        <section style={{ 
          background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
          borderRadius: '40px',
          padding: '2.5rem',
          marginBottom: '3rem',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2.5rem',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', background: '#38bdf8', opacity: 0.05, borderRadius: '50%', filter: 'blur(80px)' }} />
          
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
               <motion.div 
                 animate={isPlaying ? { scale: [1, 1.1, 1] } : {}}
                 transition={{ repeat: Infinity, duration: 2 }}
                 style={{ 
                   width: '120px', height: '120px', 
                   background: '#38bdf8', borderRadius: '32px',
                   display: 'flex', alignItems: 'center', justifyContent: 'center',
                   boxShadow: '0 0 30px rgba(56, 189, 248, 0.3)'
                 }}
               >
                 <Radio size={60} color="#020617" />
               </motion.div>
               {isPlaying && (
                 <motion.div 
                   animate={{ opacity: [0, 1, 0] }}
                   transition={{ repeat: Infinity, duration: 1.5 }}
                   style={{ position: 'absolute', top: -10, right: -10, background: '#ef4444', color: 'white', padding: '4px 10px', borderRadius: '20px', fontSize: '10px', fontWeight: 900 }}
                 >
                   LIVE
                 </motion.div>
               )}
            </div>
            <div>
              <h2 style={{ fontSize: '2rem', fontWeight: 900, margin: 0 }}>RDMLS <span style={{ color: '#38bdf8' }}>AUXILIAR</span></h2>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: '0.5rem 0 1.5rem 0', fontWeight: 500 }}>Sintonía de Emergencia • {currentTrack.name}</p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button 
                  onClick={toggleRadio}
                  style={{ 
                    padding: '1rem 2rem', background: isPlaying ? '#ef4444' : '#ffffff', 
                    color: isPlaying ? '#ffffff' : '#020617', 
                    borderRadius: '20px', border: 'none', fontWeight: 900,
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px'
                  }}
                >
                  {isPlaying ? <Pause /> : <Play />} {isPlaying ? 'PAUSAR' : 'ESCUCHAR EN VIVO'}
                </button>
              </div>
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '30px', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
             <h3 style={{ fontSize: '0.8rem', fontWeight: 900, color: '#38bdf8', letterSpacing: '2px', marginBottom: '1rem' }}>CANCIONES VECINALES</h3>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {vecinalSongs.map(s => (
                  <button 
                    key={s.name}
                    onClick={() => handlePlay(s)}
                    style={{ 
                      background: currentTrack.name === s.name ? 'rgba(56, 189, 248, 0.1)' : 'transparent',
                      border: 'none', color: currentTrack.name === s.name ? '#38bdf8' : '#94a3b8',
                      padding: '0.8rem 1rem', borderRadius: '15px', textAlign: 'left',
                      fontSize: '0.9rem', fontWeight: 'bold', cursor: 'pointer',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                    }}
                  >
                    <span>{s.name}</span>
                    <Music size={14} />
                  </button>
                ))}
             </div>
          </div>
        </section>

        {/* ALERTA INSTITUCIONAL */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ 
            background: 'rgba(239, 68, 68, 0.1)', 
            border: '2px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '24px',
            padding: '1.5rem',
            marginBottom: '3rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem'
          }}
        >
          <div style={{ background: '#ef4444', padding: '0.8rem', borderRadius: '15px' }}>
            <AlertTriangle color="white" />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 900, color: '#ef4444' }}>AVISO DE MANTENIMIENTO</h3>
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8' }}>Estamos trabajando para re-establecer el portal principal. La versión completa estará disponible en breves instantes.</p>
          </div>
        </motion.div>

        {/* SERVICIOS CRÍTICOS (Grandes) */}
        <section style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {featured.map(m => (
              <motion.button
                key={m.id}
                whileHover={{ y: -10, boxShadow: `0 15px 30px ${m.color}20` }}
                whileTap={{ scale: 0.95 }}
                onClick={m.action}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: `2px solid ${m.id === 'reportes' ? '#ef4444' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: '32px',
                  padding: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ background: m.color, padding: '1rem', borderRadius: '20px', color: 'white' }}>
                   <m.icon size={32} />
                </div>
                <div>
                    <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 900, color: '#ffffff' }}>{m.name.toUpperCase()}</h2>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b', fontWeight: 'bold' }}>Acceso Prioritario</p>
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        {/* MOSAICO GÜELL (60+ Módulos) */}
        <section>
          <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '2rem', paddingBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.5px' }}>ECOSISTEMA <span style={{ color: '#ef4444' }}>60+ MODS</span></h2>
            <div style={{ background: '#38bdf8', color: '#020617', padding: '0.4rem 1.2rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 900 }}>SMART CITIES HUB</div>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', 
            gap: '1rem'
          }}>
            {allModules.map((m, idx) => (
              <motion.button
                key={m.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.005 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={m.action || (() => alert(`Módulo ${m.name}: En fase de carga...`))}
                style={{
                  aspectRatio: '1/1',
                  background: 'rgba(255,255,255,0.02)',
                  borderRadius: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.8rem',
                  cursor: 'pointer',
                  border: `1px solid ${m.color}30`,
                  padding: '1rem',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ background: `${m.color}20`, padding: '0.8rem', borderRadius: '16px' }}>
                   <m.icon size={24} color={m.color} />
                </div>
                <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', textAlign: 'center' }}>{m.name}</span>
              </motion.button>
            ))}
          </div>
        </section>
      </main>

      {/* FOOTER NAVEGACIÓN */}
      <footer style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        right: '20px',
        height: '80px',
        background: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(20px)',
        borderRadius: '40px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '0 2rem',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
        zIndex: 1000,
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <Home size={28} color="#ffffff" />
        </button>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <Search size={28} color="#94a3b8" />
        </button>
        <button 
            onClick={() => window.dispatchEvent(new CustomEvent('open-faro'))}
            style={{ 
                background: '#facc15', 
                color: '#000', 
                width: '60px', 
                height: '60px', 
                borderRadius: '50%', 
                marginTop: '-40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 20px rgba(250,204,21,0.4)',
                border: '4px solid #0f172a'
            }}
        >
          <Zap size={30} fill="#000" />
        </button>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <Shield size={28} color="#94a3b8" />
        </button>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <User size={28} color="#94a3b8" />
        </button>
      </footer>
    </div>
  );
}
