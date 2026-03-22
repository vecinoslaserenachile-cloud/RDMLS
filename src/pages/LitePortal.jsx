import React, { useState, useEffect } from 'react';
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
  Gamepad2, Sparkles, Rocket, Landmark as Monument, Palmtree, ListChecks
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function LitePortal() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // 60+ Módulos categorizados para ComunaSmart Mosaico Guell Style
  const allModules = [
    // --- SMART CITIZENS ---
    { id: 'reportes', name: 'Reportes', icon: MessageSquare, color: '#ef4444', action: () => window.dispatchEvent(new CustomEvent('open-auditoria')) },
    { id: 'radio', name: 'Radio VLS', icon: Radio, color: '#3b82f6', action: () => window.dispatchEvent(new CustomEvent('open-radio-master')) },
    { id: 'mapa', name: 'Mapa VLS', icon: MapPin, color: '#10b981', action: () => window.dispatchEvent(new CustomEvent('open-distances')) },
    { id: 'camaras', name: 'Cámaras', icon: Camera, color: '#f59e0b', action: () => window.dispatchEvent(new CustomEvent('open-social-vision')) },
    { id: 'centinel', name: 'Centinel', icon: Eye, color: '#6366f1' },
    { id: 'asistente', name: 'Faro IA', icon: Zap, color: '#8b5cf6', action: () => window.dispatchEvent(new CustomEvent('open-faro')) },
    { id: 'noticias', name: 'Noticias', icon: Newspaper, color: '#ef4444' },
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
    <div style={{ minHeight: '100vh', background: '#ffffff', color: '#1e293b', paddingBottom: '120px' }}>
      {/* HEADER PREMIUM */}
      <header style={{ 
        background: '#0f172a', 
        padding: '2rem', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: '8px solid #ef4444',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', inset: '-10px', background: 'radial-gradient(circle, #facc15 0%, transparent 70%)', opacity: 0.3 }}></div>
             <img src="/serenito_avatar_vls_lite.png" alt="Serenito" style={{ width: '80px', height: '80px', borderRadius: '50%', border: '4px solid #facc15', position: 'relative' }} />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 900, color: '#ffffff', letterSpacing: '-1px' }}>V L S <span style={{ color: '#ef4444' }}>ACCESIBLE</span></h1>
            <p style={{ margin: 0, fontSize: '1rem', color: '#94a3b8', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>ComunaSmart Digital Hub</p>
          </div>
        </div>
        <div style={{ textAlign: 'right', color: 'white' }}>
          <div style={{ fontSize: '1.8rem', fontWeight: 900 }}>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
          <div style={{ fontSize: '0.8rem', color: '#facc15', fontWeight: 'bold' }}>VERSIÓN LITE v4.0</div>
        </div>
      </header>

      {/* SERVICIOS CRÍTICOS (Grandes) */}
      <main style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <section style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {featured.map(m => (
              <motion.button
                key={m.id}
                whileHover={{ y: -10, boxShadow: `0 15px 30px ${m.color}20` }}
                whileTap={{ scale: 0.95 }}
                onClick={m.action}
                style={{
                  background: 'white',
                  border: `4px solid ${m.id === 'reportes' ? '#ef4444' : '#e2e8f0'}`,
                  borderRadius: '32px',
                  padding: '2.5rem 2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2rem',
                  cursor: 'pointer',
                  boxShadow: '0 10px 0 #e2e8f0',
                  textAlign: 'left'
                }}
              >
                <div style={{ background: m.color, padding: '1.5rem', borderRadius: '24px', color: 'white' }}>
                   <m.icon size={48} />
                </div>
                <div>
                    <h2 style={{ margin: 0, fontSize: '2rem', fontWeight: 900, color: '#0f172a' }}>{m.name.toUpperCase()}</h2>
                    <p style={{ margin: 0, fontSize: '1rem', color: '#64748b', fontWeight: 'bold' }}>Acceso Prioritario</p>
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        {/* MOSAICO GÜELL (60+ Módulos) */}
        <section>
          <div style={{ borderBottom: '4px solid #e2e8f0', marginBottom: '2rem', paddingBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.5px' }}>ECOSISTEMA <span style={{ color: '#ef4444' }}>60+ MODS</span></h2>
            <div style={{ background: '#0f172a', color: 'white', padding: '0.5rem 1.5rem', borderRadius: '50px', fontSize: '1rem', fontWeight: 900 }}>SMART CITIES HUB</div>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', 
            gap: '1.2rem'
          }}>
            {allModules.map((m, idx) => (
              <motion.button
                key={m.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.005 }}
                whileHover={{ scale: 1.05, rotate: idx % 2 === 0 ? 1 : -1 }}
                whileTap={{ scale: 0.9 }}
                onClick={m.action || (() => alert(`Módulo ${m.name}: En fase de carga...`))}
                style={{
                  aspectRatio: '1.1/1',
                  background: 'white',
                  borderRadius: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.8rem',
                  cursor: 'pointer',
                  border: `3px solid ${m.color}20`,
                  boxShadow: `0 8px 0 ${m.color}15`,
                  padding: '1rem',
                  transition: 'all 0.1s'
                }}
              >
                <div style={{ background: `${m.color}15`, padding: '1rem', borderRadius: '16px' }}>
                   <m.icon size={28} color={m.color} />
                </div>
                <span style={{ fontSize: '0.8rem', fontWeight: 900, color: '#1e293b', textTransform: 'uppercase', textAlign: 'center' }}>{m.name}</span>
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
        background: '#0f172a',
        borderRadius: '40px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '0 2rem',
        boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
        zIndex: 1000,
        border: '2px solid rgba(255,255,255,0.1)'
      }}>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <Home size={32} color="#ffffff" />
        </button>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <Search size={32} color="#94a3b8" />
        </button>
        <button 
            onClick={() => window.dispatchEvent(new CustomEvent('open-faro'))}
            style={{ 
                background: '#facc15', 
                color: '#000', 
                width: '70px', 
                height: '70px', 
                borderRadius: '50%', 
                marginTop: '-40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 20px rgba(250,204,21,0.4)',
                border: '4px solid #0f172a'
            }}
        >
          <Zap size={35} fill="#000" />
        </button>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <Shield size={32} color="#94a3b8" />
        </button>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <User size={32} color="#94a3b8" />
        </button>
      </footer>
    </div>
  );
}
